import React, { useState } from 'react';
import { 
  TESTING_STRATEGY_PYRAMID,
  MODULE_COVERAGE_TARGETS,
  AURORA_AI_TEST_SUITE,
  OFFLINE_SYNC_TEST_SCENARIOS,
  A11Y_PERFORMANCE_TEST_RULES,
  SECURITY_RLS_TEST_RULES,
  CICD_PIPELINE_STAGES,
  SPRINT_ACCEPTANCE_CRITERIA_LIST,
  DOD_DOR_CHECKLIST_SUITE,
  QA_DEVOPS_SIGNOFF_DECLARATION
} from '../data/qaTestingCicdData';
import { 
  ShieldCheck, 
  CheckCircle2, 
  Terminal, 
  Cpu, 
  Layers, 
  WifiOff, 
  Lock, 
  GitBranch, 
  ListCheck, 
  Award, 
  Sparkles, 
  Zap, 
  BarChart3, 
  Code2, 
  AlertTriangle, 
  CheckSquare, 
  RefreshCw, 
  Eye, 
  Copy, 
  Check, 
  Activity, 
  FileCheck,
  Server,
  Smartphone
} from 'lucide-react';

export const QaTestingCicdView: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<
    'testing_pyramid' | 'module_coverage' | 'aurora_ai_tests' | 'offline_sync_tests' | 'a11y_performance' | 'security_rls_lgpd' | 'cicd_pipeline' | 'sprint_gates_dod'
  >('testing_pyramid');

  const [copiedCodeLabel, setCopiedCodeLabel] = useState<string | null>(null);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCodeLabel(label);
    setTimeout(() => setCopiedCodeLabel(null), 2000);
  };

  return (
    <div className="h-full flex flex-col bg-slate-50 overflow-y-auto">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 text-white border-b border-indigo-900/50 p-6 md:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2.5 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-full text-xs font-semibold tracking-wider uppercase flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> QA & Testing Blueprint v1.0
                </span>
                <span className="px-2.5 py-1 bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 rounded-full text-xs font-semibold">
                  GitHub Actions CI/CD
                </span>
                <span className="px-2.5 py-1 bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded-full text-xs font-semibold">
                  WCAG 2.2 AA Automated
                </span>
              </div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                EducaFlow QA, Testing & CI/CD Blueprint v1.0
              </h1>
              <p className="text-slate-300 text-sm md:text-base mt-1 max-w-3xl">
                Estratégia completa de testes automatizados (Unitários, Integração, E2E, IA Aurora, Offline-First, Acessibilidade WCAG 2.2 AA, RLS e Performance) com Pipeline CI/CD em 5 Estágios.
              </p>
            </div>

            <div className="flex items-center gap-3 bg-slate-900/90 p-3.5 rounded-xl border border-slate-800 backdrop-blur-sm">
              <div className="text-right">
                <div className="text-xs text-slate-400 font-medium">Liderança de Qualidade & DevOps</div>
                <div className="text-xs font-bold text-emerald-400">Principal QA Architect & SDET Lead</div>
              </div>
            </div>
          </div>

          {/* Sub-Navigation Tabs */}
          <div className="flex items-center gap-2 mt-6 overflow-x-auto pb-1 scrollbar-none border-t border-slate-800/80 pt-4">
            <button
              onClick={() => setActiveSubTab('testing_pyramid')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                activeSubTab === 'testing_pyramid'
                  ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20 font-bold'
                  : 'bg-slate-800/60 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-700/50'
              }`}
            >
              <Cpu className="w-4 h-4" />
              1. Pirâmide de Testes
            </button>

            <button
              onClick={() => setActiveSubTab('module_coverage')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                activeSubTab === 'module_coverage'
                  ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20 font-bold'
                  : 'bg-slate-800/60 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-700/50'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              2. Cobertura por Módulo
            </button>

            <button
              onClick={() => setActiveSubTab('aurora_ai_tests')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                activeSubTab === 'aurora_ai_tests'
                  ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20 font-bold'
                  : 'bg-slate-800/60 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-700/50'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              3. Testes da IA Aurora
            </button>

            <button
              onClick={() => setActiveSubTab('offline_sync_tests')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                activeSubTab === 'offline_sync_tests'
                  ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20 font-bold'
                  : 'bg-slate-800/60 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-700/50'
              }`}
            >
              <WifiOff className="w-4 h-4" />
              4. Testes Offline & Dexie
            </button>

            <button
              onClick={() => setActiveSubTab('a11y_performance')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                activeSubTab === 'a11y_performance'
                  ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20 font-bold'
                  : 'bg-slate-800/60 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-700/50'
              }`}
            >
              <Zap className="w-4 h-4" />
              5. WCAG 2.2 AA & Web Vitals
            </button>

            <button
              onClick={() => setActiveSubTab('security_rls_lgpd')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                activeSubTab === 'security_rls_lgpd'
                  ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20 font-bold'
                  : 'bg-slate-800/60 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-700/50'
              }`}
            >
              <Lock className="w-4 h-4" />
              6. Segurança & RLS Tests
            </button>

            <button
              onClick={() => setActiveSubTab('cicd_pipeline')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                activeSubTab === 'cicd_pipeline'
                  ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20 font-bold'
                  : 'bg-slate-800/60 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-700/50'
              }`}
            >
              <GitBranch className="w-4 h-4" />
              7. Pipeline CI/CD GitHub Actions
            </button>

            <button
              onClick={() => setActiveSubTab('sprint_gates_dod')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                activeSubTab === 'sprint_gates_dod'
                  ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20 font-bold'
                  : 'bg-slate-800/60 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-700/50'
              }`}
            >
              <ListCheck className="w-4 h-4" />
              8. Sprint Gates, DoD & DoR
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl w-full mx-auto p-4 md:p-8 flex-1">
        {/* SUBTAB 1: TESTING PYRAMID */}
        {activeSubTab === 'testing_pyramid' && (
          <div className="space-y-8">
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
              <div className="border-b border-slate-100 pb-3">
                <span className="text-xs font-mono font-bold bg-emerald-100 text-emerald-900 px-2.5 py-0.5 rounded border border-emerald-200">
                  ESTRATÉGIA MULTICAMADAS DE GARANTIA DE QUALIDADE
                </span>
                <h2 className="text-xl font-extrabold text-slate-900 mt-1">
                  Pirâmide de Testes Automatizados do EducaFlow
                </h2>
                <p className="text-xs text-slate-600 mt-1">
                  Arquitetura de testes estruturada para identificar erros no menor tempo possível, combinando velocidade de feedback e máxima fidelidade de execução.
                </p>
              </div>

              <div className="space-y-4">
                {TESTING_STRATEGY_PYRAMID.map((lvl, idx) => (
                  <div key={idx} className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-2.5">
                      <div>
                        <span className="text-xs font-extrabold text-slate-900">{lvl.level}</span>
                        <h3 className="text-sm font-bold text-indigo-900 mt-0.5">{lvl.testType}</h3>
                      </div>
                      <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">
                        Meta: {lvl.coverageTarget}
                      </span>
                    </div>

                    <p className="text-xs text-slate-700 leading-relaxed">{lvl.description}</p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs pt-1">
                      <div className="bg-white p-2.5 rounded border border-slate-200">
                        <span className="text-[10px] text-slate-500 font-bold uppercase block mb-1">Ferramentas / Frameworks:</span>
                        <div className="flex flex-wrap gap-1">
                          {lvl.frameworkTools.map((ft, i) => (
                            <span key={i} className="px-2 py-0.5 bg-slate-100 text-slate-800 font-mono text-[10px] font-bold rounded border border-slate-300">
                              {ft}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="bg-white p-2.5 rounded border border-slate-200">
                        <span className="text-[10px] text-slate-500 font-bold uppercase block mb-1">Frequência de Execução:</span>
                        <span className="font-semibold text-slate-800">{lvl.executionFrequency}</span>
                      </div>

                      <div className="bg-white p-2.5 rounded border border-slate-200">
                        <span className="text-[10px] text-slate-500 font-bold uppercase block mb-1">Foco de Validação:</span>
                        <span className="text-slate-700">{lvl.scopeAndFocus}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* SUBTAB 2: MODULE COVERAGE TARGETS */}
        {activeSubTab === 'module_coverage' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
              <div className="border-b border-slate-100 pb-3">
                <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-indigo-600" />
                  Metas Mínimas de Cobertura por Módulo do MVP
                </h2>
                <p className="text-xs text-slate-600 mt-1">
                  Limiares obrigatórios de cobertura de código exigidos para aprovação de PRs nos módulos funcionais.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {MODULE_COVERAGE_TARGETS.map((mod) => (
                  <div key={mod.moduleId} className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                      <div>
                        <span className="text-[10px] font-mono text-indigo-800 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200 font-bold">
                          {mod.moduleId}
                        </span>
                        <h3 className="text-sm font-extrabold text-slate-900 mt-1">{mod.moduleName}</h3>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-center text-xs">
                      <div className="bg-white p-2 rounded border border-slate-200">
                        <span className="text-[10px] text-slate-500 block font-bold">Unitários</span>
                        <span className="font-mono font-extrabold text-emerald-600 text-sm">{mod.unitCoverage}%</span>
                      </div>
                      <div className="bg-white p-2 rounded border border-slate-200">
                        <span className="text-[10px] text-slate-500 block font-bold">Integração</span>
                        <span className="font-mono font-extrabold text-indigo-600 text-sm">{mod.integrationCoverage}%</span>
                      </div>
                      <div className="bg-white p-2 rounded border border-slate-200">
                        <span className="text-[10px] text-slate-500 block font-bold">E2E Critical</span>
                        <span className="font-mono font-extrabold text-amber-600 text-sm">{mod.e2eCoverage}%</span>
                      </div>
                    </div>

                    <div>
                      <span className="text-[10px] text-slate-500 font-bold uppercase block mb-1">Caminhos Críticos Testados:</span>
                      <ul className="space-y-1">
                        {mod.criticalPathsToTest.map((cp, idx) => (
                          <li key={idx} className="text-xs text-slate-700 flex items-start gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                            <span>{cp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* SUBTAB 3: AURORA AI TESTS */}
        {activeSubTab === 'aurora_ai_tests' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
              <div className="border-b border-slate-100 pb-3">
                <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-amber-500" />
                  Testes Especializados para a IA Aurora & Avaliação de Prompts
                </h2>
                <p className="text-xs text-slate-600 mt-1">
                  Suíte de validação contínua (Promptfoo + Gemini Evaluator) garantindo precisão BNCC, tom humano, guardrails de segurança e zero alucinações.
                </p>
              </div>

              <div className="space-y-4">
                {AURORA_AI_TEST_SUITE.map((ait) => (
                  <div key={ait.testId} className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold bg-slate-900 text-white px-2 py-0.5 rounded">
                          {ait.testId}
                        </span>
                        <span className="text-xs font-bold text-slate-900">{ait.testName}</span>
                      </div>
                      <span className="text-[10px] font-mono font-bold text-amber-900 bg-amber-100 px-2.5 py-0.5 rounded border border-amber-300">
                        {ait.testCategory}
                      </span>
                    </div>

                    <div className="bg-white p-3 rounded border border-slate-200 font-mono text-xs text-slate-800 space-y-1">
                      <span className="text-slate-500 font-bold block text-[10px]">PROMPT / CONTEXTO DE ENTRADA:</span>
                      <p className="italic">{ait.inputPromptOrContext}</p>
                    </div>

                    <div className="text-xs text-slate-700 space-y-1">
                      <span className="font-bold text-slate-900 block">Comportamento Esperado:</span>
                      <p>{ait.expectedBehaviorOrOutput}</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
                      <div className="bg-emerald-50/70 p-2.5 rounded border border-emerald-200">
                        <span className="text-[10px] text-emerald-900 font-bold uppercase block">Métrica de Avaliação:</span>
                        <span className="text-emerald-950 font-semibold">{ait.evaluationMetric}</span>
                      </div>
                      <div className="bg-indigo-50/70 p-2.5 rounded border border-indigo-200">
                        <span className="text-[10px] text-indigo-900 font-bold uppercase block">Critério de Passagem:</span>
                        <span className="text-indigo-950 font-semibold">{ait.passCriteria}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* SUBTAB 4: OFFLINE SYNC TESTS */}
        {activeSubTab === 'offline_sync_tests' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
              <div className="border-b border-slate-100 pb-3">
                <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
                  <WifiOff className="w-5 h-5 text-amber-600" />
                  Cenários de Teste Offline-First, Dexie.js e Sincronização
                </h2>
                <p className="text-xs text-slate-600 mt-1">
                  Validação automatizada no Playwright simulando perda repentina de sinal, gravações no IndexedDB e drenagem da fila.
                </p>
              </div>

              <div className="space-y-4">
                {OFFLINE_SYNC_TEST_SCENARIOS.map((sc) => (
                  <div key={sc.scenarioId} className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold bg-amber-900 text-amber-100 px-2 py-0.5 rounded">
                          {sc.scenarioId}
                        </span>
                        <h3 className="text-xs font-bold text-slate-900">{sc.title}</h3>
                      </div>
                      <span className="text-[10px] font-mono font-bold text-slate-800 bg-slate-200 px-2.5 py-0.5 rounded border border-slate-300">
                        {sc.networkCondition}
                      </span>
                    </div>

                    <div className="text-xs text-slate-700">
                      <span className="font-bold text-slate-900 block mb-0.5">Ação do Teste:</span>
                      <p>{sc.testAction}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs pt-1">
                      <div className="bg-white p-3 rounded border border-slate-200 space-y-1">
                        <span className="text-[10px] text-slate-500 font-bold uppercase block">Comportamento Esperado no Dexie.js:</span>
                        <p className="text-slate-800">{sc.expectedDexieBehavior}</p>
                      </div>
                      <div className="bg-emerald-50 p-3 rounded border border-emerald-200 space-y-1">
                        <span className="text-[10px] text-emerald-900 font-bold uppercase block">Validação do Engine de Sincronização:</span>
                        <p className="text-emerald-950 font-semibold">{sc.syncEngineValidation}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* SUBTAB 5: A11Y & PERFORMANCE */}
        {activeSubTab === 'a11y_performance' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
              <div className="border-b border-slate-100 pb-3">
                <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-emerald-600" />
                  Regras de Teste de Acessibilidade (WCAG 2.2 AA) & Performance
                </h2>
                <p className="text-xs text-slate-600 mt-1">
                  Verificação contínua automatizada via axe-core e Lighthouse CI garantindo experiência universal e carregamento em sub-segundo.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {A11Y_PERFORMANCE_TEST_RULES.map((rule, idx) => (
                  <div key={idx} className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3 text-xs">
                    <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                      <span className="font-bold text-slate-900">{rule.metricOrRule}</span>
                      <span className="text-[10px] font-mono font-bold text-indigo-900 bg-indigo-100 px-2 py-0.5 rounded">
                        {rule.category}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <span className="text-slate-500 font-bold block text-[10px]">Ferramenta Automatizada:</span>
                      <span className="font-mono text-slate-800">{rule.automatedTool}</span>
                    </div>

                    <div className="bg-emerald-50 p-2.5 rounded border border-emerald-200 font-bold text-emerald-950">
                      Target Limiar: {rule.targetThreshold}
                    </div>

                    <div className="text-red-900 text-[11px] font-semibold bg-red-50 p-2 rounded border border-red-200">
                      Ação em Falha: {rule.failureAction}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* SUBTAB 6: SECURITY & RLS TESTS */}
        {activeSubTab === 'security_rls_lgpd' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
              <div className="border-b border-slate-100 pb-3">
                <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
                  <Lock className="w-5 h-5 text-indigo-600" />
                  Suíte de Testes de Segurança, RLS PostgreSQL e Conformidade LGPD
                </h2>
                <p className="text-xs text-slate-600 mt-1">
                  Validação rigorosa de permissões no nível do banco de dados (Row Level Security) garantindo isolamento total de dados entre escolas e turmas.
                </p>
              </div>

              <div className="space-y-3">
                {SECURITY_RLS_TEST_RULES.map((sec) => (
                  <div key={sec.ruleId} className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2 text-xs">
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold bg-slate-900 text-white px-2 py-0.5 rounded text-[11px]">
                          {sec.ruleId}
                        </span>
                        <span className="font-mono font-bold text-indigo-900">{sec.targetTableOrFunction}</span>
                      </div>
                      <span className="px-2.5 py-0.5 font-mono text-[10px] font-bold rounded border bg-emerald-100 text-emerald-900 border-emerald-300">
                        Ação: {sec.actionAttempted}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 pt-1">
                      <div className="bg-white p-2.5 rounded border border-slate-200">
                        <span className="text-[10px] text-slate-500 font-bold block">Contexto do Papel:</span>
                        <span className="font-semibold text-slate-800">{sec.userRoleContext}</span>
                      </div>

                      <div className="bg-white p-2.5 rounded border border-slate-200">
                        <span className="text-[10px] text-slate-500 font-bold block">Resultado Esperado RLS:</span>
                        <span className="font-mono font-bold text-indigo-800">{sec.expectedResult}</span>
                      </div>

                      <div className="bg-emerald-50 p-2.5 rounded border border-emerald-200">
                        <span className="text-[10px] text-emerald-900 font-bold block">Validação LGPD:</span>
                        <span className="text-emerald-950">{sec.lgpdComplianceCheck}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* SUBTAB 7: CICD PIPELINE */}
        {activeSubTab === 'cicd_pipeline' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
              <div className="border-b border-slate-100 pb-3">
                <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
                  <GitBranch className="w-5 h-5 text-indigo-600" />
                  Pipeline CI/CD Automatizado em 5 Estágios (GitHub Actions)
                </h2>
                <p className="text-xs text-slate-600 mt-1">
                  Mecanismo automatizado de integração e entrega contínua com validação estrita a cada commit e deploy automático de preview.
                </p>
              </div>

              <div className="space-y-4">
                {CICD_PIPELINE_STAGES.map((stg) => (
                  <div key={stg.stageOrder} className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-2">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-slate-900 text-white font-mono text-xs font-bold flex items-center justify-center">
                          {stg.stageOrder}
                        </span>
                        <h3 className="text-sm font-extrabold text-slate-900">{stg.stageName}</h3>
                      </div>
                      <span className="text-[10px] font-mono text-indigo-900 bg-indigo-50 px-2.5 py-0.5 rounded border border-indigo-200 font-bold">
                        Gatilho: {stg.triggerEvent}
                      </span>
                    </div>

                    <div>
                      <span className="text-[10px] text-slate-500 font-bold uppercase block mb-1">Ações Automatizadas Executadas:</span>
                      <ul className="space-y-1">
                        {stg.automatedActions.map((act, i) => (
                          <li key={i} className="text-xs text-slate-700 flex items-start gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                            <span>{act}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs pt-1">
                      <div className="bg-white p-2.5 rounded border border-slate-200">
                        <span className="text-[10px] text-slate-500 font-bold uppercase block mb-1">Ferramentas Utilizadas:</span>
                        <div className="flex flex-wrap gap-1">
                          {stg.toolsUsed.map((tu, i) => (
                            <span key={i} className="px-2 py-0.5 bg-slate-100 text-slate-800 font-mono text-[10px] font-bold rounded border border-slate-300">
                              {tu}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="bg-red-50 p-2.5 rounded border border-red-200 text-red-950 font-semibold">
                        <span className="text-[10px] text-red-800 font-bold uppercase block mb-0.5">Condição de Bloqueio (Quality Gate):</span>
                        {stg.blockerCondition}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* SUBTAB 8: SPRINT GATES, DOD & DOR */}
        {activeSubTab === 'sprint_gates_dod' && (
          <div className="space-y-8">
            {/* Sprint Gates */}
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
              <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
                <ListCheck className="w-5 h-5 text-emerald-600" />
                Critérios de Aceite Automatizados por Sprint (Quality Gates)
              </h2>

              <div className="space-y-3">
                {SPRINT_ACCEPTANCE_CRITERIA_LIST.map((sp) => (
                  <div key={sp.sprintNumber} className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2 text-xs">
                    <div className="flex items-center justify-between border-b border-slate-200 pb-1.5">
                      <span className="font-mono font-bold text-indigo-900">{sp.sprintNumber} - {sp.sprintGoal}</span>
                      <span className="px-2 py-0.5 bg-emerald-100 text-emerald-900 font-mono text-[10px] font-bold rounded border border-emerald-300">
                        {sp.requiredCoverage}
                      </span>
                    </div>

                    <p className="text-slate-800"><span className="font-bold">Gate de Teste Automatizado:</span> {sp.automatedTestGate}</p>
                    <p className="text-slate-500 font-semibold text-[11px]">Responsável pela Homologação: {sp.signoffOwner}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* DoR & DoD Checklists */}
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
              <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
                <CheckSquare className="w-5 h-5 text-indigo-600" />
                Definition of Ready (DoR), Definition of Done (DoD) & Release Checklist
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {DOD_DOR_CHECKLIST_SUITE.map((chk, idx) => (
                  <div key={idx} className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2 text-xs">
                    <div className="flex items-center justify-between border-b border-slate-200 pb-1.5">
                      <span className="font-bold text-slate-900">{chk.type}</span>
                      <span className="text-[10px] font-mono text-indigo-800 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200 font-bold">
                        {chk.category}
                      </span>
                    </div>

                    <p className="text-slate-800 font-medium">{chk.checkItem}</p>

                    <div className="bg-white p-2 rounded border border-slate-200 text-slate-600 text-[11px]">
                      <span className="font-bold block text-slate-900">Método de Verificação:</span> {chk.verificationMethod}
                    </div>

                    <p className="text-[10px] text-slate-500 font-bold">Responsável: {chk.responsibleRole}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* QA & DevOps Lead Signoff Declaration */}
            <div className="bg-slate-950 text-white p-6 rounded-xl border border-slate-800 space-y-4 shadow-sm">
              <div className="border-b border-slate-800 pb-3">
                <span className="text-xs font-mono font-bold bg-amber-500/20 text-amber-300 px-2.5 py-0.5 rounded border border-amber-500/30">
                  DECLARAÇÃO DE HOMOLOGAÇÃO TÉCNICA DE QUALIDADE
                </span>
                <h3 className="text-lg font-extrabold text-white mt-1">{QA_DEVOPS_SIGNOFF_DECLARATION.signoffTitle}</h3>
                <p className="text-xs text-slate-400">Data: {QA_DEVOPS_SIGNOFF_DECLARATION.signoffDate}</p>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed italic">
                "{QA_DEVOPS_SIGNOFF_DECLARATION.signoffBody}"
              </p>

              <div className="grid grid-cols-2 md:grid-cols-5 gap-2 pt-2">
                {QA_DEVOPS_SIGNOFF_DECLARATION.signoffRoles.map((ldr, idx) => (
                  <div key={idx} className="bg-slate-900 p-2.5 rounded border border-slate-800 text-[10px]">
                    <span className="font-bold text-slate-200 block">{ldr.role}</span>
                    <span className="text-emerald-400 font-mono font-bold">{ldr.status}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
