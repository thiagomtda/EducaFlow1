import { EcosystemArea, TreeNode, CriticalQuestionAnswer } from '../types';

export const ECOSYSTEM_AREAS: EcosystemArea[] = [
  {
    id: 'area-1',
    number: 'ÁREA 1',
    title: 'Cockpit do Professor (Presença & Sala de Aula)',
    iconName: 'LayoutDashboard',
    colorTheme: 'indigo',
    description: 'Central operacional de apoio em tempo real à regência presencial, focada na gestão sem atrito do cotidiano com os alunos.',
    coreExperienceObjective: 'Permitir a tomada de presença e acompanhamento da turma em menos de 30 segundos, operável com apenas uma mão no celular durante a aula.',
    modules: [
      {
        id: 'mod-1-1',
        code: 'MOD-1.1',
        name: 'Diário de Bordo Flutuante (Chamada & Registro Rápido)',
        iconName: 'CheckSquare',
        tagline: 'Registro instantâneo de presença e ocorrências pontuais sem pausar a aula.',
        mainObjective: 'Registrar frequência diária, ausências justificadas e ocorrências da rotina escolar em poucos toques.',
        problemSolved: 'Elimina o diário físico de papel que acumula rasuras e sistemas legados lentos que exigem digitação de notas longas no fim do dia.',
        usageFrequency: 'Diária (múltiplas vezes)',
        perceivedValue: 'Vital (Insubstituível)',
        dependencies: ['MOD-1.2 (Roster da Turma)'],
        mvpStatus: 'MVP (P1 - Indispensável)'
      },
      {
        id: 'mod-1-2',
        code: 'MOD-1.2',
        name: 'Roster Interativo & Mapeamento de Turma',
        iconName: 'Users',
        tagline: 'Visão 360º de cada estudante com fotos, laudos e alertas de atenção especial.',
        mainObjective: 'Centralizar fichas ativas dos estudantes, sinalizando laudos (PCD/TDAH/Autismo), restrições alimentares e observações de convivência.',
        problemSolved: 'Dispersão de informações em fichas de papel na coordenação, gerando falta de preparo imediato do professor diante de necessidades inclusivas.',
        usageFrequency: 'Diária / Semanal',
        perceivedValue: 'Alto (Economia direta de tempo)',
        dependencies: [],
        mvpStatus: 'MVP (P1 - Indispensável)'
      }
    ]
  },
  {
    id: 'area-2',
    number: 'ÁREA 2',
    title: 'Estúdio de Planejamento & BNCC (Copiloto Pedagógico)',
    iconName: 'BookOpen',
    colorTheme: 'emerald',
    description: 'Ambiente inteligente para criação, alinhamento curricular e preparação de sequências didáticas e materiais para o Ensino Fundamental I.',
    coreExperienceObjective: 'Reduzir em até 80% o tempo gasto na redação de planos de aula e pesquisa manual de códigos e objetivos da BNCC.',
    modules: [
      {
        id: 'mod-2-1',
        code: 'MOD-2.1',
        name: 'Gerador de Planos de Aula BNCC',
        iconName: 'Sparkles',
        tagline: 'Planos de aula completos sugeridos com base no tema, ano letivo e habilidades oficiais da BNCC.',
        mainObjective: 'Estruturar planos de aula diários e sequências didáticas alinhados aos códigos BNCC com personalização em tempo real.',
        problemSolved: 'Elimina horas de trabalho doméstico não remunerado à noite digitando descrições burocráticas e pesquisando códigos curriculares.',
        usageFrequency: 'Semanal / Quinzenal',
        perceivedValue: 'Vital (Insubstituível)',
        dependencies: ['MOD-2.2 (Banco Vivo de Atividades)'],
        mvpStatus: 'MVP (P1 - Indispensável)'
      },
      {
        id: 'mod-2-2',
        code: 'MOD-2.2',
        name: 'Banco Vivo de Atividades & Adaptador de Impressos',
        iconName: 'FileText',
        tagline: 'Acervo e formatação ágil de exercícios para turmas com níveis heterogêneos.',
        mainObjective: 'Fornecer e adaptar exercícios impressos para alunos em alfabetização acelerada ou com necessidades de reforço.',
        problemSolved: 'A frustração de ter que recriar manualmente a mesma folha de atividades em 3 formatos diferentes para abarcar os níveis da turma.',
        usageFrequency: 'Semanal / Quinzenal',
        perceivedValue: 'Alto (Economia direta de tempo)',
        dependencies: ['MOD-2.1 (Gerador de Planos)'],
        mvpStatus: 'MVP (P1 - Indispensável)'
      }
    ]
  },
  {
    id: 'area-3',
    number: 'ÁREA 3',
    title: 'Hub de Avaliação & Diagnóstico Contínuo',
    iconName: 'Award',
    colorTheme: 'amber',
    description: 'Monitoramento contínuo da aprendizagem, sondagens de alfabetização e geração assistida de pareceres pedagógicos.',
    coreExperienceObjective: 'Transformar a assustadora maratona de fim de bimestre em um processo contínuo e sem sobrecarga emocional.',
    modules: [
      {
        id: 'mod-3-1',
        code: 'MOD-3.1',
        name: 'Mapeador de Hipóteses de Escrita e Leitura (Sondagem EF1)',
        iconName: 'LineChart',
        tagline: 'Registro simplificado dos níveis de alfabetização (Pré-silábico a Alfabético).',
        mainObjective: 'Mapear em matrizes visuais o avanço psicogenético da escrita de cada criança do 1º ao 5º ano.',
        problemSolved: 'Planilhas dispersas e falta de clareza sobre o nível real de alfabetização da turma para apresentação na coordenação.',
        usageFrequency: 'Mensal / Bimestral',
        perceivedValue: 'Vital (Insubstituível)',
        dependencies: ['MOD-1.2 (Roster da Turma)'],
        mvpStatus: 'MVP (P1 - Indispensável)'
      },
      {
        id: 'mod-3-2',
        code: 'MOD-3.2',
        name: 'Gerador de Pareceres Descritivos & Notas',
        iconName: 'FileSignature',
        tagline: 'Sintetizador inteligente que transforma registros bimestrais em pareceres humanizados.',
        mainObjective: 'Compilar a trajetória do aluno e gerar rascunhos de pareceres pedagógicos individuais com linguagem clara e encorajadora.',
        problemSolved: 'Elimina o pico mais alto de estresse do ano (redação manual de 30+ pareceres longos nos fins de semana do fechamento bimestral).',
        usageFrequency: 'Bimestral / Trimestral',
        perceivedValue: 'Vital (Insubstituível)',
        dependencies: ['MOD-3.1 (Mapeador de Hipóteses)', 'MOD-1.1 (Diário de Bordo)'],
        mvpStatus: 'MVP (P1 - Indispensável)'
      }
    ]
  },
  {
    id: 'area-4',
    number: 'ÁREA 4',
    title: 'Ponte Família & Rede de Apoio',
    iconName: 'HeartHandshake',
    colorTheme: 'rose',
    description: 'Comunicação oficial, institucional e respeitosa com os responsáveis sem invasão da privacidade do professor.',
    coreExperienceObjective: 'Garantir registros transparentes de combinados com as famílias mantendo o número pessoal de WhatsApp do docente preservado.',
    modules: [
      {
        id: 'mod-4-1',
        code: 'MOD-4.1',
        name: 'Central de Ocorrências & Recados Humanizados',
        iconName: 'MessageSquare',
        tagline: 'Comunicação direta para comunicados, elogios e alinhamentos de comportamento.',
        mainObjective: 'Permitir o envio e arquivamento de recados institucionais com confirmação de leitura pelos responsáveis.',
        problemSolved: 'A invasão do WhatsApp pessoal do professor em horários de descanso (noites e finais de semana) e falta de registros históricos oficiais.',
        usageFrequency: 'Semanal / Sob demanda',
        perceivedValue: 'Vital (Insubstituível)',
        dependencies: ['MOD-1.2 (Roster da Turma)'],
        mvpStatus: 'MVP (P1 - Indispensável)'
      },
      {
        id: 'mod-4-2',
        code: 'MOD-4.2',
        name: 'Portfólio Digital & Mostra Pedagógica',
        iconName: 'Camera',
        tagline: 'Galeria visual de momentos marcantes e evoluções de projetos.',
        mainObjective: 'Registrar fotos de trabalhos das crianças para apresentação em reuniões de pais e relatórios visuais.',
        problemSolved: 'Dificuldade de evidenciar a evolução prática e artística dos alunos além das provas e cadernos escritos.',
        usageFrequency: 'Mensal / Bimestral',
        perceivedValue: 'Médio (Organizador complementar)',
        dependencies: ['MOD-1.2 (Roster da Turma)'],
        mvpStatus: 'Versão Futura (V2 - Produtividade Avançada)'
      }
    ]
  },
  {
    id: 'area-5',
    number: 'ÁREA 5',
    title: 'Santuário & Saúde Docente (Gestão do Tempo)',
    iconName: 'ShieldCheck',
    colorTheme: 'purple',
    description: 'Espaço de delimitação da jornada de trabalho, controle da Hora-Atividade e preservação da saúde mental.',
    coreExperienceObjective: 'Devolver ao professor a sensação clara de dever cumprido e encerramento consciente do expediente.',
    modules: [
      {
        id: 'mod-5-1',
        code: 'MOD-5.1',
        name: 'Cockpit do Ponto Eletrônico & Hora-Atividade (HA)',
        iconName: 'Clock',
        tagline: 'Marcador de jornada e botão de "Encerrar Dia de Trabalho".',
        mainObjective: 'Computar as horas dedicadas ao planejamento (HA) e sinalizar visualmente a desconexão do dever funcional no fim do turno.',
        problemSolved: 'Burnout por invisibilização das horas extras e a incapacidade psíquica de "desligar" do trabalho escolar quando está em casa.',
        usageFrequency: 'Diária (múltiplas vezes)',
        perceivedValue: 'Vital (Insubstituível)',
        dependencies: [],
        mvpStatus: 'MVP (P1 - Indispensável)'
      },
      {
        id: 'mod-5-2',
        code: 'MOD-5.2',
        name: 'Biblioteca Autoral & Acervo Reutilizável',
        iconName: 'FolderArchive',
        tagline: 'Mala digital para guardar projetos e avaliações dos anos anteriores.',
        mainObjective: 'Armazenar sequências didáticas autorais de sucesso com busca semântica para reaproveitamento em anos futuros.',
        problemSolved: 'Trabalho duplicado ao longo das décadas por perda de arquivos em pendrives quebrados ou contas pessoais antigas.',
        usageFrequency: 'Ocasional / Sob demanda',
        perceivedValue: 'Médio (Organizador complementar)',
        dependencies: [],
        mvpStatus: 'Versão Futura (V2 - Produtividade Avançada)'
      }
    ]
  }
];

export const HIERARCHICAL_TREE_DATA: TreeNode = {
  id: 'root',
  label: 'Plataforma EducaFlow (Ensino Fundamental I)',
  type: 'platform',
  details: 'Ecossistema Integrado de Produtividade & Bem-Estar Docente',
  children: [
    {
      id: 'tree-area-1',
      code: 'ÁREA 1',
      label: 'Cockpit do Professor (Presença & Sala)',
      type: 'area',
      status: 'Core Operacional',
      children: [
        {
          id: 'tree-mod-1-1',
          code: 'MOD-1.1',
          label: 'Diário de Bordo Flutuante',
          type: 'module',
          status: 'MVP P1',
          children: [
            { id: 'f-1-1-1', label: 'Chamada Rápida com 1-Toque', type: 'feature' },
            { id: 'f-1-1-2', label: 'Registro de Ocorrências Rápidas', type: 'feature' },
            { id: 'f-1-1-3', label: 'Sincronização Offline Automática', type: 'feature' }
          ]
        },
        {
          id: 'tree-mod-1-2',
          code: 'MOD-1.2',
          label: 'Roster & Mapeamento de Turma',
          type: 'module',
          status: 'MVP P1',
          children: [
            { id: 'f-1-2-1', label: 'Ficha do Estudante com Foto', type: 'feature' },
            { id: 'f-1-2-2', label: 'Sinalização de Laudos (PCD/TDAH/TEA)', type: 'feature' },
            { id: 'f-1-2-3', label: 'Alertas de Restrição Alimentar/Saúde', type: 'feature' }
          ]
        }
      ]
    },
    {
      id: 'tree-area-2',
      code: 'ÁREA 2',
      label: 'Estúdio de Planejamento & BNCC',
      type: 'area',
      status: 'Copiloto Pedagógico',
      children: [
        {
          id: 'tree-mod-2-1',
          code: 'MOD-2.1',
          label: 'Gerador de Planos de Aula BNCC',
          type: 'module',
          status: 'MVP P1',
          children: [
            { id: 'f-2-1-1', label: 'Assistente BNCC por Habilidade e Ano', type: 'feature' },
            { id: 'f-2-1-2', label: 'Sequências Didáticas Personalizáveis', type: 'feature' },
            { id: 'f-2-1-3', label: 'Exportação para PDF / Impressão Direta', type: 'feature' }
          ]
        },
        {
          id: 'tree-mod-2-2',
          code: 'MOD-2.2',
          label: 'Banco Vivo de Atividades & Impressos',
          type: 'module',
          status: 'MVP P1',
          children: [
            { id: 'f-2-2-1', label: 'Gerador de Exercícios Diferenciados', type: 'feature' },
            { id: 'f-2-2-2', label: 'Formatador Rápido de Folha de Resposta', type: 'feature' }
          ]
        }
      ]
    },
    {
      id: 'tree-area-3',
      code: 'ÁREA 3',
      label: 'Hub de Avaliação & Diagnóstico',
      type: 'area',
      status: 'Inteligência Pedagógica',
      children: [
        {
          id: 'tree-mod-3-1',
          code: 'MOD-3.1',
          label: 'Mapeador de Hipóteses (Sondagem)',
          type: 'module',
          status: 'MVP P1',
          children: [
            { id: 'f-3-1-1', label: 'Matriz Psicogenética de Escrita (EF1)', type: 'feature' },
            { id: 'f-3-1-2', label: 'Gráficos de Evolução da Alfabetização', type: 'feature' }
          ]
        },
        {
          id: 'tree-mod-3-2',
          code: 'MOD-3.2',
          label: 'Gerador de Pareceres Descritivos',
          type: 'module',
          status: 'MVP P1',
          children: [
            { id: 'f-3-2-1', label: 'Sintetizador de Histórico do Aluno', type: 'feature' },
            { id: 'f-3-2-2', label: 'Editor Encorajador de Textos Descritivos', type: 'feature' }
          ]
        }
      ]
    },
    {
      id: 'tree-area-4',
      code: 'ÁREA 4',
      label: 'Ponte Família & Rede de Apoio',
      type: 'area',
      status: 'Comunicação Protegida',
      children: [
        {
          id: 'tree-mod-4-1',
          code: 'MOD-4.1',
          label: 'Central de Ocorrências & Recados',
          type: 'module',
          status: 'MVP P1',
          children: [
            { id: 'f-4-1-1', label: 'Envio Institucional sem WhatsApp Pessoal', type: 'feature' },
            { id: 'f-4-1-2', label: 'Confirmação de Leitura e Protocolo', type: 'feature' }
          ]
        },
        {
          id: 'tree-mod-4-2',
          code: 'MOD-4.2',
          label: 'Portfólio Digital (Mostra)',
          type: 'module',
          status: 'Versão V2',
          children: [
            { id: 'f-4-2-1', label: 'Galeria Fotográfica de Produção dos Alunos', type: 'feature' }
          ]
        }
      ]
    },
    {
      id: 'tree-area-5',
      code: 'ÁREA 5',
      label: 'Santuário & Saúde Docente',
      type: 'area',
      status: 'Gestão de Tempo e Bem-Estar',
      children: [
        {
          id: 'tree-mod-5-1',
          code: 'MOD-5.1',
          label: 'Ponto Eletrônico & Hora-Atividade',
          type: 'module',
          status: 'MVP P1',
          children: [
            { id: 'f-5-1-1', label: 'Contador Visual de Hora-Atividade (HA)', type: 'feature' },
            { id: 'f-5-1-2', label: 'Botão "Encerrar Expediente Docente"', type: 'feature' }
          ]
        },
        {
          id: 'tree-mod-5-2',
          code: 'MOD-5.2',
          label: 'Biblioteca & Acervo Reutilizável',
          type: 'module',
          status: 'Versão V2',
          children: [
            { id: 'f-5-2-1', label: 'Repositório Pessoal para Anos Futuros', type: 'feature' }
          ]
        }
      ]
    }
  ]
};

export const CRITICAL_ANALYSIS_QUESTIONS: CriticalQuestionAnswer[] = [
  {
    question: '1. Existem módulos redundantes na estrutura proposta?',
    verdict: 'Otimizado',
    summary: 'A estrutura é enxuta e sem sobreposição de papeis.',
    architecturalReasoning: 'Cada um dos 10 módulos atende a uma necessidade operacional perfeitamente distinta do cotidiano do professor de EF1. Não há duplicação de funções. Por exemplo, enquanto o Módulo 1.1 cuida da frequência em tempo real na aula, o Módulo 3.1 trata da avaliação pedagógica qualitativa (sondagem de alfabetização). A separação garante que a interface de sala de aula permaneça limpa e imediata.'
  },
  {
    question: '2. Algum módulo deveria ser fundido com outro para simplificar a plataforma?',
    verdict: 'Aprovado',
    summary: 'Análise de fusão entre Mapeador de Hipóteses (3.1) e Gerador de Pareceres (3.2).',
    architecturalReasoning: 'Testamos a hipótese de unificar a Sondagem com os Pareceres em um único módulo de "Avaliação Geral". No entanto, a decisão arquitetural foi mantê-los como componentes conectados sob a mesma Área 3. A sondagem é um instrumento de acompanhamento mensal específico do EF1 (alfabetização), enquanto o parecer é uma síntese formal bimestral. Unificá-los visualmente causaria confusão de momentos e estresse por acúmulo de dados.'
  },
  {
    question: '3. Algum módulo não gera valor suficiente para justificar sua existência?',
    verdict: 'Eliminado',
    summary: 'Funcionalidades "clichês" de software foram limpas da arquitetura.',
    architecturalReasoning: 'Eliminamos propositalmente do produto módulos comuns em concorrentes como "Fórum Social entre Professores", "Moedas/Gamificação para Alunos" e "Loja de Conteúdos". Pesquisas de UX mostram que o professor não deseja redes sociais corporativas na sua ferramenta de trabalho. O módulo de "Portfólio de Fotos" foi rebaixado para a V2 pois, embora gere valor visual, não impede o uso essencial da plataforma no MVP.'
  },
  {
    question: '4. O professor conseguiria entender toda a plataforma em menos de cinco minutos?',
    verdict: 'Simplificado',
    summary: 'Sim, devido ao espelhamento exato com a jornada física do dia de trabalho.',
    architecturalReasoning: 'O modelo mental não usa taxonomias de software (como "Sistemas", "Cadastros", "Relatórios" ou "Lançamentos"). A plataforma está organizada estritamente em torno dos 5 papéis diários do professor: 1. Na Aula (Chamada/Presença), 2. No Planejamento (Planos/BNCC), 3. Na Avaliação (Pareceres/Notas), 4. Nas Famílias (Recados), 5. No Meu Tempo (Ponto/Desconexão). Qualquer docente entende esse fluxo na primeira olhada.'
  }
];
