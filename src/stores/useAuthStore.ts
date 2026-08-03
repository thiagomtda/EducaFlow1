import { create } from 'zustand';
import { UserProfile, AuthSession } from '../types';
import { authService, DEFAULT_DEMO_TEACHER, DEFAULT_DEMO_ADMIN } from '../services/authService';
import { logger } from '../lib/logger';
import { AppConstants } from '../constants';

interface AuthState {
  user: UserProfile | null;
  session: AuthSession | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  // Actions
  loginWithEmail: (email: string, password: string) => Promise<boolean>;
  signupWithEmail: (email: string, password: string, name: string, schoolName: string) => Promise<boolean>;
  sendPasswordReset: (email: string) => Promise<boolean>;
  resetPassword: (newPassword: string) => Promise<boolean>;
  loginDemoTeacher: () => void;
  loginDemoAdmin: () => void;
  logout: () => Promise<void>;
  refreshSession: () => Promise<void>;
  clearSession: () => void;
  setUserAndSession: (user: UserProfile | null, session: AuthSession | null) => void;
  clearError: () => void;
}

const getInitialUser = (): UserProfile | null => {
  if (typeof window !== 'undefined') {
    try {
      const cached = localStorage.getItem(AppConstants.STORAGE_AUTH_KEY);
      if (cached) {
        return JSON.parse(cached);
      }
    } catch (e) {
      logger.warn('Erro ao carregar usuário inicial do localStorage', e);
    }
  }
  return null;
};

const initialUser = getInitialUser();

export const useAuthStore = create<AuthState>((set, get) => ({
  user: initialUser,
  session: null,
  isAuthenticated: !!initialUser,
  isLoading: false,
  error: null,

  loginWithEmail: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const { user, session } = await authService.loginWithEmail(email, password);
      set({
        user,
        session,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
      return true;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Erro ao realizar login.';
      set({ error: message, isLoading: false, isAuthenticated: false });
      return false;
    }
  },

  signupWithEmail: async (email, password, name, schoolName) => {
    set({ isLoading: true, error: null });
    try {
      const { user } = await authService.signupWithEmail(email, password, name, schoolName);
      set({
        user,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
      return true;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Erro ao cadastrar conta.';
      set({ error: message, isLoading: false });
      return false;
    }
  },

  sendPasswordReset: async (email) => {
    set({ isLoading: true, error: null });
    try {
      await authService.sendPasswordReset(email);
      set({ isLoading: false, error: null });
      return true;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Erro ao enviar e-mail de redefinição.';
      set({ error: message, isLoading: false });
      return false;
    }
  },

  resetPassword: async (newPassword) => {
    set({ isLoading: true, error: null });
    try {
      await authService.resetPassword(newPassword);
      set({ isLoading: false, error: null });
      return true;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Erro ao redefinir a nova senha.';
      set({ error: message, isLoading: false });
      return false;
    }
  },

  loginDemoTeacher: () => {
    logger.info('Acesso rápido Demo Teacher acionado em useAuthStore');
    const { user, session } = authService.loginDemoTeacher();
    set({
      user,
      session,
      isAuthenticated: true,
      isLoading: false,
      error: null,
    });
  },

  loginDemoAdmin: () => {
    logger.info('Acesso rápido Demo Admin acionado em useAuthStore');
    const { user, session } = authService.loginDemoAdmin();
    set({
      user,
      session,
      isAuthenticated: true,
      isLoading: false,
      error: null,
    });
  },

  logout: async () => {
    logger.info('Encerrando sessão em useAuthStore...');
    set({ isLoading: true });
    try {
      await authService.signOut();
    } catch (err) {
      logger.warn('Aviso no logout:', err);
    } finally {
      localStorage.removeItem(AppConstants.STORAGE_AUTH_KEY);
      set({
        user: null,
        session: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      });
    }
  },

  refreshSession: async () => {
    logger.info('Renovando sessão do usuário...');
    const currentUser = get().user;
    if (!currentUser) return;

    try {
      const cached = localStorage.getItem(AppConstants.STORAGE_AUTH_KEY);
      if (cached) {
        const parsed = JSON.parse(cached);
        set({ user: parsed, isAuthenticated: true });
      }
    } catch (err) {
      logger.error('Erro ao atualizar sessão:', err);
    }
  },

  clearSession: () => {
    localStorage.removeItem(AppConstants.STORAGE_AUTH_KEY);
    set({
      user: null,
      session: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
    });
  },

  setUserAndSession: (user, session) => {
    if (user) {
      localStorage.setItem(AppConstants.STORAGE_AUTH_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(AppConstants.STORAGE_AUTH_KEY);
    }
    set({
      user,
      session,
      isAuthenticated: !!user,
      isLoading: false,
    });
  },

  clearError: () => {
    set({ error: null });
  },
}));
