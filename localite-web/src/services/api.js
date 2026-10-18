import { auth } from '../firebase';

export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';
const BASE_URL = API_BASE_URL;

export const getAuthHeaders = async () => {
  const user = auth.currentUser;
  if (!user) return { 'Content-Type': 'application/json' };
  
  const token = await user.getIdToken();
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  };
};

export const awardXp = async (action) => {
  try {
    const headers = await getAuthHeaders();
    const response = await fetch(`${BASE_URL}/gamification/award`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ action }),
    });
    if (!response.ok) throw new Error('Failed to award XP');
    return await response.json();
  } catch (error) {
    console.error('Error awarding XP:', error);
    throw error;
  }
};

export const getEvents = async () => {
  try {
    const headers = await getAuthHeaders();
    const response = await fetch(`${BASE_URL}/events`, { headers });
    if (!response.ok) throw new Error('Failed to fetch events');
    return await response.json();
  } catch (error) {
    console.error('Error fetching events:', error);
    return [];
  }
};

export const getEventById = async (id) => {
  try {
    const headers = await getAuthHeaders();
    const response = await fetch(`${BASE_URL}/events/${id}`, { headers });
    if (!response.ok) throw new Error('Failed to fetch event');
    return await response.json();
  } catch (error) {
    console.error('Error fetching event by id:', error);
    return null;
  }
};

export const createEvent = async (eventData) => {
  try {
    const headers = await getAuthHeaders();
    const response = await fetch(`${BASE_URL}/events`, {
      method: 'POST',
      headers,
      body: JSON.stringify(eventData),
    });
    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`Failed to create event: ${errText}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error creating event:', error);
    throw error;
  }
};

export const rsvpToEvent = async (eventId) => {
  try {
    const headers = await getAuthHeaders();
    const response = await fetch(`${BASE_URL}/events/${eventId}/rsvp`, {
      method: 'POST',
      headers,
    });
    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`Failed to RSVP to event: ${errText}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error RSVPing to event:', error);
    throw error;
  }
};

export const getEventRsvps = async (id) => {
  try {
    const headers = await getAuthHeaders();
    const response = await fetch(`${BASE_URL}/events/${id}/rsvps`, { headers });
    if (!response.ok) throw new Error('Failed to fetch event rsvps');
    return await response.json();
  } catch (error) {
    console.error('Error fetching event rsvps:', error);
    return [];
  }
};

export const getEventMessages = async (eventId) => {
  try {
    const headers = await getAuthHeaders();
    const response = await fetch(`${BASE_URL}/events/${eventId}/messages`, { headers });
    if (!response.ok) throw new Error('Failed to fetch event messages');
    return await response.json();
  } catch (error) {
    console.error('Error fetching event messages:', error);
    return [];
  }
};

export const sendEventMessage = async (eventId, content) => {
  try {
    const headers = await getAuthHeaders();
    const response = await fetch(`${BASE_URL}/events/${eventId}/messages`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ content }),
    });
    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`Failed to send message: ${errText}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error sending event message:', error);
    throw error;
  }
};

export const getLeaderboard = async (sport) => {
  try {
    const headers = await getAuthHeaders();
    const response = await fetch(`${BASE_URL}/leaderboard/${sport || 'all'}`, { headers });
    if (!response.ok) throw new Error('Failed to fetch leaderboard');
    return await response.json();
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    return [];
  }
};

export const getCurrentUser = async () => {
  try {
    const headers = await getAuthHeaders();
    const response = await fetch(`${BASE_URL}/users/me`, { headers });
    if (!response.ok) throw new Error('Failed to fetch user');
    return await response.json();
  } catch (error) {
    console.error('Error fetching user:', error);
    return null;
  }
};

export const getNotifications = async () => {
  try {
    const headers = await getAuthHeaders();
    const response = await fetch(`${BASE_URL}/notifications`, { headers });
    if (!response.ok) throw new Error('Failed to fetch notifications');
    return await response.json();
  } catch (error) {
    console.error('Error fetching notifications:', error);
    return [];
  }
};

export const markNotificationAsRead = async (id) => {
  try {
    const headers = await getAuthHeaders();
    const response = await fetch(`${BASE_URL}/notifications/${id}/read`, { method: 'PUT', headers });
    if (!response.ok) throw new Error('Failed to mark as read');
    return await response.text();
  } catch (error) {
    console.error('Error marking as read:', error);
    throw error;
  }
};

export const getConversations = async () => {
  try {
    const headers = await getAuthHeaders();
    const response = await fetch(`${BASE_URL}/messages/direct/conversations`, { headers });
    if (!response.ok) throw new Error('Failed to fetch conversations');
    return await response.json();
  } catch (error) {
    console.error('Error fetching conversations:', error);
    return [];
  }
};

export const getConversation = async (userId) => {
  try {
    const headers = await getAuthHeaders();
    const response = await fetch(`${BASE_URL}/messages/direct/${userId}`, { headers });
    if (!response.ok) throw new Error('Failed to fetch conversation');
    return await response.json();
  } catch (error) {
    console.error('Error fetching conversation:', error);
    return [];
  }
};

export const sendDirectMessage = async (userId, content, messageType = 'TEXT') => {
  try {
    const headers = await getAuthHeaders();
    const response = await fetch(`${BASE_URL}/messages/direct/${userId}`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ content, messageType })
    });
    if (!response.ok) throw new Error('Failed to send message');
    return await response.json();
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
};

export const getPendingRequests = async () => {
  try {
    const headers = await getAuthHeaders();
    const response = await fetch(`${BASE_URL}/users/connections/pending`, { headers });
    if (!response.ok) throw new Error('Failed to fetch pending requests');
    return await response.json();
  } catch (error) {
    console.error('Error fetching pending requests:', error);
    return [];
  }
};

export const acceptRequest = async (connectionId) => {
  try {
    const headers = await getAuthHeaders();
    const response = await fetch(`${BASE_URL}/users/connections/${connectionId}/accept`, {
      method: 'PUT',
      headers
    });
    if (!response.ok) throw new Error('Failed to accept request');
    return await response.text();
  } catch (error) {
    console.error('Error accepting request:', error);
    throw error;
  }
};

export const declineRequest = async (connectionId) => {
  try {
    const headers = await getAuthHeaders();
    const response = await fetch(`${BASE_URL}/users/connections/${connectionId}/decline`, {
      method: 'DELETE',
      headers
    });
    if (!response.ok) throw new Error('Failed to decline request');
    return await response.text();
  } catch (error) {
    console.error('Error declining request:', error);
    throw error;
  }
};

export const awardGamificationXp = async (actionStr) => {
  try {
    const headers = await getAuthHeaders();
    const response = await fetch(`${BASE_URL}/gamification/award`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ action: actionStr }),
    });
    if (!response.ok) throw new Error('Failed to award xp');
    return await response.json();
  } catch (error) {
    console.error('Error awarding xp:', error);
    return null;
  }
};

export const buyTicket = async (eventId) => {
  const headers = await getAuthHeaders();
  const response = await fetch(`${BASE_URL}/monetization/buy-ticket/${eventId}`, {
    method: 'POST',
    headers
  });
  if (!response.ok) throw new Error('Failed to purchase ticket');
  return response.text();
};

// --- Social & Engagement (Phase 6) ---

export const getFeed = async () => {
  try {
    const headers = await getAuthHeaders();
    const response = await fetch(`${BASE_URL}/feed`, { headers });
    if (!response.ok) throw new Error('Failed to fetch feed');
    return await response.json();
  } catch (error) {
    console.error('Error fetching feed:', error);
    return [];
  }
};

export const followUser = async (userId) => {
  try {
    const headers = await getAuthHeaders();
    const response = await fetch(`${BASE_URL}/users/${userId}/follow`, { method: 'POST', headers });
    if (!response.ok) throw new Error('Failed to follow');
    return await response.json();
  } catch (error) {
    console.error('Error following user:', error);
    throw error;
  }
};

export const unfollowUser = async (userId) => {
  try {
    const headers = await getAuthHeaders();
    const response = await fetch(`${BASE_URL}/users/${userId}/unfollow`, { method: 'DELETE', headers });
    if (!response.ok) throw new Error('Failed to unfollow');
    return await response.json();
  } catch (error) {
    console.error('Error unfollowing user:', error);
    throw error;
  }
};

export const sendConnectionRequest = async (userId) => {
  try {
    const headers = await getAuthHeaders();
    const response = await fetch(`${BASE_URL}/users/${userId}/connect`, { method: 'POST', headers });
    if (!response.ok) throw new Error('Failed to connect');
    return await response.json();
  } catch (error) {
    console.error('Error sending connection request:', error);
    throw error;
  }
};

export const getPendingConnections = async () => {
  try {
    const headers = await getAuthHeaders();
    const response = await fetch(`${BASE_URL}/users/connections/pending`, { headers });
    if (!response.ok) throw new Error('Failed to fetch connections');
    return await response.json();
  } catch (error) {
    console.error('Error fetching pending connections:', error);
    return [];
  }
};

export const acceptConnection = async (connectionId) => {
  try {
    const headers = await getAuthHeaders();
    const response = await fetch(`${BASE_URL}/users/connections/${connectionId}/accept`, { method: 'PUT', headers });
    if (!response.ok) throw new Error('Failed to accept connection');
    return await response.json();
  } catch (error) {
    console.error('Error accepting connection:', error);
    throw error;
  }
};

export const getUsers = async () => {
  try {
    const headers = await getAuthHeaders();
    const response = await fetch(`${BASE_URL}/users`, { headers });
    if (!response.ok) throw new Error('Failed to fetch users');
    return await response.json();
  } catch (error) {
    console.error('Error fetching users:', error);
    return [];
  }
};

export const getUserById = async (id) => {
  try {
    const headers = await getAuthHeaders();
    const response = await fetch(`${BASE_URL}/users/${id}`, { headers });
    if (!response.ok) throw new Error('Failed to fetch user');
    return await response.json();
  } catch (error) {
    console.error('Error fetching user by id:', error);
    return null;
  }
};

export const getRecommendedEvents = async () => {
  try {
    const headers = await getAuthHeaders();
    const response = await fetch(`${BASE_URL}/matches/events`, { headers });
    if (!response.ok) throw new Error('Failed to fetch recommended events');
    return await response.json();
  } catch (error) {
    console.error('Error fetching recommended events:', error);
    return [];
  }
};

export const getSuggestedPartners = async () => {
  try {
    const headers = await getAuthHeaders();
    const response = await fetch(`${BASE_URL}/matches/users`, { headers });
    if (!response.ok) throw new Error('Failed to fetch suggested partners');
    return await response.json();
  } catch (error) {
    console.error('Error fetching suggested partners:', error);
    return [];
  }
};

export const getCategories = async () => {
  try {
    const response = await fetch(`${BASE_URL}/categories`);
    if (response.ok) {
      const data = await response.json();
      return data.map((cat, index) => ({
        id: `c_${index}`,
        name: cat,
        type: "PREMIER",
        activeMatches: 12 + index * 3,
        venues: 4 + index * 2
      }));
    }
  } catch (error) {
    console.error('Error fetching categories:', error);
  }
  return [
    { id: "c1", name: "Tennis", type: "TRADITION", activeMatches: 24, venues: 12 },
    { id: "c2", name: "Polo", type: "MAJESTY", activeMatches: 8, venues: 4 },
    { id: "c3", name: "Golf", type: "PRECISION", activeMatches: 11, venues: 15 },
    { id: "c4", name: "Cricket", type: "HERITAGE", activeMatches: 5, venues: 3 }
  ];
};

export const updateProfile = async (profileData) => {
  const headers = await getAuthHeaders();
  const response = await fetch(`${BASE_URL}/users/me`, {
    method: 'PUT',
    headers,
    body: JSON.stringify(profileData)
  });
  if (!response.ok) throw new Error('Failed to update profile');
  return await response.json();
};

export const blockUser = async (userId) => {
  const headers = await getAuthHeaders();
  const response = await fetch(`${BASE_URL}/users/${userId}/block`, {
    method: 'POST',
    headers
  });
  if (!response.ok) throw new Error('Failed to block user');
  return await response.json();
};

export const unblockUser = async (userId) => {
  const headers = await getAuthHeaders();
  const response = await fetch(`${BASE_URL}/users/${userId}/unblock`, {
    method: 'DELETE',
    headers
  });
  if (!response.ok) throw new Error('Failed to unblock user');
  return await response.json();
};

export const triggerPanic = async (lat, lng) => {
  const headers = await getAuthHeaders();
  const response = await fetch(`${BASE_URL}/safety/panic`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ lat, lng })
  });
  if (!response.ok) throw new Error('Failed to trigger SOS');
  return await response.json();
};

export const checkInAttendee = async (eventId, ticketId) => {
  const headers = await getAuthHeaders();
  const response = await fetch(`${BASE_URL}/events/${eventId}/checkin/${ticketId}`, {
    method: 'POST',
    headers
  });
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || 'Check-in failed');
  }
  return await response.text();
};

export const deleteAccount = async () => {
  const headers = await getAuthHeaders();
  const response = await fetch(`${BASE_URL}/users/me`, {
    method: 'DELETE',
    headers
  });
  if (!response.ok) throw new Error('Failed to delete account');
  return await response.json();
};

export const getMyEvents = async () => {
  try {
    const headers = await getAuthHeaders();
    const response = await fetch(`${BASE_URL}/events/my-events`, { headers });
    if (!response.ok) return [];
    return await response.json();
  } catch (err) {
    console.error('Error fetching my events:', err);
    return [];
  }
};

export const getUserAnalytics = async () => {
  try {
    const headers = await getAuthHeaders();
    const response = await fetch(`${BASE_URL}/users/me/analytics`, { headers });
    if (!response.ok) return null;
    return await response.json();
  } catch (err) {
    console.error('Error fetching user analytics:', err);
    return null;
  }
};

export const getAdminAnalytics = async () => {
  try {
    const headers = await getAuthHeaders();
    const response = await fetch(`${BASE_URL}/admin/analytics`, { headers });
    if (!response.ok) throw new Error('Failed to fetch admin analytics');
    return await response.json();
  } catch (error) {
    console.error('Error fetching admin analytics:', error);
    return null;
  }
};

export const getAdminReports = async () => {
  try {
    const headers = await getAuthHeaders();
    const response = await fetch(`${BASE_URL}/admin/reports`, { headers });
    if (!response.ok) throw new Error('Failed to fetch admin reports');
    return await response.json();
  } catch (error) {
    console.error('Error fetching admin reports:', error);
    return [];
  }
};

export const banUser = async (userId) => {
  try {
    const headers = await getAuthHeaders();
    const response = await fetch(`${BASE_URL}/admin/users/${userId}/ban`, {
      method: 'POST',
      headers,
    });
    if (!response.ok) throw new Error('Failed to ban user');
    return await response.text();
  } catch (error) {
    console.error('Error banning user:', error);
    throw error;
  }
};


