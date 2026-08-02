'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { forgotPasswordSchema, ForgotPasswordInput } from '../../lib/authSchemas';
import { useAuthStore } from '../../stores/useAuthStore';
import { KeyRound, ArrowLeft, CheckCircle2, AlertCircle, Send } from 'lucide-react';
import Link from 'next/link';

export default function ForgotPasswordPage() {
  const [success, setSuccess] = useState(false);
  const { sendPasswordReset, isLoading, error, clearError } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordInput>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (data: ForgotPasswordInput) => {
    clearError();
    const isSent = await sendPasswordReset(data.email);
    if (isSent) {
      setSuccess(true);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans text-slate-100 relative overflow-hidden">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center z-10">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-indigo-600/20 border border-indigo-500/40 text-indigo-400 mb-3 shadow-lg">
          <KeyRound className="w-7 h-7" />
        </div>
        <h1 className="text-2xl font-extrabold text-white">Recuperação de Senha</h1>
        <p className="mt-1 text-xs text-slate-400">
          Informe seu e-mail cadastrado para receber o link de redefinição.
        </p>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md z-10 px-4 sm:px-0">
        <div className="bg-slate-800/95 backdrop-blur-md border border-slate-700/80 rounded-2xl shadow-2xl p-6 sm:p-8">
          
          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-950/80 border border-red-800/80 text-red-200 text-xs flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {success ? (
            <div className="text-center py-4 space-y-4">
              <div className="w-12 h-12 rounded-full bg-emerald-900/60 border border-emerald-500/40 text-emerald-400 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white">E-mail de Instruções Enviado</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Enviamos um link de redefinição de senha para o seu endereço de e-mail. Por favor, verifique sua caixa de entrada e spam.
              </p>
              <Link
                href="/login"
                className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-indigo-600 text-white font-semibold text-xs hover:bg-indigo-500 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Voltar para a Tela de Login
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                  E-mail do Professor
                </label>
                <input
                  type="email"
                  placeholder="ex: professora.marta@educaflow.edu.br"
                  {...register('email')}
                  className={`w-full px-4 py-3 rounded-xl bg-slate-900/90 border text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 text-sm transition-all ${
                    errors.email
                      ? 'border-red-500 focus:ring-red-500/50'
                      : 'border-slate-700 focus:ring-indigo-500/50 focus:border-indigo-500'
                  }`}
                />
                {errors.email && (
                  <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" /> {errors.email.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold shadow-lg shadow-indigo-600/30 transition-all text-sm flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isLoading ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Enviar E-mail de Recuperação</span>
                  </>
                )}
              </button>

              <div className="text-center pt-2">
                <Link
                  href="/login"
                  className="text-xs text-slate-400 hover:text-slate-200 transition-colors inline-flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  Voltar para o Login
                </Link>
              </div>
            </form>
          )}

        </div>
      </div>
    </div>
  );
}
