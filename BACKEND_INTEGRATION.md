# Backend Integration Details

## Google Reviews vs Website Feedback

It is CRITICAL to keep Google Reviews data separate from Website Feedback data.

**Google Reviews (Static/Third-party)**
- Rating: 4.6
- Review Count: 417
- Source: Google Business Profile
- Do NOT use the website feedback rows to calculate these numbers.

**Website Feedback (Internal Database)**
- Data stored in the `Feedback` model in PostgreSQL.
- Only feedback with `status: 'APPROVED'` is exposed publicly.
- Average rating and count returned by `GET /api/v1/feedback` apply ONLY to approved internal feedback.
- Do NOT automatically mix the internal website feedback average with the Google rating. They should be presented separately or clearly distinguished if shown together.

## Moderation
- New public submissions (`POST /api/v1/feedback`) default to `PENDING`.
- Unapproved feedback (`PENDING` or `REJECTED`) is NOT returned by the public API.
- Admin APIs (to be implemented) are required to approve or reject feedback.

## Availability Model
The availability logic supports two modes:
1. **Slot-Based Mode**: Used when both the environment variable `APPOINTMENT_SLOT_INTERVAL_MINUTES` and the selected service's `durationMinutes` are configured. Uses real overlap detection based on exact durations.
2. **Preferred-Time Mode**: Used when service duration or slot interval is missing. Blocks the exact start times of existing conflicting appointments without making assumptions about slot availability.

**Dependency**: Truthful slot generation requires actual durations on the services and a configurable slot interval.
**Capacity Limitation**: Currently uses a single-capacity assumption.
**Future Extension**: Multi-staff capacity and parallel scheduling will require implementing a Staff model (e.g., Staff, StaffService, StaffWorkingHours, StaffLeave).
