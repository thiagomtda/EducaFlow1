import React, { useState } from 'react';
import { SMART_FLOWS_MISSIONS } from '../data/uxJourneyData';
import { SmartFlowMission } from '../types';
import { 
  Compass, 
  ArrowRight, 
  Zap, 
  MousePointer, 
  Clock, 
  CheckCircle2, 
  Sparkles, 
  Layers, 
  Brain,
  CalendarCheck,
  FileText,
  Award,
  CheckSquare,
  HeartHandshake,
  Users,
  UserCheck
} from 'lucide-react';

const ICON_MAP: Record<string, React.ReactNode> = {
  CalendarCheck: <CalendarCheck className="w-5 h-5 text-indigo-500" />,
  FileText: <FileText className="w-5 h-5 text-emerald-500" />,
  Award: <Award className="w-5 h-5 text-amber-500" />,
  CheckSquare: <CheckSquare className="w-5 h-5 text-blue-500" />,
  HeartHandshake: <HeartHandshake className="w-5 h-5 text-rose-500" />,
  Users: <Users className="w-5 h-5 text-purple-500" />,
  UsersCheck: <UserCheck className="w-5 h-5 text-teal-500" />,
  Sparkles: <Sparkles className="w-5 h-5 text-yellow-500" />
};


export const SmartFlowsView = () => {
  const [selectedMissionId, setSelectedMissionId] = useState<string>('mission-1');

  const selectedMission: SmartFlowMission = 
    SMART_FLOWS_MISSIONS.find(m => m.id === selectedMissionId) || SMART_FLOWS_MISSIONS[0];

  return (
    <div className="p-8 space-y-6 overflow-y-auto h-full bg-slate-50">
      {/* Header Banner */}
      <div className="bg-slate-900 text-white rounded-xl p-6 border border-slate-800 shadow-lg relative overflow-hidden">
        <div className="space-y-2 relative z-10 max-w-3xl">
          <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 text-xs font-bold rounded-full border border-emerald-500/30 uppercase tracking-widest inline-block">
            Novo Paradigma de UX
          </span>
          <h3 className="text-2xl font-black text-white tracking-tight">
            Fluxos Inteligentes — Substituindo Menus Tradicionais por Missões Naturais
          </h3>
          <p className="text-slate-300 text-sm leading-relaxed">
            Professores não querem navegar por taxonomias complexas de menus. No EducaFlow, cada ação é formulada como uma <strong>missão contínua</strong> que conecta o ponto de partida ao resultado final com o menor número possível de passos.
          </p>
        </div>
      </div>

      {/* Grid of the 8 Smart Flow Missions Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {SMART_FLOWS_MISSIONS.map((mission) => {
          const isSelected = mission.id === selectedMissionId;
          return (
            <button
              key={mission.id}
              onClick={() => setSelectedMissionId(mission.id)}
              className={`p-4 rounded-xl border text-left transition-all space-y-3 cursor-pointer relative ${
                isSelected
                  ? 'bg-indigo-900 text-white border-indigo-700 shadow-md ring-2 ring-indigo-500/40'
                  : 'bg-white hover:bg-slate-100 text-slate-800 border-slate-200'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className={`p-2 rounded-lg ${isSelected ? 'bg-indigo-800/80 text-white' : 'bg-slate-100'}`}>
                  {ICON_MAP[mission.iconName] || <Compass className="w-5 h-5 text-indigo-500" />}
                </div>
                <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded font-mono ${
                  isSelected ? 'bg-emerald-500 text-slate-950' : 'bg-emerald-100 text-emerald-800'
                }`}>
                  {mission.totalClicksAfter} cliques ({mission.estimatedTimeAfter})
                </span>
              </div>

              <div>
                <h4 className="text-xs font-extrabold tracking-tight line-clamp-1">{mission.missionName}</h4>
                <p className={`text-[11px] mt-1 line-clamp-2 leading-snug ${
                  isSelected ? 'text-indigo-200' : 'text-slate-500'
                }`}>
                  {mission.tagline}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Deep-Dive into the Selected Mission Path */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-6">
        {/* Mission Header */}
        <div className="pb-4 border-b border-slate-100 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 bg-indigo-50 text-indigo-700 text-[10px] font-bold rounded-full border border-indigo-200 uppercase">
                Missão de Trabalho
              </span>
              <span className="text-xs font-bold text-slate-400">EducaFlow UX Architecture</span>
            </div>
            <h3 className="text-xl font-black text-slate-900">{selectedMission.missionName}</h3>
            <p className="text-xs text-slate-600 font-medium">{selectedMission.tagline}</p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="p-3 bg-rose-50 rounded-lg border border-rose-200 text-center">
              <p className="text-[10px] font-bold text-rose-700 uppercase">Sem Fluxo Inteligente</p>
              <p className="text-sm font-black text-rose-900 font-mono">{selectedMission.totalClicksBefore} cliques • {selectedMission.estimatedTimeBefore}</p>
            </div>
            <ArrowRight className="w-5 h-5 text-slate-300 hidden sm:block" />
            <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-300 text-center">
              <p className="text-[10px] font-bold text-emerald-800 uppercase">Com Fluxo Inteligente</p>
              <p className="text-sm font-black text-emerald-950 font-mono">{selectedMission.totalClicksAfter} cliques • {selectedMission.estimatedTimeAfter}</p>
            </div>
          </div>
        </div>

        {/* Traditional Menu Path vs Smart Flow Shortcut Comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-slate-400" />
              <span>Menu Tradicional Burocrático (Atrito Alto)</span>
            </span>
            <p className="text-xs font-mono text-slate-600 bg-white p-3 rounded-lg border border-slate-200 leading-relaxed">
              {selectedMission.traditionalMenuPath}
            </p>
          </div>

          <div className="p-4 bg-emerald-50/60 rounded-xl border border-emerald-200 space-y-2">
            <span className="text-xs font-bold text-emerald-900 uppercase tracking-wider flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-emerald-600" />
              <span>Atalho Nativo do Fluxo Inteligente (Atrito Mínimo)</span>
            </span>
            <p className="text-xs font-mono font-bold text-emerald-950 bg-white p-3 rounded-lg border border-emerald-300 leading-relaxed">
              {selectedMission.smartFlowShortcutPath}
            </p>
          </div>
        </div>

        {/* Cognitive Psychology Pill */}
        <div className="p-4 bg-indigo-950 text-white rounded-xl border border-indigo-900 flex items-start gap-3">
          <Brain className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h5 className="text-xs font-bold text-indigo-300 uppercase tracking-wider">Fundamentação na Psicologia Cognitiva</h5>
            <p className="text-xs text-indigo-100 leading-relaxed">{selectedMission.cognitivePill}</p>
          </div>
        </div>

        {/* Step-by-Step Path (Passo a Passo da Missão) */}
        <div className="space-y-4">
          <h4 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-indigo-600" />
            <span>Passo a Passo do Menor Caminho Possível ({selectedMission.steps.length} Etapas)</span>
          </h4>

          <div className="space-y-3">
            {selectedMission.steps.map((step) => (
              <div key={step.stepNumber} className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex flex-col md:flex-row items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-indigo-600 text-white font-extrabold text-xs flex items-center justify-center shrink-0 shadow-xs">
                  {step.stepNumber}
                </div>

                <div className="space-y-2 flex-1">
                  <h5 className="text-sm font-bold text-slate-900">{step.stepName}</h5>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                    <div className="p-3 bg-white rounded-lg border border-slate-200">
                      <span className="text-[10px] font-bold text-indigo-600 uppercase block mb-1">Ação do Professor:</span>
                      <p className="text-slate-700 font-medium">{step.userAction}</p>
                    </div>

                    <div className="p-3 bg-indigo-50/50 rounded-lg border border-indigo-100">
                      <span className="text-[10px] font-bold text-slate-700 uppercase block mb-1">Resposta do Sistema:</span>
                      <p className="text-slate-800 font-medium">{step.systemAction}</p>
                    </div>
                  </div>

                  <div className="p-2.5 bg-amber-50 rounded-lg border border-amber-200 text-[11px] text-amber-900 font-mono">
                    💡 <strong>Microcopy / Dica de Interface:</strong> {step.microCopyOrInterfaceHint}
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
