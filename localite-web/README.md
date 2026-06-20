# Localite Web Interface

The high-performance, browser-based command center for the Localite ecosystem.

## Technology Stack
- **Framework**: React 18 + Vite
- **Styling**: Tailwind CSS (PostCSS)
- **Routing**: React Router DOM
- **Maps**: React Leaflet (OpenStreetMap)
- **Animations**: GSAP (GreenSock Animation Platform)
- **Icons**: Lucide React
- **Charts**: Recharts

## Design System
Localite Web utilizes a strict, custom design system defined in `tailwind.config.js` and `index.pcss`.
- **Aesthetic**: Dark Mode / Cyber / Technical
- **Primary Color**: Neon Lime (`#ccff00`)
- **Backgrounds**: Slate/Navy palettes (`#0f172a`, `#1e293b`)
- **Typography**: Space Grotesk (Headers), Inter (Body), JetBrains Mono (Technical/Labels).

## Features
- **Map-Based Discovery**: Interactive Leaflet maps rendering event coordinates.
- **Network Feed**: Dedicated social view for following operators.
- **Analytics Dashboard**: Animated data visualizations of host performance using `recharts`.
- **QR Code Management**: Generates secure QR codes for event RSVPs (`react-qr-code`).
- **Direct Messaging**: Sleek UI for 1-on-1 communications.

## Quick Start
1. Ensure Node.js 18+ is installed.
2. Run `npm install` to download dependencies.
3. Run `npm run dev` to start the Vite development server.
4. Access the app at `http://localhost:5173`.
