import { useState } from 'react';
import { addSubscription } from '../lib/firestore';

export const useForm = (user) => {
  const [formData, setFormData] = useState({
    frequency: 'one-time', // or 'bi-weekly'
    dayOfWeek: '',
    startTime: '',
    squareFootage: '1000',
    property: 'studio',
    fname: '',
    lname: '',
    phone: '',
    streetAddress: '',
    city: '',
    cleanType: 'regular',
    numRooms: '1',
    bathRooms: '1',
    providedItems: false,
    baseprice: 350,
  });
  
  const [err, setErr] = useState(null);

  // Basic validation function
  const validateForm = () => {
    const requiredFields = ['fname', 'lname', 'phone', 'streetAddress', 'city'];
    for (const field of requiredFields) {
      if (!formData[field]) {
        setErr(`${field} is required.`);
        return false;
      }
    }
    setErr(null); // Clear any previous error
    return true;
  };

  const handleCheckboxChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.checked,
    });
  };

  const handleSliderChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
    // calculateCost();
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const calculateCleaningTime = (squareFootage) => {
    return Math.ceil(squareFootage / 1000) * 60;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form before submission
    if (!validateForm()) return;

    const cleaningTime = calculateCleaningTime(formData.squareFootage);
  
    const recurrenceRule = formData.frequency === 'one-time' 
                            ? null 
                            : [`RRULE:FREQ=WEEKLY;INTERVAL=${formData.frequency === 'bi-weekly' ? 2 : 1}`];

    const userEmail = user.email
    const eventData = {
      summary: `${user?.displayName || 'Guest'} - ${formData.frequency} - ${formData.cleanType} - ${formData.baseprice}`,
      description: `Cleaning service for ${formData.squareFootage} sq ft`,
      start: {
        dateTime: new Date(`${formData.dayOfWeek}T${formData.startTime}`).toISOString(),
        timeZone: 'America/Los_Angeles',
      },
      end: {
        dateTime: new Date(
          new Date(`${formData.dayOfWeek}T${formData.startTime}`).getTime() + cleaningTime * 60000
        ).toISOString(),
        timeZone: 'America/Los_Angeles',
      },
      recurrence: recurrenceRule,
    };

    try {
      setErr(null);
      console.log(userEmail);
      const res = await fetch('/api/googleCalender', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ eventData, recurrenceRule }),
      });
      console.log(eventData);
      console.log(res);
      if (!res.ok) {
        if (res.status === 409) {
          // Handle conflict errors
          const data = await res.json();
          setErr(data.error);
          console.error('Conflicting events:', data.conflicts);
        } else {
          throw new Error(res.statusText);
        }
      } else {
        const event = await res.json();
        setErr("Subscribed successfully!")
        console.log('Event created:', event);

        // Add subscription in Firestore after successful booking
        await addSubscription(
          user.uid,
          formData.fname,
          formData.lname,
          user.email,
          formData.phone,
          formData.streetAddress,
          formData.city,
          formData.frequency,
          formData.dayOfWeek,
          formData.startTime,
          formData.squareFootage,
          formData.property,
          formData.cleanType,
          formData.numRooms,
          formData.bathRooms,
          formData.providedItems,
          formData.baseprice
        );
        console.log('Subscribed successfully!');

        const emailRes = await fetch('/api/sendEmail', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            to: user.email,
            subject: 'Cleaning Service Booking Confirmation',
            text: `Hello ${user.displayName},\n\nYour cleaning service has been successfully booked. Cost will be:`,
            html: `<p>Hello ${user.displayName},</p><p>Your cleaning service has been successfully booked...</p>`,
          }),
        });

        if (!emailRes.ok) {
          throw new Error('Failed to send email');
        }
      }
    } catch (error) {
      console.error('Error creating event:', error);
      setErr('Failed to create event. Please try again.');
    }
  };

  return { formData, handleChange, handleSubmit, handleSliderChange, handleCheckboxChange, err, setFormData };
};
