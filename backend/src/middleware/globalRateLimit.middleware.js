import { simpleRateLimit } from './rateLimiter.js';

export const globalRateLimit = simpleRateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000, // limit each IP to 1000 requests per windowMs
  message: 'Too many requests from this IP, please try again later'
});
