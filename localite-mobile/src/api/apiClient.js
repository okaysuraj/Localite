import axios from 'axios';
import { auth } from '../firebase';
import { API_URL } from '../config';

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to attach Firebase ID token
apiClient.interceptors.request.use(async (config) => {
  try {
    const user = auth.currentUser;
    if (user) {
      const token = await user.getIdToken();
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch (error) {
    console.error('Error attaching token to request', error);
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default apiClient;
