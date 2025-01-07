// pages/anotherPage.js
import { useEffect, useState } from 'react';
import { useAuth } from '../hooks/Auth';
import { getUserSubscriptions } from '../lib/firestore';
import Header from "../hooks/header"
import myImage from '../public/img (1).png';
import Image from "next/image";
import Link from "next/link";

export default function AnotherPage() {
  const [subscriptions, setSubscriptions] = useState([]);

  const { user, loading, error, handleLogin, handleLogout } = useAuth();

  const fetchSubscriptions = async () => {
    const subs = await getUserSubscriptions(user.uid);
    setSubscriptions(subs);
  };

  return (
      <div>
        <Header/>
        {!user ? (
                <button className="login-button" onClick={handleLogin}>Login with Google</button>
              ) : (
        <div className="profile">
          <h1>Welcome, {user.displayName}</h1>
          <p>Your email: {user.email}</p>
          {/* Display other user-specific content */}
          <button onClick={fetchSubscriptions}>View Your Subscriptions</button>
          <ul>
            {subscriptions.map((sub) => (
              <li key={sub.id}>
                <strong>Frequency:</strong> {sub.frequency}, 
                <strong> Day:</strong> {sub.day}, 
                <strong> Time:</strong> {sub.time}, 
                <strong> Area:</strong> {sub.area} - 
                <strong> Subscribed on:</strong> {new Date(sub.subscribedAt.seconds * 1000).toLocaleDateString()}
                <br/>
                <strong>Address:</strong> {sub.streetAddress}, {sub.city}, {sub.property}, 
                <strong> Clean Type:</strong> {sub.cleanType}, 
                <strong> Rooms:</strong> {sub.numRooms}, 
                <strong> Bathrooms:</strong> {sub.bathRooms}, 
                <strong> Provided Cleaning Items:</strong> {sub.providedItems === undefined ? 'Not Specified' : (sub.providedItems ? 'Yes' : 'No')}
                <br/>
                <strong>Price:</strong> ${sub.baseprice}
              </li>
            ))}
          </ul>
        </div>
        )}
      </div>
  );
}
