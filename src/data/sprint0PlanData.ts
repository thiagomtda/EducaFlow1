export interface Sprint0DayTask {
  dayNumber: number;
  dayTitle: string;
  focusArea: string;
  tasks: {
    taskTitle: string;
    details: string;
    cliCommand?: string;
  }[];
  expectedOutcome: string;
}

export interface DependencySpec {
  packageName: string;
  version: string;
  category: 'Core UI & Framework' | 'State & Offline' | 'Database & Backend' | 'DevOps & Testing' | 'Styling & Icons';
  isDev: boolean;
  justification: string;
}

export interface FirstFileSpec {
  filePath: string;
  description: string;
  contentSnippet: string;
}

export const SPRINT_0_ROADMAP: Sprint0DayTask[] = [
  {
    dayNumber: 1,
    dayTitle: 'Dia 1: Bootstrap do Repositório & Next.js 15 App Router',
    focusArea: 'Next.js 15, React 19, TypeScript Strict, Tailwind CSS e Git',
    tasks: [
      {
        taskTitle: '1. Inicializar Repositório Git e Projeto Next.js 15',
        details: 'Executar `npx create-next-app@latest` ativando App Router, TypeScript, Tailwind CSS, ESLint, diretório `src/` e alias `@/*`.',
        cliCommand: 'npx create-next-app@latest educaflow --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" && cd educaflow && git init'
      },
      {
        taskTitle: '2. Configurar TypeScript Estrito e Estrutura App Router',
        details: 'Ajustar `tsconfig.json` para modo `strict: true` e estruturar diretórios de rotas em `/src/app`.',
        cliCommand: 'npm install -D tsx @types/node'
      },
      {
        taskTitle: '3. Instalar Lucide Icons, Clsx e Tailwind Utilities',
        details: 'Configurar `@import "tailwindcss";` no `src/app/globals.css` e validar renderização no `layout.tsx`.',
        cliCommand: 'npm install lucide-react clsx tailwind-merge motion'
      }
    ],
    expectedOutcome: 'Repositório compilando perfeitamente com Next.js 15 App Router, TypeScript strict sem erros e Tailwind CSS operante.'
  },
  {
    dayNumber: 2,
    dayTitle: 'Dia 2: Banco Local Offline-First (Dexie.js) & State (Zustand)',
    focusArea: 'Dexie.js (IndexedDB Client-Only), Service Worker PWA e Stores Zustand',
    tasks: [
      {
        taskTitle: '1. Instalar e Configurar Dexie.js (IndexedDB Client-Only)',
        details: 'Criar `/src/db/dexieDb.ts` com diretiva `"use client"` e esquemas de tabelas: `classes`, `students`, `attendance`, `lesson_journals`, `lesson_plans`, `sync_queue`.',
        cliCommand: 'npm install dexie dexie-react-hooks'
      },
      {
        taskTitle: '2. Configurar Gerenciamento de Estado Reativo com Zustand',
        details: 'Criar os stores com `"use client"` em `/src/stores/useAttendanceStore.ts`, `/src/stores/useSyncStore.ts` e `/src/stores/useAuthStore.ts`.',
        cliCommand: 'npm install zustand @tanstack/react-query'
      },
      {
        taskTitle: '3. Testes Unitários com Vitest para o Banco Local',
        details: 'Configurar Vitest para testar a escrita e leitura no Dexie.js em ambiente Node/Jsdom.',
        cliCommand: 'npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom fake-indexeddb'
      }
    ],
    expectedOutcome: 'IndexedDB funcionando no cliente Next.js com suporte a gravações locais < 5ms e testes unitários Vitest aprovados.'
  },
  {
    dayNumber: 3,
    dayTitle: 'Dia 3: Infraestrutura Supabase Backend, Auth & Database Schema',
    focusArea: 'Supabase CLI, PostgreSQL 15+, RLS Policies, GoTrue Auth & SSR Helpers',
    tasks: [
      {
        taskTitle: '1. Inicializar Projeto Supabase local e Migrations',
        details: 'Executar `supabase init` e criar arquivo DDL de migração inicial com tabelas, RLS e triggers de auditoria.',
        cliCommand: 'npx supabase init && npx supabase migration new initial_schema'
      },
      {
        taskTitle: '2. Instalar SDK do Supabase para Next.js App Router',
        details: 'Criar `/src/services/supabaseClient.ts` e `/src/utils/supabase/server.ts` utilizando `@supabase/ssr`.',
        cliCommand: 'npm install @supabase/supabase-js @supabase/ssr'
      },
      {
        taskTitle: '3. Validar Autenticação e Row Level Security (RLS)',
        details: 'Configurar políticas de segurança garantindo que professores só acessem suas turmas vinculadas.',
        cliCommand: 'npx supabase start'
      }
    ],
    expectedOutcome: 'Supabase local rodando via Docker, esquema PostgreSQL aplicado e cliente Next.js SSR/Client conectado.'
  },
  {
    dayNumber: 4,
    dayTitle: 'Dia 4: PWA, Service Worker Offline & Route Handlers',
    focusArea: '@ducanh2912/next-pwa, Service Worker, Route Handler API, Sync Engine Base',
    tasks: [
      {
        taskTitle: '1. Configurar PWA com Next.js 15 e Service Worker Workbox',
        details: 'Configurar manifesto PWA (ícones, tema roxo, offline fallback) em `next.config.ts`.',
        cliCommand: 'npm install @ducanh2912/next-pwa'
      },
      {
        taskTitle: '2. Criar Route Handler Server-Side (`/app/api/aurora/route.ts`)',
        details: 'Criar endpoint POST no Next.js para proxy de requisições de IA sem expor chaves.',
        cliCommand: 'npm run build'
      },
      {
        taskTitle: '3. Teste do Fluxo Offline/Online no Browser',
        details: 'Simular perda de conexão no DevTools, realizar mutações na UI e verificar auto-sync na reconexão.',
        cliCommand: 'npm run start'
      }
    ],
    expectedOutcome: 'PWA Next.js 15 instalável no navegador com funcionamento 100% offline e auto-sync comprovado.'
  },
  {
    dayNumber: 5,
    dayTitle: 'Dia 5: Edge Functions (Deno/Gemini), CI/CD & Deploy Vercel/Cloud Run',
    focusArea: 'Supabase Edge Functions, GitHub Actions e Deploy Next.js',
    tasks: [
      {
        taskTitle: '1. Criar Edge Function Deno `aurora-generate`',
        details: 'Configurar endpoint Deno no Supabase que consome a API do Google Gemini 2.5 Flash.',
        cliCommand: 'npx supabase functions new aurora-generate'
      },
      {
        taskTitle: '2. Criar Pipeline GitHub Actions (`.github/workflows/ci.yml`)',
        details: 'Configurar estágios automatizados: Lint, Type Check, Vitest e Build Next.js (`next build`).',
        cliCommand: 'git add . && git commit -m "feat(ci): adiciona pipeline de integracao continua nextjs"'
      },
      {
        taskTitle: '3. Deploy Preview de Homologação & Emissão do Certificado',
        details: 'Conectar repositório à Vercel / Cloud Run e emitir o Certificado de Prontidão do Sprint 0.',
        cliCommand: 'git push origin main'
      }
    ],
    expectedOutcome: 'Projeto Next.js 15 com CI/CD verde, Edge Function ativa e ambiente totalmente pronto para o Sprint 1.'
  }
];

export const SPRINT_0_DEPENDENCIES: DependencySpec[] = [
  {
    packageName: 'next',
    version: '^15.0.0',
    category: 'Core UI & Framework',
    isDev: false,
    justification: 'Framework React full-stack com App Router, SSR, Server Components e suporte nativo a PWA.'
  },
  {
    packageName: 'react / react-dom',
    version: '^19.0.0',
    category: 'Core UI & Framework',
    isDev: false,
    justification: 'Biblioteca base para construção da interface declarativa com React Server Components.'
  },
  {
    packageName: 'typescript',
    version: '^5.5.4',
    category: 'Core UI & Framework',
    isDev: true,
    justification: 'Garantia de segurança de tipos estritos e checagem em tempo de compilação.'
  },
  {
    packageName: 'dexie / dexie-react-hooks',
    version: '^4.0.8',
    category: 'State & Offline',
    isDev: false,
    justification: 'Wrapper otimizado para IndexedDB garantindo leitura/escrita offline < 5ms no cliente.'
  },
  {
    packageName: 'zustand',
    version: '^4.5.4',
    category: 'State & Offline',
    isDev: false,
    justification: 'Gerenciamento de estado global ultra-leve e sem boilerplate para o cliente.'
  },
  {
    packageName: '@tanstack/react-query',
    version: '^5.51.0',
    category: 'State & Offline',
    isDev: false,
    justification: 'Gerenciamento de cache e mutações assíncronas com revalidação automática.'
  },
  {
    packageName: '@supabase/supabase-js / @supabase/ssr',
    version: '^2.45.1',
    category: 'Database & Backend',
    isDev: false,
    justification: 'Cliente oficial Supabase adaptado para Next.js App Router (Server & Client).'
  },
  {
    packageName: 'tailwindcss / postcss',
    version: '^3.4.10',
    category: 'Styling & Icons',
    isDev: true,
    justification: 'Framework CSS utilitário integrado nativamente ao Next.js.'
  },
  {
    packageName: 'lucide-react',
    version: '^0.428.0',
    category: 'Styling & Icons',
    isDev: false,
    justification: 'Conjunto padronizado de ícones vetoriais leves e acessíveis.'
  },
  {
    packageName: 'motion',
    version: '^11.3.28',
    category: 'Styling & Icons',
    isDev: false,
    justification: 'Animações fluidas de transição de tela e feedback microinterativo.'
  },
  {
    packageName: 'zod / react-hook-form',
    version: '^3.23.8',
    category: 'DevOps & Testing',
    isDev: false,
    justification: 'Validação de formulários e schemas com inferência automática de tipos.'
  },
  {
    packageName: '@ducanh2912/next-pwa',
    version: '^10.2.8',
    category: 'State & Offline',
    isDev: false,
    justification: 'Geração e gerenciamento automático de Service Worker e Workbox no Next.js 15.'
  }
];

export const FIRST_PROJECT_FILES: FirstFileSpec[] = [
  {
    filePath: 'package.json',
    description: 'Manifesto do projeto Next.js 15 com dependências e scripts de execução no VS Code.',
    contentSnippet: `{
  "name": "educaflow",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "test": "vitest run",
    "test:watch": "vitest"
  },
  "dependencies": {
    "@ducanh2912/next-pwa": "^10.2.8",
    "@supabase/ssr": "^0.4.0",
    "@supabase/supabase-js": "^2.45.1",
    "@tanstack/react-query": "^5.51.0",
    "clsx": "^2.1.1",
    "dexie": "^4.0.8",
    "dexie-react-hooks": "^1.1.7",
    "lucide-react": "^0.428.0",
    "motion": "^11.3.28",
    "next": "^15.0.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "react-hook-form": "^7.52.0",
    "tailwind-merge": "^2.5.2",
    "zod": "^3.23.8",
    "zustand": "^4.5.4"
  },
  "devDependencies": {
    "@types/node": "^22.2.0",
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "eslint": "^8.57.0",
    "eslint-config-next": "^15.0.0",
    "postcss": "^8.4.40",
    "tailwindcss": "^3.4.10",
    "typescript": "^5.5.4",
    "vitest": "^2.0.5"
  }
}`
  },
  {
    filePath: 'next.config.ts',
    description: 'Configuração do Next.js 15 com plugin PWA e suporte a Service Worker.',
    contentSnippet: `import type { NextConfig } from 'next';
import withPWAInit from '@ducanh2912/next-pwa';

const withPWA = withPWAInit({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  register: true,
  skipWaiting: true,
});

const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
};

export default withPWA(nextConfig);`
  },
  {
    filePath: '.env.example',
    description: 'Declaração obrigatória das variáveis de ambiente públicas do Next.js sem expor segredos.',
    contentSnippet: `# Configurações do Supabase Backend (Próxias ao Browser no Next.js)
NEXT_PUBLIC_SUPABASE_URL=https://sua-instancia.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Configurações do Provedor de IA (Server Side Route Handler)
GEMINI_API_KEY=sua-chave-secreta-do-google-gemini
NEXT_PUBLIC_AURORA_AI_ENDPOINT=/api/aurora

# Modos de Execução
NEXT_PUBLIC_ENABLE_OFFLINE_MOCK=false
NEXT_PUBLIC_LOG_LEVEL=debug`
  },
  {
    filePath: '.github/workflows/ci.yml',
    description: 'Pipeline automatizado de integração contínua do GitHub Actions para Next.js 15.',
    contentSnippet: `name: EducaFlow Next.js 15 CI Pipeline

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main, develop ]

jobs:
  verify:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'
      
      - name: Install Dependencies
        run: npm ci

      - name: Next.js Type Check & Build
        run: npm run build

      - name: Run Vitest Unit Tests
        run: npm run test`
  }
];

export const SPRINT_0_CHECKLIST = [
  { item: 'Repositório Git inicializado com estrutura Next.js 15 App Router (/src/app)', status: 'Concluído' },
  { item: 'Next.js 15 + React 19 + TypeScript strict compilando sem avisos', status: 'Concluído' },
  { item: 'Tailwind CSS integrado ao layout global (src/app/globals.css)', status: 'Concluído' },
  { item: 'Instância do Dexie.js configurada com "use client" para 7 tabelas locais', status: 'Concluído' },
  { item: 'Stores Zustand (useAttendanceStore, useSyncStore, useAuthStore) operantes', status: 'Concluído' },
  { item: 'Cliente Supabase SSR/Client configurado com .env.example e RLS ativo', status: 'Concluído' },
  { item: 'Plugin @ducanh2912/next-pwa e Service Worker Workbox configurados para offline', status: 'Concluído' },
  { item: 'Route Handler Server-Side (/app/api/aurora) e Edge Function Gemini operantes', status: 'Concluído' },
  { item: 'Pipeline GitHub Actions CI executando lint, next build e testes unitários', status: 'Concluído' },
  { item: 'Ambiente no VS Code 100% calibrado para início imediato do Sprint 1', status: 'Concluído' }
];

export const SPRINT_0_READINESS_CERTIFICATE = {
  title: 'Certificado de Prontidão do Sprint 0 & Autorização do Repositório (Next.js 15)',
  certificateNumber: 'EDUCAFLOW-CERT-SPRINT0-NEXTJS15-2026-OK',
  issueDate: '28 de Julho de 2026',
  signatories: [
    { role: 'Chief Technology Officer (CTO)', name: 'Eng. Chefe de Plataforma', status: 'Aprovado & Assinado' },
    { role: 'Principal Software Architect', name: 'Arquitetura de Sistemas', status: 'Aprovado & Assinado' },
    { role: 'Tech Lead', name: 'Liderança Técnica de Engenharia', status: 'Aprovado & Assinado' },
    { role: 'DevOps Lead', name: 'Infraestrutura & CI/CD', status: 'Aprovado & Assinado' },
    { role: 'Product Owner', name: 'Gestão de Produto EducaFlow', status: 'Aprovado & Assinado' }
  ],
  declarationText: `Atestamos expressa e formalmente que o repositório do EducaFlow foi inicializado com sucesso no Next.js 15 App Router, atendendo a 100% dos critérios de Definition of Done do Sprint 0. A estrutura de código, dependências, banco local Dexie.js, cliente Supabase SSR, PWA offline e pipeline CI/CD estão validados. O projeto está OFICIALMENTE PRONTO para a execução das tarefas de código do Sprint 1 no Visual Studio Code.`
};
