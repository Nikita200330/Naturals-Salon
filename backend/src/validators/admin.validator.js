import { z } from 'zod';

export const adminLoginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required')
}).strict();

export const updateBusinessSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  phone: z.string().max(20).optional(),
  whatsapp: z.string().max(20).optional(),
  addressLine1: z.string().max(255).optional(),
  addressLine2: z.string().max(255).optional().nullable(),
  city: z.string().max(100).optional(),
  state: z.string().max(100).optional(),
  postalCode: z.string().max(20).optional(),
  country: z.string().max(100).optional(),
  mapsUrl: z.string().url().regex(/^https:\/\//, 'Must be a secure HTTPS URL').optional().nullable(),
  timezone: z.string().max(50).optional(),
  websiteUrl: z.string().url().regex(/^https:\/\//, 'Must be a secure HTTPS URL').optional().nullable(),
  openingTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/).optional().nullable(),
  closingTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/).optional().nullable(),
}).strict();

export const galleryItemSchema = z.object({
  imageUrl: z.string().url().regex(/^https:\/\//, 'Must be a secure HTTPS URL'),
  alt: z.string().max(255).optional().nullable(),
  category: z.string().min(1).max(100),
  serviceId: z.string().cuid().optional().nullable(),
  featured: z.boolean().default(false),
  active: z.boolean().default(true),
  sortOrder: z.number().int().default(0),
}).strict();

export const updateFeedbackStatusSchema = z.object({
  status: z.enum(['PENDING', 'APPROVED', 'REJECTED'])
}).strict();

export const updateAppointmentStatusSchema = z.object({
  status: z.enum(['PENDING', 'CONFIRMED', 'REJECTED', 'CANCELLED', 'COMPLETED', 'RESCHEDULE_REQUESTED']),
  note: z.string().max(1000).optional()
}).strict();

export const paginationSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10)
}).strict();
