import { z } from 'zod';

const serviceQuerySchema = z.object({
  q: z.string().max(100).optional().transform(val => val ? val.trim() : val).transform(val => val === '' ? undefined : val),
  category: z.string().max(50).optional(),
});

export const validateServiceQuery = (query) => {
  return serviceQuerySchema.parse(query);
};
