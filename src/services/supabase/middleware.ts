import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { env } from '../../config/env';

export async function updateSupabaseSession(
  request: { headers: Headers; cookies: { get: (name: string) => { value: string } | undefined } },
  response: { cookies: { set: (name: string, value: string, options: CookieOptions) => void } }
) {
  const supabase = createServerClient(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          response.cookies.set(name, value, options);
        },
        remove(name: string, options: CookieOptions) {
          response.cookies.set(name, '', { ...options, maxAge: 0 });
        },
      },
    }
  );

  const { data: { user } } = await supabase.auth.getUser();
  return { supabase, user };
}
