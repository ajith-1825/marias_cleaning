import { useState, useEffect } from 'react';
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, setPersistence, browserLocalPersistence, onAuthStateChanged } from 'firebase/auth';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const auth = getAuth(); // Ensure this is initialized only once in your app

  useEffect(() => {
    // Set browser persistence
    const setAuthPersistence = async () => {
      try {
        await setPersistence(auth, browserLocalPersistence);
      } catch (error) {
        console.error('Error setting persistence:', error);
        setError(error);
      }
    };

    // Invoke persistence setup
    setAuthPersistence();

    // Listen for auth state changes
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false); // Only set loading to false after auth state has been checked
    });

    // Clean up the subscription on unmount
    return () => unsubscribe();
  }, [auth]);

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
      setError(null); // Clear error if login is successful
    } catch (error) {
      console.error('Login failed:', error);
      setError(error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setError(null); // Clear error on successful logout
    } catch (error) {
      console.error('Logout failed:', error);
      setError(error);
    }
  };

  return { user, loading, error, handleLogin, handleLogout };
};
