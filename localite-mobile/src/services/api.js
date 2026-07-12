import { auth } from '../firebase';

// Use environment variable, or fallback to localhost. Note: For physical devices or Android emulator, localhost might need to be 10.0.2.2 or your machine's IP.
const BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:8080/api';

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
