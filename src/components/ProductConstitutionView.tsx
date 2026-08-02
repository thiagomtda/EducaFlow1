import { useState } from 'react';
import { 
  PRODUCT_MISSION, 
  PRODUCT_VISION_10_YEARS, 
  CORE_VALUES, 
  GOLDEN_PRINCIPLES, 
  PROHIBITED_PRACTICES, 
  FEATURE_APPROVAL_MATRIX, 
  PERSONALITY_AND_COMMUNICATION, 
  OFFICIAL_MANIFESTO, 
  CPO_AUDIT_VERDICT, 
  CPO_OFFICIAL_SIGNATURE 
} from '../data/constitutionData';
import { 
  ShieldCheck, 
  Award, 
  Sparkles, 
  HeartHandshake, 
  Flame, 
  Ban, 
  CheckCircle2, 
  AlertOctagon, 
  Bot, 
  Quote, 
  Compass, 
  Check, 
  X, 
  ArrowRight, 
  Clock, 
  Lock, 
  Scale, 
  BookOpen, 
  HelpCircle,
  FileText,
  UserCheck
} from 'lucide-react';

export const ProductConstitutionView = () => {
  const [activeTab, setActiveTab] = useState<'principles' | 'mission' | 'prohibited' | 'matrix' | 'personality' | 'manifesto' | 'audit'>('principles');
  const [selectedPrincipleNum, setSelectedPrincipleNum] = useState<number>(1);
  const [evaluatedAnswers, setEvaluatedAnswers] = useState<Record<string, boolean>>({
    'c-1': true,
    'c-2': true,
    'c-3': true,
    'c-4': true,
    'c-5': true
  });

  const selectedPrinciple = GOLDEN_PRINCIPLES.find(p => p.number === selectedPrincipleNum) || GOLDEN_PRINCIPLES[0];

  const allMatrixApproved = Object.values(evaluatedAnswers).every(v => v === true);

  return (
    <div className="p-8 space-y-6 overflow-y-auto h-full bg-slate-50">
      {/* Top Banner - CPO Constitution Header */}
      <div className="bg-slate-900 text-white rounded-xl p-6 border border-slate-800 shadow-xl relative overflow-hidden">
        <div className="space-y-2 relative z-10 max-w-4xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 bg-amber-500 text-slate-950 font-black text-xs rounded-full uppercase tracking-widest inline-block">
              Chief Product Officer (CPO)
            </span>
            <span className="px-3 py-1 bg-indigo-500/30 text-indigo-300 font-bold text-xs rounded-full border border-indigo-500/30 uppercase tracking-widest inline-block">
              Constituição Oficial do Produto
            </span>
          </div>
          <h3 className="text-2xl font-black text-white tracking-tight">
            EducaFlow Product Constitution — A Lei Suprema do Produto
          </h3>
          <p className="text-slate-300 text-sm leading-relaxed">
            O documento constitucional que rege e orienta toda e qualquer decisão de design, engenharia, inteligência artificial e produto do EducaFlow.
          </p>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab('principles')}
          className={`px-4 py-2.5 rounded-lg text-xs font-extrabold transition-all cursor-pointer flex items-center gap-2 shrink-0 ${
            activeTab === 'principles'
              ? 'bg-amber-500 text-slate-950 shadow-xs font-black'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Award className="w-4 h-4 text-slate-900" />
          <span>1. Os 10 Princípios de Ouro</span>
        </button>

        <button
          onClick={() => setActiveTab('mission')}
          className={`px-4 py-2.5 rounded-lg text-xs font-extrabold transition-all cursor-pointer flex items-center gap-2 shrink-0 ${
            activeTab === 'mission'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Compass className="w-4 h-4" />
          <span>2. Missão, Visão & Valores</span>
        </button>

        <button
          onClick={() => setActiveTab('prohibited')}
          className={`px-4 py-2.5 rounded-lg text-xs font-extrabold transition-all cursor-pointer flex items-center gap-2 shrink-0 ${
            activeTab === 'prohibited'
              ? 'bg-rose-600 text-white shadow-xs'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Ban className="w-4 h-4" />
          <span>3. O Que NUNCA Seremos</span>
        </button>

        <button
          onClick={() => setActiveTab('matrix')}
          className={`px-4 py-2.5 rounded-lg text-xs font-extrabold transition-all cursor-pointer flex items-center gap-2 shrink-0 ${
            activeTab === 'matrix'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Scale className="w-4 h-4" />
          <span>4. Matriz de Aprovação de Features</span>
        </button>

        <button
          onClick={() => setActiveTab('personality')}
          className={`px-4 py-2.5 rounded-lg text-xs font-extrabold transition-all cursor-pointer flex items-center gap-2 shrink-0 ${
            activeTab === 'personality'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Bot className="w-4 h-4 text-amber-400" />
          <span>5. Personalidade & Tom da IA</span>
        </button>

        <button
          onClick={() => setActiveTab('manifesto')}
          className={`px-4 py-2.5 rounded-lg text-xs font-extrabold transition-all cursor-pointer flex items-center gap-2 shrink-0 ${
            activeTab === 'manifesto'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Quote className="w-4 h-4" />
          <span>6. Manifesto Oficial</span>
        </button>

        <button
          onClick={() => setActiveTab('audit')}
          className={`px-4 py-2.5 rounded-lg text-xs font-extrabold transition-all cursor-pointer flex items-center gap-2 shrink-0 ${
            activeTab === 'audit'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>7. Auditoria do CPO</span>
        </button>
      </div>

      {/* TAB 1: GOLDEN PRINCIPLES */}
      {activeTab === 'principles' && (
        <div className="space-y-6">
          <div className="bg-amber-500 text-slate-950 p-5 rounded-xl border border-amber-600 shadow-sm space-y-1">
            <h4 className="text-sm font-black uppercase tracking-wider">
              Os 10 Princípios de Ouro do EducaFlow
            </h4>
            <p className="text-xs text-slate-900 font-medium">
              Clique em qualquer princípio abaixo para visualizar a regra inegociável, justificativa técnica e exemplo prático de aplicação no aplicativo.
            </p>
          </div>

          {/* Principle Buttons Grid */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2.5">
            {GOLDEN_PRINCIPLES.map((principle) => {
              const isSelected = principle.number === selectedPrincipleNum;
              return (
                <button
                  key={principle.number}
                  onClick={() => setSelectedPrincipleNum(principle.number)}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer space-y-1 relative ${
                    isSelected
                      ? 'bg-slate-900 text-white border-slate-800 shadow-md font-bold'
                      : 'bg-white hover:bg-slate-100 text-slate-800 border-slate-200'
                  }`}
                >
                  <span className={`text-[10px] font-mono font-bold block ${
                    isSelected ? 'text-amber-400' : 'text-slate-400'
                  }`}>
                    PRINCÍPIO #{principle.number}
                  </span>
                  <h5 className="text-xs font-black truncate">{principle.title}</h5>
                </button>
              );
            })}
          </div>

          {/* Selected Principle Detail Box */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-6 shadow-sm">
            <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
              <span className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 font-black text-lg flex items-center justify-center shrink-0">
                #{selectedPrinciple.number}
              </span>
              <div>
                <span className="text-[10px] font-mono font-bold text-amber-600 uppercase tracking-widest block">
                  Princípio de Ouro da Constituição
                </span>
                <h3 className="text-xl font-black text-slate-900">{selectedPrinciple.title}</h3>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
                <strong className="text-slate-800 font-extrabold uppercase text-[10px] block">
                  1. Regra Inegociável:
                </strong>
                <p className="text-slate-700 font-medium leading-relaxed">{selectedPrinciple.rule}</p>
              </div>

              <div className="p-4 bg-indigo-50/70 rounded-xl border border-indigo-100 space-y-1.5">
                <strong className="text-indigo-900 font-extrabold uppercase text-[10px] block">
                  2. Por Que Existe (Justificativa):
                </strong>
                <p className="text-indigo-950 font-medium leading-relaxed">{selectedPrinciple.rationale}</p>
              </div>

              <div className="p-4 bg-emerald-50/70 rounded-xl border border-emerald-100 space-y-1.5">
                <strong className="text-emerald-900 font-extrabold uppercase text-[10px] block">
                  3. Exemplo Prático de Aplicação:
                </strong>
                <p className="text-emerald-950 font-medium leading-relaxed">{selectedPrinciple.practicalExample}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: MISSION, VISION & CORE VALUES */}
      {activeTab === 'mission' && (
        <div className="space-y-6">
          {/* Mission & Vision */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-xs font-black text-indigo-600 uppercase tracking-wider">
                <Compass className="w-5 h-5 text-indigo-600" />
                <span>{PRODUCT_MISSION.title}</span>
              </div>
              <p className="text-base font-black text-slate-900 leading-snug">
                "{PRODUCT_MISSION.statement}"
              </p>
              <p className="text-xs text-slate-600 font-medium bg-slate-50 p-3 rounded-lg border border-slate-200">
                <strong>Propósito Central:</strong> {PRODUCT_MISSION.corePurpose}
              </p>
            </div>

            <div className="bg-slate-900 text-white p-6 rounded-xl border border-slate-800 shadow-md space-y-3">
              <div className="flex items-center gap-2 text-xs font-black text-amber-400 uppercase tracking-wider">
                <Sparkles className="w-5 h-5 text-amber-400" />
                <span>{PRODUCT_VISION_10_YEARS.title}</span>
              </div>
              <p className="text-sm font-bold text-slate-200 leading-relaxed">
                "{PRODUCT_VISION_10_YEARS.statement}"
              </p>

              <div className="space-y-2 pt-2">
                <strong className="text-[10px] font-mono text-amber-400 uppercase tracking-wider block">
                  Marcos da Década:
                </strong>
                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  {PRODUCT_VISION_10_YEARS.milestones.map((m, idx) => (
                    <div key={idx} className="p-2 bg-slate-800/80 rounded border border-slate-700/80 space-y-0.5">
                      <span className="font-mono font-black text-amber-300 text-[10px]">{m.year}</span>
                      <p className="text-slate-300 text-[10px] leading-tight">{m.milestone}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Core Values */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
            <h4 className="text-sm font-black text-slate-900 uppercase tracking-wider">
              Valores Inegociáveis do Produto
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {CORE_VALUES.map((val, idx) => (
                <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-1 text-xs">
                  <h5 className="font-black text-slate-900">{val.name}</h5>
                  <p className="text-slate-600 font-medium leading-relaxed">{val.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: WHAT EDUCAFLOW WILL NEVER BE (PROHIBITED PRACTICES) */}
      {activeTab === 'prohibited' && (
        <div className="space-y-6">
          <div className="bg-rose-600 text-white p-6 rounded-xl border border-rose-700 shadow-md space-y-2">
            <div className="flex items-center gap-2">
              <Ban className="w-5 h-5 text-white" />
              <span className="font-black text-xs uppercase tracking-widest">
                Práticas Estritamente Proibidas
              </span>
            </div>
            <h3 className="text-xl font-black text-white">
              O Que o EducaFlow NUNCA Será
            </h3>
            <p className="text-rose-100 text-xs leading-relaxed font-medium">
              Lineamentos que protegem a integridade do produto contra aberrações de mercado, inchaço desnecessário e desrespeito ao tempo do professor.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {PROHIBITED_PRACTICES.map((p) => (
              <div key={p.id} className="bg-white rounded-xl border border-slate-200 p-5 space-y-3 shadow-2xs">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="p-1.5 bg-rose-100 text-rose-800 rounded-lg">
                      <X className="w-4 h-4 font-black" />
                    </span>
                    <h5 className="text-xs font-black text-slate-900">{p.practice}</h5>
                  </div>
                  <span className="px-2 py-0.5 bg-rose-100 text-rose-800 text-[9px] font-extrabold rounded uppercase">
                    PROIBIDO
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="p-2.5 bg-rose-50/70 border border-rose-100 rounded-lg text-rose-950 font-medium">
                    <strong className="block text-[10px] uppercase font-bold text-rose-800">Por que é Proibido:</strong>
                    {p.whyProhibited}
                  </div>

                  <div className="p-2.5 bg-emerald-50/70 border border-emerald-100 rounded-lg text-emerald-950 font-medium">
                    <strong className="block text-[10px] uppercase font-bold text-emerald-800">Abordagem Correta do EducaFlow:</strong>
                    {p.alternativeApproach}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: FEATURE APPROVAL MATRIX */}
      {activeTab === 'matrix' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-mono font-bold text-indigo-600 uppercase tracking-widest block">
                  Matriz CPO de Validação
                </span>
                <h4 className="text-lg font-black text-slate-900">
                  Filtro Obrigatório para Aprovar Qualquer Nova Funcionalidade
                </h4>
              </div>

              <div className={`px-4 py-2 rounded-xl text-xs font-black flex items-center gap-2 ${
                allMatrixApproved ? 'bg-emerald-500 text-slate-950' : 'bg-rose-500 text-white'
              }`}>
                {allMatrixApproved ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>FEATURE APROVADA PELO CPO</span>
                  </>
                ) : (
                  <>
                    <AlertOctagon className="w-4 h-4" />
                    <span>FEATURE VETADA PELO CPO</span>
                  </>
                )}
              </div>
            </div>

            <p className="text-xs text-slate-600 font-medium">
              Simule a avaliação de uma nova ideia antes de autorizar o desenvolvimento. Se qualquer critério eliminatório for marcado como "Não", a funcionalidade é automaticamente rejeitada.
            </p>

            <div className="space-y-3">
              {FEATURE_APPROVAL_MATRIX.map((criterion) => {
                const isChecked = evaluatedAnswers[criterion.id] ?? false;

                return (
                  <div key={criterion.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
                    <div className="space-y-1 max-w-2xl">
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-0.5 text-[9px] font-extrabold rounded uppercase ${
                          criterion.weight === 'Eliminatório' ? 'bg-rose-100 text-rose-800' : 'bg-amber-100 text-amber-800'
                        }`}>
                          {criterion.weight}
                        </span>
                        <h5 className="font-black text-slate-900">{criterion.question}</h5>
                      </div>
                      <p className="text-slate-600 font-medium">{criterion.evaluationCriteria}</p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => setEvaluatedAnswers({ ...evaluatedAnswers, [criterion.id]: true })}
                        className={`px-3 py-1.5 rounded-lg font-bold text-xs cursor-pointer flex items-center gap-1 transition-all ${
                          isChecked 
                            ? 'bg-emerald-600 text-white shadow-xs' 
                            : 'bg-white border border-slate-300 text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>SIM</span>
                      </button>

                      <button
                        onClick={() => setEvaluatedAnswers({ ...evaluatedAnswers, [criterion.id]: false })}
                        className={`px-3 py-1.5 rounded-lg font-bold text-xs cursor-pointer flex items-center gap-1 transition-all ${
                          !isChecked 
                            ? 'bg-rose-600 text-white shadow-xs' 
                            : 'bg-white border border-slate-300 text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        <X className="w-3.5 h-3.5" />
                        <span>NÃO</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: PERSONALITY AND COMMUNICATION */}
      {activeTab === 'personality' && (
        <div className="space-y-6">
          <div className="bg-slate-900 text-white p-6 rounded-xl border border-slate-800 shadow-md space-y-2">
            <div className="flex items-center gap-2">
              <Bot className="w-5 h-5 text-amber-400" />
              <span className="font-bold text-xs text-amber-400 uppercase tracking-widest">
                Diretriz de Voz & Tom da Plataforma
              </span>
            </div>
            <h3 className="text-xl font-black text-white">
              Personalidade Oficial da IA Aurora & Comunicação
            </h3>
            <p className="text-slate-300 text-xs leading-relaxed font-medium">
              A IA Aurora se comunica como uma colega pedagógica experiente, respeitosa, encorajadora e extremamente clara.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {PERSONALITY_AND_COMMUNICATION.map((item, idx) => (
              <div key={idx} className="bg-white rounded-xl border border-slate-200 p-5 space-y-3 shadow-2xs">
                <h5 className="text-xs font-black text-slate-900 pb-2 border-b border-slate-100">
                  Cenário: {item.scenario}
                </h5>

                <p className="text-xs text-slate-600 font-medium">
                  <strong>Tom & Estilo:</strong> {item.toneAndStyle}
                </p>

                <div className="space-y-2 text-xs">
                  <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-950 font-medium">
                    <strong className="block text-[10px] uppercase font-bold text-emerald-800 mb-0.5">✔ Frase Correta (Acolhedora):</strong>
                    {item.correctPhraseExample}
                  </div>

                  <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg text-rose-950 font-medium">
                    <strong className="block text-[10px] uppercase font-bold text-rose-800 mb-0.5">✖ Frase Proibida (Fria/Coercitiva):</strong>
                    {item.forbiddenPhraseExample}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 6: OFFICIAL MANIFESTO */}
      {activeTab === 'manifesto' && (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-8 rounded-xl border border-indigo-900/50 shadow-xl space-y-6">
            <div className="text-center space-y-2 max-w-2xl mx-auto">
              <span className="px-3 py-1 bg-amber-500 text-slate-950 font-black text-[10px] rounded-full uppercase tracking-widest inline-block">
                Manifesto Institucional EducaFlow
              </span>
              <h3 className="text-2xl font-black text-white tracking-tight">
                Pela Dignidade do Ensinar
              </h3>
            </div>

            <div className="space-y-6 max-w-3xl mx-auto">
              {OFFICIAL_MANIFESTO.map((p, idx) => (
                <div key={idx} className="p-6 bg-slate-800/60 rounded-xl border border-slate-700/60 space-y-3">
                  <h4 className="text-sm font-black text-amber-400 uppercase tracking-wider">{p.title}</h4>
                  <p className="text-slate-200 text-xs leading-relaxed font-medium">{p.content}</p>
                  {p.keyHighlight && (
                    <div className="p-3 bg-indigo-500/20 border-l-4 border-amber-400 rounded text-amber-200 font-bold text-xs italic">
                      "{p.keyHighlight}"
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 7: CPO AUDIT VERDICT */}
      {activeTab === 'audit' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
            <h4 className="text-sm font-black text-slate-900 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <span>Auditoria do CPO: Alinhamento Estratégico do Produto</span>
            </h4>

            <div className="space-y-3">
              {CPO_AUDIT_VERDICT.map((audit, idx) => (
                <div key={idx} className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div className="space-y-1">
                    <h5 className="font-black text-slate-900">{audit.category}</h5>
                    <p className="text-slate-600 font-medium">{audit.analysis}</p>
                  </div>

                  <span className="px-3 py-1 bg-emerald-100 text-emerald-800 font-black text-[10px] rounded-md uppercase shrink-0">
                    {audit.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* CPO Promulgation Signature */}
          <div className="bg-slate-900 text-white rounded-xl border border-slate-800 p-6 space-y-3 shadow-lg">
            <div className="flex items-center gap-3">
              <Award className="w-6 h-6 text-amber-400" />
              <div>
                <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block font-mono">
                  {CPO_OFFICIAL_SIGNATURE.role}
                </span>
                <h4 className="text-base font-black text-white">{CPO_OFFICIAL_SIGNATURE.status}</h4>
              </div>
            </div>

            <p className="text-slate-300 text-xs font-medium leading-relaxed">
              "{CPO_OFFICIAL_SIGNATURE.note}"
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
