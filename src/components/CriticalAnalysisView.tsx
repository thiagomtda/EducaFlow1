import React from 'react';
import { CRITICAL_ANALYSIS_QUESTIONS } from '../data/ecosystemMapData';
import { 
  Brain, 
  CheckCircle2, 
  HelpCircle, 
  ShieldCheck, 
  Sparkles, 
  AlertTriangle, 
  Clock, 
  Zap,
  Layers,
  Search
} from 'lucide-react';

export const CriticalAnalysisView = () => {
  return (
    <div className="p-8 space-y-6 overflow-y-auto h-full bg-slate-50">
      {/* Header Banner */}
      <div className="bg-slate-900 text-white rounded-xl p-6 border border-slate-800 shadow-lg relative overflow-hidden">
        <div className="space-y-2 relative z-10 max-w-3xl">
          <span className="px-3 py-1 bg-amber-500/20 text-amber-300 text-xs font-bold rounded-full border border-amber-500/30 uppercase tracking-widest inline-block">
            Análise Crítica de Arquitetura de Produto
          </span>
          <h3 className="text-2xl font-black text-white tracking-tight">
            Validação da Arquitetura Funcional do EducaFlow
          </h3>
          <p className="text-slate-300 text-sm leading-relaxed">
            Exame crítico do mapa do ecossistema sob a ótica de usabilidade, eficiência funcional, eliminação de desperdícios e curva de aprendizado do professor.
          </p>
        </div>
      </div>

      {/* Grid of the 4 Key Critical Questions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {CRITICAL_ANALYSIS_QUESTIONS.map((item, idx) => {
          let badgeColor = 'bg-emerald-100 text-emerald-800 border-emerald-300';
          if (item.verdict === 'Eliminado') badgeColor = 'bg-rose-100 text-rose-800 border-rose-300';
          if (item.verdict === 'Simplificado') badgeColor = 'bg-indigo-100 text-indigo-800 border-indigo-300';

          return (
            <div key={idx} className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-xs font-extrabold text-indigo-600 uppercase tracking-wider font-mono">
                    Pergunta {idx + 1}
                  </span>
                  <span className={`text-[10px] font-mono font-bold uppercase px-2.5 py-0.5 rounded border ${badgeColor}`}>
                    {item.verdict}
                  </span>
                </div>

                <h4 className="text-base font-black text-slate-900 leading-snug">{item.question}</h4>

                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs font-bold text-slate-800">
                  {item.summary}
                </div>

                <p className="text-xs text-slate-600 font-medium leading-relaxed bg-white p-3.5 rounded-lg border border-slate-200">
                  {item.architecturalReasoning}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span>Arquitetura EducaFlow</span>
                <span className="text-emerald-600 font-bold">Validação Concluída</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Final Architectural Conclusion */}
      <div className="p-6 bg-indigo-950 text-white rounded-xl border border-indigo-900 space-y-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-indigo-400" />
          <h4 className="text-sm font-bold text-indigo-300 uppercase tracking-wider">Conclusão do Veredito da Equipe de Arquitetos</h4>
        </div>
        <p className="text-xs text-indigo-100 leading-relaxed max-w-4xl font-medium">
          Ao limitar a plataforma a <strong>5 Áreas de Experiência</strong> com no máximo <strong>10 Módulos de Alto Impacto</strong> (sendo 7 indispensáveis no MVP), garantimos um produto limpo, sem ruído institucional e capaz de ser dominado por qualquer professor em menos de 5 minutos, sem necessidade de treinamentos exaustivos.
        </p>
      </div>
    </div>
  );
};
