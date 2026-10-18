import { createContext, useContext, useEffect, useState } from 'react';
import {
  onIdTokenChanged,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth } from '../firebase';
import { request } from '../api/apiClient';

const LOGIN_ERRORS = {
  'auth/user-not-found': "Invalid email or password. If you don't have an account, please sign up.",
  'auth/invalid-credential': "Invalid email or password. If you don't have an account, please sign up.",
  'auth/wrong-password': 'Incorrect password. Please try again.',
  'auth/invalid-email': 'Please enter a valid email address.',
  'auth/too-many-requests': 'Too many failed login attempts. Please try again later.',
};

const SESSION_KEYS = ['token', 'userToken', 'user', 'username'];
export const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

async function readCachedProfile(uid) {
  try {
    const profile = JSON.parse(await AsyncStorage.getItem('user')) || {};
    return profile.firebaseUid && profile.firebaseUid !== uid ? {} : profile;
  } catch {
    return {}; // A damaged cache must not prevent sign-in.
  }
}

// Show the cached profile immediately, then refresh it without blocking navigation.
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    let version = 0;
    const unsubscribe = onIdTokenChanged(auth, async (currentUser) => {
      const sessionVersion = ++version;
      const isCurrent = () => active && version === sessionVersion;
      try {
        if (!currentUser?.emailVerified) {
          if (isCurrent()) setUser(null);
          await AsyncStorage.multiRemove(SESSION_KEYS);
          return;
        }
        const token = await currentUser.getIdToken();
        if (!isCurrent()) return;
        await AsyncStorage.multiSet([
          ['token', token],
          ['userToken', token],
        ]);
        const profile = await readCachedProfile(currentUser.uid);
        const identity = { uid: currentUser.uid, email: currentUser.email, token };
        if (!isCurrent()) return;
        setUser({ ...profile, ...identity });

        // The version check prevents a late response from restoring a signed-out account.
        void request('/users/me', { timeout: 4000, fallback: null })
          .then(async (freshProfile) => {
            if (!freshProfile || !isCurrent()) return;
            await AsyncStorage.setItem('user', JSON.stringify(freshProfile));
            if (freshProfile.username) await AsyncStorage.setItem('username', freshProfile.username);
            if (isCurrent()) setUser({ ...freshProfile, ...identity });
          })
          .catch(() => {
            // Keep the cached profile if storage is temporarily unavailable.
          });
      } catch {
        if (isCurrent()) setUser(null);
      } finally {
        if (isCurrent()) setLoading(false);
      }
    });
    return () => {
      active = false;
      unsubscribe();
    };
  }, []);

  async function login(email, password) {
    try {
      const { user: firebaseUser } = await signInWithEmailAndPassword(auth, email, password);
      if (!firebaseUser.emailVerified) {
        await signOut(auth);
        throw new Error('Please verify your email before logging in. Check your inbox.');
      }
      return { success: true };
    } catch (error) {
      throw new Error(LOGIN_ERRORS[error.code] || error.message, { cause: error });
    }
  }

  async function register(username, email, password) {
    const { user: firebaseUser } = await createUserWithEmailAndPassword(auth, email, password);
    const token = await firebaseUser.getIdToken();
    // Preserve verification when the backend is temporarily unavailable.
    await request('/auth/sync-user', {
      method: 'POST',
      data: { username, email },
      headers: { Authorization: `Bearer ${token}` },
      fallback: null,
    });
    await sendEmailVerification(firebaseUser);
    await signOut(auth);
    return { success: true, message: 'Please check your email to verify your account before logging in.' };
  }

  async function logout() {
    await signOut(auth);
    await AsyncStorage.multiRemove(SESSION_KEYS);
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, currentUser: user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
