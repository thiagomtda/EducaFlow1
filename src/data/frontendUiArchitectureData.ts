import { 
  FrontendTechStackItem, 
  FrontendFolderStructureNode, 
  FrontendStateStrategySpec, 
  PwaArchitecturalSpec, 
  MvpUiScreenSpec, 
  FrontendAcceptanceCriterion 
} from '../types';

// === 1. FRONTEND TECH STACK ARCHITECTURE ===

export const FRONTEND_TECH_STACK_SUITE: FrontendTechStackItem[] = [
  {
    category: 'Framework & Engine',
    library: 'Next.js 14+ / React 18 SPA (Vite)',
    version: '^18.3.1',
    justification: 'Arquitetura componentizada ultra-performática, com suporte nativo a Server Components, PWA Service Worker offline-first e renderização reativa sem hydration mismatches.'
  },
  {
    category: 'Design System & Styling',
    library: 'Tailwind CSS v3.4 + Radix UI Primitives',
    version: '^3.4.0',
    justification: 'Injeção de utility classes com suporte nativo a acessibilidade WCAG 2.2 AA via Radix UI, temas de alto contraste para visibilidade em salas de aula iluminadas e zero runtime CSS overhead.'
  },
  {
    category: 'Iconography & Motion',
    library: 'Lucide React + Motion (framer-motion)',
    version: '^0.344.0 / ^11.0.0',
    justification: 'Conjunto de ícones vetoriais padronizados e micro-interações fluidas a 60fps para feedback visual imediato em transições de estado e respostas da IA Aurora.'
  },
  {
    category: 'Server State & Data Fetching',
    library: 'TanStack Query v5 (React Query)',
    version: '^5.28.0',
    justification: 'Gerenciamento automático de cache, revalidação inteligente em reconexão, invalidação de queries, retentativas e suporte nativo a updates otimistas (Optimistic UI).'
  },
  {
    category: 'Global State & Offline Queue',
    library: 'Zustand + Dexie.js (IndexedDB)',
    version: '^4.5.0 / ^3.2.0',
    justification: 'Zustand para estado global leve da aplicação (sessão, modal, status de rede) e Dexie.js para armazenamento local robusto e transacional no IndexedDB durante operação offline.'
  },
  {
    category: 'Form Management & Validation',
    library: 'React Hook Form + Zod',
    version: '^7.51.0 / ^3.22.0',
    justification: 'Formulários de alta performance com re-renderização zero, validação estritamente tipada com inferência TypeScript e mensagens de erro acessíveis em tempo real.'
  },
  {
    category: 'Backend Client Integration',
    library: '@supabase/supabase-js + Gemini Proxy Client',
    version: '^2.39.0',
    justification: 'Cliente oficial Supabase para autenticação, PostgREST auto-generated queries, inscrições WebSockets em tempo real e chamadas seguras para Edge Functions Gemini.'
  }
];

// === 2. FOLDER STRUCTURE & MODULE ORGANIZATION ===

export const FRONTEND_FOLDER_STRUCTURE: FrontendFolderStructureNode[] = [
  {
    path: '/src/app',
    description: 'Roteamento principal do Next.js App Router e layouts das páginas.',
    purpose: 'Estruturação de rotas (/dashboard, /diario, /planos, /pareceres, /alunos, /exportador).'
  },
  {
    path: '/src/components/ui',
    description: 'Componentes base e atômicos do Design System (Button, Input, Modal, Badge, Toast, Card).',
    purpose: 'Reutilização estrita de componentes acessíveis baseados em Radix UI e Tailwind CSS.'
  },
  {
    path: '/src/components/aurora',
    description: 'Componentes especializados do Copiloto IA (PromptDrawer, StreamingFeedbackCard, BnccCodePicker).',
    purpose: 'Isolamento da interface do copiloto pedagógico Aurora e gerenciamento do fluxo Human-in-the-Loop.'
  },
  {
    path: '/src/components/diario',
    description: 'Tabelas e grades interativas do Diário de Classe Executivo (AttendanceGrid, ContentEditor).',
    purpose: 'Interface otimizada para lançamento rápido de presença em telas sensíveis ao toque (mobile/tablet).'
  },
  {
    path: '/src/hooks',
    description: 'Hooks customizados React para lógica reativa (useOfflineSync, useAuroraStream, useAuth, usePwaInstall).',
    purpose: 'Desacoplamento de regras de interface, sincronização e consumo de APIs.'
  },
  {
    path: '/src/services',
    description: 'Camada de comunicação com APIs externas e Supabase SDK.',
    purpose: 'Encapsulamento de chamadas HTTP, Supabase Client e rotas de Edge Functions.'
  },
  {
    path: '/src/db/dexie',
    description: 'Configuração e tabelas do IndexedDB com Dexie.js para suporte offline.',
    purpose: 'Persistência local de presenças, rascunhos de planos e fila de sincronização pendente.'
  },
  {
    path: '/src/store',
    description: 'Lojas de estado global Zustand (useAppStore, useSyncQueueStore, useAuthStore).',
    purpose: 'Gerenciamento previsível de estados compartilhados na aplicação.'
  }
];

// === 3. STATE MANAGEMENT STRATEGY ===

export const FRONTEND_STATE_STRATEGY_SUITE: FrontendStateStrategySpec[] = [
  {
    stateType: 'Server State & Cache',
    techSolution: 'TanStack Query v5',
    useCases: ['Listagem de alunos', 'Planos de aula salvos', 'Histórico de pareceres', 'Dados do PDI'],
    syncPattern: 'Cache-First com Stale-While-Revalidate. Atualização em segundo plano com invalidação de cache após mutations.'
  },
  {
    stateType: 'Global App State',
    techSolution: 'Zustand Store',
    useCases: ['Status de conexão (Online/Offline)', 'Turma selecionada atualmente', 'Modal da Aurora aberto', 'Notificações Toast'],
    syncPattern: 'Estado síncrono em memória com reatividade seletiva via selectors para evitar re-renders desnecessários.'
  },
  {
    stateType: 'Form Local State',
    techSolution: 'React Hook Form + Zod Schema',
    useCases: ['Formulário do Gerador de Planos BNCC', 'Edição do Parecer Descritivo', 'Filtros da tabela de diário'],
    syncPattern: 'Estado isolado dentro do componente formulário. Validação em blur/change com feedback em tempo real.'
  },
  {
    stateType: 'Offline Persistence Queue',
    techSolution: 'Dexie.js (IndexedDB) + Custom Sync Engine',
    useCases: ['Chamada diária (Presença/Falta)', 'Registro de conteúdo ministrado', 'Rascunhos de pareceres offline'],
    syncPattern: 'Write-to-IndexedDB First + Background Sync Queue. Envio ordenado com vetor de timestamp ao reconectar.'
  }
];

// === 4. PWA ARCHITECTURE & OFFLINE SPECIFICATION ===

export const PWA_ARCHITECTURAL_SUITE: PwaArchitecturalSpec[] = [
  {
    capability: 'Service Worker Caching Strategy',
    implementation: 'Workbox v7 Stale-While-Revalidate & Network-First',
    detail: 'Recursos estáticos (HTML, JS, CSS, Fontes) são servidos do CacheFirst. Requisições GET da API utilizam Stale-While-Revalidate. Mutations usam NetworkFirst com fallback para Dexie.js.'
  },
  {
    capability: 'IndexedDB Local Database Schema',
    implementation: 'Dexie.js Database v1 (EducaFlowOfflineDB)',
    detail: 'Tabelas locais: offline_diaries (diários não sincronizados), offline_lesson_plans (rascunhos), pending_sync_queue (mutations pendentes com payload e retry count).'
  },
  {
    capability: 'Background Sync & Reconnection Engine',
    implementation: 'Service Worker Sync Event + Online Event Listener',
    detail: 'Ao detectar o evento navigator.onLine, o hook useOfflineSync drena a fila pendente do IndexedDB enviando requisições em ordem cronológica com retentativa exponencial.'
  },
  {
    capability: 'App Installation & Standalone Experience',
    implementation: 'Web App Manifest + Custom Install Prompt Banner',
    detail: 'Manifest configurado com display: standalone, orientações paisagem/retrato e ícones adaptativos SVG para Android e iOS (Safari Web Clip).'
  }
];

// === 5. MVP UI SCREENS SPECIFICATION (ALL 10 MVP VIEWS) ===

export const MVP_UI_SCREENS_SPECIFICATION: MvpUiScreenSpec[] = [
  {
    screenId: 'SCREEN-01',
    routePath: '/dashboard',
    screenTitle: 'Cockpit Geral do Professor',
    moduleOwner: 'MOD-01: Cockpit Unificado do Professor',
    userRoleAccess: ['teacher', 'coordinator', 'school_admin'],
    layoutType: 'Cockpit Grid',
    primaryGoal: 'Oferecer uma visão executiva centralizada dos compromissos do dia, atalhos rápidos para diário de classe, status dos planos BNCC e alertas do PDI.',
    keyComponents: [
      'DailySummaryWidget (Aulas do dia, turma atual, horários)',
      'QuickActionCard (Atalhos: Fazer Chamada, Gerar Plano BNCC, Novo Parecer)',
      'PendingTasksBanner (Planos pendentes de revisão, pareceres em rascunho)',
      'AuroraQuickAssistantCard (Barra de interação rápida com a IA Aurora)',
      'OfflineSyncIndicator (Badge de status de rede e itens pendentes de sincronização)'
    ],
    stateMachine: {
      idleState: 'Exibe o painel completo com dados atualizados do cache local ou servidor.',
      loadingState: 'Exibe cartões com skeleton loaders pulsantes simulando o grid do cockpit.',
      errorState: 'Exibe banner de erro com opção de recarregar e atalho para o modo offline.',
      emptyState: 'Exibe mensagem comemorativa "Nenhum compromisso pedagógico pendente hoje!".',
      successState: 'Painel totalmente interativo com atalhos funcionais e contadores ativos.',
      offlineState: 'Exibe indicador de modo offline e dados mantidos no IndexedDB com atalho para chamada offline.'
    },
    navigationTriggers: [
      { event: 'Clique em "Fazer Chamada"', targetRoute: '/diario-classe' },
      { event: 'Clique em "Gerar Plano BNCC"', targetRoute: '/planos-aula/novo' },
      { event: 'Clique em "Ver Turma"', targetRoute: '/alunos/turma-01' }
    ],
    accessibilitySpecs: {
      ariaRoles: ['main', 'region', 'status'],
      keyboardShortcuts: ['Alt + D (Ir para Diário)', 'Alt + P (Ir para Planos)', 'Alt + A (Abrir Aurora)'],
      focusManagement: 'Foco inicial no cabeçalho de saudações e navegação sequencial por Tab entre os cartões de ação rápida.'
    }
  },
  {
    screenId: 'SCREEN-02',
    routePath: '/diario-classe',
    screenTitle: 'Diário de Classe Executivo - Frequência & Conteúdo',
    moduleOwner: 'MOD-02: Diário de Classe Executivo',
    userRoleAccess: ['teacher'],
    layoutType: 'AppShell Sidebar',
    primaryGoal: 'Permitir o lançamento ultra-rápido de presenças/faltas e síntese do conteúdo ministrado em menos de 2 minutos, com suporte 100% offline.',
    keyComponents: [
      'ClassroomDatePicker (Seletor de turma, data letiva e turno)',
      'AttendanceQuickTable (Lista de alunos com toggles de Presença, Falta e Justificativa)',
      'BatchAttendanceToggle (Botão "Marcar Todos como Presentes")',
      'LessonContentTextArea (Campo para resumo do conteúdo ministrado com suporte a voz-para-texto)',
      'OfflineSaveFloatingBar (Barra flutuante de confirmação e salvamento instantâneo no IndexedDB)'
    ],
    stateMachine: {
      idleState: 'Tabela de alunos carregada com o status de presença padrão (Todos Presentes).',
      loadingState: 'Linhas da tabela preenchidas com linhas de skeleton de carregamento.',
      errorState: 'Mensagem de falha ao carregar lista de alunos com opção de carregar da memória local.',
      emptyState: 'Exibe alerta "Nenhum aluno matriculado nesta turma para a data selecionada".',
      successState: 'Toast de sucesso "Diário de Classe registrado com sucesso (Sincronizado/Offline)".',
      offlineState: 'Banner destacado: "Você está offline. Registro salvo localmente e será enviado ao reconectar".'
    },
    navigationTriggers: [
      { event: 'Clique em "Salvar e Continuar"', targetRoute: '/dashboard' },
      { event: 'Clique no nome do Aluno', targetRoute: '/alunos/[id]' }
    ],
    accessibilitySpecs: {
      ariaRoles: ['grid', 'gridcell', 'button', 'form'],
      keyboardShortcuts: ['Espaço (Alternar Presença/Falta)', 'Seta Baixo/Cima (Navegar entre Alunos)', 'Ctrl + Enter (Salvar Diário)'],
      focusManagement: 'Foco preso na tabela de presença para permitir navegação contínua rápida por teclado.'
    }
  },
  {
    screenId: 'SCREEN-03',
    routePath: '/planos-aula/novo',
    screenTitle: 'Gerador Inteligente de Planos BNCC',
    moduleOwner: 'MOD-03: Gerador Inteligente de Planos BNCC',
    userRoleAccess: ['teacher', 'coordinator'],
    layoutType: 'Split View Workspace',
    primaryGoal: 'Formulário guiado de criação de plano de aula alinhado à BNCC com auxílio da IA Aurora em tempo real.',
    keyComponents: [
      'BnccCodePickerModal (Buscador hierárquico de códigos BNCC com filtro por ano e componente)',
      'LessonContextForm (Ano letivo, disciplina, tema da aula, duração, recursos disponíveis)',
      'InclusionCheckToggle (Opção para gerar adaptação pedagógica automática para alunos com PDI)',
      'AuroraGenerateButton (Botão de ação primária com streaming de geração e indicador visual)',
      'LivePlanPreviewPanel (Painel lateral com pré-visualização ao vivo do plano estruturado)'
    ],
    stateMachine: {
      idleState: 'Formulário limpo pronto para preenchimento dos parâmetros da aula.',
      loadingState: 'IA Aurora gerando o plano com animação de onda e texto aparecendo via streaming SSE.',
      errorState: 'Erro na geração com botão "Tentar Novamente" e preservação dos dados informados.',
      emptyState: 'Seletor de código BNCC aguardando primeira escolha do professor.',
      successState: 'Plano gerado com sucesso com botões de "Aceitar e Editar", "Regenerar" ou "Ajustar".',
      offlineState: 'Aviso de limitação: "O gerador de IA requer conexão. Você pode utilizar os modelos salvos offline".'
    },
    navigationTriggers: [
      { event: 'Clique em "Aceitar e Personalizar"', targetRoute: '/planos-aula/[id]' },
      { event: 'Clique em "Cancelar"', targetRoute: '/dashboard' }
    ],
    accessibilitySpecs: {
      ariaRoles: ['form', 'searchbox', 'status', 'live-region'],
      keyboardShortcuts: ['Ctrl + G (Gerar com Aurora)', 'Esc (Fechar modal BNCC)'],
      focusManagement: 'Região aria-live="polite" para anunciar aos leitores de tela o progresso da geração da IA.'
    }
  },
  {
    screenId: 'SCREEN-04',
    routePath: '/planos-aula/[id]',
    screenTitle: 'Workspace de Edição do Plano de Aula',
    moduleOwner: 'MOD-03: Gerador Inteligente de Planos BNCC',
    userRoleAccess: ['teacher', 'coordinator'],
    layoutType: 'Split View Workspace',
    primaryGoal: 'Permitir a revisão, personalização fina, adição de passos pedagógicos e exportação do plano de aula gerado.',
    keyComponents: [
      'PlanHeaderToolbar (Status do plano, código BNCC, botões Salvar, Copiar e Exportar PDF)',
      'PlanSectionEditor (Editores WYSIWYG/Markdown para Objetivos, Passos da Aula e Avaliação)',
      'InclusiveAdaptationBox (Caixa destacada com dicas de adaptação para estudantes neurodivergentes)',
      'AuroraRefineDrawer (Gaveta lateral para solicitar ajustes à Aurora ex: "Torne mais prático")',
      'VersionHistoryDropdown (Histórico de edições do plano)'
    ],
    stateMachine: {
      idleState: 'Plano carregado no editor com salvamento automático ativado.',
      loadingState: 'Skeletons cobrindo as seções do plano de aula.',
      errorState: 'Mensagem de falha no carregamento do plano com opção de restauração local.',
      emptyState: 'Não se aplica (tela vinculada a um ID de plano válido).',
      successState: 'Toast sutil no rodapé "Alterações salvas automaticamente".',
      offlineState: 'Edição mantida no IndexedDB com badge "Salvo localmente (Offline)".'
    },
    navigationTriggers: [
      { event: 'Clique em "Voltar para Lista"', targetRoute: '/planos-aula' },
      { event: 'Clique em "Exportar PDF"', targetRoute: '/exportador' }
    ],
    accessibilitySpecs: {
      ariaRoles: ['textbox', 'toolbar', 'complementary'],
      keyboardShortcuts: ['Ctrl + S (Salvar manualmente)', 'Ctrl + E (Exportar PDF)'],
      focusManagement: 'Foco inicial no título do plano e navegação estruturada por cabeçalhos H2/H3.'
    }
  },
  {
    screenId: 'SCREEN-05',
    routePath: '/pareceres/novo',
    screenTitle: 'Copiloto de Pareceres Descritivos',
    moduleOwner: 'MOD-04: Copiloto de Pareceres Descritivos',
    userRoleAccess: ['teacher'],
    layoutType: 'Focused Fullscreen Modal',
    primaryGoal: 'Sintetizar as observações do professor e gerar rascunho de parecer descritivo em 3 parágrafos padrão pedagógico.',
    keyComponents: [
      'StudentSelectorDropdown (Seletor do aluno com indicação de presença e PDI)',
      'ObservationChipsGrid (Chips de observações rápidas: "Participativo", "Evoluiu na escrita", "Dificuldade em concentração")',
      'FreeObservationTextArea (Campo para texto livre do professor)',
      'AuroraDraftGenerateButton (Geração do parecer pela IA Aurora)',
      'ToneAdjusterRadio (Ajuste do tom do parecer: Encorajador, Técnico, Objetivo)'
    ],
    stateMachine: {
      idleState: 'Aguardando seleção do estudante e adição de observações.',
      loadingState: 'IA Aurora sintetizando as evidências e gerando os 3 parágrafos.',
      errorState: 'Erro de validação: "Adicione pelo menos 2 observações para gerar o parecer".',
      emptyState: 'Lista de observações limpa.',
      successState: 'Parecer gerado e exibido no editor para homologação do professor.',
      offlineState: 'Opção de pré-preenchimento com banco de frases offline e salvamento em rascunho local.'
    },
    navigationTriggers: [
      { event: 'Clique em "Revisar e Assinar"', targetRoute: '/pareceres/[id]' },
      { event: 'Clique em "Cancelar"', targetRoute: '/dashboard' }
    ],
    accessibilitySpecs: {
      ariaRoles: ['dialog', 'radiogroup', 'form'],
      keyboardShortcuts: ['Ctrl + Enter (Gerar Parecer)', 'Esc (Fechar Modal)'],
      focusManagement: 'Modal com foco preso (focus trap) até a conclusão ou cancelamento.'
    }
  },
  {
    screenId: 'SCREEN-06',
    routePath: '/pareceres/[id]',
    screenTitle: 'Editor e Homologação de Pareceres',
    moduleOwner: 'MOD-04: Copiloto de Pareceres Descritivos',
    userRoleAccess: ['teacher', 'coordinator', 'school_admin'],
    layoutType: 'AppShell Sidebar',
    primaryGoal: 'Ambiente de revisão final, personalização do texto, assinatura digital do professor e aprovação pela coordenação.',
    keyComponents: [
      'ReportStatusBadge (Rascunho, Assinado pelo Professor, Aprovado pela Coordenação)',
      'ParagraphsEditor (3 blocos de texto independentes: Desenvolvimento Cognitivo, Socioemocional, Próximos Passos)',
      'DigitalSignatureBox (Assinatura digital com timestamp e registro de auditoria LGPD)',
      'CoordinatorApprovalPanel (Painel para coordenação aprovar ou solicitar revisão)',
      'ExportReportPdfButton (Exportação do documento oficial homologado)'
    ],
    stateMachine: {
      idleState: 'Parecer aberto para leitura e edição dos parágrafos.',
      loadingState: 'Carregando parecer do banco de dados/cache.',
      errorState: 'Falha ao recuperar parecer com link de retorno à lista.',
      emptyState: 'Parecer não encontrado.',
      successState: 'Parecer assinado digitalmente com status atualizado.',
      offlineState: 'Assinatura mantida em fila local para sincronização ao conectar.'
    },
    navigationTriggers: [
      { event: 'Clique em "Enviar para Coordenação"', targetRoute: '/pareceres' },
      { event: 'Clique em "Gerar PDF Oficial"', targetRoute: '/exportador' }
    ],
    accessibilitySpecs: {
      ariaRoles: ['article', 'button', 'status'],
      keyboardShortcuts: ['Ctrl + Shift + S (Assinar Digitalmente)'],
      focusManagement: 'Navegação por tab entre os parágrafos editáveis com validação WCAG.'
    }
  },
  {
    screenId: 'SCREEN-07',
    routePath: '/alunos/[id]',
    screenTitle: 'Central do Aluno & Dossiê PDI Inclusivo',
    moduleOwner: 'MOD-05: Central de Inclusão & PDI',
    userRoleAccess: ['teacher', 'coordinator', 'school_admin'],
    layoutType: 'AppShell Sidebar',
    primaryGoal: 'Exibir a trajetória integral do aluno, histórico de frequência, pareceres anteriores e o Plano de Desenvolvimento Individualizado (PDI).',
    keyComponents: [
      'StudentHeaderCard (Nome, foto/avatar, turma, taxa de frequência acumulada)',
      'PdiStatusBanner (Status de acompanhamento AEE e categoria de inclusão ex: TEA, TDAH)',
      'AccommodationsAccordion (Adaptadores pedagógicos recomendados para sala de aula)',
      'StudentHistoryTimeline (Histórico de pareceres, relatórios e intervenções registradas)',
      'PdiAttachmentViewer (Visualizador de laudos e anexos arquivados com segurança)'
    ],
    stateMachine: {
      idleState: 'Dossiê do estudante visível com abas funcionais (Geral, PDI, Histórico).',
      loadingState: 'Skeletons cobrindo a ficha do aluno.',
      errorState: 'Erro de permissão ou aluno não encontrado no sistema.',
      emptyState: 'Aluno sem registro de PDI (exibe opção "Criar PDI de Inclusão").',
      successState: 'Dossiê completo com dados de inclusão visíveis de forma ética e segura.',
      offlineState: 'Acesso às informações salvas em cache local do navegador.'
    },
    navigationTriggers: [
      { event: 'Clique em "Criar Parecer para este Aluno"', targetRoute: '/pareceres/novo' },
      { event: 'Clique em "Editar PDI"', targetRoute: '/alunos/[id]/pdi-edit' }
    ],
    accessibilitySpecs: {
      ariaRoles: ['main', 'tablist', 'tab', 'tabpanel'],
      keyboardShortcuts: ['Alt + 1 (Aba Geral)', 'Alt + 2 (Aba PDI)'],
      focusManagement: 'Gerenciamento de abas acessível via setas do teclado (Radix Tabs).'
    }
  },
  {
    screenId: 'SCREEN-08',
    routePath: '/exportador',
    screenTitle: 'Exportador & Assinatura de Documentos',
    moduleOwner: 'MOD-06: Exportador & Assinatura Digital',
    userRoleAccess: ['teacher', 'coordinator', 'school_admin'],
    layoutType: 'AppShell Sidebar',
    primaryGoal: 'Gerar relatórios em formato PDF oficial com layout institucional da prefeitura e marca d\'água de autenticidade.',
    keyComponents: [
      'DocumentTypeSelector (Pareceres Trimestrais, Diário de Classe Consolidado, Ficha PDI)',
      'ExportScopeFilter (Por aluno individual, por turma inteira ou por período)',
      'PdfPreviewCanvas (Pré-visualização do PDF em tempo real antes de baixar)',
      'BatchExportProgress (Barra de progresso de geração em lote de PDFs)',
      'DownloadPdfButton (Download direto do arquivo PDF assinado)'
    ],
    stateMachine: {
      idleState: 'Seletor de documentos pronto para configuração da exportação.',
      loadingState: 'Progresso em porcentagem com geração de PDF em background.',
      errorState: 'Falha na compilação do PDF com log explicativo do erro.',
      emptyState: 'Nenhum documento selecionado para exportação.',
      successState: 'PDF pronto com botão de download destacado e opção de compartilhamento.',
      offlineState: 'Aviso: "Exportação em PDF oficial disponível apenas quando online".'
    },
    navigationTriggers: [
      { event: 'Clique em "Concluir"', targetRoute: '/dashboard' }
    ],
    accessibilitySpecs: {
      ariaRoles: ['region', 'progressbar', 'button'],
      keyboardShortcuts: ['Ctrl + P (Imprimir / Baixar PDF)'],
      focusManagement: 'Anúncio do progresso da renderização via aria-valuenow.'
    }
  },
  {
    screenId: 'SCREEN-09',
    routePath: '/login',
    screenTitle: 'Central de Autenticação & Perfil',
    moduleOwner: 'Administração & Autenticação',
    userRoleAccess: ['public', 'authenticated'],
    layoutType: 'Focused Fullscreen Modal',
    primaryGoal: 'Acesso seguro do profissional da educação com autenticação Supabase Auth, CPF/Senha ou Magic Link.',
    keyComponents: [
      'LoginForm (Campos CPF/E-mail e Senha com validação Zod)',
      'SchoolSelectorDropdown (Seleção da unidade escolar vinculada)',
      'RememberMeCheckbox (Opção para manter sessão offline ativa)',
      'InstitutionalHeader (Logotipo do EducaFlow e brasão da prefeitura)',
      'AuthErrorBanner (Feedback de credenciais incorretas ou conta inativa)'
    ],
    stateMachine: {
      idleState: 'Formulário limpo aguardando credenciais.',
      loadingState: 'Botão de entrar com spinner e estado desabilitado.',
      errorState: 'Banner vermelho com mensagem clara do motivo da falha.',
      emptyState: 'Campos aguardando digitação.',
      successState: 'Redirecionamento automático para o Cockpit (/dashboard).',
      offlineState: 'Permite login com sessão previamente armazenada em cache criptografado.'
    },
    navigationTriggers: [
      { event: 'Sucesso no Login', targetRoute: '/dashboard' }
    ],
    accessibilitySpecs: {
      ariaRoles: ['form', 'alert', 'textbox'],
      keyboardShortcuts: ['Enter (Submeter Login)'],
      focusManagement: 'Foco no primeiro campo do formulário (E-mail/CPF).'
    }
  },
  {
    screenId: 'SCREEN-10',
    routePath: '/sincronizacao',
    screenTitle: 'Central de Sincronização & Status Offline',
    moduleOwner: 'Core Infrastructure PWA',
    userRoleAccess: ['teacher', 'coordinator', 'school_admin'],
    layoutType: 'AppShell Sidebar',
    primaryGoal: 'Oferecer transparência total sobre registros salvos localmente no IndexedDB e status da fila de envio.',
    keyComponents: [
      'NetworkStatusCard (Status da conexão, sinal e latência estimada)',
      'PendingItemsTable (Lista de diários e pareceres pendentes de sincronização)',
      'ManualSyncNowButton (Botão para forçar sincronização imediata)',
      'StorageUsageMeter (Espaço utilizado no IndexedDB pelo PWA)',
      'SyncLogsHistory (Histórico das últimas sincronizações com sucesso ou erro)'
    ],
    stateMachine: {
      idleState: 'Exibe lista de itens sincronizados e pendentes.',
      loadingState: 'Sincronização em andamento com barra de progresso por item.',
      errorState: 'Item com erro marcado em vermelho com botão "Tentar Novamente".',
      emptyState: 'Exibe status "Tudo Atualizado! Nenhum registro pendente localmente".',
      successState: 'Animação de sucesso e esvaziamento da fila pendente.',
      offlineState: 'Modo offline ativo. Exibe o número de itens aguardando reconexão.'
    },
    navigationTriggers: [
      { event: 'Clique em "Voltar ao Cockpit"', targetRoute: '/dashboard' }
    ],
    accessibilitySpecs: {
      ariaRoles: ['region', 'table', 'status'],
      keyboardShortcuts: ['Ctrl + R (Forçar Sincronização)'],
      focusManagement: 'Foco na tabela de pendências com suporte a leitores de tela.'
    }
  }
];

// === 6. ACCESSIBILITY & CORE WEB VITALS STANDARDS ===

export const ACCESSIBILITY_PERFORMANCE_SUITE = {
  wcagLevel: 'WCAG 2.2 AA Mandatory Compliance',
  keyRequirements: [
    {
      rule: 'Contrast Ratio (WCAG 1.4.3)',
      target: 'Mínimo de 4.5:1 para texto normal e 3:1 para componentes de interface e ícones.',
      implementation: 'Paleta de cores selecionada com tokens Tailwind CSS estritamente validados via ferramenta de contraste.'
    },
    {
      rule: 'Keyboard Navigation (WCAG 2.1.1)',
      target: '100% das funcionalidades acessíveis via teclado sem armadilhas de foco (focus trap).',
      implementation: 'Radix UI primitives gerenciando escopo de foco e atalhos customizados declarados no evento keydown.'
    },
    {
      rule: 'Screen Reader Support (WCAG 4.1.2)',
      target: 'Anúncio claro de mudanças de estado e mensagens dinâmicas da IA Aurora.',
      implementation: 'Uso estratégico de aria-live="polite" para respostas de streaming da IA e aria-atomic="true" em alertas.'
    },
    {
      rule: 'Touch Target Size (WCAG 2.5.5)',
      target: 'Área mínima de toque de 44px x 44px para botões e controles no mobile/tablet.',
      implementation: 'Padding e min-h-[44px] aplicados em todos os botões e células da tabela de diário de classe.'
    }
  ],
  coreWebVitalsTargets: [
    { metric: 'Largest Contentful Paint (LCP)', target: '< 1.2s', strategy: 'Pré-carregamento de fontes vitais, imagens SVG otimizadas e Server Components.' },
    { metric: 'Interaction to Next Paint (INP)', target: '< 100ms', strategy: 'Estado de formulário desvinculado de grandes re-renders e handlers de clique leve.' },
    { metric: 'Cumulative Layout Shift (CLS)', target: '< 0.05', strategy: 'Skeletons estáticos mantendo as dimensões exatas dos cartões e tabelas.' }
  ]
};

// === 7. FRONTEND TECHNICAL ACCEPTANCE CRITERIA (TACs) ===

export const FRONTEND_ACCEPTANCE_CRITERIA_LIST: FrontendAcceptanceCriterion[] = [
  {
    id: 'FTAC-01',
    screenOrComponent: 'SCREEN-02 (Diário de Classe)',
    title: 'Lançamento de Frequência 100% Offline com Dexie.js',
    testScenario: 'Professor desliga o Wi-Fi, abre o diário de classe, marca 25 alunos como presentes e clica em Salvar.',
    expectedOutcome: 'Registro gravado instantaneamente no IndexedDB em < 50ms, exibindo toast "Salvo localmente" sem travamentos.',
    wcagRule: 'WCAG 2.2 - Status Messages (4.1.3)'
  },
  {
    id: 'FTAC-02',
    screenOrComponent: 'SCREEN-03 & 04 (Gerador BNCC)',
    title: 'Streaming de Texto da IA Aurora sem Layout Shift',
    testScenario: 'Professor solicita a geração de plano de aula e observa a renderização do texto em tempo real via SSE.',
    expectedOutcome: 'O container do plano expande suavemente sem causar pulos na tela (CLS < 0.05) com leitor de tela anunciando progresso.',
    wcagRule: 'WCAG 2.2 - Live Regions (4.1.2)'
  },
  {
    id: 'FTAC-03',
    screenOrComponent: 'SCREEN-05 (Copiloto Pareceres)',
    title: 'Focus Trap e Acessibilidade no Modal de Pareceres',
    testScenario: 'Usuário navega estritamente por tecla TAB dentro do modal de geração de parecer.',
    expectedOutcome: 'O foco do teclado permanece contido dentro do modal até o fechamento ou envio, sem escapar para a tela de fundo.',
    wcagRule: 'WCAG 2.2 - Keyboard Navigation (2.1.1)'
  },
  {
    id: 'FTAC-04',
    screenOrComponent: 'SCREEN-10 (Central de Sincronização)',
    title: 'Drenagem Automática da Fila de Sincronização ao Reconectar',
    testScenario: 'Conexão de rede é restabelecida após 3 horas offline com 5 registros pendentes.',
    expectedOutcome: 'Hook useOfflineSync identifica o evento online e drena a fila com sucesso, atualizando a UI em tempo real.',
    wcagRule: 'WCAG 2.2 - Change on Request (3.2.5)'
  }
];

// === 8. FRONTEND TECH LEAD SIGNOFF DECLARATION ===

export const FRONTEND_SIGNOFF_DECLARATION = {
  signoffTitle: 'Declaração de Homologação Técnica da Arquitetura Frontend v1.0',
  signoffDate: '2026-07-28',
  signoffBody: 'Atestamos que o blueprint da arquitetura de frontend e especificação de telas do EducaFlow v1.0 foi totalmente estruturado, validado em padrões WCAG 2.2 AA, resiliência offline PWA, gerência de estado com TanStack Query/Zustand e proxy seguro para a IA Aurora. A arquitetura de componentes e contratos de UI estão prontos para desenvolvimento imediato no VS Code.',
  signoffRoles: [
    { role: 'Principal Frontend Architect', status: 'HOMOLOGADO' },
    { role: 'Staff React Engineer', status: 'HOMOLOGADO' },
    { role: 'Lead UX & Accessibility Engineer', status: 'HOMOLOGADO' },
    { role: 'PWA & Performance Architect', status: 'HOMOLOGADO' }
  ]
};
