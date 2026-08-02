import {
  FolderStructureNode,
  ModuleTechnicalJourney,
  LayerResponsibilitySpec,
  VsCodeExecutionTask
} from '../types';

// === 1. DEFINITIVE FOLDER & FILE STRUCTURE ===

export const PROJECT_FOLDER_STRUCTURE: FolderStructureNode[] = [
  // Config & Root
  {
    path: '/package.json',
    type: 'file',
    description: 'Manifesto do projeto Node.js com scripts de build Next.js 15, dev, test e dependências (Next.js, React 19, Tailwind, Dexie, Supabase, Zustand).',
    responsibility: 'Gerenciamento de dependências e automação de comandos Next.js.',
    layer: 'Config'
  },
  {
    path: '/tsconfig.json',
    type: 'file',
    description: 'Configuração do TypeScript com aliases de caminho (@/* -> src/* ou ./*).',
    responsibility: 'Garantir checagem estrita de tipos no build Next.js e no editor VS Code.',
    layer: 'Config'
  },
  {
    path: '/next.config.ts',
    type: 'file',
    description: 'Configuração do framework Next.js 15 App Router, integração PWA (Workbox) e otimização de imagens.',
    responsibility: 'Otimização de rotas, SSR, SSG, Headers de Segurança e PWA.',
    layer: 'Config'
  },
  {
    path: '/tailwind.config.js',
    type: 'file',
    description: 'Definição das escalas de cores, tipografia (Plus Jakarta Sans, Inter), bordas e sombras do Design System.',
    responsibility: 'Estilização utilitária padronizada.',
    layer: 'Config'
  },

  // Src / App Router Core
  {
    path: '/src/app/layout.tsx',
    type: 'file',
    description: 'Root Layout do Next.js 15 App Router com Fontes Globais, Providers de Estado (Zustand/Query) e Service Worker.',
    responsibility: 'Estrutura HTML global, Metadados PWA e inicialização do cliente.',
    layer: 'Presentation'
  },
  {
    path: '/src/app/page.tsx',
    type: 'file',
    description: 'Página inicial / Cockpit principal do professor (Server/Client Component híbrido).',
    responsibility: 'Orquestração de visão executiva e componentes do Dashboard.',
    layer: 'Presentation'
  },
  {
    path: '/src/app/chamada/page.tsx',
    type: 'file',
    description: 'Rota do módulo de Chamada Ultrarrápida tátil em sala de aula.',
    responsibility: 'Renderização do componente de presença em tempo real.',
    layer: 'Presentation'
  },
  {
    path: '/src/app/planos/page.tsx',
    type: 'file',
    description: 'Rota do Gerador e Editor de Planos de Aula alinhados à BNCC com Aurora AI.',
    responsibility: 'Wizard do planejamento pedagógico e integração de IA.',
    layer: 'Presentation'
  },
  {
    path: '/src/app/api/aurora/route.ts',
    type: 'file',
    description: 'Route Handler Server-Side do Next.js proxy para a Edge Function ou chamada direta do Gemini 2.5 Flash.',
    responsibility: 'Proxy seguro de chamadas de IA sem expor chaves no browser.',
    layer: 'Infrastructure / Data'
  },
  {
    path: '/src/types.ts',
    type: 'file',
    description: 'Contratos e interfaces TypeScript globais (Entidades, DTOs, Enums BNCC, D do DDD).',
    responsibility: 'Fonte única da verdade de tipos para toda a aplicação.',
    layer: 'Application / Domain'
  },

  // Components Layer
  {
    path: '/src/components/ui',
    type: 'dir',
    description: 'Componentes atômicos do Design System (Button, Card, Input, Badge, Toast, Modal, Skeleton).',
    responsibility: 'UI Atômica e acessível com suporte a estados WCAG 2.2 AA.',
    layer: 'Presentation'
  },
  {
    path: '/src/components/cockpit',
    type: 'dir',
    description: 'Cards do Dashboard Cockpit (Próxima Aula, Atalho Chamada, Painel PDI, Avisos).',
    responsibility: 'Visão executiva diária do professor.',
    layer: 'Presentation'
  },
  {
    path: '/src/components/diario',
    type: 'dir',
    description: 'Módulos táticos de chamada rápida (CMP-04) e registro de conteúdo ministrado (CMP-08).',
    responsibility: 'Interface de alta velocidade para uso em sala de aula.',
    layer: 'Presentation'
  },
  {
    path: '/src/components/planos',
    type: 'dir',
    description: 'Wizard do Planejador BNCC (Step 1, Step 2, Step 3) e modal de seleção de habilidades.',
    responsibility: 'Criação e edição de planos pedagógicos.',
    layer: 'Presentation'
  },
  {
    path: '/src/components/aurora',
    type: 'dir',
    description: 'Caixa de sugestão inteligente (CMP-05) e chat assistente pedagógico.',
    responsibility: 'Interface de interação não intrusiva com a IA Aurora.',
    layer: 'Presentation'
  },

  // Application & State Layer
  {
    path: '/src/stores/useAttendanceStore.ts',
    type: 'file',
    description: 'Store Zustand para estado reativo da chamada com atualização otimista instantânea.',
    responsibility: 'Gestão de estado client-side de presença em tempo real.',
    layer: 'Application / Domain'
  },
  {
    path: '/src/stores/useSyncStore.ts',
    type: 'file',
    description: 'Store Zustand para status da fila offline (contagem de pendências, status da rede).',
    responsibility: 'Monitoramento de conectividade e fila do Dexie.',
    layer: 'Application / Domain'
  },
  {
    path: '/src/stores/useAuthStore.ts',
    type: 'file',
    description: 'Store Zustand para sessão do professor e perfil autenticado.',
    responsibility: 'Gestão de credenciais e permissões.',
    layer: 'Application / Domain'
  },

  // Infrastructure & Persistence Layer
  {
    path: '/src/db/dexieDb.ts',
    type: 'file',
    description: 'Instância do Dexie.js (IndexedDB) configurada com as tabelas locais (turmas, alunos, chamadas, diarios, planos, sync_queue).',
    responsibility: 'Persistência local offline-first robusta no navegador.',
    layer: 'Infrastructure / Data'
  },
  {
    path: '/src/services/syncEngine.ts',
    type: 'file',
    description: 'Motor de sincronização bidirecional que esvazia a `sync_queue` do Dexie enviando para o Supabase.',
    responsibility: 'Sincronização em segundo plano, resolução de conflitos (Last-Write-Wins) e retry.',
    layer: 'Infrastructure / Data'
  },
  {
    path: '/src/services/supabaseClient.ts',
    type: 'file',
    description: 'Cliente singleton do Supabase com suporte a sessões persistentes e escuta de Canais Realtime.',
    responsibility: 'Comunicação remota com PostgreSQL e Auth.',
    layer: 'Infrastructure / Data'
  },
  {
    path: '/src/services/auroraAiService.ts',
    type: 'file',
    description: 'Cliente da IA Aurora que chama a Edge Function `/aurora-generate` com fallback local.',
    responsibility: 'Integração com LLM (Gemini 2.5 Flash) para sugestões pedagógicas.',
    layer: 'Infrastructure / Data'
  },

  // Supabase & Edge Functions
  {
    path: '/supabase/migrations/20260728_initial_schema.sql',
    type: 'file',
    description: 'DDL de criação das tabelas no PostgreSQL com diretivas de RLS (Row Level Security) e Triggers de Auditoria.',
    responsibility: 'Esquema de banco de dados remoto e segurança.',
    layer: 'Edge Functions / Supabase'
  },
  {
    path: '/supabase/functions/aurora-generate/index.ts',
    type: 'file',
    description: 'Edge Function Deno que recebe o prompt do professor, consulta a API Gemini com chave oculta e retorna a sugestão.',
    responsibility: 'Execução de IA server-side com proteção de API Key.',
    layer: 'Edge Functions / Supabase'
  }
];

// === 2. LAYER RESPONSIBILITIES & CODE CONVENTIONS ===

export const LAYER_RESPONSIBILITIES: LayerResponsibilitySpec[] = [
  {
    layerName: '1. Presentation Layer (Next.js 15 App Router + React 19 + Tailwind)',
    technologyStack: 'Next.js 15+, React 19, Tailwind CSS v3/v4, Lucide Icons, Motion/Framer',
    coreResponsibilities: [
      'Renderizar a UI tátil responsiva conforme as 10 telas mestre do MVP.',
      'Garantir latência de resposta visual < 16ms (Optimistic UI).',
      'Fornecer feedback auditivo e tátil (vibração PWA) para interações de chamada.',
      'Respeitar critérios de acessibilidade WCAG 2.2 AA (foco visível, aria-labels).'
    ],
    namingConventions: 'PascalCase para componentes (.tsx), camelCase para hooks customizados (use*.ts).',
    codeExamplePattern: `export const StudentAttendanceCard: React.FC<Props> = ({ student, onStatusChange }) => { ... }`
  },
  {
    layerName: '2. Application / Domain Layer (Zustand + Services)',
    technologyStack: 'Zustand, TypeScript Interfaces, Regras de Negócio Puramente Tipadas',
    coreResponsibilities: [
      'Encapsular regras de negócio (ex: cálculo de frequência, limites de falta, alinhamento BNCC).',
      'Gerenciar o estado global da aplicação na memória RAM.',
      'Disparar mutações otimistas nos stores e chamar o serviço de persistência local.',
      'Lidar com comandos de voz (Web Speech API) e transformação de áudio em texto.'
    ],
    namingConventions: 'Stores com sufixo Store (ex: useAttendanceStore.ts), regras em pasta /domain.',
    codeExamplePattern: `const markPresence = (studentId, status) => { setOptimisticStatus(studentId, status); dexieDb.saveStatus(...); }`
  },
  {
    layerName: '3. Infrastructure & Persistence Layer (Dexie.js + Sync Engine)',
    technologyStack: 'Dexie.js (IndexedDBWrapper), Service Worker (PWA), Supabase Client',
    coreResponsibilities: [
      'Garantir leitura e escrita ultrarrápidas (< 5ms) no IndexedDB local.',
      'Manter a tabela sync_queue com operações pendentes [INSERT, UPDATE, DELETE].',
      'Executar polling inteligente e escutar evento window.ononline para esvaziar a fila.',
      'Tratar erros de conflito utilizando carimbo de data/hora (updated_at) com prioridade local.'
    ],
    namingConventions: 'Sufixo Db para Dexie (dexieDb.ts), SyncEngine para sincronizador.',
    codeExamplePattern: `await dexieDb.syncQueue.add({ table: 'attendance', action: 'INSERT', payload, createdAt: new Date() });`
  },
  {
    layerName: '4. Supabase & Edge Functions Layer (Backend / PostgreSQL)',
    technologyStack: 'PostgreSQL 15+, Supabase RLS, Edge Functions (Deno/TypeScript), Gemini API',
    coreResponsibilities: [
      'Autenticação de professores via Supabase Auth e emissão de JWT.',
      'Aplicação de políticas RLS para garantir que professores só acessem suas próprias turmas.',
      'Processamento de inteligência pedagógica via Edge Functions ocultando a chave Gemini_API_KEY.',
      'Logs de auditoria e auditoria append-only para alterações retroativas.'
    ],
    namingConventions: 'Arquivos .sql para migrações, camelCase em Deno/TypeScript para Edge Functions.',
    codeExamplePattern: `CREATE POLICY "Professores acessam apenas suas turmas" ON diarios FOR ALL USING (auth.uid() = professor_id);`
  }
];

// === 3. TECHNICAL JOURNEYS FOR MVP MODULES ===

export const MODULE_TECHNICAL_JOURNEYS: ModuleTechnicalJourney[] = [
  // Module 1: Auth & Sync Initial
  {
    moduleId: 'JOURNEY-01',
    moduleName: 'Autenticação & Carga do Cache Local (Dexie.js)',
    primaryGoal: 'Autenticar o professor no Supabase, baixar turmas/alunos e popular o Dexie.js para operação 100% offline.',
    steps: [
      {
        stepNumber: 1,
        stageName: 'Digitacao de Credenciais no Login (Screen 01)',
        frontendAction: 'Professor digita e-mail institucional e senha no formulário e clica em "Entrar no Cockpit".',
        stateManagement: 'useAuthStore altera estado para isLoading: true e limpa mensagens de erro anteriores.',
        offlineStorageDexie: 'Verifica se existem credenciais em cache no IndexedDB para fallback offline.',
        syncAndEdgeFunction: 'N/A nesta etapa inicial.',
        supabaseDbAndRls: 'N/A.',
        auroraAiAndRealtime: 'Aurora aguarda autenticação silenciosa.',
        auditAndErrorHandling: 'Validação de formato de e-mail client-side antes do envio.'
      },
      {
        stepNumber: 2,
        stageName: 'Handshake com Supabase Auth',
        frontendAction: 'Mostra spinner no botão e desabilita re-envio.',
        stateManagement: 'Dispara chamada supabase.auth.signInWithPassword().',
        offlineStorageDexie: 'Em caso de erro de rede, tenta validar token JWT armazenado em localforage/Dexie.',
        syncAndEdgeFunction: 'Autenticação gerenciada pelos serviços GoTrue do Supabase.',
        supabaseDbAndRls: 'Retorna JWT assinado contendo o `user_id` e role `teacher`.',
        auroraAiAndRealtime: 'N/A.',
        auditAndErrorHandling: 'Retorna erro legível "E-mail ou senha inválidos" se 401.'
      },
      {
        stepNumber: 3,
        stageName: 'Hydration do IndexedDB (Offline-First Download)',
        frontendAction: 'Transição para o Cockpit (Screen 02) exibindo barra de progresso "Sincronizando dados iniciais..."',
        stateManagement: 'useAuthStore armazena perfil do professor. useSyncStore inicia sincronização inicial.',
        offlineStorageDexie: 'Escreve turmas, alunos e planos nas tabelas Dexie.js (bulkPut).',
        syncAndEdgeFunction: 'Consulta tabelas `classes`, `students` e `lesson_plans` filtradas pelo `professor_id`.',
        supabaseDbAndRls: 'Políticas RLS garantem isolamento estrito de dados por escola/professor.',
        auroraAiAndRealtime: 'Aurora carrega sugestões iniciais com base na disciplina no Cockpit.',
        auditAndErrorHandling: 'Gera registro no log audit do Supabase sobre novo login efetuado.'
      }
    ]
  },

  // Module 2: Fast Attendance
  {
    moduleId: 'JOURNEY-02',
    moduleName: 'Chamada Ultrarrápida Tátil & Fila Offline (Screen 03)',
    primaryGoal: 'Marcar presença/falta de 30 alunos em menos de 30s com gravação local instantânea e sincronização assíncrona.',
    steps: [
      {
        stepNumber: 1,
        stageName: 'Toque nos Botões P / F / FJ (Student Card CMP-04)',
        frontendAction: 'Professor toca na letra "P" de um aluno ou clica em "Marcar Todos como Presentes".',
        stateManagement: 'useAttendanceStore atualiza o mapa de presenças em memória imediatamente (< 1ms).',
        offlineStorageDexie: 'Executa upsert local na tabela `dexieDb.attendance` com `syncStatus: "pending"`.',
        syncAndEdgeFunction: 'Adiciona registro de mutação na tabela `dexieDb.syncQueue`.',
        supabaseDbAndRls: 'Ainda não é chamado (não bloqueia a UI).',
        auroraAiAndRealtime: 'Se o aluno tiver 3+ faltas seguidas, Aurora gera badge discreto.',
        auditAndErrorHandling: 'Feedback háptico (vibrate 10ms em PWA móvel) e troca de cor do botão.'
      },
      {
        stepNumber: 2,
        stageName: 'Clique em "Salvar Chamada"',
        frontendAction: 'Professor clica no botão "Salvar Chamada (30/30)".',
        stateManagement: 'Fecha a tela de chamada e redireciona ao Cockpit com toast verde.',
        offlineStorageDexie: 'Marca a chamada do dia como concluída no IndexedDB.',
        syncAndEdgeFunction: 'Dispara o motor `syncEngine.processQueue()`.',
        supabaseDbAndRls: 'Se houver internet, envia payload em lote (`upsert`) para a tabela `attendances`.',
        auroraAiAndRealtime: 'Notifica canal Supabase Realtime para que o painel da coordenação atualize a frequência.',
        auditAndErrorHandling: 'Se offline, permanece na fila local. Badge do header mostra "1 item pendente".'
      }
    ]
  },

  // Module 3: BNCC Planner & Aurora AI
  {
    moduleId: 'JOURNEY-03',
    moduleName: 'Geração de Plano BNCC com IA Aurora (Screen 05)',
    primaryGoal: 'Selecionar habilidades da BNCC e solicitar à IA Aurora a geração de plano com adaptações para PDI.',
    steps: [
      {
        stepNumber: 1,
        stageName: 'Seleção de Habilidades & Tema',
        frontendAction: 'Professor seleciona a disciplina "Matemática", digita o tema "Frações" e escolhe a habilidade `EF03MA05`.',
        stateManagement: 'Store do planejador armazena o estado do formulário e códigos selecionados.',
        offlineStorageDexie: 'Lê do banco local o catálogo da BNCC previamente armazenado.',
        syncAndEdgeFunction: 'N/A.',
        supabaseDbAndRls: 'N/A.',
        auroraAiAndRealtime: 'N/A.',
        auditAndErrorHandling: 'Garante que pelo menos 1 habilidade seja selecionada antes de habilitar a IA.'
      },
      {
        stepNumber: 2,
        stageName: 'Solicitação à IA Aurora via Edge Function',
        frontendAction: 'Professor clica em "Gerar Plano com Aurora". Animação com gradiente roxo e indicador de processamento.',
        stateManagement: 'Estado `isGeneratingPlan: true` ativa skeleton do plano.',
        offlineStorageDexie: 'Se offline, utiliza gerador de modelo local pré-configurado com templates BNCC.',
        syncAndEdgeFunction: 'Chama Edge Function `supabase.functions.invoke("aurora-generate", { body: { prompt, bnccCodes, pdiIncluded } })`.',
        supabaseDbAndRls: 'Edge Function usa a chave secreta `GEMINI_API_KEY` sem expô-la ao cliente.',
        auroraAiAndRealtime: 'Gemini 2.5 Flash retorna a estrutura do plano (Objetivos, Metodologia, Avaliação, PDI) em JSON formatado.',
        auditAndErrorHandling: 'Timeout de 10s dispara fallback automático para template local de segurança.'
      },
      {
        stepNumber: 3,
        stageName: 'Apresentação do Rascunho & Confirmação do Professor',
        frontendAction: 'Plano renderizado no editor com botões "Aceitar Sugestão", "Editar com Aurora" e "Salvar Plano".',
        stateManagement: 'Store atualiza o plano com os dados retornados e aguarda validação humana.',
        offlineStorageDexie: 'Ao clicar em "Salvar", grava o plano no Dexie.js e adiciona na fila de sincronização.',
        syncAndEdgeFunction: 'Sincroniza o novo plano na tabela `lesson_plans` do PostgreSQL.',
        supabaseDbAndRls: 'Tabela protegida por RLS. Registro de auditoria gravado.',
        auroraAiAndRealtime: 'Aurora parabeniza o professor e fecha a caixa de sugestão.',
        auditAndErrorHandling: 'Regra de Ouro da IA: Nada é oficial sem a confirmação e salvamento pelo professor.'
      }
    ]
  }
];

// === 4. TECHNICAL EXECUTION PLAN (VS CODE TASKS) ===

export const VSCODE_EXECUTION_PLAN: VsCodeExecutionTask[] = [
  {
    taskId: 'TASK-01',
    sprintPhase: 'Sprint 0: Infraestrutura Base & IndexedDB',
    taskTitle: 'Configurar o Banco de Dados Local Dexie.js (IndexedDB Schema)',
    targetFiles: ['/src/db/dexieDb.ts', '/src/types.ts'],
    implementationSteps: [
      '1. Criar a classe EducaFlowDexieDB estendendo Dexie.',
      '2. Definir tabelas: classes, students, attendance, lesson_journals, lesson_plans, pdi_records, sync_queue.',
      '3. Configurar índices de busca primários e compostos (ex: [classId+date]).',
      '4. Escrever testes unitários para verificação de CRUD no Dexie.js.'
    ],
    verificationCommand: 'npm run test:db',
    definitionOfDone: 'Tabelas criadas no IndexedDB do navegador com persistência de dados comprovada sem erros de schema.'
  },
  {
    taskId: 'TASK-02',
    sprintPhase: 'Sprint 1: Autenticação & Motor de Sincronização',
    taskTitle: 'Implementar o Motor de Sincronização Bidirecional (syncEngine.ts)',
    targetFiles: ['/src/services/syncEngine.ts', '/src/stores/useSyncStore.ts'],
    implementationSteps: [
      '1. Criar o gerenciador da fila de mutações sync_queue.',
      '2. Implementar função processQueue() que lê itens pendentes e faz chamadas ao Supabase.',
      '3. Adicionar listeners para window.addEventListener("online") e auto-retry com exponential backoff.',
      '4. Integrar com o Zustand useSyncStore para atualizar a contagem de pendências no Header.'
    ],
    verificationCommand: 'npm run test:sync',
    definitionOfDone: 'Mutações realizadas offline salvas na fila e sincronizadas com o Supabase assim que a rede reconecta.'
  },
  {
    taskId: 'TASK-03',
    sprintPhase: 'Sprint 2: Componentes Core & Cockpit Dashboard',
    taskTitle: 'Desenvolver o Cockpit do Professor (Screen 02 & Componentes CMP-01 a CMP-03)',
    targetFiles: ['/src/components/cockpit/CockpitView.tsx', '/src/components/ui/PrimaryButton.tsx', '/src/components/ui/FabButton.tsx'],
    implementationSteps: [
      '1. Montar o layout em 3 colunas responsivas do Cockpit.',
      '2. Integrar o card de Próxima Aula com o botão "Iniciar Chamada Rápida".',
      '3. Adicionar o FAB flutuante no celular com efeito scroll-collapse.',
      '4. Carregar os dados das aulas do dia direto do Dexie.js local.'
    ],
    verificationCommand: 'npm run test:ui',
    definitionOfDone: 'Cockpit carregando em menos de 100ms utilizando dados do Dexie com navegação para a chamada.'
  },
  {
    taskId: 'TASK-04',
    sprintPhase: 'Sprint 3: Módulo de Chamada Tátil Ultrarrápida',
    taskTitle: 'Construir a Chamada Ultrarrápida com Optimistic UI (Screen 03 & CMP-04)',
    targetFiles: ['/src/components/diario/FastAttendanceView.tsx', '/src/components/diario/StudentAttendanceCard.tsx', '/src/stores/useAttendanceStore.ts'],
    implementationSteps: [
      '1. Desenvolver o StudentAttendanceCard com botões P, F e FJ e feedback visual instantâneo.',
      '2. Implementar o botão "Marcar Todos como Presentes" com atualização otimista em massa.',
      '3. Adicionar atalhos de teclado (Teclas P, F e setas para cima/baixo).',
      '4. Persistir as marcas no Dexie.js e na sync_queue ao clicar em Salvar.'
    ],
    verificationCommand: 'npm run test:attendance',
    definitionOfDone: 'Chamada de 30 alunos executada em menos de 30 segundos com gravação local sem latência.'
  },
  {
    taskId: 'TASK-05',
    sprintPhase: 'Sprint 4: Diário de Conteúdo & Voz',
    taskTitle: 'Criar o Diário de Conteúdo com Ditado por Voz e Importação do Plano (Screen 04)',
    targetFiles: ['/src/components/diario/LessonJournalView.tsx', '/src/services/speechToTextService.ts'],
    implementationSteps: [
      '1. Montar a interface do editor de diário com suporte a Web Speech API para ditado por voz.',
      '2. Adicionar o botão "Importar do Plano de Aula" que preenche o conteúdo ministrado automaticamente.',
      '3. Integrar modal de busca de habilidades da BNCC.',
      '4. Implementar auto-save a cada 10 segundos no Dexie.js.'
    ],
    verificationCommand: 'npm run test:journal',
    definitionOfDone: 'Conteúdo registrado por voz e importado do plano com salvamento automático comprovado.'
  },
  {
    taskId: 'TASK-06',
    sprintPhase: 'Sprint 5: Planejador BNCC & IA Aurora',
    taskTitle: 'Implementar o Gerador de Planos BNCC com Edge Function Aurora (Screen 05 & CMP-05)',
    targetFiles: ['/src/components/planos/BnccPlannerWizard.tsx', '/supabase/functions/aurora-generate/index.ts', '/src/services/auroraAiService.ts'],
    implementationSteps: [
      '1. Desenvolver o wizard em 3 passos (Tema -> Habilidades BNCC -> Geração IA).',
      '2. Escrever a Edge Function `aurora-generate` no Supabase com chamada à API Gemini 2.5 Flash.',
      '3. Exibir o componente AI Aurora Suggestion Box (CMP-05) com opções de Aceitar, Editar ou Descartar.',
      '4. Garantir salvamento oficial do plano no banco de dados local e remoto.'
    ],
    verificationCommand: 'npm run test:aurora',
    definitionOfDone: 'Plano de aula completo gerado pela IA com códigos oficiais BNCC e homologação pelo professor.'
  }
];

// === 5. FORMAL ARCHITECTURE SIGN-OFF & CLOSING DECLARATION ===

export const ENGINEERING_CLOSING_DECLARATION = {
  title: 'Encerramento Oficial da Fase de Arquitetura & Início do Desenvolvimento no VS Code',
  protocolNumber: 'EDUCAFLOW-ENG-BLUEPRINT-2026-V1',
  effectiveDate: '28 de Julho de 2026',
  signatories: [
    { role: 'Principal Software Architect', status: 'Aprovado & Assinado' },
    { role: 'Staff Frontend Engineer', status: 'Aprovado & Assinado' },
    { role: 'Staff Backend Engineer', status: 'Aprovado & Assinado' },
    { role: 'Tech Lead & Engineering Manager', status: 'Aprovado & Assinado' }
  ],
  declarationText: `Declaro oficialmente encerrada toda a fase de documentação, Discovery, UX Research, Design System, Arquitetura de Software e Especificação Funcional do EducaFlow v1.0. A partir deste momento, todos os esforços da equipe técnica estão redirecionados exclusivamente para a geração de código de produção, incremental e testável no Visual Studio Code, seguindo o plano de execução técnico aprovado neste Blueprint.`
};
