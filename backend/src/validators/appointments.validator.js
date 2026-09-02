import { z } from 'zod';
import { normalizeIndianPhone } from '../utils/phone.js';

export const createAppointmentSchema = z.object({
  customerName: z
    .string({ required_error: 'Customer name is required' })
    .trim()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name cannot exceed 100 characters'),
  mobile: z
    .string({ required_error: 'Mobile number is required' })
    .transform((val) => normalizeIndianPhone(val))
    .refine((val) => val !== null, { message: 'Enter a valid mobile number' }),
  serviceId: z
    .string({ required_error: 'Service identifier is required' })
    .min(1, 'Service identifier is required'),
  preferredDate: z
    .string({ required_error: 'Preferred date is required' })
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format'),
  preferredTime: z
    .string({ required_error: 'Preferred time is required' })
    .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, 'Time must be in HH:mm format'),
  message: z
    .string()
    .trim()
    .max(1000, 'Message cannot exceed 1000 characters')
    .optional(),
}).strict("Unknown fields are not allowed");
