import React from 'react';
import { PAIN_POINTS } from '../data/painsData';
import { PainStageId } from '../types';
import { 
  AlertOctagon, 
  Clock, 
  Calendar, 
  Heart, 
  HelpCircle, 
  CheckCircle2, 
  XCircle, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface PainMapStageViewProps {
  stageId: PainStageId;
  onNavigateMatrix: () => void;
}

const STAGE_METADATA: Record<PainStageId, { title: string; number: string; description: string }> = {
  before: {
    number: 'Etapa 1',
    title: 'Antes da Aula (Preparação & Planejamento)',
    description: 'Investigação do tempo gasto aos sábados e domingos preparando aulas, buscando atividades no Pinterest/Google e tentando encaixar códigos da BNCC.'
  },
  during: {
    number: 'Etapa 2',
    title: 'Durante a Aula (Regência & Gestão de Sala)',
    description: 'Análise dos momentos de fricção em sala do 1º ao 5º ano: chamada aluno por aluno, controle da turma e diagnóstico de hipóteses de escrita.'
  },
  after: {
    number: 'Etapa 3',
    title: 'Depois da Aula (Diário & Correções em Casa)',
    description: 'Diagnóstico da maior fonte de exaustão docente: preenchimento de portais governamentais lentos e mochilas cheias de cadernos para corrigir à noite.'
  },
  closing: {
    number: 'Etapa 4',
    title: 'Fechamentos Bimestrais & Avaliações',
    description: 'Picos intensos de estresse no fim de bimestre: redação manual de pareceres pedagógicos descritivos individuais e fechamento de médias.'
  },
  year_round: {
    number: 'Etapa 5',
    title: 'Durante o Ano Letivo (Comunicação & Gestão)',
    description: 'Invasão do WhatsApp pessoal fora do expediente, reuniões com pais e incerteza sobre o cumprimento do currículo anual exigido.'
  }
};

export const PainMapStageView: React.FC<PainMapStageViewProps> = ({ stageId, onNavigateMatrix }) => {
  const meta = STAGE_METADATA[stageId];
  const stagePains = PAIN_POINTS.filter(p => p.stageId === stageId);

  return (
    <div className="p-8 space-y-6 overflow-y-auto h-full bg-slate-50">
      {/* Stage Header Banner */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <span className="px-2.5 py-1 bg-indigo-50 text-indigo-700 text-[10px] font-bold rounded-full uppercase tracking-wider border border-indigo-100">
            {meta.number} de 5
          </span>
          <h3 className="text-xl font-bold text-slate-900 mt-1">{meta.title}</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl leading-relaxed">{meta.description}</p>
        </div>

        <button
          onClick={onNavigateMatrix}
          className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold transition-colors shrink-0 flex items-center gap-1.5 cursor-pointer"
        >
          <span>Ir para Matriz Geral</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Pain Points Detailed Accordion Cards */}
      <div className="space-y-6">
        {stagePains.map((pain, index) => (
          <div key={pain.id} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden space-y-0">
            {/* Card Header */}
            <div className="p-5 bg-slate-900 text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 bg-indigo-500/30 text-indigo-200 text-[10px] font-mono font-bold rounded border border-indigo-400/30">
                    DOR #{index + 1}
                  </span>
                  <span className={`px-2 py-0.5 text-[10px] font-extrabold uppercase rounded ${
                    pain.stressLevel === 'Crítico' ? 'bg-rose-500 text-white' :
                    pain.stressLevel === 'Alto' ? 'bg-amber-500 text-slate-900' :
                    'bg-blue-500 text-white'
                  }`}>
                    Estresse: {pain.stressLevel}
                  </span>
                </div>
                <h4 className="text-base font-bold text-white">{pain.taskName}</h4>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <div className="text-right">
                  <p className="text-[10px] text-slate-400 font-bold uppercase">Tempo Médio Gasto</p>
                  <p className="text-xs font-mono font-bold text-amber-300">{pain.avgTimeSpent}</p>
                </div>
                <div className="text-right border-l border-slate-800 pl-3">
                  <p className="text-[10px] text-slate-400 font-bold uppercase">Frequência</p>
                  <p className="text-xs font-mono font-bold text-indigo-300">{pain.frequency}</p>
                </div>
              </div>
            </div>

            {/* Detailed Body Itemizing the Required 8 UX Research Points */}
            <div className="p-6 space-y-6">
              {/* Grid 1: Difficulties & Quality of Life Impact */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Difficulties */}
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                  <span className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                    <XCircle className="w-4 h-4 text-rose-500" />
                    <span>Maiores Dificuldades da Tarefa</span>
                  </span>
                  <ul className="space-y-1.5 text-xs text-slate-700 list-disc list-inside">
                    {pain.mainDifficulties.map((diff, dIdx) => (
                      <li key={dIdx} className="leading-relaxed">{diff}</li>
                    ))}
                  </ul>
                </div>

                {/* Quality of Life Impact */}
                <div className="p-4 bg-rose-50/60 rounded-xl border border-rose-200 space-y-2">
                  <span className="text-xs font-bold text-rose-900 uppercase tracking-wider flex items-center gap-1.5">
                    <Heart className="w-4 h-4 text-rose-600" />
                    <span>Impacto na Qualidade de Vida do Professor</span>
                  </span>
                  <p className="text-xs text-rose-950 leading-relaxed">
                    {pain.qualityOfLifeImpact}
                  </p>
                </div>
              </div>

              {/* Grid 2: Current Existing Solutions vs Why They Fail */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    Soluções Usadas Atualmente pelo Professor:
                  </span>
                  <p className="text-xs font-semibold text-slate-800 leading-relaxed">
                    {pain.currentExistingSolutions}
                  </p>
                </div>

                <div className="p-4 bg-amber-50/60 rounded-xl border border-amber-200 space-y-1.5">
                  <span className="text-[11px] font-bold text-amber-900 uppercase tracking-wider flex items-center gap-1">
                    <AlertOctagon className="w-3.5 h-3.5 text-amber-600" />
                    Por que as Soluções Atuais são Insuficientes:
                  </span>
                  <p className="text-xs text-amber-950 leading-relaxed">
                    {pain.whyCurrentSolutionsFail}
                  </p>
                </div>
              </div>

              {/* Box 3: How EducaFlow Solves this Pain Simply (Conceptual Premise) */}
              <div className="p-4 bg-indigo-950 text-white rounded-xl border border-indigo-900 space-y-2">
                <div className="flex items-center gap-2 text-indigo-300 font-bold text-xs uppercase tracking-wider">
                  <Sparkles className="w-4 h-4 text-indigo-400" />
                  <span>Como o EducaFlow Pode Resolver Essa Dor de Forma Simples:</span>
                </div>
                <p className="text-xs text-indigo-100 font-medium leading-relaxed">
                  {pain.educaFlowSimpleFix}
                </p>
              </div>

              {/* Matrix Indicators Badges */}
              <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between text-[11px] text-slate-500 gap-2">
                <div className="flex items-center gap-3">
                  <span>Impacto: <strong className="text-slate-800">{pain.teacherImpact}</strong></span>
                  <span>Frequência: <strong className="text-slate-800">{pain.occurrenceFrequency}</strong></span>
                  <span>Valor na Assinatura: <strong className="text-indigo-600">{pain.perceivedSubscriptionValue}</strong></span>
                </div>

                <span className="px-2.5 py-1 bg-slate-900 text-white font-bold rounded text-[10px] uppercase">
                  Prioridade MVP: {pain.mvpPriority}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
