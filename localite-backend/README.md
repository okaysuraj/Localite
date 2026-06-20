# Localite Backend (Spring Boot)

The core API gateway and business logic processor for the Localite ecosystem.

## Technology Stack
- **Framework**: Spring Boot 3.x
- **Language**: Java 17+
- **Security**: Spring Security + JWT
- **Data Access**: Spring Data JPA / Hibernate
- **Database**: H2 In-Memory (Configurable to PostgreSQL/MySQL)

## Capabilities
- **Stateless Authentication**: Issues and validates JWTs.
- **Geospatial Queries**: Calculates distances and filters events within a specified radius using Haversine formula directly in JPA/SQL.
- **Gamification Engine**: Calculates Trust Scores and updates profiles based on `RSVP` and `Check-in` state machines.
- **Analytics Aggregation**: Transforms raw database events into structured chart payloads (`AnalyticsResponse` DTO) for the frontend.
- **Event Instantiation**: Handles deep-copy generation of recurring events safely.
- **Social Graph Tracking**: Manages `Follow` entities and builds custom `Feed` responses.

## Quick Start
1. Ensure Java 17+ and Maven are installed.
2. Run `mvn clean install` to build.
3. Run `mvn spring-boot:run` to boot the server.
4. By default, the server runs on `http://localhost:8080`.

For detailed API documentation, see [`docs/API_REFERENCE.md`](../docs/API_REFERENCE.md) in the root repository.
