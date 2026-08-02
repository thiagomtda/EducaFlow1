export interface ConstitutionSection {
  id: string;
  number: number;
  title: string;
  category: 'core' | 'architecture' | 'code_standards' | 'devops_quality' | 'ai_security';
  iconName: string;
  summary: string;
  rules: {
    ruleTitle: string;
    description: string;
    codeExample?: string;
    badExample?: string;
  }[];
}

export const ENGINEERING_PHILOSOPHIES = [
  {
    title: '1. Código Simples Vence Código Inteligente',
    desc: 'Prefira soluções diretas, legíveis e previsíveis. Evite meta-programação e abstrações prematuras.'
  },
  {
    title: '2. Clareza Acima de Complexidade',
    desc: 'O código deve ser autoexplicativo. Nomes de variáveis e funções devem revelar intenção sem requerer decifração.'
  },
  {
    title: '3. Performance Sem Sacrificar Legibilidade',
    desc: 'Otimize onde importa (ex: chamadas < 16ms), mas mantenha o código limpo e sustentável.'
  },
  {
    title: '4. Offline-First É Inegociável',
    desc: 'A sala de aula é um ambiente de alta instabilidade de rede. O professor nunca pode perder um dado digitado.'
  },
  {
    title: '5. Todo Código Deve Ser Testável',
    desc: 'Separe lógica pura da UI. Escreva funções puras e isoladas testáveis via Vitest/Jest.'
  },
  {
    title: '6. Nenhuma Feature Sem Valor Real para o Professor',
    desc: 'Recuse complexidade que não reduza a carga cognitiva ou o tempo gasto no diário de classe.'
  },
  {
    title: '7. A IA Auxilia, a Revisão Humana Valida',
    desc: 'Toda sugestão de IA (tanto em desenvolvimento quanto na Aurora AI) exige aprovação do especialista.'
  }
];

export const CONSTITUTION_SECTIONS: ConstitutionSection[] = [
  {
    id: 'sec_1_philosophy',
    number: 1,
    title: 'Filosofia Oficial de Engenharia',
    category: 'core',
    iconName: 'Compass',
    summary: 'Os 7 princípios invioláveis que regem a mentalidade e decisão técnica no EducaFlow.',
    rules: [
      {
        ruleTitle: 'Simplicidade Radical',
        description: 'Qualquer engenheiro ou agente de IA deve resolver problemas usando o padrão mais direto possível. Nivelamento por clareza.',
        codeExample: '// BOM: Direto e legível\nexport function calculateAttendancePercentage(present: number, total: number): number {\n  if (total === 0) return 100;\n  return Math.round((present / total) * 100);\n}',
        badExample: '// RUIM: Abstração genérica desnecessária\nexport const calc = <T extends number>(p: T, t: T) => t === 0 ? 100 : (p / t) * 100;'
      },
      {
        ruleTitle: 'Resiliência e Continuidade Operacional',
        description: 'O software deve continuar funcionando mesmo em colapso total de rede ou servidores remotos.',
      }
    ]
  },
  {
    id: 'sec_2_architecture',
    number: 2,
    title: 'Arquitetura Oficial Congelada do Projeto',
    category: 'architecture',
    iconName: 'Layers',
    summary: 'Definição oficial e imutável das tecnologias e papéis de cada camada do ecossistema.',
    rules: [
      {
        ruleTitle: 'Pilha Tecnológica Homologada',
        description: 'Frontend: Next.js 15+ App Router, React 19 & TypeScript Strict. UI: Tailwind CSS v3/v4 & Lucide Icons. Cache/Offline: Dexie.js (IndexedDB Client-Only) + Workbox PWA (@ducanh2912/next-pwa). Estado: Zustand & TanStack Query. Backend: Supabase (PostgreSQL 15+, GoTrue Auth & Realtime). Serverless: Supabase Edge Functions em Deno & Next.js Server Actions / Route Handlers. IA: Google Gemini 2.5 Flash via Edge Function.',
      },
      {
        ruleTitle: 'Isolamento de Credenciais de IA',
        description: 'É estritamente proibido chamar SDKs de IA diretamente no browser com chaves secretas. Todas as chamadas de IA passam pela Edge Function `/aurora-generate`.',
      }
    ]
  },
  {
    id: 'sec_3_folder_structure',
    number: 3,
    title: 'Estrutura Oficial de Pastas do Repositório',
    category: 'architecture',
    iconName: 'FolderTree',
    summary: 'Mapeamento hierárquico estrito de diretórios e a responsabilidade de cada módulo no VS Code.',
    rules: [
      {
        ruleTitle: 'Mapeamento da Árvore /src',
        description: '`src/app` (Roteamento e Layout Root), `src/components/ui` (Atômicos WCAG), `src/components/cockpit` (Dashboard), `src/components/diario` (Chamada e Conteúdo), `src/components/planos` (BNCC e IA), `src/stores` (Zustand Stores), `src/services` (Dexie, Supabase, Sync Engine), `src/types` (Interfaces globais), `supabase/functions` (Edge Functions), `supabase/migrations` (PostgreSQL DDL).',
      }
    ]
  },
  {
    id: 'sec_4_naming_conventions',
    number: 4,
    title: 'Convenções de Código & Nomenclatura',
    category: 'code_standards',
    iconName: 'Type',
    summary: 'Nomenclatura padronizada para componentes, hooks, tabelas, migrations e arquivos.',
    rules: [
      {
        ruleTitle: 'Regras de Caso por Categoria',
        description: 'PascalCase: Componentes React, Interfaces, Enums e Types (ex: `StudentAttendanceCard.tsx`, `LessonPlan`).\ncamelCase: Variáveis, funções, hooks customizados e atributos (ex: `useAttendanceStore`, `calculateAbsences`).\nkebab-case: Nomes de arquivos utilitários, rotas e Edge Functions (ex: `sync-engine.ts`, `aurora-generate`).\nSCREAMING_SNAKE_CASE: Constantes globais e variáveis de ambiente (ex: `MAX_ABSENCE_LIMIT`, `SUPABASE_URL`).\nsnake_case: Tabelas, colunas do PostgreSQL e colunas do Dexie (ex: `lesson_journals`, `student_id`).',
      }
    ]
  },
  {
    id: 'sec_5_react_patterns',
    number: 5,
    title: 'Padrões React 18+ & Gerenciamento de Estado',
    category: 'code_standards',
    iconName: 'Code',
    summary: 'Práticas obrigatórias para componentes, memoização, custom hooks e stores Zustand.',
    rules: [
      {
        ruleTitle: 'Desativação de Prop Drilling com Zustand',
        description: 'Evite passar props mais do que 2 níveis abaixo. Utilize Zustand stores bem delimitados por domínio (useAttendanceStore, useSyncStore, useAuthStore).',
      },
      {
        ruleTitle: 'Error Boundaries & Suspense',
        description: 'Cada módulo primário deve ser envolvido por um Error Boundary customizado que apresenta fallback gracioso sem quebrar a aplicação inteira.',
      }
    ]
  },
  {
    id: 'sec_6_typescript_standards',
    number: 6,
    title: 'Padrões TypeScript & Estricta Tipagem',
    category: 'code_standards',
    iconName: 'FileCheck',
    summary: 'Uso de strict mode, eliminação total do tipo `any` e validações com Zod.',
    rules: [
      {
        ruleTitle: 'Proibição Absoluta do Tipo `any`',
        description: 'O uso de `any` causa reprovação imediata no PR. Utilize `unknown`, generics ou union types com type guards explicitados.',
        codeExample: '// BOM: Safe type guard\nfunction parsePayload(data: unknown): StudentRecord {\n  const result = StudentSchema.safeParse(data);\n  if (!result.success) throw new Error("Invalid payload");\n  return result.data;\n}',
        badExample: '// RUIM: Perda de segurança\nfunction process(data: any) {\n  return data.student.id;\n}'
      }
    ]
  },
  {
    id: 'sec_7_backend_standards',
    number: 7,
    title: 'Padrões Backend & Edge Functions (Deno)',
    category: 'architecture',
    iconName: 'Server',
    summary: 'Estruturação de APIs Serverless, tratamento de erros, timeouts e middlewares de autenticação.',
    rules: [
      {
        ruleTitle: 'Padrão das Edge Functions Deno',
        description: 'Todas as Edge Functions devem validar o cabeçalho Authorization JWT, definir timeout máximo de 10s e retornar estrutura JSON padronizada `{ success: boolean, data?: T, error?: string }`.',
      }
    ]
  },
  {
    id: 'sec_8_database_standards',
    number: 8,
    title: 'Banco de Dados, Migrations & RLS (PostgreSQL)',
    category: 'architecture',
    iconName: 'Database',
    summary: 'Modelagem relacional, versionamento com migrations, índices e segurança Row Level Security.',
    rules: [
      {
        ruleTitle: 'Segurança RLS Inviolável',
        description: 'Toda tabela no Supabase DEVE ter Row Level Security ativado com políticas restritivas por `auth.uid() = professor_id`.',
      },
      {
        ruleTitle: 'Soft Delete e Triggers de Auditoria',
        description: 'Registros de presença e diário nunca são deletados fisicamente (`DELETE`). Utilizam `deleted_at IS NOT NULL` e audit log append-only.',
      }
    ]
  },
  {
    id: 'sec_9_aurora_ai_conventions',
    number: 9,
    title: 'Convenções da IA Aurora (Gemini 2.5 Flash)',
    category: 'ai_security',
    iconName: 'Bot',
    summary: 'Engenharia de prompts, validação de JSON de resposta, histórico e cache com resiliência.',
    rules: [
      {
        ruleTitle: 'Estrutura de Prompt com System Instruction Estrito',
        description: 'Os prompts da Aurora exigem instrução de sistema que proíbe alucinação e força resposta em Schema JSON estrito.',
      },
      {
        ruleTitle: 'Princípio do Acompanhamento Humano (Human-in-the-Loop)',
        description: 'A IA apenas sugere rascunhos. Nenhuma nota, falta ou plano é oficial sem que o professor confirme manualmente.',
      }
    ]
  },
  {
    id: 'sec_10_logging_observability',
    number: 10,
    title: 'Logging, Observabilidade & Telemetria',
    category: 'devops_quality',
    iconName: 'Activity',
    summary: 'Níveis de log, rastreamento de sincronização offline e alertas de erros em produção.',
    rules: [
      {
        ruleTitle: 'Estrutura do Logger Unificado',
        description: 'Logs client-side usam utilitário `logger.ts` com níveis [DEBUG, INFO, WARN, ERROR]. Em produção, apenas WARN e ERROR são persistidos na tabela de audit.',
      }
    ]
  },
  {
    id: 'sec_11_git_strategy',
    number: 11,
    title: 'Estratégia Git, Commits & Branching',
    category: 'devops_quality',
    iconName: 'GitBranch',
    summary: 'Trabalho em branches, Conventional Commits e fluxo de Pull Requests.',
    rules: [
      {
        ruleTitle: 'Padrão Conventional Commits',
        description: 'Formato: `feat(diario): adiciona suporte a ditado por voz`, `fix(sync): corrige retentativa de fila quando offline`, `docs(engineering): atualiza constituição`.',
      }
    ]
  },
  {
    id: 'sec_12_cicd_pipeline',
    number: 12,
    title: 'Pipeline CI/CD & Deploy Automatizado',
    category: 'devops_quality',
    iconName: 'Terminal',
    summary: 'Estágios automatizados de verificação, testes, build, deploy preview e rollback.',
    rules: [
      {
        ruleTitle: 'Os 5 Estágios Obrigatórios do Pipeline',
        description: '1. Lint & Formatting -> 2. Type Check (tsc) -> 3. Testes Unitários & Sincronização -> 4. Build PWA -> 5. Verification.',
      }
    ]
  },
  {
    id: 'sec_13_mandatory_quality',
    number: 13,
    title: 'Qualidade Obrigatória: DoR & DoD',
    category: 'devops_quality',
    iconName: 'CheckSquare',
    summary: 'Critérios rígidos de Definition of Ready (DoR) e Definition of Done (DoD) para qualquer PR.',
    rules: [
      {
        ruleTitle: 'Checklist Inviolável de Definition of Done (DoD)',
        description: 'Código compilando sem alertas -> Zero erros de TypeScript -> Testes unitários passando -> WCAG 2.2 AA validado -> Testado em modo offline com DevTools.',
      }
    ]
  },
  {
    id: 'sec_14_security_lgpd',
    number: 14,
    title: 'Segurança, OWASP & Conformidade LGPD',
    category: 'ai_security',
    iconName: 'ShieldCheck',
    summary: 'Proteção de dados de alunos (PII), sanitização contra Injeção de SQL/Prompt e RLS.',
    rules: [
      {
        ruleTitle: 'Tratamento de PII (Dados Pessoais Sensíveis)',
        description: 'Nomes e documentos de alunos do Ensino Fundamental I são encriptados e armazenados estritamente sob as diretrizes da LGPD.',
      }
    ]
  },
  {
    id: 'sec_15_performance_goals',
    number: 15,
    title: 'Metas Obrigatórias de Performance & Core Web Vitals',
    category: 'devops_quality',
    iconName: 'Zap',
    summary: 'Métricas de LCP < 1.2s, INP < 50ms, CLS = 0 e tempo de resposta de chamada < 16ms.',
    rules: [
      {
        ruleTitle: 'Orcamento de Desempenho (Performance Budget)',
        description: 'Bundle inicial JS < 180KB (gzipped). Imagens e fontes carregadas via cache offline PWA.',
      }
    ]
  },
  {
    id: 'sec_16_accessibility_wcag',
    number: 16,
    title: 'Acessibilidade WCAG 2.2 AA & Usabilidade Inclusiva',
    category: 'code_standards',
    iconName: 'Eye',
    summary: 'Navegação por teclado completa, leitores de tela, alto contraste e animações reduzidas.',
    rules: [
      {
        ruleTitle: 'Foco Visível e Atributos ARIA',
        description: 'Todo elemento interativo possui anel de foco de no mínimo 2px com alto contraste e aria-labels descritivos em português.',
      }
    ]
  },
  {
    id: 'sec_17_documentation_standards',
    number: 17,
    title: 'Padrões de Documentação por Módulo',
    category: 'core',
    iconName: 'FileText',
    summary: 'Documentos técnicos obrigatórios para cada novo módulo criado na codebase.',
    rules: [
      {
        ruleTitle: 'Documentação no Próprio Código',
        description: 'Todo serviço complexo e store deve conter cabeçalho JSDoc detalhando parâmetros e comportamento offline.',
      }
    ]
  },
  {
    id: 'sec_18_ai_code_gen_rules',
    number: 18,
    title: 'Regras Invioláveis para Geração de Código com IA',
    category: 'ai_security',
    iconName: 'Cpu',
    summary: 'Instruções para que assistentes de IA (Copilot, Gemini, Claude) gerem apenas código de produção válido.',
    rules: [
      {
        ruleTitle: 'Proibição de Pseudocódigo e Trechos Omitidos',
        description: 'IAs que geram código para o EducaFlow NUNCA devem usar `// ... resto do código ...` ou trechos truncados. O código deve ser completo e compilável.',
      },
      {
        ruleTitle: 'Proibição de TODOs Abandonados',
        description: 'Qualquer implementação deve ser funcional ou levantar erro descritivo de funcionalidade pendente.',
      }
    ]
  },
  {
    id: 'sec_19_forbidden_antipatterns',
    number: 19,
    title: 'Lista Oficial de Anti-Patterns Proibidos',
    category: 'core',
    iconName: 'AlertTriangle',
    summary: 'Práticas banidas da engenharia do EducaFlow para prevenir acoplamento e bugs.',
    rules: [
      {
        ruleTitle: 'God Components',
        description: 'Componentes com mais de 250 linhas de código são proibidos. Devem ser refatorados em sub-componentes atômicos e custom hooks.',
      },
      {
        ruleTitle: 'Lógica de Negócio em Componentes JSX',
        description: 'Cálculos de faltas, regras da BNCC e sincronização devem residir exclusivamente nos stores ou domain services.',
      }
    ]
  },
  {
    id: 'sec_20_manifesto_homologation',
    number: 20,
    title: 'Manifesto Final & Termo de Homologação da Engenharia',
    category: 'core',
    iconName: 'Award',
    summary: 'Declaração formal da liderança de engenharia congelando a constituição técnica.',
    rules: [
      {
        ruleTitle: 'Compromisso de Excelência',
        description: 'Esta constituição é o instrumento norteador máximo. Nenhuma alteração de arquitetura pode ser feita sem aprovação unânime do conselho de engenharia.',
      }
    ]
  }
];

export const HOMOLOGATION_SIGNATORIES = [
  { role: 'Principal Software Architect', status: 'Aprovado & Assinado' },
  { role: 'Staff Frontend Engineer', status: 'Aprovado & Assinado' },
  { role: 'Staff Backend Engineer', status: 'Aprovado & Assinado' },
  { role: 'Principal AI Engineer', status: 'Aprovado & Assinado' },
  { role: 'DevOps Architect', status: 'Aprovado & Assinado' },
  { role: 'Engineering Manager', status: 'Aprovado & Assinado' },
  { role: 'QA Director', status: 'Aprovado & Assinado' },
  { role: 'CTO', status: 'Aprovado & Assinado' }
];
