import React, { useState } from 'react';
import { USER_FLOW_MASTER_PATHS } from '../data/cxAndAiData';
import { UserFlowPathData } from '../types';
import { 
  GitCommit, 
  Clock, 
  CheckCircle2, 
  ArrowRight, 
  Zap, 
  ShieldCheck, 
  Sparkles,
  Layers,
  ChevronRight,
  MousePointerClick
} from 'lucide-react';

export const UserFlowMasterView = () => {
  const [selectedPathId, setSelectedPathId] = useState<string>('flow-1');

  const selectedPath = USER_FLOW_MASTER_PATHS.find(p => p.id === selectedPathId) || USER_FLOW_MASTER_PATHS[0];

  return (
    <div className="p-8 space-y-6 overflow-y-auto h-full bg-slate-50">
      {/* Header Banner */}
      <div className="bg-slate-900 text-white rounded-xl p-6 border border-slate-800 shadow-lg relative overflow-hidden">
        <div className="space-y-2 relative z-10 max-w-3xl">
          <span className="px-3 py-1 bg-indigo-500/20 text-indigo-300 text-xs font-bold rounded-full border border-indigo-500/30 uppercase tracking-widest inline-block">
            Documento Mestre de Navegação & UX
          </span>
          <h3 className="text-2xl font-black text-white tracking-tight">
            User Flow Master — Todos os Caminhos da Plataforma
          </h3>
          <p className="text-slate-300 text-sm leading-relaxed">
            Mapeamento completo dos fluxos do professor: do login até a conclusão das missões essenciais sem labirintos de menus, eliminando atritos e reduzindo cliques a zero atrito.
          </p>
        </div>
      </div>

      {/* Grid of Flow Selector Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {USER_FLOW_MASTER_PATHS.map((flow) => {
          const isSelected = flow.id === selectedPathId;
          return (
            <button
              key={flow.id}
              onClick={() => setSelectedPathId(flow.id)}
              className={`p-4 rounded-xl border text-left transition-all space-y-2 cursor-pointer relative ${
                isSelected
                  ? 'bg-indigo-600 text-white border-indigo-500 shadow-md ring-2 ring-indigo-400/30'
                  : 'bg-white hover:bg-slate-100 text-slate-800 border-slate-200'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded ${
                  isSelected ? 'bg-indigo-700 text-indigo-100' : 'bg-slate-100 text-slate-600'
                }`}>
                  {flow.category}
                </span>
                <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded ${
                  isSelected ? 'bg-emerald-500 text-slate-950 font-bold' : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                }`}>
                  ⏱ {flow.idealCompletionTime}
                </span>
              </div>

              <h4 className="text-xs font-extrabold leading-snug line-clamp-2">{flow.flowTitle}</h4>

              <div className="flex items-center gap-1 text-[10px] font-medium opacity-80 pt-1">
                <MousePointerClick className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">{flow.steps.length} Etapas Enxutas</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Flow Detailed Breakdown */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-6">
        <div className="pb-4 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 bg-indigo-50 text-indigo-700 text-[10px] font-bold rounded-full border border-indigo-200 uppercase">
                {selectedPath.category}
              </span>
              <span className="text-xs font-bold text-slate-400">Fluxo do Professor</span>
            </div>
            <h3 className="text-xl font-black text-slate-900">{selectedPath.flowTitle}</h3>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="p-3 bg-indigo-50 border border-indigo-100 rounded-xl text-xs text-indigo-950 font-bold">
              ⏱ Tempo Ideal: <span className="text-indigo-700 font-extrabold">{selectedPath.idealCompletionTime}</span>
            </div>
          </div>
        </div>

        {/* Entry Point & End Goal Banner */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-medium">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="font-extrabold text-slate-500 uppercase tracking-wider block text-[10px]">
              Ponto de Entrada (Entry Point):
            </span>
            <p className="text-slate-800 font-bold">{selectedPath.entryPoint}</p>
          </div>

          <div className="p-4 rounded-xl bg-emerald-50/80 border border-emerald-200 space-y-1">
            <span className="font-extrabold text-emerald-800 uppercase tracking-wider block text-[10px]">
              Objetivo Final Alcançado (End Goal):
            </span>
            <p className="text-emerald-950 font-bold">{selectedPath.endGoal}</p>
          </div>
        </div>

        {/* Friction Prevented */}
        <div className="p-3.5 bg-rose-50/70 border border-rose-200 rounded-xl text-xs font-medium text-rose-950 flex items-start gap-2">
          <ShieldCheck className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
          <div>
            <strong className="text-rose-900 block mb-0.5">Atritos Tradicionais Eliminados:</strong>
            {selectedPath.keyFrictionPointsPrevented}
          </div>
        </div>

        {/* Step-by-Step Detailed Visual Pipeline */}
        <div className="space-y-4 pt-2">
          <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-2">
            <Layers className="w-4 h-4 text-indigo-600" />
            <span>Passo a Passo Detalhado do Fluxo</span>
          </h4>

          <div className="space-y-3">
            {selectedPath.steps.map((step) => (
              <div 
                key={step.stepNumber}
                className="p-4 rounded-xl border border-slate-200 bg-slate-50 hover:bg-white transition-all space-y-2"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-full bg-slate-900 text-white text-xs font-black flex items-center justify-center shrink-0">
                      {step.stepNumber}
                    </span>
                    <h5 className="text-xs font-extrabold text-slate-900">{step.action}</h5>
                  </div>

                  <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 bg-indigo-50 text-indigo-700 border border-indigo-200 rounded-md shrink-0">
                    Tela/Estado: {step.screenOrState}
                  </span>
                </div>

                {/* Automated Shortcuts / AI Magic */}
                <div className="p-3 bg-white rounded-lg border border-slate-200 text-xs text-slate-700 font-medium flex items-start gap-2">
                  <Sparkles className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900">Atalho / Mágica do Sistema:</strong> {step.automatedShortcuts}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
