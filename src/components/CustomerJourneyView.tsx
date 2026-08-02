import React, { useState } from 'react';
import { CUSTOMER_JOURNEY_STAGES } from '../data/cxAndAiData';
import { CustomerJourneyStageData } from '../types';
import { 
  Compass, 
  Globe, 
  Sparkles, 
  CreditCard, 
  UserCheck, 
  LogIn, 
  Settings, 
  Zap, 
  CalendarCheck, 
  RefreshCw, 
  HeartHandshake,
  ArrowRight,
  AlertTriangle,
  HelpCircle,
  TrendingUp,
  Smile,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

const ICON_MAP: Record<string, React.ReactNode> = {
  Compass: <Compass className="w-5 h-5" />,
  Globe: <Globe className="w-5 h-5" />,
  Sparkles: <Sparkles className="w-5 h-5" />,
  CreditCard: <CreditCard className="w-5 h-5" />,
  UserCheck: <UserCheck className="w-5 h-5" />,
  LogIn: <LogIn className="w-5 h-5" />,
  Settings: <Settings className="w-5 h-5" />,
  Zap: <Zap className="w-5 h-5" />,
  CalendarCheck: <CalendarCheck className="w-5 h-5" />,
  RefreshCw: <RefreshCw className="w-5 h-5" />,
  HeartHandshake: <HeartHandshake className="w-5 h-5" />
};

export const CustomerJourneyView = () => {
  const [selectedStageNumber, setSelectedStageNumber] = useState<number>(1);

  const selectedStage = CUSTOMER_JOURNEY_STAGES.find(s => s.stageNumber === selectedStageNumber) || CUSTOMER_JOURNEY_STAGES[0];

  return (
    <div className="p-8 space-y-6 overflow-y-auto h-full bg-slate-50">
      {/* Header Banner */}
      <div className="bg-slate-900 text-white rounded-xl p-6 border border-slate-800 shadow-lg relative overflow-hidden">
        <div className="space-y-2 relative z-10 max-w-3xl">
          <span className="px-3 py-1 bg-amber-500/20 text-amber-300 text-xs font-bold rounded-full border border-amber-500/30 uppercase tracking-widest inline-block">
            Mapeamento End-to-End de CX & Service Design
          </span>
          <h3 className="text-2xl font-black text-white tracking-tight">
            Jornada do Cliente EducaFlow (As 11 Etapas de Experiência)
          </h3>
          <p className="text-slate-300 text-sm leading-relaxed">
            Do primeiro contato com a marca ao uso diário, renovação e indicação orgânica. Projetada para eliminar fricções e encantar o professor de Ensino Fundamental I em cada momento.
          </p>
        </div>
      </div>

      {/* Horizontal Stage Stepper / Selector */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs overflow-x-auto">
        <div className="flex items-center min-w-max gap-2">
          {CUSTOMER_JOURNEY_STAGES.map((stg) => {
            const isSelected = stg.stageNumber === selectedStageNumber;
            return (
              <button
                key={stg.stageNumber}
                onClick={() => setSelectedStageNumber(stg.stageNumber)}
                className={`px-3 py-2.5 rounded-lg border text-left transition-all cursor-pointer flex items-center gap-2.5 shrink-0 ${
                  isSelected
                    ? 'bg-amber-500 text-slate-950 border-amber-600 shadow-sm font-black'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200 font-medium'
                }`}
              >
                <div className={`p-1.5 rounded-md ${isSelected ? 'bg-slate-950 text-amber-400' : 'bg-slate-200 text-slate-700'}`}>
                  {ICON_MAP[stg.iconName] || <Compass className="w-4 h-4" />}
                </div>
                <div>
                  <span className={`text-[9px] font-mono font-extrabold uppercase block ${isSelected ? 'text-slate-900' : 'text-slate-400'}`}>
                    Etapa {stg.stageNumber}
                  </span>
                  <span className="text-xs truncate max-w-[120px] block">{stg.stageName}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Stage Detail Card */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-6">
        {/* Stage Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-slate-100 gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-amber-500 text-slate-950 rounded-xl shadow-sm">
              {ICON_MAP[selectedStage.iconName]}
            </div>
            <div>
              <span className="text-xs font-bold text-amber-600 uppercase tracking-wider font-mono">
                Etapa {selectedStage.stageNumber} de 11
              </span>
              <h3 className="text-xl font-black text-slate-900">{selectedStage.stageName}</h3>
            </div>
          </div>

          <div className="p-3 bg-slate-900 text-white rounded-xl text-xs max-w-md border border-slate-800">
            <span className="font-bold text-amber-400 block mb-0.5">Objetivo Direto do Professor:</span>
            <p className="text-slate-200 leading-snug">{selectedStage.userObjective}</p>
          </div>
        </div>

        {/* 6 Key UX Dimensions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* 1. Emoções Predominantes */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-center gap-2 text-xs font-extrabold text-slate-800 uppercase tracking-wider">
              <Smile className="w-4 h-4 text-indigo-600" />
              <span>Emoções Predominantes</span>
            </div>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {selectedStage.predominantEmotions.map((emo, idx) => (
                <span key={idx} className="px-2.5 py-1 bg-white border border-slate-200 text-slate-800 text-xs font-semibold rounded-md shadow-2xs">
                  {emo}
                </span>
              ))}
            </div>
          </div>

          {/* 2. Possíveis Dúvidas */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-center gap-2 text-xs font-extrabold text-slate-800 uppercase tracking-wider">
              <HelpCircle className="w-4 h-4 text-amber-600" />
              <span>Possíveis Dúvidas</span>
            </div>
            <ul className="space-y-1.5 text-xs text-slate-700 pt-1 font-medium">
              {selectedStage.possibleDoubts.map((dbt, idx) => (
                <li key={idx} className="flex items-start gap-1.5">
                  <span className="text-amber-500 font-bold">•</span>
                  <span>{dbt}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. Barreiras / Riscos de Churn */}
          <div className="p-4 rounded-xl bg-rose-50/60 border border-rose-200 space-y-2">
            <div className="flex items-center gap-2 text-xs font-extrabold text-rose-900 uppercase tracking-wider">
              <AlertTriangle className="w-4 h-4 text-rose-600" />
              <span>Barreiras de Desistência</span>
            </div>
            <ul className="space-y-1.5 text-xs text-rose-900 pt-1 font-medium">
              {selectedStage.churnBarriers.map((bar, idx) => (
                <li key={idx} className="flex items-start gap-1.5">
                  <span className="text-rose-500 font-bold">•</span>
                  <span>{bar}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 4. Como o EducaFlow Surpreende (Delight) */}
          <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200 space-y-2 md:col-span-2">
            <div className="flex items-center gap-2 text-xs font-extrabold text-emerald-950 uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>Como o EducaFlow Surpreende Positivamente</span>
            </div>
            <ul className="space-y-2 text-xs text-emerald-950 pt-1 font-semibold">
              {selectedStage.positiveSurprises.map((surp, idx) => (
                <li key={idx} className="flex items-start gap-2 bg-white p-2.5 rounded-lg border border-emerald-200/80 shadow-2xs">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{surp}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 5. Métrica de Sucesso (KPI) */}
          <div className="p-4 rounded-xl bg-indigo-900 text-white border border-indigo-800 space-y-2">
            <div className="flex items-center gap-2 text-xs font-extrabold text-indigo-300 uppercase tracking-wider">
              <TrendingUp className="w-4 h-4 text-amber-400" />
              <span>Métrica de Sucesso da Etapa</span>
            </div>
            <div className="p-3 bg-indigo-950 rounded-lg border border-indigo-800 text-xs font-bold text-amber-300">
              {selectedStage.successMetric}
            </div>
          </div>
        </div>
      </div>

      {/* Grid Summary of all 11 Stages */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-4">
        <h4 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-indigo-600" />
          <span>Visão Consolidada das 11 Etapas da Jornada</span>
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {CUSTOMER_JOURNEY_STAGES.map((stg) => {
            const isSelected = stg.stageNumber === selectedStageNumber;
            return (
              <div
                key={stg.stageNumber}
                onClick={() => setSelectedStageNumber(stg.stageNumber)}
                className={`p-3.5 rounded-xl border cursor-pointer transition-all space-y-2 ${
                  isSelected
                    ? 'bg-amber-500 text-slate-950 border-amber-600 font-bold shadow-sm'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded ${
                    isSelected ? 'bg-slate-950 text-amber-400' : 'bg-slate-200 text-slate-700'
                  }`}>
                    Etapa {stg.stageNumber}
                  </span>
                  <div className={`p-1 rounded ${isSelected ? 'bg-slate-950 text-white' : 'text-slate-500'}`}>
                    {ICON_MAP[stg.iconName]}
                  </div>
                </div>
                <h5 className="text-xs font-extrabold leading-snug">{stg.stageName}</h5>
                <p className={`text-[11px] line-clamp-2 ${isSelected ? 'text-slate-900' : 'text-slate-500'}`}>
                  {stg.userObjective}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
