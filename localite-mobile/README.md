# Localite Mobile App

The cross-platform native application for the Localite ecosystem, empowering users on the go.

## Technology Stack
- **Framework**: React Native + Expo
- **Navigation**: React Navigation (Bottom Tabs + Native Stack)
- **State**: AsyncStorage (for session persistence)
- **Hardware Integration**: Expo Camera (for QR Scanning)
- **Maps**: React Native Maps
- **Charts**: React Native Chart Kit

## Features
- **Mobile First Discovery**: Scrollable feeds and native map integration for discovering nearby events.
- **Hardware Scanner**: Utilizes the device camera to scan RSVP QR codes and automatically trigger the backend check-in logic.
- **Analytics On-The-Go**: Renders complex SVG bezier curves to display host performance natively.
- **Direct Messaging**: Mobile-optimized chat interface for real-time coordination.
- **Push-Ready Architecture**: Built on Expo, making it trivial to add EAS Push Notifications in the future.

## Quick Start
1. Ensure Node.js 18+ and the Expo Go app (on your physical device) are installed.
2. Run `npm install` to download dependencies.
3. Configure the Backend Connection:
   - Open `src/config.js` and set `API_URL` to your computer's local IP address (e.g., `http://192.168.1.5:8080/api`). *Do not use `localhost` if testing on a physical device.*
4. Run `npm run start` to start the Expo Metro Bundler.
5. Scan the generated QR code in your terminal with the Expo Go app on your phone.
