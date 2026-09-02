import { z } from 'zod';

export const createFeedbackSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name is too long"),
  rating: z.number().int("Rating must be an integer").min(1, "Rating must be at least 1").max(5, "Rating cannot exceed 5"),
  feedback: z.string().trim().min(1, "Feedback is required").max(2000, "Feedback cannot exceed 2000 characters"),
  serviceId: z.string().trim().optional(),
}).strict("Unknown fields like 'status' are not allowed");

export const getFeedbackQuerySchema = z.object({
  page: z.string().optional()
    .transform(val => val ? parseInt(val, 10) : 1)
    .refine(val => !isNaN(val) && val >= 1, "Page must be a positive integer"),
  limit: z.string().optional()
    .transform(val => val ? parseInt(val, 10) : 10)
    .refine(val => !isNaN(val) && val >= 1 && val <= 50, "Limit must be between 1 and 50"),
  rating: z.string().optional()
    .refine(val => !val || (!isNaN(parseInt(val, 10)) && parseInt(val, 10) >= 1 && parseInt(val, 10) <= 5), "Rating must be between 1 and 5")
    .transform(val => val ? parseInt(val, 10) : undefined),
  serviceId: z.string().trim().optional(),
  sort: z.enum(['newest', 'highest', 'lowest']).optional().default('newest'),
});
