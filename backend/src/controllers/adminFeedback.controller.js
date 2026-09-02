import * as adminFeedbackService from '../services/adminFeedback.service.js';
import { updateFeedbackStatusSchema } from '../validators/admin.validator.js';
import catchAsync from '../utils/catchAsync.js';
import AppError from '../utils/AppError.js';

export const getFeedbackList = catchAsync(async (req, res) => {
  const { status, rating, serviceId, search, page = 1, limit = 20 } = req.query;
  
  const filters = { status, rating, serviceId, search };
  const numPage = parseInt(page, 10);
  const numLimit = parseInt(limit, 10);

  const result = await adminFeedbackService.getFeedback(filters, numPage, Math.min(numLimit, 100));

  res.status(200).json({
    success: true,
    data: result
  });
});

export const getFeedbackById = catchAsync(async (req, res) => {
  const feedback = await adminFeedbackService.getFeedbackById(req.params.id);

  res.status(200).json({
    success: true,
    data: { feedback }
  });
});

export const updateFeedbackStatus = catchAsync(async (req, res) => {
  const result = updateFeedbackStatusSchema.safeParse(req.body);
  if (!result.success) {
    throw new AppError('INVALID_INPUT', result.error.errors[0].message, 400);
  }

  const { status } = result.data;
  const feedback = await adminFeedbackService.updateFeedbackStatus(req.params.id, status);

  res.status(200).json({
    success: true,
    data: { feedback }
  });
});
