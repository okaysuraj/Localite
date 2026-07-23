import { auth } from '../firebase';
import { API_URL as BASE_URL } from '../config';

const getAuthHeaders = async () => {
  const user = auth.currentUser;
  if (!user) return { 'Content-Type': 'application/json' };
  
  const token = await user.getIdToken();
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  };
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
    if (!response.ok) throw new Error('Failed to fetch messages');
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
      body: JSON.stringify({ content })
    });
    if (!response.ok) throw new Error('Failed to send message');
    return await response.json();
  } catch (error) {
    console.error('Error sending event message:', error);
    throw error;
  }
};

// --- Social & Engagement (Phase 6) ---

export const getLeaderboard = async (sport) => {
  try {
    const headers = await getAuthHeaders();
    const response = await fetch(`${BASE_URL}/leaderboard/${sport}`, { headers });
    if (!response.ok) throw new Error('Failed to fetch leaderboard');
    return await response.json();
  } catch (error) {
    console.error(`Error fetching leaderboard for ${sport}:`, error);
    return [];
  }
};

export const awardXp = async (actionStr) => {
  try {
    const headers = await getAuthHeaders();
    const response = await fetch(`${BASE_URL}/gamification/award`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ action: actionStr })
    });
    if (!response.ok) throw new Error('Failed to award XP');
    return await response.json();
  } catch (error) {
    console.error('Error awarding XP:', error);
    throw error;
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
    return await response.json(); // or text depending on backend
  } catch (error) {
    console.error('Error unfollowing user:', error);
    throw error;
  }
};

export const sendConnectionRequest = async (userId) => {
  try {
    const headers = await getAuthHeaders();
    const response = await fetch(`${BASE_URL}/users/${userId}/connect`, { method: 'POST', headers });
    if (!response.ok) throw new Error('Failed to send connection request');
    return await response.text();
  } catch (error) {
    console.error('Error sending connection request:', error);
    throw error;
  }
};

export const getPendingConnections = async () => {
  try {
    const headers = await getAuthHeaders();
    const response = await fetch(`${BASE_URL}/users/connections/pending`, { headers });
    if (!response.ok) throw new Error('Failed to fetch pending connections');
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
    return await response.text();
  } catch (error) {
    console.error('Error accepting connection:', error);
    throw error;
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
      throw new Error(`Failed to RSVP: ${errText}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error RSVPing to event:', error);
    throw error;
  }
};

export const getUsers = async () => {
  try {
    const headers = await getAuthHeaders();
    // Assuming backend has a /users endpoint
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

export const getCategories = async () => {
  // Categories can either be hardcoded or fetched from backend if we have an endpoint
  return [
    {
      id: "c1",
      name: "Tennis",
      type: "TRADITION",
      activeMatches: 24,
      venues: 12,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDUg8QrDPQJk75uhkvDQh_5r_1od6bLcWWDl2xGwc-NovzRMlETtljT3uiGuZaqFCWM3HIK4vQdjeY6IHdcGbbr1PhlVlk5EHIXS-hc4pRqlLAh2s0fQiHa7BFOgeTV--Z8FwytAMmSQVlyQFunstpp57vXpRXQKaN8JlKDh7BTtglO7zEuXBIOZQEDA-cBKNQP1BzFkw-NHQhnpi3lkiyR1SOiQHR4jKNjvNQVJNSgfoepPvHly6RHNw"
    },
    {
      id: "c2",
      name: "Polo",
      type: "MAJESTY",
      activeMatches: 8,
      venues: 4,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC6-QYCloEn4YPVifuHqvUSVPSOnrE8JgjvRMp11MZIqsLHkaaUQ4-0qm6yGlNjO8avzbXaogcMHrNk6h0-8YMNWx2_18FDXa-ptZKjlLpQzGR4WirbnxNKqsWKDMimzQkstS-LV_fLFYrCq47TUx2RD2m98U4J_DkGkWYx6BKedTBNl-OSFMrSVN8SGL44pT11TqhZ0D0HKD5zrNcvq336VBoW-q6Pb7yS5S6sxDu001sXTGp5_q_9oQ"
    },
    {
      id: "c3",
      name: "Golf",
      type: "PRECISION",
      activeMatches: 11,
      venues: 15,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCgQspEnJ36dCN3YJVDXpOM3-aqisOi65bF5flfSdAQuQA3Dx5BkbD8Y4dK-icVIPnigBpJ_OAOjOlAODJwM0-1UmepuVGCvlS2Lc75NahAVUv-KwRmKBgIVpihw2YTdIdPYQzeo6xz9zD2M4UMLn5WP-S3RIyvrRewjrh0hzDMPpjeDwzD2PWT5Mr6mgvLHKurZ7_OQaQztCCr6mKQnPtuQujxB3poiky9iW1Bwbxz4ohMT4Z0RCPIog"
    },
    {
      id: "c4",
      name: "Cricket",
      type: "HERITAGE",
      activeMatches: 5,
      venues: 3,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCzUC_MM3iIfr1bRDeWexWi9u1Wxvj9sPgOUK8kMnoLnVD7_7_1dYNbr4VpcAd-m8eTDBDy7PXE97pvP_fVMTF51tZXhY2aC0Lumn8_7pJAUlx6BltTBlzLrUmgvhPsYKbJcsuauZB2MU3_EWyxus1Q6QUKfsL7yR2l9bgpyERBnfkVfnGAv0f0t9TG4HrK8ixWKQvVvUeIMN1puiVP46oXfYsrgR6iZ0hilhIIhX4ImGKPb22uO9StUQ"
    }
  ];
};
