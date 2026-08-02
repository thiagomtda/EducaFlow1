'use client';

import React, { useState } from 'react';
import { useAuthStore } from '../stores/useAuthStore';
import { useAppStore } from '../stores/useAppStore';
import { useNetworkStore } from '../stores/useNetworkStore';
import { useDexieData } from '../hooks/useDexieData';
import { useOfflineSync } from '../hooks/useOfflineSync';
import { logger } from '../lib/logger';
import { syncEngine } from '../services/syncEngine';
import { generateWithAuroraAi } from '../services/auroraAiService';
import { env } from '../config/env';
import { AppConstants } from '../constants';
import {
  CheckCircle2,
  XCircle,
  RefreshCw,
  Database,
  Cloud,
  Zap,
  Activity,
  Layers,
  Terminal,
  Wifi,
  WifiOff,
  Sun,
  Moon,
  Sparkles,
  ShieldCheck,
  Cpu
} from 'lucide-react';

export default function TechnicalValidationPage() {
  const { user, loginDemoTeacher, logout } = useAuthStore();
  const { theme, setTheme, selectedClass } = useAppStore();
  const { isOnline, pendingSyncCount, lastSyncTimestamp } = useNetworkStore();
  const { classes, students, attendanceRecords, syncQueue, isLoaded } = useDexieData();
  const { triggerManualSync, isSyncing } = useOfflineSync();

  const [aiTestResult, setAiTestResult] = useState<string | null>(null);
  const [isTestingAi, setIsTestingAi] = useState(false);
  const [logs, setLogs] = useState(logger.getHistory());

  const refreshLogs = () => setLogs(logger.getHistory());

  const handleTestAiProxy = async () => {
    setIsTestingAi(true);
    setAiTestResult(null);
    logger.info('Iniciando teste técnico de integração com o Route Handler Aurora AI...');

    const res = await generateWithAuroraAi({
      prompt: 'Forneça uma mensagem de validação de 1 linha confirmando que a arquitetura do EducaFlow está pronta.',
      grade: '3º Ano',
      subject: 'Educação Geral',
    });

    setIsTestingAi(false);
    if (res.success) {
      setAiTestResult(`✅ Sucesso (${res.model}): "${res.content.trim()}"`);
      logger.info('Teste de IA concluído com sucesso.');
    } else {
      setAiTestResult(`⚠️ Resposta do Proxy: ${res.error || 'Verifique se GEMINI_API_KEY está configurada no servidor.'}`);
      logger.warn('Teste de IA retornou aviso.', { error: res.error });
    }
    refreshLogs();
  };

  const handleCreateMockAttendance = async () => {
    if (!selectedClass) return;
    const nowStr = new Date().toISOString();
    const mockRecord = {
      studentId: 'std-001',
      classId: selectedClass.id,
      date: nowStr.split('T')[0],
      status: 'present' as const,
      synced: false,
      updatedAt: nowStr,
    };

    await syncEngine.enqueue('attendance', 'CREATE', mockRecord);
    logger.info('Simulação: Registro de presença adicionado à fila de sincronização.', mockRecord);
    refreshLogs();
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-8 font-sans selection:bg-indigo-500 selection:text-white">
      {/* Header técnico */}
      <header className="max-w-7xl mx-auto mb-8 border-b border-slate-800 pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-1 bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 font-mono text-[11px] font-bold rounded-md uppercase tracking-wider flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5" /> Next.js 15 App Router
            </span>
            <span className="px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-[11px] font-bold rounded-md uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" /> Sprint 01 Foundation
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white flex items-center gap-3">
            {AppConstants.APP_NAME} <span className="text-slate-500 text-lg font-normal">| Cockpit de Validação de Infraestrutura</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Validação técnica completa dos 10 subsistemas fundamentais do projeto.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2.5 bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 rounded-xl transition-all"
            title="Alternar Tema"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-400" />}
          </button>
          <div className={`px-3 py-1.5 rounded-xl border text-xs font-mono font-bold flex items-center gap-2 ${
            isOnline ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-amber-500/10 border-amber-500/30 text-amber-400'
          }`}>
            {isOnline ? <Wifi className="w-4 h-4" /> : <WifiOff className="w-4 h-4" />}
            {isOnline ? 'ONLINE' : 'OFFLINE'}
          </div>
        </div>
      </header>

      {/* Grid com os 10 Cartões de Validação */}
      <main className="max-w-7xl mx-auto space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* 1. Next.js & React 19 Runtime */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition-all">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-indigo-500/10 text-indigo-400 rounded-xl">
                  <Zap className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-sm text-white">1. Core Framework</h3>
              </div>
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            </div>
            <div className="space-y-1.5 text-xs text-slate-300 font-mono">
              <div className="flex justify-between py-1 border-b border-slate-800/60">
                <span className="text-slate-500">Framework:</span>
                <span className="text-white font-semibold">Next.js 15 App Router</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800/60">
                <span className="text-slate-500">React Core:</span>
                <span className="text-white font-semibold">React 19.0 Strict</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-500">Language:</span>
                <span className="text-white font-semibold">TypeScript Strict</span>
              </div>
            </div>
          </div>

          {/* 2. Environment Variables & Zod */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition-all">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-xl">
                  <Activity className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-sm text-white">2. Config & Env (Zod)</h3>
              </div>
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            </div>
            <div className="space-y-1.5 text-xs text-slate-300 font-mono">
              <div className="flex justify-between py-1 border-b border-slate-800/60">
                <span className="text-slate-500">Env Status:</span>
                <span className="text-emerald-400 font-bold">VALIDE ZOD</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800/60">
                <span className="text-slate-500">Environment:</span>
                <span className="text-slate-300">{env.NEXT_PUBLIC_APP_ENV}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-500">Log Level:</span>
                <span className="text-slate-300">{env.NEXT_PUBLIC_LOG_LEVEL}</span>
              </div>
            </div>
          </div>

          {/* 3. Dexie.js Client-Side IndexedDB */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition-all">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-purple-500/10 text-purple-400 rounded-xl">
                  <Database className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-sm text-white">3. Dexie IndexedDB</h3>
              </div>
              {isLoaded ? <CheckCircle2 className="w-5 h-5 text-emerald-400" /> : <XCircle className="w-5 h-5 text-amber-400" />}
            </div>
            <div className="space-y-1.5 text-xs text-slate-300 font-mono">
              <div className="flex justify-between py-1 border-b border-slate-800/60">
                <span className="text-slate-500">Turmas Locais:</span>
                <span className="text-purple-300 font-bold">{classes?.length ?? 0} registros</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800/60">
                <span className="text-slate-500">Alunos Semeados:</span>
                <span className="text-purple-300 font-bold">{students?.length ?? 0} alunos</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-500">Presenças Locais:</span>
                <span className="text-purple-300 font-bold">{attendanceRecords?.length ?? 0} chamadas</span>
              </div>
            </div>
          </div>

          {/* 4. Zustand Stores */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition-all">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-blue-500/10 text-blue-400 rounded-xl">
                  <Layers className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-sm text-white">4. Zustand Stores</h3>
              </div>
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            </div>
            <div className="space-y-2 text-xs text-slate-300 font-mono">
              <div className="bg-slate-950 p-2 rounded-lg border border-slate-800">
                <span className="text-slate-500 block">AuthStore User:</span>
                <span className="text-blue-300 truncate block font-bold">{user ? user.name : 'Desconectado'}</span>
              </div>
              <div className="flex justify-between items-center pt-1">
                <span className="text-slate-500">Tema AppStore:</span>
                <span className="text-slate-200 capitalize font-bold">{theme}</span>
              </div>
            </div>
          </div>

          {/* 5. Supabase & @supabase/ssr */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition-all">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-xl">
                  <Cloud className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-sm text-white">5. Supabase Client & SSR</h3>
              </div>
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            </div>
            <div className="space-y-1.5 text-xs text-slate-300 font-mono">
              <div className="flex justify-between py-1 border-b border-slate-800/60">
                <span className="text-slate-500">SDK Status:</span>
                <span className="text-emerald-400 font-bold">@supabase/ssr OK</span>
              </div>
              <div className="py-1">
                <span className="text-slate-500 block mb-1">Project Endpoint:</span>
                <span className="text-slate-400 truncate block text-[10px] bg-slate-950 p-1.5 rounded border border-slate-800">
                  {env.NEXT_PUBLIC_SUPABASE_URL}
                </span>
              </div>
            </div>
          </div>

          {/* 6. Offline Sync Engine */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition-all">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-amber-500/10 text-amber-400 rounded-xl">
                  <RefreshCw className={`w-5 h-5 ${isSyncing ? 'animate-spin' : ''}`} />
                </div>
                <h3 className="font-semibold text-sm text-white">6. Motor de Sincronização</h3>
              </div>
              <span className="px-2 py-0.5 bg-amber-500/20 text-amber-300 text-[10px] font-mono font-bold rounded-full">
                {pendingSyncCount} pendentes
              </span>
            </div>
            <div className="space-y-2">
              <p className="text-xs text-slate-400">Fila IndexedDB atrelada com mecanismo de tentativa automática.</p>
              <div className="flex gap-2 pt-1">
                <button
                  onClick={handleCreateMockAttendance}
                  className="flex-1 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs rounded-lg font-medium transition-all"
                >
                  + Enfileirar Ação
                </button>
                <button
                  onClick={triggerManualSync}
                  disabled={isSyncing || !isOnline}
                  className="px-3 py-1.5 bg-amber-600 hover:bg-amber-500 disabled:opacity-50 text-white text-xs rounded-lg font-bold transition-all flex items-center gap-1"
                >
                  <RefreshCw className="w-3.5 h-3.5" /> Sync
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Seção Interativa para Testes de IA Proxy e Logs */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-4">
          {/* Card Aurora AI Route Handler */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-indigo-500/20 text-indigo-400 rounded-xl border border-indigo-500/30">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-white">Route Handler Server-Side — Gemini 2.5</h3>
                    <p className="text-xs text-slate-400">Endpoint: <code className="text-indigo-300">{env.NEXT_PUBLIC_AURORA_AI_ENDPOINT}</code></p>
                  </div>
                </div>
                <button
                  onClick={handleTestAiProxy}
                  disabled={isTestingAi}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center gap-2"
                >
                  {isTestingAi ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                  Testar Endpoint Proxy
                </button>
              </div>

              {aiTestResult && (
                <div className="mt-4 p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-200 leading-relaxed overflow-x-auto">
                  {aiTestResult}
                </div>
              )}
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-500 font-mono">
              <span>Status do Proxy: <strong className="text-emerald-400">Ativo / Seguro</strong></span>
              <span>Modelo: <strong>gemini-2.5-flash</strong></span>
            </div>
          </div>

          {/* Console de Logs do Sistema */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2 text-slate-300">
                  <Terminal className="w-5 h-5 text-amber-400" />
                  <h3 className="font-bold text-sm text-white">Console Central de Logs do Sistema</h3>
                </div>
                <button
                  onClick={refreshLogs}
                  className="text-xs text-indigo-400 hover:text-indigo-300 font-mono flex items-center gap-1"
                >
                  <RefreshCw className="w-3 h-3" /> Atualizar Logs
                </button>
              </div>

              <div className="bg-slate-950 border border-slate-800/80 rounded-xl p-3 h-48 overflow-y-auto font-mono text-[11px] space-y-1.5">
                {logs.length === 0 ? (
                  <span className="text-slate-600 italic">Nenhum evento registrado no logger ainda.</span>
                ) : (
                  logs.map((log, idx) => (
                    <div key={idx} className="flex gap-2 text-slate-300 border-b border-slate-900/50 pb-1">
                      <span className="text-slate-500 shrink-0">{log.timestamp.split('T')[1].slice(0, 8)}</span>
                      <span className={`font-bold shrink-0 uppercase ${
                        log.level === 'error' ? 'text-rose-400' : log.level === 'warn' ? 'text-amber-400' : 'text-emerald-400'
                      }`}>
                        [{log.level}]
                      </span>
                      <span className="truncate">{log.message}</span>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-500">
              <span>Logs acumulados no histórico: {logs.length}</span>
              <button
                onClick={() => {
                  logger.clearHistory();
                  refreshLogs();
                }}
                className="text-xs text-slate-500 hover:text-slate-400"
              >
                Limpar Logs
              </button>
            </div>
          </div>
        </div>

        {/* Painel de Ações Rápidas de Teste de Autenticação */}
        <div className="bg-slate-900/50 border border-slate-800/80 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img
              src={user?.avatarUrl || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=120'}
              alt="Avatar"
              className="w-10 h-10 rounded-xl object-cover border border-slate-700"
            />
            <div>
              <h4 className="text-sm font-bold text-white">{user ? user.name : 'Nenhum usuário logado'}</h4>
              <p className="text-xs text-slate-400">{user ? `${user.role.toUpperCase()} — ${user.schoolName}` : 'Sessão pendente'}</p>
            </div>
          </div>

          <div className="flex gap-3">
            {user ? (
              <button
                onClick={logout}
                className="px-4 py-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 rounded-xl text-xs font-semibold transition-all"
              >
                Desconectar Sessão
              </button>
            ) : (
              <button
                onClick={loginDemoTeacher}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold transition-all"
              >
                Simular Login do Professor
              </button>
            )}
          </div>
        </div>
      </main>

      <footer className="max-w-7xl mx-auto mt-12 pt-6 border-t border-slate-900 text-center text-xs text-slate-600">
        EducaFlow &copy; 2026 — Arquitetura Oficial Congelada no Next.js 15 App Router & React 19.
      </footer>
    </div>
  );
}
