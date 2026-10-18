import { request } from '../api/apiClient';

// Events and attendance.
export const getEvents = () => request(`/events`, { fallback: [] });
export const getEventById = (id) => request(`/events/${id}`, { fallback: null });
export const createEvent = (eventData) => request(`/events`, { method: 'POST', data: eventData });
export const rsvpToEvent = (eventId) => request(`/events/${eventId}/rsvp`, { method: 'POST' });
export const getEventRsvps = (id) => request(`/events/${id}/rsvps`, { fallback: [] });
export const getEventMessages = (eventId) => request(`/events/${eventId}/messages`, { fallback: [] });
export const sendEventMessage = (eventId, content) =>
  request(`/events/${eventId}/messages`, { method: 'POST', data: { content } });
export const buyTicket = (eventId) =>
  request(`/monetization/buy-ticket/${eventId}`, { method: 'POST', responseType: 'text' });
export const checkInAttendee = (eventId, ticketId) =>
  request(`/events/${eventId}/checkin/${ticketId}`, { method: 'POST', responseType: 'text' });
export const getMyEvents = () => request(`/events/my-events`, { fallback: [] });

// Profiles and community.
export const getCurrentUser = () => request(`/users/me`, { fallback: null });
export const getUsers = () => request(`/users`, { fallback: [] });
export const updateProfile = (profileData) => request(`/users/me`, { method: 'PUT', data: profileData });
export const blockUser = (userId) => request(`/users/${userId}/block`, { method: 'POST' });
export const getFeed = () => request(`/feed`, { fallback: [] });
export const getSuggestedPartners = () => request(`/matches/users`, { fallback: [] });
export const sendConnectionRequest = (userId) => request(`/users/${userId}/connect`, { method: 'POST' });
export const getLeaderboard = (sport) => request(`/leaderboard/${sport || 'all'}`, { fallback: [] });
export const awardXp = (action) => request(`/gamification/award`, { method: 'POST', data: { action } });

// Messages and notifications.
export const getPendingRequests = () => request(`/users/connections/pending`, { fallback: [] });
export const acceptRequest = (connectionId) =>
  request(`/users/connections/${connectionId}/accept`, { method: 'PUT', responseType: 'text' });
export const declineRequest = (connectionId) =>
  request(`/users/connections/${connectionId}/decline`, { method: 'DELETE', responseType: 'text' });
export const getNotifications = () => request(`/notifications`, { fallback: [] });
export const markNotificationAsRead = (id) =>
  request(`/notifications/${id}/read`, { method: 'PUT', responseType: 'text' });

// Safety and reporting.
export const triggerPanic = (lat, lng) => request(`/safety/panic`, { method: 'POST', data: { lat, lng } });

// Analytics and administration.
export const getUserAnalytics = () => request(`/users/me/analytics`, { fallback: null });
export const getAdminAnalytics = () => request(`/admin/analytics`, { fallback: null });
export const getAdminReports = () => request(`/admin/reports`, { fallback: [] });
export const banUser = (userId) =>
  request(`/admin/users/${userId}/ban`, { method: 'POST', responseType: 'text' });
