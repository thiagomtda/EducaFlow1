declare module 'next/server' {
  import { CookieOptions } from '@supabase/ssr';

  export class NextRequest {
    headers: Headers;
    cookies: {
      get(name: string): { value: string } | undefined;
      set(options: { name: string; value: string; [key: string]: unknown }): void;
    };
    nextUrl: {
      pathname: string;
    };
    url: string;
    constructor(input: string | URL | Request, init?: RequestInit);
  }

  export class NextResponse extends Response {
    static next(init?: { request?: { headers?: Headers } }): NextResponse;
    static redirect(url: string | URL, status?: number): NextResponse;
    static json(body: unknown, init?: ResponseInit): NextResponse;
    cookies: {
      set(name: string, value: string, options?: CookieOptions): void;
    };
  }
}

declare module 'next/link' {
  import React from 'react';
  export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    href: string;
    children?: React.ReactNode;
  }
  const Link: React.FC<LinkProps>;
  export default Link;
}
