import React from 'react';
import { RESEARCH_PERSONAS, PAIN_POINTS } from '../data/painsData';
import { ActiveTabType } from '../types';
import { 
  Users, 
  Heart, 
  Clock, 
  AlertOctagon, 
  Calendar, 
  CheckCircle, 
  ArrowRight,
  Bookmark
} from 'lucide-react';

interface ResearchIntroViewProps {
  onNavigateStage: (stage: ActiveTabType) => void;
}

export const ResearchIntroView: React.FC<ResearchIntroViewProps> = ({ onNavigateStage }) => {
  const persona = RESEARCH_PERSONAS.teacher;

  const totalHoursWeekSpentInBueraucracy = 14.5;
  const criticalPainsCount = PAIN_POINTS.filter(p => p.stressLevel === 'Crítico' || p.stressLevel === 'Alto').length;

  return (
    <div className="p-8 space-y-6 overflow-y-auto h-full bg-slate-50">
      {/* Research Methodology Header Banner */}
      <div className="bg-slate-900 text-white rounded-xl p-6 border border-slate-800 shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-2xl">
            <span className="px-3 py-1 bg-purple-500/20 text-purple-300 text-xs font-bold rounded-full border border-purple-500/30 uppercase tracking-widest inline-block">
              Time de UX Research Multidisciplinar
            </span>
            <h3 className="text-2xl font-black text-white tracking-tight">
              Mapa das Dores do Professor do Ensino Fundamental I
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              Compreensão profunda da rotina docente real de professores brasileiros do 1º ao 5º ano antes de desenhar qualquer solução tecnológica. Foco na escuta empática e na ergonomia do trabalho docente.
            </p>
          </div>

          <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700 shrink-0 space-y-2 w-full md:w-64">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Média de Horas Burocráticas</div>
            <div className="text-3xl font-extrabold text-rose-400 font-mono">14.5 h/sem</div>
            <div className="text-[11px] text-slate-300 leading-tight">
              Trabalho não remunerado fora do horário escolar preenchendo diários, planos e pareceres.
            </div>
          </div>
        </div>
      </div>

      {/* Primary Persona Card */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider flex items-center gap-1.5">
            <Users className="w-4 h-4" /> Persona Principal da Pesquisa
          </span>
          <span className="px-2.5 py-0.5 bg-slate-100 text-slate-700 text-[10px] font-bold rounded">
            EF1 - 1º ao 5º Ano
          </span>
        </div>

        <div className="flex flex-col md:flex-row items-start gap-6">
          <div className="w-20 h-20 rounded-full bg-indigo-100 border-2 border-indigo-400 flex items-center justify-center font-bold text-indigo-700 text-xl shrink-0">
            CS
          </div>

          <div className="space-y-3 flex-1">
            <div>
              <h4 className="text-lg font-bold text-slate-900">{persona.name}</h4>
              <p className="text-xs font-semibold text-slate-500">{persona.schoolType} — {persona.gradesCount}</p>
            </div>

            <blockquote className="p-3 bg-rose-50 border-l-4 border-rose-500 rounded-r-lg text-xs italic text-rose-900 leading-relaxed">
              "{persona.quote}"
            </blockquote>

            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs text-slate-700">
              <strong>Rotina Diária Típica:</strong> {persona.dailyRoutineSummary}
            </div>
          </div>
        </div>
      </div>

      {/* The 5 Life Stages Navigation Grid */}
      <div className="space-y-3">
        <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
          Explorar as 5 Etapas da Rotina Docente
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          <button
            onClick={() => onNavigateStage('before')}
            className="p-4 bg-white hover:bg-indigo-50/50 rounded-xl border border-slate-200 hover:border-indigo-400 transition-all text-left space-y-2 cursor-pointer shadow-xs group"
          >
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 font-bold flex items-center justify-center text-xs group-hover:bg-indigo-600 group-hover:text-white transition-colors">
              1
            </div>
            <h5 className="text-xs font-bold text-slate-900">1. Antes da Aula</h5>
            <p className="text-[11px] text-slate-500 leading-tight">Planejamento semanal, busca de materiais e alinhamento à BNCC.</p>
          </button>

          <button
            onClick={() => onNavigateStage('during')}
            className="p-4 bg-white hover:bg-indigo-50/50 rounded-xl border border-slate-200 hover:border-indigo-400 transition-all text-left space-y-2 cursor-pointer shadow-xs group"
          >
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 font-bold flex items-center justify-center text-xs group-hover:bg-indigo-600 group-hover:text-white transition-colors">
              2
            </div>
            <h5 className="text-xs font-bold text-slate-900">2. Durante a Aula</h5>
            <p className="text-[11px] text-slate-500 leading-tight">Chamada, controle de ritmo e acompanhamento da alfabetização.</p>
          </button>

          <button
            onClick={() => onNavigateStage('after')}
            className="p-4 bg-white hover:bg-indigo-50/50 rounded-xl border border-slate-200 hover:border-indigo-400 transition-all text-left space-y-2 cursor-pointer shadow-xs group"
          >
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 font-bold flex items-center justify-center text-xs group-hover:bg-indigo-600 group-hover:text-white transition-colors">
              3
            </div>
            <h5 className="text-xs font-bold text-slate-900">3. Depois da Aula</h5>
            <p className="text-[11px] text-slate-500 leading-tight">Preenchimento de diário de classe e correção manual de cadernos.</p>
          </button>

          <button
            onClick={() => onNavigateStage('closing')}
            className="p-4 bg-white hover:bg-indigo-50/50 rounded-xl border border-slate-200 hover:border-indigo-400 transition-all text-left space-y-2 cursor-pointer shadow-xs group"
          >
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 font-bold flex items-center justify-center text-xs group-hover:bg-indigo-600 group-hover:text-white transition-colors">
              4
            </div>
            <h5 className="text-xs font-bold text-slate-900">4. Fechamentos</h5>
            <p className="text-[11px] text-slate-500 leading-tight">Pareceres descritivos individuais e consolidação de médias.</p>
          </button>

          <button
            onClick={() => onNavigateStage('year_round')}
            className="p-4 bg-white hover:bg-indigo-50/50 rounded-xl border border-slate-200 hover:border-indigo-400 transition-all text-left space-y-2 cursor-pointer shadow-xs group"
          >
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 font-bold flex items-center justify-center text-xs group-hover:bg-indigo-600 group-hover:text-white transition-colors">
              5
            </div>
            <h5 className="text-xs font-bold text-slate-900">5. No Ano Letivo</h5>
            <p className="text-[11px] text-slate-500 leading-tight">Mensagens de pais de alunos e acompanhamento do currículo.</p>
          </button>
        </div>
      </div>

      {/* Summary KPI Callout */}
      <div className="p-6 bg-indigo-950 text-white rounded-xl border border-indigo-900 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="space-y-1">
          <p className="text-xs font-bold text-indigo-300 uppercase tracking-wider">Próximo Passo no Estudo de UX</p>
          <p className="text-sm font-semibold text-white">
            Foram mapeadas {PAIN_POINTS.length} dores críticas na jornada docente. {criticalPainsCount} possuem nível de estresse "Alto" ou "Crítico".
          </p>
        </div>

        <button
          onClick={() => onNavigateStage('before')}
          className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-lg transition-colors flex items-center gap-2 shrink-0 cursor-pointer shadow-xs"
        >
          <span>Iniciar Análise Etapa por Etapa</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
