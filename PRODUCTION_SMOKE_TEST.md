# Production Smoke Test

Run these steps after each production release:

1. [ ] Home loads successfully.
2. [ ] Services page loads.
3. [ ] Appointment form opens.
4. [ ] Availability API responds with valid time slots.
5. [ ] Test appointment submits successfully (Use identifiable QA entry).
6. [ ] Call button link resolves to `tel:+916363154526`.
7. [ ] WhatsApp button link points to correct number/message.
8. [ ] Feedback submits successfully.
9. [ ] Gallery loads images.
10. [ ] Business info is correct.
11. [ ] Admin login works.
12. [ ] **CLEANUP:** Remove test appointment and test feedback from database safely. Never delete genuine customer bookings.
