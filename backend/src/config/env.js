import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const envSchema = z.object({
  PORT: z.string().default('5000'),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  DATABASE_URL: z.string().url(),
  FRONTEND_URL: z.string().url().default('http://localhost:5173'),
  ADMIN_FRONTEND_URL: z.string().url().default('http://localhost:5173'),
  CORS_ALLOWED_ORIGINS: z.string().optional(),
  TRUST_PROXY: z.enum(['true', 'false']).default('false'),
  JWT_SECRET: z.string().min(32, "JWT_SECRET must be at least 32 characters long"),
  APPOINTMENT_SLOT_INTERVAL_MINUTES: z.coerce.number().positive().optional(),
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  console.error('❌ Invalid environment variables:');
  console.error(_env.error.format());
  process.exit(1);
}

export const env = _env.data;
