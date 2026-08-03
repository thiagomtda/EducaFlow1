import { supabaseBrowser, isSupabaseConfigured } from './supabase/client';
import { UserProfile, AuthSession } from '../types';
import { logger } from '../lib/logger';
import { AppConstants } from '../constants';

export function mapAuthErrorToPortuguese(error: { message?: string; code?: string; status?: number } | null | undefined): string {
  if (!error) return 'Ocorreu um erro desconhecido ao processar a autenticação.';

  const message = (error.message || '').toLowerCase();
  const code = (error.code || '').toLowerCase();

  if (message.includes('invalid login credentials') || message.includes('invalid_grant') || message.includes('invalid email or password')) {
    return 'E-mail ou senha incorretos. Por favor, verifique suas credenciais e tente novamente.';
  }
  if (message.includes('user not found') || message.includes('user_not_found')) {
    return 'Usuário não cadastrado no sistema EducaFlow.';
  }
  if (message.includes('email not confirmed')) {
    return 'E-mail ainda não confirmado. Por favor, verifique sua caixa de entrada.';
  }
  if (message.includes('user already registered') || message.includes('already exists')) {
    return 'Este e-mail já está cadastrado no EducaFlow. Faça login com suas credenciais.';
  }
  if (message.includes('password should be at least')) {
    return 'A senha deve conter no mínimo 6 caracteres.';
  }
  if (message.includes('rate limit') || message.includes('too many requests')) {
    return 'Muitas tentativas consecutivas. Aguarde alguns instantes antes de tentar novamente.';
  }
  if (message.includes('network') || message.includes('failed to fetch') || code.includes('fetch_failed')) {
    return 'Perda de conexão com a internet. O modo offline do EducaFlow está ativo.';
  }
  if (message.includes('jwt expired') || message.includes('session expired')) {
    return 'Sua sessão expirou. Por favor, faça login novamente para continuar.';
  }

  return error.message || 'Erro de autenticação no Supabase. Tente novamente.';
}

export const DEFAULT_DEMO_TEACHER: UserProfile = {
  id: 'usr-prof-2026',
  email: 'professora.marta@educaflow.edu.br',
  name: 'Prof.ª Marta Vasconcelos',
  role: 'teacher',
  schoolName: 'Escola Municipal Monteiro Lobato',
  avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=120',
  createdAt: '2026-01-15T08:00:00.000Z',
};

export const DEFAULT_DEMO_ADMIN: UserProfile = {
  id: 'usr-admin-2026',
  email: 'admin@educaflow.edu.br',
  name: 'Coord.ª Ana Beatriz',
  role: 'admin',
  schoolName: 'Escola Municipal Monteiro Lobato',
  avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=120',
  createdAt: '2026-01-15T08:00:00.000Z',
};

export const authService = {
  async loginWithEmail(email: string, password: string): Promise<{ user: UserProfile; session: AuthSession }> {
    logger.info(`Iniciando login para e-mail: ${email}`);

    // Standard Demo Teacher check for offline or demonstration
    if (email.trim().toLowerCase() === 'professora.marta@educaflow.edu.br' && password === '123456') {
      const demoSession: AuthSession = {
        accessToken: 'demo-access-token-educaflow-2026',
        refreshToken: 'demo-refresh-token-educaflow-2026',
        expiresAt: Math.floor(Date.now() / 1000) + 86400,
        user: DEFAULT_DEMO_TEACHER,
      };
      localStorage.setItem(AppConstants.STORAGE_AUTH_KEY, JSON.stringify(DEFAULT_DEMO_TEACHER));
      return { user: DEFAULT_DEMO_TEACHER, session: demoSession };
    }

    // Standard Demo Admin check for offline or demonstration
    if (email.trim().toLowerCase() === 'admin@educaflow.edu.br' && password === '123456') {
      const demoSession: AuthSession = {
        accessToken: 'demo-access-token-educaflow-admin-2026',
        refreshToken: 'demo-refresh-token-educaflow-admin-2026',
        expiresAt: Math.floor(Date.now() / 1000) + 86400,
        user: DEFAULT_DEMO_ADMIN,
      };
      localStorage.setItem(AppConstants.STORAGE_AUTH_KEY, JSON.stringify(DEFAULT_DEMO_ADMIN));
      return { user: DEFAULT_DEMO_ADMIN, session: demoSession };
    }

    try {
      if (!isSupabaseConfigured()) {
        throw new Error('Supabase no-config-fallback');
      }

      const { data, error } = await supabaseBrowser.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        logger.error(`Falha no login do Supabase Auth: ${error.message}`);
        throw new Error(mapAuthErrorToPortuguese(error));
      }

      if (!data.user) {
        throw new Error('Sessão inválida retornada do Supabase Auth.');
      }

      // Check profiles table in Supabase for user role
      let role: UserProfile['role'] = (data.user.user_metadata?.role as any) || 'teacher';
      let name: string = data.user.user_metadata?.full_name || data.user.email?.split('@')[0] || 'Usuário';

      try {
        const { data: profile, error: pError } = await supabaseBrowser
          .from('profiles')
          .select('*')
          .eq('id', data.user.id)
          .single();

        if (profile && !pError) {
          role = profile.role as UserProfile['role'];
          if (profile.name) {
            name = profile.name;
          }
          logger.info(`Perfil encontrado na tabela 'profiles'. Papel: ${role}`);
        }
      } catch (dbErr) {
        logger.warn('Tabela profiles não pôde ser lida, usando metadados do auth:', dbErr);
      }

      const userProfile: UserProfile = {
        id: data.user.id,
        email: data.user.email || email,
        name,
        role,
        schoolName: data.user.user_metadata?.school_name || 'Escola de Ensino Fundamental I',
        avatarUrl: data.user.user_metadata?.avatar_url,
        createdAt: data.user.created_at || new Date().toISOString(),
      };

      const authSession: AuthSession = {
        accessToken: data.session?.access_token || '',
        refreshToken: data.session?.refresh_token || '',
        expiresAt: data.session?.expires_at || Math.floor(Date.now() / 1000) + 3600,
        user: userProfile,
      };

      localStorage.setItem(AppConstants.STORAGE_AUTH_KEY, JSON.stringify(userProfile));
      logger.info('Login via Supabase Auth realizado com sucesso');
      return { user: userProfile, session: authSession };
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : '';
      const isConnectionIssue = errorMsg.includes('no-config-fallback') || 
                                errorMsg.includes('fetch') || 
                                errorMsg.includes('network') || 
                                errorMsg.includes('offline') ||
                                errorMsg.includes('API key') ||
                                errorMsg.includes('anon-key') ||
                                errorMsg.includes('Failed to fetch');

      if (isConnectionIssue) {
        logger.info('Falha de conexão ou Supabase não configurado. Utilizando autenticação local mock...');
        const lowerEmail = email.trim().toLowerCase();
        // Special case for thiagomtda@gmail.com
        const role = lowerEmail === 'thiagomtda@gmail.com' ? 'admin' : 'teacher';
        const userProfile: UserProfile = {
          id: `usr-local-${Date.now()}`,
          email: lowerEmail,
          name: email.split('@')[0],
          role,
          schoolName: 'Escola Municipal Monteiro Lobato',
          createdAt: new Date().toISOString(),
        };
        const authSession: AuthSession = {
          accessToken: `local-access-token-${Date.now()}`,
          refreshToken: `local-refresh-token-${Date.now()}`,
          expiresAt: Math.floor(Date.now() / 1000) + 86400,
          user: userProfile,
        };
        localStorage.setItem(AppConstants.STORAGE_AUTH_KEY, JSON.stringify(userProfile));
        return { user: userProfile, session: authSession };
      }

      if (err instanceof Error) {
        throw err;
      }
      throw new Error('Erro ao comunicar com o servidor de autenticação.');
    }
  },

  async signupWithEmail(email: string, password: string, name: string, schoolName: string): Promise<{ user: UserProfile }> {
    logger.info(`Iniciando cadastro para e-mail: ${email}`);

    // High Priority: if thiagomtda@gmail.com registers, make it an admin instantly on local state!
    if (email.trim().toLowerCase() === 'thiagomtda@gmail.com') {
      logger.info('Cadastro de thiagomtda@gmail.com interceptado para conceder perfil ADMIN imediato.');
      const adminProfile: UserProfile = {
        id: 'usr-thiago-admin',
        email: 'thiagomtda@gmail.com',
        name: name || 'Thiago Admin',
        role: 'admin',
        schoolName: schoolName || 'Escola Municipal Monteiro Lobato',
        avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=120',
        createdAt: new Date().toISOString(),
      };

      // Try to register in background if Supabase is configured
      try {
        if (isSupabaseConfigured()) {
          const { data } = await supabaseBrowser.auth.signUp({
            email,
            password,
            options: {
              data: {
                full_name: name,
                school_name: schoolName,
                role: 'admin',
              },
            },
          });
          if (data?.user) {
            await supabaseBrowser.from('profiles').insert({
              id: data.user.id,
              email,
              name,
              role: 'admin',
              school_name: schoolName
            });
          }
        }
      } catch (err) {
        logger.warn('Supabase background signup failed for thiagomtda@gmail.com, continuing locally:', err);
      }

      localStorage.setItem(AppConstants.STORAGE_AUTH_KEY, JSON.stringify(adminProfile));
      return { user: adminProfile };
    }

    try {
      if (!isSupabaseConfigured()) {
        throw new Error('Supabase no-config-fallback');
      }

      const { data, error } = await supabaseBrowser.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
            school_name: schoolName,
            role: 'teacher',
          },
        },
      });

      if (error) {
        logger.error(`Falha no cadastro do Supabase Auth: ${error.message}`);
        throw new Error(mapAuthErrorToPortuguese(error));
      }

      if (!data.user) {
        throw new Error('Erro ao criar conta no Supabase.');
      }

      // Try inserting into profiles table
      try {
        await supabaseBrowser.from('profiles').insert({
          id: data.user.id,
          email,
          name,
          role: 'teacher',
          school_name: schoolName
        });
        logger.info('Perfil registrado na tabela profiles.');
      } catch (dbErr) {
        logger.warn('Falha ao inserir na tabela profiles, ignorando:', dbErr);
      }

      const userProfile: UserProfile = {
        id: data.user.id,
        email: data.user.email || email,
        name,
        role: 'teacher',
        schoolName,
        createdAt: new Date().toISOString(),
      };

      localStorage.setItem(AppConstants.STORAGE_AUTH_KEY, JSON.stringify(userProfile));
      return { user: userProfile };
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : '';
      const isConnectionIssue = errorMsg.includes('no-config-fallback') || 
                                errorMsg.includes('fetch') || 
                                errorMsg.includes('network') || 
                                errorMsg.includes('offline') ||
                                errorMsg.includes('API key') ||
                                errorMsg.includes('anon-key') ||
                                errorMsg.includes('Failed to fetch');

      if (isConnectionIssue) {
        logger.info('Falha de conexão ou Supabase não configurado no cadastro. Salvando perfil localmente...');
        const userProfile: UserProfile = {
          id: `usr-local-${Date.now()}`,
          email,
          name,
          role: 'teacher',
          schoolName,
          createdAt: new Date().toISOString(),
        };
        localStorage.setItem(AppConstants.STORAGE_AUTH_KEY, JSON.stringify(userProfile));
        return { user: userProfile };
      }

      if (err instanceof Error) {
        throw err;
      }
      throw new Error('Erro ao registrar novo usuário no Supabase.');
    }
  },

  async sendPasswordReset(email: string): Promise<void> {
    logger.info(`Enviando e-mail de redefinição de senha para: ${email}`);

    try {
      const redirectUrl = typeof window !== 'undefined'
        ? `${window.location.origin}/resetar-senha`
        : 'http://localhost:3000/resetar-senha';

      const { error } = await supabaseBrowser.auth.resetPasswordForEmail(email, {
        redirectTo: redirectUrl,
      });

      if (error) {
        logger.error(`Erro na recuperação de senha: ${error.message}`);
        throw new Error(mapAuthErrorToPortuguese(error));
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        throw err;
      }
      throw new Error('Erro ao solicitar e-mail de recuperação de senha.');
    }
  },

  async resetPassword(newPassword: string): Promise<void> {
    logger.info('Atualizando senha no Supabase Auth');

    try {
      const { error } = await supabaseBrowser.auth.updateUser({
        password: newPassword,
      });

      if (error) {
        logger.error(`Erro ao redefinir senha: ${error.message}`);
        throw new Error(mapAuthErrorToPortuguese(error));
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        throw err;
      }
      throw new Error('Erro ao redefinir a nova senha no Supabase.');
    }
  },

  async signOut(): Promise<void> {
    logger.info('Executando logout no authService...');
    try {
      await supabaseBrowser.auth.signOut();
    } catch (err) {
      logger.warn('Aviso no Supabase signOut:', err);
    } finally {
      localStorage.removeItem(AppConstants.STORAGE_AUTH_KEY);
    }
  },

  loginDemoTeacher(): { user: UserProfile; session: AuthSession } {
    logger.info('Efetuando login via Demo Teacher (Acesso Rápido)');
    const demoSession: AuthSession = {
      accessToken: 'demo-access-token-educaflow-2026',
      refreshToken: 'demo-refresh-token-educaflow-2026',
      expiresAt: Math.floor(Date.now() / 1000) + 86400,
      user: DEFAULT_DEMO_TEACHER,
    };
    localStorage.setItem(AppConstants.STORAGE_AUTH_KEY, JSON.stringify(DEFAULT_DEMO_TEACHER));
    return { user: DEFAULT_DEMO_TEACHER, session: demoSession };
  },

  loginDemoAdmin(): { user: UserProfile; session: AuthSession } {
    logger.info('Efetuando login via Demo Admin (Acesso Rápido)');
    const demoSession: AuthSession = {
      accessToken: 'demo-access-token-educaflow-admin-2026',
      refreshToken: 'demo-refresh-token-educaflow-admin-2026',
      expiresAt: Math.floor(Date.now() / 1000) + 86400,
      user: DEFAULT_DEMO_ADMIN,
    };
    localStorage.setItem(AppConstants.STORAGE_AUTH_KEY, JSON.stringify(DEFAULT_DEMO_ADMIN));
    return { user: DEFAULT_DEMO_ADMIN, session: demoSession };
  },
};
