import { MvpModuleFunctionalSpec, DddBoundedContext, ImplementationDependencyNode } from '../types';

export const FUNCTIONAL_SPEC_MODULES: MvpModuleFunctionalSpec[] = [
  {
    id: 'mod-1',
    code: 'MOD-01',
    name: 'Chamada Ultrarrápida de Presença em 15 Segundos',
    objective: 'Permitir o registro de frequência diária da turma em menos de 15 segundos, com tolerância total a falhas de conexão de internet.',
    triggers: 'Professor clica no botão "Fazer Chamada Rápidda (15s)" no Cockpit do Professor ou seleciona o atalho de teclado [Alt + C].',
    preconditions: [
      'Professor autenticado na plataforma.',
      'Turma previamente selecionada e alunos ativos cadastrados no ano letivo.',
      'Data letiva válida no calendário escolar.'
    ],
    mainFlow: [
      '1. O sistema carrega a lista com fotos e nomes dos alunos pré-marcados como "Presentes" por padrão.',
      '2. O professor toca na foto ou nome do aluno para alterar o estado para "Falta", "Justificada" ou "Atraso".',
      '3. O contador de tempo no topo exibe os segundos decorridos com barra de progresso verde.',
      '4. O professor clica no botão "Salvar Chamada (15s)".',
      '5. O sistema grava os registros no IndexedDB local e atualiza a contagem do diário.',
      '6. É exibido um Toast verde: "Chamada concluída com sucesso! 26 alunos presentes."'
    ],
    alternativeFlows: [
      {
        scenario: 'Chamada Por Exceção (Apenas Faltas)',
        steps: [
          '1. O professor ativa a chave "Modo Apenas Ausentes".',
          '2. O professor digita apenas os números de chamada dos alunos ausentes (ex: 4, 12, 19).',
          '3. O sistema marca os números informados como "Falta" e todos os demais como "Presentes".'
        ]
      },
      {
        scenario: 'Edição de Chamada Passada',
        steps: [
          '1. O professor seleciona a data no minicalendário de chamadas anteriores.',
          '2. O sistema exibe o diário daquele dia em modo "Leitura".',
          '3. O professor clica em "Retificar Presença", insere a justificativa e salva.'
        ]
      }
    ],
    exceptions: [
      {
        cause: 'Dispositivo sem internet no momento do salvamento.',
        handling: 'O sistema grava localmente no IndexedDB via PWA e altera a pílula de rede para "Salvo Offline (Sincronização pendente)". Zero perda de dados.'
      },
      {
        cause: 'Tentativa de salvar chamada em dia não letivo (Ex: Domingo ou Feriado).',
        handling: 'O sistema exibe modal de alerta informando a regra escolar e solicita confirmação explícita com justificativa de aula de reposição.'
      }
    ],
    businessRules: [
      'RN-CHA-01: Aluno sem registro explícito até às 23:59 da data assume estado pré-definido pelo regulamento municipal.',
      'RN-CHA-02: Retificação de chamada após 48h exige justificativa registrada com carimbo de data/hora.',
      'RN-CHA-03: Aluno com 3 faltas consecutivas sem justificativa aciona automaticamente a flag de "Alerta de Evasão/Conselho Tutelar".'
    ],
    requiredValidations: [
      'Data não pode ser futura.',
      'Total de presentes + ausentes + justificados deve ser exatamente igual ao total de alunos matriculados ativos.',
      'Usuário deve ser o professor regente titular ou substituto homologado.'
    ],
    integrations: [
      'MOD-02 (Diário Automático) — Atualiza a porcentagem de frequência diária no registro diário.',
      'MOD-05 (Central PDI) — Notifica sobre ausência de aluno com acompanhamento especial de PDI.'
    ],
    permissions: [
      { role: 'Professor Regente', access: 'Criar, Visualizar, Editar (até 48h).' },
      { role: 'Coordenador Pedagógico', access: 'Visualizar tudo, Autorizar retificação tardia.' },
      { role: 'Administrador de Rede', access: 'Visualizar relatórios agregados de frequência.' }
    ],
    domainEvents: [
      'AttendanceTakenDomainEvent',
      'StudentAbsenceAlertTriggeredDomainEvent',
      'OfflineAttendanceSyncedDomainEvent'
    ],
    uiStates: [
      'Loading (Skeleton da lista de alunos)',
      'Ready (Lista interativa com timer)',
      'Saving (Botão com spinner)',
      'Offline (Pílula amarela de salvamento local)',
      'Success (Toast verde + som suave)'
    ],
    userMessages: [
      { context: 'Sucesso', message: 'Chamada salva com sucesso em 11 segundos! 25 presentes, 2 ausentes.' },
      { context: 'Offline', message: 'Sem internet. Sua chamada foi salva com segurança no celular e será sincronizada assim que a rede voltar.' },
      { context: 'Retificação', message: 'Atenção: Você está alterando o diário de frequência de 5 dias atrás.' }
    ],
    offlineSyncBehavior: 'Persistência imediata via PWA Service Worker + IndexedDB store "attendance_records". Sync automático via Background Sync API quando a conexão reestabelecer.',
    performanceReqs: 'Tempo de resposta da interface ao toque < 50ms. Processamento local da lista inteira em < 200ms.',
    accessibilityReqs: 'Teclas de atalho para alternar faltas (Tab para navegar, Barra de Espaço para mudar estado, Alt+S para salvar). Contraste mínimo de 4.5:1 nas fotos/badges.',
    acceptanceCriteria: [
      'O professor deve conseguir concluir a chamada de uma turma de 30 alunos em menos de 15 segundos.',
      'O salvamento em modo avião (offline) não pode congelar a tela nem perder nenhum dado.',
      'O sistema deve recalcular instantaneamente a média de presença percentual do mês da turma.'
    ]
  },
  {
    id: 'mod-2',
    code: 'MOD-02',
    name: 'Diário de Classe & Registro Automático de Aulas',
    objective: 'Consolidar em um único fluxo o registro dos conteúdos ministrados, tarefas de casa e observações pedagógicas com autopreenchimento preditivo.',
    triggers: 'Professor clica em "Registrar Aula de Hoje" após a chamada ou selecione o diário no Cockpit.',
    preconditions: [
      'Chamada de presença da aula realizada ou iniciada.',
      'Plano de aula vinculado cadastrado para o dia (opcional).'
    ],
    mainFlow: [
      '1. O sistema pré-carrega os dados da chamada (frequência) e a sugestão de conteúdo com base no Plano BNCC do dia.',
      '2. O professor revisa o resumo gerado e ajusta o texto do conteúdo ministrado se necessário.',
      '3. O professor adiciona notas rápidas de comportamento ou lição de casa.',
      '4. O professor clica em "Concluir Registro do Diário".',
      '5. O sistema assina digitalmente o diário com carimbo de data, hora e ID do docente e gera o PDF espelho.'
    ],
    alternativeFlows: [
      {
        scenario: 'Registro em Lote (Sexta-feira)',
        steps: [
          '1. O professor seleciona a opção "Registrar Semana Completa".',
          '2. O sistema apresenta a grade dos 5 dias letivos com sugestões pré-preenchidas pela IA.',
          '3. O professor faz ajustes rápidos em 1 clique e confirma a semana inteira.'
        ]
      }
    ],
    exceptions: [
      {
        cause: 'Falta de conteúdo ministrado obrigatório segundo a diretriz municipal.',
        handling: 'O sistema sinaliza o campo com borda amarela amigável informando a diretriz de preenchimento mínimo de 20 caracteres.'
      }
    ],
    businessRules: [
      'RN-DIA-01: O diário de classe é um documento público e não pode sofrer sobrescrita sem rastro de auditoria.',
      'RN-DIA-02: Toda aula registrada gera vinculo automático com as habilidades BNCC selecionadas no plano.'
    ],
    requiredValidations: [
      'Texto do conteúdo ministrado >= 10 caracteres.',
      'Pelo menos 1 componente curricular associado.'
    ],
    integrations: [
      'MOD-01 (Chamada) — Importa a lista de faltosos.',
      'MOD-03 (Gerador BNCC) — Copia as competências do plano para o diário em 1 clique.',
      'MOD-07 (Exportador PDF) — Disponibiliza os registros para o Diário Oficial em PDF.'
    ],
    permissions: [
      { role: 'Professor Regente', access: 'Total (Criar, Editar, Visualizar).' },
      { role: 'Coordenador', access: 'Homologar diários e emitir resumos.' }
    ],
    domainEvents: ['ClassJournalEntryCreatedDomainEvent', 'ClassJournalSignedDomainEvent'],
    uiStates: ['Draft', 'AutoSaved', 'Signed', 'ExportedPDF'],
    userMessages: [
      { context: 'Autosave', message: 'Rascunho do diário salvo automaticamente às 10:14.' },
      { context: 'Conclusão', message: 'Diário de classe registrado com sucesso!' }
    ],
    offlineSyncBehavior: 'Sincronização em lote das entradas do diário salvas no IndexedDB ao retomar sinal de internet.',
    performanceReqs: 'Autosave local a cada 5 segundos de digitação sem causar travamento na interface.',
    accessibilityReqs: 'Leitor de tela deve anunciar "Rascunho do diário salvo" via aria-live="polite".',
    acceptanceCriteria: [
      'Autopreenchimento a partir do plano BNCC reduz a digitação do professor a menos de 1 minuto por aula.',
      'Gerar rastro de auditoria imutável de quem registrou e quando.'
    ]
  },
  {
    id: 'mod-3',
    code: 'MOD-03',
    name: 'Gerador Inteligente de Planos de Aula BNCC',
    objective: 'Criar planos de aula completos e alinhados à BNCC (código, objetivo, metodologia, recursos e avaliação) em menos de 1 minuto via Copiloto Aurora.',
    triggers: 'Professor clica em "Criar Novo Plano de Aula com IA" ou acessa o módulo de Planejamento.',
    preconditions: [
      'Ano do Ensino Fundamental I (1º ao 5º ano) selecionado.',
      'Componente curricular definido (ex: Língua Portuguesa, Matemática, Ciências).'
    ],
    mainFlow: [
      '1. O professor seleciona a turma e a habilidade BNCC desejada (ex: EF01LP08).',
      '2. O professor escolhe a duração da aula (ex: 50 min ou 2 aulas de 50 min).',
      '3. O professor clica no botão "Gerar Rascunho do Plano com IA Aurora".',
      '4. O copiloto gera o plano dividido em Introdução (10 min), Desenvolvimento (30 min) e Conclusão (10 min).',
      '5. O professor revisa, personaliza qualquer trecho e clica em "Aprovar e Salvar no Calendário".'
    ],
    alternativeFlows: [
      {
        scenario: 'Ajuste de Nível Inclusivo (Adaptação PDI)',
        steps: [
          '1. O professor clica na opção "Adaptar para Aluno com Neurodiversidade (PDI)".',
          '2. O Copiloto adiciona sugestões de recursos táticos e visuais específicos para TDAH/TEA.'
        ]
      }
    ],
    exceptions: [
      {
        cause: 'Indisponibilidade temporária de serviço de IA Gemini / Aurora.',
        handling: 'O sistema altera suavemente para o modo "Banco de Modelos Prontos da BNCC" em cache local, permitindo ao professor utilizar um modelo pré-aprovado sem interrupções.'
      }
    ],
    businessRules: [
      'RN-PLA-01: O plano gerado é SEMPRE um rascunho. Ele só passa a valer após aprovação humana explícita do professor (Princípio de Ouro #1).',
      'RN-PLA-02: O plano aprovado alimenta automaticamente o diário de classe da data agendada.'
    ],
    requiredValidations: [
      'Pelo menos 1 código de habilidade BNCC vinculado.',
      'Validação de duração total em minutos condizente com a grade horária.'
    ],
    integrations: [
      'MOD-02 (Diário de Classe) — Fornece dados para o registro diário.',
      'MOD-04 (Copiloto Pareceres) — Registra evidências pedagógicas trabalhadas.'
    ],
    permissions: [
      { role: 'Professor Regente', access: 'Criar, Gerar, Modificar, Excluir.' },
      { role: 'Coordenador', access: 'Visualizar e sugerir comentários.' }
    ],
    domainEvents: ['LessonPlanGeneratedByAiDomainEvent', 'LessonPlanApprovedByTeacherDomainEvent'],
    uiStates: ['PromptInput', 'AiGenerating (Pulse Amber)', 'DraftReview', 'Approved'],
    userMessages: [
      { context: 'Geração', message: 'Aurora: Preparei uma sugestão de plano focada na habilidade EF01LP08. Fique à vontade para ajustar!' },
      { context: 'Aprovação', message: 'Plano aprovado e agendado para Terça-feira, 14 de Março.' }
    ],
    offlineSyncBehavior: 'Carregamento offline de toda a matriz da BNCC (1º ao 5º ano) para seleção manual de habilidades sem internet.',
    performanceReqs: 'Geração de rascunho pela IA em stream contínuo com tempo total < 5 segundos.',
    accessibilityReqs: 'Navegação por abas nas etapas do plano (Introdução, Desenvolvimento, Avaliação) com leitores de tela.',
    acceptanceCriteria: [
      'Geração de plano completo em menos de 10 segundos com a IA.',
      'Garantia de 100% de precisão nos códigos e descrições oficiais da BNCC.'
    ]
  },
  {
    id: 'mod-4',
    code: 'MOD-04',
    name: 'Copiloto de Pareceres Descritivos Individuais',
    objective: 'Sintetizar em 3 cliques relatórios e pareceres pedagógicos bimestrais humanizados e fundamentados na BNCC, economizando até 10 horas de digitação no final do bimestre.',
    triggers: 'Professor acessa a aba "Pareceres Bimestrais" no encerramento de ciclo.',
    preconditions: [
      'Aluno matriculado na turma com dados de frequência acumulados no bimestre.',
      'Observações diárias ou planos de aula registrados ao longo do período.'
    ],
    mainFlow: [
      '1. O professor seleciona o aluno e o bimestre de avaliação.',
      '2. O sistema exibe o resumo de frequência, entregas de atividades e notas rápidas do período.',
      '3. O professor seleciona o tom do parecer (ex: Encorajador, Focado no Desenvolvimento Avançado, Necessita Apoio Fonológico).',
      '4. O professor clica em "Sintetizar Parecer com IA Aurora".',
      '5. O copiloto constrói o texto em 3 parágrafos (Evolução Cognitiva, Socioemocional e Recomendações para a Família).',
      '6. O professor revisa o texto na tela Split View (Rascunho + Evidências do Aluno) e clica em "Homologar Parecer".'
    ],
    alternativeFlows: [
      {
        scenario: 'Edição de Trecho Específico por Voz ou Texto',
        steps: [
          '1. O professor seleciona um parágrafo e clica em "Reescrever para ficar mais suave".',
          '2. O Copiloto apresenta 2 opções alternativas de redação.'
        ]
      }
    ],
    exceptions: [
      {
        cause: 'Poucas evidências registradas para o estudante no bimestre.',
        handling: 'O sistema alerta o professor informando que a IA usará as diretrizes genéricas da BNCC para o ano e solicita 1 ou 2 palavras-chave sobre o aluno.'
      }
    ],
    businessRules: [
      'RN-PAR-01: Proibido o uso de palavras pejorativas ou estigmatizantes na geração automática de pareceres.',
      'RN-PAR-02: Todo parecer deve citar pelo menos 2 avanços do estudante e 1 meta de aprendizado para o próximo bimestre.'
    ],
    requiredValidations: [
      'Texto final do parecer deve ter entre 300 e 2000 caracteres.',
      'Aprovação final obrigatória marcada pelo professor regente.'
    ],
    integrations: [
      'MOD-01 (Chamada) — Importa % de frequência do bimestre.',
      'MOD-05 (PDI) — Importa metas do Plano de Desenvolvimento Individual se o aluno possuir PDI.',
      'MOD-07 (PDF) — Formata o parecer no layout oficial da escola para impressão.'
    ],
    permissions: [
      { role: 'Professor Regente', access: 'Criar, Editar, Finalizar.' },
      { role: 'Coordenador', access: 'Revisar, Aprovar, Devolver com comentários.' }
    ],
    domainEvents: ['DescriptiveReportDraftedDomainEvent', 'DescriptiveReportFinalizedDomainEvent'],
    uiStates: ['StudentSelection', 'GeneratingText', 'SplitViewReview', 'FinalizedLocked'],
    userMessages: [
      { context: 'Síntese', message: 'Parecer do estudante João Silva sintetizado com base em 14 evidências registradas no bimestre.' },
      { context: 'Sucesso', message: 'Parecer assinado e pronto para envio à coordenação!' }
    ],
    offlineSyncBehavior: 'Armazenamento de rascunhos no banco local. Envio para a nuvem sincronizado em segundo plano.',
    performanceReqs: 'Tempo de síntese de parecer por aluno < 4 segundos.',
    accessibilityReqs: 'Interface Split View acessível via teclas de atalho [Alt + 1] para painel esquerdo e [Alt + 2] para painel direito.',
    acceptanceCriteria: [
      'Redução comprovada do tempo de escrita de parecer de 45 min para menos de 3 min por aluno.',
      'Garantia de 100% de alinhamento ao tom acolhedor e pedagógico exigido pela escola.'
    ]
  },
  {
    id: 'mod-5',
    code: 'MOD-05',
    name: 'Central PDI & Inclusão de Neurodiversidades',
    objective: 'Garantir o acompanhamento individualizado de alunos com deficiência, TDAH, TEA, altas habilidades ou PDI (Plano de Desenvolvimento Individualizado), facilitando a adaptação de atividades.',
    triggers: 'Professor seleciona o badge de inclusão no perfil do aluno ou acessa o menu "Educação Inclusiva".',
    preconditions: [
      'Aluno cadastrado na turma com laudo ou indicação de PDI em acompanhamento.'
    ],
    mainFlow: [
      '1. O professor visualiza o mapa visual de acomodações do aluno (ex: Recursos visuais, tempo estendido, pausa sensorial).',
      '2. Ao criar um plano de aula ou atividade, o sistema destaca automaticamente os alertas de adaptação necessários.',
      '3. O professor clica em "Sugerir Atividade Adaptada para TEA/TDAH" com base no tema da aula.',
      '4. A IA Aurora adapta o enunciado e a estrutura da atividade.',
      '5. O professor salva a adaptação no diário de bordo do PDI do estudante.'
    ],
    alternativeFlows: [
      {
        scenario: 'Registro de Acompanhamento Multidisciplinar',
        steps: [
          '1. O professor registra notas de evolução compartilhadas com o AEE (Atendimento Educacional Especializado).',
          '2. O sistema notifica o profissional de AEE para validação conjunta.'
        ]
      }
    ],
    exceptions: [
      {
        cause: 'Laudo técnico em sigilo de dados segundo a LGPD.',
        handling: 'O sistema oculta termos médicos confidenciais exibindo apenas as diretrizes táticas pedagógicas necessárias em sala de aula.'
      }
    ],
    businessRules: [
      'RN-PDI-01: Dados de saúde e laudos são protegidos por criptografia de ponta a ponta e controle estrito de acesso.',
      'RN-PDI-02: Nenhuma atividade adaptada pode ser atribuída sem o conhecimento prévio do professor regente.'
    ],
    requiredValidations: [
      'Confirmação de sigilo ao acessar laudos sensíveis.',
      'Vínculo com pelo menos 1 objetivo do PDI do aluno.'
    ],
    integrations: [
      'MOD-03 (Gerador BNCC) — Insere adaptações no plano de aula.',
      'MOD-04 (Pareceres) — Preenche a seção inclusiva do parecer do estudante.'
    ],
    permissions: [
      { role: 'Professor Regente', access: 'Visualizar acomodações e registrar evolução.' },
      { role: 'Especialista AEE', access: 'Editar PDI completo e laudos.' }
    ],
    domainEvents: ['PdiAccommodationUpdatedDomainEvent', 'InclusiveActivityAdaptedDomainEvent'],
    uiStates: ['PdiDashboard', 'AdaptingActivity', 'AeeNoteSaved'],
    userMessages: [
      { context: 'Adaptação', message: 'Atividade adaptada com foco em apoio visual e redução de estímulos para o aluno Lucas.' }
    ],
    offlineSyncBehavior: 'Funcionamento offline completo das diretrizes de acomodação salvas em cache local.',
    performanceReqs: 'Acesso instantâneo (< 100ms) às fichas de acomodação durante a aula.',
    accessibilityReqs: 'Apoio total a leitores de tela e contraste elevado para visualização rápida no celular.',
    acceptanceCriteria: [
      'Garantir que nenhum aluno com PDI fique sem a devida adaptação de atividade nas aulas registradas.',
      'Cumprimento rigoroso da LGPD para dados sensíveis de saúde do estudante.'
    ]
  },
  {
    id: 'mod-6',
    code: 'MOD-06',
    name: 'Cockpit "Antes da Aula" & Painel do Professor',
    objective: 'Oferecer um centro de comando matinal único onde o professor visualiza em 10 segundos tudo o que precisa para o dia (aulas, chamadas pendentes, aniversariantes e lembretes).',
    triggers: 'Abertura do aplicativo EducaFlow ao iniciar o dia de trabalho.',
    preconditions: ['Usuário autenticado no aplicativo.'],
    mainFlow: [
      '1. O sistema saúda o professor com uma mensagem acolhedora baseada no horário do dia.',
      '2. O painel exibe os 3 cards do dia: "Proxima Aula", "Chamada de Hoje (0/4 turmas)" e "Pendências Rápidas".',
      '3. O professor clica no card "Iniciar Aula do 3º B" e o sistema abre o modo focado de sala de aula.',
      '4. O cronômetro de apoio exibe os horários de início e término dos períodos.'
    ],
    alternativeFlows: [
      {
        scenario: 'Troca Rápida de Turma no Meio do Dia',
        steps: [
          '1. O professor clica no seletor de turmas no topo do Cockpit.',
          '2. O sistema altera todo o contexto para a nova turma em menos de 100ms.'
        ]
      }
    ],
    exceptions: [
      {
        cause: 'Professor sem aulas agendadas para a data (Ex: Dia de planejamento/HTPC).',
        handling: 'O Cockpit altera seu modo para "Dia de Planejamento & HTPC", destacando os geradores de plano e pareceres em vez da chamada.'
      }
    ],
    businessRules: [
      'RN-COC-01: O Cockpit DEVE carregar em menos de 1 segundo mesmo com internet fraca.',
      'RN-COC-02: Zero pop-ups de cobrança ou prazos em vermelho piscante (Princípio de Ouro #5).'
    ],
    requiredValidations: ['Contexto de turma ativa sempre válido.'],
    integrations: [
      'Todos os módulos MVP conectam-se ao Cockpit como atalhos diretos.'
    ],
    permissions: [
      { role: 'Todos os Usuários', access: 'Visualização do seu próprio Cockpit personalizado.' }
    ],
    domainEvents: ['TeacherCockpitLoadedDomainEvent'],
    uiStates: ['MorningGreeting', 'FocusedClassMode', 'PlanningDayMode'],
    userMessages: [
      { context: 'Saudação', message: 'Bom dia, Professora Ana! Suas 4 aulas de hoje já estão organizadas. Desejamos um ótimo dia!' }
    ],
    offlineSyncBehavior: 'Carregamento instantâneo a partir do cache local da PWA.',
    performanceReqs: 'First Contentful Paint (FCP) < 800ms em redes 3G.',
    accessibilityReqs: 'Atalhos globais de teclado: [Alt + 1] Chamada, [Alt + 2] Diário, [Alt + 3] Plano.',
    acceptanceCriteria: [
      'Visão 360º do dia do professor carregada em 1 tela sem necessidade de rolagem excessiva.',
      'Acesso a qualquer tarefa principal em no máximo 1 clique a partir do Cockpit.'
    ]
  },
  {
    id: 'mod-7',
    code: 'MOD-07',
    name: 'Exportador Oficial para Diário de Classe & PDF',
    objective: 'Gerar relatórios de frequência, diários digitais e pareceres formatados no padrão oficial do Diário Oficial / Secretaria Municipal de Educação em 1 clique.',
    triggers: 'Professor ou Coordenador clica em "Emitir PDF Oficial" no menu de relatórios.',
    preconditions: ['Diários e chamadas do período desejado devidamente finalizados.'],
    mainFlow: [
      '1. O usuário seleciona o tipo de documento (Diário de Classe Mensal, Relatório de Frequência, Pareceres Bimestrais).',
      '2. O usuário escolhe o formato de cabeçalho da escola/secretaria.',
      '3. O sistema compila os dados e gera a visualização prévia (Print Preview) otimizada para folha A4.',
      '4. O usuário clica em "Baixar PDF Oficial" ou "Enviar para Impressão".'
    ],
    alternativeFlows: [
      {
        scenario: 'Exportação em Lote de Pareceres da Turma Inteira (30 Alunos)',
        steps: [
          '1. O usuário clica em "Baixar Caderno Completo de Pareceres (PDF Único)".',
          '2. O sistema gera um único arquivo PDF com índice e sumário organizados por aluno.'
        ]
      }
    ],
    exceptions: [
      {
        cause: 'Diário incompleto na turma no período solicitado.',
        handling: 'O sistema avisa quais datas estão sem diário registrado e oferece opção de "Gerar com marca d\'água de Rascunho" ou completar as pendências.'
      }
    ],
    businessRules: [
      'RN-EXP-01: O PDF gerado deve conter hash SHA-256 de verificação de autenticidade no rodapé.',
      'RN-EXP-02: O layout impresso deve economizar tinta de impressora (fundo branco puro sem preenchimentos escuros desnecessários).'
    ],
    requiredValidations: ['Validação da assinatura do professor antes da emissão definitiva.'],
    integrations: [
      'MOD-01, MOD-02, MOD-04 — Fonte de dados para compilação.'
    ],
    permissions: [
      { role: 'Professor Regente', access: 'Gerar PDF dos seus diários e turmas.' },
      { role: 'Coordenador / Diretor', access: 'Gerar relatórios consolidados de todas as turmas da escola.' }
    ],
    domainEvents: ['OfficialPdfReportExportedDomainEvent'],
    uiStates: ['ReportSelection', 'PdfRendering', 'PreviewReady'],
    userMessages: [
      { context: 'Geração', message: 'Gerando PDF oficial do Diário de Classe com 28 páginas. Aguarde um instante...' }
    ],
    offlineSyncBehavior: 'Geração de PDF realizada 100% no cliente via biblioteca JS (pdfmake/jspdf) sem depender do servidor.',
    performanceReqs: 'Compilação de PDF de 30 pareceres em menos de 3 segundos.',
    accessibilityReqs: 'Os PDFs gerados devem ser estruturados e marcados para leitura por leitores de tela de órgãos de fiscalização.',
    acceptanceCriteria: [
      'Formatos impressos rigorosamente compatíveis com os padrões exigidos pelas Secretarias de Educação.',
      'Geração local do PDF funcionando perfeitamente sem conexão de internet.'
    ]
  }
];

export const DDD_BOUNDED_CONTEXTS: DddBoundedContext[] = [
  {
    contextName: '1. Contexto de Frequência & Presença (Attendance Bounded Context)',
    description: 'Responsável pelo gerenciamento do calendário escolar, controle rígido de presença diária, faltas justificadas, retificações e alertas de evasão.',
    aggregates: [
      {
        aggregateRoot: 'ClassAttendanceSession (Sessão de Chamada da Turma)',
        description: 'Representa o evento imutável do diário de frequência para um dia letivo e turma específica.',
        entities: [
          {
            name: 'AttendanceRecord (Registro de Aluno)',
            keyAttributes: ['id: UUID', 'studentId: StudentId', 'status: AttendanceStatusEnum', 'justificationText: String', 'recordedAt: Timestamp'],
            lifecycle: 'Draft -> SavedLocally -> SyncedToCloud -> LockedAfter48h'
          }
        ],
        valueObjects: [
          { name: 'AttendanceDate', attributes: ['date: Date', 'isSchoolDay: Boolean'] },
          { name: 'AttendanceMetrics', attributes: ['totalEnrolled: Int', 'presentCount: Int', 'absentCount: Int', 'presencePercentage: Float'] }
        ],
        invariants: [
          'A contagem total de registros deve ser exatamente igual ao número de estudantes ativos na turma no momento do registro.',
          'Um registro de chamada após 48 horas exige um operador com perfil de Coordenador.'
        ]
      }
    ]
  },
  {
    contextName: '2. Contexto Pedagógico & Registro de Aula (Pedagogical Bounded Context)',
    description: 'Cuida da estruturação do plano de ensino, alinhamento à matriz da BNCC, diário de classe e conteúdos ministrados.',
    aggregates: [
      {
        aggregateRoot: 'LessonPlanAggregate (Agregado de Plano de Aula)',
        description: 'Representa o roteiro didático planejado e aprovado para execução pedagógica.',
        entities: [
          {
            name: 'BnccCompetencyRef (Referência BNCC)',
            keyAttributes: ['code: String (ex: EF01LP08)', 'description: String', 'targetGrade: GradeEnum'],
            lifecycle: 'ActiveInMatrix -> SelectedForLesson'
          },
          {
            name: 'LessonStep (Etapa da Aula)',
            keyAttributes: ['stepName: String', 'durationMinutes: Int', 'methodologyText: String', 'resourcesNeeded: String[]'],
            lifecycle: 'DraftedByAi -> ModifiedByTeacher'
          }
        ],
        valueObjects: [
          { name: 'TeacherApprovalSignature', attributes: ['teacherId: UUID', 'approvedAt: Timestamp', 'humanOverrideApplied: Boolean'] }
        ],
        invariants: [
          'Todo plano de aula aprovado DEVE conter ao menos um código oficial da BNCC válido.',
          'Nenhum plano de aula pode ser publicado sem a TeacherApprovalSignature vinculada.'
        ]
      },
      {
        aggregateRoot: 'ClassJournalAggregate (Diário de Classe)',
        description: 'O diário oficial de registro dos conteúdos ministrados na turma.',
        entities: [
          {
            name: 'JournalEntry (Entrada do Diário)',
            keyAttributes: ['id: UUID', 'classId: ClassId', 'subjectText: String', 'homeworkAssigned: String', 'signedAt: Timestamp'],
            lifecycle: 'Created -> Signed -> EncryptedForArchive'
          }
        ],
        valueObjects: [
          { name: 'AuditStamp', attributes: ['authorId: UUID', 'ipAddress: String', 'clientVersion: String'] }
        ],
        invariants: [
          'Uma JournalEntry assinada é imutável; correções são inseridas como adendos com audit stamp.'
        ]
      }
    ]
  },
  {
    contextName: '3. Contexto de Avaliação & Pareceres (Assessment Bounded Context)',
    description: 'Gerencia o histórico de aprendizado do aluno, geração e síntese de pareceres descritivos e cadernos de avaliação.',
    aggregates: [
      {
        aggregateRoot: 'StudentDescriptiveReportAggregate (Parecer Descritivo do Aluno)',
        description: 'Compilação dos relatórios individuais de evolução pedagógica do estudante.',
        entities: [
          {
            name: 'ReportParagraph (Parágrafo do Parecer)',
            keyAttributes: ['id: UUID', 'category: ParagraphCategoryEnum (Cognitivo, Socioemocional, Metas)', 'content: Text'],
            lifecycle: 'AiDrafted -> TeacherEdited -> Finalized'
          }
        ],
        valueObjects: [
          { name: 'AcademicPeriod', attributes: ['year: Int', 'bimonthlyPeriod: Int (1 a 4)'] },
          { name: 'ReportTone', attributes: ['toneName: String', 'styleGuideline: String'] }
        ],
        invariants: [
          'O parecer finalizado deve ter entre 300 e 2000 caracteres e conter parágrafos de aspecto cognitivo e socioemocional.'
        ]
      }
    ]
  },
  {
    contextName: '4. Contexto de Educação Inclusiva & PDI (Inclusive Education Bounded Context)',
    description: 'Controla os Planos de Desenvolvimento Individualizado (PDI), laudos pedagógicos e sugestões de adaptação para neurodiversidades.',
    aggregates: [
      {
        aggregateRoot: 'StudentPdiAggregate (Plano PDI do Aluno)',
        description: 'Documento contínuo de suporte a estudantes com TDAH, TEA, altas habilidades ou deficiências.',
        entities: [
          {
            name: 'PedagogicalAccommodation (Acomodação Pedagógica)',
            keyAttributes: ['id: UUID', 'type: AccommodationTypeEnum', 'description: String', 'isActive: Boolean'],
            lifecycle: 'ProposedByAee -> ApprovedByTeacher -> AppliedInClass'
          }
        ],
        valueObjects: [
          { name: 'LgpdProtectionLevel', attributes: ['isSensitiveData: Boolean', 'encryptionKeyId: String'] }
        ],
        invariants: [
          'Dados com LgpdProtectionLevel ativado são acessíveis apenas por usuários com a role AEE ou Professor Regente da turma.'
        ]
      }
    ]
  },
  {
    contextName: '5. Contexto do Copiloto IA Aurora (AI Engine Bounded Context)',
    description: 'Serviço isolado que processa prompts, orquestra chamadas com o SDK @google/genai (Gemini 2.5/3.6) e garante guardrails de soberania humana.',
    aggregates: [
      {
        aggregateRoot: 'AiInteractionSession (Sessão de Copiloto Aurora)',
        description: 'Rastreamento auditável de todas as sugestões geradas pela inteligência artificial.',
        entities: [
          {
            name: 'AiPromptResponse (Par Prompt/Resposta)',
            keyAttributes: ['promptHash: String', 'rawResponseText: String', 'latencyMs: Int', 'modelAlias: String'],
            lifecycle: 'Generated -> PresentedToUser -> Accepted / Rejected'
          }
        ],
        valueObjects: [
          { name: 'AiSafetyGuardrail', attributes: ['preventAutonomousPosting: Boolean (True)', 'bnccAlignmentVerified: Boolean'] }
        ],
        invariants: [
          'Nenhuma saída da IA pode ser gravada diretamente no banco de produção sem a aprovação explícita do professor.'
        ]
      }
    ]
  }
];

export const FUNCTIONAL_DEPENDENCY_MATRIX: ImplementationDependencyNode[] = [
  {
    stepOrder: 1,
    moduleCode: 'LAYER-1.1',
    moduleName: 'Esquema de Banco de Dados Supabase / PostgreSQL & Autenticação',
    tier: 'Layer 1: Core Foundation & DB',
    prerequisites: ['Projeto Supabase / Cloud SQL provisionado'],
    supabaseTables: ['schools', 'teachers', 'classes', 'students', 'enrollments'],
    vscodePath: '/src/db/schema.ts & /src/lib/supabaseClient.ts',
    riskMitigation: 'Criar índices de busca composta em (class_id, student_id) para garantir buscas em < 10ms.'
  },
  {
    stepOrder: 2,
    moduleCode: 'MOD-01',
    moduleName: 'Módulo de Chamada Ultrarrápida (15s) & Storage Local IndexedDB',
    tier: 'Layer 2: Engine & Local Storage',
    prerequisites: ['LAYER-1.1 (Estudantes e Turmas)'],
    supabaseTables: ['attendance_sessions', 'attendance_records'],
    vscodePath: '/src/modules/attendance/AttendanceContainer.tsx & /src/lib/offlineStore.ts',
    riskMitigation: 'Testar salvamento em modo avião no PWA com fila de sincronização em IndexedDB antes da conexão com nuvem.'
  },
  {
    stepOrder: 3,
    moduleCode: 'MOD-02',
    moduleName: 'Diário de Classe & Registro de Conteúdo Ministrado',
    tier: 'Layer 2: Engine & Local Storage',
    prerequisites: ['MOD-01 (Módulo de Chamada)'],
    supabaseTables: ['class_journals', 'journal_entries'],
    vscodePath: '/src/modules/journal/ClassJournalView.tsx',
    riskMitigation: 'Implementar debounce no autosave local de 3000ms para evitar estouro de re-renderização em React.'
  },
  {
    stepOrder: 4,
    moduleCode: 'MOD-03',
    moduleName: 'Gerador Inteligente de Planos BNCC com IA Aurora',
    tier: 'Layer 3: AI Copilot & Workflows',
    prerequisites: ['LAYER-1.1 (Matriz BNCC)', 'Serviço backend Gemini Proxy'],
    supabaseTables: ['bncc_matrix', 'lesson_plans'],
    vscodePath: '/src/modules/ai_copilot/LessonPlanGenerator.tsx & /server/geminiService.ts',
    riskMitigation: 'Fazer cache local do JSON estático da matriz da BNCC do 1º ao 5º ano para permitir seleção sem internet.'
  },
  {
    stepOrder: 5,
    moduleCode: 'MOD-05',
    moduleName: 'Central PDI & Acomodações de Inclusão',
    tier: 'Layer 2: Engine & Local Storage',
    prerequisites: ['LAYER-1.1 (Estudantes)'],
    supabaseTables: ['student_pdis', 'pdi_accommodations'],
    vscodePath: '/src/modules/inclusive/PdiCentralView.tsx',
    riskMitigation: 'Aplicar criptografia no nível de coluna para campos de observação médica de PDI.'
  },
  {
    stepOrder: 6,
    moduleCode: 'MOD-04',
    moduleName: 'Copiloto de Pareceres Descritivos Bimestrais',
    tier: 'Layer 3: AI Copilot & Workflows',
    prerequisites: ['MOD-01', 'MOD-02', 'MOD-03', 'MOD-05'],
    supabaseTables: ['descriptive_reports'],
    vscodePath: '/src/modules/reports/DescriptiveReportCopilot.tsx',
    riskMitigation: 'Criar componente Split View com atalhos de teclado para acelerar a revisão do texto do parecer.'
  },
  {
    stepOrder: 7,
    moduleCode: 'MOD-06',
    moduleName: 'Cockpit "Antes da Aula" & Painel Unificado do Professor',
    tier: 'Layer 3: AI Copilot & Workflows',
    prerequisites: ['MOD-01 até MOD-05 prontos'],
    supabaseTables: ['teacher_preferences', 'class_schedules'],
    vscodePath: '/src/modules/cockpit/TeacherCockpitView.tsx',
    riskMitigation: 'Usar React Context / Zustand para compartilhar o estado da turma ativa entre todos os módulos.'
  },
  {
    stepOrder: 8,
    moduleCode: 'MOD-07',
    moduleName: 'Exportador Oficial para Diário de Classe & PDF A4',
    tier: 'Layer 4: Analytics & Exports',
    prerequisites: ['Todos os módulos do MVP finalizados'],
    supabaseTables: ['export_audit_logs'],
    vscodePath: '/src/modules/export/OfficialPdfExporter.ts',
    riskMitigation: 'Renderizar PDFs no lado do cliente com pdfmake / jspdf sem sobrecarregar o servidor backend.'
  }
];

export const TECHNICAL_ENGINEERING_SUMMARY = {
  architectureStyle: 'Modular Monolith (Front-end SPA PWA + Express/Node Gemini Proxy + Supabase/PostgreSQL)',
  dddPrinciplesApplied: 'Bounded Contexts bem delimitados, Agregados imutáveis, Eventos de Domínio desacoplados.',
  targetPerformance: 'PWA auditado com Google Lighthouse 100/100 em Desempenho e Acessibilidade.',
  readinessVerdict: 'A Especificação Funcional v1.0 e o Modelo de Domínio DDD estão totalmente validados e aprovados para codificação imediata no VS Code.'
};
