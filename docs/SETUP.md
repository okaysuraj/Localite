# Localite Setup & Deployment Guide

## Prerequisites
- **Java 17+** (For Spring Boot Backend)
- **Maven** (For building the Backend)
- **Node.js 18+** & **npm** (For Web and Mobile)
- **Expo CLI** (`npm install -g expo-cli`)

---

## 1. Backend Setup (`localite-backend`)
The backend is a Spring Boot application using an H2 in-memory database by default.

1. Navigate to the backend directory:
   ```bash
   cd localite-backend
   ```
2. Build the project:
   ```bash
   mvn clean install
   ```
3. Run the application:
   ```bash
   mvn spring-boot:run
   ```
   *The API will be available at `http://localhost:8080`.*

---

## 2. Web Frontend Setup (`localite-web`)
The web frontend is built with React and Vite.

1. Navigate to the web directory:
   ```bash
   cd localite-web
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
   *The web app will be available at `http://localhost:5173`.*

---

## 3. Mobile App Setup (`localite-mobile`)
The mobile application is built with React Native and Expo.

1. Navigate to the mobile directory:
   ```bash
   cd localite-mobile
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure the API URL:
   - Ensure the `API_URL` in `src/config.js` points to your machine's local IP address (e.g., `http://192.168.1.X:8080/api`) rather than `localhost`, so physical devices can connect.
4. Start the Expo bundler:
   ```bash
   npm run start
   ```
5. Run on Device/Emulator:
   - Press `a` to run on an Android emulator.
   - Press `i` to run on an iOS simulator (Mac only).
   - Scan the QR code with the Expo Go app on your physical device.
