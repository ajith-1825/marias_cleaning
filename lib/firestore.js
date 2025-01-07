import { collection, addDoc, query, where, getDocs, doc, getDoc } from 'firebase/firestore';
import { db } from './firebase';

// Add a new subscription
export const addSubscription = async (userId, fname, lname, email, phone, streetAddress, city, frequency, 
                                    day, time, area, property, cleanType, numRooms, bathRooms, providedItems, baseprice) => {
  try {
    const docRef = await addDoc(collection(db, 'subscriptions'), {
      userId,
      fname, 
      lname, 
      email, 
      phone, 
      streetAddress, 
      city,
      frequency,
      day,
      time,
      area,
      property,
      cleanType,
      numRooms,
      bathRooms,
      providedItems,
      baseprice,
      subscribedAt: new Date()
    });
    return docRef.id;
  } catch (e) {
    console.error('Error adding subscription: ', e);
  }
};


// Get subscriptions for a user
export const getUserSubscriptions = async (userId) => {
  const q = query(collection(db, 'subscriptions'), where('userId', '==', userId));
  const querySnapshot = await getDocs(q);
  console.log(q);
  const subscriptions = [];
  querySnapshot.forEach((doc) => {
    subscriptions.push({ id: doc.id, ...doc.data() });
  });
  return subscriptions;
};

export async function getUserRefreshToken(userEmail) {
  console.log(userEmail+"ddkj");
  const userDoc = await getDoc(doc(db, 'users', userEmail));
  console.log(userDoc);
  if (!userDoc.exists()) {
    console.log(userDoc.data());
    return null;
  }
  return userDoc.data().refreshToken;
}