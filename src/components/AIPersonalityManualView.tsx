import React, { useState } from 'react';
import { AI_PERSONALITY_MANUAL } from '../data/cxAndAiData';
import { 
  Brain, 
  Sparkles, 
  Heart, 
  ShieldAlert, 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  Zap, 
  MessageSquare, 
  BookOpen, 
  Award,
  Layers,
  Bot
} from 'lucide-react';

export const AIPersonalityManualView = () => {
  const [activeTab, setActiveTab] = useState<'tone' | 'principles' | 'rules_limits' | 'decision_matrix'>('tone');

  return (
    <div className="p-8 space-y-6 overflow-y-auto h-full bg-slate-50">
      {/* Banner */}
      <div className="bg-slate-900 text-white rounded-xl p-6 border border-slate-800 shadow-lg relative overflow-hidden">
        <div className="space-y-2 relative z-10 max-w-3xl">
          <span className="px-3 py-1 bg-indigo-500/20 text-indigo-300 text-xs font-bold rounded-full border border-indigo-500/30 uppercase tracking-widest inline-block">
            Design de Conversação e Comportamento de IA
          </span>
          <h3 className="text-2xl font-black text-white tracking-tight">
            Manual de Personalidade da IA EducaFlow
          </h3>
          <p className="text-slate-300 text-sm leading-relaxed">
            Nossa IA se comporta como uma <strong>colega de trabalho experiente, organizada, acolhedora e extremamente eficiente</strong> — jamais como um chatbot genérico, impessoal ou robótico.
          </p>
        </div>
      </div>

      {/* Core AI Mission & Summary Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-sm space-y-2 md:col-span-2">
          <div className="flex items-center gap-2 text-xs font-extrabold text-indigo-600 uppercase tracking-wider">
            <Award className="w-4 h-4 text-indigo-600" />
            <span>Missão Fundamental da IA</span>
          </div>
          <p className="text-xs text-slate-700 leading-relaxed font-medium">
            {AI_PERSONALITY_MANUAL.mission}
          </p>
        </div>

        <div className="p-5 bg-indigo-950 text-white rounded-xl border border-indigo-900 shadow-sm space-y-2">
          <div className="flex items-center gap-2 text-xs font-extrabold text-amber-400 uppercase tracking-wider">
            <Bot className="w-4 h-4 text-amber-400" />
            <span>Perfil da Persona</span>
          </div>
          <p className="text-xs text-indigo-100 leading-relaxed font-medium">
            {AI_PERSONALITY_MANUAL.personaSummary}
          </p>
        </div>
      </div>

      {/* Section Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab('tone')}
          className={`px-4 py-2 rounded-lg text-xs font-extrabold transition-all cursor-pointer flex items-center gap-2 shrink-0 ${
            activeTab === 'tone'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          <span>Tom de Voz (DO / DON'T)</span>
        </button>

        <button
          onClick={() => setActiveTab('principles')}
          className={`px-4 py-2 rounded-lg text-xs font-extrabold transition-all cursor-pointer flex items-center gap-2 shrink-0 ${
            activeTab === 'principles'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Princípios Pedagógicos</span>
        </button>

        <button
          onClick={() => setActiveTab('rules_limits')}
          className={`px-4 py-2 rounded-lg text-xs font-extrabold transition-all cursor-pointer flex items-center gap-2 shrink-0 ${
            activeTab === 'rules_limits'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <ShieldAlert className="w-4 h-4" />
          <span>Regras & Limites Éticos</span>
        </button>

        <button
          onClick={() => setActiveTab('decision_matrix')}
          className={`px-4 py-2 rounded-lg text-xs font-extrabold transition-all cursor-pointer flex items-center gap-2 shrink-0 ${
            activeTab === 'decision_matrix'
              ? 'bg-amber-500 text-slate-950 shadow-xs'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Zap className="w-4 h-4" />
          <span>Matriz de Ação (Sugerir / Perguntar / Agir)</span>
        </button>
      </div>

      {/* Tab 1: Tone of Voice */}
      {activeTab === 'tone' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {AI_PERSONALITY_MANUAL.toneOfVoice.map((tone, idx) => (
              <div key={idx} className="bg-white rounded-xl border border-slate-200 p-5 space-y-4 shadow-2xs">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono font-bold text-indigo-600 uppercase tracking-widest">
                    Atributo {idx + 1}
                  </span>
                  <h4 className="text-base font-black text-slate-900">{tone.attribute}</h4>
                  <p className="text-xs text-slate-600 font-medium">{tone.description}</p>
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 space-y-1 text-xs">
                    <span className="font-extrabold text-emerald-800 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      Como a IA DEVE Falar (DO):
                    </span>
                    <p className="text-emerald-950 italic font-medium">{tone.exampleDo}</p>
                  </div>

                  <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 space-y-1 text-xs">
                    <span className="font-extrabold text-rose-800 flex items-center gap-1">
                      <XCircle className="w-3.5 h-3.5 text-rose-600" />
                      Como a IA NUNCA Deve Falar (DON'T):
                    </span>
                    <p className="text-rose-950 italic font-medium">{tone.exampleDont}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Pedagogical Principles */}
      {activeTab === 'principles' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {AI_PERSONALITY_MANUAL.pedagogicalPrinciples.map((prin, idx) => (
            <div key={idx} className="bg-white rounded-xl border border-slate-200 p-5 space-y-3 shadow-2xs">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center font-black text-xs shrink-0">
                  {idx + 1}
                </div>
                <h4 className="text-sm font-extrabold text-slate-900">{prin.principle}</h4>
              </div>

              <p className="text-xs text-slate-600 font-medium leading-relaxed">
                {prin.description}
              </p>

              <div className="p-3 bg-indigo-50/70 border border-indigo-100 rounded-lg text-xs font-medium text-indigo-950">
                <strong className="text-indigo-700 block mb-0.5">Aplicação Prática na Interface:</strong>
                {prin.applicationInInterface}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 3: Rules & Limits */}
      {activeTab === 'rules_limits' && (
        <div className="space-y-6">
          {/* Behavior Rules */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
            <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              <span>Regras Inegociáveis de Comportamento</span>
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {AI_PERSONALITY_MANUAL.behaviorRules.map((rule, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <h5 className="text-xs font-black text-slate-900">{rule.rule}</h5>
                  <p className="text-xs text-slate-600 font-medium">{rule.rationale}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Boundaries & Limits */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
            <h4 className="text-xs font-extrabold text-rose-900 uppercase tracking-wider flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-rose-600" />
              <span>Limites Éticos e Fronteiras de Atuação da IA</span>
            </h4>

            <div className="space-y-3">
              {AI_PERSONALITY_MANUAL.boundariesAndLimits.map((lim, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-rose-50/60 border border-rose-200 space-y-2">
                  <span className="text-xs font-black text-rose-900 block">
                    ❌ Limite: A IA JAMAIS deve emitir {lim.limit}
                  </span>
                  <div className="p-3 bg-white rounded-lg border border-rose-200 text-xs italic text-rose-950 font-medium">
                    <strong className="text-rose-800 not-italic block mb-0.5">Resposta Padronizada da IA:</strong>
                    {lim.howToRespond}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Decision Matrix */}
      {activeTab === 'decision_matrix' && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-6">
          <div className="space-y-1">
            <h4 className="text-base font-black text-slate-900">Matriz Tríplice de Tomada de Decisão</h4>
            <p className="text-xs text-slate-600 font-medium">
              A IA sabe exatamente quando apenas sugerir uma ideia, quando perguntar antes de prosseguir e quando agir automaticamente de forma invisível.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* 1. Quando Sugerir */}
            <div className="p-5 rounded-xl bg-amber-50/80 border border-amber-200 space-y-3">
              <div className="flex items-center gap-2 text-xs font-extrabold text-amber-950 uppercase tracking-wider">
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span>1. Quando SUGERIR</span>
              </div>

              <ul className="space-y-2 text-xs text-amber-950 font-medium">
                {AI_PERSONALITY_MANUAL.decisionFramework.whenToSuggest.map((item, idx) => (
                  <li key={idx} className="p-2.5 bg-white rounded-lg border border-amber-200 shadow-2xs flex items-start gap-2">
                    <span className="text-amber-500 font-bold">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 2. Quando Perguntar */}
            <div className="p-5 rounded-xl bg-indigo-50/80 border border-indigo-200 space-y-3">
              <div className="flex items-center gap-2 text-xs font-extrabold text-indigo-950 uppercase tracking-wider">
                <HelpCircle className="w-4 h-4 text-indigo-600" />
                <span>2. Quando PERGUNTAR</span>
              </div>

              <ul className="space-y-2 text-xs text-indigo-950 font-medium">
                {AI_PERSONALITY_MANUAL.decisionFramework.whenToAsk.map((item, idx) => (
                  <li key={idx} className="p-2.5 bg-white rounded-lg border border-indigo-200 shadow-2xs flex items-start gap-2">
                    <span className="text-indigo-500 font-bold">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 3. Quando Agir Automático */}
            <div className="p-5 rounded-xl bg-emerald-50/80 border border-emerald-200 space-y-3">
              <div className="flex items-center gap-2 text-xs font-extrabold text-emerald-950 uppercase tracking-wider">
                <Zap className="w-4 h-4 text-emerald-600" />
                <span>3. Quando AGIR AUTOMATICAMENTE</span>
              </div>

              <ul className="space-y-2 text-xs text-emerald-950 font-medium">
                {AI_PERSONALITY_MANUAL.decisionFramework.whenToActAutomatically.map((item, idx) => (
                  <li key={idx} className="p-2.5 bg-white rounded-lg border border-emerald-200 shadow-2xs flex items-start gap-2">
                    <span className="text-emerald-500 font-bold">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
