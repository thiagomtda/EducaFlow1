import { useState } from 'react';
import { 
  SYSTEM_ENTITIES, 
  CENTRAL_ENTITY_JUSTIFICATION, 
  COPILOT_ARCHITECTURE, 
  DATA_LIFECYCLE_STAGES, 
  SYSTEM_AUDIT_ITEMS, 
  CHIEF_ARCHITECT_VERDICT 
} from '../data/systemBlueprintData';
import { SystemEntity } from '../types';
import { 
  Database, 
  Cpu, 
  ShieldCheck, 
  Layers, 
  Bot, 
  Sparkles, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  Key, 
  FileCode, 
  Workflow, 
  ArrowRight, 
  BookOpen, 
  User, 
  Users, 
  HelpCircle, 
  Zap, 
  Lock, 
  ShieldAlert,
  Server,
  Award,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

export const SystemBlueprintView = () => {
  const [activeTab, setActiveTab] = useState<'entities' | 'central' | 'copilot' | 'pipeline' | 'audit'>('entities');
  const [selectedEntityId, setSelectedEntityId] = useState<string>('ent-3'); // Default Turma
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const selectedEntity = SYSTEM_ENTITIES.find(e => e.id === selectedEntityId) || SYSTEM_ENTITIES[0];

  const filteredEntities = SYSTEM_ENTITIES.filter(ent => {
    if (categoryFilter !== 'all' && ent.category !== categoryFilter) return false;
    return true;
  });

  return (
    <div className="p-8 space-y-6 overflow-y-auto h-full bg-slate-50">
      {/* Header Banner */}
      <div className="bg-slate-900 text-white rounded-xl p-6 border border-slate-800 shadow-lg relative overflow-hidden">
        <div className="space-y-2 relative z-10 max-w-3xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 bg-amber-500/20 text-amber-300 text-xs font-bold rounded-full border border-amber-500/30 uppercase tracking-widest inline-block">
              Fase de Engenharia do Produto
            </span>
            <span className="px-3 py-1 bg-indigo-500/20 text-indigo-300 text-xs font-bold rounded-full border border-indigo-500/30 uppercase tracking-widest inline-block">
              Cérebro Lógico & Arquitetura
            </span>
          </div>
          <h3 className="text-2xl font-black text-white tracking-tight">
            EducaFlow System Blueprint (Arquitetura & Banco Lógico)
          </h3>
          <p className="text-slate-300 text-sm leading-relaxed">
            O guia definitivo da arquitetura lógica do sistema. Mapeamento estrito das 10 entidades centrais, guardrails da IA, fluxo global de dados e parecer técnico de escalabilidade para 5 anos.
          </p>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab('entities')}
          className={`px-4 py-2.5 rounded-lg text-xs font-extrabold transition-all cursor-pointer flex items-center gap-2 shrink-0 ${
            activeTab === 'entities'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Database className="w-4 h-4" />
          <span>1. Entidades Centrais ({SYSTEM_ENTITIES.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('central')}
          className={`px-4 py-2.5 rounded-lg text-xs font-extrabold transition-all cursor-pointer flex items-center gap-2 shrink-0 ${
            activeTab === 'central'
              ? 'bg-amber-500 text-slate-950 shadow-xs font-black'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Users className="w-4 h-4 text-slate-900" />
          <span>2. Coração do Sistema (Entidade Central "Turma")</span>
        </button>

        <button
          onClick={() => setActiveTab('copilot')}
          className={`px-4 py-2.5 rounded-lg text-xs font-extrabold transition-all cursor-pointer flex items-center gap-2 shrink-0 ${
            activeTab === 'copilot'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Bot className="w-4 h-4 text-amber-400" />
          <span>3. Copiloto Inteligente de IA</span>
        </button>

        <button
          onClick={() => setActiveTab('pipeline')}
          className={`px-4 py-2.5 rounded-lg text-xs font-extrabold transition-all cursor-pointer flex items-center gap-2 shrink-0 ${
            activeTab === 'pipeline'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Workflow className="w-4 h-4" />
          <span>4. Fluxo Global de Dados</span>
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
          <span>5. Auditoria & Parecer (5 Anos)</span>
        </button>
      </div>

      {/* TAB 1: SYSTEM ENTITIES */}
      {activeTab === 'entities' && (
        <div className="space-y-6">
          {/* Category Filter Selector */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <span className="text-xs font-bold text-slate-800">
              Selecione uma entidade para visualizar os detalhes completos do banco:
            </span>

            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500 font-medium">Categoria:</span>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold text-slate-700 cursor-pointer outline-none focus:border-indigo-500"
              >
                <option value="all">Todas as Categorias</option>
                <option value="Ator/Usuário">Ator / Usuário</option>
                <option value="Estrutura Escolar">Estrutura Escolar</option>
                <option value="Núcleo Pedagógico">Núcleo Pedagógico</option>
                <option value="Avaliação & Registro">Avaliação & Registro</option>
                <option value="Síntese & Saída">Síntese & Saída</option>
              </select>
            </div>
          </div>

          {/* Grid of Entity Buttons */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2.5">
            {filteredEntities.map((ent) => {
              const isSelected = ent.id === selectedEntityId;
              const isCentral = ent.id === 'ent-3';

              return (
                <button
                  key={ent.id}
                  onClick={() => setSelectedEntityId(ent.id)}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer relative space-y-1 ${
                    isSelected
                      ? 'bg-indigo-600 text-white border-indigo-500 shadow-md font-bold'
                      : 'bg-white hover:bg-slate-100 text-slate-800 border-slate-200'
                  }`}
                >
                  {isCentral && (
                    <span className="absolute -top-2 -right-1 px-2 py-0.5 bg-amber-500 text-slate-950 font-black text-[9px] rounded-full border border-amber-600 shadow-xs">
                      CORAÇÃO
                    </span>
                  )}

                  <span className={`text-[9px] font-mono font-bold block uppercase ${
                    isSelected ? 'text-indigo-200' : 'text-slate-400'
                  }`}>
                    {ent.category}
                  </span>

                  <h5 className="text-xs font-extrabold truncate">{ent.name}</h5>
                </button>
              );
            })}
          </div>

          {/* Selected Entity Card Detail */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-6 shadow-sm">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-slate-100 gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 bg-slate-900 text-white text-[10px] font-mono font-bold rounded uppercase">
                    {selectedEntity.category}
                  </span>
                  {selectedEntity.id === 'ent-3' && (
                    <span className="px-2.5 py-0.5 bg-amber-500 text-slate-950 font-extrabold text-[10px] rounded uppercase">
                      ★ Entidade Central (Coração do Sistema)
                    </span>
                  )}
                </div>
                <h3 className="text-xl font-black text-slate-900">{selectedEntity.name}</h3>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 max-w-md">
                <strong className="text-slate-900 font-bold block mb-0.5">Objetivo Técnico da Entidade:</strong>
                {selectedEntity.objective}
              </div>
            </div>

            {/* Responsibilities & Stored Attributes */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <strong className="text-slate-800 uppercase tracking-wider text-[10px] font-extrabold block">
                  Responsabilidades Principais no Domínio:
                </strong>
                <ul className="space-y-1.5 text-slate-700 font-medium">
                  {selectedEntity.responsibilities.map((resp, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-indigo-600 font-bold">•</span>
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-indigo-50/70 border border-indigo-100 space-y-2">
                <strong className="text-indigo-900 uppercase tracking-wider text-[10px] font-extrabold block">
                  Informações / Atributos Armazenados no Banco:
                </strong>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {selectedEntity.attributesStored.map((attr, idx) => (
                    <span key={idx} className="px-2.5 py-1 bg-white border border-indigo-200 text-indigo-950 text-[11px] font-mono font-semibold rounded-md">
                      {attr}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Lifecycle Permissions: Created By, Modified By, Used By */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs font-medium">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-slate-400 font-bold uppercase text-[10px] block">Quem Cria:</span>
                <span className="text-slate-900 font-bold">{selectedEntity.createdBy}</span>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-slate-400 font-bold uppercase text-[10px] block">Quem Modifica:</span>
                <span className="text-slate-900 font-bold">{selectedEntity.modifiedBy}</span>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-slate-400 font-bold uppercase text-[10px] block">Quem Utiliza:</span>
                <span className="text-slate-900 font-bold">{selectedEntity.usedBy.join(', ')}</span>
              </div>
            </div>

            {/* Entity Relationships */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <strong className="text-xs font-extrabold text-slate-900 uppercase tracking-wider block">
                Relacionamentos com Outras Entidades:
              </strong>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {selectedEntity.relationships.map((rel, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-white border border-slate-200 text-xs space-y-1 flex items-start justify-between">
                    <div>
                      <span className="font-extrabold text-slate-900 block">{rel.targetEntity}</span>
                      <span className="text-slate-600">{rel.description}</span>
                    </div>

                    <span className="px-2 py-0.5 bg-slate-900 text-amber-400 font-mono font-bold text-[10px] rounded shrink-0">
                      {rel.cardinality}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: CENTRAL ENTITY SPOTLIGHT */}
      {activeTab === 'central' && (
        <div className="space-y-6">
          <div className="bg-amber-500 text-slate-950 p-6 rounded-xl border border-amber-600 shadow-md space-y-2">
            <span className="px-3 py-1 bg-slate-950 text-amber-400 font-black text-xs rounded-full uppercase tracking-widest inline-block">
              Âncora do Modelo de Domínio
            </span>
            <h3 className="text-2xl font-black text-slate-950">
              A Entidade Central do EducaFlow: TURMA (Class Cohort)
            </h3>
            <p className="text-slate-900 font-medium text-sm leading-relaxed">
              {CENTRAL_ENTITY_JUSTIFICATION.subtitle}. Toda a inteligência pedagógica, permissões de acesso, consultas de banco e agrupamento de IA orbitam ao redor da Turma do Ensino Fundamental I.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {CENTRAL_ENTITY_JUSTIFICATION.technicalReasons.map((reason, idx) => (
              <div key={idx} className="bg-white rounded-xl border border-slate-200 p-5 space-y-2 shadow-2xs">
                <h4 className="text-sm font-black text-slate-900">{reason.title}</h4>
                <p className="text-xs text-slate-600 font-medium leading-relaxed">
                  {reason.explanation}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: COPILOT ARCHITECTURE */}
      {activeTab === 'copilot' && (
        <div className="space-y-6">
          <div className="bg-slate-900 text-white p-6 rounded-xl border border-slate-800 shadow-md space-y-2">
            <span className="px-3 py-1 bg-indigo-500/20 text-indigo-300 font-bold text-xs rounded-full border border-indigo-500/30 uppercase tracking-widest inline-block">
              Arquitetura de Inteligência Artificial
            </span>
            <h3 className="text-xl font-black text-white">
              O Copiloto Único Inteligente EducaFlow
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              Construído com limites rigorosos de privacidade e governança de dados. A IA nunca atua como uma caixa-preta autonôma, mas sim como uma assistente pedagógica invisível e responsiva.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Accessible Data */}
            <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-3">
              <div className="flex items-center gap-2 text-xs font-black text-indigo-600 uppercase tracking-wider">
                <BookOpen className="w-4 h-4 text-indigo-600" />
                <span>Dados que a IA PODE Acessar (Contexto de Leitura)</span>
              </div>

              <ul className="space-y-2 text-xs text-slate-700 font-medium">
                {COPILOT_ARCHITECTURE.accessibleData.map((item, idx) => (
                  <li key={idx} className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Immutable Guardrails */}
            <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-3">
              <div className="flex items-center gap-2 text-xs font-black text-rose-600 uppercase tracking-wider">
                <ShieldAlert className="w-4 h-4 text-rose-600" />
                <span>Guardrails Inegociáveis (NUNCA Pode Alterar)</span>
              </div>

              <ul className="space-y-2 text-xs text-slate-700 font-medium">
                {COPILOT_ARCHITECTURE.immutableGuardrails.map((item, idx) => (
                  <li key={idx} className="p-2.5 bg-rose-50/70 rounded-lg border border-rose-200 text-rose-950 flex items-start gap-2">
                    <Lock className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Action Boundaries: Suggest, Confirm, Autonomous */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-6">
            <h4 className="text-sm font-black text-slate-900">Fronteiras de Atuação do Copiloto</h4>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              {/* Sugere */}
              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 space-y-2">
                <div className="flex items-center gap-1.5 font-black text-amber-900 uppercase">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  <span>Quando Apenas SUGERE</span>
                </div>
                <ul className="space-y-1.5 text-amber-950 font-medium">
                  {COPILOT_ARCHITECTURE.suggestionTriggers.map((sug, idx) => (
                    <li key={idx}>• {sug}</li>
                  ))}
                </ul>
              </div>

              {/* Pergunta / Confirma */}
              <div className="p-4 rounded-xl bg-indigo-50 border border-indigo-200 space-y-2">
                <div className="flex items-center gap-1.5 font-black text-indigo-900 uppercase">
                  <HelpCircle className="w-4 h-4 text-indigo-600" />
                  <span>Quando PERGUNTA ao Professor</span>
                </div>
                <ul className="space-y-1.5 text-indigo-950 font-medium">
                  {COPILOT_ARCHITECTURE.userConfirmationTriggers.map((cnf, idx) => (
                    <li key={idx}>• {cnf}</li>
                  ))}
                </ul>
              </div>

              {/* Age Automático */}
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 space-y-2">
                <div className="flex items-center gap-1.5 font-black text-emerald-900 uppercase">
                  <Zap className="w-4 h-4 text-emerald-600" />
                  <span>Quando AGA AUTOMATICAMENTE</span>
                </div>
                <ul className="space-y-1.5 text-emerald-950 font-medium">
                  {COPILOT_ARCHITECTURE.autonomousActions.map((aut, idx) => (
                    <li key={idx}>• {aut}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: GLOBAL DATA PIPELINE */}
      {activeTab === 'pipeline' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
            <h4 className="text-sm font-black text-slate-900 flex items-center gap-2">
              <Workflow className="w-4 h-4 text-indigo-600" />
              <span>Ciclo de Vida do Dado (Fluxo Global da Informação)</span>
            </h4>

            <div className="space-y-4">
              {DATA_LIFECYCLE_STAGES.map((stage) => (
                <div key={stage.stepNumber} className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <span className="w-7 h-7 rounded-full bg-slate-900 text-white font-black text-xs flex items-center justify-center shrink-0">
                        {stage.stepNumber}
                      </span>
                      <h5 className="text-xs font-black text-slate-900">{stage.stageName}</h5>
                    </div>

                    <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 bg-emerald-100 text-emerald-800 rounded-md">
                      Artefato Final: {stage.outputArtefact}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                    <div className="p-3 bg-white rounded-lg border border-slate-200">
                      <span className="text-[10px] font-bold text-slate-400 block uppercase">Entidade de Origem:</span>
                      <span className="font-bold text-slate-800">{stage.originEntity}</span>
                    </div>

                    <div className="p-3 bg-white rounded-lg border border-slate-200">
                      <span className="text-[10px] font-bold text-indigo-600 block uppercase">Lógica de Transformação:</span>
                      <span className="font-medium text-slate-800">{stage.transformationLogic}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: TECHNICAL AUDIT & 5-YEAR SCALABILITY VERDICT */}
      {activeTab === 'audit' && (
        <div className="space-y-6">
          {/* Audit Items */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
            <h4 className="text-sm font-black text-slate-900 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Auditoria Técnica de Redundâncias & Riscos Futuros</span>
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {SYSTEM_AUDIT_ITEMS.map((item, idx) => (
                <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 bg-slate-900 text-white text-[10px] font-mono font-bold rounded">
                      {item.category}
                    </span>
                    <span className={`px-2 py-0.5 text-[10px] font-extrabold rounded ${
                      item.riskLevel === 'Crítico' ? 'bg-rose-100 text-rose-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      Risco: {item.riskLevel}
                    </span>
                  </div>

                  <h5 className="font-black text-slate-900 text-xs">{item.title}</h5>
                  <p className="text-slate-600 font-medium">{item.description}</p>

                  <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-950 font-bold">
                    Estratégia de Mitigação: {item.mitigationStrategy}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Chief Architect Verdict Card */}
          <div className="bg-slate-900 text-white rounded-xl border border-slate-800 p-6 space-y-4 shadow-xl">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-emerald-500 text-slate-950 rounded-xl font-black">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest block font-mono">
                  {CHIEF_ARCHITECT_VERDICT.architectName}
                </span>
                <h4 className="text-lg font-black text-white">{CHIEF_ARCHITECT_VERDICT.verdictTitle}</h4>
              </div>
            </div>

            <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-black text-xs rounded-lg uppercase tracking-wider inline-block">
              {CHIEF_ARCHITECT_VERDICT.status}
            </div>

            <p className="text-slate-200 text-xs leading-relaxed font-medium pt-1">
              "{CHIEF_ARCHITECT_VERDICT.statement}"
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
