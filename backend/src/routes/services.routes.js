import express from 'express';
import { getServices, getServiceBySlug } from '../controllers/services.controller.js';

const router = express.Router();

router.get('/', getServices);
router.get('/:slug', getServiceBySlug);

export default router;
