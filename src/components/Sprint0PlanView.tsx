import React, { useState } from 'react';
import {
  Calendar,
  Terminal,
  FolderTree,
  PackageCheck,
  Server,
  Github,
  Workflow,
  FileCode,
  CheckCircle2,
  Award,
  Copy,
  Check,
  ShieldCheck,
  Sparkles,
  Layers,
  Cpu,
  ArrowRight,
  Download,
  Code
} from 'lucide-react';
import {
  SPRINT_0_ROADMAP,
  SPRINT_0_DEPENDENCIES,
  FIRST_PROJECT_FILES,
  SPRINT_0_CHECKLIST,
  SPRINT_0_READINESS_CERTIFICATE,
  Sprint0DayTask
} from '../data/sprint0PlanData';

export const Sprint0PlanView: React.FC = () => {
  const [activeSection, setActiveSection] = useState<'roadmap' | 'folder_tree' | 'deps' | 'cli_order' | 'supabase' | 'files' | 'cert'>('roadmap');
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const navItems = [
    { id: 'roadmap', label: '1. Roadmap 5 Dias', icon: <Calendar className="w-4 h-4" /> },
    { id: 'folder_tree', label: '2. Árvore de Pastas', icon: <FolderTree className="w-4 h-4" /> },
    { id: 'deps', label: '3. Dependências', icon: <PackageCheck className="w-4 h-4" /> },
    { id: 'cli_order', label: '4. Comandos Terminal', icon: <Terminal className="w-4 h-4" /> },
    { id: 'supabase', label: '5. Supabase & GitHub', icon: <Server className="w-4 h-4" /> },
    { id: 'files', label: '6. Primeiros Arquivos', icon: <FileCode className="w-4 h-4" /> },
    { id: 'cert', label: '7. Certificado Sprint 0', icon: <Award className="w-4 h-4 text-emerald-400" /> }
  ];

  return (
    <div className="h-full flex flex-col bg-slate-950 text-slate-100 overflow-y-auto">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 border-b border-slate-800 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  <Terminal className="w-3.5 h-3.5" /> PLANO OPERACIONAL DE EXECUÇÃO
                </span>
                <span className="text-xs font-mono text-slate-400 bg-slate-800 px-2.5 py-1 rounded-md border border-slate-700">
                  EducaFlow Sprint 0 Plan v1.0
                </span>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight flex items-center gap-2">
                <PackageCheck className="w-7 h-7 text-emerald-400" />
                Sprint 0 Implementation Plan & Repository Bootstrap v1.0
              </h1>
              <p className="text-sm text-slate-300 mt-1 max-w-4xl">
                Guia Definitivo de Execução e Inicialização do Repositório para Desenvolvimento no Visual Studio Code. Transforma toda a documentação em comandos, tarefas diárias, dependências e configurações prontas.
              </p>
            </div>

            <div className="bg-slate-900/90 border border-emerald-500/30 p-3.5 rounded-xl text-right shrink-0">
              <span className="text-[10px] font-mono text-emerald-400 block uppercase font-bold">Fase de Arquitetura</span>
              <span className="text-xs font-bold text-white">CONCLUÍDA & HOMOLOGADA</span>
              <span className="text-[10px] text-slate-400 block mt-0.5">Execução em Código Liberada</span>
            </div>
          </div>

          {/* Quick Sub-navigation */}
          <div className="flex items-center gap-2 mt-6 pt-4 border-t border-slate-800/80 overflow-x-auto no-scrollbar">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id as any)}
                className={`px-3.5 py-2 rounded-xl text-xs font-medium transition-all flex items-center gap-2 whitespace-nowrap ${
                  activeSection === item.id
                    ? 'bg-indigo-600 text-white font-semibold shadow-lg shadow-indigo-600/20'
                    : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Body Content */}
      <div className="flex-1 max-w-7xl mx-auto w-full p-6">
        {/* SECTION 1: ROADMAP 5 DIAS */}
        {activeSection === 'roadmap' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-indigo-400" />
                  Roadmap Detalhado do Sprint 0 (Dia 1 ao Dia 5)
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Cronograma operacional passo a passo para transformar o repositório num ambiente compilável e pronto para o Sprint 1.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {SPRINT_0_ROADMAP.map((day) => (
                <div key={day.dayNumber} className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition-all">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 pb-3 border-b border-slate-800/80 mb-4">
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-xl bg-indigo-600 text-white text-xs font-bold flex items-center justify-center shrink-0">
                        D{day.dayNumber}
                      </span>
                      <div>
                        <h3 className="text-sm font-bold text-white">{day.dayTitle}</h3>
                        <span className="text-xs text-indigo-300 font-mono">{day.focusArea}</span>
                      </div>
                    </div>

                    <span className="text-[11px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full font-mono">
                      Meta: {day.expectedOutcome}
                    </span>
                  </div>

                  <div className="space-y-3">
                    {day.tasks.map((task, tIdx) => (
                      <div key={tIdx} className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800/60 space-y-2">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" />
                          <h4 className="text-xs font-bold text-white">{task.taskTitle}</h4>
                        </div>
                        <p className="text-xs text-slate-300 pl-6 leading-relaxed">
                          {task.details}
                        </p>
                        {task.cliCommand && (
                          <div className="pl-6 pt-1">
                            <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800 font-mono text-[11px] text-emerald-400 flex items-center justify-between">
                              <span className="truncate pr-2">$ {task.cliCommand}</span>
                              <button
                                onClick={() => handleCopy(task.cliCommand!, `cmd_d${day.dayNumber}_${tIdx}`)}
                                className="p-1 hover:bg-slate-800 rounded text-slate-400 hover:text-white shrink-0"
                                title="Copiar Comando"
                              >
                                {copiedText === `cmd_d${day.dayNumber}_${tIdx}` ? (
                                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                                ) : (
                                  <Copy className="w-3.5 h-3.5" />
                                )}
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SECTION 2: FOLDER TREE */}
        {activeSection === 'folder_tree' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <FolderTree className="w-5 h-5 text-indigo-400" />
                  Estrutura Oficial de Pastas do Repositório (`educaflow/`)
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Organização modular do código-fonte para garantir alta escalabilidade e isolamento de responsabilidades.
                </p>
              </div>
            </div>

            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 font-mono text-xs text-indigo-300 space-y-2 overflow-x-auto">
              <pre className="text-xs text-slate-200">
{`educaflow/
├── .github/
│   └── workflows/
│       └── ci.yml                     # Pipeline de CI/CD automatizado (Next.js Build, Typecheck, Testes)
├── docs/                              # Documentação técnica e manuais da arquitetura
├── public/                            # Favicon, ícones e manifesto PWA
├── src/
│   ├── app/                           # Next.js 15 App Router (/app)
│   │   ├── layout.tsx                 # Root Layout com Providers globais e PWA
│   │   ├── page.tsx                   # Cockpit principal do professor
│   │   ├── chamada/                   # Rota da chamada tátil rápida
│   │   ├── planos/                    # Rota do planejador BNCC & Aurora AI
│   │   └── api/
│   │       └── aurora/                # Route Handler Server-Side proxy
│   ├── components/                    # Componentes React
│   │   ├── ui/                        # Componentes atômicos acessíveis (Botões, Inputs, Badges)
│   │   ├── cockpit/                   # Dashboard do professor e cards de ação
│   │   ├── diario/                    # Módulo de chamada e registro de conteúdo
│   │   └── planos/                    # Gerador de planos de aula BNCC
│   ├── db/                            # Banco de dados local Dexie.js (IndexedDB)
│   │   └── dexieDb.ts                 # Esquema das tabelas offline ("use client")
│   ├── hooks/                         # Custom hooks React
│   ├── services/                      # Serviços de comunicação (Supabase SSR, Sync Engine, Aurora AI)
│   ├── stores/                        # Gerenciamento de estado reativo com Zustand
│   ├── types/                         # Interfaces TypeScript e definições globais
│   └── utils/                         # Funções utilitárias puras
├── supabase/
│   ├── functions/
│   │   └── aurora-generate/           # Edge Function Deno para chamada segura da IA Gemini
│   └── migrations/                    # Scripts DDL do PostgreSQL
├── .env.example
├── .gitignore
├── next.config.ts
├── package.json
└── tsconfig.json`}
              </pre>
            </div>
          </div>
        )}

        {/* SECTION 3: DEPENDENCIES */}
        {activeSection === 'deps' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <PackageCheck className="w-5 h-5 text-indigo-400" />
                  Lista Completa e Justificativa das Dependências
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Mapeamento de cada biblioteca declarada no `package.json` e seu papel na arquitetura.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {SPRINT_0_DEPENDENCIES.map((dep, idx) => (
                <div key={idx} className="bg-slate-900/80 border border-slate-800 p-4 rounded-xl space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-emerald-400">{dep.packageName}</span>
                    <span className="text-[10px] font-mono bg-slate-800 text-slate-300 px-2 py-0.5 rounded">
                      {dep.version}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-semibold text-indigo-300 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
                      {dep.category}
                    </span>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                      dep.isDev ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                    }`}>
                      {dep.isDev ? 'devDependency' : 'dependency'}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 pt-1 border-t border-slate-800/60">
                    {dep.justification}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SECTION 4: CLI COMMANDS */}
        {activeSection === 'cli_order' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <Terminal className="w-5 h-5 text-indigo-400" />
                  Ordem Sequencial Exata dos Comandos de Terminal
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Copie e cole a sequência de comandos para construir o projeto do zero no VS Code.
                </p>
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 font-mono text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <span className="text-slate-400 text-xs font-semibold">Script Completo de Bootstrapper (Terminal / Bash)</span>
                <button
                  onClick={() => handleCopy(`# 1. Inicializar projeto Next.js 15 com App Router + React 19
npx create-next-app@latest educaflow --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
cd educaflow

# 2. Instalar dependências de produção
npm install @supabase/supabase-js @supabase/ssr @tanstack/react-query @ducanh2912/next-pwa clsx dexie dexie-react-hooks lucide-react motion next react react-dom react-hook-form tailwind-merge zod zustand

# 3. Instalar dependências de desenvolvimento
npm install -D @types/node @types/react @types/react-dom eslint eslint-config-next postcss tailwindcss typescript vitest

# 4. Inicializar Supabase Local
npx supabase init

# 5. Executar servidor de desenvolvimento Next.js 15
npm run dev`, 'all_cli')}
                  className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-sans font-bold flex items-center gap-1.5 transition-all"
                >
                  {copiedText === 'all_cli' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  Copiar Todo o Script CLI
                </button>
              </div>

              <pre className="text-emerald-400 leading-relaxed overflow-x-auto whitespace-pre-wrap">
{`# 1. Inicializar projeto Next.js 15 com App Router + React 19
npx create-next-app@latest educaflow --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
cd educaflow

# 2. Instalar dependências de produção
npm install @supabase/supabase-js @supabase/ssr @tanstack/react-query @ducanh2912/next-pwa clsx dexie dexie-react-hooks lucide-react motion next react react-dom react-hook-form tailwind-merge zod zustand

# 3. Instalar dependências de desenvolvimento
npm install -D @types/node @types/react @types/react-dom eslint eslint-config-next postcss tailwindcss typescript vitest

# 4. Inicializar Supabase Local
npx supabase init

# 5. Executar servidor de desenvolvimento Next.js 15
npm run dev`}
              </pre>
            </div>
          </div>
        )}

        {/* SECTION 5: SUPABASE & GITHUB */}
        {activeSection === 'supabase' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <Server className="w-5 h-5 text-indigo-400" />
                  Checklist Supabase & Configuração do GitHub
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Procedimentos para provisionar o banco de dados e repositório remoto.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Supabase Box */}
              <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl space-y-3">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Server className="w-4 h-4 text-emerald-400" /> Checklist do Supabase Backend
                </h3>
                <ul className="space-y-2 text-xs text-slate-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Projeto criado na nuvem e conectado via Supabase CLI</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Schema do PostgreSQL aplicado via migrações idempotentes</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Row Level Security (RLS) habilitado para isolamento por professor</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Edge Function <code className="text-indigo-300 font-mono">aurora-generate</code> implantada com chave Gemini</span>
                  </li>
                </ul>
              </div>

              {/* GitHub Box */}
              <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl space-y-3">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Github className="w-4 h-4 text-indigo-400" /> Checklist do Repositório GitHub
                </h3>
                <ul className="space-y-2 text-xs text-slate-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Repositório remoto criado com branch padrão <code className="text-indigo-300 font-mono">main</code></span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Protection Rules configuradas para exigir aprovação em PRs</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Secrets do repositório adicionadas (<code className="text-indigo-300 font-mono">SUPABASE_URL</code>, <code className="text-indigo-300 font-mono">SUPABASE_ANON_KEY</code>)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>GitHub Actions CI ativado para builds automáticos</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* SECTION 6: FIRST FILES */}
        {activeSection === 'files' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <FileCode className="w-5 h-5 text-indigo-400" />
                  Arquivos Fundamentais do Primeiro Commit
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Exemplos das configurações exatas prontas para salvar na raiz do projeto.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              {FIRST_PROJECT_FILES.map((file, idx) => (
                <div key={idx} className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                    <div>
                      <span className="font-mono text-xs font-bold text-indigo-400">{file.filePath}</span>
                      <p className="text-[11px] text-slate-400 mt-0.5">{file.description}</p>
                    </div>
                    <button
                      onClick={() => handleCopy(file.contentSnippet, file.filePath)}
                      className="p-1.5 hover:bg-slate-800 rounded text-slate-400 hover:text-white"
                      title="Copiar Arquivo"
                    >
                      {copiedText === file.filePath ? (
                        <Check className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>

                  <pre className="bg-slate-950 p-4 rounded-xl border border-slate-800/80 font-mono text-[11px] text-indigo-300 overflow-x-auto">
                    {file.contentSnippet}
                  </pre>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SECTION 7: READINESS CERTIFICATE */}
        {activeSection === 'cert' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-b from-slate-900 via-slate-900 to-emerald-950/40 border border-emerald-500/30 rounded-2xl p-8 text-center space-y-6">
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400 shadow-xl shadow-emerald-500/10">
                <Award className="w-8 h-8" />
              </div>

              <div>
                <span className="text-xs font-mono text-emerald-400 uppercase font-bold tracking-widest block mb-1">
                  DOCUMENTO OFICIAL DE HOMOLOGAÇÃO
                </span>
                <h2 className="text-2xl font-bold text-white max-w-2xl mx-auto">
                  {SPRINT_0_READINESS_CERTIFICATE.title}
                </h2>
                <span className="text-xs font-mono text-slate-400 block mt-2">
                  Registro: {SPRINT_0_READINESS_CERTIFICATE.certificateNumber} | Emissão: {SPRINT_0_READINESS_CERTIFICATE.issueDate}
                </span>
              </div>

              <p className="text-xs text-slate-300 max-w-3xl mx-auto leading-relaxed bg-slate-950/60 p-4 rounded-xl border border-slate-800">
                "{SPRINT_0_READINESS_CERTIFICATE.declarationText}"
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-3 text-left pt-4">
                {SPRINT_0_READINESS_CERTIFICATE.signatories.map((sig, sIdx) => (
                  <div key={sIdx} className="bg-slate-950/90 p-3.5 rounded-xl border border-slate-800 text-xs">
                    <span className="text-[10px] text-slate-400 font-mono block uppercase">Signatário</span>
                    <span className="font-bold text-white block mb-0.5">{sig.role}</span>
                    <span className="text-[10px] text-slate-300 block mb-2">{sig.name}</span>
                    <span className="inline-flex items-center gap-1 text-[10px] text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                      <Check className="w-3 h-3" /> {sig.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
