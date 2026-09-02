import { Router } from 'express';
import {
  getBusiness,
  getBusinessHours
} from '../controllers/business.controller.js';

const router = Router();

router.get('/', getBusiness);
router.get('/hours', getBusinessHours);

export default router;
