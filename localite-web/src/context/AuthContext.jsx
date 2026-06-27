import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged, signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { auth } from '../firebase';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        if (!currentUser.emailVerified) {
          // If they aren't verified, sign them out silently
          await signOut(auth);
          setUser(null);
        } else {
          const token = await currentUser.getIdToken();
          setUser({ 
            uid: currentUser.uid, 
            email: currentUser.email,
            token: token 
          });
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      if (!userCredential.user.emailVerified) {
        await signOut(auth);
        throw new Error("Please verify your email before logging in. Check your inbox.");
      }
      navigate('/dashboard');
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const register = async (username, email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const token = await userCredential.user.getIdToken();
      
      // Sync user with backend
      const res = await fetch(import.meta.env.VITE_API_URL + '/auth/sync-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ username, email })
      });
      
      if (!res.ok) {
        console.error("Backend sync failed");
        // We could delete the Firebase user here if backend sync fails to keep them consistent
      }
      
      await sendEmailVerification(userCredential.user);
      await signOut(auth);
      
      return { success: true, message: "Please check your email to verify your account before logging in." };
    } catch (error) {
      console.error("Registration failed:", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
