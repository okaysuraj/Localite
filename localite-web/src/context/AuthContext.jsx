import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  onIdTokenChanged,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from 'firebase/auth';
import { auth } from '../firebase';
import { request } from '../api/apiClient';

const LOGIN_ERRORS = {
  'auth/user-not-found': "Invalid email or password. If you don't have an account, please sign up.",
  'auth/invalid-credential': "Invalid email or password. If you don't have an account, please sign up.",
  'auth/wrong-password': 'Incorrect password. Please try again.',
  'auth/invalid-email': 'Please enter a valid email address.',
  'auth/too-many-requests': 'Too many failed login attempts. Please try again later.',
};

export const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

// Firebase owns the session; local storage supplies the token to older page requests.
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    let active = true;
    const unsubscribe = onIdTokenChanged(auth, async (currentUser) => {
      try {
        // Registration needs its unverified Firebase session until the email is sent.
        if (!currentUser?.emailVerified) {
          localStorage.removeItem('token');
          if (active) setUser(null);
          return;
        }
        const token = await currentUser.getIdToken();
        if (!active || auth.currentUser?.uid !== currentUser.uid) return;
        localStorage.setItem('token', token);
        setUser({ uid: currentUser.uid, email: currentUser.email, token });
      } catch {
        localStorage.removeItem('token');
        if (active) setUser(null);
      } finally {
        if (active) setLoading(false);
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
      navigate('/dashboard');
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
    navigate('/');
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
