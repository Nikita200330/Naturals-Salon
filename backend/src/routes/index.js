import { Router } from 'express';

import { env } from '../config/env.js';
import prisma from '../config/db.js';

import servicesRoutes from './services.routes.js';
import appointmentsRoutes from './appointments.routes.js';
import feedbackRoutes from './feedback.routes.js';
import adminRoutes from './admin.routes.js';
import businessRoutes from './business.routes.js';

const router = Router();

router.get('/', (req, res) => {
  res.json({
    service: 'Naturals Salon API',
    status: 'running'
  });
});

router.get('/health', async (req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;

    res.json({
      success: true,
      data: {
        status: 'ok'
      }
    });
  } catch (error) {
    console.error('❌ Health check database error:', error);

    res.status(503).json({
      success: false,
      error: {
        code: 'HEALTH_CHECK_FAILED',
        message: 'Service is unhealthy'
      }
    });
  }
});

router.use('/services', servicesRoutes);
router.use('/appointments', appointmentsRoutes);
router.use('/feedback', feedbackRoutes);
router.use('/admin', adminRoutes);
router.use('/business', businessRoutes);

export default router;
