import React, { useEffect } from 'react';
import { useAuthStore } from '../stores/useAuthStore';
import { supabaseBrowser } from '../services/supabase/client';
import { AppConstants } from '../constants';
import { logger } from '../lib/logger';
import { UserProfile, AuthSession } from '../types';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { setUserAndSession } = useAuthStore();

  useEffect(() => {
    // 1. Initial hydration from local storage cache
    const cachedUserJson = localStorage.getItem(AppConstants.STORAGE_AUTH_KEY);
    if (cachedUserJson) {
      try {
        const cachedUser: UserProfile = JSON.parse(cachedUserJson);
        setUserAndSession(cachedUser, null);
      } catch (e) {
        logger.warn('Erro ao restaurar usuário do cache local:', e);
      }
    }

    // 2. Subscribe to Supabase Auth State Changes
    const { data: { subscription } } = supabaseBrowser.auth.onAuthStateChange(async (event, session) => {
      logger.info(`Evento de Autenticação Supabase: ${event}`);

      if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
        if (session?.user) {
          const profile: UserProfile = {
            id: session.user.id,
            email: session.user.email || '',
            name: session.user.user_metadata?.full_name || session.user.email?.split('@')[0] || 'Professor(a)',
            role: (session.user.user_metadata?.role as 'teacher' | 'coordinator' | 'admin') || 'teacher',
            schoolName: session.user.user_metadata?.school_name || 'Escola de Ensino Fundamental I',
            avatarUrl: session.user.user_metadata?.avatar_url,
            createdAt: session.user.created_at || new Date().toISOString(),
          };

          const authSession: AuthSession = {
            accessToken: session.access_token,
            refreshToken: session.refresh_token,
            expiresAt: session.expires_at || Math.floor(Date.now() / 1000) + 3600,
            user: profile,
          };

          setUserAndSession(profile, authSession);
        }
      } else if (event === 'SIGNED_OUT') {
        logger.info('Sessão encerrada no Supabase.');
        setUserAndSession(null, null);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [setUserAndSession]);

  return <>{children}</>;
}
