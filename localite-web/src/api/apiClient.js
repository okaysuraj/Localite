import axios from 'axios';
import { auth } from '../firebase';
import { API_URL } from '../config';

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Ask Firebase for the current token so requests also work after a token refresh.
apiClient.interceptors.request.use(async (config) => {
  if (auth.currentUser && !config.headers.Authorization) {
    const token = await auth.currentUser.getIdToken();
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Callers can opt into a fallback; other failures keep the server's error message.
export async function request(url, options = {}) {
  const { fallback, ...config } = options;
  try {
    const response = await apiClient.request({ url, ...config });
    return response.data;
  } catch (error) {
    if (Object.hasOwn(options, 'fallback')) return fallback;
    const detail = error.response?.data;
    const message = typeof detail === 'string' && detail ? detail : detail?.message || error.message;
    throw new Error(message, { cause: error });
  }
}
