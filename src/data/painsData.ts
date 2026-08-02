import { PainPoint, ResearchPersona } from '../types';

export const RESEARCH_PERSONAS = {
  teacher: {
    role: 'Pesquisador de UX Docente',
    name: 'Profª. Cláudia Silveira',
    schoolType: 'Escola Municipal + Escola Particular (Jornada Dupla)',
    gradesCount: 'Regente do 2º e 3º Ano (EF1)',
    quote: 'Minha sensação constante é que passo mais tempo provando que ensinei do que efetivamente ensinando.',
    dailyRoutineSummary: 'Acorda às 5h30, leciona de manhã no município, corre para a escola particular à tarde, e passa das 20h às 23h30 corrigindo cadernos e preenchendo diários de classe em casa.'
  }
};

export const PAIN_POINTS: PainPoint[] = [
  // 1. ANTES DA AULA
  {
    id: 'pain-1',
    stageId: 'before',
    stageName: '1. Antes da Aula',
    taskName: 'Planejamento Diário e Semanal de Aulas alinhado à BNCC',
    mainDifficulties: [
      'Procurar manualmente códigos das habilidades BNCC adequados ao nível da turma (ex: diferenciar alfabetização do 1º para o 2º ano).',
      'Formatador rígido exigido pela coordenação (documentos Word longos de 5 páginas por semana).',
      'Adaptar planos genéricos da internet para turmas com alunos em diferentes hipóteses de escrita.'
    ],
    stressLevel: 'Alto',
    avgTimeSpent: '4 a 6 horas por final de semana',
    frequency: 'Semanal',
    qualityOfLifeImpact: 'Rouba o tempo de descanso do professor aos sábados e domingos, gerando estresse crônico na vida familiar.',
    currentExistingSolutions: 'Grupos de WhatsApp/Facebook de professores, blogs informais, arquivos Word salvos de anos anteriores.',
    whyCurrentSolutionsFail: 'A maioria dos materiais online não está rigorosamente alinhada aos códigos atualizados da BNCC ou exige edição exaustiva para caber na realidade da escola.',
    educaFlowSimpleFix: 'Sugestão contextualizada e automática de habilidades BNCC com pré-preenchimento intuitivo que gera um plano pronto e formatado.',
    teacherImpact: 'Extremo',
    occurrenceFrequency: 'Semanal',
    perceivedSubscriptionValue: 'Vital',
    mvpPriority: 'P1 - Indispensável'
  },
  {
    id: 'pain-2',
    stageId: 'before',
    stageName: '1. Antes da Aula',
    taskName: 'Busca, Criação e Impressão de Atividades Pedagógicas',
    mainDifficulties: [
      'Atividades da internet em baixa resolução, inadequadas para impressão ou com linguagem imprópria para a idade.',
      'Falta de recursos visuais para crianças em alfabetização e letramento inicial.',
      'Custo do próprio bolso com cartuchos de tinta e papel quando a escola limita cópias.'
    ],
    stressLevel: 'Médio',
    avgTimeSpent: '1.5 hora por dia útil',
    frequency: 'Diária',
    qualityOfLifeImpact: 'Cansaço visual constante criando layouts no Canva/Word à noite antes de dormir.',
    currentExistingSolutions: 'Canva, Pinterest, busca no Google Imagens, PDFs comprados em sites de materiais.',
    whyCurrentSolutionsFail: 'Atividades prontas raramente vêm adaptadas para necessidades específicas (ex: letra bastão vs. imprensa para o 1º ano) e demandam montagem manual.',
    educaFlowSimpleFix: 'Banco de atividades limpas, em alta resolução e prontas para impressão, categorizadas diretamente por habilidade do EF1.',
    teacherImpact: 'Alto',
    occurrenceFrequency: 'Diária',
    perceivedSubscriptionValue: 'Alto',
    mvpPriority: 'P1 - Indispensável'
  },

  // 2. DURANTE A AULA
  {
    id: 'pain-3',
    stageId: 'during',
    stageName: '2. Durante a Aula',
    taskName: 'Chamada de Frequência e Registro de Ocorrências em Sala',
    mainDifficulties: [
      'Perda de 10 a 15 minutos do tempo precioso de aula para fazer a chamada aluno por aluno.',
      'Diários de classe em papel que rasgam, molham ou acumulam rasuras.',
      'Anotar ocorrências comportamentais em papéis avulsos que acabam se perdendo no caos da sala de aula.'
    ],
    stressLevel: 'Médio',
    avgTimeSpent: '15 a 20 minutos por aula',
    frequency: 'Diária',
    qualityOfLifeImpact: 'Interrompe a dinâmica pedagógica, gerando dispersão da turma do 1º ao 5º ano e sensação de tempo perdido.',
    currentExistingSolutions: 'Caderneta física de papel ou sistemas de gestão escolar lentos no celular.',
    whyCurrentSolutionsFail: 'Sistemas de secretarias públicas são burocráticos, exigem múltiplos cliques para cada aluno e frequentemente caem na rede móvel da escola.',
    educaFlowSimpleFix: 'Chamada por exceção (todos presentes por padrão com toque único apenas nos ausentes) com funcionamento offline perfeito.',
    teacherImpact: 'Alto',
    occurrenceFrequency: 'Diária',
    perceivedSubscriptionValue: 'Alto',
    mvpPriority: 'P1 - Indispensável'
  },
  {
    id: 'pain-4',
    stageId: 'during',
    stageName: '2. Durante a Aula',
    taskName: 'Acompanhamento Individual da Hipótese de Escrita / Alfabetização',
    mainDifficulties: [
      'Turmas heterogêneas no 1º/2º ano com crianças em níveis Pré-Silábico, Silábico sem valor, Silábico com valor e Alfabético.',
      'Dificuldade de registrar em tempo real quais intervenções foram feitas com cada criança no decorrer da atividade.',
      'Falta de apoio visual rápido sobre qual próximo estímulo dar para a criança avançar de nível.'
    ],
    stressLevel: 'Alto',
    avgTimeSpent: '30 minutos durante a regência',
    frequency: 'Diária',
    qualityOfLifeImpact: 'Sensação constante de angústia por não conseguir dar a atenção individualizada necessária a cada criança.',
    currentExistingSolutions: 'Anotações em blocos de papel e fichas de acompanhamento feitas à mão.',
    whyCurrentSolutionsFail: 'Fichas em papel são difíceis de cruzar e consolidar no final do mês sem gastar horas transcrevendo.',
    educaFlowSimpleFix: 'Seletor rápido de hipótese de escrita por aluno que sugere na hora a intervenção pedagógica adequada.',
    teacherImpact: 'Extremo',
    occurrenceFrequency: 'Diária',
    perceivedSubscriptionValue: 'Vital',
    mvpPriority: 'P1 - Indispensável'
  },

  // 3. DEPOIS DA AULA
  {
    id: 'pain-5',
    stageId: 'after',
    stageName: '3. Depois da Aula',
    taskName: 'Preenchimento do Diário de Classe com Conteúdo Ministrado',
    mainDifficulties: [
      'Obrigação de descrever detalhadamente o que foi ensinado e cruzar com os códigos da BNCC.',
      'Interface burocrática dos portais do governo que expiram a sessão (timeout) no meio do preenchimento.',
      'Trabalho não remunerado realizado à noite em casa após a jornada dupla.'
    ],
    stressLevel: 'Crítico',
    avgTimeSpent: '1 a 2 horas todas as noites',
    frequency: 'Diária',
    qualityOfLifeImpact: 'Consome a noite e o tempo de convívio com a própria família, gerando exaustão física e mental (Síndrome de Burnout).',
    currentExistingSolutions: 'Sistemas de diário eletrônico oficiais da secretaria de educação ou cadernetas em papel.',
    whyCurrentSolutionsFail: 'Desenvolvidos para fiscalização administrativa e não para facilitar o trabalho do professor; exigem digitação repetitiva.',
    educaFlowSimpleFix: 'Preenchimento rápido em formato de diário de bordo que copia o plano do dia e vincula a BNCC em 1 clique.',
    teacherImpact: 'Extremo',
    occurrenceFrequency: 'Diária',
    perceivedSubscriptionValue: 'Vital',
    mvpPriority: 'P1 - Indispensável'
  },
  {
    id: 'pain-6',
    stageId: 'after',
    stageName: '3. Depois da Aula',
    taskName: 'Correção de Cadernos, Deveres de Casa e Atividades',
    mainDifficulties: [
      'Carregar mochilas pesadas com 30 a 60 cadernos para corrigir em casa.',
      'Escrever pareceres e recados individuais nos cadernos para dar retorno aos pais.',
      'Identificar de forma consolidada quais questões a maioria da turma errou.'
    ],
    stressLevel: 'Alto',
    avgTimeSpent: '2 horas por dia',
    frequency: 'Diária',
    qualityOfLifeImpact: 'Sobrecarga física (dores nas costas e punhos) e falta de tempo para descanso diário.',
    currentExistingSolutions: 'Correção manual item por item com caneta vermelha.',
    whyCurrentSolutionsFail: 'Processo puramente analógico e repetitivo que não gera dados organizados sobre o aprendizado da turma.',
    educaFlowSimpleFix: 'Gabaritos claros e checklists de rubricas rápidas para avaliação de atividades impressas.',
    teacherImpact: 'Alto',
    occurrenceFrequency: 'Diária',
    perceivedSubscriptionValue: 'Médio',
    mvpPriority: 'P2 - Importante'
  },

  // 4. FECHAMENTOS BIMESTRAIS E AVALIAÇÕES
  {
    id: 'pain-7',
    stageId: 'closing',
    stageName: '4. Fechamentos Bimestrais & Avaliações',
    taskName: 'Elaboração de Pareceres Descritivos Individuais (1º ao 5º ano)',
    mainDifficulties: [
      'Redigir pareceres pedagógicos detalhados para 30 a 35 alunos sem usar textos genéricos ou repetitivos.',
      'Lembrar dos avanços individuais de cada criança ocorridos há 2 meses.',
      'Manter o tom acolhedor e técnico exigido pela coordenação e famílias.'
    ],
    stressLevel: 'Crítico',
    avgTimeSpent: '20 a 30 horas por bimestre',
    frequency: 'Bimestral',
    qualityOfLifeImpact: 'Perda total dos finais de semana de fechamento de bimestre, provocando picos intensos de ansiedade.',
    currentExistingSolutions: 'Modelos de pareceres em arquivo Word trocados entre professores e edição manual.',
    whyCurrentSolutionsFail: 'Os modelos engessados perdem a individualidade do aluno e levam muito tempo para serem adaptados um por um.',
    educaFlowSimpleFix: 'Assistente de estruturação de pareceres baseado nas observações registradas ao longo do bimestre.',
    teacherImpact: 'Extremo',
    occurrenceFrequency: 'Bimestral',
    perceivedSubscriptionValue: 'Vital',
    mvpPriority: 'P1 - Indispensável'
  },
  {
    id: 'pain-8',
    stageId: 'closing',
    stageName: '4. Fechamentos Bimestrais & Avaliações',
    taskName: 'Montagem de Provas e Consolidação das Médias Bimestrais',
    mainDifficulties: [
      'Elaborar questões alinhadas às matrizes do SAEB/BNCC sem erros de formatação.',
      'Calcular médias ponderadas de notas e frequências sem errar planilhas.',
      'Preencher formulários do Conselho de Classe com justificativas para alunos abaixo da média.'
    ],
    stressLevel: 'Alto',
    avgTimeSpent: '10 horas por bimestre',
    frequency: 'Bimestral',
    qualityOfLifeImpact: 'Pressão pelo cumprimento de prazos rígidos impostos pela escola sob risco de penalizações.',
    currentExistingSolutions: 'Planilhas Excel pessoais e formulários em papel do Conselho de Classe.',
    whyCurrentSolutionsFail: 'Planilhas são propensas a erros de fórmula e não conversam diretamente com os relatórios pedagógicos.',
    educaFlowSimpleFix: 'Consolidação automática de médias com alerta visual de alunos que necessitam de apoio pedagógico urgente.',
    teacherImpact: 'Alto',
    occurrenceFrequency: 'Bimestral',
    perceivedSubscriptionValue: 'Alto',
    mvpPriority: 'P2 - Importante'
  },

  // 5. DURANTE O ANO LETIVO
  {
    id: 'pain-9',
    stageId: 'year_round',
    stageName: '5. Durante o Ano Letivo',
    taskName: 'Comunicação com Pais/Responsaveis e Reuniões de Pais',
    mainDifficulties: [
      'Pais enviando mensagens no WhatsApp pessoal do professor em horários de descanso (noite e finais de semana).',
      'Falta de dados organizados para demonstrar aos pais a evolução do filho durante as reuniões.',
      'Desalinhar expectativas sobre o processo de alfabetização da criança.'
    ],
    stressLevel: 'Alto',
    avgTimeSpent: '3 horas por semana',
    frequency: 'Anual',
    qualityOfLifeImpact: 'Invasão da privacidade e da vida pessoal do professor através de canais de mensagem instantânea.',
    currentExistingSolutions: 'Grupos de WhatsApp de pais ou agenda física de recados.',
    whyCurrentSolutionsFail: 'O WhatsApp destrói os limites do tempo livre e a agenda em papel é frequentemente esquecida na mochila pelo aluno.',
    educaFlowSimpleFix: 'Relatório resumido de progresso individual em PDF para envio formal na reunião de pais.',
    teacherImpact: 'Alto',
    occurrenceFrequency: 'Semanal',
    perceivedSubscriptionValue: 'Alto',
    mvpPriority: 'P2 - Importante'
  },
  {
    id: 'pain-10',
    stageId: 'year_round',
    stageName: '5. Durante o Ano Letivo',
    taskName: 'Acompanhamento do Cumprimento do Currículo Anual BNCC',
    mainDifficulties: [
      'Chegar no meio do ano sem saber ao certo a porcentagem do currículo exigido da série que já foi cumprida.',
      'Demandas de fiscalização da coordenação pedagógica exigindo comprovação de alinhamento.',
      'Perda de prazos de conteúdos pré-requisito para o ano seguinte.'
    ],
    stressLevel: 'Médio',
    avgTimeSpent: '2 horas por mês',
    frequency: 'Anual',
    qualityOfLifeImpact: 'Sensação de descontrole pedagógico e insegurança em relação às metas do ano letivo.',
    currentExistingSolutions: 'Planilhas de controle interno ou checklists em papel na pasta da coordenação.',
    whyCurrentSolutionsFail: 'Raramente são atualizados em tempo real, tornando-se documentos burocráticos sem uso prático no dia a dia.',
    educaFlowSimpleFix: 'Painel visual de cobertura da BNCC atualizado automaticamente a cada plano/diário salvo.',
    teacherImpact: 'Médio',
    occurrenceFrequency: 'Semanal',
    perceivedSubscriptionValue: 'Médio',
    mvpPriority: 'P3 - Desejável'
  }
];
