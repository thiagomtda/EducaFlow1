import { createBrowserClient } from '@supabase/ssr';
import { env } from '../../config/env';
import { logger } from '../../lib/logger';

let supabaseClientInstance: ReturnType<typeof createBrowserClient> | null = null;

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
