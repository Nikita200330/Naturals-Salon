import { Router } from 'express';
import { createAppointment } from '../controllers/appointments.controller.js';
import { getServiceAvailability } from '../controllers/availability.controller.js';
import { simpleRateLimit } from '../middleware/rateLimiter.js';

const router = Router();

const appointmentRateLimiter = simpleRateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5, // 5 requests per 15 minutes
  message: 'Too many appointment requests, please try again later.'
});

router.get('/availability', getServiceAvailability);
router.post('/', appointmentRateLimiter, createAppointment);

export default router;
