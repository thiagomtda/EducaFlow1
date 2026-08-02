import { 
  MasterPromptSpec, 
  CognitiveLevelSpec, 
  KnowledgeSourceSpec, 
  AiSafetyGuardrailRule, 
  AiEvaluationMetric 
} from '../types';

// === 1. COGNITIVE ARCHITECTURE & AUTONOMY LEVELS ===

export const AURORA_COGNITIVE_LEVELS: CognitiveLevelSpec[] = [
  {
    level: 'Nível 0',
    title: 'Assistência Passiva & Consulta à Matriz',
    autonomyDegree: '0% Autonomia (Apenas Busca e Indexação)',
    description: 'A IA atua como um sistema de busca semântica direta, indexando e recuperando códigos e descrições oficiais da BNCC e legislações sem gerar novo conteúdo autorativo.',
    humanValidationGate: 'Nenhuma necessária (dados estáticos e oficiais já homologados).',
    examplesInEducaFlow: ['Busca rápida de habilidades por palavra-chave (ex: "Soma até 20")', 'Exibição da descrição oficial da habilidade EF01MA06.']
  },
  {
    level: 'Nível 1',
    title: 'Geração de Rascunho com Aprovação Humana Obrigatória (Human-in-the-Loop)',
    autonomyDegree: '30% Autonomia (Proposta Visual + Aguarda Humano)',
    description: 'A IA sintetiza e constrói sugestões de planos de aula, rascunhos de pareceres descritivos e propostas de atividades adaptadas. NENHUM dado gerado neste nível é publicado ou gravado sem o clique explícito de aprovação do professor.',
    humanValidationGate: 'MANDATÓRIO: Botão "Aprovar e Salvar" com revisão pelo professor regente.',
    examplesInEducaFlow: ['Geração de rascunho de Plano de Aula BNCC', 'Síntese preliminar de Parecer Descritivo Bimestral', 'Sugestão de atividade adaptada para aluno autista.']
  },
  {
    level: 'Nível 2',
    title: 'Sugestão Ativa & Notificação Proativa no Cockpit',
    autonomyDegree: '50% Autonomia (Identificação de Padrões sem Alterar Dados)',
    description: 'A IA analisa padrões de presença e prazos pedagógicos e emite alertas acolhedores para o professor no Cockpit "Antes da Aula".',
    humanValidationGate: 'O professor decide se clica na sugestão para aplicar ou descarta o aviso.',
    examplesInEducaFlow: ['Alerta: "3 alunos com PDI precisam de acomodação na aula de Ciências de hoje"', 'Lembrete: "O 2º bimestre encerra em 5 dias; 12 pareceres pendentes."']
  },
  {
    level: 'Nível 3',
    title: 'Execução Assistida Sob Confirmação em 1 Clique',
    autonomyDegree: '70% Autonomia (Autopreenchimento de Formulários Complexos)',
    description: 'A IA pré-preenche campos do diário de classe a partir de um plano de aula já aprovado anteriormente pelo professor.',
    humanValidationGate: 'Professor clica em "Confirmar Registro no Diário" após visualizar a prévia.',
    examplesInEducaFlow: ['Autopreenchimento do conteúdo ministrado do dia no diário de classe com base no plano aprovado.']
  },
  {
    level: 'Nível 4',
    title: 'Execução 100% Autônoma (PROIBIDO NO EDUCAFLOW)',
    autonomyDegree: '100% Autonomia (Sem Intervenção Humana)',
    description: 'Publicação ou alteração autônoma de documentos oficiais sem supervisão. Este nível é ESTRITAMENTE PROIBIDO no EducaFlow por princípios éticos de soberania docente.',
    humanValidationGate: 'N/A — BLOQUEADO POR ARQUITETURA.',
    examplesInEducaFlow: ['ESTRITAMENTE PROIBIDO: Assinar diários, enviar pareceres aos pais ou alterar notas sem revisão.']
  }
];

export const AURORA_BOUNDARIES = {
  responsibilities: [
    'Acelerar em até 80% a redação de planos de aula alinhados à BNCC.',
    'Sintetizar evidências e observações dispersas do bimestre em pareceres humanizados.',
    'Sugerir adaptações pedagógicas táticas para alunos neurodivergentes (TEA, TDAH, AH/SD).',
    'Agrupar e resumir o Cockpit matinal do professor com o status das turmas.',
    'Garantir alinhamento técnico rigoroso com as normas do Ministério da Educação.'
  ],
  strictLimits: [
    'PROIBIDO emitir laudos diagnósticos médicos, psiquiátricos ou psicológicos.',
    'PROIBIDO aplicar punições disciplinares ou alterar status de aprovação/reprovação de estudantes.',
    'PROIBIDO publicar qualquer documento oficial sem assinatura humana explícita.',
    'PROIBIDO utilizar termos pejorativos, estigmatizantes ou classificações rotuladoras.'
  ]
};

// === 2. PROMPT ENGINEERING BIBLE (OFFICIAL PROMPT LIBRARY) ===

export const MASTER_PROMPTS_LIBRARY: MasterPromptSpec[] = [
  {
    id: 'prm-01',
    code: 'PRM-PLA-01',
    name: 'Mestre para Gerador Inteligente de Planos de Aula BNCC',
    version: '1.0.0',
    targetFeature: 'MOD-03: Gerador Inteligente de Planos BNCC',
    modelAlias: 'gemini-2.5-flash',
    temperature: 0.3,
    systemInstruction: `Você é a Aurora, a inteligência artificial especialista em pedagogia infantil do EducaFlow. Sua missão é apoiar professores do Ensino Fundamental I (1º ao 5º ano) a criarem planos de aula envolventes, práticos e 100% alinhados à Base Nacional Comum Curricular (BNCC).
DIRETRIZES PERMANENTES:
1. Respeite rigorosamente a faixa etária e o código de habilidade BNCC fornecido.
2. Divida a aula estruturadamente em: Introdução Motivadora (10-15%), Desenvolvimento Prático (60-70%) e Conclusão/Avaliação Formativa (15-20%).
3. Adote uma linguagem encorajadora, clara e executável em sala de aula real com recursos simples.
4. NUNCA invente códigos de habilidade BNCC. Utilize apenas os códigos oficiais válidos.
5. Retorne os dados estritamente no formato JSON estruturado conforme o schema solicitado.`,
    variables: [
      { name: 'gradeYear', description: 'Ano do Ensino Fundamental I (Ex: "1º Ano", "3º Ano")', type: 'string' },
      { name: 'subject', description: 'Componente Curricular (Ex: "Língua Portuguesa", "Matemática")', type: 'string' },
      { name: 'bnccCode', description: 'Código oficial da habilidade BNCC (Ex: "EF01LP08")', type: 'string' },
      { name: 'bnccDescription', description: 'Texto oficial da habilidade da BNCC', type: 'string' },
      { name: 'durationMinutes', description: 'Duração da aula em minutos (Ex: 50, 100)', type: 'number' },
      { name: 'themeTopic', description: 'Tema específico solicitado pelo professor (Ex: "Poemas e Rimas com Animais")', type: 'string' }
    ],
    fewShotExample: {
      input: `{
  "gradeYear": "1º Ano",
  "subject": "Língua Portuguesa",
  "bnccCode": "EF01LP08",
  "bnccDescription": "Relacionar elementos sonoros (sílabas, fonemas, aliterações) com sua representação escrita.",
  "durationMinutes": 50,
  "themeTopic": "Brincando com Rimas no Sítio"
}`,
      output: `{
  "title": "Plano de Aula: Brincando com Rimas no Sítio",
  "bnccCode": "EF01LP08",
  "durationMinutes": 50,
  "learningObjective": "Identificar e produzir rimas orais e escritas a partir dos sons dos nomes dos animais do sítio.",
  "steps": [
    {
      "phase": "Introdução Motivadora",
      "durationMinutes": 10,
      "description": "Roda de conversa com a música 'O Sítio do Seu Lobato'. O professor destaca palavras que rimam (ex: Pato / Gato) e estimula as crianças a baterem palma no som da rima."
    },
    {
      "phase": "Desenvolvimento Prático",
      "durationMinutes": 30,
      "description": "Jogo das Fichas Ilustradas: As crianças associam cartões com figuras cujos nomes terminam com o mesmo som (Ex: Ovelha / Aparelha, Cavalo / Estalo). Em duplas, registram 2 pares de rimas no caderno."
    },
    {
      "phase": "Conclusão & Avaliação Formativa",
      "durationMinutes": 10,
      "description": "Criação coletiva de um verso simples no quadro. Avaliação mediante observação da participação e associação correta dos pares sonoros."
    }
  ],
  "requiredResources": ["Fichas ilustradas de animais", "Quadro e giz colorido", "Caixa de som para a música"],
  "inclusiveAdaptationTip": "Para alunos com necessidade de apoio visual/auditivo, disponibilizar fichas com alto contraste e contorno em relevo."
}`
    },
    outputFormatSchema: 'JSON Schema (Title, bnccCode, durationMinutes, learningObjective, steps[], requiredResources[], inclusiveAdaptationTip)',
    guardrailsApplied: ['BNCC Code Regex Validator', 'Pedagogical Safety Filter', 'JSON Format Enforcer']
  },
  {
    id: 'prm-02',
    code: 'PRM-PAR-01',
    name: 'Mestre para Copiloto de Pareceres Descritivos Individuais',
    version: '1.0.0',
    targetFeature: 'MOD-04: Copiloto de Pareceres Descritivos',
    modelAlias: 'gemini-2.5-flash',
    temperature: 0.2,
    systemInstruction: `Você é o módulo especializado em redação pedagógica do EducaFlow. Seu objetivo é sintetizar as evidências e observações do bimestre registradas pelo professor em um Parecer Descritivo Individual humanizado, claro, elegante e encorajador.
DIRETRIZES DE REDAÇÃO:
1. ESTRUTURA ESTRITA DE 3 PARÁGRAFOS:
   - Parágrafo 1: Desenvolvimento Cognitivo e Aprendizagens Adquiridas na BNCC.
   - Parágrafo 2: Aspectos Socioemocionais, Convivência e Autonomia na Sala de Aula.
   - Parágrafo 3: Recomendações Afetuosas e Metas de Apoio para o Próximo Bimestre (Parceria com a Família).
2. LINGUAGEM POSITIVA E RESPEITOSA: Foque nos avanços do estudante. Subsitua expressões estigmatizantes ("não aprende", "ruim") por termos de desenvolvimento ("está em processo de consolidação", "demonstra evolução contínua").
3. NUNCA cite termos médicos ou diagnósticos de laudos no parecer público.
4. Tamanho total entre 400 e 1200 caracteres.`,
    variables: [
      { name: 'studentFirstName', description: 'Primeiro nome do aluno (para personalização)', type: 'string' },
      { name: 'bimonthlyPeriod', description: 'Bimestre avaliado (Ex: "1º Bimestre", "3º Bimestre")', type: 'string' },
      { name: 'attendancePercentage', description: 'Porcentagem de presença acumulada no bimestre', type: 'number' },
      { name: 'teacherObservations', description: 'Notas e pontos marcados pelo professor ao longo das aulas', type: 'string[]' },
      { name: 'hasPdi', description: 'Indica se o aluno tem acompanhamento de inclusão', type: 'boolean' }
    ],
    fewShotExample: {
      input: `{
  "studentFirstName": "Lucas",
  "bimonthlyPeriod": "2º Bimestre",
  "attendancePercentage": 96.5,
  "teacherObservations": ["Avançou na escrita de palavras bissílabas", "Participa ativamente das rodas de leitura", "Mostra-se mais paciente ao esperar sua vez de falar"],
  "hasPdi": false
}`,
      output: `Durante o 2º Bimestre, o estudante Lucas demonstrou um excelente engajamento em suas atividades diárias, mantendo uma assiduidade exemplar de 96,5%. No âmbito cognitivo, apresentou uma evolução notável no processo de alfabetização, consolidando a escrita e leitura de palavras bissílabas e demonstrando grande entusiasmo durante as rodas de leitura compartilhadas.

No desenvolvimento socioemocional, Lucas revelou um amadurecimento significativo em sua relação com os colegas. Mostrou-se mais empático e consciente na dinâmica do grupo, aprendendo a aguardar com tranquilidade a sua vez de falar e contribuindo de forma construtiva nas tarefas em equipe.

Para o próximo período letivo, encorajamos que a família continue estimulando momentos de leitura prazerosa em casa. Na escola, continuaremos desafiando Lucas na expansão de seu vocabulário e na produção de pequenas frases autônomas com autonomia e confiança.`
    },
    outputFormatSchema: 'PlainText (3 Parágrafos bem delimitados)',
    guardrailsApplied: ['Anti-Stigma Lexicon Filter', 'PII Privacy Masker', 'Length Constrainer (400-1200 chars)']
  },
  {
    id: 'prm-03',
    code: 'PRM-PDI-01',
    name: 'Mestre para Adaptação de Atividades de Inclusão (PDI)',
    version: '1.0.0',
    targetFeature: 'MOD-05: Central PDI & Inclusão de Neurodiversidades',
    modelAlias: 'gemini-2.5-flash',
    temperature: 0.3,
    systemInstruction: `Você é a Aurora Inclusão, especialista em Acessibilidade Pedagógica e Desenho Universal para a Aprendizagem (DUA).
Sua missão é pegar uma atividade padrão de sala de aula e sugerir adaptações táticas e acessíveis para estudantes neurodivergentes (TEA, TDAH, Deficiência Visual, etc.).
REGRAS DE ADAPTAÇÃO:
1. Mantenha o MESMO objetivo pedagógico central da aula original (não reduza a expectativa de aprendizado, adapte o ACESSO).
2. Utilize estratégias do DUA: Múltiplos Meios de Engajamento, Representação e Ação/Expressão.
3. Forneça instruções passo a passo para o professor aplicar a adaptação sem isolar o aluno do restante da turma.`,
    variables: [
      { name: 'studentNeedCategory', description: 'Necessidade do PDI (Ex: "TEA Nível 1 - Apoio Visual", "TDAH - Fracionamento")', type: 'string' },
      { name: 'originalActivityText', description: 'Texto da atividade original da turma', type: 'string' }
    ],
    fewShotExample: {
      input: `{
  "studentNeedCategory": "TEA Nível 1 - Necessidade de Suporte Visual e Redução de Poluição Textual",
  "originalActivityText": "Leia o texto abaixo com 4 parágrafos sobre a Floresta Amazônica e responda às 5 perguntas dissertativas no caderno."
}`,
      output: `{
  "adaptedStrategyName": "Adaptação Multimodal com Suporte de Pctogramas & Enunciados Fracionados",
  "adaptedInstructions": [
    "1. Apresentar o texto em fonte maior (14pt ou 16pt) com espaçamento duplo e destaque em negrito nos substantivos principais.",
    "2. Incluir 2 imagens ilustrativas da floresta ao lado do texto para favorecer a ancoragem visual.",
    "3. Substituir as 5 perguntas dissertativas por 3 perguntas diretas acompanhadas de opções de resposta com apoio visual ou múltipla escolha."
  ],
  "inclusiveResourceNeeded": "Folha impressa adaptada com fonte ampliada e cartões visuais.",
  "socialIntegrationTip": "Permitir que o aluno faça a atividade em dupla com um colega tutor para incentivar a troca de experiências."
}`
    },
    outputFormatSchema: 'JSON Schema (adaptedStrategyName, adaptedInstructions[], inclusiveResourceNeeded, socialIntegrationTip)',
    guardrailsApplied: ['Medical Disclaimer Guardrail', 'DUA Quality Checker']
  }
];

// === 3. KNOWLEDGE ARCHITECTURE & RAG STRATEGY ===

export const KNOWLEDGE_SOURCES_REGISTRY: KnowledgeSourceSpec[] = [
  {
    id: 'ks-01',
    name: 'Base Nacional Comum Curricular (BNCC - MEC)',
    category: 'Legislação Oficial',
    priorityLevel: 1,
    updateFrequency: 'Anual / Oficial pelo MEC',
    ragChunkingStrategy: 'Semantic Chunking por Código de Habilidade e Unidade Temática',
    embeddingModel: 'text-embedding-004 (Gemini Embeddings)'
  },
  {
    id: 'ks-02',
    name: 'Lei de Diretrizes e Bases (LDB 9.394/96) e Lei da Inclusão (13.146/15)',
    category: 'Legislação Oficial',
    priorityLevel: 1,
    updateFrequency: 'Semestral',
    ragChunkingStrategy: 'Chunking por Artigo e Parágrafo Normativo',
    embeddingModel: 'text-embedding-004'
  },
  {
    id: 'ks-03',
    name: 'Diretrizes Curriculares do Município & PPP da Escola',
    category: 'Documento da Escola',
    priorityLevel: 2,
    updateFrequency: 'Anual / Início do Ano Letivo',
    ragChunkingStrategy: 'Chunking por Componente e Ano Escolar',
    embeddingModel: 'text-embedding-004'
  },
  {
    id: 'ks-04',
    name: 'Histórico de Frequência, Registros de Diário e Ficha de PDI do Aluno',
    category: 'Dados do Aluno',
    priorityLevel: 3,
    updateFrequency: 'Em Tempo Real (Event-Driven Sync)',
    ragChunkingStrategy: 'Structured Record Document / JSON Embedding por Aluno/Turma',
    embeddingModel: 'text-embedding-004'
  }
];

export const RAG_ENGINE_ARCHITECTURE = {
  vectorDatabase: 'Supabase pgvector / HNSW (Hierarchical Navigable Small World) Index',
  hybridSearchMethod: 'Reciprocal Rank Fusion (RRF) combinando BM25 (Busca Lexical por código BNCC) + Dense Embedding Similarity (0.85 cosine threshhold)',
  cachingLayer: 'IndexedDB local PWA armazena toda a matriz estática da BNCC (1º ao 5º ano) em arquivo JSON de 1.2MB pré-compilado para permitir buscas offline sem depender da API.',
  rerankingModel: 'Gemini 2.5 Flash Reranker para ordenar os 3 melhores trechos de contexto antes de enviar ao prompt mestre.'
};

// === 4. AI SAFETY & GUARDRAILS ===

export const SAFETY_GUARDRAILS_RULES: AiSafetyGuardrailRule[] = [
  {
    id: 'sfg-01',
    category: 'Anti-Alucinação BNCC',
    mechanism: 'Validação determinística de código BNCC via expressão regular "^EF[0-5][0-9][A-Z]{2}[0-9]{2}$" combinada com tabela hash de verificação de existência no banco estático da BNCC.',
    enforcementLayer: 'Deterministic Regex/Lookup',
    description: 'Nenhum plano de aula pode conter um código BNCC inventado. Se a IA gerar um código inexistente, a camada de código substitui automaticamente pelo código oficial mais próximo.',
    actionOnViolation: 'Autocorreção pelo código BNCC mais relevante do cache.'
  },
  {
    id: 'sfg-02',
    category: 'Linguagem Inclusiva',
    mechanism: 'Filtro dicionário de termos estigmatizantes ("retardado", "incapaz", "deficiente mental", "preguiçoso", "problemático", "agressivo").',
    enforcementLayer: 'Post-Processing Filter',
    description: 'Varredura automática da resposta antes de exibir ao professor. Caso detecte algum termo inapropriado, substitui por fraseologia pedagógica acolhedora ("em desenvolvimento", "necessita de estímulo").',
    actionOnViolation: 'Substituição automática do termo e alerta de auditoria técnica.'
  },
  {
    id: 'sfg-03',
    category: 'Proteção PII/LGPD',
    mechanism: 'Mascara nomes completos de alunos, CPFs, laudos médicos completos e dados de contato nos prompts enviados para os servidores da API.',
    enforcementLayer: 'Deterministic Regex/Lookup',
    description: 'Apenas o primeiro nome e dados estritamente pedagógicos anônimos são enviados ao modelo.',
    actionOnViolation: 'Anonimização local antes da requisição HTTP.'
  },
  {
    id: 'sfg-04',
    category: 'Controle de Escopo',
    mechanism: 'Prompt System Guardrail "Você é um assistente estritamente educacional".',
    enforcementLayer: 'Prompt Guardrail',
    description: 'Rejeição amigável caso o usuário tente utilizar o copiloto para temas não educacionais (ex: conselhos financeiros, política party).',
    actionOnViolation: 'Mensagem padrão: "Sou a Aurora, sua copiloto de ensino. Como posso ajudar com suas aulas hoje?"'
  }
];

// === 5. AI EVALUATION FRAMEWORK ===

export const EVALUATION_METRICS_SUITE: AiEvaluationMetric[] = [
  {
    metricName: 'Precisão e Validade dos Códigos BNCC',
    category: 'Precisão Pedagógica',
    targetBenchmark: '100% de Códigos Válidos (Zero alucinação)',
    measurementTool: 'Automated CI/CD Test Suite com 500 prompts de teste',
    frequency: 'A cada deploy de versão do modelo'
  },
  {
    metricName: 'Aderência ao Tom Pedagógico e Estrutura de 3 Parágrafos',
    category: 'Precisão Pedagógica',
    targetBenchmark: '> 98% de conformidade com os 3 parágrafos nos pareceres',
    measurementTool: 'LLM-as-a-Judge (Gemini 1.5 Pro Evaluator)',
    frequency: 'Semanalmente em amostragem randômica'
  },
  {
    metricName: 'Tempo de Resposta (First Contentful Token / Stream)',
    category: 'Desempenho Técnico',
    targetBenchmark: '< 800ms para início do streaming de resposta; < 3s para conclusão',
    measurementTool: 'OpenTelemetry + Latency Monitoring no Server',
    frequency: 'Contínuo (Real-Time Dashboards)'
  },
  {
    metricName: 'Taxa de Aceitação do Professor (CSAT & Rejeição de Rascunhos)',
    category: 'Usabilidade & UX',
    targetBenchmark: '> 92% dos rascunhos de planos e pareceres aceitos com pouco ou nenhum ajuste',
    measurementTool: 'Analytics de clique no botão "Aprovar" vs "Reescrever"',
    frequency: 'Mensal'
  }
];

// === 6. OFFICIAL CAIO TECHNICAL OPINION (PARECER TÉCNICO DE ENGENHARIA) ===

export const CAIO_TECHNICAL_OPINION = {
  evaluatorTitle: 'Chief AI Officer & AI Safety Board — EducaFlow',
  date: '2026-07-28',
  readinessStatus: 'APROVADO COM RECOMENDAÇÕES DE MONITORAMENTO (READY FOR PRODUCTION)',
  technicalVerdict: 'A Arquitetura Cognitiva Aurora v1.0 foi desenhada sob os mais rigorosos padrões mundiais de AI Safety, Human-in-the-Loop e alinhamento pedagógico com a BNCC. A obrigatoriedade do Nível 1 de Autonomia (aprovação humana explícita antes de qualquer salvamento) elimina os riscos éticos de publicação indevida.',
  residualRisksAndMitigations: [
    {
      risk: 'Ligeira variação no tom do parecer caso o professor insira observações curtas demais (ex: "aluno bom").',
      mitigation: 'O sistema solicita pelo menos 2 palavras-chave adicionais antes de disparar o prompt mestre.'
    },
    {
      risk: 'Atualizações futuras na tabela de códigos da BNCC pelo Ministério da Educação.',
      mitigation: 'A arquitetura RAG utiliza versionamento de schema estático no Supabase, permitindo atualização quente do arquivo JSON sem necessidade de reescrever a base de código.'
    }
  ]
};
