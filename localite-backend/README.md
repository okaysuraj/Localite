# Localite Backend (Spring Boot)

The core API gateway and business logic processor for the Localite ecosystem.

## Technology Stack
- **Framework**: Spring Boot 3.x
- **Language**: Java 17+
- **Security**: Spring Security + JWT
- **Data Access**: Spring Data JPA / Hibernate
- **Database**: Neon Cloud PostgreSQL (Configured via environment variables)

## Capabilities
- **Stateless Authentication**: Issues and validates JWTs.
- **Geospatial Queries**: Calculates distances and filters events within a specified radius using Haversine formula directly in JPA/SQL.
- **Gamification Engine**: Calculates Trust Scores and updates profiles based on `RSVP` and `Check-in` state machines.
- **Analytics Aggregation**: Transforms raw database events into structured chart payloads (`AnalyticsResponse` DTO) for the frontend.
- **Event Instantiation**: Handles deep-copy generation of recurring events safely.
- **Social Graph Tracking**: Manages `Follow` entities and builds custom `Feed` responses.

## Quick Start
1. Ensure Java 17+ and Maven are installed.
2. Configure database credentials by setting environment variables (refer to `.env.example`):
   - **PowerShell (Windows)**:
     ```powershell
     $env:SPRING_DATASOURCE_URL="jdbc:postgresql://<neon-host>/localite_db?sslmode=require"
     $env:SPRING_DATASOURCE_USERNAME="<neon-username>"
     $env:SPRING_DATASOURCE_PASSWORD="<neon-password>"
     ```
   - **Bash/Zsh (macOS/Linux/Git Bash)**:
     ```bash
     export SPRING_DATASOURCE_URL="jdbc:postgresql://<neon-host>/localite_db?sslmode=require"
     export SPRING_DATASOURCE_USERNAME="<neon-username>"
     export SPRING_DATASOURCE_PASSWORD="<neon-password>"
     ```
3. Run `mvn clean install` to build the application:
   ```bash
   mvn clean install
   ```
4. Run `mvn spring-boot:run` to start the server:
   ```bash
   mvn spring-boot:run
   ```
5. The API will be available at `http://localhost:8080`.

For detailed API documentation, see [`docs/API_REFERENCE.md`](../docs/API_REFERENCE.md) in the root repository.
