# Naturals Salon API

Backend foundation for Naturals Salon, built with Node.js, Express, and PostgreSQL (via Prisma).

## Stack
- **Node.js** (ES Modules)
- **Express.js**
- **Prisma** (ORM)
- **PostgreSQL**
- **Zod** (Validation)
- **Cors, Helmet** (Security)

## Setup

1. **Install dependencies**
   ```bash
   cd backend
   npm install
   ```

2. **Configure Environment Variables**
   Copy `.env.example` to `.env` and fill in your values.
   ```bash
   cp .env.example .env
   ```
   **Important variables:**
   - `PORT` (default 5000)
   - `DATABASE_URL` (your PostgreSQL connection string)
   - `FRONTEND_URL` (for CORS, default `http://localhost:5173`)

3. **Database Setup**
   Ensure PostgreSQL is running, then run Prisma migrations:
   ```bash
   npx prisma generate
   npx prisma migrate dev
   ```

4. **Development Server**
   Start the development server with hot-reload:
   ```bash
   npm run dev
   ```
   *The server will typically run on `http://localhost:5000`.*

5. **Production Start**
   ```bash
   npm start
   ```

## API Documentation

### Base Path
All API routes are prefixed with: `/api/v1`

### Endpoints

- **Health Endpoint**
  `GET /api/v1/health`
  *Returns server and database status.*
  **IMPLEMENTED**

- **Root Info**
  `GET /api/v1/`
  *Returns simple API identification.*
  **IMPLEMENTED**

- **Services API**
  **PLANNED**

- **Appointments API**
  **PLANNED**

- **Feedback API**
  **PLANNED**

- **Gallery API**
  **PLANNED**

- **Business Settings API**
  **PLANNED**

## Admin Security

- **JWT Strategy:** Access tokens are issued as JSON Web Tokens (JWT) using Bearer schema. Tokens have an 8h expiration.
- **Password Hashing:** Passwords are hashed using bcrypt with a factor of 10.
- **Rate Limiting:** A strict rate limiter is applied to login attempts (10 requests per 15 minutes) to prevent brute force attacks.
- **Admin Bootstrap:** Use `npm run admin:create` (or run `node scripts/bootstrapAdmin.js`) to create the initial admin account. Configuration depends on environment variables `ADMIN_EMAIL`, `ADMIN_NAME`, and `ADMIN_INITIAL_PASSWORD`.
- **Production Secrets:** A secure randomly generated `JWT_SECRET` must be set in production `.env`.
