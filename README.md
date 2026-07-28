# Secure Full-Stack Authentication & User Management System

A robust, enterprise-grade, full-stack authentication and user management system. This repository features a high-performance **Spring Boot** backend integrated with standard modern security workflows, and a sleek **React 19** frontend powered by **Tailwind CSS v4** and **Framer Motion**.

---

## 🏗️ System Architecture

The application is structured to ensure high performance, security, and scalability. It leverages JWTs for authentication, Redis for low-latency session management, RabbitMQ for asynchronous processing of email notifications, and PostgreSQL for reliable database persistence.

```
                     +---------------------------+
                     |        React Client       |
                     |  (React 19, Tailwind v4)  |
                     +-------------+-------------+
                                   |
                     HTTPS / REST  | (JWT Auth & Cookies)
                                   v
                     +---------------------------+
                     |     Spring Boot Server    |
                     |  (Java 21, Security, JWT) |
                     +----+-------------+----+---+
                          |             |    |
             +------------+             |    +------------+
             |                          |                 |
             v                          v                 v
+------------+------------+   +---------+---------+   +---+------------+
|        PostgreSQL       |   |       Redis       |   |    RabbitMQ    |
|   (User & Profile DB)   |   |  (Refresh Tokens) |   | (Email Queue)  |
+-------------------------+   +-------------------+   +--------+-------+
                                                               |
                                                               | (Consumer)
                                                               v
                                                      +--------+-------+
                                                      |    SMTP Mail   |
                                                      | (Spring Mail)  |
                                                      +----------------+
```

---

## ✨ Features

### 🔒 Backend (Spring Boot)
- **Role-Based Security**: Custom implementation using Spring Security with JWT.
- **Dual-Token System**: Stateless JWT Access Tokens paired with secure HttpOnly Refresh Tokens stored in Redis.
- **Social Login (OAuth2)**: Seamless integrations with **Google** and **GitHub**.
- **Asynchronous Processing**: Publishes email delivery payloads to RabbitMQ, handled by a listener to ensure fast API response times.
- **Rich Emails**: HTML-templated emails sent using Spring Boot Mail Sender for registration verification, forgot-password requests, and reset confirmations.
- **Redis Session Caching**: Blazing-fast token lookup and automatic TTL expiration.
- **RESTful Architecture**: Follows best practices for API resource routing, CORS handling, and exceptional centralized error handling via `@ControllerAdvice`.

### 💻 Frontend (React 19)
- **Modern Tech Stack**: Built with React 19, TypeScript, and Vite.
- **Tailwind CSS v4.0**: Styling implemented with the latest, high-performance Tailwind engine.
- **Fluid Animations**: Smooth transitions and interactive elements powered by Framer Motion.
- **Form Validation**: Clean, schema-based client-side validations with React Hook Form and Zod.
- **Axios Interceptors**: Handles automatic token refresh elegantly by intercepting `401` errors and making cookies-aware token rotation calls.
- **Robust Routing**: Built on React Router DOM v7 with protected routes keeping dashboard/profile resources safe from unauthenticated users.
- **Elegant Toasts**: Instant action feedback with React Toastify.

---

## 🛠️ Technology Stack

| Component | Technology | Version | Description |
|---|---|---|---|
| **Backend** | Java | 21 | Programming Language |
| | Spring Boot | 4.1.0 | Core Framework |
| | Spring Security | Latest | Auth and Security Controls |
| | JSON Web Tokens | 0.11.5 | JJWT (Token generation & decoding) |
| | PostgreSQL | 16+ | Primary Relational Database |
| | Redis | 7+ | Cache & Refresh Token Store |
| | RabbitMQ | 3.12+ | Async Message Broker (Email Queue) |
| **Frontend** | React | 19.2.7 | UI Library |
| | TypeScript | 6.0.2 | Typed Javascript Superset |
| | Vite | 8.1.1 | Project Bundler & Dev Server |
| | Tailwind CSS | 4.3.2 | CSS Styling Engine |
| | Framer Motion | 12.42.2 | Interaction & Animations |

---

## 📂 Project Structure

```text
authentication/
├── client/                      # Frontend Application
│   ├── src/
│   │   ├── api/                 # Axios configuration and API calls
│   │   ├── components/          # Reusable UI components (Forms, Navbar, Footer)
│   │   ├── guard/               # Protected route validation logic
│   │   ├── interfaces/          # TypeScript types and interfaces
│   │   ├── pages/               # Page views (Home, Login, Profile, etc.)
│   │   ├── provider/            # React Context Providers (Auth, Profile, Theme)
│   │   └── schema/              # Form validation schemas (Zod)
│   ├── package.json             # Node dependencies and scripts
│   └── vite.config.ts           # Vite configuration with Tailwind CSS v4
│
├── server/                      # Backend Application
│   ├── src/main/java/com/auth/server/
│   │   ├── config/              # Security, CORS, RabbitMQ, Redis & Web configurations
│   │   ├── controller/          # API Controllers (Auth, Profile)
│   │   ├── dto/                 # Request & Response Data Transfer Objects
│   │   ├── entity/              # Database entities (UserEntity)
│   │   ├── exception/           # Custom exception handling & global advice
│   │   ├── producer/            # RabbitMQ email queue producers
│   │   ├── repository/          # JpaRepositories
│   │   ├── service/             # Business Logic (JWT, Profile, Redis, Custom OAuth2)
│   │   └── util/                # Utilities (Cookie, Files, Mail)
│   ├── src/main/resources/
│   │   └── application.yaml     # Application configuration
│   └── build.gradle             # Gradle dependencies and build steps
│
└── docker-compose.yaml          # Multi-container orchestration (PostgreSQL, Redis, RabbitMQ)
```

---

## ⚙️ Configuration & Environment Setup

### 1. Database & Services (Docker Compose)
You can run all the required infrastructure services locally using Docker. The standard services are PostgreSQL, Redis, and RabbitMQ. 

Update the `docker-compose.yaml` in the root folder with:

```yaml
version: '3.8'

services:
  postgres:
    image: postgres:16-alpine
    container_name: auth-postgres
    ports:
      - "5432:5432"
    environment:
      POSTGRES_DB: auth_db
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: password
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    container_name: auth-redis
    ports:
      - "6379:6379"

  rabbitmq:
    image: rabbitmq:3-management-alpine
    container_name: auth-rabbitmq
    ports:
      - "5672:5672"
      - "15672:15672"
    environment:
      RABBITMQ_DEFAULT_USER: guest
      RABBITMQ_DEFAULT_PASS: guest

volumes:
  postgres_data:
```

### 2. Backend Environment Config (`server/.env`)
Create a `.env` file inside the `server` directory:

```env
PORT=8080
DB_NAME=auth_db
DB_USER=postgres
DB_PASS=password
MAIL_USER=your_gmail@gmail.com
MAIL_PASS=your_app_specific_password
SECRET=your_32_byte_hexadecimal_or_strong_random_jwt_secret_key_here
ACCESS_TIME=900000              # 15 minutes (in ms)
REFRESH_TIME=604800000          # 7 days (in ms)
UPLOAD_DIR=./uploads
CLIENT_URL=http://localhost:5173

# OAuth2 Credentials
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
```

### 3. Frontend Environment Config (`client/.env`)
Create a `.env` file inside the `client` directory:

```env
VITE_API_URL=http://localhost:8080/api/v1
```

---

## 🚀 How to Run the Application

### Step 1: Start Infrastructure Services
Make sure Docker is running on your machine, then run:
```bash
docker-compose up -d
```

### Step 2: Start the Backend (Spring Boot)
1. Navigate to the server folder:
   ```bash
   cd server
   ```
2. Build and run the server using Gradle:
   ```bash
   ./gradlew bootRun
   ```
The backend should now be running at `http://localhost:8080`.

### Step 3: Start the Frontend (React Client)
1. Open a new terminal and navigate to the client folder:
   ```bash
   cd client
   ```
2. Install npm dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
The frontend should now be running at `http://localhost:5173`. Open your browser and navigate there to test the application!

---

## 🔌 API Endpoints Reference

All API routes are prefixed with `/api/v1`.

### Authentication Endpoints (`/api/v1/auth`)

| Endpoint | Method | Security | Description |
|---|---|---|---|
| `/auth/register` | `POST` | Public | Register a new user account |
| `/auth/login` | `POST` | Public | Authenticate a user & receive JWT |
| `/auth/refresh` | `GET` | Public (Cookies) | Rotates and returns a new Access Token |
| `/auth/verify-email` | `GET` | Public | Verify user's email address via link token |
| `/auth/forgot-password` | `POST` | Public | Initiate password reset by requesting a mail |
| `/auth/reset-password` | `POST` | Public | Submit new password using reset token |
| `/auth/logout` | `POST` | Authenticated | Revoke refresh token and clear HTTP cookies |

### Profile Endpoints (`/api/v1/profile`)

| Endpoint | Method | Security | Description |
|---|---|---|---|
| `/profile` | `GET` | Authenticated | Fetch current user's profile info |
| `/profile` | `PUT` | Authenticated | Update user profile info & upload avatar |

---

## 📝 License

This project is licensed under the [MIT License](LICENSE). Feel free to use, modify, and distribute it as you see fit.
