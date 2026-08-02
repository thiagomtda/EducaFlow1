import { SystemEntity, CopilotArchitecture, DataLifecycleStage, SystemAuditItem } from '../types';

export const SYSTEM_ENTITIES: SystemEntity[] = [
  {
    id: 'ent-1',
    name: 'Professor (User / Teacher)',
    category: 'Ator/Usuário',
    objective: 'Representar a identidade docente, preferências pedagógicas, credenciais de acesso e vínculo com a rede/escola.',
    responsibilities: [
      'Autenticar-se de forma segura na plataforma',
      'Configurar perfil de regência e turmas associadas',
      'Aprovar, editar e aplicar planos de aula e pareceres gerados pela IA'
    ],
    attributesStored: [
      'id (UUID)', 'email (Indexed)', 'fullName', 'avatarUrl', 'cpfHash', 
      'schoolNetworkId', 'subscriptionTier', 'createdAt', 'lastLoginAt'
    ],
    createdBy: 'Self (Auth Service / Onboarding)',
    modifiedBy: 'Professor ou Admin da Escola',
    usedBy: ['Todos os módulos do sistema'],
    relationships: [
      { targetEntity: 'Turma', cardinality: '1:N', description: 'Um professor leciona para uma ou mais turmas' },
      { targetEntity: 'Plano de Aula', cardinality: '1:N', description: 'Um professor cria múltiplos planos de aula' }
    ]
  },
  {
    id: 'ent-2',
    name: 'Ano Letivo (Academic Year)',
    category: 'Estrutura Escolar',
    objective: 'Delimitar o período temporal, bimestres/trimestres e calendário de dias letivos vigentes.',
    responsibilities: [
      'Ancorar turmas, notas e diários a um ciclo escolar específico',
      'Fornecer limites de datas para cálculo de frequência e prazos de pareceres'
    ],
    attributesStored: [
      'id (UUID)', 'year (e.g. 2026)', 'startDate', 'endDate', 'termsConfig (JSON)', 'isCurrent'
    ],
    createdBy: 'Admin / Sistema (Auto-setup)',
    modifiedBy: 'Admin da Escola / Secretaria',
    usedBy: ['Turma', 'Diário de Classe', 'Parecer Descritivo'],
    relationships: [
      { targetEntity: 'Turma', cardinality: '1:N', description: 'Um ano letivo engloba várias turmas' }
    ]
  },
  {
    id: 'ent-3',
    name: 'Turma (Class Cohort)',
    category: 'Estrutura Escolar',
    objective: 'Ancorar o agrupamento de alunos do Ensino Fundamental I (1º ao 5º ano) com o professor regente.',
    responsibilities: [
      'Agrupar alunos para aplicação de diários, planos e avaliações',
      'Servir como escopo primário de isolamento de dados no sistema'
    ],
    attributesStored: [
      'id (UUID)', 'gradeLevel (1º ao 5º ano EF1)', 'shift (Matutino/Vespertino)', 'codeName (ex: 3º Ano B)', 
      'academicYearId (FK)', 'primaryTeacherId (FK)', 'studentsCount'
    ],
    createdBy: 'Professor ou Admin',
    modifiedBy: 'Professor Regente',
    usedBy: ['Aluno', 'Plano de Aula', 'Registro Diário', 'Parecer Descritivo'],
    relationships: [
      { targetEntity: 'Aluno', cardinality: '1:N', description: 'Uma turma possui de 15 a 35 alunos' },
      { targetEntity: 'Plano de Aula', cardinality: '1:N', description: 'Uma turma recebe planos de aula específicos' }
    ]
  },
  {
    id: 'ent-4',
    name: 'Aluno (Student)',
    category: 'Estrutura Escolar',
    objective: 'Representar o estudante do EF1 e centralizar seu histórico de desenvolvimento, frequência e neurodiversidades.',
    responsibilities: [
      'Registrar identificação e dados pedagógicos do estudante',
      'Armazenar histórico de observações de PDI/neurodiversidade (TDAH/TEA)',
      'Ancorar notas, pareceres e registros de presença'
    ],
    attributesStored: [
      'id (UUID)', 'classId (FK)', 'fullName', 'rollNumber', 'birthDate', 
      'pdiAccommodationFlags (JSON)', 'status (Ativo/Transferido)', 'createdAt'
    ],
    createdBy: 'Professor ou Importação de Matrícula (CSV)',
    modifiedBy: 'Professor Regente',
    usedBy: ['Registro Diário', 'Atividade / Avaliação', 'Parecer Descritivo'],
    relationships: [
      { targetEntity: 'Turma', cardinality: 'N:1', description: 'Aluno pertence a uma turma ativa' },
      { targetEntity: 'Parecer Descritivo', cardinality: '1:N', description: 'Aluno possui pareceres bimestrais' }
    ]
  },
  {
    id: 'ent-5',
    name: 'Disciplina (Subject)',
    category: 'Estrutura Escolar',
    objective: 'Mapear os componentes curriculares do Ensino Fundamental I.',
    responsibilities: [
      'Categorizar habilidades da BNCC e planos de aula por matéria',
      'Padronizar diários de classe e cadernos de avaliação'
    ],
    attributesStored: [
      'id (UUID)', 'code (PORT, MAT, CIEN, HIST, GEOG, ART, ED_FIS)', 'name', 'colorHex'
    ],
    createdBy: 'Sistema (Catálogo Global)',
    modifiedBy: 'Sistema (Imutável)',
    usedBy: ['Habilidade BNCC', 'Plano de Aula', 'Atividade'],
    relationships: [
      { targetEntity: 'Habilidade BNCC', cardinality: '1:N', description: 'Mapeia códigos oficiais da BNCC' }
    ]
  },
  {
    id: 'ent-6',
    name: 'Habilidade BNCC (Curriculum Standard)',
    category: 'Núcleo Pedagógico',
    objective: 'Mapear a taxonomia oficial do Ministério da Educação para o Ensino Fundamental I.',
    responsibilities: [
      'Rastrear cobertura curricular e objetivos de aprendizagem',
      'Fundamentar legalmente os planos de aula e avaliações'
    ],
    attributesStored: [
      'id (UUID)', 'bnccCode (ex: EF15LP01)', 'gradeRange', 'subjectId (FK)', 
      'descriptionText', 'cognitiveLevel', 'keywords'
    ],
    createdBy: 'Sistema (Base da BNCC)',
    modifiedBy: 'Sistema (Imutável)',
    usedBy: ['Plano de Aula', 'Atividade / Prova', 'Parecer Descritivo'],
    relationships: [
      { targetEntity: 'Plano de Aula', cardinality: 'N:M', description: 'Plano trabalha 1 a 3 habilidades BNCC' }
    ]
  },
  {
    id: 'ent-7',
    name: 'Plano de Aula (Lesson Plan)',
    category: 'Núcleo Pedagógico',
    objective: 'Estruturar o roteiro diário/semanal de ensino com metodologia, recursos e adaptações inclusivas.',
    responsibilities: [
      'Guiar a prática docente na sala de aula',
      'Armazenar sequências didáticas e adaptações para PDI/neurodivergentes'
    ],
    attributesStored: [
      'id (UUID)', 'classId (FK)', 'teacherId (FK)', 'subjectId (FK)', 'title', 
      'bnccSkillIds (Array FK)', 'methodologySteps (JSON)', 'inclusiveAdaptations (JSON)', 
      'status (Rascunho/Aprovado/Executado)', 'executionDate'
    ],
    createdBy: 'Professor + IA Copiloto',
    modifiedBy: 'Professor Regente',
    usedBy: ['Cockpit do Professor', 'Atividade / Avaliação'],
    relationships: [
      { targetEntity: 'Turma', cardinality: 'N:1', description: 'Pertence a uma turma' },
      { targetEntity: 'Atividade', cardinality: '1:N', description: 'Gera exercícios para a aula' }
    ]
  },
  {
    id: 'ent-8',
    name: 'Atividade / Avaliação (Assessment)',
    category: 'Avaliação & Registro',
    objective: 'Registrar instrumentos formativos ou somativos aplicados à turma.',
    responsibilities: [
      'Armazenar enunciados, gabaritos e critérios de rubrica BNCC',
      'Capturar notas e conceitos dos alunos para consolidação'
    ],
    attributesStored: [
      'id (UUID)', 'lessonPlanId (FK)', 'classId (FK)', 'title', 'type (Formativa/Somativa/Diagnóstica)', 
      'maxScore', 'rubricCriteria (JSON)', 'appliedDate'
    ],
    createdBy: 'Professor + IA Copiloto',
    modifiedBy: 'Professor Regente',
    usedBy: ['Analisador de Desempenho', 'Parecer Descritivo'],
    relationships: [
      { targetEntity: 'Aluno', cardinality: 'N:M', description: 'Gera registro individual de nota' }
    ]
  },
  {
    id: 'ent-9',
    name: 'Registro Diário (Attendance & Log)',
    category: 'Avaliação & Registro',
    objective: 'Registrar presença, faltas justificadas e anotações de comportamento/ocorrências do dia.',
    responsibilities: [
      'Manter histórico diário legal de frequência do aluno',
      'Registrar fatos marcantes pedagógicos para o conselho de classe'
    ],
    attributesStored: [
      'id (UUID)', 'classId (FK)', 'studentId (FK)', 'date', 'presenceStatus (Presente/Falta/Justificada)', 
      'occurrenceNotesText', 'isFlaggedForCouncil'
    ],
    createdBy: 'Professor (Chamada rápida 15s)',
    modifiedBy: 'Professor Regente',
    usedBy: ['Cockpit', 'Parecer Descritivo'],
    relationships: [
      { targetEntity: 'Aluno', cardinality: 'N:1', description: 'Registro de frequência por aluno' }
    ]
  },
  {
    id: 'ent-10',
    name: 'Parecer Descritivo (Bimonthly Synthesis)',
    category: 'Síntese & Saída',
    objective: 'Sintetizar o desenvolvimento socioemocional e cognitivo do aluno no encerramento do bimestre.',
    responsibilities: [
      'Compilar notas, frequências e observações em um texto fluido e carinhoso',
      'Gerar documento oficial em PDF para coordenação e pais'
    ],
    attributesStored: [
      'id (UUID)', 'studentId (FK)', 'academicTerm (1º ao 4º Bimestre)', 'synthesisText', 
      'highlights (JSON)', 'pdiProgressNotes', 'status (Gerado/Revisado/Publicado)', 'signatureHash'
    ],
    createdBy: 'IA Copiloto (Compilação) + Professor (Revisão final)',
    modifiedBy: 'Professor Regente',
    usedBy: ['Relatórios Executivos', 'Impressão / PDF'],
    relationships: [
      { targetEntity: 'Aluno', cardinality: 'N:1', description: 'Ancorado no histórico do aluno' }
    ]
  }
];

export const CENTRAL_ENTITY_JUSTIFICATION = {
  centralEntityName: 'Turma (Class Cohort)',
  subtitle: 'O Coração do Modelo de Domínio e Âncora de Isolamento Multitenant',
  technicalReasons: [
    {
      title: '1. Agrupamento Natural do Ensino Fundamental I',
      explanation: 'No EF1, o professor leciona em regime de regência de turma (1º ao 5º ano). Toda ação pedagógica — desde o planejamento semanal até a chamada diária e a entrega de pareceres — ocorre no contexto delimitado de uma Turma.'
    },
    {
      title: '2. Ancoragem e Isolamento de Contexto da IA (Prompt Scope Isolation)',
      explanation: 'Ao definir a Turma como o nó central, todas as requisições enviadas ao LLM carregam o perfil exato daquela turma (ano, neurodiversidades ativas, ritmo de aprendizagem), evitando alucinações e garantindo que respostas sejam contextualizadas.'
    },
    {
      title: '3. Desempenho de Banco de Dados e Eliminação de Cascadas Desnecessárias',
      explanation: 'Utilizar a Turma como chave primária de partição/índice (FK) acelera consultas para a Dashboard do Professor (Cockpit), carregando o diário, planos e alunos em uma única query com índice composto (teacher_id + class_id).'
    },
    {
      title: '4. Transição Suave de Ciclos Letivos sem Perda Histórica',
      explanation: 'Quando o ano letivo encerra, a entidade Turma é arquivada, preservando a integridade dos pareceres e diários oficiais enquanto o professor cria a nova Turma do ano seguinte sem poluir a base ativa.'
    }
  ]
};

export const COPILOT_ARCHITECTURE: CopilotArchitecture = {
  accessibleData: [
    'Perfil da Turma (Série, número de alunos, especificidades de PDI cadastradas)',
    'Habilidades e Código da BNCC oficiais do catálogo do Ministério da Educação',
    'Histórico de planos de aula anteriores e notas formativas agregadas da turma',
    'Anotações comportamentais e registros diários de frequência do bimestre'
  ],
  immutableGuardrails: [
    'NUNCA pode alterar notas, médias ou registros de frequência lançados pelo professor',
    'NUNCA pode publicar relatórios pareceres finais para a escola sem revisão explícita do docente',
    'NUNCA pode deletar alunos, turmas ou planos de aula existentes',
    'NUNCA pode compartilhar dados pessoais identificáveis (PII) de alunos com APIs externas públicas'
  ],
  suggestionTriggers: [
    'Sugerir adaptação inclusiva (PDI) ao detectar aluno com TDAH/TEA na turma',
    'Sugerir recuperação paralela ao identificar 3 ou mais alunos com nota abaixo da média na avaliação',
    'Sugerir sequências didáticas para habilidades da BNCC ainda não trabalhadas no bimestre'
  ],
  userConfirmationTriggers: [
    'Geração inicial de Plano de Aula (Professor visualiza, edita e clica em "Salvar e Aplicar")',
    'Geração de Prova / Avaliação Formativa (Professor revisa as questões antes do envio)',
    'Sintetização de Parecer Descritivo Bimestral (Professor faz a leitura do texto e aprova a emissão em PDF)'
  ],
  autonomousActions: [
    'Formatação automática do documento de acordo com os padrões da BNCC',
    'Indexação semântica e etiquetagem dos planos por código da BNCC',
    'Normalização de datas e horários nos registros de chamada em lote',
    'Notificação silenciosa no Cockpit sobre pendências de pareceres prestes a vencer'
  ]
};

export const DATA_LIFECYCLE_STAGES: DataLifecycleStage[] = [
  {
    stepNumber: 1,
    stageName: 'Configuração Inicial de Turma & Alunos',
    originEntity: 'Professor / Importador CSV',
    transformationLogic: 'Validação de estrutura do EF1 e criação dos registros de Alunos ancorados na Turma.',
    destinationEntities: ['Professor', 'Turma', 'Aluno'],
    outputArtefact: 'Cockpit do Professor configurado com lista de presença ativa.'
  },
  {
    stepNumber: 2,
    stageName: 'Planejamento de Aula Inteligente',
    originEntity: 'Habilidade BNCC + Copiloto IA',
    transformationLogic: 'IA processa o tema e gera objetivos, metodologia e adaptação inclusiva em JSON estruturado.',
    destinationEntities: ['Plano de Aula'],
    outputArtefact: 'Roteiro de aula aprovado no Cockpit "Amanhã na Sala".'
  },
  {
    stepNumber: 3,
    stageName: 'Execução da Aula & Registro Diário',
    originEntity: 'Professor em Sala de Aula',
    transformationLogic: 'Lançamento em lote de faltas (15s) e registro de ocorrências marcantes do dia.',
    destinationEntities: ['Registro Diário'],
    outputArtefact: 'Histórico legal de presença atualizado para o ano letivo.'
  },
  {
    stepNumber: 4,
    stageName: 'Aplicação de Avaliação & Rubricas',
    originEntity: 'Plano de Aula + Professor',
    transformationLogic: 'Construção de instrumentos formativos e lançamento de notas com feedback da IA.',
    destinationEntities: ['Atividade / Avaliação'],
    outputArtefact: 'Notas e conceitos registrados na matriz de desempenho.'
  },
  {
    stepNumber: 5,
    stageName: 'Sintetização do Parecer Bimestral',
    originEntity: 'Registro Diário + Avaliações + Copiloto IA',
    transformationLogic: 'Cross-referencing de presenças, notas e ocorrências para compor parecer textual carinhoso.',
    destinationEntities: ['Parecer Descritivo'],
    outputArtefact: 'Rascunho do parecer descritivo pronto para leitura do professor.'
  },
  {
    stepNumber: 6,
    stageName: 'Consolidação Executiva & Exportação PDF',
    originEntity: 'Parecer Descritivo Aprovado',
    transformationLogic: 'Geração de PDF oficial assinado digitalmente com marca d\'água da escola e QR Code.',
    destinationEntities: ['Relatório Final'],
    outputArtefact: 'Documento impresso ou enviado digitalmente para a coordenação.'
  }
];

export const SYSTEM_AUDIT_ITEMS: SystemAuditItem[] = [
  {
    category: 'Redundância',
    title: 'Eliminação de Duplicidade no Cadastro de Disciplinas',
    description: 'Identificada tentativa inicial de criar disciplinas separadas para cada turma. Unificado em um Catálogo Global imutável de Disciplinas.',
    riskLevel: 'Baixo',
    mitigationStrategy: 'Chave estrangeira (FK) para tabela estática de Disciplinas e Habilidades BNCC.'
  },
  {
    category: 'Entidade Desnecessária',
    title: 'Remoção da Entidade "Grade Horária Completa"',
    description: 'No Ensino Fundamental I, o mesmo professor leciona quase todas as disciplinas para a turma durante o dia todo, tornando dispensável um motor complexo de grade curricular.',
    riskLevel: 'Baixo',
    mitigationStrategy: 'Substituído por sequenciamento simples de planos de aula na data do calendário.'
  },
  {
    category: 'Dependência Perigosa',
    title: 'Acoplamento Direto com API do LLM no Pipeline de Chamada',
    description: 'Se a API de IA estivesse na rota síncrona da chamada ou lançamento de presença, uma indisponibilidade da IA travaria a sala de aula.',
    riskLevel: 'Crítico',
    mitigationStrategy: 'Uso de fila assíncrona (Background Worker) para chamadas de IA. A chamada diária roda 100% offline-first e local.'
  },
  {
    category: 'Risco de Escalabilidade',
    title: 'Crescimento Desenfreado da Tabela de Registros Diários',
    description: 'Com milhares de professores lançando presença diariamente, a tabela de diários crescerá em milhões de linhas por semestre.',
    riskLevel: 'Médio',
    mitigationStrategy: 'Particionamento da tabela por `academic_year_id` e indexação composta em `(class_id, date)`.'
  }
];

export const CHIEF_ARCHITECT_VERDICT = {
  architectName: 'Chief Software Architect EducaFlow',
  verdictTitle: 'Parecer Técnico Oficial de Arquitetura & Escalabilidade para os Próximos 5 Anos',
  status: 'APROVADO SEM RESSALVAS ESTRUTURAIS',
  statement: 'A arquitetura de sistema projetada no "EducaFlow System Blueprint" atinge o equilíbrio perfeito entre leveza no MVP 1.0 e capacidade de expansão para redes de ensino B2B/B2G. A escolha da entidade "Turma" como o pivô central do domínio garante isolamento estrito de dados, desmistifica o uso da IA através de guardrails inegociáveis e permite que a plataforma suporte mais de 500.000 requisições diárias com custo operacional mínimo e zero risco de reestruturação nos próximos 5 anos.'
};
