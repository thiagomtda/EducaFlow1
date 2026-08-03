export type UserRole = 'teacher' | 'coordinator' | 'admin' | 'TEACHER' | 'ADMIN';

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  schoolName: string;
  avatarUrl?: string;
  createdAt: string;
}

export interface AuthSession {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
  user: UserProfile;
}

export interface AuthErrorState {
  code: string;
  message: string;
  details?: string;
}

export interface SchoolClass {
  id: string;
  code: string;
  name: string;
  year: number;
  grade: '1º Ano' | '2º Ano' | '3º Ano' | '4º Ano' | '5º Ano';
  shift: 'Matutino' | 'Vespertino' | 'Integral';
  studentCount: number;
}

export interface Student {
  id: string;
  classId: string;
  name: string;
  rollNumber: number;
  status: 'active' | 'transferred' | 'inactive';
  avatarUrl?: string;
}

export type AttendanceStatus = 'present' | 'absent' | 'justified' | 'late';

export interface AttendanceRecord {
  id: string;
  studentId: string;
  classId: string;
  date: string;
  status: AttendanceStatus;
  notes?: string;
  synced: boolean;
  updatedAt: string;
}

export interface LessonJournal {
  id: string;
  classId: string;
  date: string;
  subject: string;
  content: string;
  bnccCodes: string[];
  observations?: string;
  synced: boolean;
  createdAt: string;
}

export interface LessonPlan {
  id: string;
  title: string;
  grade: string;
  subject: string;
  objectives: string[];
  bnccCompetencies: string[];
  methodology: string;
  evaluation: string;
  generatedByAi: boolean;
  synced: boolean;
  createdAt: string;
}

export type SyncAction = 'CREATE' | 'UPDATE' | 'DELETE';
export type SyncEntity = 'attendance' | 'lessonJournal' | 'lessonPlan' | 'student';
export type SyncItemStatus = 'PENDING' | 'SYNCING' | 'SUCCESS' | 'ERROR';

export interface SyncQueueItem {
  id?: number;
  uuid: string;
  entity: SyncEntity;
  action: SyncAction;
  payload: Record<string, unknown>;
  status: SyncItemStatus;
  createdAt: string;
  retries: number;
  lastErrorMessage?: string;
}

export type ThemeMode = 'light' | 'dark' | 'system';

export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

export interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  context?: Record<string, unknown>;
}

export interface SystemHealthStatus {
  supabase: 'connected' | 'disconnected' | 'pending';
  dexie: 'active' | 'error' | 'pending';
  zustand: 'ready';
  tanstackQuery: 'ready';
  pwa: 'registered' | 'unsupported' | 'checking';
  network: 'online' | 'offline';
  logger: 'active';
  envValidation: 'valid' | 'invalid';
}

export type ActiveTabType = 
  | 'sprint_1_foundation'
  | 'sprint_0_plan'
  | 'engineering_constitution'
  | 'internal_engineering_blueprint'
  | 'ui_ux_master_prototype'
  | 'qa_testing_cicd'
  | 'frontend_ui_architecture'
  | 'backend_api_architecture'
  | 'aurora_ai_architecture'
  | 'functional_spec_ddd'
  | 'design_system'
  | 'product_constitution'
  | 'system_blueprint'
  | 'mvp_blueprint'
  | 'cx_customer_journey'
  | 'user_flow_master'
  | 'ai_personality_manual'
  | 'ecosystem_map'
  | 'ecosystem_tree'
  | 'critical_analysis'
  | 'journey_overview' 
  | 'smart_flows' 
  | 'ux_psychology' 
  | 'research_intro' 
  | 'before' 
  | 'during' 
  | 'after' 
  | 'closing' 
  | 'year_round' 
  | 'pain_matrix';

export type PainStageId = 'before' | 'during' | 'after' | 'closing' | 'year_round';

export interface EcosystemModule {
  id: string;
  code: string;
  name: string;
  iconName: string;
  tagline: string;
  mainObjective: string;
  problemSolved: string;
  usageFrequency: string;
  perceivedValue: 'Vital (Insubstituível)' | 'Alto (Economia direta de tempo)' | 'Médio (Organizador complementar)';
  dependencies: string[];
  mvpStatus: 'MVP (P1 - Indispensável)' | 'Versão Futura (V2 - Produtividade Avançada)';
}

export interface EcosystemArea {
  id: string;
  number: string;
  title: string;
  iconName: string;
  colorTheme: string; // TailWind color key e.g. 'indigo', 'emerald'
  description: string;
  coreExperienceObjective: string;
  modules: EcosystemModule[];
}

export interface TreeNode {
  id: string;
  label: string;
  type: 'platform' | 'area' | 'module' | 'feature';
  code?: string;
  status?: string;
  details?: string;
  children?: TreeNode[];
}

export interface CriticalQuestionAnswer {
  question: string;
  verdict: 'Otimizado' | 'Aprovado' | 'Simplificado' | 'Eliminado';
  summary: string;
  architecturalReasoning: string;
}

export interface PainPoint {
  id: string;
  stageId: PainStageId;
  stageName: string;
  taskName: string;
  mainDifficulties: string[];
  stressLevel: 'Baixo' | 'Médio' | 'Alto' | 'Crítico';
  avgTimeSpent: string;
  frequency: string;
  qualityOfLifeImpact: string;
  currentExistingSolutions: string;
  whyCurrentSolutionsFail: string;
  educaFlowSimpleFix: string;
  
  // Matrix Metrics
  teacherImpact: 'Médio' | 'Alto' | 'Extremo';
  occurrenceFrequency: 'Diária' | 'Semanal' | 'Bimestral' | 'Anual';
  perceivedSubscriptionValue: 'Baixo' | 'Médio' | 'Alto' | 'Vital';
  mvpPriority: 'P1 - Indispensável' | 'P2 - Importante' | 'P3 - Desejável' | 'Fora do MVP';
}

export interface ResearchPersona {
  role: string;
  name: string;
  schoolType: string;
  gradesCount: string;
  quote: string;
  dailyRoutineSummary: string;
}

// === NOVAS INTERFACES DE DESIGN DE UX & COGNITION ===

export interface JourneyStage {
  id: string;
  stageNumber: string;
  title: string;
  timeframe: string;
  contextLocation: string;
  
  // As 8 Perguntas Fundamentais de UX
  whatIsThinking: string;
  whatIsFeeling: string;
  whatIsNeeding: string;
  immediatePlatformResponse: string;
  clickReductionStrategy: string;
  anxietyReductionStrategy: string;
  timeSavingsStrategy: string;
  delightfulExperienceFactors: string[];
}

export interface SmartFlowStep {
  stepNumber: number;
  stepName: string;
  userAction: string;
  systemAction: string;
  microCopyOrInterfaceHint: string;
}

export interface SmartFlowMission {
  id: string;
  missionName: string;
  iconName: string;
  tagline: string;
  problemSolved: string;
  traditionalMenuPath: string; // Ex: "Menu > Planejamento > Criar > Selecionar Categoria > Procurar BNCC..."
  smartFlowShortcutPath: string; // Ex: "1 clique no Cockpit -> 'Preparar Aula de Amanhã'"
  totalClicksBefore: number;
  totalClicksAfter: number;
  estimatedTimeBefore: string;
  estimatedTimeAfter: string;
  cognitivePill: string;
  steps: SmartFlowStep[];
}

// === CX CUSTOMER JOURNEY (11 STAGES) ===
export interface CustomerJourneyStageData {
  stageNumber: number;
  stageName: string;
  iconName: string;
  userObjective: string;
  predominantEmotions: string[];
  possibleDoubts: string[];
  churnBarriers: string[];
  positiveSurprises: string[];
  successMetric: string;
}

// === USER FLOW MASTER ===
export interface UserFlowStepData {
  stepNumber: number;
  action: string;
  screenOrState: string;
  decisionPoint?: string;
  automatedShortcuts: string;
}

export interface UserFlowPathData {
  id: string;
  category: string;
  flowTitle: string;
  entryPoint: string;
  endGoal: string;
  steps: UserFlowStepData[];
  idealCompletionTime: string;
  keyFrictionPointsPrevented: string;
}

// === MANUAL DE PERSONALIDADE DA IA EDUCAFLOW ===
export interface AIPersonalityManualData {
  mission: string;
  personaSummary: string;
  toneOfVoice: {
    attribute: string;
    description: string;
    exampleDo: string;
    exampleDont: string;
  }[];
  pedagogicalPrinciples: {
    principle: string;
    description: string;
    applicationInInterface: string;
  }[];
  behaviorRules: {
    rule: string;
    rationale: string;
  }[];
  boundariesAndLimits: {
    limit: string;
    howToRespond: string;
  }[];
  decisionFramework: {
    whenToSuggest: string[];
    whenToAsk: string[];
    whenToActAutomatically: string[];
  };
}

// === EDUCAFLOW MVP BLUEPRINT (PLANO EXECUTIVO DE DESENVOLVIMENTO) ===

export interface BlueprintFeature {
  id: string;
  name: string;
  moduleCode: string;
  moduleName: string;
  objective: string;
  teacherBenefit: string;
  dependencies: string[];
  complexity: 'Baixa' | 'Média' | 'Alta';
  businessValue: 'Médio' | 'Alto' | 'Crítico / Vital';
  priority: 'P1 - Crítico (MVP)' | 'P2 - Essencial (MVP)' | 'P3 - Complementar';
  devEstimate: string;
  sprint: number;
}

export interface BlueprintSprint {
  sprintNumber: number;
  title: string;
  goal: string;
  deliverable: string;
  duration: string;
  totalEstimate: string;
  featureIds: string[];
}

export interface RoadmapVersion {
  version: string; // 'MVP 1.0' | 'Versão 1.1' | 'Versão 1.2' | 'Versão 2.0' | 'Versão 3.0'
  codename: string;
  focus: string;
  releaseTimeline: string;
  keyHighlights: string[];
  strategicGoal: string;
}

// === EDUCAFLOW SYSTEM BLUEPRINT (ARQUITETURA DE SISTEMA & BANCO LÓGICO) ===

export interface SystemEntity {
  id: string;
  name: string;
  category: 'Ator/Usuário' | 'Estrutura Escolar' | 'Núcleo Pedagógico' | 'Avaliação & Registro' | 'Síntese & Saída';
  objective: string;
  responsibilities: string[];
  attributesStored: string[];
  createdBy: string;
  modifiedBy: string;
  usedBy: string[];
  relationships: {
    targetEntity: string;
    cardinality: '1:1' | '1:N' | 'N:1' | 'N:M';
    description: string;
  }[];
}

export interface CopilotArchitecture {
  accessibleData: string[];
  immutableGuardrails: string[];
  suggestionTriggers: string[];
  userConfirmationTriggers: string[];
  autonomousActions: string[];
}

export interface DataLifecycleStage {
  stepNumber: number;
  stageName: string;
  originEntity: string;
  transformationLogic: string;
  destinationEntities: string[];
  outputArtefact: string;
}

export interface SystemAuditItem {
  category: 'Redundância' | 'Entidade Desnecessária' | 'Dependência Perigosa' | 'Risco de Escalabilidade';
  title: string;
  description: string;
  riskLevel: 'Baixo' | 'Médio' | 'Alto' | 'Crítico';
  mitigationStrategy: string;
}

// === EDUCAFLOW PRODUCT CONSTITUTION (CPO CONSTITUIÇÃO OFICIAL) ===

export interface GoldenPrinciple {
  number: number;
  title: string;
  rule: string;
  rationale: string;
  practicalExample: string;
}

export interface ProhibitedPractice {
  id: string;
  practice: string;
  whyProhibited: string;
  alternativeApproach: string;
}

export interface FeatureApprovalCriterion {
  id: string;
  question: string;
  evaluationCriteria: string;
  passingCondition: string;
  weight: 'Eliminatório' | 'Alta Importância' | 'Estratégico';
}

export interface CommunicationGuideline {
  scenario: string;
  toneAndStyle: string;
  correctPhraseExample: string;
  forbiddenPhraseExample: string;
}

export interface ManifestoParagraph {
  title: string;
  content: string;
  keyHighlight?: string;
}

export interface CpoAuditVerdict {
  category: string;
  status: 'Totalmente Alinhado' | 'Alinhado com Atenção' | 'Requer Ajuste';
  analysis: string;
}

// === EDUCAFLOW DESIGN SYSTEM V1.0 (UX/UI & IDENTIDADE VISUAL) ===

export interface ColorToken {
  name: string;
  role: string;
  hex: string;
  contrastRatio: string;
  usageGuide: string;
  category: 'Primária' | 'Secundária' | 'Feedback / Estado' | 'Superfície & Neutros';
}

export interface TypographyToken {
  level: string;
  fontFamily: string;
  sizePx: string;
  weight: string;
  lineHeight: string;
  useCase: string;
}

export interface UIStateDefinition {
  stateName: string;
  visualTrigger: string;
  microcopyPattern: string;
  componentBehavior: string;
  icon: string;
}

export interface ComponentSpec {
  name: string;
  category: 'Ações & Entradas' | 'Contêineres & Painéis' | 'Navegação' | 'Feedback & Status';
  description: string;
  variants: string[];
  statesHandled: string[];
  accessibilityRules: string;
}

// === EDUCAFLOW FUNCTIONAL SPECIFICATION V1.0 & DDD DOMAIN MODEL ===

export interface MvpModuleFunctionalSpec {
  id: string;
  code: string;
  name: string;
  objective: string;
  triggers: string;
  preconditions: string[];
  mainFlow: string[];
  alternativeFlows: { scenario: string; steps: string[] }[];
  exceptions: { cause: string; handling: string }[];
  businessRules: string[];
  requiredValidations: string[];
  integrations: string[];
  permissions: { role: string; access: string }[];
  domainEvents: string[];
  uiStates: string[];
  userMessages: { context: string; message: string }[];
  offlineSyncBehavior: string;
  performanceReqs: string;
  accessibilityReqs: string;
  acceptanceCriteria: string[];
}

export interface DddAggregate {
  aggregateRoot: string;
  description: string;
  entities: { name: string; keyAttributes: string[]; lifecycle: string }[];
  valueObjects: { name: string; attributes: string[] }[];
  invariants: string[];
}

export interface DddBoundedContext {
  contextName: string;
  description: string;
  aggregates: DddAggregate[];
}

export interface ImplementationDependencyNode {
  stepOrder: number;
  moduleCode: string;
  moduleName: string;
  tier: 'Layer 1: Core Foundation & DB' | 'Layer 2: Engine & Local Storage' | 'Layer 3: AI Copilot & Workflows' | 'Layer 4: Analytics & Exports';
  prerequisites: string[];
  supabaseTables: string[];
  vscodePath: string;
  riskMitigation: string;
}

// === AURORA AI ARCHITECTURE V1.0 TYPES ===

export interface MasterPromptSpec {
  id: string;
  code: string;
  name: string;
  version: string;
  targetFeature: string;
  modelAlias: string;
  temperature: number;
  systemInstruction: string;
  variables: { name: string; description: string; type: string }[];
  fewShotExample: {
    input: string;
    output: string;
  };
  outputFormatSchema: string;
  guardrailsApplied: string[];
}

export interface CognitiveLevelSpec {
  level: string;
  title: string;
  autonomyDegree: string;
  description: string;
  humanValidationGate: string;
  examplesInEducaFlow: string[];
}

export interface KnowledgeSourceSpec {
  id: string;
  name: string;
  category: 'Legislação Oficial' | 'Matriz Pedagógica' | 'Documento da Escola' | 'Dados do Aluno';
  priorityLevel: number; // 1 = Máxima, 4 = Menor
  updateFrequency: string;
  ragChunkingStrategy: string;
  embeddingModel: string;
}

export interface AiSafetyGuardrailRule {
  id: string;
  category: 'Anti-Alucinação BNCC' | 'Linguagem Inclusiva' | 'Proteção PII/LGPD' | 'Controle de Escopo';
  mechanism: string;
  enforcementLayer: 'Deterministic Regex/Lookup' | 'Prompt Guardrail' | 'Post-Processing Filter';
  description: string;
  actionOnViolation: string;
}

export interface AiEvaluationMetric {
  metricName: string;
  category: 'Precisão Pedagógica' | 'Desempenho Técnico' | 'Usabilidade & UX';
  targetBenchmark: string;
  measurementTool: string;
  frequency: string;
}

export interface DatabaseTableSpec {
  tableName: string;
  boundedContext: string;
  description: string;
  columns: { name: string; type: string; constraints: string; description: string }[];
  primaryKey: string;
  foreignKeys: { column: string; referencesTable: string; referencesColumn: string; onDelete: string }[];
  indexes: { name: string; columns: string[]; type: string }[];
}

export interface RlsPolicySpec {
  tableName: string;
  policyName: string;
  command: 'SELECT' | 'INSERT' | 'UPDATE' | 'DELETE' | 'ALL';
  role: string;
  usingExpression: string;
  withCheckExpression?: string;
  securityObjective: string;
}

export interface ApiEndpointSpec {
  id: string;
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  path: string;
  moduleOwner: string;
  summary: string;
  requestHeaders: string[];
  requestPayloadSchema: string;
  responsePayloadSchema: string;
  errorCodes: { code: number; name: string; condition: string }[];
  rateLimit: string;
  implementationType: 'Supabase Auto-REST (PostgREST)' | 'Supabase Edge Function (Deno)' | 'Express Proxy Route';
}

export interface SyncFlowSpec {
  flowName: string;
  triggerEvent: string;
  clientStorage: 'IndexedDB (Dexie.js)';
  syncStrategy: 'Optimistic UI + Background Queue with Exponential Backoff';
  conflictResolutionRule: string;
  fallbackBehavior: string;
}

export interface StorageBucketSpec {
  bucketName: string;
  isPublic: boolean;
  fileTypesAllowed: string[];
  maxFileSizeMb: number;
  securityAccessPolicy: string;
}

export interface WebhookEventSpec {
  eventName: string;
  sourceModule: string;
  targetSubscribers: string[];
  payloadSchema: string;
  retryPolicy: string;
}

export interface NfrRequirementSpec {
  category: 'Segurança (LGPD)' | 'Escalabilidade' | 'Disponibilidade' | 'Observabilidade';
  metric: string;
  targetSla: string;
  architectureMechanism: string;
}

export interface TechnicalAcceptanceCriteria {
  id: string;
  moduleCode: string;
  criterionTitle: string;
  verificationMethod: string;
  expectedResult: string;
  signoffStatus: 'APROVADO' | 'PENDENTE';
}

// === FRONTEND ARCHITECTURE & UI SPECIFICATION TYPES ===

export interface FrontendFolderStructureNode {
  path: string;
  description: string;
  purpose: string;
}

export interface FrontendTechStackItem {
  category: string;
  library: string;
  version: string;
  justification: string;
}

export interface MvpUiScreenSpec {
  screenId: string;
  routePath: string;
  screenTitle: string;
  moduleOwner: string;
  userRoleAccess: string[];
  layoutType: 'AppShell Sidebar' | 'Focused Fullscreen Modal' | 'Cockpit Grid' | 'Split View Workspace';
  primaryGoal: string;
  keyComponents: string[];
  stateMachine: {
    idleState: string;
    loadingState: string;
    errorState: string;
    emptyState: string;
    successState: string;
    offlineState: string;
  };
  navigationTriggers: {
    event: string;
    targetRoute: string;
  }[];
  accessibilitySpecs: {
    ariaRoles: string[];
    keyboardShortcuts: string[];
    focusManagement: string;
  };
}

export interface FrontendStateStrategySpec {
  stateType: 'Global App State' | 'Server State & Cache' | 'Form Local State' | 'Offline Persistence Queue';
  techSolution: string;
  useCases: string[];
  syncPattern: string;
}

export interface PwaArchitecturalSpec {
  capability: string;
  implementation: string;
  detail: string;
}

export interface FrontendAcceptanceCriterion {
  id: string;
  screenOrComponent: string;
  title: string;
  testScenario: string;
  expectedOutcome: string;
  wcagRule: string;
}

// === QA, TESTING & CI/CD BLUEPRINT TYPES ===

export interface TestingStrategyPyramidItem {
  level: string;
  testType: string;
  frameworkTools: string[];
  executionFrequency: string;
  coverageTarget: string;
  description: string;
  scopeAndFocus: string;
}

export interface ModuleCoverageTarget {
  moduleId: string;
  moduleName: string;
  unitCoverage: number;
  integrationCoverage: number;
  e2eCoverage: number;
  criticalPathsToTest: string[];
}

export interface AuroraAiTestSuiteSpec {
  testId: string;
  testCategory: 'BNCC Precision' | 'Report Quality & Tone' | 'Inclusive PDI Validation' | 'Safety & Guardrails' | 'Streaming & Latency';
  testName: string;
  inputPromptOrContext: string;
  expectedBehaviorOrOutput: string;
  evaluationMetric: string;
  passCriteria: string;
}

export interface OfflineSyncTestingScenario {
  scenarioId: string;
  title: string;
  networkCondition: 'Airplane Mode (Offline)' | 'Intermittent 2G Flapping' | 'High Latency 3G' | 'Reconnection Event';
  testAction: string;
  expectedDexieBehavior: string;
  syncEngineValidation: string;
}

export interface A11yPerformanceTestRule {
  category: 'WCAG 2.2 AA A11y' | 'Core Web Vitals Performance';
  metricOrRule: string;
  automatedTool: string;
  targetThreshold: string;
  failureAction: string;
}

export interface SecurityRlsTestRule {
  ruleId: string;
  targetTableOrFunction: string;
  userRoleContext: string;
  actionAttempted: 'SELECT' | 'INSERT' | 'UPDATE' | 'DELETE' | 'EXECUTE';
  expectedResult: 'ALLOWED (200 OK)' | 'DENIED (403 Forbidden / 0 Rows Affected)' | 'ANONYMIZED';
  lgpdComplianceCheck: string;
}

export interface CicdPipelineStageSpec {
  stageOrder: number;
  stageName: string;
  triggerEvent: string;
  toolsUsed: string[];
  automatedActions: string[];
  blockerCondition: string;
}

export interface SprintAcceptanceCriterion {
  sprintNumber: string;
  sprintGoal: string;
  automatedTestGate: string;
  requiredCoverage: string;
  signoffOwner: string;
}

export interface DodDorChecklistSpec {
  type: 'Definition of Ready (DoR)' | 'Definition of Done (DoD)' | 'Release Production Checklist';
  category: string;
  checkItem: string;
  verificationMethod: string;
  responsibleRole: string;
}

// === UI/UX MASTER PROTOTYPE & SCREEN SPECIFICATION TYPES ===

export interface DesignTokenCategorySpec {
  categoryName: string;
  description: string;
  tokens: { tokenName: string; value: string; usageRule: string }[];
}

export interface MasterComponentSpec {
  componentId: string;
  componentName: string;
  purpose: string;
  propsAndApi: string[];
  supportedStates: string[];
  variations: string[];
  designAndUsageRules: string;
}

export interface ScreenInterfaceStatesSpec {
  emptyState: string;
  firstAccessState: string;
  loadingState: string;
  offlineState: string;
  errorState: string;
  successState: string;
  syncingState: string;
  noResultsState: string;
  incompleteDataState: string;
  noClassAssignedState: string;
  firstWeekState: string;
}

export interface ScreenCognitiveFlowSpec {
  teacherThoughtProcess: string;
  primaryActionDesired: string;
  firstInformationToSee: string;
  whatNeverDistracts: string;
  anxietyReductionStrategy: string;
  cognitiveLoadReductionStrategy: string;
}

export interface ScreenCopywritingSpec {
  buttonsText: string[];
  messagesAndAlerts: string[];
  errorsAndToasts: string[];
  emptyStatesText: string[];
  offlineMessagesText: string[];
  auroraAiMessagesText: string[];
  placeholdersAndTooltips: string[];
}

export interface ScreenResponsivenessSpec {
  desktopLayout: string;
  laptopLayout: string;
  tabletLayout: string;
  mobileLayout: string;
  pwaAndOrientation: string;
}

export interface ScreenAccessibilitySpec {
  keyboardNavigation: string;
  screenReadersAndAria: string;
  contrastAndTouchTargets: string;
  typographyScaleAndZoom: string;
}

export interface ScreenBusinessRulesSpec {
  allowedUserActions: string[];
  forbiddenActions: string[];
  disabledConditions: string[];
  aiSuggestionVsHumanConfirmationRules: string;
}

export interface ScreenAuroraIntegrationSpec {
  whenAppears: string;
  whenSilent: string;
  whenSuggests: string;
  whenAsks: string;
  whenDisappears: string;
  visualNonCompetitionRule: string;
}

export interface MvpScreenMasterSpec {
  screenId: string;
  screenName: string;
  routePath: string;
  // 1. Objective
  objective: {
    problemSolved: string;
    whenItAppears: string;
    connectionToTeacherFlow: string;
  };
  // 2. Complete Layout
  layout: {
    headerSpec: string;
    sidebarSpec: string;
    cardsAndGridSpec: string;
    buttonsInputsIconsSpec: string;
    alertsBreadcrumbsFabSpec: string;
    menusPanelsSpacingSpec: string;
    hierarchyAndResponsiveness: string;
  };
  // 3. Components Used
  componentsUsedIds: string[];
  // 4. Interface States
  states: ScreenInterfaceStatesSpec;
  // 5. Micro-interactions
  microInteractions: {
    hoverAndFocus: string;
    clickAndLoading: string;
    transitionsAndConfirmations: string;
    motionTimingAndEasing: string;
  };
  // 6. Cognitive Flow
  cognitiveFlow: ScreenCognitiveFlowSpec;
  // 7. Copywriting
  copywriting: ScreenCopywritingSpec;
  // 8. Responsiveness
  responsiveness: ScreenResponsivenessSpec;
  // 9. Accessibility
  accessibility: ScreenAccessibilitySpec;
  // 10. Visible Business Rules
  businessRules: ScreenBusinessRulesSpec;
  // 11. Integration with Aurora
  auroraIntegration: ScreenAuroraIntegrationSpec;
  // 12. Perceived Performance
  perceivedPerformance: {
    maskingLatency: string;
    skeletonsAndOptimisticUi: string;
    streamingAndPreloading: string;
  };
  // 13. Acceptance Criteria
  acceptanceCriteria: string[];
}

export interface NavigationFlowNodeSpec {
  fromScreenId: string;
  fromScreenName: string;
  triggerAction: string;
  destinationScreenId: string;
  destinationScreenName: string;
  navigationType: 'Direct Route' | 'Modal Overlay' | 'Slide-over Drawer' | 'Back Return' | 'Keyboard Shortcut';
  shortcutOrKey: string;
}

export interface PostMvpBacklogItem {
  itemId: string;
  title: string;
  category: string;
  rationaleForPostponement: string;
  futureTargetSprint: string;
}

export interface ImplementationSprintStepSpec {
  sprintNumber: string;
  sprintTitle: string;
  primaryObjective: string;
  vsCodeTasks: string[];
  deliverableArtifacts: string[];
  definitionOfDone: string;
}

// === INTERNAL ENGINEERING BLUEPRINT TYPES ===

export interface FolderStructureNode {
  path: string;
  type: 'dir' | 'file';
  description: string;
  responsibility: string;
  layer: 'Presentation' | 'Application / Domain' | 'Infrastructure / Data' | 'Edge Functions / Supabase' | 'Config';
}

export interface TechnicalJourneyStep {
  stepNumber: number;
  stageName: string;
  frontendAction: string;
  stateManagement: string;
  offlineStorageDexie: string;
  syncAndEdgeFunction: string;
  supabaseDbAndRls: string;
  auroraAiAndRealtime: string;
  auditAndErrorHandling: string;
}

export interface ModuleTechnicalJourney {
  moduleId: string;
  moduleName: string;
  primaryGoal: string;
  steps: TechnicalJourneyStep[];
}

export interface LayerResponsibilitySpec {
  layerName: string;
  technologyStack: string;
  coreResponsibilities: string[];
  namingConventions: string;
  codeExamplePattern: string;
}

export interface VsCodeExecutionTask {
  taskId: string;
  sprintPhase: string;
  taskTitle: string;
  targetFiles: string[];
  implementationSteps: string[];
  verificationCommand: string;
  definitionOfDone: string;
}









