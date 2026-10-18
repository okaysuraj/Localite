// HTTP requests and live updates must point to the same backend.
export const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:8080/api').replace(/\/$/, '');
export const WS_URL = API_URL.replace(/\/api$/, '') + '/ws';
