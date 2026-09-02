import catchAsync from '../utils/catchAsync.js';
import AppError from '../utils/AppError.js';
import prisma from '../config/db.js';
import { getAvailability } from '../services/availability.service.js';

export const getServiceAvailability = catchAsync(async (req, res) => {
  const { date, serviceId } = req.query;

  if (!date || !date.match(/^\d{4}-\d{2}-\d{2}$/)) {
    throw new AppError('A valid date (YYYY-MM-DD) is required', 400, 'VALIDATION_ERROR');
  }

  if (!serviceId) {
    throw new AppError('serviceId is required', 400, 'VALIDATION_ERROR');
  }

  // Find service
  let service = await prisma.service.findUnique({
    where: { slug: serviceId }
  });

  if (!service) {
    service = await prisma.service.findUnique({
      where: { id: serviceId }
    });
  }

  if (!service) {
    throw new AppError('Selected service is unavailable.', 400, 'SERVICE_INVALID');
  }

  if (!service.active) {
    throw new AppError('Selected service is unavailable.', 400, 'SERVICE_INVALID');
  }

  const availability = await getAvailability(date, service);

  res.set('Cache-Control', 'no-store');
  res.status(200).json({
    success: true,
    data: availability
  });
});
