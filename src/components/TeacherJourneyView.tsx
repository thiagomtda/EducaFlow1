import { useState } from 'react';
import { TEACHER_JOURNEY_STAGES } from '../data/uxJourneyData';
import { 
  Clock, 
  MapPin, 
  HelpCircle, 
  Heart, 
  Sparkles, 
  Zap, 
  ShieldCheck, 
  CheckCircle2, 
  Smile, 
  ArrowRight,
  Sun,
  BookOpen,
  Coffee,
  Moon
} from 'lucide-react';

const STAGE_ICONS = [
  <Sun className="w-5 h-5 text-amber-500" />,
  <BookOpen className="w-5 h-5 text-indigo-500" />,
  <Coffee className="w-5 h-5 text-emerald-500" />,
  <Moon className="w-5 h-5 text-purple-500" />
];

export const TeacherJourneyView = () => {
  const [selectedStageId, setSelectedStageId] = useState<string>('j1');

  const selectedStage = TEACHER_JOURNEY_STAGES.find(s => s.id === selectedStageId) || TEACHER_JOURNEY_STAGES[0];

  return (
    <div className="p-8 space-y-6 overflow-y-auto h-full bg-slate-50">
      {/* Header Banner */}
      <div className="bg-slate-900 text-white rounded-xl p-6 border border-slate-800 shadow-lg relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="space-y-2 relative z-10 max-w-3xl">
          <span className="px-3 py-1 bg-indigo-500/20 text-indigo-300 text-xs font-bold rounded-full border border-indigo-500/30 uppercase tracking-widest inline-block">
            Mapeamento de UX & Psicologia Cognitiva
          </span>
          <h3 className="text-2xl font-black text-white tracking-tight">
            Jornada Cognitiva Completa do Professor (Do Despertar ao Descanso)
          </h3>
          <p className="text-slate-300 text-sm leading-relaxed">
            Análise do estado mental, emocional e fisiológico do professor em 4 momentos do seu dia de trabalho, projetando respostas tecnológicas incolores, sem atrito e com foco em redução imediata de ansiedade.
          </p>
        </div>
      </div>

      {/* Stage Selector Tabs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {TEACHER_JOURNEY_STAGES.map((stage, idx) => {
          const isSelected = stage.id === selectedStageId;
          return (
            <button
              key={stage.id}
              onClick={() => setSelectedStageId(stage.id)}
              className={`p-4 rounded-xl border transition-all text-left space-y-2 cursor-pointer relative overflow-hidden ${
                isSelected
                  ? 'bg-indigo-600 text-white border-indigo-500 shadow-md ring-2 ring-indigo-400/30'
                  : 'bg-white hover:bg-slate-100 text-slate-800 border-slate-200'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className={`p-2 rounded-lg ${isSelected ? 'bg-white/10 text-white' : 'bg-slate-100'}`}>
                  {STAGE_ICONS[idx]}
                </div>
                <span className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded ${
                  isSelected ? 'bg-indigo-700 text-indigo-100' : 'bg-slate-100 text-slate-500'
                }`}>
                  {stage.timeframe}
                </span>
              </div>

              <div>
                <span className={`text-[10px] font-bold uppercase tracking-wider block ${
                  isSelected ? 'text-indigo-200' : 'text-slate-400'
                }`}>
                  {stage.stageNumber}
                </span>
                <h4 className="text-xs font-extrabold truncate mt-0.5">{stage.title}</h4>
              </div>
            </button>
          );
        })}
      </div>

      {/* Detailed Stage Deep-Dive - Responding to all 8 UX Questions */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-6">
        {/* Stage Header Info */}
        <div className="pb-4 border-b border-slate-100 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 bg-indigo-50 text-indigo-700 text-[10px] font-bold rounded-full border border-indigo-200 uppercase">
                {selectedStage.stageNumber}
              </span>
              <span className="text-xs font-mono font-bold text-slate-500 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-indigo-500" />
                Horário: {selectedStage.timeframe}
              </span>
            </div>
            <h3 className="text-lg font-black text-slate-900 mt-1">{selectedStage.title}</h3>
            <p className="text-xs text-slate-500 mt-1 flex items-center gap-1.5 font-medium">
              <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
              <span>Ambiente Físico/Contexto: <strong>{selectedStage.contextLocation}</strong></span>
            </p>
          </div>
        </div>

        {/* The 8 Strategic UX Questions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Question 1: What is thinking? */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
              <HelpCircle className="w-4 h-4 text-indigo-600" />
              <span>1. O que o professor está pensando?</span>
            </span>
            <p className="text-xs text-slate-700 font-medium italic leading-relaxed bg-white p-3 rounded-lg border border-slate-200">
              "{selectedStage.whatIsThinking}"
            </p>
          </div>

          {/* Question 2: What is feeling? */}
          <div className="p-4 bg-rose-50/60 rounded-xl border border-rose-200 space-y-2">
            <span className="text-xs font-bold text-rose-900 uppercase tracking-wider flex items-center gap-1.5">
              <Heart className="w-4 h-4 text-rose-600" />
              <span>2. O que ele sente?</span>
            </span>
            <p className="text-xs text-rose-950 font-semibold leading-relaxed bg-white/80 p-3 rounded-lg border border-rose-200/80">
              {selectedStage.whatIsFeeling}
            </p>
          </div>

          {/* Question 3: What is needing? */}
          <div className="p-4 bg-amber-50/60 rounded-xl border border-amber-200 space-y-2">
            <span className="text-xs font-bold text-amber-900 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>3. O que ele precisa naquele momento?</span>
            </span>
            <p className="text-xs text-amber-950 leading-relaxed font-medium bg-white/80 p-3 rounded-lg border border-amber-200/80">
              {selectedStage.whatIsNeeding}
            </p>
          </div>

          {/* Question 4: Immediate platform response */}
          <div className="p-4 bg-indigo-950 text-white rounded-xl border border-indigo-900 space-y-2">
            <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-indigo-400" />
              <span>4. Resposta Imediata da Plataforma EducaFlow</span>
            </span>
            <p className="text-xs text-indigo-100 leading-relaxed font-medium bg-indigo-900/60 p-3 rounded-lg border border-indigo-800/80">
              {selectedStage.immediatePlatformResponse}
            </p>
          </div>
        </div>

        {/* Lower Grid: Friction, Anxiety, Time & Delight */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          {/* Question 5: Click Reduction */}
          <div className="p-4 bg-emerald-50/60 rounded-xl border border-emerald-200 space-y-1.5">
            <span className="text-[11px] font-bold text-emerald-900 uppercase tracking-wider flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              5. Como Reduzir o Número de Cliques?
            </span>
            <p className="text-xs text-emerald-950 leading-relaxed font-medium">
              {selectedStage.clickReductionStrategy}
            </p>
          </div>

          {/* Question 6: Anxiety Reduction */}
          <div className="p-4 bg-blue-50/60 rounded-xl border border-blue-200 space-y-1.5">
            <span className="text-[11px] font-bold text-blue-900 uppercase tracking-wider flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
              6. Como Reduzir a Ansiedade?
            </span>
            <p className="text-xs text-blue-950 leading-relaxed font-medium">
              {selectedStage.anxietyReductionStrategy}
            </p>
          </div>

          {/* Question 7: Time Savings */}
          <div className="p-4 bg-purple-50/60 rounded-xl border border-purple-200 space-y-1.5">
            <span className="text-[11px] font-bold text-purple-900 uppercase tracking-wider flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-purple-600" />
              7. Como Economizar Tempo?
            </span>
            <p className="text-xs text-purple-950 leading-relaxed font-medium">
              {selectedStage.timeSavingsStrategy}
            </p>
          </div>
        </div>

        {/* Question 8: Delight Factors */}
        <div className="p-4 bg-slate-900 text-white rounded-xl border border-slate-800 space-y-2">
          <span className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
            <Smile className="w-4 h-4 text-amber-400" />
            <span>8. Fatores para Tornar a Experiência Agradável e Acolhedora</span>
          </span>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
            {selectedStage.delightfulExperienceFactors.map((factor, fIdx) => (
              <div key={fIdx} className="p-3 bg-slate-800 rounded-lg border border-slate-700 text-xs text-slate-200 flex items-start gap-2">
                <span className="w-5 h-5 rounded bg-indigo-500/20 text-indigo-300 text-[10px] font-mono font-bold flex items-center justify-center shrink-0">
                  {fIdx + 1}
                </span>
                <span className="leading-relaxed">{factor}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
