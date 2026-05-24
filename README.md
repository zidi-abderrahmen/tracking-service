# Tracking Services / Services Management DB

## Overview

This repository contains a full-stack tracking and service management application with:

- `backend/`: Spring Boot REST API and persistence layer
- `frontend/`: Angular-based web application with admin and engineer dashboards

The system supports user authentication, role-based access, client/service management, assignment workflows, reports, and engineer timesheets.

---

## Key Features

- JPA persistence using MySQL
- Angular 21 frontend with Angular Material UI
- Role-based routes for `ADMIN` and `ENGINEER`
- Admin features: reports, clients, users, services, assignments
- Engineer features: personal services, timesheets, service details
- SSR-capable Angular application with build and serve scripts

---

## Repository Structure

- `backend/`
  - Spring Boot application source
  - Maven wrapper files (`mvnw`, `mvnw.cmd`)
  - `pom.xml` defines dependencies and build configuration
  - `src/main/resources/application.properties` contains database configuration
- `frontend/`
  - Angular application source
  - `package.json` defines frontend scripts and dependencies
  - `src/app/` contains core modules, features, guards, and routes

---

## Technology Stack

- Java 21
- Spring Boot 4.1.0-M1
- Spring Data JPA
- MySQL Connector/J
- Lombok
- Angular 21
- Angular Material
- Express (SSR support)
- Cypress and Vitest for frontend testing

---

## Prerequisites

- Java 21 JDK
- Maven (or use `./mvnw`)
- Node.js and npm
- MySQL database

---

## Backend Setup

1. Navigate to the backend folder:

```bash
cd backend
```

2. Configure your MySQL connection using environment variables:

```bash
export DATABASE_NAME=your_database_name
export DATABASE_USERNAME=your_db_user
export DATABASE_PASSWORD=your_db_password
```

3. Build the backend application:

```bash
./mvnw clean package
```

4. Run the backend:

```bash
./mvnw spring-boot:run
```

or launch the packaged JAR:

```bash
java -jar target/ServicesManagementDB-0.0.1-SNAPSHOT.jar
```

> The backend reads MySQL settings from `backend/src/main/resources/application.properties` and expects MySQL to be available at `jdbc:mysql://localhost:3306/${DATABASE_NAME}` unless you override it.

---

## Frontend Setup

1. Navigate to the frontend folder:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm start
```

4. Build the production frontend:

```bash
npm run build
```

5. Serve SSR build:

```bash
npm run serve:ssr:services-management-app
```

---

## Testing

### Backend

```bash
cd backend
./mvnw test
```

### Frontend

```bash
cd frontend
npm test
```

Frontend Cypress tests may also be available under `frontend/cypress/`.

---

## Application Routes

The Angular frontend defines routes for:

- `/login`
- `/admin/reports`
- `/admin/services`, `/admin/services/add`, `/admin/services/edit/:idService`, `/admin/services/details/:idService`
- `/admin/clients`, `/admin/clients/add`, `/admin/clients/edit/:idClient`, `/admin/clients/details/:idClient`
- `/admin/users`, `/admin/users/add`, `/admin/users/edit/:idUser`, `/admin/users/details/:idUser`
- `/admin/assignments`, `/admin/assignments/add`
- `/engineer/my-services`, `/engineer/my-services/details/:idService`
- `/engineer/timesheets`, `/engineer/timesheets/add`

---

## Notes

- The backend uses `spring.jpa.hibernate.ddl-auto=update` for schema updates during development.
- Environment variables are required for database credentials.
- The frontend is a private Angular application and uses `npm@11.8.0` as the package manager.

---

## References

- `backend/HELP.md` contains useful Spring Boot and Maven reference links
- `frontend/package.json` lists Angular, Cypress, and SSR dependencies

---

## Contact

If you need help running or extending this project, review the backend service packages under `backend/src/main/java/com/ia/servicesmanagementdb` and the Angular feature modules under `frontend/src/app/features`.
