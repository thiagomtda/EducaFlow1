import { BlueprintFeature, BlueprintSprint, RoadmapVersion } from '../types';

export const MVP_FEATURES: BlueprintFeature[] = [
  // --- SPRINT 1: CORE FOUNDATION & IDENTITY ---
  {
    id: 'feat-101',
    name: 'Autenticação Simplificada & Perfil Pedagógico',
    moduleCode: 'M01',
    moduleName: 'Cockpit do Professor (Home)',
    objective: 'Permitir onboarding ultrarrápido com login via Google/Gov.br e cadastro de turmas do EF1 (1º ao 5º ano).',
    teacherBenefit: 'Acesso imediato sem burocracia, pré-configurando a série e disciplinas lecionadas em menos de 1 minuto.',
    dependencies: ['Infraestrutura Base / Auth Service'],
    complexity: 'Baixa',
    businessValue: 'Crítico / Vital',
    priority: 'P1 - Crítico (MVP)',
    devEstimate: '3 dias (24h)',
    sprint: 1
  },
  {
    id: 'feat-102',
    name: 'Cockpit Diário (Dashboard Executivo de Aulas)',
    moduleCode: 'M01',
    moduleName: 'Cockpit do Professor (Home)',
    objective: 'Centralizar a visão do dia: próximo plano de aula, chamadas pendentes e atalhos de 1 clique ("Amanhã na Sala").',
    teacherBenefit: 'Elimina a ansiedade matinal do professor ao mostrar exatamente o que fazer no dia sem navegar em submenus.',
    dependencies: ['feat-101'],
    complexity: 'Média',
    businessValue: 'Crítico / Vital',
    priority: 'P1 - Crítico (MVP)',
    devEstimate: '4 dias (32h)',
    sprint: 1
  },

  // --- SPRINT 2: PLANEJAMENTO INTELIGENTE & BNCC ---
  {
    id: 'feat-201',
    name: 'Gerador Magico de Planos de Aula (BNCC Alignment)',
    moduleCode: 'M03',
    moduleName: 'Planejador de Aulas Inteligente',
    objective: 'Gerar planos de aula completos e alinhados à BNCC a partir de um tema simples ou habilidade escolhida.',
    teacherBenefit: 'Reduz o tempo de planejamento de 3 horas para 5 minutos por semana com código da BNCC e sequência didática.',
    dependencies: ['feat-101', 'Motor IA EducaFlow (Gemini API Integration)'],
    complexity: 'Alta',
    businessValue: 'Crítico / Vital',
    priority: 'P1 - Crítico (MVP)',
    devEstimate: '6 dias (48h)',
    sprint: 2
  },
  {
    id: 'feat-202',
    name: 'Assistente de Adaptação Inclusiva (PDI / Neurodiversidade)',
    moduleCode: 'M03',
    moduleName: 'Planejador de Aulas Inteligente',
    objective: 'Adaptar o plano gerado para alunos com TDAH, Autismo (TEA) ou deficiência visual com 1 clique.',
    teacherBenefit: 'Garante inclusão real na prática pedagógica sem exaurir o tempo do professor criando materiais do zero.',
    dependencies: ['feat-201'],
    complexity: 'Média',
    businessValue: 'Crítico / Vital',
    priority: 'P1 - Crítico (MVP)',
    devEstimate: '4 dias (32h)',
    sprint: 2
  },

  // --- SPRINT 3: AVALIAÇÃO & CORREÇÃO ÁGIL ---
  {
    id: 'feat-301',
    name: 'Criador de Atividades & Gerador de Rubricas',
    moduleCode: 'M05',
    moduleName: 'Gerador de Avaliações & Provas',
    objective: 'Criar listas de exercícios e provas formativas prontas para impressão ou envio digital.',
    teacherBenefit: 'Provas formatadas automaticamente com gabarito explicativo e alinhamento direto aos descritores da BNCC.',
    dependencies: ['feat-201'],
    complexity: 'Média',
    businessValue: 'Crítico / Vital',
    priority: 'P1 - Crítico (MVP)',
    devEstimate: '5 dias (40h)',
    sprint: 3
  },
  {
    id: 'feat-302',
    name: 'Leitor & Corretor Rápido de Atividades',
    moduleCode: 'M06',
    moduleName: 'Analisador de Desempenho & Notas',
    objective: 'Permitir lançamento ágil de notas por conceito ou pontuação com sugestões automáticas de feedback individual.',
    teacherBenefit: 'Elimina fins de semana perdidos corrigindo pilhas de cadernos e provas repetitivas.',
    dependencies: ['feat-301'],
    complexity: 'Alta',
    businessValue: 'Alto',
    priority: 'P2 - Essencial (MVP)',
    devEstimate: '5 dias (40h)',
    sprint: 3
  },

  // --- SPRINT 4: DIÁRIO DE CLASSE & FREQUÊNCIA ---
  {
    id: 'feat-401',
    name: 'Lançador de Frequência "Zero Fricção"',
    moduleCode: 'M02',
    moduleName: 'Diário de Classe Automático',
    objective: 'Registro de chamada diária em lote (marcar apenas faltosos) sincronizado com o calendário escolar.',
    teacherBenefit: 'Chamada feita em 15 segundos na sala de aula via celular ou notebook sem travamentos.',
    dependencies: ['feat-101'],
    complexity: 'Baixa',
    businessValue: 'Crítico / Vital',
    priority: 'P1 - Crítico (MVP)',
    devEstimate: '3 dias (24h)',
    sprint: 4
  },
  {
    id: 'feat-402',
    name: 'Registro de Ocorrências & Anotações de Desenvolvimento',
    moduleCode: 'M02',
    moduleName: 'Diário de Classe Automático',
    objective: 'Anotar fatos marcantes do dia por aluno com auxílio da IA para sintetizar observações pedagógicas.',
    teacherBenefit: 'Histórico comportamental seguro para reuniões de pais e conselhos de classe sem rasuras.',
    dependencies: ['feat-401'],
    complexity: 'Média',
    businessValue: 'Alto',
    priority: 'P2 - Essencial (MVP)',
    devEstimate: '4 dias (32h)',
    sprint: 4
  },

  // --- SPRINT 5: RELATÓRIOS BIMESTRAIS & FECHAMENTO ---
  {
    id: 'feat-501',
    name: 'Gerador Automático de Relatórios Pareceres Indivíduos',
    moduleCode: 'M07',
    moduleName: 'Gerador de Relatórios Bimestrais',
    objective: 'Sintetizar pareceres descritivos do aluno com base no histórico de avaliações e presença do bimestre.',
    teacherBenefit: 'Transforma a tarefa mais estressante do bimestre (30+ relatórios longos) em poucas horas de revisão carinhosa.',
    dependencies: ['feat-302', 'feat-402'],
    complexity: 'Alta',
    businessValue: 'Crítico / Vital',
    priority: 'P1 - Crítico (MVP)',
    devEstimate: '6 dias (48h)',
    sprint: 5
  },
  {
    id: 'feat-502',
    name: 'Exportador PDF/Impressão Formatada para Coordenação',
    moduleCode: 'M07',
    moduleName: 'Gerador de Relatórios Bimestrais',
    objective: 'Exportar planos de aula e pareceres em PDF impecável com cabeçalho oficial da escola e código QR.',
    teacherBenefit: 'Entrega documentos perfeitamente padronizados para a coordenação pedagógica sem desformatação.',
    dependencies: ['feat-501'],
    complexity: 'Baixa',
    businessValue: 'Alto',
    priority: 'P2 - Essencial (MVP)',
    devEstimate: '3 dias (24h)',
    sprint: 5
  }
];

export const SPRINTS_PLAN: BlueprintSprint[] = [
  {
    sprintNumber: 1,
    title: 'Sprint 1 — Core Foundation & Cockpit Diário',
    goal: 'Entregar a infraestrutura básica de autenticação, perfil do professor de EF1 e o Cockpit executivo do dia.',
    deliverable: 'Professor consegue se cadastrar, configurar suas turmas do 1º ao 5º ano e visualizar seu painel matinal de tarefas.',
    duration: '2 Semanas (10 dias úteis)',
    totalEstimate: '7 dias de dev (56h)',
    featureIds: ['feat-101', 'feat-102']
  },
  {
    sprintNumber: 2,
    title: 'Sprint 2 — Planejamento Inteligente & Inclusão BNCC',
    goal: 'Desenvolver o motor de IA pedagógica para geração de planos de aula BNCC e adaptações para alunos neurodivergentes.',
    deliverable: 'Geração de planos completos com 1 clique e adaptação imediata para autismo/TDAH/PDI.',
    duration: '2 Semanas (10 dias úteis)',
    totalEstimate: '10 dias de dev (80h)',
    featureIds: ['feat-201', 'feat-202']
  },
  {
    sprintNumber: 3,
    title: 'Sprint 3 — Avaliação, Provas & Correção Ágil',
    goal: 'Criar gerador de atividades com rubricas BNCC e assistente de correção e emissão de gabaritos.',
    deliverable: 'Professor gera provas formativas e tem sugestões automáticas de feedbacks para lançar notas sem estresse.',
    duration: '2 Semanas (10 dias úteis)',
    totalEstimate: '10 dias de dev (80h)',
    featureIds: ['feat-301', 'feat-302']
  },
  {
    sprintNumber: 4,
    title: 'Sprint 4 — Diário de Classe & Registro de Ocorrências',
    goal: 'Entregar o sistema de frequência em lote ("zero fricção") e diário de bordo pedagógico do aluno.',
    deliverable: 'Chamada diária em 15 segundos e registro simplificado de observações diárias para conselho de classe.',
    duration: '2 Semanas (10 dias úteis)',
    totalEstimate: '7 dias de dev (56h)',
    featureIds: ['feat-401', 'feat-402']
  },
  {
    sprintNumber: 5,
    title: 'Sprint 5 — Relatórios Bimestrais & Exportação de PDF',
    goal: 'Desenvolver o sintetizador automático de pareceres descritivos bimestrais e exportação profissional.',
    deliverable: 'Geração de relatórios descritivos completos prontos para impressão ou entrega para a coordenação.',
    duration: '2 Semanas (10 dias úteis)',
    totalEstimate: '9 dias de dev (72h)',
    featureIds: ['feat-501', 'feat-502']
  }
];

export const PRODUCT_ROADMAP: RoadmapVersion[] = [
  {
    version: 'MVP 1.0',
    codename: 'Solidez Pedagógica & Alívio Imediato',
    releaseTimeline: 'Sprints 1 a 5 (Mês 1 e 2)',
    focus: 'Eliminação da sobrecarga de planejamento semanal, chamadas diárias e relatórios pareceres do EF1.',
    strategicGoal: 'Alcançar retenção diária (DAU) superior a 70% com professores salvando no mínimo 5 horas semanais.',
    keyHighlights: [
      'Cockpit diário "Amanhã na Sala"',
      'Gerador de Planos de Aula BNCC com IA ( Geminized )',
      'Assistente de Adaptação para Neurodiversidade (TDAH/TEA)',
      'Chamada diária e diário de classe em lote em 15s',
      'Sintetizador automático de Pareceres Descritivos Bimestrais'
    ]
  },
  {
    version: 'Versão 1.1',
    codename: 'Comunicação Escolar & Banco de Jogos',
    releaseTimeline: 'Mês 3',
    focus: 'Integração de atividades lúdicas/atividades práticas de alfabetização e canal direto de notas com os pais.',
    strategicGoal: 'Expansão do engajamento para a comunidade escolar e apoio direto ao processo de alfabetização.',
    keyHighlights: [
      'Banco da Galáxia do Conhecimento (Atividades lúdicas de Português e Matemática)',
      'Envio de comunicados pedagógicos via WhatsApp para responsáveis com aprovação do professor',
      'Modelos de provas formativas com ilustração adaptada para o 1º e 2º ano',
      'Importação em lote de turmas via planilha Excel/CSV'
    ]
  },
  {
    version: 'Versão 1.2',
    codename: 'Análise de Desempenho & Dificuldades Aprendizagem',
    releaseTimeline: 'Mês 4 e 5',
    focus: 'Painel visual de lacunas de aprendizagem por aluno e turma com diagnósticos preditivos.',
    strategicGoal: 'Aumentar o valor percebido pelos coordenadores pedagógicos ao identificar turmas em risco de defasagem.',
    keyHighlights: [
      'Mapa de calor de habilidades BNCC não consolidadas por turma',
      'Alertas de frequência baixa e risco de evasão escolar',
      'Sugestão automática de atividades de reforço personalizadas para grupos de alunos',
      'Relatórios consolidados para reuniões de Conselho de Classe'
    ]
  },
  {
    version: 'Versão 2.0',
    codename: 'Plataforma B2B para Redes Escolares & Escolas Privadas',
    releaseTimeline: 'Mês 6 a 8',
    focus: 'Módulo de Gestão para Secretarias de Educação (SME) e Diretores de Escolas Privadas.',
    strategicGoal: 'Monetização B2B/B2G e escala nacional com múltiplos usuários e permissões hierárquicas.',
    keyHighlights: [
      'Painel do Coordenador: aprovação e revisão em massa de planos de aula',
      'Módulo de Gestão de Redes de Ensino (Visão macro de secretarias municipais)',
      'Assinatura digital e validação de diários oficiais escolares',
      'Integração com sistemas legados (Prodesp, i-Educar, Educacenso)'
    ]
  },
  {
    version: 'Versão 3.0',
    codename: 'Ecossistema Aberto de Co-Criação & IA Tutor',
    releaseTimeline: 'Mês 9 a 12',
    focus: 'Marketplace de recursos pedagógicos entre professores e tutores virtuais interativos para alunos.',
    strategicGoal: 'Criar efeito de rede defensável e comunidade ativa de professores autores no Brasil.',
    keyHighlights: [
      'EducaFlow Hub: professores compartilham e rentabilizam sequências didáticas originais',
      'Tutor de Voz de IA para suporte em tempo real durante a preparação de aulas na sala de aula',
      'IA preditiva de alocação de tempo e saúde mental docente (Burnout Prevention Index)',
      'Aplicações de Realidade Aumentada e jogos educativos interativos integrados às aulas'
    ]
  }
];
