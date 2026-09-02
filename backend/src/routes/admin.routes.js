import { Router } from 'express';
import { requireAdmin } from '../middleware/auth.middleware.js';
import { simpleRateLimit } from '../middleware/rateLimiter.js';
import * as adminController from '../controllers/admin.controller.js';

const router = Router();

const loginRateLimiter = simpleRateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 10, // 10 attempts per 15 minutes per IP
  message: 'Too many login attempts, please try again later.'
});

// Public admin routes
router.post('/auth/login', loginRateLimiter, adminController.login);

// Protected admin routes
router.use(requireAdmin);

router.patch('/business', adminController.updateBusinessSettings);
router.post('/gallery', adminController.addGalleryImage);
router.patch('/feedback/:id/status', adminController.updateFeedbackStatus);
router.get('/appointments', adminController.getAppointments);
router.patch('/appointments/:id/status', adminController.updateAppointmentStatus);

export default router;
