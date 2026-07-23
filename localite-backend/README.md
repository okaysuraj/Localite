# Localite Backend (Spring Boot)

The core API gateway and business logic processor for the Localite ecosystem.

## Technology Stack
- **Framework**: Spring Boot 3.x
- **Language**: Java 17+
- **Security**: Spring Security + Firebase Auth
- **Data Access**: Spring Data JPA / Hibernate
- **Database**: Neon Cloud PostgreSQL (Configured via environment variables)

1. Run `mvn clean install` to build the application:
   ```bash
   mvn clean install
   ```
2. Run `mvn spring-boot:run` to start the server:
   ```bash
   mvn spring-boot:run
   ```