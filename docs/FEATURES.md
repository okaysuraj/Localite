# Localite Feature Matrix

Localite is a fully-featured MVP encompassing Gamification, Networking, and Event Management.

## Core Features
1. **User Authentication & Profiles**
   - JWT-based Auth (Login/Signup).
   - Detailed user profiles including `bio`, `sportsInterests`, and `neighborhood`.
   - Gamification metrics: **Trust Score**, Events Hosted, Events Attended.

2. **Event Discovery & Operations**
   - **Explore Feed/Map**: Users can discover events via a List view or interactive Map view.
   - **Recommended Events**: AI-style basic recommendation engine scoring events based on user interests and location.
   - **RSVP System**: One-click RSVP with capacity limits and Waitlist handling.

3. **Gamification & Reputation (Phase 3/4)**
   - **Trust Scores**: Users gain points for hosting (+10) and attending (+5) events.
   - **QR Code Ticketing & Check-in**: Hosts can scan QR codes generated for RSVPs to mark them as `ATTENDED`, automatically distributing points and verifying attendance.
   - **Post-Event Ratings**: Verified attendees can rate and review hosts (1-5 stars) after the event.

4. **Social & Networking (Phase 8)**
   - **Follower System**: Users can view public profiles of operators and "Follow" them.
   - **Network Feed**: A chronologically sorted feed of events hosted exclusively by the users you follow.
   - **Direct Messaging**: Secure 1-on-1 private messaging infrastructure between users for coordination.

5. **Host Tools (Phase 9/10)**
   - **Analytics Dashboard**: Hosts have a dedicated dashboard visualizing total reach, average ratings, and engagement trajectories via charts.
   - **Recurring Events**: Automation tool to rapidly initialize Daily, Weekly, or Monthly events with deep-copy backend generation.

## Platform Support
| Feature | Web App (React) | Mobile App (Expo) |
|---------|-----------------|-------------------|
| Auth    | ✅              | ✅                |
| Explore | ✅ (List + Map) | ✅ (List)         |
| RSVP    | ✅              | ✅                |
| QR Gen  | ✅              | ✅                |
| QR Scan | ❌ (Not impl)   | ✅ (Native Cam)   |
| Rating  | ✅              | ✅                |
| DM Chat | ✅              | ✅                |
| Feed    | ✅              | ✅                |
| Analytics| ✅ (Recharts)  | ✅ (Chart-kit)    |
| Recurring| ✅              | ✅                |
