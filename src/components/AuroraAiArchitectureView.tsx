import React, { useState } from 'react';
import { 
  AURORA_COGNITIVE_LEVELS, 
  AURORA_BOUNDARIES, 
  MASTER_PROMPTS_LIBRARY, 
  KNOWLEDGE_SOURCES_REGISTRY, 
  RAG_ENGINE_ARCHITECTURE, 
  SAFETY_GUARDRAILS_RULES, 
  EVALUATION_METRICS_SUITE, 
  CAIO_TECHNICAL_OPINION 
} from '../data/auroraAiArchitectureData';
import { MasterPromptSpec } from '../types';
import { 
  Sparkles, 
  Cpu, 
  BookOpen, 
  ShieldAlert, 
  BarChart3, 
  CheckCircle2, 
  Terminal, 
  Code2, 
  Copy, 
  Check, 
  Layers, 
  Database, 
  Lock, 
  Search, 
  AlertTriangle, 
  ArrowRight, 
  UserCheck, 
  Workflow, 
  FileText, 
  ShieldCheck, 
  Zap, 
  Bot, 
  Scale, 
  Eye, 
  Activity,
  FileCode
} from 'lucide-react';

export const AuroraAiArchitectureView: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<
    'cognitive_arch' | 'prompt_bible' | 'knowledge_rag' | 'safety_guardrails' | 'evaluation_metrics' | 'caio_opinion'
  >('cognitive_arch');

  const [selectedPromptId, setSelectedPromptId] = useState<string>(MASTER_PROMPTS_LIBRARY[0].id);
  const [copiedPrompt, setCopiedPrompt] = useState<boolean>(false);

  const currentPrompt: MasterPromptSpec = 
    MASTER_PROMPTS_LIBRARY.find(p => p.id === selectedPromptId) || MASTER_PROMPTS_LIBRARY[0];

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(currentPrompt.systemInstruction);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2000);
  };

  return (
    <div className="h-full flex flex-col bg-slate-50 overflow-y-auto">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-900 text-white border-b border-indigo-900/50 p-6 md:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2.5 py-1 bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded-full text-xs font-semibold tracking-wider uppercase flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Aurora AI Engine v1.0
                </span>
                <span className="px-2.5 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-full text-xs font-semibold">
                  Soberania Docente & Safe AI
                </span>
              </div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                Aurora AI Architecture & Prompt Engineering Bible
              </h1>
              <p className="text-slate-300 text-sm md:text-base mt-1 max-w-3xl">
                Especificação da Arquitetura Cognitiva, Prompts Mestres do MVP, Estratégia de RAG/Knowledge, Guardrails de Segurança, Framework de Métricas e Parecer Técnico do CAIO.
              </p>
            </div>

            <div className="flex items-center gap-3 bg-slate-800/80 p-3 rounded-xl border border-slate-700/60 backdrop-blur-sm">
              <div className="text-right">
                <div className="text-xs text-slate-400 font-medium">Liderança de IA & Segurança</div>
                <div className="text-xs font-bold text-amber-300">Chief AI Officer & AI Safety Board</div>
              </div>
            </div>
          </div>

          {/* Sub-navigation Bar */}
          <div className="flex items-center gap-2 mt-6 overflow-x-auto pb-1 scrollbar-none border-t border-slate-800/80 pt-4">
            <button
              onClick={() => setActiveSubTab('cognitive_arch')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all whitespace-nowrap ${
                activeSubTab === 'cognitive_arch'
                  ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20 font-bold'
                  : 'bg-slate-800/60 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-700/50'
              }`}
            >
              <Cpu className="w-4 h-4" />
              1. Arquitetura Cognitiva & Autonomia
            </button>

            <button
              onClick={() => setActiveSubTab('prompt_bible')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all whitespace-nowrap ${
                activeSubTab === 'prompt_bible'
                  ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20 font-bold'
                  : 'bg-slate-800/60 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-700/50'
              }`}
            >
              <Code2 className="w-4 h-4" />
              2. Prompt Engineering Bible (Mestres)
            </button>

            <button
              onClick={() => setActiveSubTab('knowledge_rag')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all whitespace-nowrap ${
                activeSubTab === 'knowledge_rag'
                  ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20 font-bold'
                  : 'bg-slate-800/60 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-700/50'
              }`}
            >
              <Database className="w-4 h-4" />
              3. Knowledge Architecture & RAG
            </button>

            <button
              onClick={() => setActiveSubTab('safety_guardrails')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all whitespace-nowrap ${
                activeSubTab === 'safety_guardrails'
                  ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20 font-bold'
                  : 'bg-slate-800/60 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-700/50'
              }`}
            >
              <ShieldAlert className="w-4 h-4" />
              4. AI Safety & Guardrails
            </button>

            <button
              onClick={() => setActiveSubTab('evaluation_metrics')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all whitespace-nowrap ${
                activeSubTab === 'evaluation_metrics'
                  ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20 font-bold'
                  : 'bg-slate-800/60 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-700/50'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              5. AI Evaluation Framework
            </button>

            <button
              onClick={() => setActiveSubTab('caio_opinion')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all whitespace-nowrap ${
                activeSubTab === 'caio_opinion'
                  ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20 font-bold'
                  : 'bg-slate-800/60 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-700/50'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              6. Parecer do Chief AI Officer
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl w-full mx-auto p-4 md:p-8 flex-1">
        {/* SUBTAB 1: COGNITIVE ARCHITECTURE & AUTONOMY */}
        {activeSubTab === 'cognitive_arch' && (
          <div className="space-y-8">
            {/* Principles & Boundaries Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center gap-2 text-indigo-900 border-b border-slate-100 pb-3">
                  <Bot className="w-5 h-5 text-indigo-600" />
                  <h2 className="text-base font-extrabold">Responsabilidades Centrais da Aurora</h2>
                </div>
                <ul className="space-y-2">
                  {AURORA_BOUNDARIES.responsibilities.map((resp, idx) => (
                    <li key={idx} className="text-xs text-slate-700 flex items-start gap-2 bg-indigo-50/50 p-2.5 rounded border border-indigo-100">
                      <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                      <span className="font-medium">{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center gap-2 text-red-900 border-b border-slate-100 pb-3">
                  <ShieldAlert className="w-5 h-5 text-red-600" />
                  <h2 className="text-base font-extrabold">Limites Rígidos de Atuação (Proibições)</h2>
                </div>
                <ul className="space-y-2">
                  {AURORA_BOUNDARIES.strictLimits.map((lim, idx) => (
                    <li key={idx} className="text-xs text-slate-700 flex items-start gap-2 bg-red-50/50 p-2.5 rounded border border-red-200">
                      <AlertTriangle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                      <span className="font-bold text-red-950">{lim}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Cognitive Levels Spectrum */}
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
                  <Cpu className="w-5 h-5 text-amber-500" />
                  Matriz de Níveis de Autonomia Cognitiva (Nível 0 ao Nível 4)
                </h2>
                <p className="text-xs text-slate-600 mt-1">
                  Modelo Human-in-the-Loop garantindo soberania pedagógica total do professor regente.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {AURORA_COGNITIVE_LEVELS.map((lvl, idx) => {
                  const isForbidden = lvl.level === 'Nível 4';
                  const isPrimary = lvl.level === 'Nível 1';
                  return (
                    <div 
                      key={idx} 
                      className={`p-4 rounded-xl border flex flex-col justify-between space-y-3 transition-all ${
                        isForbidden 
                          ? 'bg-red-950 text-white border-red-800' 
                          : isPrimary
                          ? 'bg-indigo-900 text-white border-indigo-700 shadow-md ring-2 ring-indigo-500'
                          : 'bg-slate-50 text-slate-900 border-slate-200'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className={`text-[10px] font-mono font-extrabold px-2 py-0.5 rounded ${
                            isForbidden ? 'bg-red-800 text-white' : isPrimary ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-800'
                          }`}>
                            {lvl.level}
                          </span>
                          {isForbidden && (
                            <span className="text-[10px] bg-red-600 text-white font-extrabold px-1.5 py-0.5 rounded">
                              PROIBIDO
                            </span>
                          )}
                        </div>
                        <h3 className="text-xs font-bold mt-1 line-clamp-2">{lvl.title}</h3>
                        <p className={`text-[11px] mt-2 leading-snug ${
                          isForbidden ? 'text-red-200' : isPrimary ? 'text-indigo-200' : 'text-slate-600'
                        }`}>
                          {lvl.description}
                        </p>
                      </div>

                      <div className="pt-2 border-t border-slate-200/20 text-[10px]">
                        <span className="font-bold block mb-1">Validação Humana:</span>
                        <span className={`italic ${isForbidden ? 'text-red-300' : isPrimary ? 'text-indigo-200' : 'text-slate-600'}`}>
                          {lvl.humanValidationGate}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* SUBTAB 2: PROMPT ENGINEERING BIBLE */}
        {activeSubTab === 'prompt_bible' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Sidebar with Prompt List */}
            <div className="lg:col-span-4 space-y-4">
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-3">
                <h3 className="font-bold text-slate-900 flex items-center gap-2 text-sm border-b border-slate-100 pb-2">
                  <Code2 className="w-4 h-4 text-amber-500" />
                  Biblioteca de Prompts Mestres MVP
                </h3>

                <div className="space-y-2">
                  {MASTER_PROMPTS_LIBRARY.map((p) => {
                    const isSelected = p.id === selectedPromptId;
                    return (
                      <button
                        key={p.id}
                        onClick={() => setSelectedPromptId(p.id)}
                        className={`w-full text-left p-3 rounded-lg transition-all border ${
                          isSelected
                            ? 'bg-amber-50 border-amber-500 text-amber-950 font-medium shadow-sm'
                            : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-300">
                            {p.code}
                          </span>
                          <span className="text-[10px] text-slate-500 font-mono">v{p.version}</span>
                        </div>
                        <h4 className="text-xs font-bold mt-1.5">{p.name}</h4>
                        <p className="text-[11px] text-slate-600 line-clamp-1 mt-1">{p.targetFeature}</p>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Prompt Code & Spec Inspector */}
            <div className="lg:col-span-8 space-y-6">
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6">
                {/* Header */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-2.5 py-0.5 bg-amber-100 text-amber-900 font-mono font-bold rounded text-xs border border-amber-300">
                        {currentPrompt.code}
                      </span>
                      <span className="text-xs text-slate-500 font-mono">Modelo: {currentPrompt.modelAlias} (Temp: {currentPrompt.temperature})</span>
                    </div>
                    <h2 className="text-xl font-extrabold text-slate-900">{currentPrompt.name}</h2>
                  </div>

                  <button
                    onClick={handleCopyPrompt}
                    className="flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold px-3 py-2 rounded-lg transition-all"
                  >
                    {copiedPrompt ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedPrompt ? 'Copiado!' : 'Copiar System Instruction'}</span>
                  </button>
                </div>

                {/* System Instruction Code Box */}
                <div>
                  <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Terminal className="w-4 h-4 text-indigo-600" /> System Instruction Permanente
                  </h3>
                  <div className="bg-slate-950 text-slate-200 p-4 rounded-xl font-mono text-xs leading-relaxed overflow-x-auto border border-slate-800 shadow-inner whitespace-pre-wrap">
                    {currentPrompt.systemInstruction}
                  </div>
                </div>

                {/* Variables Table */}
                <div>
                  <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <FileCode className="w-4 h-4 text-amber-500" /> Variáveis Dinâmicas de Contexto
                  </h3>
                  <div className="overflow-x-auto border border-slate-200 rounded-lg">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-100 font-mono uppercase text-[10px] text-slate-700">
                        <tr>
                          <th className="p-2.5">Variável</th>
                          <th className="p-2.5">Tipo</th>
                          <th className="p-2.5">Descrição</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200">
                        {currentPrompt.variables.map((v, idx) => (
                          <tr key={idx} className="hover:bg-slate-50">
                            <td className="p-2.5 font-mono font-bold text-indigo-700">{`{{${v.name}}}`}</td>
                            <td className="p-2.5 font-mono text-slate-500">{v.type}</td>
                            <td className="p-2.5 text-slate-700">{v.description}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Few-Shot Example */}
                <div>
                  <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-500" /> Exemplo de Poucas Amostras (Few-Shot Input / Output)
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-slate-900 text-slate-200 p-3.5 rounded-lg border border-slate-800 font-mono text-xs overflow-x-auto">
                      <span className="text-amber-400 font-bold block mb-1">ENTRADA (INPUT JSON):</span>
                      <pre className="whitespace-pre-wrap text-[11px] text-slate-300">{currentPrompt.fewShotExample.input}</pre>
                    </div>

                    <div className="bg-slate-900 text-slate-200 p-3.5 rounded-lg border border-slate-800 font-mono text-xs overflow-x-auto">
                      <span className="text-emerald-400 font-bold block mb-1">SAÍDA ESPERADA (OUTPUT):</span>
                      <pre className="whitespace-pre-wrap text-[11px] text-emerald-200">{currentPrompt.fewShotExample.output}</pre>
                    </div>
                  </div>
                </div>

                {/* Output Schema & Guardrails */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200">
                    <span className="text-xs font-bold text-slate-700 block mb-1">Schema de Saída:</span>
                    <span className="text-xs font-mono text-indigo-800 bg-indigo-50 px-2 py-1 rounded border border-indigo-200 block">
                      {currentPrompt.outputFormatSchema}
                    </span>
                  </div>

                  <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200">
                    <span className="text-xs font-bold text-slate-700 block mb-1">Guardrails Aplicados:</span>
                    <div className="flex flex-wrap gap-1">
                      {currentPrompt.guardrailsApplied.map((g, idx) => (
                        <span key={idx} className="text-[10px] font-mono bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded border border-emerald-300">
                          ✓ {g}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SUBTAB 3: KNOWLEDGE ARCHITECTURE & RAG */}
        {activeSubTab === 'knowledge_rag' && (
          <div className="space-y-8">
            {/* Knowledge Sources Registry */}
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
              <div className="border-b border-slate-100 pb-3">
                <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
                  <Database className="w-5 h-5 text-indigo-600" />
                  Fontes Oficiais de Conhecimento & Priorização do RAG
                </h2>
                <p className="text-xs text-slate-600 mt-1">
                  Hierarquia de fontes de dados pedagógicas e legais para fundamentação das respostas da IA.
                </p>
              </div>

              <div className="overflow-x-auto border border-slate-200 rounded-xl">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-900 text-white font-mono uppercase text-[10px]">
                    <tr>
                      <th className="p-3">Prioridade</th>
                      <th className="p-3">Fonte Oficial</th>
                      <th className="p-3">Categoria</th>
                      <th className="p-3">Frequência de Atualização</th>
                      <th className="p-3">Estratégia de Chunking</th>
                      <th className="p-3">Modelo Embedding</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {KNOWLEDGE_SOURCES_REGISTRY.map((ks) => (
                      <tr key={ks.id} className="hover:bg-slate-50">
                        <td className="p-3">
                          <span className={`px-2 py-0.5 rounded font-bold font-mono text-[11px] ${
                            ks.priorityLevel === 1 ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-800'
                          }`}>
                            P{ks.priorityLevel}
                          </span>
                        </td>
                        <td className="p-3 font-bold text-slate-900">{ks.name}</td>
                        <td className="p-3">
                          <span className="bg-slate-100 text-slate-800 px-2 py-0.5 rounded text-[11px] border border-slate-200">
                            {ks.category}
                          </span>
                        </td>
                        <td className="p-3 text-slate-600">{ks.updateFrequency}</td>
                        <td className="p-3 font-mono text-[11px] text-indigo-800 bg-indigo-50/50">{ks.ragChunkingStrategy}</td>
                        <td className="p-3 font-mono text-slate-600">{ks.embeddingModel}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* RAG Engine Architecture Diagram Box */}
            <div className="bg-slate-900 text-white p-6 rounded-xl border border-slate-800 shadow-sm space-y-4">
              <h3 className="text-base font-extrabold text-amber-400 flex items-center gap-2">
                <Workflow className="w-5 h-5 text-amber-400" />
                Pipeline de Busca Híbrida RAG (BM25 + Dense Similarity + Rerank)
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-2">
                <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 text-xs space-y-1">
                  <span className="text-amber-300 font-bold font-mono block">1. Vector Database</span>
                  <p className="text-slate-300 text-[11px]">{RAG_ENGINE_ARCHITECTURE.vectorDatabase}</p>
                </div>

                <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 text-xs space-y-1">
                  <span className="text-amber-300 font-bold font-mono block">2. Hybrid Search</span>
                  <p className="text-slate-300 text-[11px]">{RAG_ENGINE_ARCHITECTURE.hybridSearchMethod}</p>
                </div>

                <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 text-xs space-y-1">
                  <span className="text-amber-300 font-bold font-mono block">3. Cache Local Offline</span>
                  <p className="text-slate-300 text-[11px]">{RAG_ENGINE_ARCHITECTURE.cachingLayer}</p>
                </div>

                <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 text-xs space-y-1">
                  <span className="text-amber-300 font-bold font-mono block">4. Reranker</span>
                  <p className="text-slate-300 text-[11px]">{RAG_ENGINE_ARCHITECTURE.rerankingModel}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SUBTAB 4: AI SAFETY & GUARDRAILS */}
        {activeSubTab === 'safety_guardrails' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
              <div>
                <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
                  <ShieldAlert className="w-5 h-5 text-red-600" />
                  Guardrails de Segurança da Aurora & Proteção LGPD
                </h2>
                <p className="text-xs text-slate-600 mt-1">
                  Camadas de verificação determinística para barrar alucinações de códigos da BNCC, linguagem discriminatória e vazamento de dados sensíveis.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {SAFETY_GUARDRAILS_RULES.map((rule) => (
                  <div key={rule.id} className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold bg-slate-200 text-slate-800 px-2 py-0.5 rounded">
                        {rule.id}
                      </span>
                      <span className="text-[10px] font-mono bg-indigo-100 text-indigo-900 px-2 py-0.5 rounded border border-indigo-200">
                        {rule.enforcementLayer}
                      </span>
                    </div>

                    <h3 className="text-sm font-extrabold text-slate-900">{rule.category}</h3>
                    <p className="text-xs text-slate-700 leading-relaxed">{rule.description}</p>

                    <div className="bg-white p-2.5 rounded border border-slate-200 text-xs">
                      <span className="font-bold text-slate-900 block">Ação em caso de violação:</span>
                      <span className="text-emerald-700 font-medium">{rule.actionOnViolation}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* SUBTAB 5: AI EVALUATION FRAMEWORK */}
        {activeSubTab === 'evaluation_metrics' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
              <div>
                <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-indigo-600" />
                  AI Evaluation Framework & Métricas Continuas
                </h2>
                <p className="text-xs text-slate-600 mt-1">
                  Métricas de avaliação de qualidade pedagógica, latência e satisfação do professor regente.
                </p>
              </div>

              <div className="overflow-x-auto border border-slate-200 rounded-xl">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-900 text-white font-mono uppercase text-[10px]">
                    <tr>
                      <th className="p-3">Métrica de Avaliação</th>
                      <th className="p-3">Categoria</th>
                      <th className="p-3">Meta / Benchmark</th>
                      <th className="p-3">Ferramenta de Medição</th>
                      <th className="p-3">Frequência</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {EVALUATION_METRICS_SUITE.map((met, idx) => (
                      <tr key={idx} className="hover:bg-slate-50">
                        <td className="p-3 font-bold text-slate-900">{met.metricName}</td>
                        <td className="p-3">
                          <span className="bg-indigo-50 text-indigo-900 px-2 py-0.5 rounded text-[11px] border border-indigo-200 font-medium">
                            {met.category}
                          </span>
                        </td>
                        <td className="p-3 font-mono font-bold text-emerald-700">{met.targetBenchmark}</td>
                        <td className="p-3 text-slate-600">{met.measurementTool}</td>
                        <td className="p-3 text-slate-500 font-mono">{met.frequency}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* SUBTAB 6: CAIO OFFICIAL TECHNICAL OPINION */}
        {activeSubTab === 'caio_opinion' && (
          <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm space-y-6">
            <div className="border-b border-slate-200 pb-4">
              <span className="text-xs font-mono font-bold bg-amber-100 text-amber-900 px-3 py-1 rounded-full border border-amber-300">
                PARECER OFICIAL DO CHIEF AI OFFICER & AI SAFETY BOARD
              </span>
              <h2 className="text-2xl font-extrabold text-slate-900 mt-2">
                Aprovação Final da Arquitetura Cognitiva Aurora v1.0
              </h2>
              <p className="text-sm text-slate-600 mt-1">
                Data de emissão: {CAIO_TECHNICAL_OPINION.date} • Avaliado por: {CAIO_TECHNICAL_OPINION.evaluatorTitle}
              </p>
            </div>

            <div className="bg-emerald-50 p-5 rounded-xl border border-emerald-200 space-y-3">
              <h3 className="text-sm font-bold text-emerald-950 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Veredito de Prontidão Técnica
              </h3>
              <p className="text-xs text-emerald-900 leading-relaxed font-medium">
                {CAIO_TECHNICAL_OPINION.technicalVerdict}
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-sm font-bold text-slate-900">Análise de Riscos Residuais & Planos de Mitigação</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {CAIO_TECHNICAL_OPINION.residualRisksAndMitigations.map((item, idx) => (
                  <div key={idx} className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs space-y-2">
                    <div>
                      <span className="font-bold text-amber-900 block">Risco Residual #{idx + 1}:</span>
                      <span className="text-slate-700">{item.risk}</span>
                    </div>
                    <div>
                      <span className="font-bold text-emerald-900 block">Plano de Mitigação:</span>
                      <span className="text-emerald-800">{item.mitigation}</span>
                    </div>
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
