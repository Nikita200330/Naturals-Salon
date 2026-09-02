# PRODUCTION RELEASE CHECKLIST

## 1. PRE-DEPLOYMENT FREEZE
- [ ] No new features
- [ ] Bugs fixed

## 2. FRONTEND
- [ ] Environment variables configured (`VITE_API_BASE_URL`)
- [ ] Frontend install (`npm ci`)
- [ ] Frontend lint (`npm run lint` - 0 errors)
- [ ] Frontend build (`npm run build` - 0 errors)
- [ ] `npm audit` reviewed (No critical vulnerabilities)

## 3. BACKEND
- [ ] Environment variables configured
- [ ] Backend install (`npm ci`)
- [ ] Backend lint (`npm run lint`)
- [ ] Backend tests (`npm test`)
- [ ] Backend build (`npm run build` or N/A)
- [ ] `npm audit` reviewed
- [ ] Database backup taken
- [ ] Production Prisma Migrations (`npx prisma migrate deploy`)
- [ ] Verify Schema
- [ ] Service Seed Verified
- [ ] Business Settings Seed Verified
- [ ] Real Admin Account

## 4. SECURITY & ENVIRONMENT
- [ ] Secret Audit (no exposed secrets in repo)
- [ ] CORS Configuration Correct
- [ ] Valid HTTPS Certificate
- [ ] Admin Password Hashed
- [ ] No wildcards for CORS

## 5. SMOKE TESTS & QA
- [ ] Home / Header / Hero tests
- [ ] Maps / Call / Directions / SEO
- [ ] Services list shows correctly
- [ ] Appointment journey works
- [ ] Feedback journey works
- [ ] Gallery works (if data exists)
- [ ] Business Hours test
- [ ] Admin Auth & Management works
- [ ] Mobile responsive layout test
- [ ] Desktop layout test
- [ ] Accessibility (keyboard/focus/modal) test

## 6. DEPLOYMENT
- [ ] Deploy backend first
- [ ] Deploy frontend pointing to production backend
- [ ] Verify deployment health
- [ ] DNS resolution verified
- [ ] Known Limitations documented

## 7. ROLLBACK & FINAL SIGN-OFF
- [ ] Rollback strategy documented
- [ ] Production Data Cleanup (QA data removed)
- [ ] Final Sign-off decision made

## FILE REPORT
- FILES CREATED: 4 (`PRODUCTION_RELEASE_CHECKLIST.md`, `FINAL_QA_REPORT.md`, `PRODUCTION_DEPLOYMENT_REPORT.md`, `naturals-salon/.env`)
- FILES MODIFIED: 0
- FILES DELETED: 0
