import { z } from 'zod';

const envSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z.string().url().default('https://placeholder.supabase.co'),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1).default('placeholder-anon-key'),
  GEMINI_API_KEY: z.string().optional(),
  NEXT_PUBLIC_AURORA_AI_ENDPOINT: z.string().default('/api/aurora'),
  NEXT_PUBLIC_APP_ENV: z.enum(['development', 'staging', 'production', 'test']).default('development'),
  NEXT_PUBLIC_LOG_LEVEL: z.enum(['debug', 'info', 'warn', 'error']).default('debug'),
});

function parseEnv() {
  const getVar = (key: string) => {
    if (typeof process !== 'undefined' && process.env && process.env[key]) {
      return process.env[key];
    }
    return undefined;
  };

  const rawEnv = {
    NEXT_PUBLIC_SUPABASE_URL: getVar('NEXT_PUBLIC_SUPABASE_URL'),
    NEXT_PUBLIC_SUPABASE_ANON_KEY: getVar('NEXT_PUBLIC_SUPABASE_ANON_KEY'),
    GEMINI_API_KEY: getVar('GEMINI_API_KEY'),
    NEXT_PUBLIC_AURORA_AI_ENDPOINT: getVar('NEXT_PUBLIC_AURORA_AI_ENDPOINT'),
    NEXT_PUBLIC_APP_ENV: getVar('NEXT_PUBLIC_APP_ENV') || getVar('NODE_ENV'),
    NEXT_PUBLIC_LOG_LEVEL: getVar('NEXT_PUBLIC_LOG_LEVEL'),
  };

  const result = envSchema.safeParse(rawEnv);

  if (!result.success) {
    console.warn('⚠️ Environment variables validation notice:', result.error.format());
    return envSchema.parse({});
  }

  return result.data;
}

export const env = parseEnv();

