import React, { useState } from 'react';
import {
  Code,
  FolderTree,
  GitBranch,
  Layers,
  Terminal,
  ShieldCheck,
  Zap,
  CheckCircle2,
  Database,
  Cpu,
  Server,
  RefreshCw,
  FileCode,
  Play,
  Copy,
  Check,
  Bot,
  Sparkles,
  ArrowRight,
  ChevronRight,
  Activity,
  HardDrive
} from 'lucide-react';
import {
  PROJECT_FOLDER_STRUCTURE,
  LAYER_RESPONSIBILITIES,
  MODULE_TECHNICAL_JOURNEYS,
  VSCODE_EXECUTION_PLAN,
  ENGINEERING_CLOSING_DECLARATION
} from '../data/engineeringBlueprintData';

type SubTab = 'overview' | 'folder_structure' | 'technical_journeys' | 'layer_responsibilities' | 'vscode_execution_plan' | 'closing_declaration';

export const InternalEngineeringBlueprintView: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<SubTab>('overview');
  const [selectedLayerFilter, setSelectedLayerFilter] = useState<string>('All');
  const [selectedJourneyModule, setSelectedJourneyModule] = useState<string>('JOURNEY-01');
  const [copiedTaskId, setCopiedTaskId] = useState<string | null>(null);

  const handleCopyCode = (text: string, taskId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedTaskId(taskId);
    setTimeout(() => setCopiedTaskId(null), 2000);
  };

  const layersList = ['All', 'Presentation', 'Application / Domain', 'Infrastructure / Data', 'Edge Functions / Supabase', 'Config'];

  const filteredFolders = selectedLayerFilter === 'All' 
    ? PROJECT_FOLDER_STRUCTURE 
    : PROJECT_FOLDER_STRUCTURE.filter(f => f.layer === selectedLayerFilter);

  const activeJourney = MODULE_TECHNICAL_JOURNEYS.find(m => m.moduleId === selectedJourneyModule) || MODULE_TECHNICAL_JOURNEYS[0];

  return (
    <div className="h-full flex flex-col bg-slate-900 text-slate-100 overflow-y-auto">
      {/* Executive Header */}
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 border-b border-slate-800 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <ShieldCheck className="w-3.5 h-3.5" /> HOMOLOGADO & PRONTO PARA CÓDIGO
                </span>
                <span className="text-xs font-mono text-slate-400 bg-slate-800 px-2.5 py-1 rounded-md border border-slate-700">
                  VS Code Blueprint v1.0
                </span>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight flex items-center gap-2">
                <Code className="w-7 h-7 text-indigo-400" />
                EducaFlow Internal Engineering Blueprint
              </h1>
              <p className="text-sm text-slate-300 mt-1 max-w-4xl">
                Guia Definitivo de Implementação para Visual Studio Code — Mapeamento E2E das Camadas React, Dexie.js (Offline), Supabase, Edge Functions Deno, IA Aurora (Gemini 2.5 Flash) e Sprints de Código.
              </p>
            </div>

            {/* Role Credential Badges */}
            <div className="flex flex-wrap md:flex-col gap-2 text-right">
              <div className="bg-slate-800/80 border border-slate-700 px-3 py-1.5 rounded-lg text-xs">
                <span className="text-slate-400 block font-mono text-[10px] uppercase">Liderança Técnica</span>
                <span className="font-semibold text-indigo-300">Principal Architect & Staff Tech Lead</span>
              </div>
              <div className="bg-slate-800/80 border border-slate-700 px-3 py-1.5 rounded-lg text-xs">
                <span className="text-slate-400 block font-mono text-[10px] uppercase">Execução VS Code</span>
                <span className="font-semibold text-emerald-300">Sprints de Código de Produção</span>
              </div>
            </div>
          </div>

          {/* Quick Metrics Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
            <div className="bg-slate-800/50 border border-slate-700/60 p-3 rounded-xl flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-slate-400 block">Latência de UI</span>
                <span className="text-lg font-bold text-white">&lt; 16ms</span>
              </div>
            </div>

            <div className="bg-slate-800/50 border border-slate-700/60 p-3 rounded-xl flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <HardDrive className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-slate-400 block">Persistência Local</span>
                <span className="text-lg font-bold text-white">Dexie.js (IndexedDB)</span>
              </div>
            </div>

            <div className="bg-slate-800/50 border border-slate-700/60 p-3 rounded-xl flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-slate-400 block">Motor de IA</span>
                <span className="text-lg font-bold text-white">Gemini 2.5 Flash</span>
              </div>
            </div>

            <div className="bg-slate-800/50 border border-slate-700/60 p-3 rounded-xl flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-sky-500/10 text-sky-400 border border-sky-500/20">
                <RefreshCw className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-slate-400 block">Sincronização</span>
                <span className="text-lg font-bold text-white">Fila Assíncrona</span>
              </div>
            </div>
          </div>

          {/* Sub Navigation */}
          <div className="flex items-center gap-2 mt-6 overflow-x-auto pb-1 no-scrollbar border-t border-slate-800 pt-4">
            <button
              onClick={() => setActiveSubTab('overview')}
              className={`px-4 py-2 rounded-lg text-xs font-medium flex items-center gap-2 whitespace-nowrap transition-all ${
                activeSubTab === 'overview'
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                  : 'bg-slate-800/60 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
              }`}
            >
              <GitBranch className="w-4 h-4" /> Visão Geral & Arquitetura E2E
            </button>

            <button
              onClick={() => setActiveSubTab('folder_structure')}
              className={`px-4 py-2 rounded-lg text-xs font-medium flex items-center gap-2 whitespace-nowrap transition-all ${
                activeSubTab === 'folder_structure'
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                  : 'bg-slate-800/60 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
              }`}
            >
              <FolderTree className="w-4 h-4" /> Estrutura de Pastas VS Code
            </button>

            <button
              onClick={() => setActiveSubTab('technical_journeys')}
              className={`px-4 py-2 rounded-lg text-xs font-medium flex items-center gap-2 whitespace-nowrap transition-all ${
                activeSubTab === 'technical_journeys'
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                  : 'bg-slate-800/60 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
              }`}
            >
              <Activity className="w-4 h-4" /> Mapeamento de Jornadas Técnicas
            </button>

            <button
              onClick={() => setActiveSubTab('layer_responsibilities')}
              className={`px-4 py-2 rounded-lg text-xs font-medium flex items-center gap-2 whitespace-nowrap transition-all ${
                activeSubTab === 'layer_responsibilities'
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                  : 'bg-slate-800/60 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
              }`}
            >
              <Layers className="w-4 h-4" /> Responsabilidades das Camadas
            </button>

            <button
              onClick={() => setActiveSubTab('vscode_execution_plan')}
              className={`px-4 py-2 rounded-lg text-xs font-medium flex items-center gap-2 whitespace-nowrap transition-all ${
                activeSubTab === 'vscode_execution_plan'
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                  : 'bg-slate-800/60 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
              }`}
            >
              <Terminal className="w-4 h-4" /> Plano de Execução (VS Code Tasks)
            </button>

            <button
              onClick={() => setActiveSubTab('closing_declaration')}
              className={`px-4 py-2 rounded-lg text-xs font-medium flex items-center gap-2 whitespace-nowrap transition-all ${
                activeSubTab === 'closing_declaration'
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30'
                  : 'bg-slate-800/60 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
              }`}
            >
              <ShieldCheck className="w-4 h-4" /> Termo de Encerramento Oficial
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-6 max-w-7xl mx-auto w-full">
        {/* SUBTAB 1: ARCHITECTURE OVERVIEW */}
        {activeSubTab === 'overview' && (
          <div className="space-y-6">
            <div className="bg-slate-800/40 border border-slate-700/80 rounded-2xl p-6">
              <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-4">
                <GitBranch className="w-5 h-5 text-indigo-400" />
                Arquitetura do Sistema & Fluxo de Dados End-to-End
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                O EducaFlow adota uma arquitetura **Offline-First com Optimistic UI**, garantindo que todas as interações do professor em sala de aula tenham latência visual zero (&lt; 16ms). As gravações são efetuadas primeiro no banco local IndexedDB via **Dexie.js** e depois enfileiradas na `sync_queue` para sincronização assíncrona com o **Supabase PostgreSQL** e **Edge Functions**.
              </p>

              {/* End-to-End Diagram Representation */}
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 my-6">
                <div className="bg-slate-900 border border-indigo-500/30 p-4 rounded-xl flex flex-col items-center text-center">
                  <div className="p-3 bg-indigo-500/20 text-indigo-400 rounded-full mb-3">
                    <Cpu className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-bold text-indigo-300 block mb-1">1. Interface React</span>
                  <span className="text-[11px] text-slate-400">Toque tátil em sala de aula (Ex: Presença)</span>
                </div>

                <div className="hidden md:flex items-center justify-center text-slate-600">
                  <ArrowRight className="w-6 h-6 text-slate-500" />
                </div>

                <div className="bg-slate-900 border border-emerald-500/30 p-4 rounded-xl flex flex-col items-center text-center">
                  <div className="p-3 bg-emerald-500/20 text-emerald-400 rounded-full mb-3">
                    <HardDrive className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-bold text-emerald-300 block mb-1">2. Dexie.js (IndexedDB)</span>
                  <span className="text-[11px] text-slate-400">Escrita local &lt; 5ms e inserção na sync_queue</span>
                </div>

                <div className="hidden md:flex items-center justify-center text-slate-600">
                  <ArrowRight className="w-6 h-6 text-slate-500" />
                </div>

                <div className="bg-slate-900 border border-sky-500/30 p-4 rounded-xl flex flex-col items-center text-center">
                  <div className="p-3 bg-sky-500/20 text-sky-400 rounded-full mb-3">
                    <RefreshCw className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-bold text-sky-300 block mb-1">3. Sync Engine</span>
                  <span className="text-[11px] text-slate-400">Processa fila offline no evento online</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div className="bg-slate-900/80 border border-slate-700/80 p-5 rounded-xl">
                  <h3 className="text-sm font-bold text-indigo-300 flex items-center gap-2 mb-3">
                    <Server className="w-4 h-4 text-indigo-400" /> Supabase Backend & RLS
                  </h3>
                  <ul className="text-xs text-slate-300 space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                      <span>**Supabase Auth**: Gestão de JWT com perfis de professor e escola.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                      <span>**PostgreSQL RLS**: Regras de segurança isolando turmas por escola/professor.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                      <span>**Realtime Channel**: Transmissão imediata de chamadas finalizadas para o painel do coordenador.</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-slate-900/80 border border-slate-700/80 p-5 rounded-xl">
                  <h3 className="text-sm font-bold text-amber-300 flex items-center gap-2 mb-3">
                    <Bot className="w-4 h-4 text-amber-400" /> IA Aurora & Edge Functions
                  </h3>
                  <ul className="text-xs text-slate-300 space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 mt-0.5 shrink-0" />
                      <span>**Edge Function Deno**: Endpoints seguros protegendo a `GEMINI_API_KEY`.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 mt-0.5 shrink-0" />
                      <span>**Gemini 2.5 Flash**: Sugestões de planos alinhados à BNCC e adaptações para PDI/AEE.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 mt-0.5 shrink-0" />
                      <span>**Regra de Ouro**: A IA atua como assistente não intrusiva; nenhuma alteração é salva sem ok humano.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SUBTAB 2: FOLDER STRUCTURE */}
        {activeSubTab === 'folder_structure' && (
          <div className="space-y-6">
            <div className="bg-slate-800/40 border border-slate-700/80 rounded-2xl p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <FolderTree className="w-5 h-5 text-indigo-400" />
                    Estrutura de Pastas & Nomenclatura do Projeto
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">
                    Organização limpa com separação estrita de camadas e responsabilidades no VS Code.
                  </p>
                </div>

                {/* Filter Chips */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                  {layersList.map(layer => (
                    <button
                      key={layer}
                      onClick={() => setSelectedLayerFilter(layer)}
                      className={`px-3 py-1 rounded-full text-xs transition-all whitespace-nowrap ${
                        selectedLayerFilter === layer
                          ? 'bg-indigo-600 text-white font-semibold'
                          : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {layer}
                    </button>
                  ))}
                </div>
              </div>

              {/* Table of Folders */}
              <div className="overflow-x-auto border border-slate-700/80 rounded-xl">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-900/90 text-slate-300 font-mono uppercase text-[10px] border-b border-slate-700">
                    <tr>
                      <th className="p-3">Caminho do Arquivo / Diretorio</th>
                      <th className="p-3">Camada</th>
                      <th className="p-3">Descrição Técnica</th>
                      <th className="p-3">Responsabilidade Principal</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 text-slate-300">
                    {filteredFolders.map((node, idx) => (
                      <tr key={idx} className="hover:bg-slate-800/40 transition-colors">
                        <td className="p-3 font-mono text-indigo-300 font-medium flex items-center gap-2">
                          {node.type === 'dir' ? (
                            <FolderTree className="w-4 h-4 text-amber-400 shrink-0" />
                          ) : (
                            <FileCode className="w-4 h-4 text-sky-400 shrink-0" />
                          )}
                          {node.path}
                        </td>
                        <td className="p-3 whitespace-nowrap">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-semibold border ${
                            node.layer === 'Presentation' ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20' :
                            node.layer === 'Application / Domain' ? 'bg-sky-500/10 text-sky-400 border-sky-500/20' :
                            node.layer === 'Infrastructure / Data' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                            node.layer === 'Edge Functions / Supabase' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                            'bg-slate-700/50 text-slate-300 border-slate-600'
                          }`}>
                            {node.layer}
                          </span>
                        </td>
                        <td className="p-3">{node.description}</td>
                        <td className="p-3 text-slate-400">{node.responsibility}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* SUBTAB 3: TECHNICAL JOURNEYS */}
        {activeSubTab === 'technical_journeys' && (
          <div className="space-y-6">
            <div className="bg-slate-800/40 border border-slate-700/80 rounded-2xl p-6">
              <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-2">
                <Activity className="w-5 h-5 text-indigo-400" />
                Mapeamento da Jornada Técnica End-to-End por Módulo
              </h2>
              <p className="text-xs text-slate-400 mb-6">
                Rastreabilidade completa de cada ação do usuário através do estado, IndexedDB, Sync Engine, Supabase DB e IA.
              </p>

              {/* Module Selector */}
              <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
                {MODULE_TECHNICAL_JOURNEYS.map(journey => (
                  <button
                    key={journey.moduleId}
                    onClick={() => setSelectedJourneyModule(journey.moduleId)}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
                      selectedJourneyModule === journey.moduleId
                        ? 'bg-indigo-600 text-white shadow-md'
                        : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                    }`}
                  >
                    <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-slate-900/60">
                      {journey.moduleId}
                    </span>
                    {journey.moduleName}
                  </button>
                ))}
              </div>

              {/* Active Journey Specs */}
              <div className="bg-slate-900/90 border border-slate-700 rounded-xl p-5 mb-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-base font-bold text-indigo-300">
                    {activeJourney.moduleName}
                  </h3>
                  <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-md">
                    Objetivo Principal
                  </span>
                </div>
                <p className="text-xs text-slate-300">{activeJourney.primaryGoal}</p>
              </div>

              {/* Journey Steps Accordion / Cards */}
              <div className="space-y-4">
                {activeJourney.steps.map(step => (
                  <div key={step.stepNumber} className="bg-slate-900/70 border border-slate-800 rounded-xl p-5 hover:border-slate-700 transition-all">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="w-7 h-7 rounded-full bg-indigo-600 text-white text-xs font-bold flex items-center justify-center shrink-0">
                        {step.stepNumber}
                      </span>
                      <h4 className="text-sm font-bold text-white">{step.stageName}</h4>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
                      <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                        <span className="text-[10px] font-mono text-indigo-400 block uppercase font-bold mb-1">
                          Ação no Frontend (UI)
                        </span>
                        <p className="text-slate-300">{step.frontendAction}</p>
                      </div>

                      <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                        <span className="text-[10px] font-mono text-sky-400 block uppercase font-bold mb-1">
                          Gerenciamento de Estado (Zustand)
                        </span>
                        <p className="text-slate-300">{step.stateManagement}</p>
                      </div>

                      <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                        <span className="text-[10px] font-mono text-emerald-400 block uppercase font-bold mb-1">
                          Persistência Local (Dexie.js)
                        </span>
                        <p className="text-slate-300">{step.offlineStorageDexie}</p>
                      </div>

                      <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                        <span className="text-[10px] font-mono text-amber-400 block uppercase font-bold mb-1">
                          Sync Engine & Edge Function
                        </span>
                        <p className="text-slate-300">{step.syncAndEdgeFunction}</p>
                      </div>

                      <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                        <span className="text-[10px] font-mono text-purple-400 block uppercase font-bold mb-1">
                          Supabase DB & RLS
                        </span>
                        <p className="text-slate-300">{step.supabaseDbAndRls}</p>
                      </div>

                      <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                        <span className="text-[10px] font-mono text-rose-400 block uppercase font-bold mb-1">
                          Tratamento de Erros & Auditoria
                        </span>
                        <p className="text-slate-300">{step.auditAndErrorHandling}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* SUBTAB 4: LAYER RESPONSIBILITIES */}
        {activeSubTab === 'layer_responsibilities' && (
          <div className="space-y-6">
            <div className="bg-slate-800/40 border border-slate-700/80 rounded-2xl p-6">
              <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-2">
                <Layers className="w-5 h-5 text-indigo-400" />
                Responsabilidades das Camadas & Padrões de Código
              </h2>
              <p className="text-xs text-slate-400 mb-6">
                Regras claras de isolamento para evitar vazamento de lógica de infraestrutura na UI.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {LAYER_RESPONSIBILITIES.map((layer, idx) => (
                  <div key={idx} className="bg-slate-900/80 border border-slate-700/80 rounded-xl p-5 flex flex-col justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-indigo-300 mb-1">{layer.layerName}</h3>
                      <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded block w-fit mb-4">
                        {layer.technologyStack}
                      </span>

                      <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-2">
                        Responsabilidades Principais:
                      </h4>
                      <ul className="text-xs text-slate-300 space-y-1.5 mb-4">
                        {layer.coreResponsibilities.map((resp, rIdx) => (
                          <li key={rIdx} className="flex items-start gap-2">
                            <ChevronRight className="w-3.5 h-3.5 text-indigo-400 shrink-0 mt-0.5" />
                            <span>{resp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 mt-2">
                      <span className="text-[10px] font-mono text-slate-400 block mb-1">
                        Padrão / Exemplo de Código:
                      </span>
                      <code className="text-[11px] font-mono text-indigo-300 block overflow-x-auto">
                        {layer.codeExamplePattern}
                      </code>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* SUBTAB 5: VS CODE EXECUTION PLAN */}
        {activeSubTab === 'vscode_execution_plan' && (
          <div className="space-y-6">
            <div className="bg-slate-800/40 border border-slate-700/80 rounded-2xl p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <Terminal className="w-5 h-5 text-indigo-400" />
                    Plano de Execução Técnico (Tarefas Sequenciais VS Code)
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">
                    Sequência exata de tarefas para desenvolvimento direto no editor com testes imediatos.
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                {VSCODE_EXECUTION_PLAN.map(task => (
                  <div key={task.taskId} className="bg-slate-900 border border-slate-700 rounded-xl p-5 hover:border-indigo-500/40 transition-all">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3 pb-3 border-b border-slate-800">
                      <div className="flex items-center gap-3">
                        <span className="px-2.5 py-1 rounded font-mono text-xs font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                          {task.taskId}
                        </span>
                        <h3 className="text-sm font-bold text-white">{task.taskTitle}</h3>
                      </div>

                      <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/20 w-fit">
                        {task.sprintPhase}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 text-xs mb-4">
                      <div>
                        <span className="text-[10px] font-mono text-slate-400 block uppercase font-bold mb-2">
                          Passos de Implementação:
                        </span>
                        <ul className="space-y-1.5 text-slate-300">
                          {task.implementationSteps.map((step, sIdx) => (
                            <li key={sIdx} className="flex items-start gap-2">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                              <span>{step}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <span className="text-[10px] font-mono text-slate-400 block uppercase font-bold mb-2">
                          Arquivos Alvo no VS Code:
                        </span>
                        <div className="flex flex-wrap gap-1.5 mb-3">
                          {task.targetFiles.map((f, fIdx) => (
                            <span key={fIdx} className="px-2 py-1 rounded bg-slate-950 font-mono text-[11px] text-sky-300 border border-slate-800">
                              {f}
                            </span>
                          ))}
                        </div>

                        <span className="text-[10px] font-mono text-slate-400 block uppercase font-bold mb-1">
                          Comando de Teste / Verificação:
                        </span>
                        <div className="bg-slate-950 p-2 rounded border border-slate-800 font-mono text-[11px] text-amber-300 flex items-center justify-between">
                          <span>{task.verificationCommand}</span>
                          <button
                            onClick={() => handleCopyCode(task.verificationCommand, task.taskId)}
                            className="p-1 hover:bg-slate-800 rounded text-slate-400 hover:text-white transition-colors"
                            title="Copiar Comando"
                          >
                            {copiedTaskId === task.taskId ? (
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="bg-slate-950/80 p-3 rounded-lg border border-slate-800/80 text-xs text-slate-300 flex items-center gap-2">
                      <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase shrink-0">
                        Definition of Done:
                      </span>
                      <span>{task.definitionOfDone}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* SUBTAB 6: CLOSING DECLARATION */}
        {activeSubTab === 'closing_declaration' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-b from-slate-900 to-indigo-950/40 border border-emerald-500/30 rounded-2xl p-8 max-w-4xl mx-auto text-center">
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto mb-4">
                <ShieldCheck className="w-8 h-8" />
              </div>

              <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full uppercase tracking-wider font-semibold">
                Protocolo: {ENGINEERING_CLOSING_DECLARATION.protocolNumber}
              </span>

              <h2 className="text-2xl font-bold text-white mt-4 mb-2">
                {ENGINEERING_CLOSING_DECLARATION.title}
              </h2>
              <p className="text-xs text-slate-400 font-mono mb-6">
                Data de Vigência: {ENGINEERING_CLOSING_DECLARATION.effectiveDate}
              </p>

              <p className="text-sm text-slate-200 leading-relaxed bg-slate-900/90 border border-slate-800 p-6 rounded-xl text-left font-serif mb-8 italic">
                "{ENGINEERING_CLOSING_DECLARATION.declarationText}"
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
                {ENGINEERING_CLOSING_DECLARATION.signatories.map((sig, idx) => (
                  <div key={idx} className="bg-slate-900 p-3 rounded-xl border border-slate-800 text-xs">
                    <span className="text-slate-400 block font-mono text-[10px] uppercase">Função</span>
                    <span className="font-bold text-white block mb-1">{sig.role}</span>
                    <span className="inline-flex items-center gap-1 text-[10px] text-emerald-400 font-medium">
                      <CheckCircle2 className="w-3 h-3" /> {sig.status}
                    </span>
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
