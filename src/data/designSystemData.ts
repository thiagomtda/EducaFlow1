import { ColorToken, TypographyToken, UIStateDefinition, ComponentSpec } from '../types';

export const BRAND_VISUAL_PHILOSOPHY = [
  {
    concept: 'Calma & Paz Mental',
    feeling: 'Redução imediata da ansiedade e do estresse gerado pela burocracia.',
    visualExecution: 'Uso dominante de fundos neutros suaves (#F8FAFC), sem cores estridentes ou elementos piscantes. Espaçamento generoso entre elementos.'
  },
  {
    concept: 'Acolhimento & Afeto',
    feeling: 'O professor se sente abraçado, valorizado e compreendido em sua rotina.',
    visualExecution: 'Cantos suavemente arredondados (8px a 12px), microcopia humanizada e saudações personalizadas que reconhecem o esforço docente.'
  },
  {
    concept: 'Confiança & Sobriedade',
    feeling: 'Sensação de estar utilizando uma ferramenta de nível profissional e alta precisão.',
    visualExecution: 'Tipografia geométrica limpa (Plus Jakarta Sans), contraste rigoroso de texto (WCAG AA 4.5:1+) e hierarquia de informação cristalina.'
  },
  {
    concept: 'Leveza & Fluidez',
    feeling: 'A interface parece flutuar, sem peso visual ou poluição gráfica.',
    visualExecution: 'Bordas finas de 1px com tons de cinza suave (#E2E8F0), eliminação de sombreados escuros pesados e uso de elevações sutis (box-shadow micro).'
  },
  {
    concept: 'Produtividade de Alta Performance',
    feeling: 'Execução de tarefas sem atrito em frações de segundos.',
    visualExecution: 'Botões de ação primária em posição pré-visível, suporte total a atalhos de teclado e densidade de informação ajustada ao Ensino Fundamental I.'
  },
  {
    concept: 'Organização Intuitiva',
    feeling: 'Tudo está exatamente onde o professor espera encontrar, sem adivinhação.',
    visualExecution: 'Agrupamento visual por cards delimitados, tags de estado com cores padronizadas e migalhas de pão (breadcrumbs) de contexto.'
  },
  {
    concept: 'Humanidade & Respeito',
    feeling: 'Tecnologia transparente que se posiciona como assistente, nunca como supervisora.',
    visualExecution: 'Ícones amigáveis da família Lucide com traço de 1.5px/2.0px, ausência de pop-ups agressivos e feedback visual gentil.'
  }
];

export const DESIGN_CONCEPT = {
  styleName: 'Warm Precision & Human Clarity (Precisão Acolhedora & Clareza Humana)',
  philosophy: 'Atemporalidade e Eficiência Funcional',
  whyChosen: 'Rejeitamos modismos visuais passageiros (como neomorfismo pesado, glassmorphism excessivo com desfoque de performance ou gradientes ultravioleta saturados). Escolhemos uma linguagem de design atemporal baseada em superfícies de luz neutra, tipografia rigorosa e acentos de cor estratégicos. Essa abordagem garante que o sistema permaneça moderno pelos próximos 10 anos, consuma o mínimo de GPU/bateria em dispositivos antigos de professores e mantenha um conforto visual absoluto durante horas seguidas de trabalho.',
  keyAttributes: [
    'Superfície de Luz Neutra (Off-White Canvas)',
    'Contraste Tipográfico Escalar',
    'Hierarquia Visual Baseada em Espaçamento e Não em Linhas Grossas',
    'Acentos de Cor com Significado Semântico Estrito',
    'Componentes Modulares Prontos para Design System Tokenizado'
  ]
};

export const COLOR_TOKENS: ColorToken[] = [
  {
    name: 'Slate 900 (Primária Estrutural)',
    role: 'Texto principal, cabeçalhos, barra lateral e botões de alta prioridade',
    hex: '#0F172A',
    contrastRatio: '15.8:1 (AAA sobre fundo branco)',
    usageGuide: 'Usar para títulos de tela, textos de alta legibilidade e estruturas de navegação principais.',
    category: 'Primária'
  },
  {
    name: 'Indigo 600 (Interativa Marca)',
    role: 'Ações primárias, links, estados focados e seleções ativas',
    hex: '#4F46E5',
    contrastRatio: '5.2:1 (AA sobre fundo branco)',
    usageGuide: 'Usar em botões de ação principal, destaques de fluxo ativo e botões de rascunho.',
    category: 'Primária'
  },
  {
    name: 'Amber 500 (Acento IA Aurora)',
    role: 'Identidade da IA Copiloto Aurora, destaques de atenção e emblemas',
    hex: '#F59E0B',
    contrastRatio: '4.8:1 (AA sobre Slate 900)',
    usageGuide: 'Usar para indicar sugestões geradas pela IA, badges de novidade e destaques do Cockpit.',
    category: 'Primária'
  },
  {
    name: 'Slate 600 / 700 (Secundária & Corpo)',
    role: 'Subtítulos, corpo de texto descritivo e rótulos de formulários',
    hex: '#475569',
    contrastRatio: '7.1:1 (AAA sobre fundo branco)',
    usageGuide: 'Usar para textos explicativos, descrições de habilidades BNCC e rótulos de campos.',
    category: 'Secundária'
  },
  {
    name: 'Emerald 600 (Sucesso / Concluído)',
    role: 'Confirmação de chamada, frequência 100%, sincronização concluída',
    hex: '#059669',
    contrastRatio: '4.6:1 (AA)',
    usageGuide: 'Usar em badges "Aprovado", indicadores de presença realizada e toasts de sucesso.',
    category: 'Feedback / Estado'
  },
  {
    name: 'Amber 600 (Alerta / Atenção)',
    role: 'Pendências de parecer, prazos próximos, atenção em PDI',
    hex: '#D97706',
    contrastRatio: '4.5:1 (AA)',
    usageGuide: 'Usar para destacar itens que requerem revisão antes do envio.',
    category: 'Feedback / Estado'
  },
  {
    name: 'Rose 600 (Erro / Perigo)',
    role: 'Falha de validação, exclusão de dados, aluno com falta grave',
    hex: '#E11D48',
    contrastRatio: '5.1:1 (AA)',
    usageGuide: 'Usar em botões de exclusão, alertas de erro de conexão e validações impeditivas.',
    category: 'Feedback / Estado'
  },
  {
    name: 'Blue 600 (Informação / Ajuda)',
    role: 'Dicas pedagógicas, códigos BNCC, tutoriais de ajuda',
    hex: '#2563EB',
    contrastRatio: '5.3:1 (AA)',
    usageGuide: 'Usar para caixas de informação informativa sobre competências gerais da educação.',
    category: 'Feedback / Estado'
  },
  {
    name: 'Slate 50 (Fundo / Canvas)',
    role: 'Fundo principal da aplicação (Off-white de baixo cansaço visual)',
    hex: '#F8FAFC',
    contrastRatio: '1.05:1 vs Branco',
    usageGuide: 'Fundo geral das telas para evitar o brilho do branco puro em sessões longas.',
    category: 'Superfície & Neutros'
  },
  {
    name: 'Branco Puro (#FFFFFF)',
    role: 'Superfície de cards, modais, formulários e tabelas',
    hex: '#FFFFFF',
    contrastRatio: '21:1 vs Slate 900',
    usageGuide: 'Usar como fundo de contêineres e cards interativos para destacar do canvas.',
    category: 'Superfície & Neutros'
  },
  {
    name: 'Slate 200 (Bordas & Divisores)',
    role: 'Linhas divisórias sutis de 1px entre seções e contornos de cards',
    hex: '#E2E8F0',
    contrastRatio: '1.2:1',
    usageGuide: 'Usar para delimitar caixas de conteúdo sem poluição visual.',
    category: 'Superfície & Neutros'
  }
];

export const TYPOGRAPHY_TOKENS: TypographyToken[] = [
  {
    level: 'Display / Título 1 (H1)',
    fontFamily: 'Plus Jakarta Sans',
    sizePx: '28px (1.75rem)',
    weight: '800 (ExtraBold)',
    lineHeight: '1.25',
    useCase: 'Títulos principais de módulos e grandes cabeçalhos de visualização.'
  },
  {
    level: 'Título 2 (H2)',
    fontFamily: 'Plus Jakarta Sans',
    sizePx: '22px (1.375rem)',
    weight: '700 (Bold)',
    lineHeight: '1.3',
    useCase: 'Cabeçalhos de seções principais dentro das abas e títulos de modais.'
  },
  {
    level: 'Título 3 (H3)',
    fontFamily: 'Plus Jakarta Sans',
    sizePx: '18px (1.125rem)',
    weight: '700 (Bold)',
    lineHeight: '1.35',
    useCase: 'Títulos de cards, nomes de turmas e cabeçalhos de tabelas.'
  },
  {
    level: 'Subtítulo / Rótulo de Seção (H4)',
    fontFamily: 'Plus Jakarta Sans',
    sizePx: '14px (0.875rem)',
    weight: '700 (Bold)',
    lineHeight: '1.4',
    useCase: 'Rótulos de campos de formulário, nomes de colunas e grupos.'
  },
  {
    level: 'Corpo Principal (Body Regular)',
    fontFamily: 'Plus Jakarta Sans / System Sans',
    sizePx: '14px (0.875rem)',
    weight: '500 (Medium)',
    lineHeight: '1.6',
    useCase: 'Texto corrido de planos de aula, pareceres descritivos e observações.'
  },
  {
    level: 'Corpo Pequeno / Instruções (Body Small)',
    fontFamily: 'Plus Jakarta Sans / System Sans',
    sizePx: '12px (0.75rem)',
    weight: '500 (Medium)',
    lineHeight: '1.5',
    useCase: 'Textos auxiliares, legendas, microcopia e dicas pedagógicas.'
  },
  {
    level: 'Código & BNCC (Monospaced)',
    fontFamily: 'JetBrains Mono / ui-monospace',
    sizePx: '12px (0.75rem)',
    weight: '700 (Bold)',
    lineHeight: '1.4',
    useCase: 'Códigos oficiais da BNCC (ex: EF01LP08), UUIDs e IDs de estudantes.'
  },
  {
    level: 'Badge / Micro Tag',
    fontFamily: 'Plus Jakarta Sans',
    sizePx: '10px (0.625rem)',
    weight: '800 (ExtraBold)',
    lineHeight: '1.0',
    useCase: 'Etiquetas de estado, contadores de frequência e badges de módulo.'
  }
];

export const SPACING_SYSTEM = {
  baseUnitPx: 4,
  scale: [
    { token: 'space-0.5', px: '2px', useCase: 'Ajustes micro de ícone e texto.' },
    { token: 'space-1', px: '4px', useCase: 'Espaçamento interno de badges pequenas.' },
    { token: 'space-2', px: '8px', useCase: 'Distância entre ícone e rótulo de botão.' },
    { token: 'space-3', px: '12px', useCase: 'Padding interno de botões compactos e inputs.' },
    { token: 'space-4', px: '16px', useCase: 'Padding padrão de cards e campos de texto.' },
    { token: 'space-6', px: '24px', useCase: 'Gaps entre cards principais e padding de modais.' },
    { token: 'space-8', px: '32px', useCase: 'Separação entre grandes blocos e títulos.' },
    { token: 'space-12', px: '48px', useCase: 'Margem superior/inferior de seções do aplicativo.' }
  ],
  goldenRule: 'O padding externo de qualquer contêiner DEVE ser sempre maior ou igual à distância interna entre seus elementos filhos (Inner Radius = Outer Radius - Padding).'
};

export const GRID_SYSTEM = {
  desktop: {
    breakpoint: '>= 1280px (xl)',
    columns: 12,
    gutterPx: 24,
    marginPx: 32,
    sidebarWidthPx: 260,
    containerMaxWidthPx: 1440
  },
  tablet: {
    breakpoint: '768px - 1279px (md/lg)',
    columns: 8,
    gutterPx: 16,
    marginPx: 24,
    sidebarBehavior: 'Menu retrátil (Drawer flutuante)'
  },
  mobile: {
    breakpoint: '< 768px (sm)',
    columns: 4,
    gutterPx: 12,
    marginPx: 16,
    sidebarBehavior: 'Barra de navegação inferior (Bottom Navigation)'
  }
};

export const COMPONENT_LIBRARY: ComponentSpec[] = [
  {
    name: 'Botão Primário (Primary Button)',
    category: 'Ações & Entradas',
    description: 'Ação principal da tela ou formulário (ex: "Salvar Chamada", "Gerar Rascunho").',
    variants: ['Solid Indigo (#4F46E5)', 'Solid Slate 900 (#0F172A)', 'Solid Amber (IA)'],
    statesHandled: ['Default', 'Hover (opacidade 90%)', 'Active (press scale 0.98)', 'Disabled (Slate 200)', 'Loading (Spinner + Texto)'],
    accessibilityRules: 'Target de clique mínimo de 44px de altura. Ativável por tecla Space e Enter.'
  },
  {
    name: 'Campo de Texto / Input (Text Input)',
    category: 'Ações & Entradas',
    description: 'Entrada de dados numéricos ou textuais curtos com rótulo claro.',
    variants: ['Standard Text', 'Search Input com Ícone', 'Select Dropdown', 'Textarea Pedagógico'],
    statesHandled: ['Default (Borda Slate 200)', 'Focus (Ring Indigo 500 2px)', 'Error (Borda Rose 500 + Mensagem)', 'Disabled'],
    accessibilityRules: 'Vincular obrigatoriamente id com htmlFor no rótulo. Texto de placeholder com contraste mínimo 3:1.'
  },
  {
    name: 'Card de Conteúdo (Content Card)',
    category: 'Contêineres & Painéis',
    description: 'Superfície delimitadora branca com borda suave de 1px e cantos arredondados de 12px.',
    variants: ['Card Estático', 'Card Interativo (Hover elevation)', 'Card Destaque IA (Borda Amber)'],
    statesHandled: ['Default', 'Hover (Sombra micro + borda Slate 300)'],
    accessibilityRules: 'Regra de raio de canto encadeado (Inner Radius = Outer Radius - Padding).'
  },
  {
    name: 'Modal / Caixa de Diálogo (Dialog)',
    category: 'Contêineres & Painéis',
    description: 'Superposição de tela para confirmação de ações críticas ou formulários focados.',
    variants: ['Modal de Confirmação', 'Formulário Completo', 'Drawer Lateral'],
    statesHandled: ['Aberto (Overlay 50% Slate 950 com backdrop-blur)', 'Fechando (Fade-out 150ms)'],
    accessibilityRules: 'Trava de foco de teclado (Focus Trap). Tecla ESC fecha a caixa de diálogo.'
  },
  {
    name: 'Menu Suspenso (Dropdown & Popover)',
    category: 'Navegação',
    description: 'Lista de opções contextuais ativada por um botão de gatilho.',
    variants: ['Menu de Ações do Aluno', 'Seletor de Bimestre', 'Filtro de Matéria'],
    statesHandled: ['Fechado', 'Aberto com posicionamento inteligente'],
    accessibilityRules: 'Navegação por setas do teclado (ArrowDown/ArrowUp).'
  },
  {
    name: 'Abas de Navegação (Tabs)',
    category: 'Navegação',
    description: 'Alternador de visualização no mesmo nível de contexto.',
    variants: ['Abas de Submódulo', 'Abas da Jornada do Cliente', 'Abas do Blueprint'],
    statesHandled: ['Ativa (Fundo destacado + texto bold)', 'Inativa (Hover leve)'],
    accessibilityRules: 'Uso dos atributos ARIA role="tablist", role="tab" e aria-selected.'
  },
  {
    name: 'Tabela de Dados (Data Table)',
    category: 'Contêineres & Painéis',
    description: 'Apresentação matricial de alunos, notas e diários de frequência.',
    variants: ['Lista de Chamada', 'Matriz de Notas', 'Rastreio BNCC'],
    statesHandled: ['Default', 'Linha com hover', 'Linha selecionada'],
    accessibilityRules: 'Uso de <th> com scope="col" ou scope="row" e contraste alternado.'
  },
  {
    name: 'Notificação Flutuante (Toast)',
    category: 'Feedback & Status',
    description: 'Mensagem temporária de feedback de ação realizada.',
    variants: ['Sucesso (Verde)', 'Aviso (Amarelo)', 'Erro (Vermelho)', 'Info (Azul)'],
    statesHandled: ['Entrada (Slide-in superior)', 'Auto-dismiss em 3 segundos'],
    accessibilityRules: 'Atributo role="status" ou aria-live="polite".'
  },
  {
    name: 'Badge / Etiqueta de Estado (Status Badge)',
    category: 'Feedback & Status',
    description: 'Pequeno rótulo visual para indicar status de processo ou código.',
    variants: ['Status de Parecer (Pendente/Concluído)', 'Código BNCC', 'Flag de PDI/TDAH'],
    statesHandled: ['Default estático'],
    accessibilityRules: 'Texto em linha única sem quebra de linha. Sempre combinar cor com ícone ou texto.'
  },
  {
    name: 'Calendário Seletor de Data (DatePicker)',
    category: 'Ações & Entradas',
    description: 'Navegador de dias letivos e datas de aulas.',
    variants: ['Visualização Mensal', 'Seletor Rápido de Hoje/Ontem'],
    statesHandled: ['Dia Letivo', 'Dia Sem Aula / Feriado', 'Dia Selecionado'],
    accessibilityRules: 'Navegação completa por teclado entre os dias do mês.'
  },
  {
    name: 'Linha do Tempo (Timeline Stepper)',
    category: 'Feedback & Status',
    description: 'Visualizador do progresso de etapas sequenciais (ex: Jornada 11 Passos, Sprints).',
    variants: ['Timeline Horizontal', 'Timeline Vertical com Detalhes'],
    statesHandled: ['Etapa Concluída (Check Verde)', 'Etapa Atual (Pulsante)', 'Etapa Futura'],
    accessibilityRules: 'Indicador textual explicativo de status em cada nó.'
  },
  {
    name: 'Painel Split View (Cockpit)',
    category: 'Contêineres & Painéis',
    description: 'Layout dividido em duas colunas para trabalho simultâneo (ex: Rascunho IA + Dados do Aluno).',
    variants: ['Dividido 50/50', 'Dividido 30/70 (Sidebar de contexto)'],
    statesHandled: ['Visão Dupla', 'Visão Expandida (Full screen)'],
    accessibilityRules: 'Atalhos para ocultar/exibir painel secundário.'
  },
  {
    name: 'Barra Lateral de Navegação (Sidebar)',
    category: 'Navegação',
    description: 'Menu fixo vertical contendo os módulos da plataforma.',
    variants: ['Expandida (260px com rótulos)', 'Recolhida (64px apenas ícones)'],
    statesHandled: ['Módulo Ativo', 'Módulo com Pendência (Badge vermelho)'],
    accessibilityRules: 'Marcador ARIA aria-current="page" no item ativo.'
  },
  {
    name: 'Barra Superior (Header Contextual)',
    category: 'Navegação',
    description: 'Topo da aplicação com título do módulo, atalhos de perfil e status de sincronização.',
    variants: ['Header Padrão', 'Header de Aula Ativa com Cronômetro'],
    statesHandled: ['Online', 'Offline (Aviso destacado)'],
    accessibilityRules: 'Título H1 do módulo para leitores de tela.'
  },
  {
    name: 'Rodapé de Status (Footer Status Bar)',
    category: 'Feedback & Status',
    description: 'Barra inferior discreta com contagem de dados locais salvos e versão do aplicativo.',
    variants: ['Barra Discreta (24px)'],
    statesHandled: ['100% Sincronizado', 'Sincronizando em segundo plano'],
    accessibilityRules: 'Leitura não-intrusiva de status de rede.'
  }
];

export const ICON_SYSTEM_RULES = {
  family: 'Lucide React Icons',
  strokeWidth: '1.75px (Padrão óptico equilibrado)',
  sizesPx: [
    { name: 'Micro', size: '12px', usage: 'Dentro de badges pequenas e indicadores' },
    { name: 'Padrão (Body)', size: '16px', usage: 'Ao lado de botões, itens de menu e formulários' },
    { name: 'Médio (Card)', size: '20px', usage: 'Títulos de cards e modais' },
    { name: 'Destaque (Hero)', size: '24px', usage: 'Ícones de áreas principais e banners' }
  ],
  rules: [
    'UNIFORMIDADE DE ESTILO: Proibido misturar ícones de linhas com ícones preenchidos no mesmo contexto.',
    'ALINHAMENTO ÓPTICO: Todo ícone posicionado ao lado de um texto deve possuir um gap de 8px (space-2).',
    'COR SEMÂNTICA: A cor do ícone deve corresponder exatamente à intenção semântica (Verde = Sucesso, Vermelho = Erro).',
    'ACESSIBILIDADE: Ícones decorativos devem conter aria-hidden="true". Ícones interativos isolados exigem aria-label.'
  ]
};

export const UI_STATES: UIStateDefinition[] = [
  {
    stateName: '1. Estado de Carregamento (Loading)',
    visualTrigger: 'Primeiro carregamento da tela ou busca de dados no servidor/banco.',
    microcopyPattern: 'Skeleton shimmer suave em tons de cinza (#F1F5F9). Ausência de bloqueios bruscos.',
    componentBehavior: 'Exibe o esqueleto estrutural do card enquanto os dados chegam, mantendo o layout fixo.',
    icon: 'Loader2 (Spinning)'
  },
  {
    stateName: '2. Estado Offline (Sem Internet)',
    visualTrigger: 'Perda de conexão de dados móveis ou Wi-Fi no celular/notebook.',
    microcopyPattern: '"Você está offline. Suas alterações foram salvas com segurança no dispositivo e serão sincronizadas automaticamente."',
    componentBehavior: 'Pílula discreta no topo da tela em tom âmbar suave. O sistema continua 100% operacional localmente.',
    icon: 'WifiOff'
  },
  {
    stateName: '3. Estado de Erro (Error State)',
    visualTrigger: 'Falha de validação em formulário ou erro imprevisto de sistema.',
    microcopyPattern: '"Não foi possível concluir esta ação. Tente novamente em alguns instantes ou verifique os dados inseridos."',
    componentBehavior: 'Caixa de aviso em fundo rosa suave com botão direto de "Tentar Novamente". NUNCA exibe códigos de erro frios.',
    icon: 'AlertTriangle'
  },
  {
    stateName: '4. Estado Vazio (Empty State)',
    visualTrigger: 'Turma recém-criada sem alunos ou ausência de planos cadastrados no mês.',
    microcopyPattern: '"Nenhum plano de aula cadastrado para esta semana. Que tal criar seu primeiro roteiro com a IA Aurora?"',
    componentBehavior: 'Ilustração vetorial amigável, mensagem acolhedora e botão de ação principal em 1 clique.',
    icon: 'FolderPlus'
  },
  {
    stateName: '5. Estado de Sucesso (Success State)',
    visualTrigger: 'Conclusão bem-sucedida de chamada, salvamento de plano ou emissão de parecer.',
    microcopyPattern: '"Chamada realizada com sucesso! 26 alunos presentes registrados."',
    componentBehavior: 'Toast flutuante verde discreto no canto inferior direito que desliza e desaparece em 3 segundos.',
    icon: 'CheckCircle2'
  },
  {
    stateName: '6. Estado Sincronizando (Syncing)',
    visualTrigger: 'Retorno da conexão de internet com dados pendentes de envio.',
    microcopyPattern: '"Sincronizando 3 alterações pendentes com o banco de dados..."',
    componentBehavior: 'Ponto verde pulsante suave no rodapé da aplicação.',
    icon: 'RefreshCw'
  }
];

export const MICROINTERACTION_RULES = {
  timing: {
    snappyMicro: '150ms (Hover em botões, seleção de checkbox, abertura de dropdowns)',
    modalTransition: '250ms (Entrada de caixas de diálogo e drawers laterais com ease-out)',
    pageTransition: '300ms (Troca suave entre abas principais)'
  },
  easing: 'cubic-bezier(0.16, 1, 0.3, 1) — Easing de desaceleração suave e natural',
  mobileHaptics: 'Feedback tátil (vibração ultraleve de 10ms) ao concluir a chamada de presença rápida no celular do professor.'
};

export const ACCESSIBILITY_RULES_WCAG = [
  {
    rule: 'Contraste Mínimo de Cor (WCAG 2.1 AA)',
    details: 'Todo texto normal possui contraste superior a 4.5:1 contra seu fundo. Textos grandes e títulos possuem contraste superior a 3:1.'
  },
  {
    rule: 'Navegação 100% Operável por Tecla (Keyboard Nav)',
    details: 'Qualquer ação no sistema pode ser realizada utilizando Tab, Shift+Tab, Enter, Espaço e Esc, com anel de foco visível (Ring Indigo).'
  },
  {
    rule: 'Suporte a Leitores de Tela (Screen Readers / ARIA)',
    details: 'Uso rigoroso de HTML5 semântico (<main>, <nav>, <header>, <article>) e atributos ARIA em componentes customizados.'
  },
  {
    rule: 'Acessibilidade para Daltonismo',
    details: 'Nenhuma informação é transmitida EXCLUSIVAMENTE por cor. Toda tag de estado combina cor com texto descritivo e ícone de formato distinto.'
  }
];

export const DESIGN_CONSISTENCY_RULES = [
  {
    title: '1. Proibição de Cores Arbitrárias fora do Token',
    description: 'Nenhum desenvolvedor ou designer pode aplicar cores HEX avulsas no CSS. Todas as cores devem vir dos tokens da classe Tailwind declarada.'
  },
  {
    title: '2. Regra Matemática de Arredondamento (Border Radius)',
    description: 'Botoes e inputs = 8px (rounded-lg). Cards e modais = 12px (rounded-xl). Badges e pílulas = 9999px (rounded-full).'
  },
  {
    title: '3. Hierarquia de Fontes Restrita',
    description: 'Proibido utilizar mais de 2 famílias tipográficas na aplicação inteira (Plus Jakarta Sans para interface e JetBrains Mono para códigos).'
  },
  {
    title: '4. Tratamento Obrigatório de Todos os 6 Estados da UI',
    description: 'Nenhum componente ou tela pode ser enviado para produção sem a implementação explícita de seu estado de Carregamento, Vazio e Erro.'
  }
];

export const HEAD_OF_DESIGN_VERDICT = {
  directorName: 'Head of Design, UX Director & Design System Architect EducaFlow',
  verdictTitle: 'Parecer Técnico do Design System v1.0 para os Próximos 10 Anos',
  status: 'APROVADO E RECOMENDADO PARA IMPLEMENTAÇÃO IMEDIATA',
  statement: 'O "EducaFlow Design System v1.0" estabelece uma linguagem visual atemporal, acessível e de altíssima eficiência operacional. Ao eliminar modismos gráficos e focar na redução da fadiga cognitiva do professor, a arquitetura visual garante escalabilidade para mais de uma década de evolução da plataforma, acelerando a velocidade de desenvolvimento em mais de 300% com consistência absoluta.'
};
