import React, { useState } from 'react';
import { PAIN_POINTS } from '../data/painsData';
import { PainPoint } from '../types';
import { 
  Grid, 
  Filter, 
  Sparkles, 
  CheckCircle2, 
  AlertOctagon, 
  Clock, 
  DollarSign, 
  Flame,
  FileSpreadsheet
} from 'lucide-react';

export const PainMatrixView: React.FC = () => {
  const [selectedMvpFilter, setSelectedMvpFilter] = useState<string>('Todos');

  const mvpFilters = ['Todos', 'P1 - Indispensável', 'P2 - Importante', 'P3 - Desejável'];

  const filteredPains = PAIN_POINTS.filter(p => {
    return selectedMvpFilter === 'Todos' || p.mvpPriority === selectedMvpFilter;
  });

  const p1Count = PAIN_POINTS.filter(p => p.mvpPriority === 'P1 - Indispensável').length;
  const p2Count = PAIN_POINTS.filter(p => p.mvpPriority === 'P2 - Importante').length;
  const vitalValueCount = PAIN_POINTS.filter(p => p.perceivedSubscriptionValue === 'Vital').length;

  return (
    <div className="p-8 space-y-6 overflow-y-auto h-full bg-slate-50">
      {/* Matrix Header */}
      <div className="bg-slate-900 text-white rounded-xl p-6 border border-slate-800 shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <span className="px-3 py-1 bg-indigo-500/20 text-indigo-300 text-xs font-bold rounded-full border border-indigo-500/30 uppercase tracking-widest inline-block mb-1">
            Matriz Classificatória de UX Research
          </span>
          <h3 className="text-xl font-black text-white">Matriz de Priorização do Mapa das Dores</h3>
          <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
            Consolidação de todas as dores pesquisadas segundo 4 eixos estratégicos: Impacto, Frequência, Valor Percebido em Assinatura (SaaS) e Prioridade para o MVP.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="bg-slate-800 p-3 rounded-lg border border-slate-700 text-center">
            <p className="text-[10px] text-slate-400 font-bold uppercase">Dores Indispensáveis (P1)</p>
            <p className="text-lg font-black text-emerald-400 font-mono">{p1Count} de {PAIN_POINTS.length}</p>
          </div>
          <div className="bg-slate-800 p-3 rounded-lg border border-slate-700 text-center">
            <p className="text-[10px] text-slate-400 font-bold uppercase">Gatilho Vital para Assinatura</p>
            <p className="text-lg font-black text-indigo-300 font-mono">{vitalValueCount}</p>
          </div>
        </div>
      </div>

      {/* Filter bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-400" />
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">Filtrar por Prioridade MVP:</span>
        </div>

        <div className="flex items-center gap-2">
          {mvpFilters.map((filter) => (
            <button
              key={filter}
              onClick={() => setSelectedMvpFilter(filter)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                selectedMvpFilter === filter
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Matrix Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-900 text-white text-[10px] font-bold uppercase tracking-wider border-b border-slate-800">
                <th className="py-3.5 px-4">Etapa da Rotina</th>
                <th className="py-3.5 px-4">Tarefa / Dor do Professor</th>
                <th className="py-3.5 px-4">Impacto Docente</th>
                <th className="py-3.5 px-4">Frequência</th>
                <th className="py-3.5 px-4">Valor Percebido (Assinatura)</th>
                <th className="py-3.5 px-4">Prioridade MVP</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {filteredPains.map((pain) => (
                <tr key={pain.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-indigo-600 whitespace-nowrap">
                    {pain.stageName}
                  </td>

                  <td className="py-3.5 px-4 max-w-md">
                    <p className="font-bold text-slate-900">{pain.taskName}</p>
                    <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">{pain.educaFlowSimpleFix}</p>
                  </td>

                  <td className="py-3.5 px-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold uppercase ${
                      pain.teacherImpact === 'Extremo' ? 'bg-rose-100 text-rose-800 border border-rose-200' :
                      pain.teacherImpact === 'Alto' ? 'bg-amber-100 text-amber-800 border border-amber-200' :
                      'bg-slate-100 text-slate-800'
                    }`}>
                      {pain.teacherImpact}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 font-semibold text-slate-700">
                    {pain.occurrenceFrequency}
                  </td>

                  <td className="py-3.5 px-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      pain.perceivedSubscriptionValue === 'Vital' ? 'bg-indigo-100 text-indigo-900 border border-indigo-200 font-extrabold' :
                      pain.perceivedSubscriptionValue === 'Alto' ? 'bg-emerald-100 text-emerald-800' :
                      'bg-slate-100 text-slate-700'
                    }`}>
                      {pain.perceivedSubscriptionValue}
                    </span>
                  </td>

                  <td className="py-3.5 px-4">
                    <span className={`px-2.5 py-1 rounded-lg text-[10px] font-extrabold uppercase ${
                      pain.mvpPriority === 'P1 - Indispensável' ? 'bg-emerald-600 text-white shadow-xs' :
                      pain.mvpPriority === 'P2 - Importante' ? 'bg-slate-800 text-white' :
                      'bg-slate-200 text-slate-700'
                    }`}>
                      {pain.mvpPriority}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary Strategic Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-sm space-y-2">
          <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
            <Flame className="w-4 h-4 text-rose-500" /> O Gatilho Vital de Conversão em Assinatura
          </h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            As dores classificadas como <strong>"Vital"</strong> (Planejamento BNCC, Acompanhamento da Alfabetização, Preenchimento do Diário e Pareceres Descritivos) são aquelas que tiram o sono do professor. É nelas que reside a disposição de pagar uma assinatura individual (SaaS B2C).
          </p>
        </div>

        <div className="p-5 bg-indigo-950 text-white rounded-xl border border-indigo-900 space-y-2">
          <h4 className="text-xs font-bold text-indigo-300 uppercase tracking-wider flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Diretriz para a Próxima Fase do Produto
          </h4>
          <p className="text-xs text-indigo-100 leading-relaxed">
            O MVP do <strong>EducaFlow</strong> deve resolver prioritariamente as dores <strong>P1 - Indispensável</strong>, garantindo que o professor consiga cumprir sua rotina diária e semanal com fricção zero antes de expandirmos para recursos adicionais.
          </p>
        </div>
      </div>
    </div>
  );
};
