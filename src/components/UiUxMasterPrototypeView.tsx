import React, { useState } from 'react';
import {
  FINAL_DESIGN_TOKENS,
  MASTER_COMPONENTS_LIBRARY,
  MVP_SCREENS_MASTER_LIST,
  NAVIGATION_FLOWCHART_MAP,
  POST_MVP_BACKLOG,
  VSCODE_IMPLEMENTATION_PLAN,
  DISCOVERY_CLOSING_DECLARATION
} from '../data/uiUxMasterData';
import {
  Layout,
  Layers,
  Monitor,
  Smartphone,
  Sparkles,
  GitBranch,
  ListCheck,
  CheckCircle2,
  FileText,
  ShieldCheck,
  Zap,
  Eye,
  Sliders,
  Cpu,
  Lock,
  WifiOff,
  Code2,
  Terminal,
  ArrowRight,
  ChevronRight,
  ChevronDown,
  Info,
  CheckSquare,
  Award,
  MousePointer,
  Maximize2,
  Minimize2,
  Search,
  BookOpen,
  Send,
  Download,
  AlertTriangle,
  Clock,
  Palette
} from 'lucide-react';

export const UiUxMasterPrototypeView: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<
    'design_tokens' | 'component_library' | 'mvp_screens' | 'nav_flowchart' | 'post_mvp_backlog' | 'vscode_sprints' | 'closing_signoff'
  >('mvp_screens');

  const [selectedScreenId, setSelectedScreenId] = useState<string>('SCREEN-02');
  const [selectedScreenTab, setSelectedScreenTab] = useState<
    'objective_layout' | 'states_micro' | 'cognitive_copy' | 'a11y_responsive' | 'rules_aurora' | 'perf_criteria'
  >('objective_layout');

  const selectedScreen = MVP_SCREENS_MASTER_LIST.find((s) => s.screenId === selectedScreenId) || MVP_SCREENS_MASTER_LIST[0];

  return (
    <div className="h-full flex flex-col bg-slate-50 overflow-y-auto">
      {/* Top Banner Header */}
      <div className="bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-900 text-white border-b border-indigo-900/50 p-6 md:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2.5 py-1 bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded-full text-xs font-semibold tracking-wider uppercase flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-amber-400" /> Documento Oficial Definitivo v1.0
                </span>
                <span className="px-2.5 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-full text-xs font-semibold">
                  UI/UX Master Specification
                </span>
                <span className="px-2.5 py-1 bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 rounded-full text-xs font-semibold">
                  10 Telas do MVP em 13 Dimensões
                </span>
              </div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                EducaFlow Complete UI/UX Master Prototype & Screen Specification v1.0
              </h1>
              <p className="text-slate-300 text-sm md:text-base mt-1 max-w-4xl">
                O guia oficial definitivo para o desenvolvimento da interface em React/Next.js. Especificação completa de layout, estados, microinterações, copywriting, acessibilidade e integração com a IA Aurora.
              </p>
            </div>

            <div className="flex items-center gap-3 bg-slate-900/90 p-3.5 rounded-xl border border-slate-800 backdrop-blur-sm">
              <div className="text-right">
                <div className="text-xs text-slate-400 font-medium">Equipe Multidisciplinar Responsável</div>
                <div className="text-xs font-bold text-amber-400">UX Architecture, Product & Engineering</div>
              </div>
            </div>
          </div>

          {/* Sub-Navigation Tabs */}
          <div className="flex items-center gap-2 mt-6 overflow-x-auto pb-1 scrollbar-none border-t border-slate-800/80 pt-4">
            <button
              onClick={() => setActiveSubTab('mvp_screens')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                activeSubTab === 'mvp_screens'
                  ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20 font-bold'
                  : 'bg-slate-800/60 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-700/50'
              }`}
            >
              <Monitor className="w-4 h-4" />
              1. 10 Telas Mestre do MVP (13 Dimensões)
            </button>

            <button
              onClick={() => setActiveSubTab('component_library')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                activeSubTab === 'component_library'
                  ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20 font-bold'
                  : 'bg-slate-800/60 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-700/50'
              }`}
            >
              <Layers className="w-4 h-4" />
              2. Biblioteca Mestra de Componentes
            </button>

            <button
              onClick={() => setActiveSubTab('design_tokens')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                activeSubTab === 'design_tokens'
                  ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20 font-bold'
                  : 'bg-slate-800/60 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-700/50'
              }`}
            >
              <Palette className="w-4 h-4" />
              3. Design Tokens Finais
            </button>

            <button
              onClick={() => setActiveSubTab('nav_flowchart')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                activeSubTab === 'nav_flowchart'
                  ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20 font-bold'
                  : 'bg-slate-800/60 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-700/50'
              }`}
            >
              <GitBranch className="w-4 h-4" />
              4. Fluxograma Visual de Navegação
            </button>

            <button
              onClick={() => setActiveSubTab('post_mvp_backlog')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                activeSubTab === 'post_mvp_backlog'
                  ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20 font-bold'
                  : 'bg-slate-800/60 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-700/50'
              }`}
            >
              <ListCheck className="w-4 h-4" />
              5. Backlog Pós-MVP
            </button>

            <button
              onClick={() => setActiveSubTab('vscode_sprints')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                activeSubTab === 'vscode_sprints'
                  ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20 font-bold'
                  : 'bg-slate-800/60 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-700/50'
              }`}
            >
              <Terminal className="w-4 h-4" />
              6. Plano VS Code (Sprints 0 a 6+)
            </button>

            <button
              onClick={() => setActiveSubTab('closing_signoff')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                activeSubTab === 'closing_signoff'
                  ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20 font-bold'
                  : 'bg-slate-800/60 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-700/50'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              7. Homologação & Encerramento
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Body */}
      <div className="max-w-7xl w-full mx-auto p-4 md:p-8 flex-1">
        {/* SUBTAB 1: 10 MVP SCREENS MASTER SPECIFICATIONS */}
        {activeSubTab === 'mvp_screens' && (
          <div className="space-y-6">
            {/* Screen Selector Header Cards */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-3">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                Selecione a Tela Oficial do MVP para Inspecionar os Requisitos Definitivos (13 Dimensões):
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-5 md:grid-cols-10 gap-2">
                {MVP_SCREENS_MASTER_LIST.map((sc) => (
                  <button
                    key={sc.screenId}
                    onClick={() => setSelectedScreenId(sc.screenId)}
                    className={`p-2.5 rounded-lg text-left transition-all border ${
                      selectedScreenId === sc.screenId
                        ? 'bg-amber-50 border-amber-500 text-amber-950 shadow-sm font-bold ring-2 ring-amber-400/50'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100 hover:border-slate-300'
                    }`}
                  >
                    <span className="text-[10px] font-mono font-bold block text-slate-500">{sc.screenId}</span>
                    <span className="text-xs font-bold truncate block">{sc.screenName}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Selected Screen Inspector */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden space-y-0">
              {/* Screen Title Bar */}
              <div className="bg-slate-900 text-white p-6 flex flex-wrap items-center justify-between gap-4 border-b border-slate-800">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-xs font-bold bg-amber-500 text-slate-950 px-2 py-0.5 rounded">
                      {selectedScreen.screenId}
                    </span>
                    <span className="font-mono text-xs text-indigo-300 bg-indigo-950/80 px-2.5 py-0.5 rounded border border-indigo-800">
                      Rota: {selectedScreen.routePath}
                    </span>
                  </div>
                  <h2 className="text-xl md:text-2xl font-extrabold text-white">{selectedScreen.screenName}</h2>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400 font-medium">Especificação Mestra 100% Homologada</span>
                </div>
              </div>

              {/* Screen Dimension Sub-Tabs */}
              <div className="bg-slate-100 border-b border-slate-200 p-2 flex items-center gap-1.5 overflow-x-auto scrollbar-none">
                <button
                  onClick={() => setSelectedScreenTab('objective_layout')}
                  className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all whitespace-nowrap ${
                    selectedScreenTab === 'objective_layout'
                      ? 'bg-white text-slate-900 shadow-sm border border-slate-200'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  1 & 2. Objetivo & Layout
                </button>

                <button
                  onClick={() => setSelectedScreenTab('states_micro')}
                  className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all whitespace-nowrap ${
                    selectedScreenTab === 'states_micro'
                      ? 'bg-white text-slate-900 shadow-sm border border-slate-200'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  4 & 5. Estados & Microinterações
                </button>

                <button
                  onClick={() => setSelectedScreenTab('cognitive_copy')}
                  className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all whitespace-nowrap ${
                    selectedScreenTab === 'cognitive_copy'
                      ? 'bg-white text-slate-900 shadow-sm border border-slate-200'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  6 & 7. Fluxo Cognitivo & Copywriting
                </button>

                <button
                  onClick={() => setSelectedScreenTab('a11y_responsive')}
                  className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all whitespace-nowrap ${
                    selectedScreenTab === 'a11y_responsive'
                      ? 'bg-white text-slate-900 shadow-sm border border-slate-200'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  8 & 9. Responsividade & Acessibilidade
                </button>

                <button
                  onClick={() => setSelectedScreenTab('rules_aurora')}
                  className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all whitespace-nowrap ${
                    selectedScreenTab === 'rules_aurora'
                      ? 'bg-white text-slate-900 shadow-sm border border-slate-200'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  10 & 11. Regras & Integração Aurora
                </button>

                <button
                  onClick={() => setSelectedScreenTab('perf_criteria')}
                  className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all whitespace-nowrap ${
                    selectedScreenTab === 'perf_criteria'
                      ? 'bg-white text-slate-900 shadow-sm border border-slate-200'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  12 & 13. Performance & Critérios de Aceite
                </button>
              </div>

              {/* Screen Specification Body Content */}
              <div className="p-6 space-y-6">
                {/* TAB CONTENT: OBJECTIVE & LAYOUT */}
                {selectedScreenTab === 'objective_layout' && (
                  <div className="space-y-6">
                    {/* Dimension 1: Objective */}
                    <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-3">
                      <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2 uppercase tracking-wide">
                        <Info className="w-4 h-4 text-indigo-600" />
                        1. Objetivo da Tela & Conexão com o Fluxo do Professor
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                        <div className="bg-white p-3 rounded border border-slate-200">
                          <span className="text-[10px] text-slate-500 font-bold block mb-1">Qual Problema Ela Resolve:</span>
                          <p className="text-slate-800 font-medium">{selectedScreen.objective.problemSolved}</p>
                        </div>
                        <div className="bg-white p-3 rounded border border-slate-200">
                          <span className="text-[10px] text-slate-500 font-bold block mb-1">Quando Ela Aparece:</span>
                          <p className="text-slate-800 font-medium">{selectedScreen.objective.whenItAppears}</p>
                        </div>
                        <div className="bg-white p-3 rounded border border-slate-200">
                          <span className="text-[10px] text-slate-500 font-bold block mb-1">Conexão no Fluxo do Professor:</span>
                          <p className="text-slate-800 font-medium">{selectedScreen.objective.connectionToTeacherFlow}</p>
                        </div>
                      </div>
                    </div>

                    {/* Dimension 2: Layout Completo */}
                    <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-4">
                      <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2 uppercase tracking-wide">
                        <Monitor className="w-4 h-4 text-indigo-600" />
                        2. Composição Visual Completa do Layout
                      </h3>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                        <div className="bg-white p-3 rounded border border-slate-200">
                          <span className="text-[10px] text-indigo-900 font-bold uppercase block mb-1">Header Spec:</span>
                          <p className="text-slate-800">{selectedScreen.layout.headerSpec}</p>
                        </div>

                        <div className="bg-white p-3 rounded border border-slate-200">
                          <span className="text-[10px] text-indigo-900 font-bold uppercase block mb-1">Sidebar Spec:</span>
                          <p className="text-slate-800">{selectedScreen.layout.sidebarSpec}</p>
                        </div>

                        <div className="bg-white p-3 rounded border border-slate-200">
                          <span className="text-[10px] text-indigo-900 font-bold uppercase block mb-1">Cards & Grid Spec:</span>
                          <p className="text-slate-800">{selectedScreen.layout.cardsAndGridSpec}</p>
                        </div>

                        <div className="bg-white p-3 rounded border border-slate-200">
                          <span className="text-[10px] text-indigo-900 font-bold uppercase block mb-1">Botões, Inputs & Ícones:</span>
                          <p className="text-slate-800">{selectedScreen.layout.buttonsInputsIconsSpec}</p>
                        </div>

                        <div className="bg-white p-3 rounded border border-slate-200">
                          <span className="text-[10px] text-indigo-900 font-bold uppercase block mb-1">Alertas, Breadcrumbs & FAB:</span>
                          <p className="text-slate-800">{selectedScreen.layout.alertsBreadcrumbsFabSpec}</p>
                        </div>

                        <div className="bg-white p-3 rounded border border-slate-200">
                          <span className="text-[10px] text-indigo-900 font-bold uppercase block mb-1">Menus, Painéis & Espaçamentos:</span>
                          <p className="text-slate-800">{selectedScreen.layout.menusPanelsSpacingSpec}</p>
                        </div>
                      </div>

                      <div className="bg-indigo-50/70 p-3 rounded border border-indigo-200 text-xs text-indigo-950 font-medium">
                        <span className="font-bold text-indigo-900 block mb-0.5">Hierarquia Visual & Grid Responsivo:</span>
                        {selectedScreen.layout.hierarchyAndResponsiveness}
                      </div>
                    </div>

                    {/* Dimension 3: Componentes Utilizados */}
                    <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-3">
                      <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2 uppercase tracking-wide">
                        <Layers className="w-4 h-4 text-indigo-600" />
                        3. Componentes Reutilizáveis Mapeados nesta Tela
                      </h3>

                      <div className="flex flex-wrap gap-2">
                        {selectedScreen.componentsUsedIds.map((cmpId) => {
                          const cmp = MASTER_COMPONENTS_LIBRARY.find((c) => c.componentId === cmpId);
                          return (
                            <div key={cmpId} className="bg-white p-2.5 rounded border border-slate-300 text-xs flex items-center gap-2">
                              <span className="font-mono text-[10px] bg-slate-900 text-white font-bold px-1.5 py-0.5 rounded">
                                {cmpId}
                              </span>
                              <span className="font-bold text-slate-800">{cmp?.componentName || cmpId}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB CONTENT: STATES & MICRO-INTERACTIONS */}
                {selectedScreenTab === 'states_micro' && (
                  <div className="space-y-6">
                    {/* Dimension 4: Interface States */}
                    <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-3">
                      <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2 uppercase tracking-wide">
                        <Sliders className="w-4 h-4 text-indigo-600" />
                        4. Especificação de Todos os Estados da Interface
                      </h3>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                        <div className="bg-white p-3 rounded border border-slate-200">
                          <span className="text-[10px] text-slate-500 font-bold block uppercase mb-1">Estado Vazio (Empty State):</span>
                          <p className="text-slate-800">{selectedScreen.states.emptyState}</p>
                        </div>

                        <div className="bg-white p-3 rounded border border-slate-200">
                          <span className="text-[10px] text-slate-500 font-bold block uppercase mb-1">Primeiro Acesso:</span>
                          <p className="text-slate-800">{selectedScreen.states.firstAccessState}</p>
                        </div>

                        <div className="bg-white p-3 rounded border border-slate-200">
                          <span className="text-[10px] text-slate-500 font-bold block uppercase mb-1">Estado Carregando (Loading):</span>
                          <p className="text-slate-800">{selectedScreen.states.loadingState}</p>
                        </div>

                        <div className="bg-amber-50 p-3 rounded border border-amber-200">
                          <span className="text-[10px] text-amber-900 font-bold block uppercase mb-1">Estado Offline (Dexie.js):</span>
                          <p className="text-amber-950 font-medium">{selectedScreen.states.offlineState}</p>
                        </div>

                        <div className="bg-red-50 p-3 rounded border border-red-200">
                          <span className="text-[10px] text-red-900 font-bold block uppercase mb-1">Estado de Erro:</span>
                          <p className="text-red-950 font-medium">{selectedScreen.states.errorState}</p>
                        </div>

                        <div className="bg-emerald-50 p-3 rounded border border-emerald-200">
                          <span className="text-[10px] text-emerald-900 font-bold block uppercase mb-1">Estado de Sucesso:</span>
                          <p className="text-emerald-950 font-medium">{selectedScreen.states.successState}</p>
                        </div>

                        <div className="bg-white p-3 rounded border border-slate-200">
                          <span className="text-[10px] text-slate-500 font-bold block uppercase mb-1">Sincronizando com a Nuvem:</span>
                          <p className="text-slate-800">{selectedScreen.states.syncingState}</p>
                        </div>

                        <div className="bg-white p-3 rounded border border-slate-200">
                          <span className="text-[10px] text-slate-500 font-bold block uppercase mb-1">Dados Incompletos / Sem Resultados:</span>
                          <p className="text-slate-800">{selectedScreen.states.incompleteDataState}</p>
                        </div>
                      </div>
                    </div>

                    {/* Dimension 5: Micro-interactions */}
                    <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-3">
                      <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2 uppercase tracking-wide">
                        <MousePointer className="w-4 h-4 text-indigo-600" />
                        5. Microinterações, Animações e Feedback Visual
                      </h3>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                        <div className="bg-white p-3 rounded border border-slate-200">
                          <span className="text-[10px] text-slate-500 font-bold block uppercase mb-1">Hover & Focus:</span>
                          <p className="text-slate-800">{selectedScreen.microInteractions.hoverAndFocus}</p>
                        </div>

                        <div className="bg-white p-3 rounded border border-slate-200">
                          <span className="text-[10px] text-slate-500 font-bold block uppercase mb-1">Click & Loading Feedback:</span>
                          <p className="text-slate-800">{selectedScreen.microInteractions.clickAndLoading}</p>
                        </div>

                        <div className="bg-white p-3 rounded border border-slate-200">
                          <span className="text-[10px] text-slate-500 font-bold block uppercase mb-1">Transições & Confirmações:</span>
                          <p className="text-slate-800">{selectedScreen.microInteractions.transitionsAndConfirmations}</p>
                        </div>

                        <div className="bg-white p-3 rounded border border-slate-200">
                          <span className="text-[10px] text-slate-500 font-bold block uppercase mb-1">Motion Timing & Easing:</span>
                          <p className="font-mono text-slate-800">{selectedScreen.microInteractions.motionTimingAndEasing}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB CONTENT: COGNITIVE FLOW & COPYWRITING */}
                {selectedScreenTab === 'cognitive_copy' && (
                  <div className="space-y-6">
                    {/* Dimension 6: Cognitive Flow */}
                    <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-3">
                      <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2 uppercase tracking-wide">
                        <Cpu className="w-4 h-4 text-indigo-600" />
                        6. Fluxo Cognitivo & Psicologia do Professor (HCI)
                      </h3>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                        <div className="bg-white p-3 rounded border border-slate-200">
                          <span className="text-[10px] text-slate-500 font-bold block uppercase mb-1">O que o Professor Pensa ao Abrir:</span>
                          <p className="italic text-slate-800">{selectedScreen.cognitiveFlow.teacherThoughtProcess}</p>
                        </div>

                        <div className="bg-white p-3 rounded border border-slate-200">
                          <span className="text-[10px] text-slate-500 font-bold block uppercase mb-1">Ação Primária Desejada:</span>
                          <p className="text-slate-800 font-semibold">{selectedScreen.cognitiveFlow.primaryActionDesired}</p>
                        </div>

                        <div className="bg-white p-3 rounded border border-slate-200">
                          <span className="text-[10px] text-slate-500 font-bold block uppercase mb-1">Primeira Informação que Aparece:</span>
                          <p className="text-slate-800">{selectedScreen.cognitiveFlow.firstInformationToSee}</p>
                        </div>

                        <div className="bg-white p-3 rounded border border-slate-200">
                          <span className="text-[10px] text-slate-500 font-bold block uppercase mb-1">O que NUNCA Deve Distrair:</span>
                          <p className="text-slate-800">{selectedScreen.cognitiveFlow.whatNeverDistracts}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs pt-1">
                        <div className="bg-emerald-50 p-3 rounded border border-emerald-200">
                          <span className="text-[10px] text-emerald-900 font-bold block uppercase mb-1">Estratégia para Reduzir Ansiedade:</span>
                          <p className="text-emerald-950 font-medium">{selectedScreen.cognitiveFlow.anxietyReductionStrategy}</p>
                        </div>

                        <div className="bg-indigo-50 p-3 rounded border border-indigo-200">
                          <span className="text-[10px] text-indigo-900 font-bold block uppercase mb-1">Redução de Carga Cognitiva:</span>
                          <p className="text-indigo-950 font-medium">{selectedScreen.cognitiveFlow.cognitiveLoadReductionStrategy}</p>
                        </div>
                      </div>
                    </div>

                    {/* Dimension 7: Copywriting Completo */}
                    <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-3">
                      <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2 uppercase tracking-wide">
                        <FileText className="w-4 h-4 text-indigo-600" />
                        7. Copywriting Oficial da Interface (Textos Reais)
                      </h3>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                        <div className="bg-white p-3 rounded border border-slate-200">
                          <span className="text-[10px] text-slate-500 font-bold block uppercase mb-1">Rótulos dos Botões:</span>
                          <div className="flex flex-wrap gap-1">
                            {selectedScreen.copywriting.buttonsText.map((btn, i) => (
                              <span key={i} className="px-2 py-0.5 bg-slate-100 text-slate-800 font-semibold rounded border border-slate-300">
                                {btn}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="bg-white p-3 rounded border border-slate-200">
                          <span className="text-[10px] text-slate-500 font-bold block uppercase mb-1">Mensagens & Alertas:</span>
                          <ul className="space-y-1">
                            {selectedScreen.copywriting.messagesAndAlerts.map((msg, i) => (
                              <li key={i} className="text-slate-700">• {msg}</li>
                            ))}
                          </ul>
                        </div>

                        <div className="bg-amber-50 p-3 rounded border border-amber-200">
                          <span className="text-[10px] text-amber-900 font-bold block uppercase mb-1">Textos da IA Aurora:</span>
                          <ul className="space-y-1">
                            {selectedScreen.copywriting.auroraAiMessagesText.map((aur, i) => (
                              <li key={i} className="text-amber-950 italic">"{aur}"</li>
                            ))}
                          </ul>
                        </div>

                        <div className="bg-slate-100 p-3 rounded border border-slate-300 font-mono text-[11px]">
                          <span className="text-[10px] text-slate-600 font-bold block uppercase mb-1">Placeholders & Tooltips:</span>
                          <ul className="space-y-1">
                            {selectedScreen.copywriting.placeholdersAndTooltips.map((pl, i) => (
                              <li key={i} className="text-slate-800">[{pl}]</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB CONTENT: RESPONSIVENESS & ACCESSIBILITY */}
                {selectedScreenTab === 'a11y_responsive' && (
                  <div className="space-y-6">
                    {/* Dimension 8: Responsividade */}
                    <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-3">
                      <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2 uppercase tracking-wide">
                        <Smartphone className="w-4 h-4 text-indigo-600" />
                        8. Responsividade em Múltiplos Dispositivos & PWA
                      </h3>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                        <div className="bg-white p-3 rounded border border-slate-200">
                          <span className="text-[10px] text-slate-500 font-bold block uppercase mb-1">Desktop (&gt; 1280px):</span>
                          <p className="text-slate-800">{selectedScreen.responsiveness.desktopLayout}</p>
                        </div>

                        <div className="bg-white p-3 rounded border border-slate-200">
                          <span className="text-[10px] text-slate-500 font-bold block uppercase mb-1">Notebook (1024px - 1280px):</span>
                          <p className="text-slate-800">{selectedScreen.responsiveness.laptopLayout}</p>
                        </div>

                        <div className="bg-white p-3 rounded border border-slate-200">
                          <span className="text-[10px] text-slate-500 font-bold block uppercase mb-1">Tablet (768px - 1024px):</span>
                          <p className="text-slate-800">{selectedScreen.responsiveness.tabletLayout}</p>
                        </div>

                        <div className="bg-white p-3 rounded border border-slate-200">
                          <span className="text-[10px] text-slate-500 font-bold block uppercase mb-1">Celular / PWA Mobile (&lt; 768px):</span>
                          <p className="text-slate-800">{selectedScreen.responsiveness.mobileLayout}</p>
                        </div>
                      </div>

                      <div className="bg-indigo-50 p-3 rounded border border-indigo-200 text-xs text-indigo-950 font-medium">
                        <span className="font-bold text-indigo-900 block mb-0.5">PWA & Orientação de Tela (Retrato / Paisagem):</span>
                        {selectedScreen.responsiveness.pwaAndOrientation}
                      </div>
                    </div>

                    {/* Dimension 9: Acessibilidade */}
                    <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-3">
                      <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2 uppercase tracking-wide">
                        <Eye className="w-4 h-4 text-indigo-600" />
                        9. Diretrizes de Acessibilidade (WCAG 2.2 AA)
                      </h3>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                        <div className="bg-white p-3 rounded border border-slate-200">
                          <span className="text-[10px] text-slate-500 font-bold block uppercase mb-1">Navegação por Teclado:</span>
                          <p className="text-slate-800">{selectedScreen.accessibility.keyboardNavigation}</p>
                        </div>

                        <div className="bg-white p-3 rounded border border-slate-200">
                          <span className="text-[10px] text-slate-500 font-bold block uppercase mb-1">Screen Readers & ARIA Attributes:</span>
                          <p className="text-slate-800">{selectedScreen.accessibility.screenReadersAndAria}</p>
                        </div>

                        <div className="bg-white p-3 rounded border border-slate-200">
                          <span className="text-[10px] text-slate-500 font-bold block uppercase mb-1">Contraste & Área Mínima de Toque (&ge; 44px):</span>
                          <p className="text-slate-800">{selectedScreen.accessibility.contrastAndTouchTargets}</p>
                        </div>

                        <div className="bg-white p-3 rounded border border-slate-200">
                          <span className="text-[10px] text-slate-500 font-bold block uppercase mb-1">Escalas Tipográficas & Zoom (200%):</span>
                          <p className="text-slate-800">{selectedScreen.accessibility.typographyScaleAndZoom}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB CONTENT: BUSINESS RULES & AURORA INTEGRATION */}
                {selectedScreenTab === 'rules_aurora' && (
                  <div className="space-y-6">
                    {/* Dimension 10: Regras de Negócio Visíveis */}
                    <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-3">
                      <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2 uppercase tracking-wide">
                        <Lock className="w-4 h-4 text-indigo-600" />
                        10. Regras de Negócio Visíveis na Interface
                      </h3>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                        <div className="bg-emerald-50 p-3 rounded border border-emerald-200">
                          <span className="text-[10px] text-emerald-900 font-bold block uppercase mb-1">Ações Permitidas:</span>
                          <ul className="space-y-1">
                            {selectedScreen.businessRules.allowedUserActions.map((act, i) => (
                              <li key={i} className="text-emerald-950 font-medium">• {act}</li>
                            ))}
                          </ul>
                        </div>

                        <div className="bg-red-50 p-3 rounded border border-red-200">
                          <span className="text-[10px] text-red-900 font-bold block uppercase mb-1">Ações Proibidas / Bloqueadas:</span>
                          <ul className="space-y-1">
                            {selectedScreen.businessRules.forbiddenActions.map((act, i) => (
                              <li key={i} className="text-red-950 font-medium">• {act}</li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="bg-white p-3 rounded border border-slate-200 text-xs">
                        <span className="text-[10px] text-slate-500 font-bold block uppercase mb-1">Regra de Sugestão da IA vs Validação Humana:</span>
                        <p className="text-slate-800 font-medium">{selectedScreen.businessRules.aiSuggestionVsHumanConfirmationRules}</p>
                      </div>
                    </div>

                    {/* Dimension 11: Integração com a IA Aurora */}
                    <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-3">
                      <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2 uppercase tracking-wide">
                        <Sparkles className="w-4 h-4 text-amber-500" />
                        11. Integração & Comportamento da IA Aurora
                      </h3>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                        <div className="bg-white p-3 rounded border border-slate-200">
                          <span className="text-[10px] text-slate-500 font-bold block uppercase mb-1">Quando Aparece:</span>
                          <p className="text-slate-800">{selectedScreen.auroraIntegration.whenAppears}</p>
                        </div>

                        <div className="bg-white p-3 rounded border border-slate-200">
                          <span className="text-[10px] text-slate-500 font-bold block uppercase mb-1">Quando Fica Silenciosa:</span>
                          <p className="text-slate-800">{selectedScreen.auroraIntegration.whenSilent}</p>
                        </div>

                        <div className="bg-white p-3 rounded border border-slate-200">
                          <span className="text-[10px] text-slate-500 font-bold block uppercase mb-1">Quando Sugere / Pergunta:</span>
                          <p className="text-slate-800">{selectedScreen.auroraIntegration.whenSuggests}</p>
                        </div>
                      </div>

                      <div className="bg-amber-50 p-3 rounded border border-amber-200 text-xs text-amber-950">
                        <span className="font-bold text-amber-900 block uppercase text-[10px] mb-0.5">Regra de Não-Competição Visual:</span>
                        {selectedScreen.auroraIntegration.visualNonCompetitionRule}
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB CONTENT: PERFORMANCE & ACCEPTANCE CRITERIA */}
                {selectedScreenTab === 'perf_criteria' && (
                  <div className="space-y-6">
                    {/* Dimension 12: Performance Percebida */}
                    <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-3">
                      <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2 uppercase tracking-wide">
                        <Zap className="w-4 h-4 text-indigo-600" />
                        12. Performance Percebida & Otimizações
                      </h3>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                        <div className="bg-white p-3 rounded border border-slate-200">
                          <span className="text-[10px] text-slate-500 font-bold block uppercase mb-1">Mascaramento de Latência:</span>
                          <p className="text-slate-800">{selectedScreen.perceivedPerformance.maskingLatency}</p>
                        </div>

                        <div className="bg-white p-3 rounded border border-slate-200">
                          <span className="text-[10px] text-slate-500 font-bold block uppercase mb-1">Skeletons & Optimistic UI:</span>
                          <p className="text-slate-800">{selectedScreen.perceivedPerformance.skeletonsAndOptimisticUi}</p>
                        </div>

                        <div className="bg-white p-3 rounded border border-slate-200">
                          <span className="text-[10px] text-slate-500 font-bold block uppercase mb-1">Streaming & Pré-carregamento:</span>
                          <p className="text-slate-800">{selectedScreen.perceivedPerformance.streamingAndPreloading}</p>
                        </div>
                      </div>
                    </div>

                    {/* Dimension 13: Critérios de Aceite para Homologação */}
                    <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-3">
                      <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2 uppercase tracking-wide">
                        <CheckSquare className="w-4 h-4 text-emerald-600" />
                        13. Critérios de Aceite Finais para Homologação da Tela
                      </h3>

                      <div className="space-y-2">
                        {selectedScreen.acceptanceCriteria.map((crit, idx) => (
                          <div key={idx} className="bg-white p-3 rounded border border-slate-200 text-xs flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                            <span className="text-slate-800 font-semibold">{crit}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* SUBTAB 2: MASTER COMPONENT LIBRARY */}
        {activeSubTab === 'component_library' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
              <div className="border-b border-slate-100 pb-3">
                <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
                  <Layers className="w-5 h-5 text-indigo-600" />
                  Biblioteca Mestra de Componentes Reutilizáveis do Design System
                </h2>
                <p className="text-xs text-slate-600 mt-1">
                  Especificação técnica de todos os componentes da plataforma com finalidade, propriedades/API, estados suportados e regras de uso.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {MASTER_COMPONENTS_LIBRARY.map((cmp) => (
                  <div key={cmp.componentId} className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-3 text-xs">
                    <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold bg-slate-900 text-white px-2 py-0.5 rounded">
                          {cmp.componentId}
                        </span>
                        <h3 className="text-sm font-extrabold text-slate-900">{cmp.componentName}</h3>
                      </div>
                    </div>

                    <p className="text-slate-700 font-medium">{cmp.purpose}</p>

                    <div className="bg-white p-2.5 rounded border border-slate-200 font-mono text-[11px] space-y-1">
                      <span className="text-[10px] text-slate-500 font-bold block uppercase">Propriedades & API:</span>
                      <div className="flex flex-wrap gap-1">
                        {cmp.propsAndApi.map((prp, i) => (
                          <span key={i} className="px-1.5 py-0.5 bg-slate-100 text-slate-800 rounded border border-slate-300">
                            {prp}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div className="bg-white p-2 rounded border border-slate-200">
                        <span className="text-[10px] text-slate-500 font-bold block uppercase mb-1">Estados Suportados:</span>
                        <ul className="space-y-0.5 text-[11px]">
                          {cmp.supportedStates.map((st, i) => (
                            <li key={i} className="text-slate-700">• {st}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="bg-white p-2 rounded border border-slate-200">
                        <span className="text-[10px] text-slate-500 font-bold block uppercase mb-1">Variações:</span>
                        <ul className="space-y-0.5 text-[11px]">
                          {cmp.variations.map((vr, i) => (
                            <li key={i} className="text-slate-700">• {vr}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="bg-indigo-50/70 p-2.5 rounded border border-indigo-200 text-indigo-950">
                      <span className="font-bold text-indigo-900 block text-[10px] uppercase mb-0.5">Regras de Uso & Design:</span>
                      {cmp.designAndUsageRules}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* SUBTAB 3: DESIGN TOKENS FINALS */}
        {activeSubTab === 'design_tokens' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
              <div className="border-b border-slate-100 pb-3">
                <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
                  <Palette className="w-5 h-5 text-indigo-600" />
                  Catálogo Final de Design Tokens do EducaFlow
                </h2>
                <p className="text-xs text-slate-600 mt-1">
                  Valores matemáticos e semânticos para espaçamentos, bordas, sombras, tipografia e cores.
                </p>
              </div>

              <div className="space-y-6">
                {FINAL_DESIGN_TOKENS.map((cat, idx) => (
                  <div key={idx} className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-3">
                    <div className="border-b border-slate-200 pb-2">
                      <h3 className="text-sm font-extrabold text-slate-900">{cat.categoryName}</h3>
                      <p className="text-xs text-slate-600">{cat.description}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                      {cat.tokens.map((tk, tIdx) => (
                        <div key={tIdx} className="bg-white p-3 rounded border border-slate-200 space-y-1 text-xs">
                          <span className="font-mono font-bold text-indigo-900 block">{tk.tokenName}</span>
                          <span className="font-mono text-[11px] text-slate-600 block bg-slate-100 p-1 rounded border border-slate-200">
                            {tk.value}
                          </span>
                          <p className="text-slate-600 text-[11px] pt-1">{tk.usageRule}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* SUBTAB 4: VISUAL NAVIGATION FLOWCHART MAP */}
        {activeSubTab === 'nav_flowchart' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
              <div className="border-b border-slate-100 pb-3">
                <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
                  <GitBranch className="w-5 h-5 text-indigo-600" />
                  Mapeamento Completo de Navegação e Transições entre Telas
                </h2>
                <p className="text-xs text-slate-600 mt-1">
                  Árvore de rotas, gatilhos de transição, modais sobrepostos e atalhos globais de teclado.
                </p>
              </div>

              <div className="space-y-3">
                {NAVIGATION_FLOWCHART_MAP.map((nav, idx) => (
                  <div key={idx} className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold bg-slate-900 text-white px-2 py-0.5 rounded">
                        {nav.fromScreenId}
                      </span>
                      <span className="font-semibold text-slate-800">{nav.fromScreenName}</span>
                      <ArrowRight className="w-4 h-4 text-indigo-600" />
                      <span className="font-mono font-bold bg-indigo-900 text-white px-2 py-0.5 rounded">
                        {nav.destinationScreenId}
                      </span>
                      <span className="font-semibold text-slate-800">{nav.destinationScreenName}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-slate-600 font-medium">Ação: {nav.triggerAction}</span>
                      <span className="font-mono text-[10px] font-bold bg-amber-100 text-amber-900 px-2 py-0.5 rounded border border-amber-300">
                        {nav.navigationType}
                      </span>
                      <span className="font-mono text-[10px] font-bold bg-slate-200 text-slate-800 px-2 py-0.5 rounded">
                        {nav.shortcutOrKey}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* SUBTAB 5: POST-MVP BACKLOG */}
        {activeSubTab === 'post_mvp_backlog' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
              <div className="border-b border-slate-100 pb-3">
                <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
                  <ListCheck className="w-5 h-5 text-amber-600" />
                  Seção de Backlog Pós-MVP (Escopo Estritamente Preservado)
                </h2>
                <p className="text-xs text-slate-600 mt-1">
                  Funcionalidades e inovações futuras explicitamente registradas para preservação da simplicidade e entregabilidade do MVP atual.
                </p>
              </div>

              <div className="space-y-3">
                {POST_MVP_BACKLOG.map((item) => (
                  <div key={item.itemId} className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2 text-xs">
                    <div className="flex items-center justify-between border-b border-slate-200 pb-1.5">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold bg-amber-900 text-amber-100 px-2 py-0.5 rounded text-[11px]">
                          {item.itemId}
                        </span>
                        <h3 className="font-extrabold text-slate-900">{item.title}</h3>
                      </div>
                      <span className="font-mono text-[10px] font-bold text-indigo-900 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                        Alvo: {item.futureTargetSprint}
                      </span>
                    </div>

                    <p className="text-slate-700"><span className="font-bold text-slate-900">Justificativa de Adiamento:</span> {item.rationaleForPostponement}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* SUBTAB 6: VSCODE SPRINTS PLAN */}
        {activeSubTab === 'vscode_sprints' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
              <div className="border-b border-slate-100 pb-3">
                <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
                  <Terminal className="w-5 h-5 text-indigo-600" />
                  Plano de Implementação Sequencial em Código (Visual Studio Code)
                </h2>
                <p className="text-xs text-slate-600 mt-1">
                  Roteiro de desenvolvimento por Sprints (Sprint 00 até Sprint 06) ordenado para execução direta no ambiente de desenvolvimento.
                </p>
              </div>

              <div className="space-y-4">
                {VSCODE_IMPLEMENTATION_PLAN.map((spr) => (
                  <div key={spr.sprintNumber} className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold bg-slate-900 text-white px-2 py-0.5 rounded text-xs">
                          {spr.sprintNumber}
                        </span>
                        <h3 className="text-sm font-extrabold text-slate-900">{spr.sprintTitle}</h3>
                      </div>
                    </div>

                    <p className="text-xs text-slate-800 font-medium"><span className="font-bold">Objetivo Principal:</span> {spr.primaryObjective}</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs pt-1">
                      <div className="bg-white p-3 rounded border border-slate-200 space-y-1">
                        <span className="text-[10px] text-indigo-900 font-bold uppercase block">Tarefas no Visual Studio Code:</span>
                        <ul className="space-y-1">
                          {spr.vsCodeTasks.map((tsk, i) => (
                            <li key={i} className="text-slate-700 flex items-start gap-1">
                              <Code2 className="w-3.5 h-3.5 text-indigo-600 flex-shrink-0 mt-0.5" />
                              <span>{tsk}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="bg-white p-3 rounded border border-slate-200 space-y-1">
                        <span className="text-[10px] text-indigo-900 font-bold uppercase block">Artefatos Entregáveis:</span>
                        <ul className="space-y-1">
                          {spr.deliverableArtifacts.map((art, i) => (
                            <li key={i} className="text-slate-700 flex items-start gap-1">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                              <span>{art}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="bg-emerald-50 p-2.5 rounded border border-emerald-200 text-xs font-semibold text-emerald-950">
                      <span className="text-[10px] text-emerald-900 font-bold block uppercase mb-0.5">Definition of Done (DoD):</span>
                      {spr.definitionOfDone}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* SUBTAB 7: CLOSING SIGNOFF DECLARATION */}
        {activeSubTab === 'closing_signoff' && (
          <div className="space-y-6">
            <div className="bg-slate-950 text-white p-8 rounded-xl border border-slate-800 shadow-xl space-y-6">
              <div className="border-b border-slate-800 pb-4">
                <span className="text-xs font-mono font-bold bg-amber-500/20 text-amber-300 px-3 py-1 rounded-full border border-amber-500/30">
                  DECLARAÇÃO OFICIAL DE HOMOLOGAÇÃO & ENCERRAMENTO
                </span>
                <h2 className="text-2xl font-extrabold text-white mt-2">{DISCOVERY_CLOSING_DECLARATION.closingTitle}</h2>
                <p className="text-xs text-slate-400 mt-1">Data de Emissão: {DISCOVERY_CLOSING_DECLARATION.closingDate}</p>
              </div>

              <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
                <p className="text-sm text-slate-200 leading-relaxed italic">
                  "{DISCOVERY_CLOSING_DECLARATION.closingText}"
                </p>
              </div>

              <div className="space-y-3">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                  Assinaturas das Lideranças de Discovery, Produto, UX e Engenharia:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {DISCOVERY_CLOSING_DECLARATION.signatories.map((sig, idx) => (
                    <div key={idx} className="bg-slate-900 p-3.5 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
                      <div>
                        <span className="font-extrabold text-white block">{sig.name}</span>
                        <span className="text-[11px] text-slate-400 block">{sig.title}</span>
                      </div>
                      <span className="font-mono text-[10px] font-bold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800">
                        {sig.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
