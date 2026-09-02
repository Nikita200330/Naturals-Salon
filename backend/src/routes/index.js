import { Router } from 'express';
import { env } from '../config/env.js';
import prisma from '../config/db.js';

const router = Router();

router.get('/', (req, res) => {
  res.json({
    service: 'Naturals Salon API',
    status: 'running'
  });
});

router.get('/health', async (req, res) => {
  try {
    // Optional: simple query to test DB
    await prisma.$queryRaw`SELECT 1`;
    res.json({
      success: true,
      data: {
        status: 'ok'
      }
    });
  } catch (error) {
    res.status(503).json({
      success: false,
      error: {
        code: 'HEALTH_CHECK_FAILED',
        message: 'Service is unhealthy'
      }
    });
  }
});

import servicesRoutes from './services.routes.js';
import appointmentsRoutes from './appointments.routes.js';
import feedbackRoutes from './feedback.routes.js';
import adminRoutes from './admin.routes.js';

router.use('/services', servicesRoutes);
router.use('/appointments', appointmentsRoutes);
router.use('/feedback', feedbackRoutes);
router.use('/admin', adminRoutes);

export default router;
