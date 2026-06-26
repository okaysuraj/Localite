# Localite 🟢

> **"Digital parameters for physical communities."**

Localite is a modern, enterprise-ready community engagement ecosystem. It connects locals through hyper-specific events, incentivizes participation through a gamified reputation system, and equips organizers with powerful analytics and automation tools.

## The Ecosystem
The Localite monorepo consists of three core domains:
1. **[Backend (`localite-backend`)](./localite-backend)**: A robust Spring Boot REST API driving business logic, security, and data persistence.
2. **[Web Interface (`localite-web`)](./localite-web)**: A high-performance React application featuring geospatial maps, animated dashboards, and a sleek dark/neon-lime aesthetic.
3. **[Mobile Application (`localite-mobile`)](./localite-mobile)**: A React Native cross-platform app bringing native QR scanning, real-time feeds, and physical mobility to the Localite network.

## Core Features
- **Gamified Reputation**: Trust Scores dynamically update based on hosting and attending verified events.
- **Geospatial Discovery**: Find events happening near you via interactive maps (Leaflet/react-native-maps).
- **Secure Ticketing**: In-app QR code ticket generation and native camera scanning for attendance verification.
- **Social Graph**: Follow operators and curate a personalized Activity Feed.
- **Encrypted Comms**: Direct, 1-on-1 messaging between network nodes.
- **Host Analytics**: Real-time trajectory charts and operations ledgers for event organizers.
- **Automation**: Recurring Event engine to rapidly deploy daily, weekly, or monthly schedules.

## Documentation
For deep dives into the technical stack, API contracts, and deployment strategies, please refer to our `docs` folder:
- [Architecture Overview](./docs/ARCHITECTURE.md)
- [API Reference](./docs/API_REFERENCE.md)
- [Feature Matrix](./docs/FEATURES.md)
- [Setup & Deployment Guide](./docs/SETUP.md)

---
*Built with React, React Native, Spring Boot, Neon Cloud PostgreSQL, and GSAP.*
