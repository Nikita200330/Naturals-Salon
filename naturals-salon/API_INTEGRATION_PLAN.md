# API Integration Plan

## API Integration Matrix

| Feature | Frontend Page | Frontend Component | Current Data Source | Future API Endpoint | HTTP Method | Request Shape | Expected Response | Loading State | Empty State | Error State | Authentication Required | Backend Status | Frontend Integration Status |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Appointments | /appointment | AppointmentForm | Local UI State | `/appointments` | POST | `{ customerName, mobile, serviceId, preferredDate, preferredTime, message }` | `{ id, status, customerName, serviceId, preferredDate, preferredTime, createdAt }` | `Submitting appointment request...` | N/A | Network failure / Field errors | No | PENDING | API_AVAILABLE |
| Availability | /appointment | AppointmentForm | N/A (Static) | `/appointments/availability` | GET | `?date=YYYY-MM-DD&serviceId=ID` | `{ date, serviceId, slots: [{ time, available }] }` | Loading slots... | No slots available | Could not load slots | No | PENDING | LOCAL_ONLY |
| Services | /services | ServicesList | Local JSON/State | `/services` | GET | None | `[{ id, name, category, description, price, active }]` | Skeleton loader | No services found | Services couldn't be loaded right now. | No | PENDING | LOCAL_ONLY |
| Gallery | /gallery | GalleryGrid | Local Config | `/gallery` | GET | None | `[{ id, imageUrl, alt, category, serviceId, featured }]` | Image loading skeletons | No images | Could not load gallery | No | PENDING | LOCAL_ONLY |
| Feedback List | /reviews | ReviewList | LocalStorage | `/feedback` | GET | None | `[{ id, name, rating, feedback, serviceId, status, createdAt }]` | Loading reviews... | No reviews yet | Could not load reviews | No | PENDING | LOCAL_ONLY |
| Submit Feedback | /reviews | FeedbackForm | LocalStorage | `/feedback` | POST | `{ name, rating, feedback, serviceId }` | `{ id, status, ... }` | Submitting... | N/A | Your feedback couldn't be submitted. Please try again. | No | PENDING | READY_FOR_API |
| Business Info | All | Header/Footer | Local Config | `/business` | GET | None | `{ name, phone, address, hours, mapsUrl, rating, ... }` | N/A | N/A | N/A | No | PENDING | LOCAL_ONLY |

## Required Endpoints Scope

1. **Appointments:** 
    - Real appointment functionality requires backend support for: Create appointment request, Read appointment status, Check availability, Potential rescheduling, Cancellation, Staff assignment, Salon confirmation/rejection.
2. **Services:** 
    - Future endpoint to manage service catalog dynamically if required. Price is not mandatory.
3. **Gallery:** 
    - Future endpoint to fetch gallery images via URLs. Base64 encoding in APIs is not recommended.
4. **Google Reviews:** 
    - Reviews should either be pulled from an official external source, statically verified dataset, or periodic admin update. DO NOT scrape Google Reviews from the browser.
5. **Website Feedback:**
    - Requires backend endpoints to submit feedback and retrieve moderated/approved feedback.
6. **Business Information & Hours:**
    - Central endpoint for business info if dynamic; else keep in config. Should support timezone, weeklyHours, and specialHours (holidays/temporary closures).

## Loading & Error States
- **Loading:** Use targeted loading indicators (e.g., submitting button, skeletons) rather than full-page spinners.
- **Errors:** Create customer-friendly error states (e.g., "We couldn't submit your appointment request. Please try again or call the salon."). Do not expose backend stack traces.
- **Slot Conflicts:** On `409 Conflict`, show: "That preferred time is no longer available. Please choose another time." Preserve user inputs.

## Double Submission & Retry
- Disable the submit button during POST requests.
- Backend should support idempotency for appointment creations.
- Do not blindly retry POST requests on the frontend to prevent duplicates.

## Online/Offline Handling
- Optionally utilize browser online status to present messages like: "You appear to be offline. Check your connection and try again."

## LocalStorage Feedback Migration
- On transition, new feedback should target the API.
- Existing local-only entries should remain local unless explicitly migrated by a product decision. No automatic upload without consent.

## Security & Data Privacy
- **Privacy:** Only collect necessary data (name, phone, service, date, time, message). Do not request excessive PII.
- **Security:** Backend must implement rate limiting, CORS, input validation, and secure headers. Frontend validation does not replace backend validation.
- **CORS:** Backend must explicitly allow the frontend domain.
- **HTTPS:** Production API must use HTTPS.

## Database Entities (Documentation Only)
- Service
- Appointment
- Feedback
- GalleryImage
- BusinessSettings
- Staff (Optional)
- Availability (Optional)
- Customer (Optional)
