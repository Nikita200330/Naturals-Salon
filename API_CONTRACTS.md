# API Contracts

## Services API

### `GET /api/v1/services`
- **Status:** IMPLEMENTED
- **Description:** Returns active salon services.
- **Query Params:**
  - `q` (optional): Search string (max 100 chars, case-insensitive, searches name, category, description).
  - `category` (optional): Filter by exact category string.
- **Response:**
  - `200 OK`: `{ success: true, data: [ { id, slug, name, category, description, price, durationMinutes } ] }`
  - `400 Bad Request`: Validation error.

### `GET /api/v1/services/:slug`
- **Status:** IMPLEMENTED
- **Description:** Returns a specific active service by slug.
- **Response:**
  - `200 OK`: `{ success: true, data: { id, slug, name, category, description, price, durationMinutes } }`
  - `404 Not Found`: `{ success: false, error: { code: 'SERVICE_NOT_FOUND', message: 'Service not found' } }`

### Service Write/Admin Endpoints
- **Status:** NOT IMPLEMENTED

## Feedback API

### `GET /api/v1/feedback`
- **Status:** IMPLEMENTED
- **Description:** Returns public approved website feedback.
- **Query Params:**
  - `page` (optional): Page number, defaults to 1.
  - `limit` (optional): Items per page, defaults to 10, max 50.
  - `rating` (optional): Filter by exact rating (1-5).
  - `serviceId` (optional): Filter by service.
  - `sort` (optional): 'newest', 'highest', 'lowest'. Defaults to 'newest'.
- **Response:**
  - `200 OK`: 
    ```json
    {
      "success": true,
      "data": {
        "items": [
          {
            "id": "...",
            "name": "...",
            "rating": 5,
            "feedback": "...",
            "createdAt": "...",
            "service": {
              "slug": "...",
              "name": "..."
            }
          }
        ],
        "count": 1,
        "averageRating": 5.0
      }
    }
    ```
  - `400 Bad Request`: Validation error.

### `POST /api/v1/feedback`
- **Status:** IMPLEMENTED
- **Description:** Submits new feedback. Will default to PENDING status. Rate limited.
- **Body:**
  - `name` (required, string, max 100)
  - `rating` (required, integer, 1-5)
  - `feedback` (required, string, max 2000)
  - `serviceId` (optional, string)
- **Response:**
  - `201 Created`: `{ "success": true, "data": { "id": "...", "status": "PENDING", "message": "Feedback submitted for review." } }`
  - `400 Bad Request`: Validation error or INVALID_SERVICE.
  - `409 Conflict`: DUPLICATE_FEEDBACK.
  - `429 Too Many Requests`: Rate limit exceeded.

## Admin API

All admin endpoints require an Authorization header: `Bearer <token>`

### `POST /api/v1/admin/auth/login`
- **Auth Required:** NO
- **Description:** Logs in an admin and returns a JWT token.
- **Body:** `{ email, password }`
- **Response:** `200 OK` with token and admin profile. `401 Unauthorized` for invalid credentials.

### `GET /api/v1/admin/auth/me`
- **Auth Required:** YES
- **Description:** Returns the current authenticated admin profile.
- **Response:** `200 OK` with admin profile.

### `GET /api/v1/admin/appointments`
- **Auth Required:** YES
- **Description:** Returns a list of appointments.
- **Query Params:** `status`, `date`, `serviceId`, `search`, `page`, `limit`
- **Response:** `200 OK` with paginated appointments.

### `GET /api/v1/admin/appointments/:id`
- **Auth Required:** YES
- **Description:** Returns a single appointment with status history.
- **Response:** `200 OK` with appointment details.

### `PATCH /api/v1/admin/appointments/:id/status`
- **Auth Required:** YES
- **Description:** Updates the status of an appointment. Checks for availability conflicts when confirming.
- **Body:** `{ status }` (Allowed: PENDING, CONFIRMED, REJECTED, CANCELLED, COMPLETED)
- **Response:** `200 OK` with updated appointment. `409 Conflict` for invalid transitions or time unavailability.

### `GET /api/v1/admin/feedback`
- **Auth Required:** YES
- **Description:** Returns a paginated list of all feedback.
- **Query Params:** `status`, `rating`, `serviceId`, `search`, `page`, `limit`
- **Response:** `200 OK` with feedback items.

### `PATCH /api/v1/admin/feedback/:id/status`
- **Auth Required:** YES
- **Description:** Updates the status of a feedback.
- **Body:** `{ status }` (Allowed: PENDING, APPROVED, REJECTED)
- **Response:** `200 OK` with updated feedback.

## GET /appointments/availability
Fetches real availability based on business hours, current time, existing bookings, and service configuration.

**Query Parameters:**
- `date` (string, required): Format YYYY-MM-DD
- `serviceId` (string, required): Slug or ID of the service

**Response Mode:**
- `slot-based`: When real slot interval and service duration are present, exact overlapping logic determines discrete slots.
- `preferred-time`: Used as a fallback when service duration is unknown or `APPOINTMENT_SLOT_INTERVAL_MINUTES` is not set.

**Blocking Statuses:**
- PENDING, CONFIRMED (Other statuses like CANCELLED do not block the slot)

**Timezone:**
- Handled via `Asia/Kolkata`.

**409 Behavior:**
- Appointment creation (`POST /appointments`) will reject requests with a `409 Conflict` (code `APPOINTMENT_TIME_UNAVAILABLE`) if the exact time or time slot is already taken.

**Limitations:**
- Multi-staff parallel booking capacity is currently not supported. Availability is based on a single-capacity assumption.
