import express from 'express';
import { getFeedbackList, getFeedbackById, updateFeedbackStatus } from '../../controllers/adminFeedback.controller.js';
import { requireAdmin } from '../../middleware/auth.middleware.js';

const router = express.Router();

router.use(requireAdmin);

router.get('/', getFeedbackList);
router.get('/:id', getFeedbackById);
router.patch('/:id/status', updateFeedbackStatus);

export default router;
