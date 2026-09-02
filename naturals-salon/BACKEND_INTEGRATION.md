# Backend Integration Requirements for Naturals Salon

This document outlines the frontend contracts required by a future backend implementation. The frontend is currently running as a static site without backend integration.

## 1. Appointment API Contract

The frontend prepares a standard appointment request payload.

**Endpoint:** `POST /appointments`

**Request Payload:**
```json
{
  "customerName": "Example Name",
  "mobile": "9876543210",
  "serviceId": "haircut",
  "preferredDate": "2024-10-15",
  "preferredTime": "10:30",
  "message": "Optional message"
}
```

**Response Payload:**
```json
{
  "id": "apt-123",
  "status": "pending",
  "createdAt": "2024-09-02T10:00:00Z"
}
```
*Note: The status should initially be `pending`, not automatically `confirmed`.*

## 2. Future Availability Contract

**Endpoint:** `GET /appointments/availability`
**Query Parameters:** `date`, `serviceId`, (optional) `staffId`

The frontend should only display real available slots when this API exists. Currently, it accepts any valid future time during business hours.

## 3. Feedback API Contract

**Endpoint:** `GET /feedback` (List feedback)
**Endpoint:** `POST /feedback` (Submit feedback)

**Create Payload:**
```json
{
  "name": "Jane Doe",
  "rating": 5,
  "comment": "Excellent service!",
  "serviceId": "optional"
}
```

**Response Payload:**
```json
{
  "id": "fdbk-456",
  "createdAt": "2024-09-02T10:00:00Z",
  "status": "pending_moderation"
}
```
*Currently, website feedback is stored in `localStorage` in the browser.*

## 4. API Error States

The frontend expects standard HTTP status codes:
- **400**: Validation error (e.g., missing required fields)
- **401**: Unauthorized (if future user accounts exist)
- **404**: Resource unavailable (e.g., deleted service)
- **409**: Slot conflict (e.g., "That preferred time is no longer available. Please choose another time.")
- **429**: Rate limit exceeded
- **500**: Internal server error

## 5. Admin & Backend Capabilities (Future)

To fully manage the salon's operations, the backend should support:
- **Appointment Management:** Approve, modify, or reject appointment requests.
- **Availability Management:** Define staff schedules, holidays, and available booking slots.
- **Feedback Moderation:** Review and approve website feedback before it is displayed publicly.
- **Shared Feedback Storage:** Replace `localStorage` with a global feedback database.
- **Notifications:** Send SMS or WhatsApp Business API alerts to staff and customers.
- **Server-side Analytics:** Track most booked services, cancellations, and peak hours.

## 6. Frontend TODOs

When the backend is implemented, update the frontend in these areas:
- `FeedbackForm.jsx`: Replace `localStorage` persistence with the Feedback API.
- `Appointment.jsx`: Send the standard payload to the Appointment API and handle error states (e.g., 409 conflict). Fetch real availability before allowing time selection.
