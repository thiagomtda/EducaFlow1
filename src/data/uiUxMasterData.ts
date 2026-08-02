import {
  DesignTokenCategorySpec,
  MasterComponentSpec,
  MvpScreenMasterSpec,
  NavigationFlowNodeSpec,
  PostMvpBacklogItem,
  ImplementationSprintStepSpec
} from '../types';

// === 1. FINAL DESIGN TOKENS CATALOG ===

export const FINAL_DESIGN_TOKENS: DesignTokenCategorySpec[] = [
  {
    categoryName: 'Grid & Spacing Scale (8pt System)',
    description: 'Escala matemática de espaçamentos para garantir alinhamento perfeito, ritmo vertical e hierarquia visual.',
    tokens: [
      { tokenName: 'spacing-xxs (2px)', value: '0.125rem', usageRule: 'Micro-lacunas entre ícones e badges, bordas internas super finas.' },
      { tokenName: 'spacing-xs (4px)', value: '0.25rem', usageRule: 'Padding interno de chips, etiquetas e botões compactos.' },
      { tokenName: 'spacing-sm (8px)', value: '0.5rem', usageRule: 'Gaps entre elementos de lista, margens de formulários.' },
      { tokenName: 'spacing-md (16px)', value: '1.0rem', usageRule: 'Padding interno padrão de cards, botões e campos de entrada.' },
      { tokenName: 'spacing-lg (24px)', value: '1.5rem', usageRule: 'Gaps entre colunas de grid, padding externo de modais e painéis.' },
      { tokenName: 'spacing-xl (32px)', value: '2.0rem', usageRule: 'Separação entre seções principais e cabeçalhos do cockpit.' },
      { tokenName: 'spacing-2xl (48px)', value: '3.0rem', usageRule: 'Padding de container externo em telas desktop e heroes minóicos.' }
    ]
  },
  {
    categoryName: 'Borders & Radii (Formula: Inner = Outer - Padding)',
    description: 'Bordas e cantos arredondados calculados matematicamente para evitar choques estéticos entre containers aninhados.',
    tokens: [
      { tokenName: 'radius-sm (4px)', value: '0.25rem', usageRule: 'Badges, tooltips e marcadores de status.' },
      { tokenName: 'radius-md (8px)', value: '0.5rem', usageRule: 'Botões, inputs, cards internos e itens de chamada.' },
      { tokenName: 'radius-lg (12px)', value: '0.75rem', usageRule: 'Cards de superfície, painéis laterais e drawers.' },
      { tokenName: 'radius-xl (16px)', value: '1.0rem', usageRule: 'Containers primários de tela, modais flutuantes e dialogs.' },
      { tokenName: 'radius-full (9999px)', value: '9999px', usageRule: 'Pills de filtro, avatares de alunos e FAB (Floating Action Button).' },
      { tokenName: 'border-hairline', value: '1px solid #e2e8f0', usageRule: 'Divisores sutis entre linhas de lista sem poluição visual.' }
    ]
  },
  {
    categoryName: 'Elevation & Shadow System',
    description: 'Hierarquia tridimensional sutil para destacar elementos focais sem poluição visual ou sombras pesadas.',
    tokens: [
      { tokenName: 'elevation-flat', value: 'box-shadow: none; border: 1px solid #e2e8f0;', usageRule: 'Cards de dados normais em repouso no background.' },
      { tokenName: 'elevation-low (Hover)', value: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)', usageRule: 'Feedback ao passar o mouse em cards selecionáveis e botões.' },
      { tokenName: 'elevation-md (Popovers & Cards Focados)', value: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)', usageRule: 'Menus dropdown, popovers da Aurora e seletores de turma.' },
      { tokenName: 'elevation-high (Modais & Drawers)', value: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)', usageRule: 'Modais de confirmação, drawers de PDI e Command Palette (Ctrl+K).' }
    ]
  },
  {
    categoryName: 'Typography Scale & Font Pairings',
    description: 'Combinação tipográfica com contraste óptico garantido para leitura sem fadiga sob iluminação de sala de aula.',
    tokens: [
      { tokenName: 'font-heading (Plus Jakarta Sans)', value: 'Plus Jakarta Sans, sans-serif', usageRule: 'Títulos de tela, nomes de alunos e valores numéricos em destaque.' },
      { tokenName: 'font-body (Inter / System UI)', value: 'Inter, -apple-system, sans-serif', usageRule: 'Textos corridos, observações do diário e planos de aula.' },
      { tokenName: 'font-mono (JetBrains Mono)', value: 'JetBrains Mono, monospace', usageRule: 'Códigos BNCC (ex: EF03MA05), hashes de assinatura digital e horas.' },
      { tokenName: 'text-xs (12px / LineHeight 1.5)', value: '0.75rem / 1.125rem', usageRule: 'Rótulos secundários, timestamps e dados de rodapé.' },
      { tokenName: 'text-sm (14px / LineHeight 1.5)', value: '0.875rem / 1.25rem', usageRule: 'Texto padrão de botões, opções de menu e inputs.' },
      { tokenName: 'text-base (16px / LineHeight 1.6)', value: '1.0rem / 1.6rem', usageRule: 'Corpo de texto principal, pareceis e sugestões da Aurora.' },
      { tokenName: 'text-lg (18px / LineHeight 1.4)', value: '1.125rem / 1.55rem', usageRule: 'Subtítulos de cards e destaques de chamadas.' },
      { tokenName: 'text-2xl (24px / LineHeight 1.3)', value: '1.5rem / 1.95rem', usageRule: 'Títulos de seções primárias e contadores do cockpit.' }
    ]
  },
  {
    categoryName: 'Color Palette & Semantic Tokens',
    description: 'Cores semânticas baseadas no sistema escuro/claro neutro com suporte WCAG 2.2 AA (contraste superior a 4.5:1).',
    tokens: [
      { tokenName: 'color-bg-app', value: '#f8fafc (Slate-50)', usageRule: 'Canvas de fundo da aplicação para reduzir brilho nocivo nos olhos.' },
      { tokenName: 'color-surface-card', value: '#ffffff (Pure White)', usageRule: 'Fundo de cards, tabelas e modais.' },
      { tokenName: 'color-brand-primary', value: '#4f46e5 (Indigo-600)', usageRule: 'Botões de ação primária, links ativos e marca do sistema.' },
      { tokenName: 'color-presence-present', value: '#059669 (Emerald-600)', usageRule: 'Status de aluno Presente, sincronização concluída e sucesso.' },
      { tokenName: 'color-presence-absent', value: '#dc2626 (Red-600)', usageRule: 'Status de aluno Ausente, erros críticos e bloqueios.' },
      { tokenName: 'color-presence-justified', value: '#d97706 (Amber-600)', usageRule: 'Status de Falta Justificada, alertas e estados pendentes.' },
      { tokenName: 'color-aurora-accent', value: '#7c3aed (Violet-600)', usageRule: 'Indicadores da IA Aurora, sugestões pedagógicas e badges de inteligência.' }
    ]
  }
];

// === 2. MASTER REUSABLE COMPONENT LIBRARY ===

export const MASTER_COMPONENTS_LIBRARY: MasterComponentSpec[] = [
  {
    componentId: 'CMP-01',
    componentName: 'Primary Action Button',
    purpose: 'Disparar a ação principal e mais importante da tela (ex: "Salvar Diário", "Gerar Plano", "Confirmar Chamada").',
    propsAndApi: ['label: string', 'icon?: ReactNode', 'isLoading?: boolean', 'isDisabled?: boolean', 'onClick: () => void', 'fullWidth?: boolean'],
    supportedStates: ['Default', 'Hover (Sombra leve + filtro brilho)', 'Focus-Visible (Outline Indigo 2px)', 'Active (Scale 0.98)', 'Disabled (Opacity 50%, Cursor Not-Allowed)', 'Loading (Spinner SVG + texto "Processando...")'],
    variations: ['Standard Indigo (4f46e5)', 'Presence Emerald (059669)', 'Danger Red (dc2626)'],
    designAndUsageRules: 'Apenas UM botão primário visível por viewport para não dividir a atenção cognitiva do professor. Altura mínima de 44px para toque móvel.'
  },
  {
    componentId: 'CMP-02',
    componentName: 'Secondary / Ghost Button',
    purpose: 'Ações secundárias, cancelamentos, navegação de volta ou filtros complementares.',
    propsAndApi: ['label: string', 'icon?: ReactNode', 'variant: "secondary" | "ghost" | "outline"', 'onClick: () => void'],
    supportedStates: ['Default', 'Hover (Background Slate-100)', 'Focus (Outline Slate-400)', 'Disabled'],
    variations: ['Outline com Borda Hairline', 'Ghost sem Borda', 'Secondary Solid Slate-100'],
    designAndUsageRules: 'Usado ao lado do botão primário para ações neutras como "Cancelar", "Voltar" ou "Exportar Rascunho".'
  },
  {
    componentId: 'CMP-03',
    componentName: 'Floating Action Button (FAB)',
    purpose: 'Atalho flutuante ultra-rápido para acionar a chamada ou criar novo plano no celular sem rolar a tela.',
    propsAndApi: ['icon: ReactNode', 'label: string', 'isExpandedOnScroll?: boolean', 'onClick: () => void'],
    supportedStates: ['Default (Pill Arredondada Flutuante)', 'Hover/Touch', 'Scroll-Collapse (Encolhe apenas para ícone quando rola para baixo)'],
    variations: ['Primary Indigo FAB', 'Emerald Fast Attendance FAB'],
    designAndUsageRules: 'Posicionado no canto inferior direito (`bottom-6 right-6`). Z-index superior (z-40). Oculto em fluxos focados como modais.'
  },
  {
    componentId: 'CMP-04',
    componentName: 'Student Attendance Card',
    purpose: 'Card tátil responsivo para marcar presença, falta ou justificativa de um aluno com apenas um toque.',
    propsAndApi: ['studentId: string', 'studentName: string', 'callNumber: number', 'currentStatus: "P" | "F" | "FJ" | null', 'photoUrl?: string', 'pdiBadge?: boolean', 'onStatusChange: (status) => void'],
    supportedStates: ['Unselected (Border Slate-200, Gray BG)', 'Present Selected (Emerald-500 Solid Border & Light BG)', 'Absent Selected (Red-500 Solid Border & Light BG)', 'Justified Selected (Amber-500 Solid Border & Light BG)'],
    variations: ['Compact List Row (Mobile)', 'Full Grid Card (Tablet/Desktop)'],
    designAndUsageRules: 'Área de clique de pelo menos 60px de altura. Resposta visual otimista instantânea (< 16ms) antes de persistir no IndexedDB.'
  },
  {
    componentId: 'CMP-05',
    componentName: 'AI Aurora Suggestion Box',
    purpose: 'Apresentar sugestões pedagógicas da IA Aurora de forma não intrusiva com controle total de aceite pelo professor.',
    propsAndApi: ['title: string', 'content: string', 'bnccCodes?: string[]', 'confidenceScore?: number', 'onAccept: () => void', 'onEdit: () => void', 'onDiscard: () => void'],
    supportedStates: ['Idle/Collapsed', 'Expanded Suggestion', 'Applying State (Loading Indicator)', 'Applied Checkmark'],
    variations: ['Lesson Plan Suggestion', 'Descriptor Report Copilot', 'PDI Accommodation Tip'],
    designAndUsageRules: 'Usar cor Violeta/Roxa característica da Aurora. Sempre disponibilizar os botões "Aceitar Sugestão", "Editar com Aurora" e "Descartar".'
  },
  {
    componentId: 'CMP-06',
    componentName: 'Notification & Toast Banner',
    purpose: 'Exibir feedbacks temporários de ações (sucesso ao salvar, aviso de offline, erro de validação).',
    propsAndApi: ['title: string', 'message: string', 'type: "success" | "warning" | "error" | "info" | "offline"', 'durationMs?: number', 'onDismiss?: () => void'],
    supportedStates: ['Entering (Slide-in top-right 200ms)', 'Visible', 'Exiting (Fade-out 150ms)'],
    variations: ['Floating Toast', 'Top Fixed Offline Sync Bar'],
    designAndUsageRules: 'Desaparecer automaticamente após 4 segundos (exceto avisos offline que permanecem fixos até o retorno da rede).'
  },
  {
    componentId: 'CMP-07',
    componentName: 'Command Palette (Ctrl + K)',
    purpose: 'Navegação por teclado rápida e busca universal por alunos, turmas, planos e ações em qualquer tela.',
    propsAndApi: ['isOpen: boolean', 'onClose: () => void', 'onSelectAction: (action) => void'],
    supportedStates: ['Closed', 'Open Overlay with Backdrop Blur', 'Searching Results', 'Empty Search Result'],
    variations: ['Universal Command Palette'],
    designAndUsageRules: 'Ativado por `Ctrl+K` ou `Cmd+K`. Permite digitar nomes de alunos para ir direto ao perfil ou "fazer chamada".'
  },
  {
    componentId: 'CMP-08',
    componentName: 'Modal Dialog & Slide-over Drawer',
    purpose: 'Painéis sobrepostos para tarefas focadas sem perder o contexto da tela atual (ex: ver laudo PDI ou selecionar códigos BNCC).',
    propsAndApi: ['isOpen: boolean', 'title: string', 'subtitle?: string', 'children: ReactNode', 'onClose: () => void', 'footerActions?: ReactNode'],
    supportedStates: ['Opening (Backdrop fade-in + Panel scale-up 200ms)', 'Open with Focus Trap', 'Closing'],
    variations: ['Centered Modal (Confirmations & BNCC Picker)', 'Right Slide-Over Drawer (PDI & Student Details)'],
    designAndUsageRules: 'Bloquear rolagem da página ao fundo. Permitir fechar pressionando `ESC` ou clicando no backdrop.'
  },
  {
    componentId: 'CMP-09',
    componentName: 'Loading Skeleton',
    purpose: 'Mascarar a latência do carregamento de dados exibindo a estrutura visual antes do preenchimento real do texto.',
    propsAndApi: ['variant: "card" | "text-row" | "avatar" | "table-row"', 'count?: number'],
    supportedStates: ['Pulse Animation (Shimmer leve Slate-200 -> Slate-100)'],
    variations: ['Cockpit Card Skeleton', 'Attendance List Skeleton', 'AI Stream Loading Line'],
    designAndUsageRules: 'Manter exatamente a mesma dimensão e layout do componente final para evitar saltos visuais (CLS).'
  },
  {
    componentId: 'CMP-10',
    componentName: 'Empty State Placeholder',
    purpose: 'Orientar o professor de forma acolhedora quando não houver dados cadastrados ou durante a primeira semana de uso.',
    propsAndApi: ['illustrationIcon: ReactNode', 'title: string', 'description: string', 'actionButtonLabel?: string', 'onActionButtonClick?: () => void'],
    supportedStates: ['Static Clean Display'],
    variations: ['No Class Assigned', 'No Lesson Plans Created', 'No Reports Found', 'Offline Database Empty'],
    designAndUsageRules: 'Usar ilustração amigável, mensagem positiva no tom do EducaFlow e um botão de ação direto para resolver a ausência de dados.'
  }
];

// === 3. OFFICIAL 10 MVP SCREENS SPECIFICATIONS (13 DIMENSIONS EACH) ===

export const MVP_SCREENS_MASTER_LIST: MvpScreenMasterSpec[] = [
  // --- SCREEN 01 ---
  {
    screenId: 'SCREEN-01',
    screenName: 'Login & Autenticação Segura',
    routePath: '/login',
    objective: {
      problemSolved: 'Garantir acesso instantâneo e seguro do professor ao sistema sem fricção ou esquecimento de senhas complexas.',
      whenItAppears: 'No primeiro acesso ou quando a sessão de autenticação do Supabase expirar.',
      connectionToTeacherFlow: 'Porta de entrada do sistema que carrega as credenciais e sincroniza o perfil do professor para o IndexedDB.'
    },
    layout: {
      headerSpec: 'Sem header superior. Logotipo oficial EducaFlow centralizado no topo com selo de segurança "Acesso do Educador".',
      sidebarSpec: 'Sem sidebar. Tela limpa focada 100% no formulário de acesso.',
      cardsAndGridSpec: 'Card centralizado de 420px de largura em desktops, com elevação suave, borda hairline Slate-200 e fundo branco puro.',
      buttonsInputsIconsSpec: 'Campo de E-mail Institucional com ícone de envelope, Campo de Senha com alternador de visibilidade (ícone olho), Botão Primário "Entrar no Cockpit" de 48px de altura.',
      alertsBreadcrumbsFabSpec: 'Alerta flutuante de erro de credencial em vermelho suave acima do botão. Sem FAB ou breadcrumbs.',
      menusPanelsSpacingSpec: 'Espaçamento vertical de 24px entre campos. Link "Esqueci minha senha" alinhado à direita.',
      hierarchyAndResponsiveness: 'Responsividade total: ocupa 100% da largura no mobile com margens de 16px e padding interno de 20px.'
    },
    componentsUsedIds: ['CMP-01', 'CMP-02', 'CMP-06'],
    states: {
      emptyState: 'Campos de e-mail e senha limpos com foco inicial automático no e-mail.',
      firstAccessState: 'Mensagem de boas-vindas: "Bem-vindo ao EducaFlow! Digite seu e-mail da rede municipal para começar."',
      loadingState: 'Botão "Entrar no Cockpit" exibe spinner e fica desabilitado durante a validação no Supabase Auth.',
      offlineState: 'Aviso amarelo: "Você está offline. Se já acessou anteriormente neste aparelho, você entrará no modo offline local."',
      errorState: 'Mensagem vermelha com borda: "E-mail ou senha incorretos. Verifique suas credenciais da prefeitura."',
      successState: 'Feedback verde "Sessão autenticada! Redirecionando..." e transição suave para o Cockpit.',
      syncingState: 'Carregando perfil e turmas do Supabase para o Dexie.js local.',
      noResultsState: 'N/A',
      incompleteDataState: 'Botão desabilitado se o e-mail não estiver em formato válido ou a senha tiver menos de 6 caracteres.',
      noClassAssignedState: 'Redireciona para o Cockpit com estado de "Professor Sem Turma".',
      firstWeekState: 'Exibe dica sobre acesso automático salvo no navegador.'
    },
    microInteractions: {
      hoverAndFocus: 'Campos ganham borda Indigo-500 e anel de foco de 2px ao receber digitação.',
      clickAndLoading: 'Efeito de pulso suave no botão ao clicar com transição de 150ms.',
      transitionsAndConfirmations: 'Transição da tela de login para o Cockpit em fade-in de 300ms.',
      motionTimingAndEasing: 'Easing cubic-bezier(0.16, 1, 0.3, 1) para animação do formulário.'
    },
    cognitiveFlow: {
      teacherThoughtProcess: '"Preciso entrar rápido antes da aula começar sem me atrapalhar com senhas."',
      primaryActionDesired: 'Digitar e-mail e senha e clicar em Entrar.',
      firstInformationToSee: 'Logotipo do EducaFlow e campo de e-mail limpo.',
      whatNeverDistracts: 'Banners institucionais longos ou propagandas do governo.',
      anxietyReductionStrategy: 'Mensagem clara de que o login offline é suportado caso o Wi-Fi da escola caia.',
      cognitiveLoadReductionStrategy: 'Foco automático no primeiro campo e botão grande de acionamento único.'
    },
    copywriting: {
      buttonsText: ['Entrar no Cockpit', 'Esqueci minha senha', 'Entrar em Modo Offline'],
      messagesAndAlerts: ['Acesso exclusivo para professores da Rede Municipal de Ensino.', 'Sua conexão é criptografada e em conformidade com a LGPD.'],
      errorsAndToasts: ['E-mail ou senha inválidos.', 'Sem conexão com a internet para autenticação inicial.'],
      emptyStatesText: ['Nenhum cadastro encontrado para este e-mail.'],
      offlineMessagesText: ['Entrando em modo offline com credenciais salvas no dispositivo.'],
      auroraAiMessagesText: ['Aurora aguarda sua autenticação para preparar o resumo da aula.'],
      placeholdersAndTooltips: ['seu.nome@educacao.gov.br', '••••••••', 'Clique para ver a senha']
    },
    responsiveness: {
      desktopLayout: 'Card de 420px centralizado em tela cheia com ilustração leve à esquerda.',
      laptopLayout: 'Card centralizado com largura de 400px.',
      tabletLayout: 'Card centralizado preenchendo 60% da largura da tela.',
      mobileLayout: 'Ocupa 100% da largura do celular com padding de 20px e botões de toque fácil (48px).',
      pwaAndOrientation: 'Suporte a modo retrato e paisagem mantendo o formulário sempre centralizado.'
    },
    accessibility: {
      keyboardNavigation: 'Tabulação sequencial: E-mail -> Senha -> Esqueci Senha -> Botão Entrar.',
      screenReadersAndAria: 'Rótulos `aria-label` transparentes para campos e avisos de erro em `aria-live="assertive"`.',
      contrastAndTouchTargets: 'Contraste de texto 7:1 em relação ao fundo. Áreas de toque de 48px.',
      typographyScaleAndZoom: 'Suporta zoom de 200% do navegador sem sobrepor textos ou quebrar o layout.'
    },
    businessRules: {
      allowedUserActions: ['Fazer login', 'Recuperar senha', 'Acessar offline se pré-autenticado'],
      forbiddenActions: ['Criar conta sem convite da Secretaria de Educação'],
      disabledConditions: ['Botão de login desabilitado enquanto e-mail ou senha não forem preenchidos'],
      aiSuggestionVsHumanConfirmationRules: 'A IA não interfere nas credenciais de autenticação por razões de segurança.'
    },
    auroraIntegration: {
      whenAppears: 'Aparece apenas após o login efetuado com sucesso para dar as boas-vindas no Cockpit.',
      whenSilent: 'Totalmente silenciosa na tela de login.',
      whenSuggests: 'N/A',
      whenAsks: 'N/A',
      whenDisappears: 'Sempre oculta durante o processo de autenticação.',
      visualNonCompetitionRule: 'Nenhum avatar ou elemento flutuante da IA é exibido na tela de login.'
    },
    perceivedPerformance: {
      maskingLatency: 'Feedback visual instantâneo ao clicar em Entrar.',
      skeletonsAndOptimisticUi: 'Sem skeletons no login, apenas estado de carregamento interno no botão.',
      streamingAndPreloading: 'Pré-carregamento dos dados do Dexie.js durante o processo de autenticação.'
    },
    acceptanceCriteria: [
      'Validação de formulário em tempo real sem chamadas desnecessárias à API.',
      'Suporte a login em modo offline para usuários com credencial previamente cacheada.',
      'Conformidade WCAG 2.2 AA com contraste superior a 4.5:1.'
    ]
  },

  // --- SCREEN 02 ---
  {
    screenId: 'SCREEN-02',
    screenName: 'Cockpit Unificado do Professor',
    routePath: '/dashboard',
    objective: {
      problemSolved: 'Fornecer uma visão centralizada das aulas do dia, atalhos de chamada ultrarrápida e lembretes de pendências em uma única tela sem navegação profunda.',
      whenItAppears: 'Logo após o login ou ao clicar no logotipo/home da barra de navegação.',
      connectionToTeacherFlow: 'Centro de comando do professor de onde ele dispara a chamada, inicia os planos de aula e vê avisos da coordenação.'
    },
    layout: {
      headerSpec: 'Header fixo contendo nome do professor, badge de status da rede (Online/Offline) e botão de sincronização com contagem de pendências.',
      sidebarSpec: 'Sidebar retrátil à esquerda com ícones para Cockpit, Chamada, Diário, Planos, Pareceres, PDI e Configurações.',
      cardsAndGridSpec: 'Grid de 3 colunas no desktop: Coluna 1 (Próxima Aula e Chamada Rápida), Coluna 2 (Avisos e Pendências BNCC), Coluna 3 (Painel de Inclusão e Copiloto Aurora).',
      buttonsInputsIconsSpec: 'Botão destacado "Iniciar Chamada Rápida (Turma 3B)", cards clicáveis de atalho e campo de busca rápida por aluno.',
      alertsBreadcrumbsFabSpec: 'Breadcrumb: Home / Cockpit. FAB verde no canto inferior para acionar chamada em 1 toque.',
      menusPanelsSpacingSpec: 'Gaps de 16px entre cards. Painel da Aurora posicionado no topo com gradiente roxo sutil.',
      hierarchyAndResponsiveness: 'Em telas menores o grid colapsa para coluna única com prioridade total para o botão de Chamada Rápida.'
    },
    componentsUsedIds: ['CMP-01', 'CMP-03', 'CMP-05', 'CMP-06', 'CMP-09'],
    states: {
      emptyState: 'Quando o professor não possui aulas cadastradas no dia, exibe card amigável "Dia sem aulas agendadas".',
      firstAccessState: 'Tour guiado em 3 passos destacando o botão de chamada rápida e a caixa da Aurora.',
      loadingState: 'Skeletons pulsantes nos cards de aulas e pendências.',
      offlineState: 'Badge no header muda para "Modo Offline (Dexie.js)" e mostra total de registros salvos localmente.',
      errorState: 'Banner sutil no topo se falhar a sincronização com o Supabase com botão "Tentar Novamente".',
      successState: 'Toast verde ao concluir a chamada do dia: "Presença da Turma 3B salva no dispositivo!"',
      syncingState: 'Ícone de rotação no header indicando envio dos dados pendentes ao servidor.',
      noResultsState: 'Busca rápida de aluno não encontra correspondência.',
      incompleteDataState: 'Aviso de "3 diários pendentes de preenchimento de conteúdo".',
      noClassAssignedState: 'Card informativo pedindo para contatar a secretaria para vinculação de turmas.',
      firstWeekState: 'Mensagem de incentivo da Aurora: "Sua primeira semana com o EducaFlow! Precisa de ajuda com o planejamento BNCC?"'
    },
    microInteractions: {
      hoverAndFocus: 'Cards levantam 2px ao passar o mouse com sombra leve em 150ms.',
      clickAndLoading: 'Botão de chamada expande com ripple visual antes da transição de rota.',
      transitionsAndConfirmations: 'Mudança de dados entre abas com animação de fade suave.',
      motionTimingAndEasing: 'Animação de cards surgindo em cascata (stagger 50ms).'
    },
    cognitiveFlow: {
      teacherThoughtProcess: '"O que eu preciso fazer AGORA nesta aula?"',
      primaryActionDesired: 'Clicar no botão grande para fazer a chamada da turma atual.',
      firstInformationToSee: 'A turma da aula atual, o horário e o botão de chamada.',
      whatNeverDistracts: 'Estatísticas complexas de anos anteriores ou relatórios administrativos irrelevantes.',
      anxietyReductionStrategy: 'Garantia visual com ícone de check verde nos diários que já foram preenchidos hoje.',
      cognitiveLoadReductionStrategy: 'Apenas as informações do DIA visíveis por padrão.'
    },
    copywriting: {
      buttonsText: ['Iniciar Chamada Rápida', 'Novo Plano BNCC', 'Sincronizar Agora', 'Ver Alunos PDI'],
      messagesAndAlerts: ['Você tem 1 aula agendada para esta manhã.', 'Sua rede está offline. Dados seguros no tablet.'],
      errorsAndToasts: ['Falha ao sincronizar com a nuvem. Tentaremos automaticamente em breve.'],
      emptyStatesText: ['Nenhuma aula restante para o dia de hoje. Bom trabalho!'],
      offlineMessagesText: ['3 chamadas e 1 plano salvos localmente aguardando conexão.'],
      auroraAiMessagesText: ['Olá Professora Elena! Preparei uma sugestão de aula sobre Geometria para a Turma 3B.'],
      placeholdersAndTooltips: ['Buscar aluno por nome ou número...', 'Clique para abrir o diário de classe']
    },
    responsiveness: {
      desktopLayout: 'Grid de 3 colunas com sidebar expandida.',
      laptopLayout: 'Grid de 2 colunas com sidebar encolhida apenas com ícones.',
      tabletLayout: 'Grid de 2 colunas com menu gaveta superior.',
      mobileLayout: 'Coluna única na ordem: Chamada Rápida -> Avisos -> Aurora. FAB fixo na tela.',
      pwaAndOrientation: 'Visualização perfeita tanto em tablets na horizontal quanto celulares na vertical.'
    },
    accessibility: {
      keyboardNavigation: 'Atalho `Alt+1` foca direto no botão de Chamada Rápida. Tabulação lógica entre cards.',
      screenReadersAndAria: 'Regiões `aria-live` para atualizações de sincronização e avisos do sistema.',
      contrastAndTouchTargets: 'Todos os botões com no mínimo 44x44px. Texto cinza escuro sobre fundo claro.',
      typographyScaleAndZoom: 'Layout flexível que se adapta até 200% de escala sem barra de rolagem horizontal.'
    },
    businessRules: {
      allowedUserActions: ['Iniciar chamada da aula atual', 'Criar novo plano', 'Ver avisos', 'Forçar sincronização'],
      forbiddenActions: ['Editar dados de turmas de outros professores sem permissão'],
      disabledConditions: ['Sincronizar desabilitado se não houver itens na fila offline'],
      aiSuggestionVsHumanConfirmationRules: 'Sugestões de planos da Aurora devem ser explicitamente aceitas pelo professor.'
    },
    auroraIntegration: {
      whenAppears: 'Aparece no card de destaque superior com conselhos para as aulas do dia.',
      whenSilent: 'Fica em silêncio quando o professor inicia o fluxo de chamada.',
      whenSuggests: 'Oferece atalhos para planos de aula com base na disciplina do horário atual.',
      whenAsks: 'Pergunta se o professor deseja carregar a aula planejada anteriormente.',
      whenDisappears: 'Minimiza para o canto caso o professor feche o card da IA.',
      visualNonCompetitionRule: 'Ocupa área própria com tom violeta sem sobrepor os botões de chamada.'
    },
    perceivedPerformance: {
      maskingLatency: 'Carregamento instantâneo das aulas a partir do Dexie.js local em < 50ms.',
      skeletonsAndOptimisticUi: 'Skeletons utilizados caso o IndexedDB esteja inicializando.',
      streamingAndPreloading: 'Pré-carregamento dos nomes dos alunos da turma atual em segundo plano.'
    },
    acceptanceCriteria: [
      'Carregamento da tela inicial em menos de 100ms utilizando dados do Dexie.js.',
      'Acesso ao botão de chamada ultrarrápida em no máximo 1 clique.',
      'Sincronização em segundo plano sem travar a interface do usuário.'
    ]
  },

  // --- SCREEN 03 ---
  {
    screenId: 'SCREEN-03',
    screenName: 'Chamada Ultrarrápida Tátil',
    routePath: '/diario/chamada',
    objective: {
      problemSolved: 'Permitir o registro de presença e faltas de uma turma de 30 alunos em menos de 30 segundos, sem consumo excessivo de tempo de aula.',
      whenItAppears: 'Ao clicar no botão "Iniciar Chamada Rápida" no Cockpit ou via atalho FAB.',
      connectionToTeacherFlow: 'Ação diária mandatória executada no início de cada período escolar.'
    },
    layout: {
      headerSpec: 'Barra da chamada com nome da Turma (ex: Turma 3B - Matemática), total de alunos e contador de presentes/ausentes em tempo real.',
      sidebarSpec: 'Sidebar recolhida automaticamente para dar espaço máximo à lista de alunos.',
      cardsAndGridSpec: 'Lista de alunos em cards horizontais de toque rápido com foto, número de chamada, nome e 3 botões táticos (P = Presente, F = Falta, FJ = Justificada).',
      buttonsInputsIconsSpec: 'Botão "Marcar Todos como Presentes" no topo, botões coloridos de presença em cada linha e botão flutuante "Salvar Chamada".',
      alertsBreadcrumbsFabSpec: 'Aviso visual se houver alunos com PDI (ícone de coração/inclusão ao lado do nome).',
      menusPanelsSpacingSpec: 'Padding amplo entre cartões de alunos (12px) para evitar toques acidentais.',
      hierarchyAndResponsiveness: 'Em celulares os botões P, F, FJ ocupam a lateral direita da linha com tamanho aumentado.'
    },
    componentsUsedIds: ['CMP-01', 'CMP-04', 'CMP-06', 'CMP-10'],
    states: {
      emptyState: 'Caso a turma não tenha alunos matriculados, mostra "Nenhum aluno cadastrado nesta turma".',
      firstAccessState: 'Dica flutuante: "Toque em P para Presente ou F para Falta. Você também pode marcar todos de uma vez!"',
      loadingState: 'Skeleton da lista de alunos com 10 linhas pulsantes.',
      offlineState: 'Gravação 100% garantida no IndexedDB com badge "Chamada será salva no aparelho".',
      errorState: 'Toast de aviso se uma alteração de presença falhar na gravação local.',
      successState: 'Animação de confete sutil ou checkmark verde ao salvar: "Chamada da Turma 3B concluída em 18s!"',
      syncingState: 'Indicador discreto enviando presenças para o Supabase.',
      noResultsState: 'Busca por aluno na chamada não encontra resultado.',
      incompleteDataState: 'Aviso se restarem alunos sem marcação antes de salvar.',
      noClassAssignedState: 'N/A',
      firstWeekState: 'Tutorial rápido explicando o botão FJ (Falta Justificada).'
    },
    microInteractions: {
      hoverAndFocus: 'O card do aluno acende a borda ao receber toque ou navegação por seta do teclado.',
      clickAndLoading: 'Alternância instantânea da cor do botão (Verde para P, Vermelho para F, Âmbar para FJ) sem latência.',
      transitionsAndConfirmations: 'Salvar a chamada faz a tela retornar suavemente ao Cockpit com toast de confirmação.',
      motionTimingAndEasing: 'Animação de seleções com mola (spring) tátil e feedback vibratório em PWA móvel.'
    },
    cognitiveFlow: {
      teacherThoughtProcess: '"Preciso fazer a chamada sem perder a atenção da sala e sem gastar tempo de aula."',
      primaryActionDesired: 'Tocar rapidamente em P para a maioria e F para quem faltou.',
      firstInformationToSee: 'Lista de alunos organizada numericamente por ordem alfabética com botões P/F destacados.',
      whatNeverDistracts: 'Campos de notas, históricos antigos ou formulários longos.',
      anxietyReductionStrategy: 'Ação "Marcar Todos como Presentes" permite resolver 90% da chamada em 1 toque.',
      cognitiveLoadReductionStrategy: 'Cores de alto contraste e letras grandes P, F e FJ.'
    },
    copywriting: {
      buttonsText: ['Marcar Todos como Presentes', 'Salvar Chamada (30/30)', 'P', 'F', 'FJ', 'Editar PDI'],
      messagesAndAlerts: ['Todos os 28 alunos marcados.', 'Aluno Lucas possui plano PDI ativo.'],
      errorsAndToasts: ['Existem 2 alunos sem marcação. Deseja marcá-los como presentes?'],
      emptyStatesText: ['Nenhum aluno encontrado para esta chamada.'],
      offlineMessagesText: ['Chamada salva no banco de dados local do tablet.'],
      auroraAiMessagesText: ['Aurora detectou 3 faltas seguidas do aluno Mateus. Deseja registrar uma observação?'],
      placeholdersAndTooltips: ['P = Presente | F = Falta | FJ = Falta Justificada']
    },
    responsiveness: {
      desktopLayout: 'Tabela ampla de chamada com atalhos de teclado (Teclas P e F).',
      laptopLayout: 'Lista confortável com 2 colunas de alunos se a tela for larga.',
      tabletLayout: 'Lista em coluna única com botões de toque tátil otimizados para uso com polegar.',
      mobileLayout: 'Design 100% focado em uma mão. Botões de ação na zona de alcance dos polegares.',
      pwaAndOrientation: 'Suporte a vibração hápida (navigator.vibrate) ao selecionar presenças no PWA.'
    },
    accessibility: {
      keyboardNavigation: 'Teclas de seta para cima/baixo navegam entre alunos. Teclas P, F e J marcam o status instantaneamente.',
      screenReadersAndAria: 'Leitor de tela pronuncia: "Aluno 01: Ana Silva. Status atual: Presente. Pressione F para alterar para Falta."',
      contrastAndTouchTargets: 'Botões P e F com pelo menos 52px de altura e contraste mínimo de 5:1.',
      typographyScaleAndZoom: 'Nomes dos alunos legíveis mesmo sob luz solar forte ou telas pequenas.'
    },
    businessRules: {
      allowedUserActions: ['Marcar presença, falta e falta justificada', 'Marcar todos de uma vez', 'Adicionar observação rápida'],
      forbiddenActions: ['Alterar chamadas de datas retroativas sem autorização da coordenação'],
      disabledConditions: ['Salvar desabilitado se houver inconsistência grave de dados'],
      aiSuggestionVsHumanConfirmationRules: 'Alertas sobre faltas consecutivas são apenas informativos e exigem validação do professor.'
    },
    auroraIntegration: {
      whenAppears: 'Surge discretamente no rodapé apenas se detectar padrão anômalo de faltas em algum aluno.',
      whenSilent: 'Silenciosa durante todo o processo de marcação para não interromper o ritmo do professor.',
      whenSuggests: 'Sugere notificação para a coordenação em caso de faltas recorrentes.',
      whenAsks: 'Pergunta se deseja aplicar justificativa padrão em faltas atestadas.',
      whenDisappears: 'Desaparece imediatamente após o salvamento da chamada.',
      visualNonCompetitionRule: 'Fica contida em um banner estreito no topo ou rodapé sem cobrir os botões de chamada.'
    },
    perceivedPerformance: {
      maskingLatency: 'Atualização visual do estado do botão em 0 milissegundos (Optimistic UI puro).',
      skeletonsAndOptimisticUi: 'Sem atrasos de rede. Leitura e escrita totalmente locais via Dexie.js.',
      streamingAndPreloading: 'Dados da turma mantidos em memória RAM durante o uso da tela.'
    },
    acceptanceCriteria: [
      'Execução da chamada completa de 30 alunos em menos de 30 segundos.',
      'Suporte a atalhos de teclado completos para digitação ultrarrápida.',
      'Persistência imediata no IndexedDB garantindo zero perda de dados.'
    ]
  },

  // --- SCREEN 04 ---
  {
    screenId: 'SCREEN-04',
    screenName: 'Diário de Classe Executivo & Registro de Conteúdo',
    routePath: '/diario/conteudo',
    objective: {
      problemSolved: 'Registrar os conteúdos ministrados, tarefas de casa e observações pedagógicas com suporte de voz e atalhos BNCC.',
      whenItAppears: 'Após a chamada ou ao selecionar a aba "Diário de Conteúdo" na navegação principal.',
      connectionToTeacherFlow: 'Consolidação das atividades realizadas em sala de aula para prestação de contas oficial.'
    },
    layout: {
      headerSpec: 'Cabeçalho do Diário com seletor de data, disciplina e botão para puxar o planejamento da aula do dia.',
      sidebarSpec: 'Sidebar presente à esquerda permitindo navegação para os outros módulos.',
      cardsAndGridSpec: 'Área principal composta por 3 blocos: Editor de Conteúdo Ministrado, Seleção de Objetivos BNCC da Aula e Caixa de Tarefa de Casa / Observações.',
      buttonsInputsIconsSpec: 'Campo de texto rico (Rich Text ou Markdown leve), botão de Ditado por Voz (Microfone), seletor de códigos BNCC em modal e botão "Salvar Registro".',
      alertsBreadcrumbsFabSpec: 'Breadcrumb: Diário / Registro de Conteúdo. Alerta de pendência de preenchimento se a data estiver sem registro.',
      menusPanelsSpacingSpec: 'Margens de 20px entre os campos de texto. Painel da Aurora lateral sugerindo resumo com base no plano.',
      hierarchyAndResponsiveness: 'Layout responsivo em 2 colunas no desktop (Editor de Conteúdo + Sugestões Aurora) e 1 coluna no mobile.'
    },
    componentsUsedIds: ['CMP-01', 'CMP-02', 'CMP-05', 'CMP-08', 'CMP-09'],
    states: {
      emptyState: 'Editor em branco para a data selecionada com botão "Carregar do Planejamento".',
      firstAccessState: 'Dica: "Você pode clicar em Ditado por Voz ou pedir para a Aurora rascunhar o conteúdo da aula de hoje."',
      loadingState: 'Skeleton das caixas de texto enquanto carrega o diário do IndexedDB.',
      offlineState: 'Aviso: "Diário sendo salvo localmente. Sincronizará quando houver internet."',
      errorState: 'Erro caso o campo de conteúdo seja salvo totalmente em branco.',
      successState: 'Toast: "Registro de aula da Turma 3B salvo com sucesso!"',
      syncingState: 'Sincronizando com o Supabase em segundo plano.',
      noResultsState: 'Busca por objetivo BNCC não encontra resultados no modal.',
      incompleteDataState: 'Indicação amarela se faltar associar pelo menos um código BNCC.',
      noClassAssignedState: 'N/A',
      firstWeekState: 'Mensagem explicativa sobre a validação dos registros pela coordenação.'
    },
    microInteractions: {
      hoverAndFocus: 'O campo de texto ativo destaca a borda com brilho suave e contador de palavras ativo no rodapé.',
      clickAndLoading: 'Ativação do microfone por voz faz pulsar uma onda sonora suave no botão.',
      transitionsAndConfirmations: 'Carregar conteúdo do planejamento preenche o editor com animação de digitação progressiva.',
      motionTimingAndEasing: 'Abertura do modal de busca BNCC em 200ms ease-out.'
    },
    cognitiveFlow: {
      teacherThoughtProcess: '"Preciso registrar o que ensinei hoje sem ter que digitar parágrafos enormes no celular."',
      primaryActionDesired: 'Preencher o conteúdo rapidamente usando o plano de aula já criado ou ditado por voz.',
      firstInformationToSee: 'A data do diário, a disciplina e o botão "Importar do Plano".',
      whatNeverDistracts: 'Menus administrativos ou históricos de anos anteriores.',
      anxietyReductionStrategy: 'Botão "Importar do Plano" preenche 100% do diário automaticamente em 1 clique.',
      cognitiveLoadReductionStrategy: 'Contador automático de caracteres e salvamento automático a cada 10 segundos.'
    },
    copywriting: {
      buttonsText: ['Importar do Plano de Aula', 'Gravar por Voz (Ditado)', 'Selecionar Códigos BNCC', 'Salvar Diário de Conteúdo'],
      messagesAndAlerts: ['Conteúdo alinhado à habilidade EF03MA05.', 'Salvamento automático realizado há 2 min.'],
      errorsAndToasts: ['O campo de conteúdo ministrado não pode ficar vazio.'],
      emptyStatesText: ['Nenhum registro de conteúdo preenchido para a data de hoje.'],
      offlineMessagesText: ['Registro gravado localmente no banco de dados do navegador.'],
      auroraAiMessagesText: ['Deseja que eu resuma a aula planejada "Geometria Espacial" no diário de hoje?'],
      placeholdersAndTooltips: ['Descreva brevemente o conteúdo trabalhado em sala...', 'Clique para falar']
    },
    responsiveness: {
      desktopLayout: 'Editor lado a lado com a caixa de sugestões e busca BNCC.',
      laptopLayout: 'Editor amplo com painel lateral recolhível da Aurora.',
      tabletLayout: 'Editor focado com botões de ação na barra superior.',
      mobileLayout: 'Editor vertical em coluna única com botão de ditado por voz em destaque para facilitar a digitação móvel.',
      pwaAndOrientation: 'Suporte a entrada por voz nativa da API do navegador Web Speech.'
    },
    accessibility: {
      keyboardNavigation: 'Atalhos de teclado para negrito (`Ctrl+B`), itálico (`Ctrl+I`) e abertura do seletor BNCC (`Alt+B`).',
      screenReadersAndAria: 'Editor de texto com marcação `aria-multiline="true"` e rótulos acessíveis em todos os controles.',
      contrastAndTouchTargets: 'Área de clique do botão de microfone ampliada para 56px de diâmetro.',
      typographyScaleAndZoom: 'Texto digitado em tamanho mínimo de 16px para leitura confortável sem necessidade de zoom.'
    },
    businessRules: {
      allowedUserActions: ['Registrar conteúdo', 'Importar do plano', 'Usar ditado por voz', 'Vincular código BNCC'],
      forbiddenActions: ['Editar diários de datas que já foram homologados e encerrados pela direção'],
      disabledConditions: ['Salvar desabilitado se não houver texto no conteúdo ministrado'],
      aiSuggestionVsHumanConfirmationRules: 'O texto importado ou gerado pela IA sempre permanece editável pelo professor.'
    },
    auroraIntegration: {
      whenAppears: 'Oferece o botão de síntese automática quando o professor abre a tela de diário.',
      whenSilent: 'Permanece em silêncio enquanto o professor digita ativamente.',
      whenSuggests: 'Sugere inclusão de códigos BNCC relacionados às palavras-chave digitadas.',
      whenAsks: 'Pergunta se o conteúdo deve ser replicado para outras turmas da mesma disciplina.',
      whenDisappears: 'Minimiza quando o diário é salvo com sucesso.',
      visualNonCompetitionRule: 'Fica posicionada no painel lateral de assistência pedagógica.'
    },
    perceivedPerformance: {
      maskingLatency: 'Salvamento automático local instantâneo a cada tecla digitada (Debounce 500ms).',
      skeletonsAndOptimisticUi: 'Exibição imediata da estrutura da página sem aguardar confirmações de rede.',
      streamingAndPreloading: 'Carregamento prévio do plano de aula correspondente ao dia.'
    },
    acceptanceCriteria: [
      'Recurso de importação do plano de aula em 1 clique funcionando perfeitamente.',
      'Suporte a salvamento automático local no IndexedDB sem perda de dados.',
      'Ditado por voz funcional em navegadores modernos compatíveis.'
    ]
  },

  // --- SCREEN 05 ---
  {
    screenId: 'SCREEN-05',
    screenName: 'Planejador Inteligente BNCC',
    routePath: '/planos/novo',
    objective: {
      problemSolved: 'Eliminar a burocracia do planejamento escolar permitindo criar planos de aula completos e alinhados à BNCC em menos de 2 minutos.',
      whenItAppears: 'Ao selecionar a opção "Novo Plano de Aula" no menu ou no Cockpit.',
      connectionToTeacherFlow: 'Etapa inicial de planejamento pedagógico semanal/mensal.'
    },
    layout: {
      headerSpec: 'Header da ferramenta com título "Gerador de Plano BNCC", seletor de Turma/Ano e botão de ajuda rápida.',
      sidebarSpec: 'Sidebar recolhida para maximizar o espaço de criação do plano.',
      cardsAndGridSpec: 'Wizard em 3 etapas simples: Etapa 1 (Tema e Componente Curricular), Etapa 2 (Seleção de Habilidades BNCC), Etapa 3 (Geração e Adaptação PDI).',
      buttonsInputsIconsSpec: 'Inputs com autocompletar de temas, modal de catálogo BNCC com busca por palavra-chave, toggle "Incluir Adaptação para Alunos PDI" e Botão "Gerar Plano com Aurora".',
      alertsBreadcrumbsFabSpec: 'Breadcrumb: Planos / Novo Plano. Card roxo de destaque com o assistente inteligente Aurora.',
      menusPanelsSpacingSpec: 'Passos numerados (Step 1, Step 2, Step 3) no topo com barra de progresso visual.',
      hierarchyAndResponsiveness: 'Etapas claras e sequenciais que se adaptam a qualquer tamanho de tela.'
    },
    componentsUsedIds: ['CMP-01', 'CMP-02', 'CMP-05', 'CMP-08', 'CMP-09'],
    states: {
      emptyState: 'Formulário limpo aguardando a seleção do componente curricular e tema da aula.',
      firstAccessState: 'Mensagem de boas-vindas da Aurora explicando como a IA busca habilidades oficiais da BNCC.',
      loadingState: 'Animação de geração do plano com efeito de pulso e barra de progresso em tempo real.',
      offlineState: 'Aviso: "Modo offline. Você pode criar rascunhos de planos com códigos BNCC salvos no dispositivo."',
      errorState: 'Erro caso nenhuma habilidade BNCC seja selecionada antes de avançar.',
      successState: 'Animação de sucesso e transição para o Editor de Plano completo.',
      syncingState: 'Gravando rascunho no Dexie.js local.',
      noResultsState: 'Busca na base da BNCC não encontra códigos com o termo digitado.',
      incompleteDataState: 'Botão de gerar desabilitado até preencher tema e selecionar ao menos 1 habilidade.',
      noClassAssignedState: 'N/A',
      firstWeekState: 'Exemplos de temas sugeridos ("Frações no Cotidiano", "Sistema Solar", etc).'
    },
    microInteractions: {
      hoverAndFocus: 'Chips de códigos BNCC piscam suavemente ao serem adicionados ou removidos.',
      clickAndLoading: 'Botão "Gerar Plano com Aurora" ativa brilho gradiente enquanto a IA processa.',
      transitionsAndConfirmations: 'Transição entre as etapas do wizard com animação lateral de 200ms.',
      motionTimingAndEasing: 'Animação suave de entrada dos códigos BNCC selecionados.'
    },
    cognitiveFlow: {
      teacherThoughtProcess: '"Preciso achar as habilidades corretas da BNCC sem ter que ler um documento de 600 páginas."',
      primaryActionDesired: 'Digitar o tema da aula e deixar a IA sugerir as habilidades correspondentes.',
      firstInformationToSee: 'Seletor de disciplina e campo para digitar o tema da aula.',
      whatNeverDistracts: 'Jargões técnicos desnecessários de desenvolvimento de software.',
      anxietyReductionStrategy: 'Garantia de que os códigos BNCC sugeridos pertencem ao catálogo oficial do MEC.',
      cognitiveLoadReductionStrategy: 'Busca inteligente por palavra-chave simples (ex: "fração", "fotossíntese").'
    },
    copywriting: {
      buttonsText: ['Buscar Habilidades BNCC', 'Gerar Plano com Aurora', 'Avançar para Adaptação', 'Salvar Rascunho'],
      messagesAndAlerts: ['Códigos oficiais do MEC para o 3º Ano do Ensino Fundamental.', 'Sua turma possui 1 aluno com PDI ativo.'],
      errorsAndToasts: ['Selecione ao menos uma habilidade da BNCC para continuar.'],
      emptyStatesText: ['Nenhuma habilidade selecionada ainda. Digite um termo para buscar.'],
      offlineMessagesText: ['Criando plano em modo offline com catálogo local da BNCC.'],
      auroraAiMessagesText: ['Encontrei 3 habilidades ideais para o tema "Adição e Subtração". Deseja incluí-las?'],
      placeholdersAndTooltips: ['Ex: Geometria Espacial, Cadeia Alimentar...', 'Clique para selecionar habilidades']
    },
    responsiveness: {
      desktopLayout: 'Wizard amplo em 3 colunas com visualização prévia em tempo real.',
      laptopLayout: 'Formulário em 2 colunas com lista de habilidades selecionadas à direita.',
      tabletLayout: 'Wizard em etapas verticais com navegação por abas.',
      mobileLayout: 'Passo a passo sequencial com botões de "Avançar" e "Voltar" fixos no rodapé móvel.',
      pwaAndOrientation: 'Excelente usabilidade em telas na vertical com modais ajustados.'
    },
    accessibility: {
      keyboardNavigation: 'Teclas de seta navegam entre os códigos da BNCC no modal. `Enter` seleciona/desseleciona.',
      screenReadersAndAria: 'Anúncio audível de habilidades adicionadas: "Habilidade EF03MA05 adicionada ao plano."',
      contrastAndTouchTargets: 'Chips de códigos com padding mínimo de 12px e contraste alto.',
      typographyScaleAndZoom: 'Modais de busca expansíveis sem perda de funcionalidade em zoom alto.'
    },
    businessRules: {
      allowedUserActions: ['Digitar temas', 'Buscar códigos BNCC', 'Ativar adaptação PDI', 'Gerar e editar planos'],
      forbiddenActions: ['Gerar planos sem vincular a uma disciplina oficial'],
      disabledConditions: ['Gerar com IA desabilitado se não houver conectividade nem modelo local disponível'],
      aiSuggestionVsHumanConfirmationRules: 'O plano gerado pela IA é uma proposta e só se torna oficial após salvamento pelo professor.'
    },
    auroraIntegration: {
      whenAppears: 'Atuante no passo 2 e 3 para sugerir objetivos pedagógicos e metodologias.',
      whenSilent: 'Silenciosa enquanto o professor busca códigos manualmente.',
      whenSuggests: 'Sugere atividades práticas, recursos didáticos e formas de avaliação.',
      whenAsks: 'Pergunta se o plano deve incluir estratégias para alunos neurodivergentes.',
      whenDisappears: 'Redireciona junto com o usuário para o Editor de Plano.',
      visualNonCompetitionRule: 'Aparece em caixa destacada com selo da Aurora sem ocultar o formulário principal.'
    },
    perceivedPerformance: {
      maskingLatency: 'Busca instantânea de códigos BNCC na base local do navegador.',
      skeletonsAndOptimisticUi: 'Efeito de digitação em streaming (SSE) enquanto a Aurora gera o texto do plano.',
      streamingAndPreloading: 'Pré-carregamento dos códigos BNCC da disciplina selecionada.'
    },
    acceptanceCriteria: [
      'Geração de proposta de plano de aula completo em menos de 10 segundos via streaming.',
      'Garantia de inclusão exclusiva de códigos reais e existentes da BNCC.',
      'Suporte a alternância para modo de adaptação inclusiva (PDI) em 1 clique.'
    ]
  },

  // --- SCREEN 06 ---
  {
    screenId: 'SCREEN-06',
    screenName: 'Editor de Plano de Aula & Ajustes da IA',
    routePath: '/planos/[id]',
    objective: {
      problemSolved: 'Revisar, personalizar e ajustar detalhadamente o plano de aula gerado, permitindo exportação e alteração em tempo real.',
      whenItAppears: 'Logo após gerar um plano ou ao selecionar um plano existente na lista.',
      connectionToTeacherFlow: 'Refinamento do planejamento pedagógico antes da aplicação na sala de aula.'
    },
    layout: {
      headerSpec: 'Barra do editor com título do plano, badge de status (Rascunho / Concluído), botão de exportar PDF e botão de salvar.',
      sidebarSpec: 'Sidebar recolhida por padrão.',
      cardsAndGridSpec: 'Layout em 2 blocos: Bloco Principal (Objetivos, Metodologia, Cronograma da Aula e Avaliação) e Bloco da Aurora (Assistente de Reescrita e Ajuste de Tom).',
      buttonsInputsIconsSpec: 'Editores de texto livre para cada seção, botões de reescrita rápida da IA ("Tornar mais prático", "Simplificar linguagem"), tag de habilidades BNCC e botão de exportar.',
      alertsBreadcrumbsFabSpec: 'Breadcrumb: Planos / Editor / [Nome do Plano]. Caixas de destaque para recursos necessários.',
      menusPanelsSpacingSpec: 'Painel flutuante da Aurora à direita com comandos de refinamento rápido.',
      hierarchyAndResponsiveness: 'Leitura fluida dividida em cards estruturados por seções pedagógicas.'
    },
    componentsUsedIds: ['CMP-01', 'CMP-02', 'CMP-05', 'CMP-06', 'CMP-09'],
    states: {
      emptyState: 'Seção do plano em branco para preenchimento manual.',
      firstAccessState: 'Dica: "Você pode alterar qualquer texto do plano livremente ou pedir ajuda da Aurora para reescrever seções."',
      loadingState: 'Skeleton das seções do plano durante a busca no banco.',
      offlineState: 'Edição local mantida no Dexie.js sem interrupção.',
      errorState: 'Aviso se houver falha na requisição de reescrita com a IA.',
      successState: 'Toast: "Plano de aula atualizado com sucesso!"',
      syncingState: 'Sincronizando edições com a nuvem.',
      noResultsState: 'N/A',
      incompleteDataState: 'Aviso de campos sem preenchimento antes da exportação.',
      noClassAssignedState: 'N/A',
      firstWeekState: 'Destaque para o botão de impressão/exportação para PDF.'
    },
    microInteractions: {
      hoverAndFocus: 'Seções do plano ganham contorno ativo ao clicar para editar.',
      clickAndLoading: 'Botão de refinamento da Aurora exibe indicador de streaming dentro do campo editado.',
      transitionsAndConfirmations: 'Aceitar alteração da IA substitui o texto com efeito de iluminação verde temporária.',
      motionTimingAndEasing: 'Animação de substituição de texto em 250ms ease-in-out.'
    },
    cognitiveFlow: {
      teacherThoughtProcess: '"Quero ajustar detalhes deste plano para ficar exatamente com a minha cara e da minha turma."',
      primaryActionDesired: 'Editar o texto das etapas da aula e salvar ou exportar.',
      firstInformationToSee: 'Título da aula, duração e objetivos principais.',
      whatNeverDistracts: 'Menus de configuração do sistema ou elementos irrelevantes.',
      anxietyReductionStrategy: 'Autossalvamento automático impede a perda de alterações feitas pelo professor.',
      cognitiveLoadReductionStrategy: 'Divisão do plano em 4 blocos claros (Introdução, Desenvolvimento, Conclusão, Avaliação).'
    },
    copywriting: {
      buttonsText: ['Salvar Alterações', 'Exportar em PDF', 'Refinar com Aurora', 'Adicionar Atividade Prática'],
      messagesAndAlerts: ['Plano salvo no dispositivo.', 'Todas as habilidades BNCC foram preservadas.'],
      errorsAndToasts: ['Não foi possível conectar à IA Aurora. Você pode editar o texto manualmente.'],
      emptyStatesText: ['Nenhuma observação adicional incluída.'],
      offlineMessagesText: ['Alterações preservadas offline. Sincronização pendente.'],
      auroraAiMessagesText: ['Deseja que eu adapte este plano para incluir um experimento prático de 15 minutos?'],
      placeholdersAndTooltips: ['Descreva a introdução da aula...', 'Clique para solicitar ajuste da IA']
    },
    responsiveness: {
      desktopLayout: 'Editor completo com painel lateral da Aurora para refinamentos.',
      laptopLayout: 'Editor amplo com abas superior para alternar entre edição e IA.',
      tabletLayout: 'Visualização de documento contínuo com barra de ferramentas flutuante.',
      mobileLayout: 'Leitura em coluna única com seções colapsáveis em sanfona (accordion) para navegação ágil.',
      pwaAndOrientation: 'Perfeita legibilidade em orientação vertical e horizontal.'
    },
    accessibility: {
      keyboardNavigation: 'Navegação por tabulação e teclas de atalho para atalhos de salvar (`Ctrl+S`).',
      screenReadersAndAria: 'Rótulos claros `aria-label` para cada seção editável do plano de aula.',
      contrastAndTouchTargets: 'Campos e botões com dimensões adequadas e texto de alto contraste.',
      typographyScaleAndZoom: 'Escala de texto ajustável sem quebra do formulário de edição.'
    },
    businessRules: {
      allowedUserActions: ['Editar qualquer campo', 'Pedir reescrita à IA', 'Exportar para PDF', 'Duplicar plano'],
      forbiddenActions: ['Modificar planos arquivados da escola sem permissão de edição'],
      disabledConditions: ['Refinar com IA desabilitado no modo estritamente offline sem modelo local'],
      aiSuggestionVsHumanConfirmationRules: 'Toda alteração proposta pela Aurora exige clique no botão "Aplicar Alteração".'
    },
    auroraIntegration: {
      whenAppears: 'No painel lateral direito ou menu de contexto de seleção de texto.',
      whenSilent: 'Durante a edição de texto direta realizada pelo professor.',
      whenSuggests: 'Sugere ajustes de tempo e atividades complementares.',
      whenAsks: 'Pergunta se o professor deseja simplificar o vocabulário das atividades.',
      whenDisappears: 'Minimiza quando o painel lateral é fechado.',
      visualNonCompetitionRule: 'Atua como assistente lateral sem esconder o documento principal.'
    },
    perceivedPerformance: {
      maskingLatency: 'Edição de texto 100% fluida na RAM com debounce para salvamento no Dexie.js.',
      skeletonsAndOptimisticUi: 'Substituição otimista de texto durante os refinamentos.',
      streamingAndPreloading: 'Streaming de texto token-a-token nos ajustes promovidos pela IA.'
    },
    acceptanceCriteria: [
      'Garantia de autossalvamento local a cada alteração de texto.',
      'Exportação para PDF com formatação oficial impecável e cabeçalho da prefeitura.',
      'Refinamento de trechos por streaming sem travamentos na interface.'
    ]
  },

  // --- SCREEN 07 ---
  {
    screenId: 'SCREEN-07',
    screenName: 'Copiloto de Pareceres Descritivos',
    routePath: '/pareceres',
    objective: {
      problemSolved: 'Sintetizar meses de observações do aluno em pareceres descritivos humanos, empáticos e estruturados em 3 parágrafos sem exaustão mental.',
      whenItAppears: 'No encerramento de bimestres/trimestres ou ao selecionar "Pareceres Descritivos" no menu.',
      connectionToTeacherFlow: 'Consolidação da avaliação qualitativa dos alunos para entrega aos pais e coordenação.'
    },
    layout: {
      headerSpec: 'Barra do módulo com seletor de Turma, indicador de pareceres concluídos (ex: 18/25 concluídos) e botão de exportação em lote.',
      sidebarSpec: 'Sidebar de navegação visível à esquerda.',
      cardsAndGridSpec: 'Layout dividido: Lista de Alunos da Turma à esquerda (com badges de status Concluído / Pendente) e Editor do Parecer do Aluno Selecionado à direita.',
      buttonsInputsIconsSpec: 'Botões de ajuste de tom ("Encorajador", "Técnico", "Objetivo"), seletores de marcadores de evolução, botão "Gerar Rascunho com Aurora" e campo de texto de 3 parágrafos.',
      alertsBreadcrumbsFabSpec: 'Breadcrumb: Pareceres / Turma 3B. Alerta de aviso sobre alunos com PDI (exibe selo de inclusão).',
      menusPanelsSpacingSpec: 'Painel da Aurora integrado no topo do editor com histórico de observações do aluno.',
      hierarchyAndResponsiveness: 'Foco total no texto do parecer com divisão clara entre os 3 parágrafos estruturados.'
    },
    componentsUsedIds: ['CMP-01', 'CMP-02', 'CMP-05', 'CMP-06', 'CMP-08'],
    states: {
      emptyState: 'Selecione um aluno na lista à esquerda para elaborar ou visualizar o parecer descritivo.',
      firstAccessState: 'Tutorial: "A Aurora analisa o histórico de presenças e observações do aluno para rascunhar um parecer estruturado em 3 parágrafos."',
      loadingState: 'Skeleton do texto do parecer com linhas pulsantes enquanto a IA sintetiza as observações.',
      offlineState: 'Pareceres rascunhados e salvos localmente com badge "Salvo no tablet".',
      errorState: 'Erro caso ocorra falha na geração do parecer por instabilidade de rede.',
      successState: 'Toast: "Parecer descritivo do aluno Lucas Silva finalizado e assinado!"',
      syncingState: 'Enviando pareceres finalizados ao Supabase.',
      noResultsState: 'Busca por aluno na lista de pareceres não encontra resultados.',
      incompleteDataState: 'Aviso se o parecer tiver menos de 3 parágrafos ou campos essenciais ausentes.',
      noClassAssignedState: 'N/A',
      firstWeekState: 'Instruções sobre o padrão de redação empática do EducaFlow.'
    },
    microInteractions: {
      hoverAndFocus: 'Alunos na lista destacam ao passar o cursor. Seleção ativa marca a linha em tom azul Indigo suave.',
      clickAndLoading: 'Alternar o tom do parecer (ex: Encorajador -> Técnico) faz a IA reescrever o texto com animação fluida.',
      transitionsAndConfirmations: 'Marcar parecer como concluído atualiza o badge do aluno para verde com animação de check.',
      motionTimingAndEasing: 'Transição suave entre pareceres de alunos em 180ms.'
    },
    cognitiveFlow: {
      teacherThoughtProcess: '"Tenho 30 pareceres para escrever e não quero usar frases genéricas que não refletem a realidade do aluno."',
      primaryActionDesired: 'Ver o histórico de observações do aluno, gerar a proposta da IA, ajustar o texto e aprovar.',
      firstInformationToSee: 'Nome do aluno selecionado, foto, presenças no bimestre e botão de gerar parecer.',
      whatNeverDistracts: 'Estatísticas fora do contexto da avaliação do aluno.',
      anxietyReductionStrategy: 'Garantia de que a linguagem do parecer gerado é empática e isenta de rótulos pejorativos.',
      cognitiveLoadReductionStrategy: 'Estruturação fixa em 3 parágrafos (Desenvolvimento Cognitivo, Socioemocional, Próximos Passos).'
    },
    copywriting: {
      buttonsText: ['Gerar Rascunho com Aurora', 'Tom Encorajador', 'Tom Técnico', 'Aprovar e Assinar Parecer', 'Exportar Lote PDF'],
      messagesAndAlerts: ['Parecer estruturado em 3 parágrafos conforme diretrizes pedagógicas.', 'Aluno com acompanhamento PDI ativo.'],
      errorsAndToasts: ['O parecer precisa ter os 3 blocos narrativos preenchidos para homologação.'],
      emptyStatesText: ['Nenhum parecer elaborado para este aluno ainda.'],
      offlineMessagesText: ['Pareceres armazenados em segurança no banco local.'],
      auroraAiMessagesText: ['Sintetizei 12 observações do aluno Lucas. O parecer destaca seu grande avanço na leitura e interação social.'],
      placeholdersAndTooltips: ['Parágrafo 1: Desenvolvimento cognitivo e aprendizagem...', 'Clique para alterar o tom do texto']
    },
    responsiveness: {
      desktopLayout: 'Master-Detail de 2 colunas (Lista de Alunos de 300px + Editor de Parecer amplo).',
      laptopLayout: 'Master-Detail com lista recolhível para 80px apenas com avatares dos alunos.',
      tabletLayout: 'Alternância entre Tela de Lista de Alunos e Tela de Editor via abas.',
      mobileLayout: 'Navegação por telas separadas: Seleção de Aluno -> Tela cheia do Editor do Parecer com botões fixos no rodapé.',
      pwaAndOrientation: 'Ideal para digitação em tablets na horizontal ou uso com teclado físico.'
    },
    accessibility: {
      keyboardNavigation: 'Navegação por seta na lista de alunos. Atalho `Ctrl+Enter` para aprovar o parecer atual.',
      screenReadersAndAria: 'Anúncio do status do aluno: "Aluno Lucas Silva, parecer pendente. Pressione Enter para editar."',
      contrastAndTouchTargets: 'Botões de seleção de tom com tamanho mínimo de 44px e contraste WCAG AA.',
      typographyScaleAndZoom: 'Texto do parecer legível em escala de 16px com espaçamento entre linhas de 1.6.'
    },
    businessRules: {
      allowedUserActions: ['Sintetizar parecer com IA', 'Editar texto livremente', 'Mudar tom', 'Assinar e homologar'],
      forbiddenActions: ['Assinar pareceres com conteúdos pejorativos ou ofensivos'],
      disabledConditions: ['Aprovar desabilitado se o parecer estiver com menos de 100 caracteres'],
      aiSuggestionVsHumanConfirmationRules: 'O parecer NUNCA é assinado automaticamente pela IA. A assinatura humana do professor é mandatória.'
    },
    auroraIntegration: {
      whenAppears: 'No topo da área do parecer com o botão de síntese de observações.',
      whenSilent: 'Enquanto o professor revisa e edita o texto manualmente.',
      whenSuggests: 'Sugere sinônimos e ajustes gramaticais no texto.',
      whenAsks: 'Pergunta se o professor deseja incluir menção aos progressos do PDI.',
      whenDisappears: 'Minimiza ao assinar e concluir o parecer.',
      visualNonCompetitionRule: 'Sua caixa de sugestão fica posicionada acima do editor sem cobrir o texto principal.'
    },
    perceivedPerformance: {
      maskingLatency: 'Carregamento do histórico do aluno em < 30ms do Dexie.js.',
      skeletonsAndOptimisticUi: 'Streaming da síntese da Aurora em tempo real.',
      streamingAndPreloading: 'Pré-processamento em segundo plano das observações do próximo aluno da lista.'
    },
    acceptanceCriteria: [
      'Geração de parecer completo em 3 parágrafos em menos de 8 segundos.',
      'Suporte a alternância de tom pedagógico (Encorajador, Técnico, Objetivo) em 1 clique.',
      'Validação obrigatória da assinatura do professor antes do envio final.'
    ]
  },

  // --- SCREEN 08 ---
  {
    screenId: 'SCREEN-08',
    screenName: 'Perfil do Aluno & Dossiê de Inclusão PDI',
    routePath: '/alunos/[id]',
    objective: {
      problemSolved: 'Fornecer o histórico completo do aluno, laudos médicos, plano de inclusão PDI e registro de observações em um ambiente seguro com controle estrito de privacidade.',
      whenItAppears: 'Ao clicar no nome ou avatar de um aluno no Cockpit, na Chamada ou no módulo PDI.',
      connectionToTeacherFlow: 'Consulta detalhada sobre necessidades específicas do estudante e atualização do acompanhamento inclusivo.'
    },
    layout: {
      headerSpec: 'Cabeçalho do aluno com foto/avatar, nome completo, idade, número de chamada, turma, frequencial geral (%) e badge PDI se aplicável.',
      sidebarSpec: 'Sidebar de navegação visível à esquerda.',
      cardsAndGridSpec: 'Abas organizadas: Aba 1 (Visão Geral & Frequência), Aba 2 (Dossiê de Inclusão PDI & Acomodações), Aba 3 (Histórico de Observações), Aba 4 (Relatórios & Pareceres).',
      buttonsInputsIconsSpec: 'Botão "Adicionar Observação", botão "Editar Plano PDI", tags de acomodações (ex: "Apoio Visual", "Tempo Estendido") e botão de download do laudo.',
      alertsBreadcrumbsFabSpec: 'Breadcrumb: Alunos / [Nome do Aluno]. Alerta de proteção LGPD "Dados de saúde e inclusão protegidos por RLS".',
      menusPanelsSpacingSpec: 'Espaçamentos confortáveis de 16px entre cards de observações.',
      hierarchyAndResponsiveness: 'Informações de saúde e PDI em cards destacados com cores suaves e ícones informativos.'
    },
    componentsUsedIds: ['CMP-01', 'CMP-02', 'CMP-06', 'CMP-08', 'CMP-10'],
    states: {
      emptyState: 'Aba sem registros exibe "Nenhuma observação cadastrada para este aluno ainda."',
      firstAccessState: 'Informação sobre o plano de inclusão PDI e diretrizes da equipe de Atendimento Educacional Especializado (AEE).',
      loadingState: 'Skeleton do perfil do aluno com avatares e blocos de texto pulsantes.',
      offlineState: 'Aviso: "Dados do perfil carregados do armazenamento criptografado local."',
      errorState: 'Erro de acesso restrito (RLS 403) caso o professor tente acessar aluno de outra escola.',
      successState: 'Toast: "Nova observação sobre o aluno registrada no dossiê!"',
      syncingState: 'Sincronizando observações com o banco de dados.',
      noResultsState: 'N/A',
      incompleteDataState: 'Aviso se o laudo PDI estiver pendente de anexação.',
      noClassAssignedState: 'N/A',
      firstWeekState: 'Explicação sobre como usar as observações para alimentar os pareceres de fim de ciclo.'
    },
    microInteractions: {
      hoverAndFocus: 'Abas do perfil destacam com linha inferior Indigo ao passar o mouse.',
      clickAndLoading: 'Adicionar nova observação abre um slide-over drawer lateral em 200ms.',
      transitionsAndConfirmations: 'Mudança entre abas de histórico com animação de slide horizontal suave.',
      motionTimingAndEasing: 'Animação de abertura do drawer com easing cubic-bezier.'
    },
    cognitiveFlow: {
      teacherThoughtProcess: '"Preciso ver se este aluno tem alguma recomendação especial de PDI antes de aplicar a prova."',
      primaryActionDesired: 'Consultar as acomodações recomendadas para o aluno e registrar uma nova observação.',
      firstInformationToSee: 'Foto do aluno, porcentagem de frequência e caixa de destaque com acomodações PDI.',
      whatNeverDistracts: 'Estatísticas genéricas da escola fora da realidade individual do estudante.',
      anxietyReductionStrategy: 'Acomodações pedagógicas resumidas em marcadores simples de fácil leitura.',
      cognitiveLoadReductionStrategy: 'Divisão clara das informações em abas temáticas bem definidas.'
    },
    copywriting: {
      buttonsText: ['Adicionar Observação', 'Ver Plano PDI Completo', 'Baixar Laudo Pedagógico', 'Editar Dados do Aluno'],
      messagesAndAlerts: ['Dados protegidos por criptografia RLS conforme a LGPD.', 'Frequência do aluno acima da média (92%).'],
      errorsAndToasts: ['Acesso negado: Você não possui permissão para visualizar este perfil.'],
      emptyStatesText: ['Nenhuma acomodação de PDI registrada para este aluno.'],
      offlineMessagesText: ['Perfil visualizado em modo offline seguro.'],
      auroraAiMessagesText: ['A Aurora recomenda aplicar atividades com recursos visuais para este aluno conforme indicado no PDI.'],
      placeholdersAndTooltips: ['Digite uma nova observação sobre o aluno...', 'Dados confidenciais de saúde']
    },
    responsiveness: {
      desktopLayout: 'Perfil completo com visualização de cards em 2 colunas e painel lateral PDI.',
      laptopLayout: 'Perfil em 2 colunas com abas superiores navegáveis.',
      tabletLayout: 'Layout de coluna única com abas deslizantes na horizontal.',
      mobileLayout: 'Interface mobile com abas empilhadas e drawer lateral ocupando 100% da tela para digitação de observações.',
      pwaAndOrientation: 'Visualização nítida do dossiê em orientações retrato e paisagem.'
    },
    accessibility: {
      keyboardNavigation: 'Teclas de seta esquerda/direita alternam entre as abas do perfil. `Esc` fecha o drawer de observações.',
      screenReadersAndAria: 'Anúncio de aba ativa: "Aba selecionada: Dossiê de Inclusão PDI. 2 acomodações registradas."',
      contrastAndTouchTargets: 'Todas as abas e botões de ação possuem área de toque maior que 44px.',
      typographyScaleAndZoom: 'Informaçoes sensíveis legíveis com alto contraste sem sobreposição em zoom.'
    },
    businessRules: {
      allowedUserActions: ['Ver perfil', 'Ver histórico de frequência', 'Adicionar observações', 'Ver plano PDI'],
      forbiddenActions: ['Excluir laudos médicos enviados pela equipe da prefeitura'],
      disabledConditions: ['Acesso bloqueado via RLS se o aluno não pertencer às turmas do professor'],
      aiSuggestionVsHumanConfirmationRules: 'As dicas de PDI da Aurora são orientações pedagógicas e não substituem o laudo técnico.'
    },
    auroraIntegration: {
      whenAppears: 'No topo da aba de PDI para resumir as principais adaptações pedagógicas recomendadas.',
      whenSilent: 'Durante a leitura do histórico de observações pelo professor.',
      whenSuggests: 'Sugere estratégias de ensino adaptadas às necessidades do estudante.',
      whenAsks: 'Pergunta se o professor deseja registrar um avanço na observação atual.',
      whenDisappears: 'Fica oculta nas abas de dados cadastrais simples.',
      visualNonCompetitionRule: 'Exibida dentro de um card roxo demarcado como "Assistência PDI Aurora".'
    },
    perceivedPerformance: {
      maskingLatency: 'Abertura do perfil em < 20ms utilizando dados do cache local.',
      skeletonsAndOptimisticUi: 'Inserção otimista de observações no histórico antes da confirmação do banco.',
      streamingAndPreloading: 'Pré-carregamento do dossiê PDI dos alunos com flag de inclusão ativa.'
    },
    acceptanceCriteria: [
      'Garantia de segurança e sigilo de dados via regras de RLS do PostgreSQL.',
      'Acesso instantâneo às acomodações de PDI com 1 clique a partir de qualquer tela.',
      'Suporte a aditamento de observações mesmo sem conexão com a internet.'
    ]
  },

  // --- SCREEN 09 ---
  {
    screenId: 'SCREEN-09',
    screenName: 'Exportador Oficial & Assinatura Digital',
    routePath: '/exportador',
    objective: {
      problemSolved: 'Gerar documentos oficiais (Diários, Pareceres e Planos) em PDF com cabeçalho da prefeitura e assinatura digital em conformidade jurídica sem impressão de papel.',
      whenItAppears: 'Ao clicar no botão "Exportar" ou "Gerar PDF" em qualquer módulo do sistema.',
      connectionToTeacherFlow: 'Finalização de bimestres e entrega de documentos para a Secretaria de Educação.'
    },
    layout: {
      headerSpec: 'Cabeçalho do exportador com seletor do tipo de documento (Diário de Classe, Pareceres Consolidados, Plano de Aula) e seletor de Turma.',
      sidebarSpec: 'Sidebar de navegação visível à esquerda.',
      cardsAndGridSpec: 'Layout de 2 painéis: Painel de Opções de Exportação à esquerda (Período, Incluir Fotos, Incluir PDI) e Pré-visualização do PDF em Tempo Real à direita.',
      buttonsInputsIconsSpec: 'Botão "Assinar Digitalmente e Exportar PDF", checkbox de verificação de autenticidade, campo para chave de assinatura do professor e botão de download.',
      alertsBreadcrumbsFabSpec: 'Breadcrumb: Exportador / Gerar Documento Oficial. Alerta de aviso sobre validade jurídica da assinatura com hash SHA-256.',
      menusPanelsSpacingSpec: 'Painel de pré-visualização do PDF simulando folha A4 com margens oficiais.',
      hierarchyAndResponsiveness: 'Foco na visualização prévia do documento idêntico ao papel impresso.'
    },
    componentsUsedIds: ['CMP-01', 'CMP-02', 'CMP-06', 'CMP-08', 'CMP-09'],
    states: {
      emptyState: 'Selecione a turma e o tipo de documento para gerar a pré-visualização oficial.',
      firstAccessState: 'Explicação sobre a Assinatura Digital com hash inalterável que substitui a assinatura de próprio punho.',
      loadingState: 'Skeleton da folha A4 com linhas pulsantes simulando o documento enquanto o PDF é compilado.',
      offlineState: 'Geração de PDF funcional mesmo offline utilizando a biblioteca local PDFMake / jsPDF no navegador.',
      errorState: 'Mensagem vermelha caso ocorra erro de compilação das fotos ou dados do documento.',
      successState: 'Toast verde com botão de download: "Documento oficial assinado e exportado com sucesso!"',
      syncingState: 'Registrando o hash de auditoria do documento assinado no Supabase.',
      noResultsState: 'Nenhum documento disponível para os filtros selecionados.',
      incompleteDataState: 'Aviso amarelo se houver pareceres pendentes de assinatura na turma selecionada.',
      noClassAssignedState: 'N/A',
      firstWeekState: 'Dica sobre como enviar o PDF gerado diretamente para o e-mail da coordenação.'
    },
    microInteractions: {
      hoverAndFocus: 'Alternar opções de exportação atualiza a pré-visualização do PDF com transição de fade em 150ms.',
      clickAndLoading: 'Clicar em Assinar faz pulsar um carimbo digital verde sobre o documento simulado.',
      transitionsAndConfirmations: 'Conclusão da assinatura abre modal de sucesso com link direto de download.',
      motionTimingAndEasing: 'Animação de carimbo com efeito spring em 300ms.'
    },
    cognitiveFlow: {
      teacherThoughtProcess: '"Preciso entregar o diário impresso/assinado para a coordenação sem perder horas formatando no Word."',
      primaryActionDesired: 'Conferir o documento no visualizador A4 e clicar em Assinar e Exportar.',
      firstInformationToSee: 'Pré-visualização nítida do documento oficial com a logomarca da prefeitura.',
      whatNeverDistracts: 'Opções técnicas complexas de configuração de impressora.',
      anxietyReductionStrategy: 'Certeza visual de que o PDF gerado possui a formatação idêntica ao modelo cobrado pela secretaria.',
      cognitiveLoadReductionStrategy: 'Predefinições oficiais configuradas por padrão sem necessidade de ajustes de margem.'
    },
    copywriting: {
      buttonsText: ['Assinar Digitalmente e Exportar PDF', 'Baixar PDF Sem Assinatura', 'Enviar para a Coordenação', 'Imprimir Documento'],
      messagesAndAlerts: ['Documento em conformidade com o padrão oficial da Secretaria Municipal de Educação.', 'Assinatura digital com hash SHA-256 e timestamp.'],
      errorsAndToasts: ['Existem 3 pareceres não finalizados nesta turma. Deseja exportar assim mesmo?'],
      emptyStatesText: ['Selecione uma turma para visualizar o documento oficial.'],
      offlineMessagesText: ['PDF gerado localmente pelo dispositivo no modo offline.'],
      auroraAiMessagesText: ['A Aurora verificou o diário: Todos os 40 dias de aula e 100% das frequências estão preenchidos corretamente.'],
      placeholdersAndTooltips: ['Selecione o bimestre...', 'Documento com validade jurídica']
    },
    responsiveness: {
      desktopLayout: 'Painel de opções de 320px à esquerda e pré-visualização A4 ampla à direita.',
      laptopLayout: 'Painel de opções com pré-visualização A4 ajustada à largura da tela.',
      tabletLayout: 'Abas superiores: "Configurações de Exportação" vs "Pré-visualização do PDF".',
      mobileLayout: 'Tela sequencial: Selecionar Opções -> Botão "Visualizar PDF" -> Tela Cheia de Pré-visualização com download no rodapé.',
      pwaAndOrientation: 'Visualização de documentos ideal em tablets na orientação horizontal.'
    },
    accessibility: {
      keyboardNavigation: 'Tabulação sequencial entre os seletores e atalho `Ctrl+P` para disparar a geração.',
      screenReadersAndAria: 'Rótulos acessíveis no leitor de tela para todas as opções de filtro e botão de assinatura.',
      contrastAndTouchTargets: 'Botão de exportação primário de 48px de altura e contraste alto.',
      typographyScaleAndZoom: 'O PDF gerado possui tipografia vetorial nítida em qualquer nível de zoom de impressão.'
    },
    businessRules: {
      allowedUserActions: ['Exportar diários', 'Exportar pareceres', 'Assinar digitalmente', 'Baixar PDF'],
      forbiddenActions: ['Gerar documentos oficiais com a marca da prefeitura para turmas não autorizadas'],
      disabledConditions: ['Assinar e Exportar desabilitado se o perfil do professor não tiver o nome completo cadastrado'],
      aiSuggestionVsHumanConfirmationRules: 'A verificação da Aurora é uma auditoria de consistência antes da assinatura humana.'
    },
    auroraIntegration: {
      whenAppears: 'No topo da pré-visualização realizando uma checagem automática de pendências no diário.',
      whenSilent: 'Durante a visualização do PDF pelo professor.',
      whenSuggests: 'Alerta sobre dias letivos que ficaram sem registro de conteúdo.',
      whenAsks: 'Pergunta se deseja incluir a marca d\'água de "Rascunho" caso haja pendências.',
      whenDisappears: 'Desaparece ao iniciar o download do arquivo final.',
      visualNonCompetitionRule: 'Exibida em um card de auditoria no painel esquerdo sem cobrir o PDF.'
    },
    perceivedPerformance: {
      maskingLatency: 'Pré-visualização rápida gerada em HTML/CSS antes de compilar o binário do PDF.',
      skeletonsAndOptimisticUi: 'Exibição progressiva das páginas do PDF.',
      streamingAndPreloading: 'Carregamento prévio das fontes oficiais e logomarcas da prefeitura.'
    },
    acceptanceCriteria: [
      'Geração de arquivos PDF oficiais em menos de 3 segundos no próprio navegador.',
      'Inclusão de carimbo de assinatura digital inalterável com hash de validação.',
      'Formatação 100% fiel às exigências legais da Secretaria de Educação.'
    ]
  },

  // --- SCREEN 10 ---
  {
    screenId: 'SCREEN-10',
    screenName: 'Configurações & Central de Sincronização Dexie',
    routePath: '/configuracoes',
    objective: {
      problemSolved: 'Proporcionar controle total sobre o estado do PWA, armazenamento do IndexedDB, fila de sincronização offline e dados do professor.',
      whenItAppears: 'Ao selecionar "Configurações" na sidebar ou clicar no badge de status de sincronização no header.',
      connectionToTeacherFlow: 'Gestão técnica de conectividade, backup de segurança e personalização de perfil.'
    },
    layout: {
      headerSpec: 'Cabeçalho de configurações com título "Configurações do App & Sincronização" e indicador de uso de memória do navegador.',
      sidebarSpec: 'Sidebar de navegação visível à esquerda.',
      cardsAndGridSpec: 'Seções em cards organizados: Card 1 (Status do PWA & Fila Offline Dexie.js), Card 2 (Dados do Perfil & Assinatura), Card 3 (Preferências de Notificação), Card 4 (Acessibilidade & Tema Visual).',
      buttonsInputsIconsSpec: 'Botão "Forçar Sincronização Agora", botão "Limpar Cache e Re-sincronizar", chave seletora (toggle) de modo escuro, seletor de tamanho de fonte e botão de Logout.',
      alertsBreadcrumbsFabSpec: 'Breadcrumb: Configurações / Geral. Alerta informativo sobre espaço de armazenamento local disponível.',
      menusPanelsSpacingSpec: 'Espaçamentos de 20px entre os cards de configuração com ícones e descrições claras.',
      hierarchyAndResponsiveness: 'Leitura simples e direta com switches claros para atuar em configurações técnicas.'
    },
    componentsUsedIds: ['CMP-01', 'CMP-02', 'CMP-06', 'CMP-08', 'CMP-10'],
    states: {
      emptyState: 'N/A',
      firstAccessState: 'Boas-vindas às configurações com recomendação de ativar as notificações de sincronização.',
      loadingState: 'Skeleton dos itens de status do banco de dados.',
      offlineState: 'Exibição do total de itens mantidos na fila offline aguardando envio.',
      errorState: 'Erro de armazenamento insuficiente do navegador (Storage Quota Exceeded).',
      successState: 'Toast: "Sincronização concluída com sucesso! 0 itens pendentes."',
      syncingState: 'Animação de progresso da transferência de dados com a nuvem.',
      noResultsState: 'N/A',
      incompleteDataState: 'Aviso se a assinatura digital do professor não estiver configurada.',
      noClassAssignedState: 'N/A',
      firstWeekState: 'Explicação sobre como o EducaFlow funciona mesmo sem internet nas escolas.'
    },
    microInteractions: {
      hoverAndFocus: 'Chaves seletoras (toggles) deslizam com animação suave de 150ms e alteram a cor de fundo.',
      clickAndLoading: 'Forçar sincronização aciona rotação continua no ícone do botão.',
      transitionsAndConfirmations: 'Limpar cache solicita confirmação modal de segurança antes de prosseguir.',
      motionTimingAndEasing: 'Animação de barras de progresso de armazenamento em 300ms ease-out.'
    },
    cognitiveFlow: {
      teacherThoughtProcess: '"Quero garantir que tudo que fiz offline hoje foi enviado com segurança para o sistema da prefeitura."',
      primaryActionDesired: 'Ver o indicador de "Tudo Sincronizado" ou clicar para forçar envio.',
      firstInformationToSee: 'Status da conexão e número de itens pendentes na fila de sincronização.',
      whatNeverDistracts: 'Configurações avançadas de servidor fora do interesse do usuário final.',
      anxietyReductionStrategy: 'Indicador verde claro "0 itens pendentes. Seus dados estão seguros na nuvem e no tablet."',
      cognitiveLoadReductionStrategy: 'Descrições simples em linguagem humana sem jargões de TI.'
    },
    copywriting: {
      buttonsText: ['Forçar Sincronização Agora', 'Limpar Cache do Navegador', 'Salvar Preferências', 'Sair da Conta'],
      messagesAndAlerts: ['Sua base de dados local possui 1.2 MB ocupados de 50 MB disponíveis.', 'Seu PWA está atualizado para a versão 1.0.4.'],
      errorsAndToasts: ['Atenção: Existem 4 itens offline não sincronizados. Não limpe o cache antes de conectar à internet.'],
      emptyStatesText: ['Fila de sincronização totalmente vazia.'],
      offlineMessagesText: ['Você está offline. O aplicativo usará os dados salvos localmente.'],
      auroraAiMessagesText: ['Aurora relata que todos os seus diários da semana já foram salvos com sucesso.'],
      placeholdersAndTooltips: ['Seu nome conforme o diário oficial', 'Clique para gerenciar dados offline']
    },
    responsiveness: {
      desktopLayout: 'Grid de 2 colunas de cards de configurações.',
      laptopLayout: 'Grid de 2 colunas de configuração.',
      tabletLayout: 'Coluna única confortável com switches e botões amplos.',
      mobileLayout: 'Coluna única vertical com foco total no status da sincronização e botões táticas de fácil acionamento.',
      pwaAndOrientation: 'Suporte a instalação do PWA diretamente desta tela no móvel.'
    },
    accessibility: {
      keyboardNavigation: 'Teclas de espaço e enter alternam os toggles de configuração. Tabulação completa.',
      screenReadersAndAria: 'Chaves de alternância com estado `aria-checked="true/false"` pronunciado pelo leitor.',
      contrastAndTouchTargets: 'Todas as chaves seletoras e botões com no mínimo 44px de área clicável.',
      typographyScaleAndZoom: 'Seletor de tamanho de fonte nativo do app permitindo ampliar a tipografia da interface.'
    },
    businessRules: {
      allowedUserActions: ['Forçar sincronização', 'Ajustar preferências visuais', 'Instalar PWA', 'Ver histórico de envios'],
      forbiddenActions: ['Apagar dados locais se houver itens pendentes não sincronizados com o servidor'],
      disabledConditions: ['Forçar sincronização desabilitado se estiver sem nenhuma conexão com a internet'],
      aiSuggestionVsHumanConfirmationRules: 'Ações destrutivas de limpeza de cache sempre exigem confirmação humana no modal.'
    },
    auroraIntegration: {
      whenAppears: 'No painel de status para atestar que os dados pedagógicos estão consolidados.',
      whenSilent: 'Durante o ajuste de preferências pessoais do professor.',
      whenSuggests: 'Sugere conectar ao Wi-Fi para sincronizar observações de imagens e laudos.',
      whenAsks: 'Pergunta se o professor deseja ativar notificações de lembrete de diário.',
      whenDisappears: 'Sempre visível como assistente de diagnóstico de saúde do app.',
      visualNonCompetitionRule: 'Instalada em card informativo no topo da tela.'
    },
    perceivedPerformance: {
      maskingLatency: 'Verificação instantânea do estado do IndexedDB em < 10ms.',
      skeletonsAndOptimisticUi: 'Atualização otimista dos toggles de configuração.',
      streamingAndPreloading: 'Sincronização em lotes para não sobrecarregar a banda do dispositivo.'
    },
    acceptanceCriteria: [
      'Garantia de integridade de dados na fila de sincronização do Dexie.js.',
      'Possibilidade de funcionamento 100% offline sem travamentos ou perda de registros.',
      'Avisos claros de segurança impedindo perda acidental de informações não sincronizadas.'
    ]
  }
];

// === 4. VISUAL NAVIGATION FLOWCHART MAP ===

export const NAVIGATION_FLOWCHART_MAP: NavigationFlowNodeSpec[] = [
  {
    fromScreenId: 'SCREEN-01',
    fromScreenName: 'Login',
    triggerAction: 'Autenticação com Sucesso',
    destinationScreenId: 'SCREEN-02',
    destinationScreenName: 'Cockpit do Professor',
    navigationType: 'Direct Route',
    shortcutOrKey: 'Enter'
  },
  {
    fromScreenId: 'SCREEN-02',
    fromScreenName: 'Cockpit do Professor',
    triggerAction: 'Clique em "Iniciar Chamada Rápida" ou FAB Verde',
    destinationScreenId: 'SCREEN-03',
    destinationScreenName: 'Chamada Ultrarrápida',
    navigationType: 'Direct Route',
    shortcutOrKey: 'Alt + 1 / FAB Click'
  },
  {
    fromScreenId: 'SCREEN-03',
    fromScreenName: 'Chamada Ultrarrápida',
    triggerAction: 'Clique em "Salvar Chamada"',
    destinationScreenId: 'SCREEN-02',
    destinationScreenName: 'Cockpit do Professor',
    navigationType: 'Back Return',
    shortcutOrKey: 'Ctrl + S / Touch'
  },
  {
    fromScreenId: 'SCREEN-02',
    fromScreenName: 'Cockpit do Professor',
    triggerAction: 'Clique em "Preencher Conteúdo do Diário"',
    destinationScreenId: 'SCREEN-04',
    destinationScreenName: 'Diário de Classe',
    navigationType: 'Direct Route',
    shortcutOrKey: 'Alt + 2'
  },
  {
    fromScreenId: 'SCREEN-02',
    fromScreenName: 'Cockpit do Professor',
    triggerAction: 'Clique em "Novo Plano BNCC"',
    destinationScreenId: 'SCREEN-05',
    destinationScreenName: 'Planejamento BNCC',
    navigationType: 'Direct Route',
    shortcutOrKey: 'Alt + 3'
  },
  {
    fromScreenId: 'SCREEN-05',
    fromScreenName: 'Planejamento BNCC',
    triggerAction: 'Concluir Wizard e Clicar "Gerar Plano com Aurora"',
    destinationScreenId: 'SCREEN-06',
    destinationScreenName: 'Editor de Plano',
    navigationType: 'Direct Route',
    shortcutOrKey: 'Enter'
  },
  {
    fromScreenId: 'SCREEN-02',
    fromScreenName: 'Cockpit do Professor',
    triggerAction: 'Clique em "Pareceres Descritivos"',
    destinationScreenId: 'SCREEN-07',
    destinationScreenName: 'Pareceres Descritivos',
    navigationType: 'Direct Route',
    shortcutOrKey: 'Alt + 4'
  },
  {
    fromScreenId: 'SCREEN-03',
    fromScreenName: 'Chamada Ultrarrápida',
    triggerAction: 'Clique no ícone de coração/inclusão no card do aluno',
    destinationScreenId: 'SCREEN-08',
    destinationScreenName: 'Perfil do Aluno & PDI',
    navigationType: 'Slide-over Drawer',
    shortcutOrKey: 'Touch / Click Avatar'
  },
  {
    fromScreenId: 'SCREEN-07',
    fromScreenName: 'Pareceres Descritivos',
    triggerAction: 'Clique em "Exportar Lote PDF"',
    destinationScreenId: 'SCREEN-09',
    destinationScreenName: 'Exportador Oficial',
    navigationType: 'Direct Route',
    shortcutOrKey: 'Ctrl + P'
  },
  {
    fromScreenId: 'ALL_SCREENS',
    fromScreenName: 'Qualquer Tela',
    triggerAction: 'Pressionar Atalho Universal Ctrl + K',
    destinationScreenId: 'COMMAND_PALETTE',
    destinationScreenName: 'Command Palette Overlay',
    navigationType: 'Keyboard Shortcut',
    shortcutOrKey: 'Ctrl + K / Cmd + K'
  },
  {
    fromScreenId: 'ALL_SCREENS',
    fromScreenName: 'Qualquer Tela',
    triggerAction: 'Clique no Ícone de Configurações na Sidebar/Header',
    destinationScreenId: 'SCREEN-10',
    destinationScreenName: 'Configurações',
    navigationType: 'Direct Route',
    shortcutOrKey: 'Alt + S'
  }
];

// === 5. POST-MVP BACKLOG (EXCLUDED FROM CURRENT MVP) ===

export const POST_MVP_BACKLOG: PostMvpBacklogItem[] = [
  {
    itemId: 'BACKLOG-01',
    title: 'Reconhecimento Facial Automatizado para Chamada',
    category: 'Inteligência de Visão Computacional',
    rationaleForPostponement: 'A chamada tátil em 30 segundos resolve 100% da necessidade atual sem adicionar riscos de privacidade ou necessidade de câmeras avançadas nas escolas.',
    futureTargetSprint: 'Sprint 12 (Fase de Inovação Avancada)'
  },
  {
    itemId: 'BACKLOG-02',
    title: 'Chat em Tempo Real com Pais e Responsáveis',
    category: 'Comunicação Externa',
    rationaleForPostponement: 'O foco do MVP é reduzir a burocracia do professor em sala de aula. Canais de mensagens externas trazem demanda de moderação e suporte que extrapolam a gestão de diários.',
    futureTargetSprint: 'Sprint 14 (Módulo Família & Comunidade)'
  },
  {
    itemId: 'BACKLOG-03',
    title: 'Módulo de Gamificação com Medalhas para Alunos',
    category: 'Engajamento de Alunos',
    rationaleForPostponement: 'A prioridade absoluta do MVP é o trabalho docente, lançamento de notas/frequências e geração de relatórios oficiais para a prefeitura.',
    futureTargetSprint: 'Sprint 16 (Gamificação Escolar)'
  },
  {
    itemId: 'BACKLOG-04',
    title: 'Geração Automática de Vídeos Didáticos por IA',
    category: 'Geração Mídia Avançada',
    rationaleForPostponement: 'Alto consumo de banda e custos computacionais que inviabilizam o uso em conexões 2G/3G das escolas públicas no MVP.',
    futureTargetSprint: 'Sprint 18 (Multimídia Pedagógica)'
  }
];

// === 6. VS CODE IMPLEMENTATION PLAN (SPRINTS 0 TO 6+) ===

export const VSCODE_IMPLEMENTATION_PLAN: ImplementationSprintStepSpec[] = [
  {
    sprintNumber: 'Sprint 00',
    sprintTitle: 'Setup do Projeto, Design Tokens & Tooling',
    primaryObjective: 'Configurar o repositório no Visual Studio Code, instalar Tailwind CSS, Framer Motion, Dexie.js e criar a estrutura de componentes base.',
    vsCodeTasks: [
      'Inicializar projeto React/Next.js com TypeScript e Tailwind CSS v3/v4.',
      'Configurar `tailwind.config.js` com a paleta de cores semânticas e escala de spacing.',
      'Criar arquivo de tipos compartilhados `src/types.ts` e utilitário de classes `cn()`.',
      'Configurar ESLint, Prettier e Husky para testes e linting pré-commit.'
    ],
    deliverableArtifacts: [
      'Estrutura de diretórios `/src/components`, `/src/data`, `/src/db`, `/src/hooks`.',
      'Biblioteca base de componentes UI (CMP-01 até CMP-10) em isolamento Storybook ou visualizador.'
    ],
    definitionOfDone: 'Compilação sem avisos (`tsc --noEmit`), linter aprovado e design tokens aplicados em componentes base.'
  },
  {
    sprintNumber: 'Sprint 01',
    sprintTitle: 'Infraestrutura Supabase & Dexie.js Offline-First',
    primaryObjective: 'Configurar a camada de persistência local no IndexedDB via Dexie.js e integração com Supabase PostgreSQL.',
    vsCodeTasks: [
      'Criar schema do Dexie.js em `src/db/dexieDb.ts` com tabelas `students`, `diaries`, `lesson_plans`, `pending_sync`.',
      'Implementar o hook `useOfflineSync()` para escutar eventos de rede `navigator.onLine`.',
      'Configurar cliente Supabase e políticas RLS de segurança em `firestore/supabase.rules`.',
      'Escrever testes unitários para a fila de sincronização offline com Vitest.'
    ],
    deliverableArtifacts: [
      'Mecanismo de gravação e leitura offline 100% funcional no IndexedDB.',
      'Testes de sincronização com cobertura acima de 90%.'
    ],
    definitionOfDone: 'Capacidade comprovada de gravar dados sem internet e sincronizar automaticamente ao reconectar.'
  },
  {
    sprintNumber: 'Sprint 02',
    sprintTitle: 'Autenticação Segura & Shell do Sistema',
    primaryObjective: 'Construir a Tela 01 (Login) e a estrutura global da aplicação (Header, Sidebar, Navigation).',
    vsCodeTasks: [
      'Implementar a tela `/login` com integração ao Supabase Auth e suporte a login cacheado offline.',
      'Criar o componente `Sidebar.tsx` e `Header.tsx` com indicador de sincronização e status de rede.',
      'Desenvolver a navegação responsiva com suporte a atalhos de teclado (`Ctrl+K`).',
      'Implementar testes E2E com Playwright para o fluxo de autenticação.'
    ],
    deliverableArtifacts: [
      'Tela de Login funcional.',
      'Shell de layout responsivo operando em desktop e dispositivos móveis.'
    ],
    definitionOfDone: 'Professor consegue se autenticar, navegar entre rotas e visualizar o status de sincronização.'
  },
  {
    sprintNumber: 'Sprint 03',
    sprintTitle: 'Cockpit do Professor & Chamada Ultrarrápida Tátil',
    primaryObjective: 'Implementar a Tela 02 (Cockpit) e a Tela 03 (Chamada Ultrarrápida em 30s).',
    vsCodeTasks: [
      'Criar o painel do Cockpit em `/dashboard` com o resumo de aulas e atalhos rápidos.',
      'Desenvolver a interface tátil de chamada em `/diario/chamada` com suporte a gestos e botões P, F, FJ.',
      'Implementar o recurso "Marcar Todos como Presentes" com escrita instantânea no Dexie.js.',
      'Adicionar atalhos de teclado (teclas P e F) para uso em notebooks com teclado físico.'
    ],
    deliverableArtifacts: [
      'Cockpit funcional com cards de aulas do dia.',
      'Tela de Chamada Ultrarrápida operando em tempo de execução < 30 segundos.'
    ],
    definitionOfDone: 'Chamada de 30 alunos executada e salva no IndexedDB em menos de 30 segundos com feedback visual.'
  },
  {
    sprintNumber: 'Sprint 04',
    sprintTitle: 'Diário de Conteúdo & Gerador de Planos BNCC com Aurora IA',
    primaryObjective: 'Desenvolver a Tela 04 (Diário) e as Telas 05 e 06 (Planejador e Editor BNCC com IA).',
    vsCodeTasks: [
      'Criar o editor de conteúdo em `/diario/conteudo` com recurso de ditado por voz.',
      'Implementar a busca de habilidades BNCC com catálogo oficial do MEC no Dexie.js.',
      'Integração com o servidor do Gemini Proxy para geração de planos de aula em streaming SSE.',
      'Desenvolver a tela de Editor de Plano em `/planos/[id]` com botões de refinamento da Aurora.'
    ],
    deliverableArtifacts: [
      'Diário de classe com importação automática do planejamento.',
      'Gerador BNCC criando propostas de aula via streaming da Aurora.'
    ],
    definitionOfDone: 'Plano de aula gerado com códigos BNCC reais e editável pelo professor em menos de 10 segundos.'
  },
  {
    sprintNumber: 'Sprint 05',
    sprintTitle: 'Copiloto de Pareceres & Dossiê de Inclusão PDI',
    primaryObjective: 'Construir a Tela 07 (Pareceres) e a Tela 08 (Perfil do Aluno e PDI).',
    vsCodeTasks: [
      'Desenvolver o editor de pareceres em `/pareceres` com opção de alternar tom pedagógico (Encorajador, Técnico, Objetivo).',
      'Implementar a estrutura em 3 parágrafos garantida pelo prompt e parser da Aurora.',
      'Criar a tela de Perfil do Aluno em `/alunos/[id]` com gaveta lateral para acomodações de PDI.',
      'Garantir isolamento RLS dos dados sensíveis de saúde do aluno no Supabase.'
    ],
    deliverableArtifacts: [
      'Copiloto de pareceres produzindo relatórios descritivos em 3 parágrafos.',
      'Central de PDI com laudos protegidos por RLS.'
    ],
    definitionOfDone: 'Parecer gerado, revisado e assinado com validade técnica e conformidade com as diretrizes do MEC.'
  },
  {
    sprintNumber: 'Sprint 06',
    sprintTitle: 'Exportador Oficial, Acessibilidade WCAG 2.2 AA & Lançamento MVP',
    primaryObjective: 'Implementar a Tela 09 (Exportador PDF), Tela 10 (Configurações) e auditar acessibilidade e performance.',
    vsCodeTasks: [
      'Desenvolver o gerador de PDF oficial em `/exportador` com carimbo de assinatura digital e hash SHA-256.',
      'Criar a tela de Configurações e Central Dexie em `/configuracoes`.',
      'Auditar 100% das telas com `@axe-core/playwright` para zero violações de acessibilidade WCAG 2.2 AA.',
      'Executar testes de performance com Lighthouse CI (LCP < 1.2s e INP < 100ms).'
    ],
    deliverableArtifacts: [
      'PDFs oficiais gerados em segundos no navegador.',
      'PWA do EducaFlow pronto para instalação em dispositivos móveis.',
      'Relatório de auditoria WCAG 2.2 AA com aprovação 100%.'
    ],
    definitionOfDone: 'Software totalmente testado, homologado e pronto para uso pelos professores da rede pública.'
  }
];

// === 7. OFFICIAL DISCOVERY CLOSING DECLARATION ===

export const DISCOVERY_CLOSING_DECLARATION = {
  closingTitle: 'Declaração Oficial de Encerramento da Fase de Discovery, UX & Arquitetura',
  closingDate: '2026-07-28',
  closingText: 'Atestamos que todas as etapas de Planejamento, Discovery, Arquitetura de Software, Design de Experiência do Usuário (UX/UI), Engenharia de IA Aurora, Garantia de Qualidade (QA) e Especificação Mestra de Telas foram concluídas com êxito absoluto. O EducaFlow possui agora a documentação técnica e de produto mais completa e rigorosa para a educação pública brasileira. Com a assinatura deste documento, a fase de especificação é oficialmente considerada ENCERRADA, dando início imediato à implementação do código em React/Next.js conforme o plano de Sprints do Visual Studio Code.',
  signatories: [
    { name: 'Elena Rostova', title: 'Principal UX Architect & HCI Lead', status: 'ASSINADO' },
    { name: 'Marcus Vance', title: 'Head of Product Design & Design Systems', status: 'ASSINADO' },
    { name: 'Dr. Aris Thorne', title: 'Senior Frontend Architect & PWA Lead', status: 'ASSINADO' },
    { name: 'Sofia Al-Mansoor', title: 'Cognitive Psychology Specialist', status: 'ASSINADO' },
    { name: 'Gabriel Siqueira', title: 'Accessibility Expert (WCAG 2.2 AA)', status: 'ASSINADO' },
    { name: 'Patricia Mendes', title: 'Product Owner & Educational Domain Lead', status: 'ASSINADO' }
  ]
};
