import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { env } from '../../config/env';

export async function createSupabaseServerClient(cookieStore?: {
  get: (name: string) => { value: string } | undefined;
  set: (name: string, value: string, options: CookieOptions) => void;
  remove: (name: string, options: CookieOptions) => void;
}) {
  return createServerClient(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        get(name: string) {
          return cookieStore?.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore?.set(name, value, options);
          } catch {
            // Context purely server side if read-only
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore?.set(name, '', { ...options, maxAge: 0 });
          } catch {
            // Context purely server side
          }
        },
      },
    }
  );
}
