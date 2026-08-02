import React, { useState } from 'react';
import { MVP_FEATURES, SPRINTS_PLAN, PRODUCT_ROADMAP } from '../data/blueprintData';
import { BlueprintFeature, BlueprintSprint, RoadmapVersion } from '../types';
import { 
  FileText, 
  Layers, 
  Milestone, 
  Clock, 
  CheckCircle2, 
  Zap, 
  ShieldCheck, 
  Sparkles, 
  AlertTriangle,
  Code2,
  Calendar,
  TrendingUp,
  Cpu,
  Bookmark,
  ChevronRight,
  Filter,
  Check,
  UserCheck,
  Award
} from 'lucide-react';

export const MvpBlueprintView = () => {
  const [activeSection, setActiveSection] = useState<'features' | 'sprints' | 'roadmap'>('features');
  const [selectedComplexity, setSelectedComplexity] = useState<string>('all');
  const [selectedSprintFilter, setSelectedSprintFilter] = useState<number | 'all'>('all');

  // Filter features
  const filteredFeatures = MVP_FEATURES.filter(feat => {
    if (selectedComplexity !== 'all' && feat.complexity !== selectedComplexity) return false;
    if (selectedSprintFilter !== 'all' && feat.sprint !== selectedSprintFilter) return false;
    return true;
  });

  // Calculate metrics
  const totalFeaturesCount = MVP_FEATURES.length;
  const totalSprintsCount = SPRINTS_PLAN.length;

  return (
    <div className="p-8 space-y-6 overflow-y-auto h-full bg-slate-50">
      {/* Header Banner */}
      <div className="bg-slate-900 text-white rounded-xl p-6 border border-slate-800 shadow-lg relative overflow-hidden">
        <div className="space-y-2 relative z-10 max-w-3xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 text-xs font-bold rounded-full border border-emerald-500/30 uppercase tracking-widest inline-block">
              Fase 2: Product Blueprint & Engenharia
            </span>
            <span className="px-3 py-1 bg-indigo-500/20 text-indigo-300 text-xs font-bold rounded-full border border-indigo-500/30 uppercase tracking-widest inline-block">
              Plano Executivo de Desenvolvimento
            </span>
          </div>
          <h3 className="text-2xl font-black text-white tracking-tight">
            EducaFlow MVP Blueprint (Versão 1.0 & Roadmap)
          </h3>
          <p className="text-slate-300 text-sm leading-relaxed">
            Documento mestre de engenharia e produto. Especificação completa dos módulos indispensáveis da V1.0, cronograma de execução por Sprints operacionais e visão de longo prazo até a V3.0.
          </p>
        </div>
      </div>

      {/* KPI Stats Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-2xs space-y-1">
          <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block">
            Escopo MVP 1.0
          </span>
          <div className="text-xl font-black text-slate-900 flex items-center gap-2">
            <span>10 Funcionalidades</span>
            <span className="text-xs px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">100% EF1</span>
          </div>
          <p className="text-[11px] text-slate-500">Mínimo viável ultrassólido</p>
        </div>

        <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-2xs space-y-1">
          <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block">
            Ciclos de Entrega
          </span>
          <div className="text-xl font-black text-indigo-600 flex items-center gap-2">
            <span>5 Sprints</span>
            <span className="text-xs px-2 py-0.5 rounded bg-indigo-100 text-indigo-800 font-bold">10 Semanas</span>
          </div>
          <p className="text-[11px] text-slate-500">2,5 meses até o lançamento público</p>
        </div>

        <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-2xs space-y-1">
          <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block">
            Esforço Estimado Dev
          </span>
          <div className="text-xl font-black text-amber-600 flex items-center gap-2">
            <span>344 Horas</span>
            <span className="text-xs px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-bold">43 Dias Úteis</span>
          </div>
          <p className="text-[11px] text-slate-500">Desenvolvimento + testes integrados</p>
        </div>

        <div className="p-4 bg-slate-900 text-white rounded-xl border border-slate-800 shadow-2xs space-y-1">
          <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-wider block">
            Roadmap Completo
          </span>
          <div className="text-xl font-black text-white flex items-center gap-2">
            <span>5 Versões</span>
            <span className="text-xs px-2 py-0.5 rounded bg-emerald-500 text-slate-950 font-bold">V1.0 a V3.0</span>
          </div>
          <p className="text-[11px] text-slate-300">Visão estratégica de 12 meses</p>
        </div>
      </div>

      {/* Main Section Navigation Bar */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto">
        <button
          onClick={() => setActiveSection('features')}
          className={`px-4 py-2.5 rounded-lg text-xs font-extrabold transition-all cursor-pointer flex items-center gap-2 shrink-0 ${
            activeSection === 'features'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>1. Funcionalidades do MVP 1.0 ({totalFeaturesCount})</span>
        </button>

        <button
          onClick={() => setActiveSection('sprints')}
          className={`px-4 py-2.5 rounded-lg text-xs font-extrabold transition-all cursor-pointer flex items-center gap-2 shrink-0 ${
            activeSection === 'sprints'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>2. Organização em Sprints ({totalSprintsCount} Sprints)</span>
        </button>

        <button
          onClick={() => setActiveSection('roadmap')}
          className={`px-4 py-2.5 rounded-lg text-xs font-extrabold transition-all cursor-pointer flex items-center gap-2 shrink-0 ${
            activeSection === 'roadmap'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Milestone className="w-4 h-4 text-emerald-400" />
          <span>3. Roadmap de Produto (V1.0 a V3.0)</span>
        </button>
      </div>

      {/* SECTION 1: MVP FEATURES MATRIX */}
      {activeSection === 'features' && (
        <div className="space-y-4">
          {/* Controls / Filter Bar */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs font-extrabold text-slate-800">
              <Filter className="w-4 h-4 text-indigo-600" />
              <span>Filtros do Blueprint:</span>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <select
                value={selectedComplexity}
                onChange={(e) => setSelectedComplexity(e.target.value)}
                className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold text-slate-700 cursor-pointer outline-none focus:border-indigo-500"
              >
                <option value="all">Todas as Complexidades</option>
                <option value="Baixa">Complexidade Baixa</option>
                <option value="Média">Complexidade Média</option>
                <option value="Alta">Complexidade Alta</option>
              </select>

              <select
                value={selectedSprintFilter}
                onChange={(e) => setSelectedSprintFilter(e.target.value === 'all' ? 'all' : Number(e.target.value))}
                className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold text-slate-700 cursor-pointer outline-none focus:border-indigo-500"
              >
                <option value="all">Todas as Sprints</option>
                <option value="1">Sprint 1</option>
                <option value="2">Sprint 2</option>
                <option value="3">Sprint 3</option>
                <option value="4">Sprint 4</option>
                <option value="5">Sprint 5</option>
              </select>
            </div>
          </div>

          {/* List of Features */}
          <div className="space-y-4">
            {filteredFeatures.map((feat) => (
              <div 
                key={feat.id}
                className="bg-white rounded-xl border border-slate-200 p-6 space-y-4 shadow-2xs hover:border-indigo-300 transition-all"
              >
                {/* Feature Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2.5 py-0.5 bg-slate-900 text-white text-[10px] font-mono font-bold rounded">
                        {feat.moduleCode} — {feat.moduleName}
                      </span>
                      <span className="px-2.5 py-0.5 bg-indigo-50 text-indigo-700 border border-indigo-200 text-[10px] font-extrabold rounded-full">
                        Sprint {feat.sprint}
                      </span>
                      <span className="px-2.5 py-0.5 bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-extrabold rounded-full">
                        {feat.priority}
                      </span>
                    </div>

                    <h4 className="text-base font-black text-slate-900">{feat.name}</h4>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 shrink-0">
                    <span className="px-3 py-1 bg-slate-100 text-slate-800 text-xs font-bold rounded-lg border border-slate-200 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-amber-600" />
                      <span>{feat.devEstimate}</span>
                    </span>

                    <span className={`px-3 py-1 text-xs font-bold rounded-lg border ${
                      feat.complexity === 'Alta' 
                        ? 'bg-rose-50 text-rose-800 border-rose-200' 
                        : feat.complexity === 'Média'
                        ? 'bg-amber-50 text-amber-800 border-amber-200'
                        : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                    }`}>
                      Complexidade: {feat.complexity}
                    </span>
                  </div>
                </div>

                {/* Objective & Teacher Benefit */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                    <strong className="text-slate-500 uppercase tracking-wider text-[10px] font-extrabold block">
                      Objetivo Técnico da Funcionalidade:
                    </strong>
                    <p className="text-slate-800 font-medium leading-relaxed">{feat.objective}</p>
                  </div>

                  <div className="p-4 rounded-xl bg-emerald-50/80 border border-emerald-200 space-y-1">
                    <strong className="text-emerald-800 uppercase tracking-wider text-[10px] font-extrabold block">
                      Benefício Direto para o Professor (EF1):
                    </strong>
                    <p className="text-emerald-950 font-bold leading-relaxed">{feat.teacherBenefit}</p>
                  </div>
                </div>

                {/* Footer Metadata */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs pt-2 gap-2 text-slate-600 border-t border-slate-100 font-medium">
                  <div className="flex items-center gap-2">
                    <strong className="text-slate-900 font-bold">Dependências Táticas:</strong>
                    <div className="flex flex-wrap gap-1">
                      {feat.dependencies.map((dep, idx) => (
                        <span key={idx} className="px-2 py-0.5 bg-slate-100 text-slate-700 border border-slate-200 rounded text-[10px] font-mono">
                          {dep}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <strong className="text-slate-900 font-bold">Valor para o Negócio:</strong>
                    <span className="px-2 py-0.5 bg-indigo-50 text-indigo-800 border border-indigo-200 font-bold rounded text-[10px]">
                      {feat.businessValue}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 2: SPRINT ORGANIZATIONAL PLAN */}
      {activeSection === 'sprints' && (
        <div className="space-y-6">
          <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-xl text-xs text-indigo-950 font-medium leading-relaxed">
            <strong className="text-indigo-900 block mb-1 font-extrabold text-sm">
              Estratégia de Execução em Sprints Operacionais (Entregáveis Funcionais):
            </strong>
            Cada Sprint possui duração fixa de 2 semanas (10 dias úteis) e resulta em um incremento testável da plataforma. Não há entregas "parciais sem valor" — cada encerramento de Sprint entrega um bloco operacional utilizável pelo professor.
          </div>

          <div className="space-y-6">
            {SPRINTS_PLAN.map((sprint) => {
              const sprintFeatures = MVP_FEATURES.filter(f => sprint.featureIds.includes(f.id));

              return (
                <div key={sprint.sprintNumber} className="bg-white rounded-xl border border-slate-200 p-6 space-y-5 shadow-2xs">
                  {/* Sprint Header */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-slate-100 gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="px-3 py-1 bg-slate-900 text-amber-400 font-extrabold text-xs rounded-lg uppercase tracking-wider font-mono">
                          Sprint {sprint.sprintNumber}
                        </span>
                        <span className="text-xs font-bold text-slate-500">
                          ⏱ Duração: {sprint.duration} ({sprint.totalEstimate})
                        </span>
                      </div>
                      <h4 className="text-lg font-black text-slate-900">{sprint.title}</h4>
                    </div>

                    <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs max-w-md">
                      <strong className="text-indigo-700 block mb-0.5">Objetivo Estratégico da Sprint:</strong>
                      <p className="text-slate-700 font-medium leading-tight">{sprint.goal}</p>
                    </div>
                  </div>

                  {/* Deliverable Box */}
                  <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-950 flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-emerald-900 block font-bold mb-0.5">Entregável Funcional (Incremento de Valor ao Final da Sprint):</strong>
                      <p className="font-semibold">{sprint.deliverable}</p>
                    </div>
                  </div>

                  {/* Features in this Sprint */}
                  <div className="space-y-2">
                    <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">
                      Funcionalidades Entregues nesta Sprint ({sprintFeatures.length}):
                    </span>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {sprintFeatures.map((feat) => (
                        <div key={feat.id} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 space-y-1.5 text-xs">
                          <div className="flex items-center justify-between">
                            <span className="font-mono font-bold text-[10px] text-slate-500">{feat.moduleCode}</span>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-white border border-slate-200 text-slate-700">
                              ⏱ {feat.devEstimate}
                            </span>
                          </div>
                          <h5 className="font-extrabold text-slate-900">{feat.name}</h5>
                          <p className="text-slate-600 line-clamp-2 text-[11px] font-medium">{feat.objective}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* SECTION 3: PRODUCT ROADMAP (V1.0 to V3.0) */}
      {activeSection === 'roadmap' && (
        <div className="space-y-6">
          <div className="bg-slate-900 text-white p-5 rounded-xl border border-slate-800 space-y-2">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
              Estratégia de Longo Prazo EducaFlow
            </span>
            <h4 className="text-lg font-black text-white">Roadmap Executivo da Plataforma (12 Meses)</h4>
            <p className="text-xs text-slate-300 leading-relaxed font-medium">
              Evolução gradual da plataforma: partindo do alívio individual do professor (MVP 1.0) até se consolidar como o ecossistema líder de inteligência pedagógica e gestão de redes de ensino no Brasil.
            </p>
          </div>

          <div className="space-y-6">
            {PRODUCT_ROADMAP.map((ver, idx) => (
              <div 
                key={ver.version} 
                className={`rounded-xl border p-6 space-y-4 shadow-sm relative overflow-hidden ${
                  idx === 0 
                    ? 'bg-white border-amber-500/80 ring-2 ring-amber-400/20' 
                    : 'bg-white border-slate-200'
                }`}
              >
                {/* Release Version Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-slate-100 gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className={`px-3 py-1 font-black text-xs rounded-lg uppercase tracking-wider font-mono ${
                        idx === 0 ? 'bg-amber-500 text-slate-950' : 'bg-slate-900 text-white'
                      }`}>
                        {ver.version}
                      </span>
                      <span className="text-xs font-bold text-slate-500">
                        🗓 {ver.releaseTimeline}
                      </span>
                    </div>

                    <h4 className="text-xl font-black text-slate-900">{ver.codename}</h4>
                  </div>

                  <div className="p-3 rounded-xl bg-indigo-50 border border-indigo-100 text-xs text-indigo-950 font-medium max-w-md">
                    <strong className="text-indigo-700 block mb-0.5">Meta Estratégica da Versão:</strong>
                    {ver.strategicGoal}
                  </div>
                </div>

                {/* Focus Description */}
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-700">
                  <strong className="text-slate-900 font-bold block mb-0.5">Foco Principal:</strong>
                  {ver.focus}
                </div>

                {/* Key Highlights / Features */}
                <div className="space-y-2">
                  <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">
                    Principais Marcos & Entregáveis da Versão:
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {ver.keyHighlights.map((hl, hIdx) => (
                      <div key={hIdx} className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/80 text-xs text-slate-800 font-semibold flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>{hl}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
