# Production Architecture

## Overview
- **Frontend:** React SPA (Vercel/Netlify expected)
- **Backend:** Node.js Express (Render/VPS expected)
- **Database:** PostgreSQL
- **Storage:** Cloud Storage (Pending implementation) or local filesystem (with ephemeral warning)
- **Authentication:** JWT (Admin Panel)

## Internal Components
- **Public APIs:** Services, Availability, Appointment Booking, Feedback Submit, Feedback List, Gallery.
- **Admin APIs:** Login, Appointments Management, Feedback Moderation, Business Settings, Business Hours.
- **Monitoring:** Uptime check, Error tracking (Pending configuration).
- **Backups:** Database backups (Pending provider configuration).
- **Deployment Flow:** Code pushed to main -> CI/CD Build -> DB Migrations -> Deploy.
