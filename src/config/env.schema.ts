import { z } from 'zod';

export const envSchema = z.object({
  DB_HOST: z.string(),
  DB_PORT: z.string().transform(Number),
  DB_USER: z.string(),
  DB_PASSWORD: z.string(),
  DB_NAME: z.string(),
  JWT_SECRET: z.string(),
  REDIS_HOST: z.string(),
  REDIS_PORT: z.string().transform(Number),
  BREVO_API_KEY: z.string(),
  BREVO_SENDER_EMAIL: z.string(),
  BREVO_SENDER_NAME: z.string(),
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
});

// This will be the inferred TS type
export type EnvSchema = z.infer<typeof envSchema>;
