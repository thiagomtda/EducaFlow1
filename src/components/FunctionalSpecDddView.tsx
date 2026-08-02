import React, { useState } from 'react';
import { 
  FUNCTIONAL_SPEC_MODULES, 
  DDD_BOUNDED_CONTEXTS, 
  FUNCTIONAL_DEPENDENCY_MATRIX,
  TECHNICAL_ENGINEERING_SUMMARY 
} from '../data/functionalSpecDddData';
import { 
  MvpModuleFunctionalSpec, 
  DddBoundedContext, 
  ImplementationDependencyNode 
} from '../types';
import { 
  FileCode2, 
  Layers, 
  GitMerge, 
  CheckCircle2, 
  Zap, 
  WifiOff, 
  ShieldCheck, 
  Database, 
  Cpu, 
  Lock, 
  AlertTriangle, 
  ArrowRight, 
  Clock, 
  Sparkles, 
  UserCheck, 
  Workflow, 
  ListOrdered, 
  Search, 
  Terminal, 
  BookOpen, 
  CheckSquare,
  Building,
  FileText
} from 'lucide-react';

export const FunctionalSpecDddView: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'functional_spec' | 'ddd_domain_model' | 'dependency_matrix' | 'signoff'>('functional_spec');
  const [selectedModuleId, setSelectedModuleId] = useState<string>(FUNCTIONAL_SPEC_MODULES[0].id);
  const [selectedContextIndex, setSelectedContextIndex] = useState<number>(0);
  const [specSearchQuery, setSpecSearchQuery] = useState<string>('');

  const currentModule: MvpModuleFunctionalSpec = 
    FUNCTIONAL_SPEC_MODULES.find(m => m.id === selectedModuleId) || FUNCTIONAL_SPEC_MODULES[0];

  const currentContext: DddBoundedContext = DDD_BOUNDED_CONTEXTS[selectedContextIndex] || DDD_BOUNDED_CONTEXTS[0];

  const filteredModules = FUNCTIONAL_SPEC_MODULES.filter(m => 
    m.name.toLowerCase().includes(specSearchQuery.toLowerCase()) || 
    m.code.toLowerCase().includes(specSearchQuery.toLowerCase()) ||
    m.objective.toLowerCase().includes(specSearchQuery.toLowerCase())
  );

  return (
    <div className="h-full flex flex-col bg-slate-50 overflow-y-auto">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white border-b border-indigo-900/50 p-6 md:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2.5 py-1 bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 rounded-full text-xs font-semibold tracking-wider uppercase flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5" /> Engenharia & Arquitetura de Software
                </span>
                <span className="px-2.5 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-full text-xs font-semibold">
                  v1.0 Aprovado
                </span>
              </div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                EducaFlow Functional Specification & Domain Model v1.0 (DDD)
              </h1>
              <p className="text-slate-300 text-sm md:text-base mt-1 max-w-3xl">
                Especificação funcional completa dos 7 módulos do MVP (17 aspectos mandatórios), Modelagem de Domínio DDD (Bounded Contexts & Agregados) e Matriz de Dependências Técnicas para Supabase & VS Code.
              </p>
            </div>

            <div className="flex items-center gap-3 bg-slate-800/80 p-3 rounded-xl border border-slate-700/60 backdrop-blur-sm">
              <div className="text-right">
                <div className="text-xs text-slate-400 font-medium">Equipe Técnica Responsável</div>
                <div className="text-xs font-bold text-indigo-200">Principal Architect • Lead Engineer • CPO • DDD Specialist</div>
              </div>
            </div>
          </div>

          {/* Sub-navigation Tabs */}
          <div className="flex items-center gap-2 mt-6 overflow-x-auto pb-1 scrollbar-none border-t border-slate-800/80 pt-4">
            <button
              onClick={() => setActiveSubTab('functional_spec')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all whitespace-nowrap ${
                activeSubTab === 'functional_spec'
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 border border-indigo-500'
                  : 'bg-slate-800/60 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-700/50'
              }`}
            >
              <FileCode2 className="w-4 h-4" />
              1. Especificação Funcional MVP (17 Tópicos)
            </button>

            <button
              onClick={() => setActiveSubTab('ddd_domain_model')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all whitespace-nowrap ${
                activeSubTab === 'ddd_domain_model'
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 border border-indigo-500'
                  : 'bg-slate-800/60 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-700/50'
              }`}
            >
              <Layers className="w-4 h-4" />
              2. Modelo de Domínio DDD (Bounded Contexts)
            </button>

            <button
              onClick={() => setActiveSubTab('dependency_matrix')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all whitespace-nowrap ${
                activeSubTab === 'dependency_matrix'
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 border border-indigo-500'
                  : 'bg-slate-800/60 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-700/50'
              }`}
            >
              <GitMerge className="w-4 h-4" />
              3. Matriz de Dependências & VS Code Roadmap
            </button>

            <button
              onClick={() => setActiveSubTab('signoff')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all whitespace-nowrap ${
                activeSubTab === 'signoff'
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 border border-indigo-500'
                  : 'bg-slate-800/60 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-700/50'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              4. Termo de Homologação da Engenharia
            </button>
          </div>
        </div>
      </div>

      {/* Main Body Area */}
      <div className="max-w-7xl w-full mx-auto p-4 md:p-8 flex-1">
        {/* SUBTAB 1: FUNCTIONAL SPECIFICATION */}
        {activeSubTab === 'functional_spec' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Sidebar list of MVP modules */}
            <div className="lg:col-span-4 space-y-4">
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold text-slate-900 flex items-center gap-2 text-sm">
                    <BookOpen className="w-4 h-4 text-indigo-600" />
                    Módulos Funcionais do MVP (7)
                  </h3>
                  <span className="text-xs bg-indigo-50 text-indigo-700 font-bold px-2 py-0.5 rounded-full border border-indigo-200">
                    Especificados
                  </span>
                </div>

                <div className="relative mb-3">
                  <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Buscar módulo ou código..."
                    value={specSearchQuery}
                    onChange={(e) => setSpecSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div className="space-y-2 max-h-[580px] overflow-y-auto pr-1">
                  {filteredModules.map((m) => {
                    const isSelected = m.id === selectedModuleId;
                    return (
                      <button
                        key={m.id}
                        onClick={() => setSelectedModuleId(m.id)}
                        className={`w-full text-left p-3 rounded-lg transition-all border ${
                          isSelected
                            ? 'bg-indigo-50/90 border-indigo-500 shadow-sm text-indigo-950 font-medium'
                            : 'bg-slate-50/70 hover:bg-slate-100/80 border-slate-200 text-slate-700'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold px-2 py-0.5 rounded bg-indigo-100 text-indigo-800 border border-indigo-200">
                            {m.code}
                          </span>
                          <span className="text-[10px] text-slate-500 font-mono">17 Tópicos OK</span>
                        </div>
                        <h4 className="text-xs font-bold mt-1.5 line-clamp-1">{m.name}</h4>
                        <p className="text-[11px] text-slate-600 line-clamp-2 mt-1 leading-snug">
                          {m.objective}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Detailed View of Selected Module Functional Spec */}
            <div className="lg:col-span-8 space-y-6">
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6">
                {/* Module Header Badge */}
                <div className="border-b border-slate-100 pb-4">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="px-3 py-1 bg-indigo-600 text-white rounded-md text-xs font-mono font-bold tracking-wider">
                      ESPECIFICAÇÃO TÉCNICA • {currentModule.code}
                    </span>
                    <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> V1.0 Ready for Dev
                    </span>
                  </div>
                  <h2 className="text-xl font-extrabold text-slate-900">{currentModule.name}</h2>
                </div>

                {/* 1. Objetivo da Funcionalidade */}
                <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                  <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                    <Zap className="w-4 h-4 text-amber-500" /> 1. Objetivo da Funcionalidade
                  </h3>
                  <p className="text-sm text-slate-800 font-medium leading-relaxed">{currentModule.objective}</p>
                </div>

                {/* 2 & 3. Gatilho & Pré-condições */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-indigo-50/50 p-4 rounded-lg border border-indigo-100">
                    <h3 className="text-xs font-bold text-indigo-900 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                      <ArrowRight className="w-4 h-4 text-indigo-600" /> 2. Gatilho de Entrada
                    </h3>
                    <p className="text-xs text-slate-700 leading-relaxed">{currentModule.triggers}</p>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                    <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                      <CheckSquare className="w-4 h-4 text-indigo-600" /> 3. Pré-condições
                    </h3>
                    <ul className="space-y-1">
                      {currentModule.preconditions.map((pc, idx) => (
                        <li key={idx} className="text-xs text-slate-600 flex items-start gap-1.5">
                          <span className="text-indigo-500 font-bold">•</span>
                          <span>{pc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* 4. Fluxo Principal Passo a Passo */}
                <div>
                  <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Workflow className="w-4 h-4 text-indigo-600" /> 4. Fluxo Principal (Step-by-Step)
                  </h3>
                  <div className="space-y-2">
                    {currentModule.mainFlow.map((step, idx) => (
                      <div key={idx} className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 text-xs text-slate-700 font-mono">
                        {step}
                      </div>
                    ))}
                  </div>
                </div>

                {/* 5. Fluxos Alternativos */}
                <div>
                  <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <ListOrdered className="w-4 h-4 text-indigo-600" /> 5. Fluxos Alternativos
                  </h3>
                  <div className="space-y-3">
                    {currentModule.alternativeFlows.map((alt, idx) => (
                      <div key={idx} className="p-3 bg-amber-50/50 rounded-lg border border-amber-200/80">
                        <div className="text-xs font-bold text-amber-900 mb-1.5">Cenário: {alt.scenario}</div>
                        <ul className="space-y-1 pl-2">
                          {alt.steps.map((st, sidx) => (
                            <li key={sidx} className="text-xs text-amber-800 flex items-start gap-1.5">
                              <span className="text-amber-600 font-bold">›</span>
                              <span>{st}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 6. Exceções e Tratamento de Erros */}
                <div>
                  <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 text-red-500" /> 6. Exceções e Tratamento de Erros
                  </h3>
                  <div className="space-y-2">
                    {currentModule.exceptions.map((exc, idx) => (
                      <div key={idx} className="p-3 bg-red-50/50 rounded-lg border border-red-200 grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                        <div>
                          <span className="font-bold text-red-900 block">Causa do Erro:</span>
                          <span className="text-red-800">{exc.cause}</span>
                        </div>
                        <div>
                          <span className="font-bold text-emerald-900 block">Tratamento de Exceção:</span>
                          <span className="text-emerald-800">{exc.handling}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 7 & 8. Regras de Negócio & Validações Obrigatórias */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                    <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-indigo-600" /> 7. Regras de Negócio (Business Rules)
                    </h3>
                    <ul className="space-y-1.5">
                      {currentModule.businessRules.map((br, idx) => (
                        <li key={idx} className="text-xs text-slate-700 bg-white p-2 rounded border border-slate-200 font-medium">
                          {br}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                    <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <Lock className="w-4 h-4 text-indigo-600" /> 8. Validações Obrigatórias
                    </h3>
                    <ul className="space-y-1.5">
                      {currentModule.requiredValidations.map((val, idx) => (
                        <li key={idx} className="text-xs text-slate-700 bg-white p-2 rounded border border-slate-200 font-medium flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>{val}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* 9, 10, 11. Integrações, Permissões e Eventos de Domínio */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200">
                    <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                      9. Integrações
                    </h3>
                    <ul className="space-y-1">
                      {currentModule.integrations.map((ing, idx) => (
                        <li key={idx} className="text-xs text-slate-600">
                          • {ing}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200">
                    <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                      10. Permissões por Perfil
                    </h3>
                    <div className="space-y-1 text-xs">
                      {currentModule.permissions.map((perm, idx) => (
                        <div key={idx} className="bg-white p-1.5 rounded border border-slate-200">
                          <span className="font-bold text-indigo-900 block">{perm.role}:</span>
                          <span className="text-slate-600">{perm.access}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200">
                    <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                      11. Eventos de Domínio
                    </h3>
                    <div className="space-y-1 text-xs font-mono">
                      {currentModule.domainEvents.map((evt, idx) => (
                        <div key={idx} className="bg-indigo-50 text-indigo-900 p-1.5 rounded border border-indigo-200">
                          ⚡ {evt}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 12 & 13. Estados da UI & Mensagens */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                    <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                      12. Estados da Interface (UI States)
                    </h3>
                    <div className="flex flex-wrap gap-1.5">
                      {currentModule.uiStates.map((st, idx) => (
                        <span key={idx} className="text-xs bg-slate-200 text-slate-800 px-2 py-1 rounded font-mono font-medium">
                          {st}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                    <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                      13. Mensagens Apresentadas ao Usuário
                    </h3>
                    <div className="space-y-1.5 text-xs">
                      {currentModule.userMessages.map((msg, idx) => (
                        <div key={idx} className="bg-white p-2 rounded border border-slate-200">
                          <span className="font-bold text-indigo-700">[{msg.context}]:</span> "{msg.message}"
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 14, 15, 16. Offline, Desempenho & Acessibilidade */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-amber-50/60 p-3.5 rounded-lg border border-amber-200">
                    <h3 className="text-xs font-bold text-amber-900 uppercase tracking-wider mb-1 flex items-center gap-1">
                      <WifiOff className="w-3.5 h-3.5" /> 14. Offline & Sync
                    </h3>
                    <p className="text-xs text-amber-800 leading-relaxed">{currentModule.offlineSyncBehavior}</p>
                  </div>

                  <div className="bg-indigo-50/60 p-3.5 rounded-lg border border-indigo-200">
                    <h3 className="text-xs font-bold text-indigo-900 uppercase tracking-wider mb-1 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> 15. Desempenho
                    </h3>
                    <p className="text-xs text-indigo-800 leading-relaxed">{currentModule.performanceReqs}</p>
                  </div>

                  <div className="bg-emerald-50/60 p-3.5 rounded-lg border border-emerald-200">
                    <h3 className="text-xs font-bold text-emerald-900 uppercase tracking-wider mb-1 flex items-center gap-1">
                      <UserCheck className="w-3.5 h-3.5" /> 16. Acessibilidade
                    </h3>
                    <p className="text-xs text-emerald-800 leading-relaxed">{currentModule.accessibilityReqs}</p>
                  </div>
                </div>

                {/* 17. Critérios de Aceite (Acceptance Criteria) */}
                <div className="bg-emerald-900 text-white p-4 rounded-xl shadow-sm">
                  <h3 className="text-xs font-bold text-emerald-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" /> 17. Critérios de Aceite (Acceptance Criteria)
                  </h3>
                  <div className="space-y-2">
                    {currentModule.acceptanceCriteria.map((ac, idx) => (
                      <div key={idx} className="flex items-start gap-2 bg-emerald-950/60 p-2.5 rounded border border-emerald-800/80 text-xs text-emerald-100">
                        <span className="font-bold text-emerald-400 font-mono">AC-{idx + 1}:</span>
                        <span>{ac}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SUBTAB 2: DDD DOMAIN MODEL */}
        {activeSubTab === 'ddd_domain_model' && (
          <div className="space-y-8">
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
                <div>
                  <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
                    <Layers className="w-5 h-5 text-indigo-600" />
                    Modelagem de Domínio DDD v1.0 (Domain-Driven Design)
                  </h2>
                  <p className="text-xs text-slate-600 mt-1">
                    Divisão rigorosa do ecossistema EducaFlow em Bounded Contexts, Agregados, Raízes de Agregado, Entidades, Objetos de Valor e Invariantes.
                  </p>
                </div>

                <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg">
                  {DDD_BOUNDED_CONTEXTS.map((ctx, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedContextIndex(idx)}
                      className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all ${
                        selectedContextIndex === idx
                          ? 'bg-indigo-600 text-white shadow-sm'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                      }`}
                    >
                      Contexto {idx + 1}
                    </button>
                  ))}
                </div>
              </div>

              {/* Bounded Context Details */}
              <div className="mt-6 space-y-6">
                <div className="bg-gradient-to-r from-indigo-900 to-slate-900 text-white p-5 rounded-xl">
                  <div className="text-xs text-indigo-300 font-mono uppercase font-bold tracking-wider">
                    BOUNDED CONTEXT SELECIONADO
                  </div>
                  <h3 className="text-lg font-bold text-white mt-0.5">{currentContext.contextName}</h3>
                  <p className="text-xs text-slate-300 mt-1">{currentContext.description}</p>
                </div>

                {/* Aggregates inside Bounded Context */}
                <div className="space-y-6">
                  {currentContext.aggregates.map((agg, aggIdx) => (
                    <div key={aggIdx} className="bg-slate-50 p-6 rounded-xl border border-slate-200 space-y-4">
                      <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                        <div>
                          <span className="text-[10px] font-mono font-bold bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded border border-indigo-200">
                            AGGREGATE ROOT
                          </span>
                          <h4 className="text-base font-extrabold text-slate-900 mt-1">{agg.aggregateRoot}</h4>
                        </div>
                        <p className="text-xs text-slate-600 max-w-md text-right">{agg.description}</p>
                      </div>

                      {/* Entities */}
                      <div>
                        <h5 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                          <Database className="w-3.5 h-3.5 text-indigo-600" /> Entidades do Agregado
                        </h5>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {agg.entities.map((ent, eIdx) => (
                            <div key={eIdx} className="bg-white p-3 rounded-lg border border-slate-200 shadow-2xs space-y-2">
                              <div className="flex items-center justify-between">
                                <span className="text-xs font-bold text-indigo-950">{ent.name}</span>
                                <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-medium">
                                  {ent.lifecycle}
                                </span>
                              </div>
                              <div className="text-[11px] font-mono text-slate-600 space-y-0.5">
                                {ent.keyAttributes.map((attr, aIdx) => (
                                  <div key={aIdx} className="bg-slate-50 px-2 py-0.5 rounded text-slate-700">
                                    {attr}
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Value Objects & Invariants */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-white p-4 rounded-lg border border-slate-200">
                          <h5 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                            <Sparkles className="w-3.5 h-3.5 text-indigo-600" /> Objetos de Valor (Value Objects)
                          </h5>
                          <div className="space-y-2">
                            {agg.valueObjects.map((vo, voIdx) => (
                              <div key={voIdx} className="bg-slate-50 p-2 rounded border border-slate-200 text-xs">
                                <span className="font-bold text-slate-900 block">{vo.name}</span>
                                <span className="text-slate-600 font-mono text-[11px]">{vo.attributes.join(', ')}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="bg-amber-50/60 p-4 rounded-lg border border-amber-200">
                          <h5 className="text-xs font-bold text-amber-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                            <ShieldCheck className="w-3.5 h-3.5 text-amber-700" /> Regras de Invariância (Consistency Rules)
                          </h5>
                          <ul className="space-y-1.5">
                            {agg.invariants.map((inv, invIdx) => (
                              <li key={invIdx} className="text-xs text-amber-900 flex items-start gap-1.5 bg-white p-2 rounded border border-amber-200">
                                <span className="text-amber-600 font-bold">•</span>
                                <span>{inv}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SUBTAB 3: DEPENDENCY MATRIX */}
        {activeSubTab === 'dependency_matrix' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
              <div>
                <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
                  <GitMerge className="w-5 h-5 text-indigo-600" />
                  Matriz de Dependências Funcionais & Roadmap de Implementação
                </h2>
                <p className="text-xs text-slate-600 mt-1">
                  Sequenciamento de engenharia para minimizar retrabalho em desenvolvimento local no VS Code e integração com Supabase/PostgreSQL.
                </p>
              </div>

              <div className="overflow-x-auto border border-slate-200 rounded-xl">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-900 text-white font-mono uppercase text-[11px]">
                    <tr>
                      <th className="p-3">Ordem</th>
                      <th className="p-3">Código / Módulo</th>
                      <th className="p-3">Camada (Tier)</th>
                      <th className="p-3">Pré-requisitos</th>
                      <th className="p-3">Tabelas Supabase</th>
                      <th className="p-3">Rota no VS Code</th>
                      <th className="p-3">Mitigação de Risco</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 bg-white">
                    {FUNCTIONAL_DEPENDENCY_MATRIX.map((node: ImplementationDependencyNode) => (
                      <tr key={node.stepOrder} className="hover:bg-slate-50/80 transition-colors">
                        <td className="p-3 font-bold font-mono text-indigo-600">
                          #{node.stepOrder}
                        </td>
                        <td className="p-3">
                          <div className="font-bold text-slate-900">{node.moduleCode}</div>
                          <div className="text-[11px] text-slate-600">{node.moduleName}</div>
                        </td>
                        <td className="p-3">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            node.tier.includes('Layer 1') ? 'bg-indigo-100 text-indigo-800 border border-indigo-200' :
                            node.tier.includes('Layer 2') ? 'bg-amber-100 text-amber-800 border border-amber-200' :
                            node.tier.includes('Layer 3') ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' :
                            'bg-purple-100 text-purple-800 border border-purple-200'
                          }`}>
                            {node.tier}
                          </span>
                        </td>
                        <td className="p-3 text-slate-600">
                          {node.prerequisites.join(', ')}
                        </td>
                        <td className="p-3 font-mono text-slate-700 bg-slate-50">
                          {node.supabaseTables.join(', ')}
                        </td>
                        <td className="p-3 font-mono text-[11px] text-indigo-700 bg-indigo-50/50">
                          {node.vscodePath}
                        </td>
                        <td className="p-3 text-slate-700 text-[11px]">
                          {node.riskMitigation}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* SUBTAB 4: SIGNOFF */}
        {activeSubTab === 'signoff' && (
          <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm space-y-6">
            <div className="border-b border-slate-200 pb-4">
              <span className="text-xs font-mono font-bold bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full border border-emerald-200">
                TERMO DE HOMOLOGAÇÃO DE ENGENHARIA
              </span>
              <h2 className="text-2xl font-extrabold text-slate-900 mt-2">
                Aprovação Final da Especificação Funcional & Modelo DDD v1.0
              </h2>
              <p className="text-sm text-slate-600 mt-1">
                Certificação formal de prontidão técnica para início de codificação no Visual Studio Code e provisionamento de banco de dados.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-3">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-indigo-600" /> Estilo de Arquitetura Aprovado
                </h3>
                <p className="text-xs text-slate-700 leading-relaxed">
                  {TECHNICAL_ENGINEERING_SUMMARY.architectureStyle}
                </p>

                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 pt-2">
                  <Layers className="w-4 h-4 text-indigo-600" /> Princípios DDD Aplicados
                </h3>
                <p className="text-xs text-slate-700 leading-relaxed">
                  {TECHNICAL_ENGINEERING_SUMMARY.dddPrinciplesApplied}
                </p>
              </div>

              <div className="bg-emerald-50 p-5 rounded-xl border border-emerald-200 space-y-3">
                <h3 className="text-sm font-bold text-emerald-950 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Veredito da Engenharia de Software
                </h3>
                <p className="text-xs text-emerald-900 leading-relaxed font-medium">
                  {TECHNICAL_ENGINEERING_SUMMARY.readinessVerdict}
                </p>

                <div className="pt-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-sm shadow-sm">
                    EF
                  </div>
                  <div>
                    <div className="text-xs font-bold text-emerald-950">EducaFlow Tech Board</div>
                    <div className="text-[11px] text-emerald-800">Principal Architect & Senior PO</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
