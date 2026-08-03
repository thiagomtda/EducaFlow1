import { createBrowserClient } from '@supabase/ssr';
import { env } from '../../config/env';
import { logger } from '../../lib/logger';

let supabaseClientInstance: ReturnType<typeof createBrowserClient> | null = null;

export function isSupabaseConfigured(): boolean {
  const url = env.NEXT_PUBLIC_SUPABASE_URL;
  const key = env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  return (
    url !== undefined &&
    url !== '' &&
    url !== 'https://placeholder.supabase.co' &&
    key !== undefined &&
    key !== '' &&
    key !== 'placeholder-anon-key'
  );
}

export function getSupabaseBrowserClient() {
  if (!supabaseClientInstance) {
    logger.info('Criando instância do cliente Supabase para o Browser...');
    supabaseClientInstance = createBrowserClient(
      env.NEXT_PUBLIC_SUPABASE_URL,
      env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    );
  }
  return supabaseClientInstance;
}

export const supabaseBrowser = getSupabaseBrowserClient();

