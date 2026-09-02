# Release Process

Future releases should follow these steps:

1. **Develop:** Implement feature in a feature branch.
2. **Lint:** Run `npm run lint` on frontend and backend.
3. **Test:** Run automated tests if available (`npm test`).
4. **Build:** Build frontend and backend locally to verify.
5. **Review Migrations:** Carefully review Prisma migration SQL. Identify destructive changes.
6. **Backup:** Manually trigger a database backup before deployment.
7. **Deploy Backend:** Deploy backend service and run migrations (`npx prisma migrate deploy`).
8. **Smoke Backend:** Verify backend health endpoint (`/api/v1/health`).
9. **Deploy Frontend:** Deploy frontend assets to CDN/Host.
10. **Smoke Frontend:** Verify frontend loads and connects to backend.
11. **Monitor Logs:** Watch for 5xx errors or startup crashes.
12. **Sign Off:** Approve the release.

**Security Patches:** Critical exploitable security issues bypass normal feature release cadence and are deployed immediately after testing.
