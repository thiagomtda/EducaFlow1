import React, { useState } from 'react';
import { 
  BACKEND_ARCHITECTURE_OVERVIEW,
  DATABASE_TABLES_REGISTRY,
  RLS_POLICIES_SPECIFICATION,
  API_ENDPOINTS_CONTRACTS,
  OFFLINE_SYNC_FLOWS,
  STORAGE_BUCKETS_REGISTRY,
  WEBHOOK_EVENTS_REGISTRY,
  NFR_REQUIREMENTS_SUITE,
  BACKEND_DEPENDENCY_MATRIX,
  TECHNICAL_ACCEPTANCE_CRITERIA_LIST,
  TECH_LEAD_SIGNOFF_DECLARATION
} from '../data/backendApiArchitectureData';
import { DatabaseTableSpec, ApiEndpointSpec } from '../types';
import { 
  Server, 
  Database, 
  Lock, 
  Network, 
  WifiOff, 
  HardDrive, 
  ShieldCheck, 
  Cpu, 
  Terminal, 
  CheckCircle2, 
  Code, 
  Layers, 
  KeyRound, 
  Zap, 
  Table, 
  FileJson, 
  Check, 
  Copy, 
  AlertCircle,
  RefreshCw,
  FolderLock,
  Workflow,
  BarChart,
  Award
} from 'lucide-react';

export const BackendApiArchitectureView: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<
    'overview' | 'tables' | 'rls' | 'api' | 'sync' | 'storage_audit' | 'gemini_events' | 'nfr_matrix'
  >('overview');

  const [selectedTableName, setSelectedTableName] = useState<string>(DATABASE_TABLES_REGISTRY[0].tableName);
  const [selectedApiId, setSelectedApiId] = useState<string>(API_ENDPOINTS_CONTRACTS[0].id);
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const selectedTable: DatabaseTableSpec = 
    DATABASE_TABLES_REGISTRY.find(t => t.tableName === selectedTableName) || DATABASE_TABLES_REGISTRY[0];

  const selectedApi: ApiEndpointSpec = 
    API_ENDPOINTS_CONTRACTS.find(a => a.id === selectedApiId) || API_ENDPOINTS_CONTRACTS[0];

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2000);
  };

  return (
    <div className="h-full flex flex-col bg-slate-50 overflow-y-auto">
      {/* Top Header Banner */}
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 text-white border-b border-indigo-900/50 p-6 md:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2.5 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-full text-xs font-semibold tracking-wider uppercase flex items-center gap-1.5">
                  <Server className="w-3.5 h-3.5 text-emerald-400" /> Supabase & PostgreSQL 16 Ready
                </span>
                <span className="px-2.5 py-1 bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 rounded-full text-xs font-semibold">
                  API Contract v1.0
                </span>
              </div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                EducaFlow Backend Architecture & API Contract v1.0
              </h1>
              <p className="text-slate-300 text-sm md:text-base mt-1 max-w-3xl">
                Blueprint técnico completo do backend: Schema PostgreSQL/Supabase, Políticas RLS, Contratos de API REST/Edge Functions, Motor de Sincronização Offline e Integridade LGPD.
              </p>
            </div>

            <div className="flex items-center gap-3 bg-slate-900/90 p-3.5 rounded-xl border border-slate-800 backdrop-blur-sm">
              <div className="text-right">
                <div className="text-xs text-slate-400 font-medium">Equipe Técnica de Arquitetura</div>
                <div className="text-xs font-bold text-emerald-400">Principal Architect & Tech Lead</div>
              </div>
            </div>
          </div>

          {/* Sub-Navigation Tabs */}
          <div className="flex items-center gap-2 mt-6 overflow-x-auto pb-1 scrollbar-none border-t border-slate-800/80 pt-4">
            <button
              onClick={() => setActiveSubTab('overview')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                activeSubTab === 'overview'
                  ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20 font-bold'
                  : 'bg-slate-800/60 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-700/50'
              }`}
            >
              <Server className="w-4 h-4" />
              1. Visão Geral & Stack
            </button>

            <button
              onClick={() => setActiveSubTab('tables')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                activeSubTab === 'tables'
                  ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20 font-bold'
                  : 'bg-slate-800/60 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-700/50'
              }`}
            >
              <Table className="w-4 h-4" />
              2. Schema PostgreSQL ({DATABASE_TABLES_REGISTRY.length} Tabelas)
            </button>

            <button
              onClick={() => setActiveSubTab('rls')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                activeSubTab === 'rls'
                  ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20 font-bold'
                  : 'bg-slate-800/60 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-700/50'
              }`}
            >
              <Lock className="w-4 h-4" />
              3. Políticas RLS (Multi-Tenant)
            </button>

            <button
              onClick={() => setActiveSubTab('api')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                activeSubTab === 'api'
                  ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20 font-bold'
                  : 'bg-slate-800/60 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-700/50'
              }`}
            >
              <Network className="w-4 h-4" />
              4. Contratos de API REST
            </button>

            <button
              onClick={() => setActiveSubTab('sync')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                activeSubTab === 'sync'
                  ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20 font-bold'
                  : 'bg-slate-800/60 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-700/50'
              }`}
            >
              <WifiOff className="w-4 h-4" />
              5. Engine Offline/Online
            </button>

            <button
              onClick={() => setActiveSubTab('storage_audit')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                activeSubTab === 'storage_audit'
                  ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20 font-bold'
                  : 'bg-slate-800/60 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-700/50'
              }`}
            >
              <HardDrive className="w-4 h-4" />
              6. Storage & Auditoria
            </button>

            <button
              onClick={() => setActiveSubTab('gemini_events')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                activeSubTab === 'gemini_events'
                  ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20 font-bold'
                  : 'bg-slate-800/60 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-700/50'
              }`}
            >
              <Workflow className="w-4 h-4" />
              7. Gemini Proxy & Eventos
            </button>

            <button
              onClick={() => setActiveSubTab('nfr_matrix')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                activeSubTab === 'nfr_matrix'
                  ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20 font-bold'
                  : 'bg-slate-800/60 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-700/50'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              8. NFRs, Matrix & Aceite
            </button>
          </div>
        </div>
      </div>

      {/* Main Tab Content */}
      <div className="max-w-7xl w-full mx-auto p-4 md:p-8 flex-1">
        {/* SUBTAB 1: OVERVIEW & STACK */}
        {activeSubTab === 'overview' && (
          <div className="space-y-8">
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
              <div className="border-b border-slate-100 pb-3">
                <span className="text-xs font-mono font-bold bg-indigo-100 text-indigo-900 px-2.5 py-0.5 rounded border border-indigo-200">
                  PADRÃO ARQUITETÔNICO
                </span>
                <h2 className="text-xl font-extrabold text-slate-900 mt-1">
                  {BACKEND_ARCHITECTURE_OVERVIEW.architecturePattern}
                </h2>
                <p className="text-xs text-slate-600 mt-1">
                  Combinação de PostgreSQL gerenciado, exposição de APIs via PostgREST, microsserviços serverless em Edge Functions para IA/PDF e sincronização local Offline First.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
                {BACKEND_ARCHITECTURE_OVERVIEW.coreComponents.map((comp, idx) => (
                  <div key={idx} className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="p-2 bg-indigo-950 text-indigo-300 rounded-lg">
                        <Cpu className="w-4 h-4" />
                      </div>
                      <div>
                        <h3 className="text-xs font-extrabold text-slate-900">{comp.name}</h3>
                        <span className="text-[10px] font-mono text-indigo-700 font-bold">{comp.tech}</span>
                      </div>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed pt-1">
                      {comp.role}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Architecture Highlights Box */}
            <div className="bg-slate-950 text-white p-6 rounded-xl border border-slate-800 shadow-sm space-y-4">
              <h3 className="text-base font-extrabold text-emerald-400 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                Regras de Ouro do Backend EducaFlow
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-slate-900 p-4 rounded-lg border border-slate-800 text-xs space-y-1">
                  <span className="text-amber-400 font-bold block">1. Zero Chave de API no Navegador</span>
                  <p className="text-slate-300 text-[11px]">
                    Nenhuma secret (Gemini API Key, Supabase Service Role Key) é exposta ao front-end. Toda chamada de IA passa obrigatoriamente por Edge Functions/Express Proxy com validação JWT.
                  </p>
                </div>

                <div className="bg-slate-900 p-4 rounded-lg border border-slate-800 text-xs space-y-1">
                  <span className="text-emerald-400 font-bold block">2. Multi-Tenancy Nativo no Banco</span>
                  <p className="text-slate-300 text-[11px]">
                    Isolamento absoluto entre redes de ensino e escolas imposto via políticas Row Level Security (RLS) no PostgreSQL, sem depender unicamente de filtros na camada de aplicação.
                  </p>
                </div>

                <div className="bg-slate-900 p-4 rounded-lg border border-slate-800 text-xs space-y-1">
                  <span className="text-indigo-400 font-bold block">3. Resiliência Offline-First</span>
                  <p className="text-slate-300 text-[11px]">
                    Lançamentos de presença e diário de classe salvam imediatamente em IndexedDB no PWA. A sincronização envia em background assim que a conexão restabelece.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SUBTAB 2: DATABASE SCHEMA INSPECTOR */}
        {activeSubTab === 'tables' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Table Selector Sidebar */}
            <div className="lg:col-span-4 space-y-3">
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-3">
                <h3 className="font-bold text-slate-900 flex items-center justify-between text-xs border-b border-slate-100 pb-2">
                  <span className="flex items-center gap-1.5"><Table className="w-4 h-4 text-emerald-600" /> Tabelas PostgreSQL ({DATABASE_TABLES_REGISTRY.length})</span>
                </h3>

                <div className="space-y-1.5">
                  {DATABASE_TABLES_REGISTRY.map((tbl) => {
                    const isSelected = tbl.tableName === selectedTableName;
                    return (
                      <button
                        key={tbl.tableName}
                        onClick={() => setSelectedTableName(tbl.tableName)}
                        className={`w-full text-left p-2.5 rounded-lg transition-all border ${
                          isSelected
                            ? 'bg-emerald-50 border-emerald-500 text-emerald-950 font-semibold shadow-sm'
                            : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-xs font-bold text-slate-900">{tbl.tableName}</span>
                          <span className="text-[10px] text-indigo-700 bg-indigo-50 px-1.5 py-0.5 rounded border border-indigo-200">{tbl.boundedContext}</span>
                        </div>
                        <p className="text-[11px] text-slate-500 line-clamp-1 mt-1">{tbl.description}</p>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Table Detail View */}
            <div className="lg:col-span-8 space-y-6">
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-2 py-0.5 bg-slate-900 text-white font-mono font-bold rounded text-xs">
                        table: public.{selectedTable.tableName}
                      </span>
                      <span className="text-xs text-indigo-700 font-semibold bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                        {selectedTable.boundedContext}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 mt-1">{selectedTable.description}</p>
                  </div>

                  <span className="text-xs font-mono text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200 font-bold">
                    PK: {selectedTable.primaryKey}
                  </span>
                </div>

                {/* Columns Table */}
                <div>
                  <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Table className="w-4 h-4 text-emerald-600" /> Definição de Colunas & Constraints
                  </h3>
                  <div className="overflow-x-auto border border-slate-200 rounded-lg">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-100 font-mono uppercase text-[10px] text-slate-700">
                        <tr>
                          <th className="p-2.5">Nome da Coluna</th>
                          <th className="p-2.5">Tipo de Dado</th>
                          <th className="p-2.5">Constraints</th>
                          <th className="p-2.5">Descrição</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200 font-mono text-[11px]">
                        {selectedTable.columns.map((col, idx) => (
                          <tr key={idx} className="hover:bg-slate-50">
                            <td className="p-2.5 font-bold text-indigo-900">{col.name}</td>
                            <td className="p-2.5 text-emerald-800">{col.type}</td>
                            <td className="p-2.5 text-slate-600 text-[10px]">{col.constraints}</td>
                            <td className="p-2.5 text-slate-700 font-sans text-xs">{col.description}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Foreign Keys & Indexes */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 space-y-2">
                    <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                      <KeyRound className="w-4 h-4 text-amber-600" /> Chaves Estrangeiras (FKs)
                    </h4>
                    {selectedTable.foreignKeys.length === 0 ? (
                      <span className="text-xs text-slate-500 italic block">Nenhuma FK externa.</span>
                    ) : (
                      <ul className="space-y-1.5">
                        {selectedTable.foreignKeys.map((fk, idx) => (
                          <li key={idx} className="text-[11px] font-mono text-slate-700 bg-white p-2 rounded border border-slate-200">
                            <span className="font-bold text-slate-900">{fk.column}</span> → {fk.referencesTable}.{fk.referencesColumn} ({fk.onDelete})
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 space-y-2">
                    <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                      <Zap className="w-4 h-4 text-emerald-600" /> Índices de Performance
                    </h4>
                    <ul className="space-y-1.5">
                      {selectedTable.indexes.map((idxItem, idx) => (
                        <li key={idx} className="text-[11px] font-mono text-slate-700 bg-white p-2 rounded border border-slate-200">
                          <span className="font-bold text-emerald-900">{idxItem.name}</span> ({idxItem.columns.join(', ')})
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SUBTAB 3: ROW LEVEL SECURITY (RLS) */}
        {activeSubTab === 'rls' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
              <div>
                <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
                  <Lock className="w-5 h-5 text-indigo-600" />
                  Políticas Row Level Security (RLS) & Isolamento Multi-Tenant
                </h2>
                <p className="text-xs text-slate-600 mt-1">
                  Regras de segurança aplicadas diretamente no banco de dados para isolar escolas e restringir acessos por papel (RBAC).
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {RLS_POLICIES_SPECIFICATION.map((pol, idx) => (
                  <div key={idx} className="bg-slate-950 text-slate-200 p-5 rounded-xl border border-slate-800 space-y-3 font-mono text-xs shadow-inner">
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-2">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-300 rounded font-bold">
                          {pol.command}
                        </span>
                        <span className="text-white font-bold">tabela: public.{pol.tableName}</span>
                      </div>
                      <span className="text-[10px] text-amber-400 font-bold bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800">
                        {pol.policyName}
                      </span>
                    </div>

                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase mb-1">Expressão USING (SQL):</span>
                      <pre className="bg-slate-900 p-3 rounded text-emerald-300 overflow-x-auto text-[11px] whitespace-pre-wrap">{pol.usingExpression}</pre>
                    </div>

                    <div className="bg-slate-900/60 p-2.5 rounded border border-slate-800 font-sans text-xs text-slate-300">
                      <span className="font-bold text-amber-300 block mb-0.5">Objetivo de Segurança:</span>
                      {pol.securityObjective}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* SUBTAB 4: REST API CONTRACTS */}
        {activeSubTab === 'api' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* API Sidebar List */}
            <div className="lg:col-span-4 space-y-3">
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-3">
                <h3 className="font-bold text-slate-900 text-xs border-b border-slate-100 pb-2 flex items-center justify-between">
                  <span className="flex items-center gap-1.5"><Network className="w-4 h-4 text-indigo-600" /> Endpoints da API MVP</span>
                </h3>

                <div className="space-y-2">
                  {API_ENDPOINTS_CONTRACTS.map((api) => {
                    const isSelected = api.id === selectedApiId;
                    return (
                      <button
                        key={api.id}
                        onClick={() => setSelectedApiId(api.id)}
                        className={`w-full text-left p-3 rounded-lg transition-all border ${
                          isSelected
                            ? 'bg-indigo-50 border-indigo-500 text-indigo-950 font-semibold shadow-sm'
                            : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                            api.method === 'POST' ? 'bg-emerald-600 text-white' : 'bg-blue-600 text-white'
                          }`}>
                            {api.method}
                          </span>
                          <span className="text-[10px] text-slate-500 font-mono">{api.implementationType}</span>
                        </div>
                        <h4 className="text-xs font-mono font-bold mt-1.5 line-clamp-1">{api.path}</h4>
                        <p className="text-[11px] text-slate-500 line-clamp-1 mt-1">{api.summary}</p>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* API Inspector Panel */}
            <div className="lg:col-span-8 space-y-6">
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`px-2.5 py-0.5 rounded text-xs font-mono font-bold ${
                        selectedApi.method === 'POST' ? 'bg-emerald-600 text-white' : 'bg-blue-600 text-white'
                      }`}>
                        {selectedApi.method}
                      </span>
                      <span className="font-mono text-sm font-bold text-slate-900">{selectedApi.path}</span>
                    </div>
                    <p className="text-xs text-slate-600 mt-1">{selectedApi.summary}</p>
                  </div>

                  <span className="text-xs font-mono text-indigo-800 bg-indigo-50 px-2.5 py-1 rounded border border-indigo-200">
                    Rate Limit: {selectedApi.rateLimit}
                  </span>
                </div>

                {/* Headers */}
                <div>
                  <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Request Headers Mandatórios</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedApi.requestHeaders.map((h, idx) => (
                      <span key={idx} className="text-xs font-mono bg-slate-100 text-slate-800 px-2.5 py-1 rounded border border-slate-300">
                        {h}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Request and Response Schemas */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center justify-between">
                      <span>Payload de Entrada (Request JSON)</span>
                      <button onClick={() => handleCopy(selectedApi.requestPayloadSchema, 'req')} className="text-slate-400 hover:text-slate-600">
                        {copiedText === 'req' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </h3>
                    <pre className="bg-slate-950 text-emerald-300 p-3.5 rounded-xl font-mono text-[11px] overflow-x-auto border border-slate-800">
                      {selectedApi.requestPayloadSchema}
                    </pre>
                  </div>

                  <div>
                    <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center justify-between">
                      <span>Resposta de Sucesso (200/201 OK)</span>
                      <button onClick={() => handleCopy(selectedApi.responsePayloadSchema, 'res')} className="text-slate-400 hover:text-slate-600">
                        {copiedText === 'res' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </h3>
                    <pre className="bg-slate-950 text-slate-200 p-3.5 rounded-xl font-mono text-[11px] overflow-x-auto border border-slate-800">
                      {selectedApi.responsePayloadSchema}
                    </pre>
                  </div>
                </div>

                {/* Error Codes */}
                <div>
                  <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Tratamento de Erros & Códigos HTTP</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {selectedApi.errorCodes.map((err, idx) => (
                      <div key={idx} className="bg-red-50/60 p-2.5 rounded border border-red-200 text-xs">
                        <span className="font-mono font-bold text-red-700 block">{err.code} - {err.name}</span>
                        <span className="text-[11px] text-slate-600">{err.condition}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SUBTAB 5: OFFLINE SYNC ENGINE */}
        {activeSubTab === 'sync' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
              <div>
                <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
                  <WifiOff className="w-5 h-5 text-amber-500" />
                  Motor de Sincronização Offline-First (IndexedDB + PWA Queue)
                </h2>
                <p className="text-xs text-slate-600 mt-1">
                  Arquitetura de resiliência garantindo que nenhuma informação de diário de classe seja perdida, mesmo em escolas rurais com instabilidade de sinal.
                </p>
              </div>

              {OFFLINE_SYNC_FLOWS.map((flow, idx) => (
                <div key={idx} className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-4">
                  <h3 className="text-sm font-extrabold text-slate-900">{flow.flowName}</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div className="bg-white p-3 rounded border border-slate-200">
                      <span className="font-bold text-slate-900 block mb-1">Gatilho de Sincronização:</span>
                      <span className="text-slate-700">{flow.triggerEvent}</span>
                    </div>

                    <div className="bg-white p-3 rounded border border-slate-200">
                      <span className="font-bold text-slate-900 block mb-1">Armazenamento Local (Client):</span>
                      <span className="font-mono text-indigo-700">{flow.clientStorage}</span>
                    </div>

                    <div className="bg-white p-3 rounded border border-slate-200">
                      <span className="font-bold text-slate-900 block mb-1">Regra de Resolução de Conflitos:</span>
                      <span className="text-slate-700">{flow.conflictResolutionRule}</span>
                    </div>

                    <div className="bg-white p-3 rounded border border-slate-200">
                      <span className="font-bold text-slate-900 block mb-1">Comportamento em Falha Prolongada:</span>
                      <span className="text-slate-700">{flow.fallbackBehavior}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SUBTAB 6: STORAGE & AUDIT */}
        {activeSubTab === 'storage_audit' && (
          <div className="space-y-8">
            {/* Storage Buckets */}
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
              <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
                <HardDrive className="w-5 h-5 text-indigo-600" />
                Buckets do Supabase Storage & Políticas de Acesso
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {STORAGE_BUCKETS_REGISTRY.map((b, idx) => (
                  <div key={idx} className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-bold text-indigo-900">{b.bucketName}</span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-300">
                        {b.isPublic ? 'PÚBLICO' : 'PRIVADO (RLS)'}
                      </span>
                    </div>
                    <p className="text-slate-600">{b.securityAccessPolicy}</p>
                    <div className="pt-2 flex items-center justify-between text-[11px] font-mono text-slate-500">
                      <span>Tamanho máx: {b.maxFileSizeMb} MB</span>
                      <span>Extensões: {b.fileTypesAllowed.join(', ')}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Audit Log Table */}
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
              <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
                <FolderLock className="w-5 h-5 text-emerald-600" />
                Trilha de Auditoria Imutável (LGPD Compliance)
              </h2>
              <p className="text-xs text-slate-600">
                A tabela <code className="font-mono bg-slate-100 px-1 rounded">public.audit_logs</code> registra com precisão milissegunda cada leitura ou geração de parecer com IA, garantindo prestação de contas completa para a rede municipal.
              </p>
            </div>
          </div>
        )}

        {/* SUBTAB 7: GEMINI PROXY & EVENTS */}
        {activeSubTab === 'gemini_events' && (
          <div className="space-y-8">
            <div className="bg-slate-950 text-white p-6 rounded-xl border border-slate-800 space-y-4">
              <h2 className="text-xl font-extrabold text-emerald-400 flex items-center gap-2">
                <Zap className="w-5 h-5 text-emerald-400" />
                Proxy Server-Side do Google Gemini 2.5 Flash (@google/genai)
              </h2>
              <p className="text-xs text-slate-300">
                A comunicação com os modelos de IA Generativa do Google ocorre estritamente dentro da Supabase Edge Function ou proxy Express, sem expor tokens no cliente.
              </p>

              <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 font-mono text-xs text-slate-300 overflow-x-auto">
                <pre>{`// server/geminiProxy.ts - Exemplo de execução segura
import { GoogleGenAI } from "@google/genai";

export async function handleAuroraRequest(promptSpec, variables) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error("GEMINI_API_KEY environment variable is required");
  
  const ai = new GoogleGenAI({ apiKey });
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: promptSpec.systemInstruction,
    config: { temperature: promptSpec.temperature }
  });
  return response.text;
}`}</pre>
              </div>
            </div>

            {/* Webhooks Registry */}
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
              <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
                <Workflow className="w-5 h-5 text-indigo-600" />
                Eventos Internos de Domínio (Webhooks)
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {WEBHOOK_EVENTS_REGISTRY.map((evt, idx) => (
                  <div key={idx} className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2 text-xs">
                    <span className="font-mono font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 block w-fit">
                      {evt.eventName}
                    </span>
                    <p className="text-slate-700"><span className="font-bold">Origem:</span> {evt.sourceModule}</p>
                    <p className="text-slate-700"><span className="font-bold">Inscritos:</span> {evt.targetSubscribers.join(', ')}</p>
                    <pre className="bg-slate-900 text-emerald-300 p-2 rounded text-[10px] font-mono overflow-x-auto">{evt.payloadSchema}</pre>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* SUBTAB 8: NFR, MATRIX & SIGNOFF */}
        {activeSubTab === 'nfr_matrix' && (
          <div className="space-y-8">
            {/* NFRs Table */}
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
              <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
                <BarChart className="w-5 h-5 text-indigo-600" />
                Requisitos Não Funcionais (NFRs) & SLAs
              </h2>

              <div className="overflow-x-auto border border-slate-200 rounded-xl">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-900 text-white font-mono uppercase text-[10px]">
                    <tr>
                      <th className="p-3">Categoria</th>
                      <th className="p-3">Métrica</th>
                      <th className="p-3">Target / SLA</th>
                      <th className="p-3">Mecanismo Arquitetural</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {NFR_REQUIREMENTS_SUITE.map((nfr, idx) => (
                      <tr key={idx} className="hover:bg-slate-50">
                        <td className="p-3 font-bold text-slate-900">{nfr.category}</td>
                        <td className="p-3 text-slate-700">{nfr.metric}</td>
                        <td className="p-3 font-mono font-bold text-emerald-700">{nfr.targetSla}</td>
                        <td className="p-3 text-slate-600">{nfr.architectureMechanism}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Dependency Matrix */}
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
              <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
                <Layers className="w-5 h-5 text-indigo-600" />
                Matriz Completa de Dependências do Backend
              </h2>

              <div className="overflow-x-auto border border-slate-200 rounded-xl">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-900 text-white font-mono uppercase text-[10px]">
                    <tr>
                      <th className="p-3">Módulo</th>
                      <th className="p-3">Depende de</th>
                      <th className="p-3">Tabelas Utilizadas</th>
                      <th className="p-3">Serviços Externos</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {BACKEND_DEPENDENCY_MATRIX.map((dep, idx) => (
                      <tr key={idx} className="hover:bg-slate-50">
                        <td className="p-3 font-bold text-indigo-900">{dep.moduleCode} - {dep.moduleName}</td>
                        <td className="p-3 text-slate-700">{dep.dependsOnModules.join(', ')}</td>
                        <td className="p-3 font-mono text-[11px] text-slate-800">{dep.databaseTablesUsed.join(', ')}</td>
                        <td className="p-3 font-mono text-[11px] text-amber-800">{dep.externalApisUsed.join(', ')}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Acceptance Criteria & Signoff */}
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6">
              <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                Critérios de Aceite Técnicos & Homologação Final
              </h2>

              <div className="space-y-3">
                {TECHNICAL_ACCEPTANCE_CRITERIA_LIST.map((tac) => (
                  <div key={tac.id} className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-wrap items-center justify-between gap-2 text-xs">
                    <div>
                      <span className="font-mono font-bold text-indigo-900">{tac.id} ({tac.moduleCode}): </span>
                      <span className="font-bold text-slate-900">{tac.criterionTitle}</span>
                      <p className="text-slate-600 mt-1">{tac.expectedResult}</p>
                    </div>
                    <span className="px-2.5 py-1 bg-emerald-100 text-emerald-900 font-mono font-bold rounded border border-emerald-300">
                      {tac.signoffStatus}
                    </span>
                  </div>
                ))}
              </div>

              {/* Tech Lead Signoff Declaration */}
              <div className="bg-slate-950 text-white p-6 rounded-xl border border-slate-800 space-y-4">
                <div className="border-b border-slate-800 pb-3">
                  <span className="text-xs font-mono font-bold bg-amber-500/20 text-amber-300 px-2.5 py-0.5 rounded border border-amber-500/30">
                    PARECER TÉCNICO DE ENGENHARIA
                  </span>
                  <h3 className="text-lg font-extrabold text-white mt-1">{TECH_LEAD_SIGNOFF_DECLARATION.signoffTitle}</h3>
                  <p className="text-xs text-slate-400">Data: {TECH_LEAD_SIGNOFF_DECLARATION.signoffDate}</p>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed italic">
                  "{TECH_LEAD_SIGNOFF_DECLARATION.signoffBody}"
                </p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-2">
                  {TECH_LEAD_SIGNOFF_DECLARATION.teamLeaders.map((ldr, idx) => (
                    <div key={idx} className="bg-slate-900 p-3 rounded border border-slate-800 text-[11px]">
                      <span className="font-bold text-slate-200 block">{ldr.role}</span>
                      <span className="text-emerald-400 font-mono font-bold text-[10px]">{ldr.status}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
