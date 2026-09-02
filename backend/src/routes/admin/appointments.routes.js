import express from 'express';
import { getAppointments, getAppointmentById, updateAppointmentStatus } from '../../controllers/adminAppointments.controller.js';
import { requireAdmin } from '../../middleware/auth.middleware.js';

const router = express.Router();

router.use(requireAdmin);

router.get('/', getAppointments);
router.get('/:id', getAppointmentById);
router.patch('/:id/status', updateAppointmentStatus);

export default router;
