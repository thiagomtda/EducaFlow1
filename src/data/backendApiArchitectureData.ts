import { 
  DatabaseTableSpec, 
  RlsPolicySpec, 
  ApiEndpointSpec, 
  SyncFlowSpec, 
  StorageBucketSpec, 
  WebhookEventSpec, 
  NfrRequirementSpec, 
  TechnicalAcceptanceCriteria 
} from '../types';

// === 1. OVERALL BACKEND ARCHITECTURE & SUPABASE STACK ===

export const BACKEND_ARCHITECTURE_OVERVIEW = {
  architecturePattern: 'Serverless Modular Monolith with Supabase PostgreSQL Engine & Edge Micro-Services',
  coreComponents: [
    {
      name: 'Database Engine (PostgreSQL 16)',
      tech: 'Supabase Managed PostgreSQL',
      role: 'Motor relacional central, armazenamento de dados do diário, planos, pareceres e histórico de auditoria imutável.'
    },
    {
      name: 'Auto-Generated REST API Layer',
      tech: 'PostgREST v12',
      role: 'Exposição instantânea e ultra-performática de tabelas relacionais com filtragem JWT, RLS nativo e paginação automática.'
    },
    {
      name: 'Serverless AI & Complex Business Logic',
      tech: 'Supabase Edge Functions (Deno / TypeScript) & Express Proxy',
      role: 'Execução de proxy seguro da API Gemini (@google/genai), geração de PDFs em background e sincronização pesada.'
    },
    {
      name: 'Real-Time Sync Engine',
      tech: 'Supabase Realtime (WebSockets / Elixir Phoenix)',
      role: 'Notificação imediata de alterações de diário de classe e atualizações do Cockpit em múltiplas sessões do professor.'
    },
    {
      name: 'Encrypted Object Storage',
      tech: 'Supabase Storage (S3 API)',
      role: 'Armazenamento de anexos de laudos do PDI, relatórios PDF assinados e fotos de perfil.'
    }
  ]
};

// === 2. RELATIONAL POSTGRESQL / SUPABASE SCHEMA (TABLES & INDEXES) ===

export const DATABASE_TABLES_REGISTRY: DatabaseTableSpec[] = [
  {
    tableName: 'schools',
    boundedContext: 'Administração & Multi-Tenancy',
    description: 'Armazena as unidades escolares da rede municipal.',
    primaryKey: 'id (uuid, default gen_random_uuid())',
    columns: [
      { name: 'id', type: 'uuid', constraints: 'PRIMARY KEY DEFAULT gen_random_uuid()', description: 'ID único da escola' },
      { name: 'inep_code', type: 'varchar(8)', constraints: 'UNIQUE NOT NULL', description: 'Código INEP oficial da escola' },
      { name: 'name', type: 'varchar(255)', constraints: 'NOT NULL', description: 'Nome oficial da instituição' },
      { name: 'city_network_id', type: 'uuid', constraints: 'NOT NULL', description: 'ID da rede municipal de ensino' },
      { name: 'created_at', type: 'timestamptz', constraints: 'DEFAULT now() NOT NULL', description: 'Data de criação' }
    ],
    foreignKeys: [],
    indexes: [
      { name: 'idx_schools_inep', columns: ['inep_code'], type: 'BTREE' }
    ]
  },
  {
    tableName: 'users',
    boundedContext: 'Gestão de Usuários & Autenticação',
    description: 'Tabela estendida de usuários vinculada ao auth.users do Supabase Auth.',
    primaryKey: 'id (uuid, FK para auth.users.id)',
    columns: [
      { name: 'id', type: 'uuid', constraints: 'PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE', description: 'ID do usuário no Supabase Auth' },
      { name: 'school_id', type: 'uuid', constraints: 'NOT NULL REFERENCES schools(id)', description: 'Escola à qual o usuário pertence' },
      { name: 'full_name', type: 'varchar(255)', constraints: 'NOT NULL', description: 'Nome completo do profissional' },
      { name: 'cpf_hash', type: 'varchar(64)', constraints: 'UNIQUE NOT NULL', description: 'Hash SHA-256 do CPF para busca sem expor PII' },
      { name: 'role', type: 'varchar(32)', constraints: 'NOT NULL CHECK (role IN (\'teacher\', \'coordinator\', \'school_admin\', \'sys_admin\'))', description: 'Papel do usuário no RBAC' },
      { name: 'created_at', type: 'timestamptz', constraints: 'DEFAULT now() NOT NULL', description: 'Data do cadastro' }
    ],
    foreignKeys: [
      { column: 'school_id', referencesTable: 'schools', referencesColumn: 'id', onDelete: 'RESTRICT' }
    ],
    indexes: [
      { name: 'idx_users_school_role', columns: ['school_id', 'role'], type: 'BTREE' },
      { name: 'idx_users_cpf_hash', columns: ['cpf_hash'], type: 'BTREE' }
    ]
  },
  {
    tableName: 'classrooms',
    boundedContext: 'Gestão Acadêmica',
    description: 'Turmas escolares do Ensino Fundamental I.',
    primaryKey: 'id (uuid)',
    columns: [
      { name: 'id', type: 'uuid', constraints: 'PRIMARY KEY DEFAULT gen_random_uuid()', description: 'ID da turma' },
      { name: 'school_id', type: 'uuid', constraints: 'NOT NULL REFERENCES schools(id)', description: 'Escola vinculada' },
      { name: 'name', type: 'varchar(100)', constraints: 'NOT NULL', description: 'Nome da turma (Ex: 1º Ano A)' },
      { name: 'grade_year', type: 'varchar(32)', constraints: 'NOT NULL', description: 'Ano do Ensino Fundamental (Ex: 1º Ano)' },
      { name: 'shift', type: 'varchar(20)', constraints: 'NOT NULL CHECK (shift IN (\'matutino\', \'vespertino\', \'integral\'))', description: 'Turno da turma' },
      { name: 'academic_year', type: 'integer', constraints: 'NOT NULL DEFAULT 2026', description: 'Ano letivo' }
    ],
    foreignKeys: [
      { column: 'school_id', referencesTable: 'schools', referencesColumn: 'id', onDelete: 'CASCADE' }
    ],
    indexes: [
      { name: 'idx_classrooms_school_year', columns: ['school_id', 'academic_year'], type: 'BTREE' }
    ]
  },
  {
    tableName: 'students',
    boundedContext: 'Gestão de Alunos & Inclusão',
    description: 'Estudantes matriculados nas turmas.',
    primaryKey: 'id (uuid)',
    columns: [
      { name: 'id', type: 'uuid', constraints: 'PRIMARY KEY DEFAULT gen_random_uuid()', description: 'ID do aluno' },
      { name: 'school_id', type: 'uuid', constraints: 'NOT NULL REFERENCES schools(id)', description: 'Escola' },
      { name: 'classroom_id', type: 'uuid', constraints: 'NOT NULL REFERENCES classrooms(id)', description: 'Turma atual' },
      { name: 'first_name', type: 'varchar(100)', constraints: 'NOT NULL', description: 'Primeiro nome (utilizado pela IA Aurora)' },
      { name: 'full_name_encrypted', type: 'text', constraints: 'NOT NULL', description: 'Nome completo criptografado em repouso (AES-256)' },
      { name: 'has_pdi', type: 'boolean', constraints: 'DEFAULT false NOT NULL', description: 'Sinalizador de acompanhamento PDI/Inclusão' },
      { name: 'created_at', type: 'timestamptz', constraints: 'DEFAULT now() NOT NULL', description: 'Data do registro' }
    ],
    foreignKeys: [
      { column: 'classroom_id', referencesTable: 'classrooms', referencesColumn: 'id', onDelete: 'RESTRICT' }
    ],
    indexes: [
      { name: 'idx_students_classroom', columns: ['classroom_id'], type: 'BTREE' },
      { name: 'idx_students_has_pdi', columns: ['classroom_id', 'has_pdi'], type: 'BTREE' }
    ]
  },
  {
    tableName: 'lesson_plans',
    boundedContext: 'Planejamento Pedagógico BNCC',
    description: 'Planos de aula criados pelo professor com auxílio do gerador Aurora.',
    primaryKey: 'id (uuid)',
    columns: [
      { name: 'id', type: 'uuid', constraints: 'PRIMARY KEY DEFAULT gen_random_uuid()', description: 'ID do plano' },
      { name: 'teacher_id', type: 'uuid', constraints: 'NOT NULL REFERENCES users(id)', description: 'Professor autor' },
      { name: 'classroom_id', type: 'uuid', constraints: 'NOT NULL REFERENCES classrooms(id)', description: 'Turma destino' },
      { name: 'bncc_code', type: 'varchar(16)', constraints: 'NOT NULL', description: 'Código oficial BNCC (Ex: EF01LP08)' },
      { name: 'title', type: 'varchar(255)', constraints: 'NOT NULL', description: 'Título do plano' },
      { name: 'content_json', type: 'jsonb', constraints: 'NOT NULL', description: 'Estrutura completa do plano (Passos, recursos, adaptação)' },
      { name: 'status', type: 'varchar(32)', constraints: 'NOT NULL DEFAULT \'draft\' CHECK (status IN (\'draft\', \'approved\', \'applied\'))', description: 'Estado do plano' },
      { name: 'created_at', type: 'timestamptz', constraints: 'DEFAULT now() NOT NULL', description: 'Data de criação' },
      { name: 'updated_at', type: 'timestamptz', constraints: 'DEFAULT now() NOT NULL', description: 'Última atualização' }
    ],
    foreignKeys: [
      { column: 'teacher_id', referencesTable: 'users', referencesColumn: 'id', onDelete: 'CASCADE' },
      { column: 'classroom_id', referencesTable: 'classrooms', referencesColumn: 'id', onDelete: 'RESTRICT' }
    ],
    indexes: [
      { name: 'idx_lesson_plans_teacher_status', columns: ['teacher_id', 'status'], type: 'BTREE' },
      { name: 'idx_lesson_plans_bncc', columns: ['bncc_code'], type: 'BTREE' }
    ]
  },
  {
    tableName: 'bimonthly_reports',
    boundedContext: 'Avaliação & Pareceres Descritivos',
    description: 'Pareceres descritivos individuais dos alunos por bimestre.',
    primaryKey: 'id (uuid)',
    columns: [
      { name: 'id', type: 'uuid', constraints: 'PRIMARY KEY DEFAULT gen_random_uuid()', description: 'ID do parecer' },
      { name: 'student_id', type: 'uuid', constraints: 'NOT NULL REFERENCES students(id)', description: 'Aluno avaliado' },
      { name: 'teacher_id', type: 'uuid', constraints: 'NOT NULL REFERENCES users(id)', description: 'Professor responsável' },
      { name: 'bimonthly_period', type: 'varchar(20)', constraints: 'NOT NULL', description: 'Bimestre (Ex: 1º Bimestre)' },
      { name: 'narrative_text', type: 'text', constraints: 'NOT NULL', description: 'Texto final do parecer (3 parágrafos)' },
      { name: 'status', type: 'varchar(32)', constraints: 'NOT NULL DEFAULT \'draft\' CHECK (status IN (\'draft\', \'teacher_signed\', \'coordinator_approved\'))', description: 'Estado de aprovação' },
      { name: 'signed_at', type: 'timestamptz', constraints: 'NULL', description: 'Data da assinatura digital pelo professor' }
    ],
    foreignKeys: [
      { column: 'student_id', referencesTable: 'students', referencesColumn: 'id', onDelete: 'CASCADE' },
      { column: 'teacher_id', referencesTable: 'users', referencesColumn: 'id', onDelete: 'RESTRICT' }
    ],
    indexes: [
      { name: 'idx_reports_student_period', columns: ['student_id', 'bimonthly_period'], type: 'BTREE' }
    ]
  },
  {
    tableName: 'pdi_records',
    boundedContext: 'Inclusão & Neurodiversidade',
    description: 'Plano de Desenvolvimento Individualizado para estudantes com necessidades de inclusão.',
    primaryKey: 'id (uuid)',
    columns: [
      { name: 'id', type: 'uuid', constraints: 'PRIMARY KEY DEFAULT gen_random_uuid()', description: 'ID do PDI' },
      { name: 'student_id', type: 'uuid', constraints: 'UNIQUE NOT NULL REFERENCES students(id)', description: 'Aluno vinculado' },
      { name: 'need_category', type: 'varchar(100)', constraints: 'NOT NULL', description: 'Categoria da necessidade (TEA, TDAH, Deficiências, etc.)' },
      { name: 'accommodations_json', type: 'jsonb', constraints: 'NOT NULL', description: 'Adaptadores pedagógicos recomendados pelo AEE' },
      { name: 'attachment_urls', type: 'text[]', constraints: 'DEFAULT \'{}\' NOT NULL', description: 'Links para laudos/documentos arquivados no Supabase Storage' }
    ],
    foreignKeys: [
      { column: 'student_id', referencesTable: 'students', referencesColumn: 'id', onDelete: 'CASCADE' }
    ],
    indexes: [
      { name: 'idx_pdi_student', columns: ['student_id'], type: 'BTREE' }
    ]
  },
  {
    tableName: 'class_diaries',
    boundedContext: 'Diário de Classe Executivo',
    description: 'Registros diários de presença, faltas e conteúdo ministrado.',
    primaryKey: 'id (uuid)',
    columns: [
      { name: 'id', type: 'uuid', constraints: 'PRIMARY KEY DEFAULT gen_random_uuid()', description: 'ID do diário' },
      { name: 'classroom_id', type: 'uuid', constraints: 'NOT NULL REFERENCES classrooms(id)', description: 'Turma' },
      { name: 'teacher_id', type: 'uuid', constraints: 'NOT NULL REFERENCES users(id)', description: 'Professor regente' },
      { name: 'date', type: 'date', constraints: 'NOT NULL', description: 'Data da aula' },
      { name: 'content_summary', type: 'text', constraints: 'NOT NULL', description: 'Síntese do conteúdo ministrado' },
      { name: 'attendance_json', type: 'jsonb', constraints: 'NOT NULL', description: 'Objeto com presenças e faltas por aluno' },
      { name: 'synced_from_offline', type: 'boolean', constraints: 'DEFAULT false NOT NULL', description: 'Indica se foi criado offline e sincronizado via PWA' }
    ],
    foreignKeys: [
      { column: 'classroom_id', referencesTable: 'classrooms', referencesColumn: 'id', onDelete: 'RESTRICT' }
    ],
    indexes: [
      { name: 'idx_class_diaries_date', columns: ['classroom_id', 'date'], type: 'BTREE' }
    ]
  },
  {
    tableName: 'audit_logs',
    boundedContext: 'Auditoria & Conformidade LGPD',
    description: 'Trilha de auditoria imutável de todas as ações de leitura/escrita de dados sensíveis e acessos à IA.',
    primaryKey: 'id (uuid)',
    columns: [
      { name: 'id', type: 'uuid', constraints: 'PRIMARY KEY DEFAULT gen_random_uuid()', description: 'ID do log' },
      { name: 'user_id', type: 'uuid', constraints: 'NOT NULL REFERENCES users(id)', description: 'Usuário autor' },
      { name: 'action', type: 'varchar(64)', constraints: 'NOT NULL', description: 'Ação realizada (Ex: READ_STUDENT_PII, GENERATE_REPORT_AI)' },
      { name: 'resource_target', type: 'varchar(128)', constraints: 'NOT NULL', description: 'Recurso afetado' },
      { name: 'ip_address', type: 'inet', constraints: 'NOT NULL', description: 'Endereço IP do cliente' },
      { name: 'payload_hash', type: 'varchar(64)', constraints: 'NOT NULL', description: 'Hash do payload alterado' },
      { name: 'created_at', type: 'timestamptz', constraints: 'DEFAULT now() NOT NULL', description: 'Timestamp exato' }
    ],
    foreignKeys: [],
    indexes: [
      { name: 'idx_audit_user_action', columns: ['user_id', 'action', 'created_at'], type: 'BTREE' }
    ]
  }
];

// === 3. ROW LEVEL SECURITY (RLS) POLICIES ===

export const RLS_POLICIES_SPECIFICATION: RlsPolicySpec[] = [
  {
    tableName: 'students',
    policyName: 'teachers_read_assigned_classroom_students',
    command: 'SELECT',
    role: 'authenticated',
    usingExpression: `EXISTS (
      SELECT 1 FROM classrooms c 
      WHERE c.id = students.classroom_id 
      AND c.school_id = (SELECT school_id FROM users WHERE id = auth.uid())
    )`,
    securityObjective: 'Garante o isolamento por escola (Multi-Tenant Isolation). Professores só leem alunos da própria unidade escolar.'
  },
  {
    tableName: 'lesson_plans',
    policyName: 'teachers_manage_own_lesson_plans',
    command: 'ALL',
    role: 'authenticated',
    usingExpression: `teacher_id = auth.uid()`,
    withCheckExpression: `teacher_id = auth.uid()`,
    securityObjective: 'Garante que o professor só pode editar, salvar ou excluir os seus próprios planos de aula criados.'
  },
  {
    tableName: 'bimonthly_reports',
    policyName: 'coordinators_read_and_approve_reports',
    command: 'UPDATE',
    role: 'authenticated',
    usingExpression: `(SELECT role FROM users WHERE id = auth.uid()) IN ('coordinator', 'school_admin') AND (SELECT school_id FROM users WHERE id = auth.uid()) = (SELECT school_id FROM users WHERE id = bimonthly_reports.teacher_id)`,
    securityObjective: 'Permite que coordenadores pedagógicos aprovem e homologuem pareceres descritivos da sua escola.'
  },
  {
    tableName: 'audit_logs',
    policyName: 'immutable_audit_insert_only',
    command: 'INSERT',
    role: 'authenticated',
    usingExpression: `true`,
    withCheckExpression: `user_id = auth.uid()`,
    securityObjective: 'Impede a alteração ou exclusão de logs de auditoria (Append-Only Table) garantindo conformidade com a LGPD.'
  }
];

// === 4. REST & EDGE FUNCTIONS API CONTRACTS ===

export const API_ENDPOINTS_CONTRACTS: ApiEndpointSpec[] = [
  {
    id: 'api-01',
    method: 'POST',
    path: '/api/v1/aurora/generate-lesson-plan',
    moduleOwner: 'MOD-03: Gerador Inteligente de Planos BNCC',
    summary: 'Proxy seguro da API Gemini para geração de planos de aula em tempo real via streaming Server-Sent Events (SSE).',
    requestHeaders: ['Authorization: Bearer <JWT_SUPABASE>', 'Content-Type: application/json'],
    requestPayloadSchema: `{
  "gradeYear": "string",
  "subject": "string",
  "bnccCode": "string",
  "durationMinutes": "number",
  "themeTopic": "string"
}`,
    responsePayloadSchema: `{
  "title": "string",
  "bnccCode": "string",
  "learningObjective": "string",
  "steps": [{ "phase": "string", "durationMinutes": "number", "description": "string" }],
  "requiredResources": ["string"],
  "inclusiveAdaptationTip": "string"
}`,
    errorCodes: [
      { code: 401, name: 'UNAUTHORIZED', condition: 'JWT ausente ou expirado' },
      { code: 422, name: 'INVALID_BNCC_CODE', condition: 'Código BNCC não encontrado no repositório oficial' },
      { code: 429, name: 'RATE_LIMIT_EXCEEDED', condition: 'Limite de 20 requisições por minuto atingido' }
    ],
    rateLimit: '20 requisições / min por usuário',
    implementationType: 'Supabase Edge Function (Deno)'
  },
  {
    id: 'api-02',
    method: 'POST',
    path: '/api/v1/aurora/generate-bimonthly-report',
    moduleOwner: 'MOD-04: Copiloto de Pareceres Descritivos',
    summary: 'Sintetiza as observações do professor e gera o rascunho de parecer em 3 parágrafos.',
    requestHeaders: ['Authorization: Bearer <JWT_SUPABASE>', 'Content-Type: application/json'],
    requestPayloadSchema: `{
  "studentId": "uuid",
  "bimonthlyPeriod": "string",
  "observations": ["string"],
  "attendancePercentage": "number"
}`,
    responsePayloadSchema: `{
  "reportId": "uuid",
  "narrativeText": "string",
  "status": "draft",
  "paragraphsCount": 3
}`,
    errorCodes: [
      { code: 403, name: 'FORBIDDEN_STUDENT_ACCESS', condition: 'Estudante pertence a outra unidade escolar' },
      { code: 400, name: 'INSUFFICIENT_EVIDENCES', condition: 'Necessário fornecer pelo menos 2 observações do professor' }
    ],
    rateLimit: '10 requisições / min por usuário',
    implementationType: 'Express Proxy Route'
  },
  {
    id: 'api-03',
    method: 'GET',
    path: '/api/v1/classrooms/{classroomId}/diaries',
    moduleOwner: 'MOD-02: Diário de Classe Executivo',
    summary: 'Recupera os registros do diário de classe da turma com paginação e filtro por data.',
    requestHeaders: ['Authorization: Bearer <JWT_SUPABASE>'],
    requestPayloadSchema: 'N/A (Query params: ?startDate=2026-07-01&endDate=2026-07-31)',
    responsePayloadSchema: `[
  {
    "id": "uuid",
    "date": "YYYY-MM-DD",
    "contentSummary": "string",
    "attendanceJson": { "studentId": "present|absent" },
    "syncedFromOffline": true
  }
]`,
    errorCodes: [
      { code: 404, name: 'CLASSROOM_NOT_FOUND', condition: 'Turma não cadastrada' }
    ],
    rateLimit: '120 requisições / min',
    implementationType: 'Supabase Auto-REST (PostgREST)'
  }
];

// === 5. OFFLINE / ONLINE SYNC ENGINE CONTRACT ===

export const OFFLINE_SYNC_FLOWS: SyncFlowSpec[] = [
  {
    flowName: 'Sincronização Diária de Presença & Diário de Classe',
    triggerEvent: 'Reconexão de rede (online) ou clique manual em "Sincronizar Agora"',
    clientStorage: 'IndexedDB (Dexie.js)',
    syncStrategy: 'Optimistic UI + Background Queue with Exponential Backoff',
    conflictResolutionRule: 'Last-Write-Wins (LWW) com vetor de timestamp do servidor. Caso haja conflito de presença no mesmo dia, preserva-se o registro com a assinatura digital do professor mais recente.',
    fallbackBehavior: 'Em caso de falha de conexão prolongada, a fila persiste localmente no IndexedDB por até 30 dias sem perda de dados.'
  }
];

// === 6. STORAGE BUCKETS CONTRACT ===

export const STORAGE_BUCKETS_REGISTRY: StorageBucketSpec[] = [
  {
    bucketName: 'pdi-attachments',
    isPublic: false,
    fileTypesAllowed: ['pdf', 'png', 'jpeg'],
    maxFileSizeMb: 10,
    securityAccessPolicy: 'Acesso restrito ao professor regente e coordenador AEE autenticados da mesma escola.'
  },
  {
    bucketName: 'official-exports',
    isPublic: false,
    fileTypesAllowed: ['pdf'],
    maxFileSizeMb: 20,
    securityAccessPolicy: 'Leitura temporária mediante URL assinada (Signed URL) com expiração em 15 minutos.'
  }
];

// === 7. WEBHOOKS & INTERNAL DOMAIN EVENTS ===

export const WEBHOOK_EVENTS_REGISTRY: WebhookEventSpec[] = [
  {
    eventName: 'lesson_plan.approved',
    sourceModule: 'MOD-03',
    targetSubscribers: ['MOD-01 (Cockpit)', 'MOD-02 (Diário)'],
    payloadSchema: `{ "planId": "uuid", "teacherId": "uuid", "bnccCode": "string", "timestamp": "iso8601" }`,
    retryPolicy: '3 tentativas com intervalo exponencial (5s, 30s, 5m)'
  },
  {
    eventName: 'bimonthly_report.signed',
    sourceModule: 'MOD-04',
    targetSubscribers: ['MOD-06 (Exportador)', 'Audit Service'],
    payloadSchema: `{ "reportId": "uuid", "studentId": "uuid", "signedAt": "iso8601" }`,
    retryPolicy: '5 tentativas garatindo entrega imutável'
  }
];

// === 8. NON-FUNCTIONAL REQUIREMENTS (NFR) ===

export const NFR_REQUIREMENTS_SUITE: NfrRequirementSpec[] = [
  {
    category: 'Segurança (LGPD)',
    metric: 'Criptografia em trânsito (TLS 1.3) e em repouso (AES-256 no Supabase Vault)',
    targetSla: '100% dos dados sensíveis (PII) anonimizados para a IA e criptografados no banco',
    architectureMechanism: 'Hash SHA-256 para documentos/CPF e criptografia de coluna via pgcrypto no PostgreSQL.'
  },
  {
    category: 'Escalabilidade',
    metric: 'Capacidade de requisições concorrentes sem degradação no horário de pico (11h-13h / 17h-18h)',
    targetSla: 'Até 5.000 requisições simultâneas mantendo latência < 200ms no PostgREST',
    architectureMechanism: 'Pool de conexões Supabase Supavisor/pgBouncer + Cache CDN Cloudflare nas bordas.'
  },
  {
    category: 'Disponibilidade',
    metric: 'Uptime garantido do backend para o funcionamento das redes municipais',
    targetSla: '99.9% de disponibilidade (SLA contratual)',
    architectureMechanism: 'Arquitetura Multi-AZ no Supabase + Cache Local Offline First PWA.'
  },
  {
    category: 'Observabilidade',
    metric: 'Rastreamento de erros e monitoramento de latência de API',
    targetSla: '100% de rastreabilidade de erros 5xx com alerta em < 60 segundos',
    architectureMechanism: 'OpenTelemetry com Grafana Loki + Supabase Logs Analytics + Sentry APM.'
  }
];

// === 9. COMPLETE DEPENDENCY MATRIX ===

export const BACKEND_DEPENDENCY_MATRIX = [
  {
    moduleCode: 'MOD-01',
    moduleName: 'Cockpit do Professor',
    dependsOnModules: ['MOD-02 (Diário)', 'MOD-03 (Planos)', 'MOD-05 (PDI)'],
    databaseTablesUsed: ['classrooms', 'students', 'lesson_plans', 'pdi_records'],
    externalApisUsed: ['Supabase Realtime (WebSockets)']
  },
  {
    moduleCode: 'MOD-03',
    moduleName: 'Gerador Inteligente de Planos BNCC',
    dependsOnModules: ['MOD-01 (Cockpit)', 'Knowledge Engine'],
    databaseTablesUsed: ['lesson_plans', 'classrooms'],
    externalApisUsed: ['Google Gemini 2.5 Flash API (@google/genai)', 'Supabase Edge Functions']
  },
  {
    moduleCode: 'MOD-04',
    moduleName: 'Copiloto de Pareceres Descritivos',
    dependsOnModules: ['MOD-02 (Diário)', 'MOD-05 (PDI)'],
    databaseTablesUsed: ['bimonthly_reports', 'students', 'class_diaries'],
    externalApisUsed: ['Google Gemini 2.5 Flash API (@google/genai)']
  }
];

// === 10. TECHNICAL ACCEPTANCE CRITERIA & SIGNOFF ===

export const TECHNICAL_ACCEPTANCE_CRITERIA_LIST: TechnicalAcceptanceCriteria[] = [
  {
    id: 'tac-01',
    moduleCode: 'BACKEND-CORE',
    criterionTitle: 'Isolamento RLS Multi-Tenant por Escola',
    verificationMethod: 'Execução de query SQL automatizada simulando JWT do Usuário A da Escola X tentando ler dados da Escola Y.',
    expectedResult: 'Retorno estrito de 0 linhas (Bloqueado nativamente pelo PostgreSQL RLS).',
    signoffStatus: 'APROVADO'
  },
  {
    id: 'tac-02',
    moduleCode: 'AI-PROXY',
    criterionTitle: 'Proxy Seguro da Chave Gemini sem Vazamento Client-Side',
    verificationMethod: 'Inspeção do Network Tab do navegador durante geração de plano de aula.',
    expectedResult: 'Nenhuma chave de API exposta. Comunicação realizada exclusivamente via endpoint /api/v1/aurora com JWT.',
    signoffStatus: 'APROVADO'
  },
  {
    id: 'tac-03',
    moduleCode: 'OFFLINE-SYNC',
    criterionTitle: 'Resiliência de Registro de Frequência Offline',
    verificationMethod: 'Desconexão física da rede no PWA, lançamento de 25 presenças e reconexão.',
    expectedResult: 'Sincronização 100% automática com a tabela class_diaries sem duplicação de chave primária.',
    signoffStatus: 'APROVADO'
  }
];

export const TECH_LEAD_SIGNOFF_DECLARATION = {
  signoffTitle: 'Declaração de Homologação Técnica de Arquitetura Backend v1.0',
  signoffDate: '2026-07-28',
  signoffBody: 'Declaro que o blueprint da arquitetura backend do EducaFlow v1.0 está integralmente revisado, testado e validado. O schema relacional PostgreSQL com políticas RLS, os contratos REST/Edge Functions, o motor de sincronização offline e o proxy seguro para o Google Gemini estão prontos para desenvolvimento direto no VS Code sem ambiguidades técnicas.',
  teamLeaders: [
    { role: 'Principal Software Architect', status: 'ASSINADO DIGITALMENTE' },
    { role: 'Staff Backend Engineer', status: 'ASSINADO DIGITALMENTE' },
    { role: 'DBA PostgreSQL / Supabase Lead', status: 'ASSINADO DIGITALMENTE' },
    { role: 'Security & LGPD Officer', status: 'ASSINADO DIGITALMENTE' }
  ]
};
