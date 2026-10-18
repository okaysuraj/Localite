# Localite

Web and mobile clients for the same Spring Boot API. Each app builds independently.

## Project map

| Directory | Purpose | Entry point |
| --- | --- | --- |
| `localite-web` | React web app, built with Vite | `src/main.jsx` |
| `localite-mobile` | React Native app, built with Expo | `index.js` and `App.js` |
| `localite-backend` | Java API, PostgreSQL persistence, Firebase authentication, live messaging | `LocaliteBackendApplication.java` |

Use Node.js 24 and Java 17. The backend includes a Maven wrapper, so a separate Maven installation is optional.

## Local setup

For a new checkout, copy each app's `.env.example` to `.env` and fill in its values. Existing `.env` files can stay in place. Keep credentials out of Git.

The backend needs a PostgreSQL database and Firebase Admin credentials. Supply the three `FIREBASE_*` environment values, or place a service-account JSON file at `localite-backend/firebase-service-account.json`. A private key stored in an environment variable can use literal `\n` line breaks.

The clients need the public Firebase configuration for that same project. Enable email/password sign-in in Firebase Authentication. These public client settings are separate from the backend service-account credentials.

Start each app from its own terminal:

```powershell
cd localite-backend
.\mvnw.cmd spring-boot:run
```

```powershell
cd localite-web
npm ci
npm run dev
```

```powershell
cd localite-mobile
npm ci
npm start
```

The API runs at `http://localhost:8080/api`; the web development server runs at `http://localhost:5173`. On macOS or Linux, use `./mvnw` for the backend.

For a physical phone, set `EXPO_PUBLIC_API_IP` to your computer's Wi-Fi address. The Android emulator maps the default `localhost` setting to `10.0.2.2`. For a deployed backend, set `EXPO_PUBLIC_API_URL` to its full HTTPS API URL. The web app uses `VITE_API_URL`. Both clients derive their WebSocket URL from the API URL.

## Where changes belong

- Web URLs and access rules: `localite-web/src/AppRoutes.jsx`. Pages are loaded lazily. `App.jsx` owns providers, navigation, and the footer.
- Mobile stack screens: `localite-mobile/src/navigation/AppNavigator.js`. The four bottom tabs live in `MainTabs.js`.
- Feature UI: web `src/pages/` and mobile `src/screens/`, grouped by feature. Keep UI state and handlers with their screen; extract a component when it has a distinct job or is reused.
- API calls: each client's `src/services/api.js` names the endpoints. Its `src/api/apiClient.js` attaches current Firebase tokens, handles JSON or text responses, and preserves server error messages. Pass an explicit fallback only when the screen supports an empty or offline state.
- Authentication and live connection state: each client's `src/context/`.
- Backend request handling: `controller/`. Event filtering and recommendations live in `EventDiscoveryService`; recurring-event creation lives in `EventScheduleService`. Persistence queries belong in `repository/`, and stored entities belong in `model/`.
- Web styles: `src/index.pcss` and `tailwind.config.js`. Mobile shared styles: `src/theme.js`, with screen-specific styles kept beside their UI.

The client API modules intentionally live in their own app directories so Vite and Metro can build without a shared-package setup. Keep endpoint changes consistent across both clients when a feature exists on both platforms.

Comments should explain a decision, constraint, fallback, or non-obvious behavior. Prefer descriptive names and short functions over comments that repeat the code.

## Build checks

```powershell
cd localite-web
npm run lint
npm run build
```

```powershell
cd localite-mobile
npx expo export --platform android --platform ios --output-dir dist
```

```powershell
cd localite-backend
.\mvnw.cmd clean package
```

The mobile export checks bundling; camera, location, maps, notifications, and sign-in still need a device or simulator check. The separate Vite app provides the website; mobile screens use native APIs.

Package lockfiles and Maven wrapper settings are required for reproducible builds. Generated output, caches, logs, local editor settings, and credentials are ignored. The repository has no automated test suite.

## Current integration limits

Ticket purchases create RSVPs without charging a payment provider. RSVP emails are not delivered; Firebase handles account-verification emails. Several screens still contain static sample content. These existing product limits are separate from the code structure.
