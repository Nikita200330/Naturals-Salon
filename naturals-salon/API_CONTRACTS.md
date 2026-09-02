# API Contracts

## 1. Appointments

### Create Appointment Request
- **Method:** `POST`
- **Path:** `/api/v1/appointments`
- **Request:**
  ```json
  {
    "customerName": "Customer Name",
    "mobile": "9876543210",
    "serviceId": "haircut",
    "preferredDate": "2026-09-10",
    "preferredTime": "15:30",
    "message": ""
  }
  ```
- **Success Response (201 Created):**
  ```json
  {
    "success": true,
    "data": {
      "id": "appointment-id",
      "status": "PENDING",
      "customerName": "Customer Name",
      "mobile": "+919876543210",
      "service": {
        "slug": "haircut",
        "name": "Haircut"
      },
      "preferredDate": "2026-09-10",
      "preferredTime": "15:30",
      "message": "",
      "createdAt": "..."
    }
  }
  ```
- **Errors:** 
  - `400 Bad Request`: Validation failure or Invalid service.
  - `409 Conflict`: Duplicate appointment request.
  - `500 Server Error`: Internal failure.
- **Frontend Consumer:** AppointmentForm (`src/services/appointmentService.js`)
- **Backend Status:** IMPLEMENTED

### Check Availability
- **Method:** `GET`
- **Path:** `/appointments/availability`
- **Query Params:** `?date=2026-09-05&serviceId=haircut`
- **Success Response (200 OK):**
  ```json
  {
    "date": "2026-09-05",
    "serviceId": "haircut",
    "slots": [
      {
        "time": "10:00",
        "available": true
      }
    ]
  }
  ```
- **Errors:**
  - `400 Bad Request`: Missing query parameters.
- **Frontend Consumer:** AppointmentForm (`src/services/appointmentService.js`)
- **Backend Status:** PENDING

## 2. Services

### Get Services
- **Method:** `GET`
- **Path:** `/services`
- **Request:** None
- **Success Response (200 OK):**
  ```json
  [
    {
      "id": "haircut",
      "name": "Haircut",
      "category": "Hair",
      "description": "...",
      "price": null,
      "active": true
    }
  ]
  ```
- **Errors:**
  - `500 Server Error`: Failed to load services.
- **Frontend Consumer:** ServicesList, AppointmentForm (`src/services/servicesService.js`)
- **Backend Status:** PENDING

## 3. Gallery

### Get Gallery Images
- **Method:** `GET`
- **Path:** `/gallery`
- **Request:** None
- **Success Response (200 OK):**
  ```json
  [
    {
      "id": "...",
      "imageUrl": "...",
      "alt": "...",
      "category": "Hair",
      "serviceId": "haircut",
      "featured": true
    }
  ]
  ```
- **Errors:**
  - `500 Server Error`: Failed to load gallery.
- **Frontend Consumer:** GalleryGrid (`src/services/galleryService.js`)
- **Backend Status:** PENDING

## 4. Feedback

### Submit Feedback
- **Method:** `POST`
- **Path:** `/feedback`
- **Request:**
  ```json
  {
    "name": "Customer Name",
    "rating": 5,
    "feedback": "Great experience",
    "serviceId": "haircut"
  }
  ```
- **Success Response (201 Created):**
  ```json
  {
    "id": "...",
    "name": "Customer Name",
    "rating": 5,
    "feedback": "Great experience",
    "serviceId": "haircut",
    "status": "pending",
    "createdAt": "..."
  }
  ```
- **Errors:**
  - `400 Bad Request`: Validation failure.
  - `429 Too Many Requests`: Rate limit exceeded.
- **Frontend Consumer:** FeedbackForm (`src/services/feedbackService.js`)
- **Backend Status:** PENDING

### Get Approved Feedback
- **Method:** `GET`
- **Path:** `/feedback`
- **Request:** None
- **Success Response (200 OK):**
  ```json
  [
    {
      "id": "...",
      "name": "Customer Name",
      "rating": 5,
      "feedback": "Great experience",
      "serviceId": "haircut",
      "status": "approved",
      "createdAt": "..."
    }
  ]
  ```
- **Errors:**
  - `500 Server Error`: Failed to fetch feedback.
- **Frontend Consumer:** ReviewList (`src/services/feedbackService.js`)
- **Backend Status:** PENDING

## 5. Error Contract Shape

Recommended consistent backend error response:
```json
{
  "error": {
    "code": "SLOT_UNAVAILABLE",
    "message": "Selected time is unavailable",
    "field": "preferredTime"
  }
}
```
