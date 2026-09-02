# Support Troubleshooting

## Customer Booking Failure
Check the following in order:
1. Browser/network issues (CORS, offline).
2. Frontend request payload formatting.
3. Backend logs for validation errors or 5xx crashes.
4. API response.
5. Database connection state.
6. Rate limit exceeded.
7. Service/date/time validation conflict.

## Admin Login Failure
1. Check if the account is active.
2. Password correctness.
3. JWT secret consistency (did it rotate?).
4. Rate limit / Brute force blocks.
5. Database connectivity.
6. CORS configuration for Admin UI.
7. Frontend token storage state (expired token).

## Gallery Failure
1. DB record active status.
2. Image URL validity.
3. Storage provider availability/limits.
4. CORS/CDN blockages.
5. Browser network inspector.

## Business Hours Wrong
1. Check timezone configuration (Asia/Kolkata).
2. Weekly record settings.
3. Special hours overrides (active holidays).
4. Frontend cache staleness.
5. Backend response payload.
