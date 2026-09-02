# PRODUCTION SECURITY CHECKLIST

Follow this checklist when deploying the Naturals Salon API to a production environment.

## 1. Environment Variables
- [ ] `NODE_ENV` is set to `production`.
- [ ] `PORT` is set (typically managed by the hosting provider).
- [ ] `FRONTEND_URL` is set to the exact production public website URL (e.g., `https://www.naturalssalon.com`).
- [ ] `ADMIN_FRONTEND_URL` is set to the exact admin dashboard URL.
- [ ] `CORS_ALLOWED_ORIGINS` is configured if multiple domains are used.
- [ ] `TRUST_PROXY` is set to `true` if deploying behind a reverse proxy (e.g., Vercel, Render, Cloudflare) for accurate IP rate limiting.

## 2. Secrets & JWT
- [ ] `JWT_SECRET` is at least 32 characters long, generated securely via a CSPRNG.
- [ ] `DATABASE_URL` is set to the production database and NOT committed to version control.
- [ ] Ensure `.env` files are not checked into Git.
- [ ] If previous secrets were committed to Git, rotate them immediately before going live.

## 3. Database
- [ ] Database credentials utilize the principle of least privilege (avoid using the database superuser for the app).
- [ ] Production database uses TLS/SSL (handled via connection string `sslmode=require` if applicable).
- [ ] Connection limits are configured appropriately (use Prisma Accelerate or PgBouncer if serverless).
- [ ] Run migrations safely: Use `npx prisma migrate deploy` in CI/CD, NOT `migrate dev`.

## 4. HTTPS & Networking
- [ ] The API is exclusively served over HTTPS.
- [ ] Ensure the host provider enables strict TLS.
- [ ] Verify that `Helmet` HSTS headers don't break frontend integrations.

## 5. Admin Account
- [ ] Create the initial admin account using environment variables (`ADMIN_EMAIL`, `ADMIN_NAME`, `ADMIN_INITIAL_PASSWORD`) via `npm run admin:create` (or equivalent).
- [ ] Rotate/change the initial bootstrap password immediately upon first login.
- [ ] Ensure the bootstrap script cannot be triggered accidentally by public users.

## 6. Rate Limiting & Abuse
- [ ] Verify global rate limiter (1000 requests / 15 min) does not interfere with normal app usage.
- [ ] Verify endpoint limiters (Login: 10/15m, Appointments: 5/15m) are functioning correctly behind the proxy.
- [ ] For multi-instance deployments (e.g., K8s, AWS ECS), replace the in-memory rate limiter with Redis.

## 7. Logging & Monitoring
- [ ] Ensure `NODE_ENV=production` silences Prisma error details and stack traces.
- [ ] Verify that sensitive fields (`password`, `token`) are correctly redacted in server logs.
- [ ] Server crash behavior is logged and process manager (or cloud provider) automatically restarts the app.

## 8. Backups
- [ ] Automated, regular Postgres backups are enabled at the database provider level.
- [ ] The app does not manage its own database backups.

## 9. Smoke Tests
- [ ] Verify a valid public appointment request succeeds (201).
- [ ] Verify oversized payloads (>1MB) are rejected (413).
- [ ] Verify invalid CORS origins are blocked (403).
- [ ] Verify invalid login credentials eventually trigger rate-limiting (429).
- [ ] Verify database connection health via `/api/v1/health` (200).
