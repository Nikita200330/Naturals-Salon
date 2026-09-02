import { Router } from 'express';
import { submitFeedback, getApprovedFeedback } from '../controllers/feedback.controller.js';
import { simpleRateLimit } from '../middleware/rateLimiter.js';

const router = Router();

// Rate limiting: max 10 requests per 15 minutes per IP
const feedbackRateLimiter = simpleRateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 10, 
  message: 'Too many feedback requests, please try again later.'
});

// POST /api/v1/feedback - Submit new feedback
router.post('/', feedbackRateLimiter, submitFeedback);

// GET /api/v1/feedback - Retrieve public approved feedback
router.get('/', getApprovedFeedback);

export default router;
