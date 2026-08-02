import { JourneyStage, SmartFlowMission } from '../types';

export const TEACHER_JOURNEY_STAGES: JourneyStage[] = [
  {
    id: 'j1',
    stageNumber: 'Estágio 1',
    title: 'Abertura da Jornada (Chegada à Escola & Início do Dia)',
    timeframe: '07:00 às 07:30',
    contextLocation: 'Sala dos Professores / Corredor com Celular em Mãos ou Notebook Aberto',
    whatIsThinking: 'O que eu tenho para ensinar hoje mesmo? Será que esqueci alguma folha impressa? A coordenação vai me pedir o diário de classe da semana passada?',
    whatIsFeeling: 'Ansiedade antecipatória, aceleração mental, sensação de sobressalto antes do sinal tocar.',
    whatIsNeeding: 'Clareza imediata e sem ruídos sobre o compromisso pedagógico do dia e estado atual do planejamento.',
    immediatePlatformResponse: 'Cockpit "Hoje": Abertura direta na tela da data atual, destacando a aula das 07:30, o plano em uso e o botão gigante de "Fazer Chamada de Hoje". Sem menus laterais expansíveis, sem pop-ups, sem dashboards financeiros.',
    clickReductionStrategy: 'Zero cliques para chegar ao dia atual (detecção do dia e horário letivo por padrão). 1 clique direto para abrir o plano de aula em execução.',
    anxietyReductionStrategy: 'Mensagem de acolhimento humanizada ("Bom dia, Cláudia! O plano do 2º Ano A está pronto para hoje."), uso de cores suaves com contraste acessível e indicador visual de "Tudo Sincronizado".',
    timeSavingsStrategy: 'Economiza 10 a 15 minutos que seriam gastos procurando documentos em arquivos Word no computador ou pastas de papel.',
    delightfulExperienceFactors: [
      'Micro-saudação personalizada com frase de incentivo pedagógico.',
      'Acesso offline imediato se a Wi-Fi da escola falhar.',
      'Visualização rápida das crianças que fazem aniversário na semana.'
    ]
  },
  {
    id: 'j2',
    stageNumber: 'Estágio 2',
    title: 'Regência Ativa em Sala de Aula (Execução da Aula)',
    timeframe: '07:30 às 11:30',
    contextLocation: 'Sala de Aula com 30 Crianças do EF1 (Barulho Ambiente Alto)',
    whatIsThinking: 'Preciso fazer a chamada rápido sem que a turma dispersa! Como registro quem está em hipótese Pré-Silábica sem parar a aula?',
    whatIsFeeling: 'Hipervigilância, sobrecarga sensorial, correria e receio de perder o controle do tempo.',
    whatIsNeeding: 'Interface tátil com botões grandes operável com apenas uma mão enquanto caminha pelas carteiras das crianças.',
    immediatePlatformResponse: 'Modo "Foco na Sala": Tela de chamada por exceção onde todas as crianças constam como presentes por padrão. Toque simples apenas na foto/nome da criança ausente. Marcador rápido de hipótese de escrita por ícones visuais.',
    clickReductionStrategy: 'Substitui a rolagem de 30 nomes por clique único apenas nos 2 ou 3 ausentes (30 cliques -> 2 cliques).',
    anxietyReductionStrategy: 'Indicador visual verde e estático de "Salvo no Dispositivo (Offline)", eliminando o medo de perder dados se a internet cair durante a chamada.',
    timeSavingsStrategy: 'Reduz a chamada de 15 minutos para 45 segundos e o registro de hipótese de escrita de 30 minutos para 2 minutos.',
    delightfulExperienceFactors: [
      'Toque auditivo suave e haptic feedback (vibração leve) ao confirmar presença.',
      'Ícones lúdicos para categorizar hipóteses de escrita (Semente, Broto, Flor, Árvore).',
      'Atalho para temporizador visual de atividades projetável para os alunos.'
    ]
  },
  {
    id: 'j3',
    stageNumber: 'Estágio 3',
    title: 'Transição / Hora-Atividade & Intervalo',
    timeframe: '11:30 às 13:00',
    contextLocation: 'Sala dos Professores / Refeitório',
    whatIsThinking: 'Preciso tomar um café e ir ao banheiro, mas ainda preciso lançar o diário e imprimir a atividade de matemática do 3º ano.',
    whatIsFeeling: 'Cansaço físico, sede de descompressão mental e urgência de não acumular pendências para a noite.',
    whatIsNeeding: 'Automação instantânea que transforme o que foi feito na aula em registro oficial e impressão em 1 clique.',
    immediatePlatformResponse: 'Card de "Fechamento da Manhã": O sistema copia o plano ministrado, vincula as habilidades BNCC trabalhadas na aula e oferece o botão "Enviar Diário Oficial da Manhã".',
    clickReductionStrategy: 'De 15 campos de texto repetitivos para 1 clique de confirmação do resumo automático.',
    anxietyReductionStrategy: 'Animação de check verde com mensagem: "Diário da manhã concluído com sucesso! Descanse no seu intervalo."',
    timeSavingsStrategy: 'Elimina 40 minutos de digitação manual nos portais burocráticos do governo.',
    delightfulExperienceFactors: [
      'Resumo automático em linguagem pedagógica clara e norma-padrão.',
      'Geração de folha de atividade já formatada para economia de folha de sulfite (2 por página).'
    ]
  },
  {
    id: 'j4',
    stageNumber: 'Estágio 4',
    title: 'Pós-Aula & Turno da Noite em Casa (Encerramento do Dia)',
    timeframe: '18:30 às 21:00',
    contextLocation: 'Mesa de Casa / Convivência Familiar',
    whatIsThinking: 'Quero dar atenção aos meus filhos e descansar, mas amanhã preciso de uma aula engajante sobre divisão e leitura de contos.',
    whatIsFeeling: 'Exaustão física e mental, culpa por trabalhar em casa, ansiedade pelo dia seguinte.',
    whatIsNeeding: 'Assistente de fluxo guiado que construa a aula de amanhã e selecione a atividade em menos de 10 minutos.',
    immediatePlatformResponse: 'Fluxo Inteligente "Preparar Aula de Amanhã": O sistema já sabe qual habilidade BNCC é a próxima da sequência anual e sugere 3 roteiros prontos com atividades limpas para baixar.',
    clickReductionStrategy: 'Substitui 2 horas de navegação no Pinterest/Google e cópia para Word por 3 escolhas visuais encadeadas.',
    anxietyReductionStrategy: 'Garantia de conformidade com a BNCC com o selo "Habilidade EF02MA06 Coberta". Sensação de dever cumprido antes de ir jantar.',
    timeSavingsStrategy: 'Economiza 2 horas de trabalho noturno, devolvendo o tempo de descanso com a família.',
    delightfulExperienceFactors: [
      'Botão "Encerrar Dia do Professor" que bloqueia notificações de trabalho até as 07:00 da manhã.',
      'Download do arquivo em PDF pronto com cabeçalho da escola preenchido automaticamente.'
    ]
  }
];

export const SMART_FLOWS_MISSIONS: SmartFlowMission[] = [
  {
    id: 'mission-1',
    missionName: 'Missão 1: Preparar Aula de Amanhã',
    iconName: 'CalendarCheck',
    tagline: 'Do planejamento ao material em 3 passos simples alinhados à BNCC',
    problemSolved: 'Professores gastam 2 a 3 horas pesquisando conteúdos soltos e formatando planos no Word.',
    traditionalMenuPath: 'Menu > Planejamento > Meus Planos > Criar Novo > Buscar BNCC > Copiar Código > Abrir Word > Formatar > Salvar',
    smartFlowShortcutPath: 'Cockpit do Dia -> Botão "Preparar Próxima Aula" (Sequência BNCC Sugerida -> Escolher Estilo -> Confirmar)',
    totalClicksBefore: 18,
    totalClicksAfter: 3,
    estimatedTimeBefore: '2.5 horas',
    estimatedTimeAfter: '8 minutos',
    cognitivePill: 'Redução de Carga Cognitiva: O sistema lembra onde a turma parou e sugere a próxima habilidade lógica sem exigir memorização de códigos.',
    steps: [
      {
        stepNumber: 1,
        stepName: 'Confirmação de Habilidade BNCC',
        userAction: 'Professora visualiza a habilidade seguinte da sequência lógica (ex: EF02MA06) e clica em "Usar Esta Habilidade".',
        systemAction: 'O EducaFlow recupera o histórico da turma e apresenta o tema contextualizado com sugestão de metodologia ativa.',
        microCopyOrInterfaceHint: 'Sugestão: "Sua turma dominou adição simples ontem. O próximo passo recomendado é Subtração com Recursos Visuais."'
      },
      {
        stepNumber: 2,
        stepName: 'Escolha da Dinâmica de Aula',
        userAction: 'Seleciona o estilo de abordagem pedagógica em 1 clique (ex: "Aula Prática com Jogos" ou "Contação de História").',
        systemAction: 'Gera o roteiro contendo: Momento Inicial (10min), Desenvolvimento (30min) e Fechamento/Sintese (10min).',
        microCopyOrInterfaceHint: 'Roteiro visual de 50 minutos montado automaticamente.'
      },
      {
        stepNumber: 3,
        stepName: 'Geração de Material e Registro',
        userAction: 'Clica em "Confirmar e Vincular Atividade".',
        systemAction: 'Insere a aula no diário futuro e disponibiliza o PDF da folha do aluno pronto para impressão.',
        microCopyOrInterfaceHint: 'Pronto! A aula de amanhã está planejada e no seu diário.'
      }
    ]
  },
  {
    id: 'mission-2',
    missionName: 'Missão 2: Criar Atividade Pedagógica',
    iconName: 'FileText',
    tagline: 'Folhas de exercícios em alta resolução e prontas para impressão',
    problemSolved: 'Atividades da internet em baixa qualidade, com anúncios ou inadequadas para a faixa etária.',
    traditionalMenuPath: 'Menu > Recursos > Banco de Arquivos > Filtrar Série > Filtrar Disciplina > Baixar Word > Ajustar Imagens > Imprimir',
    smartFlowShortcutPath: 'No Roteiro da Aula -> Botão "Gerar Folha de Atividade" -> Escolher Nível de Dificuldade -> Imprimir',
    totalClicksBefore: 14,
    totalClicksAfter: 2,
    estimatedTimeBefore: '1.5 hora',
    estimatedTimeAfter: '3 minutos',
    cognitivePill: 'Segurança Estética e Pedagógica: Atividades limpas com tipografia adequada para alfabetização (letra bastão e imprensa).',
    steps: [
      {
        stepNumber: 1,
        stepName: 'Definição do Nível da Turma',
        userAction: 'Seleciona se a atividade será de Nível Inicial, Intermediário ou Desafio.',
        systemAction: 'Filtra e seleciona exercícios testados pedagogicamente para a habilidade atual.',
        microCopyOrInterfaceHint: 'Selecione o formato da fonte: [Letra Bastão Grande (1º/2º ano)] ou [Imprensa (3º/5º ano)].'
      },
      {
        stepNumber: 2,
        stepName: 'Visualização e Layout Inteligente',
        userAction: 'Escolhe entre layout de página inteira ou economia de papel (2 atividades por folha A4).',
        systemAction: 'Reorganiza os elementos visuais garantindo margens de impressão perfeitas.',
        microCopyOrInterfaceHint: 'Layout otimizado para fotocópia (economiza 50% de papel na escola).'
      }
    ]
  },
  {
    id: 'mission-3',
    missionName: 'Missão 3: Fazer Avaliação Bimestral',
    iconName: 'Award',
    tagline: 'Montagem de provas com matriz do SAEB/BNCC e gabarito automático',
    problemSolved: 'Elaborar questões com enunciados claros e formatar provas bimestrais com gabarito de correção.',
    traditionalMenuPath: 'Menu > Avaliações > Criar Prova > Digitar Questão 1 > Digitar Questão 2 > Formatar Cabeçalho > Criar Gabarito Manual',
    smartFlowShortcutPath: 'Módulo Bimestral -> "Montar Prova da Habilidade X ao Y" -> Selecionar Qtd de Questões -> Gerar Prova + Gabarito',
    totalClicksBefore: 22,
    totalClicksAfter: 3,
    estimatedTimeBefore: '4 horas',
    estimatedTimeAfter: '10 minutos',
    cognitivePill: 'Paz de Espírito Avaliativa: Questões alinhadas exatamente ao que foi ensinado nas aulas do bimestre.',
    steps: [
      {
        stepNumber: 1,
        stepName: 'Seleção das Habilidades do Bimestre',
        userAction: 'Marca as habilidades que foram trabalhadas durante o bimestre no diário.',
        systemAction: 'Compila a matriz de referência de questões correspondentes a cada código.',
        microCopyOrInterfaceHint: 'O sistema pré-selecionou as 4 habilidades mais lecionadas no bimestre.'
      },
      {
        stepNumber: 2,
        stepName: 'Composição das Questões',
        userAction: 'Ajusta a proporção: 60% Fácil/Médio e 40% Desafio.',
        systemAction: 'Gera a prova formatada com espaço para nome do aluno, data, turma e gabarito do professor separado.',
        microCopyOrInterfaceHint: 'Prova gerada com versão A e versão B para evitar cola entre carteiras vizinhas.'
      }
    ]
  },
  {
    id: 'mission-4',
    missionName: 'Missão 4: Corrigir Atividades & Diagnóstico',
    iconName: 'CheckSquare',
    tagline: 'Transformar a correção manual em mapa visual de aprendizado',
    problemSolved: 'Corrigir 35 cadernos um a um sem conseguir extrair dados consolidados de quem errou o quê.',
    traditionalMenuPath: 'Menu > Turmas > Alunos > Selecionar Aluno 1 > Nota > Selecionar Aluno 2 > Nota...',
    smartFlowShortcutPath: 'Atividade do Dia -> "Grade de Lançamento Rápido" -> Marcar acertos por símbolos em lote',
    totalClicksBefore: 35,
    totalClicksAfter: 5,
    estimatedTimeBefore: '2 horas',
    estimatedTimeAfter: '12 minutos',
    cognitivePill: 'Feedback Imediato: Visualização instantânea de qual questão a maioria da turma errou para intervenção no dia seguinte.',
    steps: [
      {
        stepNumber: 1,
        stepName: 'Gabarito Dinâmico de Lançamento',
        userAction: 'Professora abre a lista tátil da turma no celular ou computador.',
        systemAction: 'Apresenta a lista com opção de marcação em 1 toque (OK / Precisa de Reforço).',
        microCopyOrInterfaceHint: 'Toque rápido: Verde (Compreendeu) | Amarelo (Apoio) | Vermelho (Não realizou).'
      },
      {
        stepNumber: 2,
        stepName: 'Consolidação Diagnóstica',
        userAction: 'Clica em "Finalizar Correção".',
        systemAction: 'Gera alerta automático: "70% da turma errou a Questão 3 (Subtração com Troca). Recomenda-se aula de reforço com material dourado."',
        microCopyOrInterfaceHint: 'Diagnóstico de turma atualizado no diário.'
      }
    ]
  },
  {
    id: 'mission-5',
    missionName: 'Missão 5: Escrever Parecer Descritivo Individual',
    iconName: 'HeartHandshake',
    tagline: 'Pareceres pedagógicos humanizados, técnicos e sem texto genérico',
    problemSolved: 'A maior dor do bimestre: redigir pareceres para 30 a 35 alunos gastando mais de 20 horas.',
    traditionalMenuPath: 'Menu > Relatórios > Pareceres > Escolher Aluno > Buscar Modelo no Word > Editar Texto do Zero > Salvar PDF',
    smartFlowShortcutPath: 'Fechamento Bimestral -> Selecionar Aluno -> "Gerar Minuta de Parecer baseada no Diário" -> Revisar e Assinar',
    totalClicksBefore: 30,
    totalClicksAfter: 3,
    estimatedTimeBefore: '45 min por aluno',
    estimatedTimeAfter: '4 min por aluno',
    cognitivePill: 'Acolhimento e Precisão: O parecer reflete os registros reais do diário sem que o professor precise relembrar fatos de 2 meses atrás.',
    steps: [
      {
        stepNumber: 1,
        stepName: 'Recuperação de Memória Pedagógica',
        userAction: 'Professora clica no nome do aluno (ex: "Lucas Andrade - 2º Ano").',
        systemAction: 'O EducaFlow cruza as presenças, hipóteses de escrita anotadas e atividades corrigidas do Lucas no bimestre.',
        microCopyOrInterfaceHint: 'Registros do Lucas: Avançou de Pré-Silábico para Silábico com Valor no mês passado.'
      },
      {
        stepNumber: 2,
        stepName: 'Estruturação da Minuta Pedagógica',
        userAction: 'Clica em "Gerar Minuta Acolhedora".',
        systemAction: 'Redige parecer em 3 parágrafos claros: (1) Aspectos Socioemocionais e Convivência, (2) Avanços na Aprendizagem/Alfabetização, (3) Recomendações para a Família.',
        microCopyOrInterfaceHint: 'Texto gerado em tom técnico, respeitoso e encorajador.'
      },
      {
        stepNumber: 3,
        stepName: 'Edição Final e Validação',
        userAction: 'Ajusta algum detalhe afetivo e clica em "Validar e Emitir PDF".',
        systemAction: 'Armazena o documento oficial pronto para o Conselho de Classe e entrega aos pais.',
        microCopyOrInterfaceHint: 'Parecer concluído e salvo no prontuário do aluno.'
      }
    ]
  },
  {
    id: 'mission-6',
    missionName: 'Missão 6: Organizar Turma & Hipóteses de Alfabetização',
    iconName: 'Users',
    tagline: 'Mapeamento das fases de escrita com sugestão de agrupamentos produtivos',
    problemSolved: 'Dificuldade de visualizar em qual nível de escrita cada criança está e como formar duplas de trabalho em sala.',
    traditionalMenuPath: 'Menu > Alunos > Fichas Indivduais > Anotar Fases em Papel > Montar Tabela Manual',
    smartFlowShortcutPath: 'Modo Sala -> "Mapeador Visual de Alfabetização" -> Arrasta o aluno para o nível correspondente',
    totalClicksBefore: 12,
    totalClicksAfter: 2,
    estimatedTimeBefore: '1 hora',
    estimatedTimeAfter: '2 minutos',
    cognitivePill: 'Visão Holística da Turma: Painel visual tipo Kanban (Pré-silábico, Silábico, Silábico-Alfabético, Alfabético).',
    steps: [
      {
        stepNumber: 1,
        stepName: 'Atualização do Nível por Arraste ou Toque',
        userAction: 'Move a criança para a coluna da hipótese de escrita verificada na sondagem.',
        systemAction: 'Atualiza o indicador de progresso de alfabetização da turma inteira.',
        microCopyOrInterfaceHint: 'Exemplo: Lucas avançou para [Silábico com Valor].'
      },
      {
        stepNumber: 2,
        stepName: 'Sugestão de Duplas Produtivas',
        userAction: 'Clica em "Sugerir Duplas de Trabalho para a Aula de Hoje".',
        systemAction: 'Combina alunos de níveis contíguos (ex: Pré-Silábico + Silábico com Valor) para aprendizagem colaborativa.',
        microCopyOrInterfaceHint: '15 duplas de trabalho sugeridas para a atividade de leitura.'
      }
    ]
  },
  {
    id: 'mission-7',
    missionName: 'Missão 7: Preparar Reunião de Pais',
    iconName: 'UsersCheck',
    tagline: 'Ficha síntese visual de evolução para entregar aos responsáveis',
    problemSolved: 'Reuniões de pais desgastantes por falta de dados claros ou cobranças sem embasamento de registro.',
    traditionalMenuPath: 'Menu > Documentos > Criar Relatório > Copiar Frequência > Copiar Notas > Digitar Observações > Imprimir',
    smartFlowShortcutPath: 'Turmas -> "Relatório Rápido para Reunião de Pais" -> Baixar Pacote da Turma em PDF',
    totalClicksBefore: 25,
    totalClicksAfter: 2,
    estimatedTimeBefore: '3 horas',
    estimatedTimeAfter: '5 minutos',
    cognitivePill: 'Parceria Escola-Família: Transparência e profissionalismo com gráficos simples que a família entende com facilidade.',
    steps: [
      {
        stepNumber: 1,
        stepName: 'Geração do Pacote da Turma',
        userAction: 'Professora seleciona "Gerar Fichas para a Reunião do 2º Bimestre".',
        systemAction: 'Compila para cada aluno: Frequência %, Destaques de Aprendizagem e Recomendações de Leitura em Casa.',
        microCopyOrInterfaceHint: 'Folha individual A4 bonita e acolhedora pronta para impressão.'
      },
      {
        stepNumber: 2,
        stepName: 'Impressão Organizada por Ordem Alfabética',
        userAction: 'Clica em "Imprimir Todas as Fichas da Turma".',
        systemAction: 'Gera um único arquivo PDF ordenado prático para a mesa da reunião.',
        microCopyOrInterfaceHint: '30 fichas individuais prontas para a reunião de hoje à noite.'
      }
    ]
  },
  {
    id: 'mission-8',
    missionName: 'Missão 8: Adaptar Atividade para Inclusão (PDI / NEE)',
    iconName: 'Sparkles',
    tagline: 'Adaptação pedagógica imediata para alunos com autismo, TDAH ou deficiência',
    problemSolved: 'Professores passam horas redesenhando atividades do zero para atender alunos laudados.',
    traditionalMenuPath: 'Menu > Atividades > Criar Nova do Zero > Simplificar Texto > Aumentar Fonte > Adicionar Pictogramas',
    smartFlowShortcutPath: 'Atividade Selecionada -> Botão "Adaptar para Inclusão (PDI)" -> Selecionar Perfil (ex: TEA/TDAH) -> Gerar',
    totalClicksBefore: 20,
    totalClicksAfter: 3,
    estimatedTimeBefore: '1.5 hora',
    estimatedTimeAfter: '2 minutos',
    cognitivePill: 'Equidade e Acolhimento: Garante que a criança com necessidade específica participe do mesmo tema da turma de forma adaptada.',
    steps: [
      {
        stepNumber: 1,
        stepName: 'Seleção da Necessidade Pedagógica',
        userAction: 'Escolhe o perfil de adaptação (ex: "Econômico de Estímulos / Contraste Alto" para Autismo ou "Passos Curtos com Pictogramas" para TDAH).',
        systemAction: 'Aplica regras de Acessibilidade Pedagógica (ampliação de fonte, redução de poluição visual e comandos diretos).',
        microCopyOrInterfaceHint: 'Ajuste automático de densidade cognitiva de texto.'
      },
      {
        stepNumber: 2,
        stepName: 'Emissão da Folha Adaptada',
        userAction: 'Clica em "Gerar Versão Inclusiva".',
        systemAction: 'Gera a folha da atividade perfeitamente integrada ao tema da aula, porém com comandos acessíveis.',
        microCopyOrInterfaceHint: 'Atividade inclusiva pronta mantendo a dignidade e a autonomia do aluno.'
      }
    ]
  }
];
