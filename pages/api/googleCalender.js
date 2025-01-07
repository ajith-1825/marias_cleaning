import { google } from 'googleapis';

const oAuth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

oAuth2Client.setCredentials({
  refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
});

const calendar = google.calendar({ version: 'v3', auth: oAuth2Client });

function getTimeComponents(date) {
  return {
    hours: date.getHours(),
    minutes: date.getMinutes(),
    seconds: date.getSeconds(),
  };
}

function timesOverlap(time1Start, time1End, time2Start, time2End) {
  // Convert all times to minutes for easier comparison
  const t1Start = time1Start.hours * 60 + time1Start.minutes;
  const t1End = time1End.hours * 60 + time1End.minutes;
  const t2Start = time2Start.hours * 60 + time2Start.minutes;
  const t2End = time2End.hours * 60 + time2End.minutes;

  return (t1Start < t2End && t1End > t2Start);
}

// Generate all bi-weekly dates for the next 3 months
function generateBiWeeklyDates(startDate) {
  const dates = [];
  const endDate = new Date(startDate);
  endDate.setMonth(endDate.getMonth() + 3);
  
  let currentDate = new Date(startDate);
  while (currentDate <= endDate) {
    dates.push(new Date(currentDate));
    // Add 14 days for next bi-weekly occurrence
    currentDate.setDate(currentDate.getDate() + 14);
  }
  return dates;
}

async function checkForConflicts(newEventStart, newEventEnd, isRecurring, frequency = 'weekly') {
  // Get current date and 3 months from now
  const startDate = new Date();
  const endDate = new Date();
  endDate.setMonth(endDate.getMonth() + 3);

  const events = await calendar.events.list({
    calendarId: 'primary',
    timeMin: startDate.toISOString(),
    timeMax: endDate.toISOString(),
    singleEvents: true,
    orderBy: 'startTime',
  });

  console.log('\n=== Checking for Conflicts ===');
  console.log(`New Event Start: ${newEventStart.toLocaleString()}`);
  console.log(`New Event End: ${newEventEnd.toLocaleString()}`);
  console.log(`Is Recurring: ${isRecurring}`);
  console.log(`Frequency: ${frequency}\n`);

  const conflicts = [];

  for (const event of events.data.items) {
    const existingStart = new Date(event.start.dateTime || event.start.date);
    const existingEnd = new Date(event.end.dateTime || event.end.date);

    const newEventTime = getTimeComponents(newEventStart);
    const newEventEndTime = getTimeComponents(newEventEnd);
    const existingEventTime = getTimeComponents(existingStart);
    const existingEventEndTime = getTimeComponents(existingEnd);

    let hasConflict = false;

    if (isRecurring) {
      if (frequency === 'biweekly') {
        // Generate all bi-weekly dates for the new event
        const biWeeklyDates = generateBiWeeklyDates(newEventStart);
        
        // Check each bi-weekly occurrence for conflicts
        console.log(biWeeklyDates);
        for (const biWeeklyDate of biWeeklyDates) {
          // Set the time components from the original event
          biWeeklyDate.setHours(newEventStart.getHours());
          biWeeklyDate.setMinutes(newEventStart.getMinutes());
          biWeeklyDate.setSeconds(newEventStart.getSeconds());

          // If existing event is on the same date and time overlaps
          if (existingStart.toDateString() === biWeeklyDate.toDateString() && 
              timesOverlap(newEventTime, newEventEndTime, existingEventTime, existingEventEndTime)) {
            hasConflict = true;
            console.log(`\nBi-weekly conflict found on: ${biWeeklyDate.toLocaleDateString()}`);
            break;
          }
        }
      } else {
        // For weekly events, just check day of week and time
        if (existingStart.getDay() === newEventStart.getDay() &&
            timesOverlap(newEventTime, newEventEndTime, existingEventTime, existingEventEndTime)) {
          hasConflict = true;
        }
      }
    } else {
      // For non-recurring events, check exact date and time
      if (existingStart.toDateString() === newEventStart.toDateString() &&
          timesOverlap(newEventTime, newEventEndTime, existingEventTime, existingEventEndTime)) {
        hasConflict = true;
      }
    }

    if (hasConflict) {
      console.log('\nConflict Found:');
      console.log(`Existing Event: ${event.summary}`);
      console.log(`Date: ${existingStart.toLocaleDateString()}`);
      console.log(`Time: ${existingStart.toLocaleTimeString()} - ${existingEnd.toLocaleTimeString()}`);
      console.log(`Day of Week: ${existingStart.toLocaleDateString(undefined, { weekday: 'long' })}`);
      console.log('----------------------------------------');

      conflicts.push({
        summary: event.summary,
        start: existingStart,
        end: existingEnd,
        id: event.id
      });
    }
  }

  return conflicts;
}

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { eventData } = req.body;
      await oAuth2Client.getAccessToken();

      const startDateTime = new Date(eventData.start.dateTime);
      const endDateTime = new Date(eventData.end.dateTime);
      
      // Check if this is a recurring event and get its frequency
      const isRecurring = eventData.recurrence && eventData.recurrence.length > 0;
      const frequency = eventData.recurrence && eventData.recurrence[0].includes('INTERVAL=2') ? 'biweekly' : 'weekly';

      // Check for conflicts
      const conflicts = await checkForConflicts(startDateTime, endDateTime, isRecurring, frequency);

      if (conflicts.length > 0) {
        console.log(`Found ${conflicts.length} conflicts. Booking rejected.`);
        return res.status(409).json({ 
          error: 'Time slot already booked',
          conflicts: conflicts 
        });
      }

      // No conflicts, proceed to create the event
      console.log('\nNo conflicts found. Creating event...');
      const event = await calendar.events.insert({
        calendarId: 'primary',
        resource: eventData,
      });

      console.log('Event created successfully!');
      res.status(200).json({event : event.data});
    } catch (error) {
      console.error('Error creating calendar event:', error);
      res.status(500).json({ error: 'Failed to create event' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}