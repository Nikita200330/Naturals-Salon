import express from 'express';
import { login, getMe } from '../../controllers/adminAuth.controller.js';
import { requireAdmin } from '../../middleware/auth.middleware.js';
import { apiLimiter } from '../../middleware/rateLimiter.js'; // we'll use a stricter one if possible

const router = express.Router();

// We can define a stricter rate limiter for login
const rateLimit = () => (req, res, next) => next();
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: {
    success: false,
    error: {
      code: 'TOO_MANY_REQUESTS',
      message: 'Too many login attempts. Please try again later.'
    }
  }
});

router.post('/login', loginLimiter, login);
router.get('/me', requireAdmin, getMe);

export default router;
