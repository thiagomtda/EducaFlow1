'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, registerSchema, LoginInput, RegisterInput } from '../../lib/authSchemas';
import { useAuthStore } from '../../stores/useAuthStore';
import { LogIn, UserPlus, Eye, EyeOff, ShieldCheck, Sparkles, CheckCircle2, AlertCircle, ArrowRight, BookOpen, Users, UserCog } from 'lucide-react';
import { isSupabaseConfigured } from '../../services/supabase/client';

export default function LoginPage() {
  const dbConnected = isSupabaseConfigured();
  const [activeTab, setActiveTab] = useState<'login' | 'register' | 'demo'>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [registerSuccess, setRegisterSuccess] = useState(false);

  const { loginWithEmail, signupWithEmail, loginDemoTeacher, loginDemoAdmin, isLoading, error, clearError } = useAuthStore();

  // Login Form
  const {
    register: registerLogin,
    handleSubmit: handleSubmitLogin,
    formState: { errors: errorsLogin },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  // Register Form
  const {
    register: registerSignup,
    handleSubmit: handleSubmitSignup,
    formState: { errors: errorsSignup },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      schoolName: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onLoginSubmit = async (data: LoginInput) => {
    clearError();
    const success = await loginWithEmail(data.email, data.password);
    if (success && typeof window !== 'undefined') {
      // Upon successful authentication, check role
      const user = useAuthStore.getState().user;
      if (user?.role === 'admin' || user?.role === 'ADMIN') {
        window.history.pushState({}, '', '/admin');
      } else {
        window.history.pushState({}, '', '/');
      }
    }
  };

  const onRegisterSubmit = async (data: RegisterInput) => {
    clearError();
    const success = await signupWithEmail(data.email, data.password, data.name, data.schoolName);
    if (success) {
      setRegisterSuccess(true);
      const user = useAuthStore.getState().user;
      if (typeof window !== 'undefined') {
        if (user?.role === 'admin' || user?.role === 'ADMIN') {
          window.history.pushState({}, '', '/admin');
        } else {
          window.history.pushState({}, '', '/');
        }
      }
    }
  };

  const handleTeacherDemo = () => {
    clearError();
    loginDemoTeacher();
    if (typeof window !== 'undefined') {
      window.history.pushState({}, '', '/');
    }
  };

  const handleAdminDemo = () => {
    clearError();
    loginDemoAdmin();
    if (typeof window !== 'undefined') {
      window.history.pushState({}, '', '/admin');
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans text-slate-100 relative overflow-hidden">
      {/* Background Decorative Gradients */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-600/15 rounded-full blur-3xl pointer-events-none" />

      {/* Header / Brand */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center z-10">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-600 to-emerald-500 shadow-xl shadow-indigo-500/20 mb-4 border border-indigo-400/30">
          <BookOpen className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-white font-display">
          EducaFlow
        </h1>
        <p className="mt-2 text-sm text-slate-400 max-w-sm mx-auto">
          Plataforma de Produtividade & IA Pedagógica para Professores do Ensino Fundamental I
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md z-10 px-4 sm:px-0">
        <div className="bg-slate-800/95 backdrop-blur-md border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden p-6 sm:p-8">
          
          {/* Connection Status Indicator */}
          <div className="mb-5 flex items-center justify-between bg-slate-900/40 border border-slate-750 rounded-xl p-3">
            <span className="text-xs text-slate-400 font-medium">Supabase Auth:</span>
            {dbConnected ? (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/15 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Nuvem Ativa
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/15 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                Modo Local (MOCK)
              </span>
            )}
          </div>

          {/* Tabs Navigation */}
          <div className="flex border-b border-slate-700 mb-6 bg-slate-900/60 p-1 rounded-xl">
            <button
              type="button"
              onClick={() => {
                setActiveTab('login');
                clearError();
              }}
              className={`flex-1 py-2.5 text-xs sm:text-sm font-semibold rounded-lg transition-all duration-200 flex items-center justify-center gap-1.5 ${
                activeTab === 'login'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <LogIn className="w-4 h-4" />
              Entrar
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveTab('register');
                clearError();
              }}
              className={`flex-1 py-2.5 text-xs sm:text-sm font-semibold rounded-lg transition-all duration-200 flex items-center justify-center gap-1.5 ${
                activeTab === 'register'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <UserPlus className="w-4 h-4" />
              Criar Conta
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveTab('demo');
                clearError();
              }}
              className={`flex-1 py-2.5 text-xs sm:text-sm font-semibold rounded-lg transition-all duration-200 flex items-center justify-center gap-1.5 ${
                activeTab === 'demo'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <Sparkles className="w-4 h-4 text-emerald-300" />
              Acesso Demo
            </button>
          </div>

          {/* Global Error Banner */}
          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-950/80 border border-red-800/80 text-red-200 text-sm flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-red-300">Falha na Autenticação</p>
                <p className="text-red-200/90 mt-0.5">{error}</p>
              </div>
            </div>
          )}

          {/* TAB 1: LOGIN FORM */}
          {activeTab === 'login' && (
            <form onSubmit={handleSubmitLogin(onLoginSubmit)} className="space-y-5" noValidate>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                  E-mail do Professor
                </label>
                <input
                  type="email"
                  autoComplete="email"
                  placeholder="ex: professora.marta@educaflow.edu.br"
                  {...registerLogin('email')}
                  className={`w-full px-4 py-3 rounded-xl bg-slate-900/90 border text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 transition-all ${
                    errorsLogin.email
                      ? 'border-red-500 focus:ring-red-500/50'
                      : 'border-slate-700 focus:ring-indigo-500/50 focus:border-indigo-500'
                  }`}
                />
                {errorsLogin.email && (
                  <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" /> {errorsLogin.email.message}
                  </p>
                )}
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
                    Senha
                  </label>
                  <a
                    href="#recover"
                    onClick={(e) => {
                      e.preventDefault();
                      alert("Redefinição de senha demonstrativa. Utilize o acesso demo.");
                    }}
                    className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors"
                  >
                    Esqueceu a senha?
                  </a>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    placeholder="••••••••"
                    {...registerLogin('password')}
                    className={`w-full px-4 py-3 rounded-xl bg-slate-900/90 border text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 transition-all pr-12 ${
                      errorsLogin.password
                        ? 'border-red-500 focus:ring-red-500/50'
                        : 'border-slate-700 focus:ring-indigo-500/50 focus:border-indigo-500'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 p-1"
                    aria-label={showPassword ? 'Ocultar senha' : 'Exibir senha'}
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errorsLogin.password && (
                  <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" /> {errorsLogin.password.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-semibold shadow-lg shadow-indigo-600/30 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Acessar o EducaFlow</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}

          {/* TAB 2: REGISTER FORM */}
          {activeTab === 'register' && (
            <>
              {registerSuccess ? (
                <div className="text-center py-6 space-y-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-900/60 border border-emerald-500/40 text-emerald-400 mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white">Conta Criada com Sucesso!</h3>
                  <p className="text-sm text-slate-300">
                    Seu cadastro no EducaFlow foi concluído. Você já pode acessar a plataforma.
                  </p>
                  <button
                    type="button"
                    onClick={() => setActiveTab('login')}
                    className="w-full py-3 px-4 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-500 transition-colors text-sm"
                  >
                    Ir para a Tela de Login
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmitSignup(onRegisterSubmit)} className="space-y-4" noValidate>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">
                      Nome Completo
                    </label>
                    <input
                      type="text"
                      placeholder="ex: Prof.ª Marta Vasconcelos"
                      {...registerSignup('name')}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                    />
                    {errorsSignup.name && (
                      <p className="mt-1 text-xs text-red-400">{errorsSignup.name.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">
                      E-mail Institucional ou Pessoal
                    </label>
                    <input
                      type="email"
                      placeholder="ex: marta@escola.edu.br"
                      {...registerSignup('email')}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                    />
                    {errorsSignup.email && (
                      <p className="mt-1 text-xs text-red-400">{errorsSignup.email.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">
                      Nome da Escola
                    </label>
                    <input
                      type="text"
                      placeholder="ex: E.M. Monteiro Lobato"
                      {...registerSignup('schoolName')}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                    />
                    {errorsSignup.schoolName && (
                      <p className="mt-1 text-xs text-red-400">{errorsSignup.schoolName.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">
                      Senha (mínimo 6 caracteres)
                    </label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      {...registerSignup('password')}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                    />
                    {errorsSignup.password && (
                      <p className="mt-1 text-xs text-red-400">{errorsSignup.password.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">
                      Confirmar Senha
                    </label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      {...registerSignup('confirmPassword')}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                    />
                    {errorsSignup.confirmPassword && (
                      <p className="mt-1 text-xs text-red-400">{errorsSignup.confirmPassword.message}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 text-white font-semibold shadow-lg shadow-indigo-600/30 transition-all text-sm mt-2"
                  >
                    {isLoading ? 'Cadastrando...' : 'Concluir Cadastro'}
                  </button>
                </form>
              )}
            </>
          )}

          {/* TAB 3: DEMO ACCESS */}
          {activeTab === 'demo' && (
            <div className="space-y-4 py-2">
              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-300 text-xs leading-relaxed space-y-2">
                <div className="flex items-center gap-2 font-bold text-slate-200 text-sm mb-1">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  Acesso Demonstrativo por Papel (RBAC)
                </div>
                <p>
                  Escolha um perfil demonstrativo para acessar o EducaFlow instantaneamente sem necessidade de cadastro:
                </p>
              </div>

              {/* Teacher Button */}
              <button
                type="button"
                onClick={handleTeacherDemo}
                className="w-full p-4 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-indigo-500/30 text-left transition-all group flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400 font-bold group-hover:bg-indigo-600 group-hover:text-white transition-all">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white leading-tight">Acesso como Professor</h4>
                    <p className="text-[11px] text-slate-400 mt-0.5">Prof.ª Marta • Chamadas, Notas, Plano de Aula</p>
                  </div>
                </div>
                <div className="w-6 h-6 rounded-full border border-slate-800 flex items-center justify-center group-hover:bg-indigo-600 group-hover:border-indigo-500 transition-all text-slate-400 group-hover:text-white">
                  <ArrowRight className="w-3 h-3" />
                </div>
              </button>

              {/* Admin Button */}
              <button
                type="button"
                onClick={handleAdminDemo}
                className="w-full p-4 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-emerald-500/30 text-left transition-all group flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400 font-bold group-hover:bg-emerald-600 group-hover:text-white transition-all">
                    <UserCog className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white leading-tight">Acesso como Coordenador (Admin)</h4>
                    <p className="text-[11px] text-slate-400 mt-0.5">Coord.ª Ana Beatriz • Gestão Escolar, Métricas</p>
                  </div>
                </div>
                <div className="w-6 h-6 rounded-full border border-slate-800 flex items-center justify-center group-hover:bg-emerald-600 group-hover:border-emerald-500 transition-all text-slate-400 group-hover:text-white">
                  <ArrowRight className="w-3 h-3" />
                </div>
              </button>
            </div>
          )}

        </div>

        {/* Footer info */}
        <p className="mt-6 text-center text-xs text-slate-500">
          EducaFlow Sprint 02 — Sistema de Autenticação Supabase Auth & SSR protegidos.
        </p>
      </div>
    </div>
  );
}
