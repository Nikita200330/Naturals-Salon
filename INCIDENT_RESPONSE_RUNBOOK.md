# Incident Response Runbook

## Incident Severity Levels
- **SEV-1 (CRITICAL):** Booking / Database / Admin-Security outage, customer data exposure, wrong booking confirmations, production secret leak.
- **SEV-2 (HIGH):** Major feature unavailable (e.g., appointment submit consistently fails, availability allows impossible times, admin cannot process bookings).
- **SEV-3 (MEDIUM):** Partial degraded UX (e.g., gallery filter issue, feedback pagination problem).
- **SEV-4 (LOW/COSMETIC):** Cosmetic issue (minor spacing, animation mismatch).

## SEV-1 Response Actions
1. **Identify:** Confirm the issue via logs or monitoring.
2. **Contain:** Stop the bleeding. Disable affected feature, revert deployment, or enable maintenance mode.
3. **Rollback:** Follow ROLLBACK_RUNBOOK.md if related to a recent deployment.
4. **Restore:** Restore database from backup if data corruption occurred.
5. **Rotate Secrets:** If a secret was exposed (JWT_SECRET, DATABASE_URL password, storage key), rotate it immediately. Removing from source alone is insufficient.
6. **Verify:** Confirm the system is stable.
7. **Communicate:** Update internal stakeholders/business owners.
8. **Document Root Cause:** Write a post-mortem.

## Specific Incidents
### Secret Leak
Rotate immediately (JWT_SECRET, DB Password). This invalidates existing sessions.
### Database Incident
If DB is unavailable, the appointment API MUST return a truthful failure. Do NOT switch to local fake success.
### Admin Credentials Compromised
1. Disable admin account.
2. Rotate password.
3. Rotate JWT_SECRET to invalidate existing sessions.
4. Review logs for unauthorized access.
5. Create replacement credential.
