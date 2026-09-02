import { createAppointmentSchema } from '../validators/appointments.validator.js';
import * as appointmentsService from '../services/appointments.service.js';
import catchAsync from '../utils/catchAsync.js';
import { ZodError } from 'zod';

export const createAppointment = catchAsync(async (req, res) => {
  // Discard status from payload if present (or any other injection)
  const { status, ...bodyData } = req.body;

  try {
    const validatedData = createAppointmentSchema.parse(bodyData);
    
    const appointment = await appointmentsService.createAppointment(validatedData);

    res.status(201).json({
      success: true,
      data: appointment
    });
  } catch (error) {
    if (error instanceof ZodError) {
      // Map Zod errors to field object
      const fields = {};
      error.issues.forEach((err) => {
        if (err.path && err.path.length > 0) {
          fields[err.path[0]] = err.message;
        }
      });
      return res.status(400).json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Invalid appointment request',
          fields
        }
      });
    }
    throw error;
  }
});
