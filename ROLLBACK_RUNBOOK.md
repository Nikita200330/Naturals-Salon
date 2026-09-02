# Rollback Runbook

## Application Rollback DOES NOT Rollback Database Schema
**WARNING:** Application rollback does NOT necessarily rollback database schema. An older version of the app might fail if it does not understand the current database schema.

## Frontend Rollback
1. Log into the frontend hosting dashboard (e.g., Vercel, Netlify).
2. Go to Deployments.
3. Select the previous known-good deployment.
4. Click "Promote to Production" or "Redeploy".
5. Verify the frontend loads successfully.

## Backend Rollback
1. Log into the backend hosting dashboard (e.g., Render, Railway, AWS).
2. Go to Deployments or Image Registry.
3. Select the previous known-good commit/image.
4. Click "Rollback" or "Redeploy".
5. Monitor logs for startup and verify `/api/v1/health`.

## Migration Incident
If a database migration damages production:
1. Stop writes if necessary (Maintenance Mode).
2. Assess the backup snapshot.
3. Restore only through a controlled process (e.g., restore to a temporary DB, extract data, or switch over).
4. Do NOT experiment directly on the live customer DB.
