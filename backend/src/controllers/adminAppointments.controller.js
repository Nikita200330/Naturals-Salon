import * as adminAppointmentsService from '../services/adminAppointments.service.js';
import { updateAppointmentStatusSchema } from '../validators/admin.validator.js';
import catchAsync from '../utils/catchAsync.js';
import AppError from '../utils/AppError.js';

export const getAppointments = catchAsync(async (req, res) => {
  const { status, date, serviceId, search, page = 1, limit = 20 } = req.query;
  
  const filters = { status, date, serviceId, search };
  const numPage = parseInt(page, 10);
  const numLimit = parseInt(limit, 10);

  const result = await adminAppointmentsService.getAppointments(filters, numPage, Math.min(numLimit, 100));

  res.status(200).json({
    success: true,
    data: result
  });
});

export const getAppointmentById = catchAsync(async (req, res) => {
  const appointment = await adminAppointmentsService.getAppointmentById(req.params.id);

  res.status(200).json({
    success: true,
    data: { appointment }
  });
});

export const updateAppointmentStatus = catchAsync(async (req, res) => {
  const result = updateAppointmentStatusSchema.safeParse(req.body);
  if (!result.success) {
    throw new AppError('INVALID_INPUT', result.error.errors[0].message, 400);
  }

  const { status } = result.data;
  const adminId = req.admin.id;

  const appointment = await adminAppointmentsService.updateAppointmentStatus(req.params.id, status, adminId);

  res.status(200).json({
    success: true,
    data: { appointment }
  });
});
