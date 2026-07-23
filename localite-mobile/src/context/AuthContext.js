import React, { createContext, useState, useEffect, useContext } from 'react';
import { onIdTokenChanged, signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth } from '../firebase';
import apiClient from '../api/apiClient';

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onIdTokenChanged(auth, async (currentUser) => {
      if (currentUser) {
        if (!currentUser.emailVerified) {
          // If they aren't verified, sign them out silently
          await signOut(auth);
          setUser(null);
          await AsyncStorage.removeItem('token');
        } else {
          const token = await currentUser.getIdToken();
          await AsyncStorage.setItem('token', token);
          setUser({ 
            uid: currentUser.uid, 
            email: currentUser.email,
            token: token 
          });
        }
      } else {
        setUser(null);
        await AsyncStorage.removeItem('token');
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
      return { success: true };
    } catch (error) {
      console.error("Login failed:", error);
      let errorMessage = "An error occurred during login. Please try again.";
      if (error.code === 'auth/user-not-found' || error.code === 'auth/invalid-credential') {
        errorMessage = "Invalid email or password. If you don't have an account, please sign up.";
      } else if (error.code === 'auth/wrong-password') {
        errorMessage = "Incorrect password. Please try again.";
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = "Please enter a valid email address.";
      } else if (error.code === 'auth/too-many-requests') {
        errorMessage = "Too many failed login attempts. Please try again later.";
      }
      throw new Error(errorMessage);
    }
  };

  const register = async (username, email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const token = await userCredential.user.getIdToken();
      
      // Sync user with backend
      try {
        await apiClient.post('/auth/sync-user', { username, email });
      } catch (err) {
        console.error("Backend sync failed", err);
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
