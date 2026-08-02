import { 
  GoldenPrinciple, 
  ProhibitedPractice, 
  FeatureApprovalCriterion, 
  CommunicationGuideline, 
  ManifestoParagraph, 
  CpoAuditVerdict 
} from '../types';

export const PRODUCT_MISSION = {
  title: 'Missão do EducaFlow',
  statement: 'Devolver o tempo, a dignidade e a paixão de ensinar ao professor do Ensino Fundamental I, eliminando a burocracia mecânica através de uma plataforma inteligente, simples e profundamente acolhedora.',
  corePurpose: 'Garantir que a tecnologia sirva ao ser humano, e não o contrário, transformando horas de digitação cansativa em momentos preciosos de conexão e aprendizado com as crianças.'
};

export const PRODUCT_VISION_10_YEARS = {
  title: 'Visão de 10 Anos (2026 - 2036)',
  statement: 'Ser a infraestrutura tecnológica padrão e indispensável de copiloto pedagógico nas salas de aula da América Latina, impactando 1 milhão de professores e economizando mais de 10 milhões de horas de burocracia anual.',
  milestones: [
    { year: '2026', milestone: 'Consolidação do MVP com 10.000 professores do EF1 no Brasil, validando a economia de 8h/semana.' },
    { year: '2028', milestone: 'Adoção B2G/B2B em redes públicas e privadas municipais, com integração nativa ao diário oficial.' },
    { year: '2031', milestone: 'Expansão pan-americana para o Ensino Fundamental em países de língua espanhola na América Latina.' },
    { year: '2036', milestone: 'Ecossistema completo de inteligência pedagógica e inclusão escolar, onde nenhuma criança fica invisível.' }
  ]
};

export const CORE_VALUES = [
  {
    name: '1. Soberania Docente',
    description: 'A inteligência artificial é assistente; a autoridade pedagógica e a decisão final são 100% do professor.'
  },
  {
    name: '2. Respeito Extremo ao Tempo',
    description: 'Cada segundo do professor é sagrado. Se uma tarefa pode ser automatizada com segurança, ela DEVE ser.'
  },
  {
    name: '3. Acolhimento & Zero Ansiedade',
    description: 'O produto não cobra, não julga e não assusta. Ele reduz o estresse e traz paz mental para o domingo à noite.'
  },
  {
    name: '4. Inclusão & Equidade de Aprendizado',
    description: 'Toda criança possui um ritmo único. A plataforma facilita o olhar individualizado para neurodiversidades e PDI.'
  },
  {
    name: '5. Robustez Silenciosa (Offline-First)',
    description: 'A tecnologia funciona impecavelmente no chão da escola real, sob sinal fraco de internet ou totalmente offline.'
  }
];

export const GOLDEN_PRINCIPLES: GoldenPrinciple[] = [
  {
    number: 1,
    title: 'O professor sempre decide',
    rule: 'Nenhum plano de aula, avaliação, nota ou parecer descritivo é publicado ou enviado sem o consentimento e aprovação prévia do professor.',
    rationale: 'Evita a automação cega e preserva a responsabilidade legal e pedagógica do docente sobre sua turma.',
    practicalExample: 'A IA gera o rascunho do parecer descritivo, mas ele só é finalizado após o botão "Revisar e Confirmar".'
  },
  {
    number: 2,
    title: 'A IA sempre explica suas sugestões',
    rule: 'Toda recomendação de habilidade BNCC, atividade ou adaptação inclusiva emitida pela IA deve exibir sua fundamentação clara.',
    rationale: 'Promove a transparência, previne alucinações de LLM e fortalece o repertório do professor.',
    practicalExample: 'Ao sugerir um jogo de rima, a IA exibe: "Sugerido para trabalhar a habilidade EF01LP08 (Consciência Fonológica)".'
  },
  {
    number: 3,
    title: 'Nunca mais de 3 cliques para uma tarefa principal',
    rule: 'Qualquer fluxo crítico diário (chamada, registro de aula, geração de plano) deve ser concluído com no máximo 3 interações.',
    rationale: 'Minimiza a carga cognitiva e permite a utilização durante os poucos minutos livres entre as aulas.',
    practicalExample: 'Fazer chamada: 1) Abrir app, 2) Clicar em "Chamada Rápidda (15s)", 3) Clicar em "Salvar Presenças".'
  },
  {
    number: 4,
    title: 'Cada nova funcionalidade deve economizar tempo real',
    rule: 'Nenhum recurso é adicionado se não comprovar redução de tempo no fluxo de trabalho semanal do professor.',
    rationale: 'Protege a plataforma contra o inchaço de funcionalidades inúteis (feature creep).',
    practicalExample: 'Rejeitamos adicionar um criador de gráficos 3D porque ele exigia 10 minutos de configuração para zero economia.'
  },
  {
    number: 5,
    title: 'O sistema nunca pode gerar ansiedade',
    rule: 'Proibido utilizar contadores de prazo em vermelho piscante, sons de alarme ou notificações coercitivas fora do horário escolar.',
    rationale: 'Preserva a saúde mental do professor e não contamina o final de semana com estresse digital.',
    practicalExample: 'Pendências são apresentadas com tom suave: "Sua semana está 80% organizada. Quando desejar, conclua o 4º parecer."'
  },
  {
    number: 6,
    title: 'Acolhimento antes da cobrança',
    rule: 'A primeira tela e saudação do sistema devem validar e saudar o professor antes de qualquer lista de pendências.',
    rationale: 'Cria uma conexão afetiva e transforma a plataforma em um porto seguro no início do dia.',
    practicalExample: 'Em vez de "Atenção: 3 diários pendentes!", o sistema saúda: "Bom dia, Professora Ana! Vamos juntos preparar um ótimo dia?"'
  },
  {
    number: 7,
    title: 'Zero redundância de digitação',
    rule: 'Qualquer informação inserida uma vez no sistema deve alimentar automaticamente todos os artefatos relacionados.',
    rationale: 'Elimina o retrabalho de copiar e colar entre plano de aula, diário de classe e relatório bimestral.',
    practicalExample: 'Ao registrar um comportamento marcante no Diário, ele já fica pré-selecionado para o Parecer do final do bimestre.'
  },
  {
    number: 8,
    title: 'Resiliência Offline-First e Leveza Tecnológica',
    rule: 'A aplicação deve carregar instantaneamente em celulares antigos e permitir registros em sala sem sinal de internet.',
    rationale: 'A realidade das escolas brasileiras possui pontos cegos de Wi-Fi e dados móveis limitados.',
    practicalExample: 'A chamada diária é salva no banco de dados local da PWA e sincronizada em segundo plano quando houver rede.'
  },
  {
    number: 9,
    title: 'Clareza cristalina sobre estética genérica',
    rule: 'A interface prioriza tipografia legível, contraste WCAG AA e espaçamento limpo antes de animações ornamentais pesadas.',
    rationale: 'O foco do professor deve estar no conteúdo pedagógico e na agilidade de leitura.',
    practicalExample: 'Uso de fontes legíveis de alto contraste e tabelas sem rolagem horizontal excessiva.'
  },
  {
    number: 10,
    title: 'Linguagem respeitosa e rigor pedagógico',
    rule: 'A plataforma utiliza termos técnicos corretos da BNCC combinados com um tom profissional e caloroso.',
    rationale: 'Respeita o nível acadêmico do educador sem cair em jargões computacionais frios ou infantilização.',
    practicalExample: 'Usar "Sintetizar Parecer com base na BNCC" em vez de "Rodar script de IA para gerar relatório".'
  }
];

export const PROHIBITED_PRACTICES: ProhibitedPractice[] = [
  {
    id: 'p-1',
    practice: 'Excesso de Menus & Barras Laterais Poluídas',
    whyProhibited: 'Confunde o professor, aumenta o tempo de navegação e gera fadiga de decisão visual.',
    alternativeApproach: 'Navegação minimalista focada no momento atual ("Antes da Aula", "Durante a Aula", "Encerramento").'
  },
  {
    id: 'p-2',
    practice: 'Publicidade Invasiva e Banners Comerciais',
    whyProhibited: 'Degrada a dignidade da ferramenta de trabalho e distrai a atenção do professor.',
    alternativeApproach: 'Zero anúncios. Modelo de receita transparente via assinatura ou licença de rede de ensino B2B/B2G.'
  },
  {
    id: 'p-3',
    practice: 'Funcionalidades "Cosméticas" sem Utilidade Comprovada',
    whyProhibited: 'Gera ruído no código, aumenta lentidão do aplicativo e confunde o uso principal.',
    alternativeApproach: 'Regra estrita de aprovação do CPO: apenas features que comprovadamente economizam tempo real são mantidas.'
  },
  {
    id: 'p-4',
    practice: 'Gamificação Infantilizada para Professores',
    whyProhibited: 'Trata o profissional adulto como criança com medalhinhas de plástico e animações desnecessárias.',
    alternativeApproach: 'Reconhecimento profissional sério: métrica visível de "Horas de Vida Economizadas Este Mês".'
  },
  {
    id: 'p-5',
    practice: 'Aumento da Burocracia e Formulários Extensos',
    whyProhibited: 'Transforma o software em mais um "preenchedor de papel virtual" exigido pela burocracia.',
    alternativeApproach: 'Preenchimento inteligente com sugestões pré-carregadas da IA em 1 clique.'
  }
];

export const FEATURE_APPROVAL_MATRIX: FeatureApprovalCriterion[] = [
  {
    id: 'c-1',
    question: '1. Esta funcionalidade resolve uma dor real e documentada do professor do EF1?',
    evaluationCriteria: 'Deve estar vinculada a pelo menos um dos 18 pontos de dor mapeados na matriz de pesquisa.',
    passingCondition: 'Sim obrigatório com evidência de campo.',
    weight: 'Eliminatório'
  },
  {
    id: 'c-2',
    question: '2. Ela economiza pelo menos 15 minutos de tempo semanal do professor?',
    evaluationCriteria: 'Cálculo demonstrado de redução do tempo gasto no fluxo de trabalho tradicional.',
    passingCondition: 'Economia comprovada > 15 min/semana.',
    weight: 'Eliminatório'
  },
  {
    id: 'c-3',
    question: '3. A interface permite uso intuitivo em menos de 3 cliques sem manual?',
    evaluationCriteria: 'Teste de usabilidade em protótipo com professores sem prévia instrução.',
    passingCondition: 'Taxa de sucesso > 90% na primeira tentativa.',
    weight: 'Alta Importância'
  },
  {
    id: 'c-4',
    question: '4. Preserva integralmente a autonomia e soberania pedagógica do docente?',
    evaluationCriteria: 'Garante que nenhuma informação seja salva ou enviada automaticamente sem autorização.',
    passingCondition: 'Aprovação humana mandatória.',
    weight: 'Eliminatório'
  },
  {
    id: 'c-5',
    question: '5. Funciona perfeitamente offline e em conexões de baixa velocidade (3G)?',
    evaluationCriteria: 'Execução de ações principais sem dependencia de chamadas síncronas de servidor.',
    passingCondition: 'Suporte local PWA com IndexedDB.',
    weight: 'Estratégico'
  }
];

export const PERSONALITY_AND_COMMUNICATION: CommunicationGuideline[] = [
  {
    scenario: 'Início da Jornada (Saudação Matinal)',
    toneAndStyle: 'Caloroso, inspirador e calmo. Estabelece um ambiente seguro.',
    correctPhraseExample: '"Bom dia, Professora Clara! Suas aulas de hoje já estão organizadas. Desejamos um ótimo dia com a turma do 3º B."',
    forbiddenPhraseExample: '"AVISO: Você tem 3 diários pendentes para preencher hoje até 17h!"'
  },
  {
    scenario: 'Geração de Rascunho com IA (Copiloto Aurora)',
    toneAndStyle: 'Colaborativo, modesto e transparente. Deixa claro que é uma sugestão.',
    correctPhraseExample: '"Preparei uma sugestão de plano de aula focada na habilidade EF01LP08. Fique à vontade para ajustar como preferir."',
    forbiddenPhraseExample: '"O algoritmo gerou o plano perfeito definitivo para sua aula. Clique para publicar."'
  },
  {
    scenario: 'Erro de Conexão / Falha Temporária',
    toneAndStyle: 'Tranquilizador e proativo. NUNCA exibe erros técnicos assustadores.',
    correctPhraseExample: '"Você está offline no momento, mas não se preocupe: sua chamada foi salva no celular e será sincronizada assim que a internet voltar."',
    forbiddenPhraseExample: '"Error 500: Failed to fetch API response from server endpoint."'
  },
  {
    scenario: 'Encerramento do Bimestre (Pareceres)',
    toneAndStyle: 'Acolhedor e congratulatório pela conquista do ciclo.',
    correctPhraseExample: '"Parabéns pela dedicação neste 2º Bimestre! Compilamos as anotações do João para o parecer. Deseja revisar antes de gerar o PDF?"',
    forbiddenPhraseExample: '"Prazo limite expirando! 5 pareceres ainda não foram entregues."'
  }
];

export const OFFICIAL_MANIFESTO: ManifestoParagraph[] = [
  {
    title: 'O Chamado: Por que o EducaFlow Existe',
    content: 'Ensinar crianças a ler, calcular, pensar e conviver é uma das tarefas mais nobres e transformadoras da sociedade humana. No entanto, o professor do Ensino Fundamental I foi encurralado por uma montanha silenciosa de burocracia, papéis, diários e relatórios que roubam sua energia e seu tempo com a família.',
    keyHighlight: 'Ensinar é uma arte humana. O papel aceita tudo, mas o olhar da criança não pode esperar.'
  },
  {
    title: 'A Nossa Promessa Inegociável',
    content: 'Nós não acreditamos em sistemas que tratam o professor como um preenchedor de dados ou um funcionário fabril. Acreditamos no professor como o maestro insubstituível da sala de aula. O EducaFlow nasce para ser o escudo que protege o tempo do docente e o farol que ilumina o caminho de cada aluno.',
    keyHighlight: 'A tecnologia existe para devolver o tempo de ensinar, não para criar novas tarefas.'
  },
  {
    title: 'O Futuro que Estamos Construindo Juntos',
    content: 'Sonhamos com o domingo à noite em que todo professor descansa com a mente tranquila, sabendo que sua semana está planejada, seus alunos enxergados em suas individualidades e sua dignidade preservada. Esse é o compromisso sagrado do EducaFlow.',
    keyHighlight: 'Mais tempo para o que importa: olhar, escutar, transformar.'
  }
];

export const CPO_AUDIT_VERDICT: CpoAuditVerdict[] = [
  {
    category: 'Alinhamento da Arquitetura do Sistema (System Blueprint)',
    status: 'Totalmente Alinhado',
    analysis: 'A centralidade na entidade "Turma" e o isolamento de permissões da IA respeitam rigorosamente o Princípio de Ouro #1 (O professor sempre decide) e o valor de Soberania Docente.'
  },
  {
    category: 'Planejamento do MVP V1.0 (MVP Blueprint)',
    status: 'Totalmente Alinhado',
    analysis: 'O escopo focado em 4 Sprints enxutas evita expressamente o inchaço de funcionalidades (Princípio #4) e garante a entrega da Chamada em 15 segundos e Pareceres em 3 cliques.'
  },
  {
    category: 'Estratégia de Experiência do Cliente (CX Journey & Personas)',
    status: 'Totalmente Alinhado',
    analysis: 'As 11 etapas da jornada cobrem exatamente a transformação do "domingo de ansiedade" na "paz mental de domingo", cumprindo o valor de Acolhimento e Zelo pela Saúde Mental.'
  },
  {
    category: 'Arquitetura de Inteligência Artificial (Aurora)',
    status: 'Totalmente Alinhado',
    analysis: 'Guardrails inegociáveis impedem qualquer escrita autônoma desautorizada, honrando a Constituição em todos os pontos de contato com o usuário.'
  }
];

export const CPO_OFFICIAL_SIGNATURE = {
  role: 'Chief Product Officer (CPO) & Guardião da Visão EducaFlow',
  date: '2026-07-28',
  status: 'CONSTITUIÇÃO OFICIAL PROMULGADA E EM VIGOR',
  note: 'Esta Constituição é o documento supremo de diretriz de produto. Qualquer proposta de funcionalidade ou mudança de design que viole qualquer um dos 10 Princípios de Ouro será vetada imediatamente sem exceção.'
};
