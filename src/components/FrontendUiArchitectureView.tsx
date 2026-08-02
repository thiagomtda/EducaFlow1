import React, { useState } from 'react';
import { 
  FRONTEND_TECH_STACK_SUITE,
  FRONTEND_FOLDER_STRUCTURE,
  FRONTEND_STATE_STRATEGY_SUITE,
  PWA_ARCHITECTURAL_SUITE,
  MVP_UI_SCREENS_SPECIFICATION,
  ACCESSIBILITY_PERFORMANCE_SUITE,
  FRONTEND_ACCEPTANCE_CRITERIA_LIST,
  FRONTEND_SIGNOFF_DECLARATION
} from '../data/frontendUiArchitectureData';
import { MvpUiScreenSpec } from '../types';
import { 
  Layout, 
  Smartphone, 
  Layers, 
  Database, 
  WifiOff, 
  FileCode2, 
  CheckCircle2, 
  ShieldCheck, 
  Cpu, 
  Code2, 
  Zap, 
  ArrowRight, 
  Eye, 
  RefreshCw, 
  Terminal, 
  Sparkles, 
  Check, 
  Copy, 
  BarChart3, 
  Monitor,
  FolderTree,
  ListFilter,
  CheckSquare,
  AlertTriangle,
  Award
} from 'lucide-react';

export const FrontendUiArchitectureView: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<
    'overview_stack' | 'folder_structure' | 'state_management' | 'pwa_offline' | 'screens_spec' | 'a11y_vitals' | 'acceptance_signoff'
  >('overview_stack');

  const [selectedScreenId, setSelectedScreenId] = useState<string>(MVP_UI_SCREENS_SPECIFICATION[0].screenId);
  const [selectedStateType, setSelectedStateType] = useState<string>('all');
  const [copiedCodeLabel, setCopiedCodeLabel] = useState<string | null>(null);

  const selectedScreen: MvpUiScreenSpec = 
    MVP_UI_SCREENS_SPECIFICATION.find(s => s.screenId === selectedScreenId) || MVP_UI_SCREENS_SPECIFICATION[0];

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
                  <Layout className="w-3.5 h-3.5 text-emerald-400" /> Next.js 14+ & PWA Offline Ready
                </span>
                <span className="px-2.5 py-1 bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 rounded-full text-xs font-semibold">
                  UI Specs v1.0
                </span>
                <span className="px-2.5 py-1 bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded-full text-xs font-semibold">
                  WCAG 2.2 AA Certified
                </span>
              </div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                EducaFlow Frontend Architecture & UI Screens Specification v1.0
              </h1>
              <p className="text-slate-300 text-sm md:text-base mt-1 max-w-3xl">
                Blueprint definitivo do frontend: Arquitetura Next.js/React, Gerenciamento de Estado, PWA Offline-First, Design System, e Especificação Detalhada das 10 Telas do MVP.
              </p>
            </div>

            <div className="flex items-center gap-3 bg-slate-900/90 p-3.5 rounded-xl border border-slate-800 backdrop-blur-sm">
              <div className="text-right">
                <div className="text-xs text-slate-400 font-medium">Liderança de Engenharia Frontend</div>
                <div className="text-xs font-bold text-emerald-400">Principal Frontend Architect & UX Lead</div>
              </div>
            </div>
          </div>

          {/* Sub-Navigation Tabs */}
          <div className="flex items-center gap-2 mt-6 overflow-x-auto pb-1 scrollbar-none border-t border-slate-800/80 pt-4">
            <button
              onClick={() => setActiveSubTab('overview_stack')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                activeSubTab === 'overview_stack'
                  ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20 font-bold'
                  : 'bg-slate-800/60 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-700/50'
              }`}
            >
              <Cpu className="w-4 h-4" />
              1. Visão Geral & Stack
            </button>

            <button
              onClick={() => setActiveSubTab('folder_structure')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                activeSubTab === 'folder_structure'
                  ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20 font-bold'
                  : 'bg-slate-800/60 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-700/50'
              }`}
            >
              <FolderTree className="w-4 h-4" />
              2. Estrutura de Pastas
            </button>

            <button
              onClick={() => setActiveSubTab('state_management')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                activeSubTab === 'state_management'
                  ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20 font-bold'
                  : 'bg-slate-800/60 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-700/50'
              }`}
            >
              <Layers className="w-4 h-4" />
              3. Estado, Cache & Formulários
            </button>

            <button
              onClick={() => setActiveSubTab('pwa_offline')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                activeSubTab === 'pwa_offline'
                  ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20 font-bold'
                  : 'bg-slate-800/60 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-700/50'
              }`}
            >
              <WifiOff className="w-4 h-4" />
              4. PWA, Service Worker & Dexie
            </button>

            <button
              onClick={() => setActiveSubTab('screens_spec')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                activeSubTab === 'screens_spec'
                  ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20 font-bold'
                  : 'bg-slate-800/60 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-700/50'
              }`}
            >
              <Monitor className="w-4 h-4" />
              5. Especificação das 10 Telas MVP
            </button>

            <button
              onClick={() => setActiveSubTab('a11y_vitals')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                activeSubTab === 'a11y_vitals'
                  ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20 font-bold'
                  : 'bg-slate-800/60 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-700/50'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              6. WCAG 2.2 AA & Web Vitals
            </button>

            <button
              onClick={() => setActiveSubTab('acceptance_signoff')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                activeSubTab === 'acceptance_signoff'
                  ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20 font-bold'
                  : 'bg-slate-800/60 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-700/50'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              7. Critérios de Aceite & Homologação
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl w-full mx-auto p-4 md:p-8 flex-1">
        {/* SUBTAB 1: OVERVIEW & TECH STACK */}
        {activeSubTab === 'overview_stack' && (
          <div className="space-y-8">
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
              <div className="border-b border-slate-100 pb-3">
                <span className="text-xs font-mono font-bold bg-emerald-100 text-emerald-900 px-2.5 py-0.5 rounded border border-emerald-200">
                  ARQUITETURA DE FRONTEND DE ALTA DESEMPENHO
                </span>
                <h2 className="text-xl font-extrabold text-slate-900 mt-1">
                  Stack Tecnológica do Cliente EducaFlow v1.0
                </h2>
                <p className="text-xs text-slate-600 mt-1">
                  Seleção rigorosa de bibliotecas modernas focadas em reatividade, acessibilidade nativa, tempo de carregamento inferior a 1.2s e suporte offline ininterrupto.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
                {FRONTEND_TECH_STACK_SUITE.map((item, idx) => (
                  <div key={idx} className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-mono uppercase text-indigo-700 font-bold bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                        {item.category}
                      </span>
                      <h3 className="text-sm font-extrabold text-slate-900 mt-1.5">{item.library}</h3>
                      <span className="text-[11px] font-mono text-emerald-800 font-bold block">{item.version}</span>
                      <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                        {item.justification}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Core Architectural Pillars */}
            <div className="bg-slate-950 text-white p-6 rounded-xl border border-slate-800 shadow-sm space-y-4">
              <h3 className="text-base font-extrabold text-emerald-400 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                Princípios Inegociáveis de Frontend do EducaFlow
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-slate-900 p-4 rounded-lg border border-slate-800 text-xs space-y-1">
                  <span className="text-amber-400 font-bold block">1. Lançamento de Diário em &lt; 2 Minutos</span>
                  <p className="text-slate-300 text-[11px]">
                    Nenhum clique desnecessário. Tabela de presença otimizada para toques rápidos no tablet/smartphone, com toggle em lote e salvamento automático local.
                  </p>
                </div>

                <div className="bg-slate-900 p-4 rounded-lg border border-slate-800 text-xs space-y-1">
                  <span className="text-emerald-400 font-bold block">2. IA Transparente (Human-in-the-Loop)</span>
                  <p className="text-slate-300 text-[11px]">
                    A IA Aurora sugere planos e pareceres, mas o professor detém total autonomia e controle para editar, personalizar e assinar digitalmente o documento final.
                  </p>
                </div>

                <div className="bg-slate-900 p-4 rounded-lg border border-slate-800 text-xs space-y-1">
                  <span className="text-indigo-400 font-bold block">3. Zero Falha em Escolas Rurais</span>
                  <p className="text-slate-300 text-[11px]">
                    Arquitetura PWA Offline-First garante que falta de sinal de celular ou Wi-Fi instável jamais impeça o registro pedagógico diário.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SUBTAB 2: FOLDER STRUCTURE */}
        {activeSubTab === 'folder_structure' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
              <div className="border-b border-slate-100 pb-3">
                <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
                  <FolderTree className="w-5 h-5 text-indigo-600" />
                  Estrutura de Pastas & Organização de Módulos
                </h2>
                <p className="text-xs text-slate-600 mt-1">
                  Organização modular desacoplada seguindo as diretrizes do Next.js App Router e separação limpa de responsabilidades.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-3">
                {FRONTEND_FOLDER_STRUCTURE.map((folder, idx) => (
                  <div key={idx} className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-wrap items-center justify-between gap-4">
                    <div className="space-y-1">
                      <span className="font-mono text-xs font-bold text-indigo-900 bg-indigo-50 px-2.5 py-1 rounded border border-indigo-200 inline-block">
                        {folder.path}
                      </span>
                      <p className="text-xs font-bold text-slate-900 mt-1">{folder.description}</p>
                      <p className="text-xs text-slate-600">{folder.purpose}</p>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-bold whitespace-nowrap">
                      Módulo Ativo
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* SUBTAB 3: STATE MANAGEMENT */}
        {activeSubTab === 'state_management' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
              <div className="border-b border-slate-100 pb-3">
                <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
                  <Layers className="w-5 h-5 text-indigo-600" />
                  Estratégia de Estado, Cache & Formulários
                </h2>
                <p className="text-xs text-slate-600 mt-1">
                  Separação estrita entre Estado de Servidor, Estado Global de Interface, Formulários e Persistência Offline.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {FRONTEND_STATE_STRATEGY_SUITE.map((st, idx) => (
                  <div key={idx} className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-900">{st.stateType}</span>
                      <span className="text-[10px] font-mono font-bold text-indigo-900 bg-indigo-100 px-2 py-0.5 rounded border border-indigo-200">
                        {st.techSolution}
                      </span>
                    </div>

                    <div>
                      <span className="text-[10px] text-slate-500 font-bold uppercase block mb-1">Casos de Uso:</span>
                      <ul className="list-disc list-inside text-xs text-slate-700 space-y-0.5">
                        {st.useCases.map((uc, i) => (
                          <li key={i}>{uc}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-white p-2.5 rounded border border-slate-200 text-xs text-slate-600">
                      <span className="font-bold text-slate-900 block mb-0.5">Padrão de Sincronização:</span>
                      {st.syncPattern}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* SUBTAB 4: PWA & OFFLINE */}
        {activeSubTab === 'pwa_offline' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
              <div className="border-b border-slate-100 pb-3">
                <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
                  <WifiOff className="w-5 h-5 text-amber-500" />
                  Arquitetura PWA, Service Worker & Dexie.js IndexedDB
                </h2>
                <p className="text-xs text-slate-600 mt-1">
                  Garantia de operação contínua e sem travamentos mesmo sem conectividade de internet.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {PWA_ARCHITECTURAL_SUITE.map((pwa, idx) => (
                  <div key={idx} className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xs font-bold text-slate-900">{pwa.capability}</h3>
                      <span className="text-[10px] font-mono text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-bold">
                        {pwa.implementation}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed pt-1">
                      {pwa.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* SUBTAB 5: MVP UI SCREENS SPECIFICATION */}
        {activeSubTab === 'screens_spec' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Screen Selector Sidebar */}
            <div className="lg:col-span-4 space-y-3">
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-3">
                <h3 className="font-bold text-slate-900 text-xs border-b border-slate-100 pb-2 flex items-center justify-between">
                  <span className="flex items-center gap-1.5"><Monitor className="w-4 h-4 text-emerald-600" /> Telas do MVP ({MVP_UI_SCREENS_SPECIFICATION.length})</span>
                </h3>

                <div className="space-y-1.5">
                  {MVP_UI_SCREENS_SPECIFICATION.map((scr) => {
                    const isSelected = scr.screenId === selectedScreenId;
                    return (
                      <button
                        key={scr.screenId}
                        onClick={() => setSelectedScreenId(scr.screenId)}
                        className={`w-full text-left p-2.5 rounded-lg transition-all border ${
                          isSelected
                            ? 'bg-emerald-50 border-emerald-500 text-emerald-950 font-semibold shadow-sm'
                            : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-xs font-bold text-slate-900">{scr.screenId}</span>
                          <span className="text-[10px] text-indigo-700 bg-indigo-50 px-1.5 py-0.5 rounded border border-indigo-200 font-mono">{scr.routePath}</span>
                        </div>
                        <h4 className="text-xs font-bold mt-1 line-clamp-1">{scr.screenTitle}</h4>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Screen Inspector Panel */}
            <div className="lg:col-span-8 space-y-6">
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-2.5 py-0.5 rounded text-xs font-mono font-bold bg-slate-900 text-white">
                        {selectedScreen.screenId}
                      </span>
                      <span className="font-mono text-xs font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                        {selectedScreen.routePath}
                      </span>
                    </div>
                    <h2 className="text-lg font-extrabold text-slate-900">{selectedScreen.screenTitle}</h2>
                    <p className="text-xs text-slate-600 mt-1">{selectedScreen.primaryGoal}</p>
                  </div>

                  <span className="text-xs font-mono text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200 font-bold">
                    Layout: {selectedScreen.layoutType}
                  </span>
                </div>

                {/* Key Components */}
                <div>
                  <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Layers className="w-4 h-4 text-emerald-600" /> Componentes Principais da Tela
                  </h3>
                  <div className="space-y-1.5">
                    {selectedScreen.keyComponents.map((comp, idx) => (
                      <div key={idx} className="p-2 bg-slate-50 rounded border border-slate-200 font-mono text-xs text-slate-800 flex items-center gap-2">
                        <Code2 className="w-3.5 h-3.5 text-indigo-600 flex-shrink-0" />
                        <span>{comp}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* State Machine Grid (6 States) */}
                <div>
                  <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <RefreshCw className="w-4 h-4 text-amber-600" /> Máquina de Estados da Interface (6 Estados)
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    <div className="bg-slate-50 p-2.5 rounded border border-slate-200">
                      <span className="font-bold text-slate-900 block text-[11px]">Idle (Inativo)</span>
                      <span className="text-slate-600 text-[11px]">{selectedScreen.stateMachine.idleState}</span>
                    </div>
                    <div className="bg-blue-50/60 p-2.5 rounded border border-blue-200">
                      <span className="font-bold text-blue-900 block text-[11px]">Loading (Carregando)</span>
                      <span className="text-slate-600 text-[11px]">{selectedScreen.stateMachine.loadingState}</span>
                    </div>
                    <div className="bg-red-50/60 p-2.5 rounded border border-red-200">
                      <span className="font-bold text-red-900 block text-[11px]">Error (Erro)</span>
                      <span className="text-slate-600 text-[11px]">{selectedScreen.stateMachine.errorState}</span>
                    </div>
                    <div className="bg-amber-50/60 p-2.5 rounded border border-amber-200">
                      <span className="font-bold text-amber-900 block text-[11px]">Empty (Vazio)</span>
                      <span className="text-slate-600 text-[11px]">{selectedScreen.stateMachine.emptyState}</span>
                    </div>
                    <div className="bg-emerald-50/60 p-2.5 rounded border border-emerald-200">
                      <span className="font-bold text-emerald-900 block text-[11px]">Success (Sucesso)</span>
                      <span className="text-slate-600 text-[11px]">{selectedScreen.stateMachine.successState}</span>
                    </div>
                    <div className="bg-purple-50/60 p-2.5 rounded border border-purple-200">
                      <span className="font-bold text-purple-900 block text-[11px]">Offline Mode</span>
                      <span className="text-slate-600 text-[11px]">{selectedScreen.stateMachine.offlineState}</span>
                    </div>
                  </div>
                </div>

                {/* Accessibility Specs */}
                <div className="bg-slate-950 text-slate-200 p-4 rounded-xl border border-slate-800 space-y-2 text-xs font-mono">
                  <h4 className="text-xs font-extrabold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                    <A11yIcon /> Requisitos de Acessibilidade WCAG 2.2 AA
                  </h4>
                  <p><span className="text-slate-400">Roles ARIA:</span> {selectedScreen.accessibilitySpecs.ariaRoles.join(', ')}</p>
                  <p><span className="text-slate-400">Atalhos de Teclado:</span> {selectedScreen.accessibilitySpecs.keyboardShortcuts.join(' | ')}</p>
                  <p><span className="text-slate-400">Gerenciamento de Foco:</span> {selectedScreen.accessibilitySpecs.focusManagement}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SUBTAB 6: ACCESSIBILITY & WEB VITALS */}
        {activeSubTab === 'a11y_vitals' && (
          <div className="space-y-8">
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
              <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-indigo-600" />
                Padrões de Acessibilidade (WCAG 2.2 AA) & Performance
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {ACCESSIBILITY_PERFORMANCE_SUITE.keyRequirements.map((req, idx) => (
                  <div key={idx} className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-1.5 text-xs">
                    <span className="font-bold text-slate-900 block">{req.rule}</span>
                    <p className="text-emerald-800 font-semibold">{req.target}</p>
                    <p className="text-slate-600 pt-1">{req.implementation}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Core Web Vitals Targets */}
            <div className="bg-slate-950 text-white p-6 rounded-xl border border-slate-800 space-y-4">
              <h3 className="text-base font-extrabold text-emerald-400 flex items-center gap-2">
                <Zap className="w-5 h-5 text-emerald-400" />
                Metas Estritas de Core Web Vitals
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                {ACCESSIBILITY_PERFORMANCE_SUITE.coreWebVitalsTargets.map((cwv, idx) => (
                  <div key={idx} className="bg-slate-900 p-4 rounded-lg border border-slate-800 space-y-1">
                    <span className="font-bold text-slate-300 block">{cwv.metric}</span>
                    <span className="text-lg font-mono font-extrabold text-emerald-400 block">{cwv.target}</span>
                    <p className="text-slate-400 text-[11px] pt-1">{cwv.strategy}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* SUBTAB 7: ACCEPTANCE CRITERIA & SIGNOFF */}
        {activeSubTab === 'acceptance_signoff' && (
          <div className="space-y-8">
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
              <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                Critérios de Aceite Técnicos do Frontend (FTACs)
              </h2>

              <div className="space-y-3">
                {FRONTEND_ACCEPTANCE_CRITERIA_LIST.map((tac) => (
                  <div key={tac.id} className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-bold text-indigo-900">{tac.id} - {tac.screenOrComponent}</span>
                      <span className="px-2 py-0.5 bg-amber-100 text-amber-900 font-mono text-[10px] font-bold rounded border border-amber-300">
                        {tac.wcagRule}
                      </span>
                    </div>
                    <h3 className="font-bold text-slate-900 text-sm">{tac.title}</h3>
                    <p className="text-slate-700"><span className="font-bold">Cenário:</span> {tac.testScenario}</p>
                    <p className="text-emerald-900 font-semibold bg-emerald-50 p-2 rounded border border-emerald-200">
                      <span className="font-bold">Resultado Esperado:</span> {tac.expectedOutcome}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Frontend Lead Signoff Declaration */}
            <div className="bg-slate-950 text-white p-6 rounded-xl border border-slate-800 space-y-4 shadow-sm">
              <div className="border-b border-slate-800 pb-3">
                <span className="text-xs font-mono font-bold bg-amber-500/20 text-amber-300 px-2.5 py-0.5 rounded border border-amber-500/30">
                  PARECER TÉCNICO DE FRONTEND
                </span>
                <h3 className="text-lg font-extrabold text-white mt-1">{FRONTEND_SIGNOFF_DECLARATION.signoffTitle}</h3>
                <p className="text-xs text-slate-400">Data: {FRONTEND_SIGNOFF_DECLARATION.signoffDate}</p>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed italic">
                "{FRONTEND_SIGNOFF_DECLARATION.signoffBody}"
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-2">
                {FRONTEND_SIGNOFF_DECLARATION.signoffRoles.map((ldr, idx) => (
                  <div key={idx} className="bg-slate-900 p-3 rounded border border-slate-800 text-[11px]">
                    <span className="font-bold text-slate-200 block">{ldr.role}</span>
                    <span className="text-emerald-400 font-mono font-bold text-[10px]">{ldr.status}</span>
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

const A11yIcon: React.FC = () => (
  <svg className="w-4 h-4 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="4" r="2" />
    <path d="M12 6v6" />
    <path d="M6 8h12" />
    <path d="m8 18 4-6 4 6" />
  </svg>
);
