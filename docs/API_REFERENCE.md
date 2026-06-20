# Localite API Reference

The Localite Backend exposes a standard RESTful API protected by JWT authentication. 
Base URL: `http://localhost:8080/api`

## Authentication

### `POST /users/signup`
Creates a new user.
- **Body**: `{ "username": "foo", "password": "bar", "email": "foo@bar.com" }`
- **Response**: JWT Token (String)

### `POST /users/login`
Authenticates an existing user.
- **Body**: `{ "username": "foo", "password": "bar" }`
- **Response**: JWT Token (String)

## Users & Profiles

### `GET /users/me`
Fetches the currently authenticated user's profile.
- **Headers**: `Authorization: Bearer <token>`
- **Response**: User object (excludes password).

### `PUT /users/me`
Updates the authenticated user's profile.
- **Headers**: `Authorization: Bearer <token>`
- **Body**: `{ "bio": "...", "sportsInterests": "...", "neighborhood": "..." }`
- **Response**: Updated User object.

### `GET /users/{userId}`
Fetches a specific user's public profile (including ratings, events hosted/attended).
- **Headers**: `Authorization: Bearer <token>`
- **Response**: Public Profile DTO.

## Events

### `GET /events`
Retrieves a list of events. Supports filtering.
- **Query Params**: 
  - `category` (String)
  - `lat` (Double)
  - `lng` (Double)
  - `radius` (Double, default 10.0)
- **Response**: List of Event objects.

### `POST /events`
Initializes a new event.
- **Headers**: `Authorization: Bearer <token>`
- **Body**: Event object (+ optional `recurrence` and `recurrenceEndDate`).
- **Response**: Created Event object(s).

### `GET /events/recommended`
Fetches events scored and sorted based on the user's `sportsInterests` and `neighborhood`.
- **Headers**: `Authorization: Bearer <token>`
- **Response**: List of Event objects.

## RSVPs & Ticketing

### `POST /events/{eventId}/rsvp`
RSVPs the authenticated user to an event.
- **Headers**: `Authorization: Bearer <token>`
- **Response**: Success message indicating status (GOING or WAITLIST).

### `GET /events/{eventId}/ticket`
Retrieves the user's ticket/QR code data for a specific event.
- **Headers**: `Authorization: Bearer <token>`
- **Response**: `{ "ticketId": "uuid", "status": "GOING" }`

### `POST /events/{eventId}/checkin/{ticketId}`
(Host Only) Scans a ticket and checks in an attendee, updating trust scores.
- **Headers**: `Authorization: Bearer <token>`
- **Response**: Success message.

## Reviews & Analytics

### `POST /reviews/host/{hostId}`
Submits a rating and review for a host (only valid if the user has `ATTENDED` an event hosted by them).
- **Headers**: `Authorization: Bearer <token>`
- **Body**: `{ "rating": 5, "comment": "Great event!" }`
- **Response**: Review object.

### `GET /reviews/host/{hostId}`
Gets all reviews for a specific host.
- **Response**: List of Review objects.

### `GET /users/me/analytics`
Fetches aggregated analytics for the authenticated host.
- **Headers**: `Authorization: Bearer <token>`
- **Response**: AnalyticsResponse DTO (Counts, Averages, Chart Data).

## Social Network

### `POST /network/follow/{userId}`
Follows a specific user.
- **Headers**: `Authorization: Bearer <token>`
- **Response**: Success message.

### `DELETE /network/unfollow/{userId}`
Unfollows a specific user.
- **Headers**: `Authorization: Bearer <token>`
- **Response**: Success message.

### `GET /feed`
Retrieves events hosted by users the authenticated user follows.
- **Headers**: `Authorization: Bearer <token>`
- **Response**: List of Event objects.

## Messaging

### `POST /messages`
Sends a direct message to a user.
- **Headers**: `Authorization: Bearer <token>`
- **Body**: `{ "receiverId": 2, "content": "Hello!" }`
- **Response**: DirectMessage object.

### `GET /messages/{userId}`
Gets the conversation history between the authenticated user and another user.
- **Headers**: `Authorization: Bearer <token>`
- **Response**: List of DirectMessage objects.
