import React, { useState } from 'react';
import {
  Compass,
  Layers,
  FolderTree,
  Type,
  Code,
  FileCheck,
  Server,
  Database,
  Bot,
  Activity,
  GitBranch,
  Terminal,
  CheckSquare,
  ShieldCheck,
  Zap,
  Eye,
  FileText,
  Cpu,
  AlertTriangle,
  Award,
  Search,
  Check,
  Copy,
  ChevronRight,
  Filter,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import {
  CONSTITUTION_SECTIONS,
  ENGINEERING_PHILOSOPHIES,
  HOMOLOGATION_SIGNATORIES,
  ConstitutionSection
} from '../data/engineeringConstitutionData';

export const EngineeringConstitutionView: React.FC = () => {
  const [selectedSectionId, setSelectedSectionId] = useState<string>('sec_1_philosophy');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedIndex, setCopiedIndex] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(id);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const categories = [
    { id: 'all', label: 'Todas as 20 Seções' },
    { id: 'core', label: 'Filosofia & Governança' },
    { id: 'architecture', label: 'Arquitetura & Backend' },
    { id: 'code_standards', label: 'Padrões React & TS' },
    { id: 'devops_quality', label: 'DevOps, CI/CD & Qualidade' },
    { id: 'ai_security', label: 'IA Aurora & Segurança' }
  ];

  const filteredSections = CONSTITUTION_SECTIONS.filter(sec => {
    const matchesCategory = categoryFilter === 'all' || sec.category === categoryFilter;
    const matchesSearch = 
      sec.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sec.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sec.rules.some(r => r.ruleTitle.toLowerCase().includes(searchQuery.toLowerCase()) || r.description.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const activeSection = CONSTITUTION_SECTIONS.find(s => s.id === selectedSectionId) || CONSTITUTION_SECTIONS[0];

  const renderIcon = (iconName: string) => {
    const props = { className: "w-5 h-5" };
    switch (iconName) {
      case 'Compass': return <Compass {...props} />;
      case 'Layers': return <Layers {...props} />;
      case 'FolderTree': return <FolderTree {...props} />;
      case 'Type': return <Type {...props} />;
      case 'Code': return <Code {...props} />;
      case 'FileCheck': return <FileCheck {...props} />;
      case 'Server': return <Server {...props} />;
      case 'Database': return <Database {...props} />;
      case 'Bot': return <Bot {...props} />;
      case 'Activity': return <Activity {...props} />;
      case 'GitBranch': return <GitBranch {...props} />;
      case 'Terminal': return <Terminal {...props} />;
      case 'CheckSquare': return <CheckSquare {...props} />;
      case 'ShieldCheck': return <ShieldCheck {...props} />;
      case 'Zap': return <Zap {...props} />;
      case 'Eye': return <Eye {...props} />;
      case 'FileText': return <FileText {...props} />;
      case 'Cpu': return <Cpu {...props} />;
      case 'AlertTriangle': return <AlertTriangle {...props} />;
      case 'Award': return <Award {...props} />;
      default: return <ShieldCheck {...props} />;
    }
  };

  return (
    <div className="h-full flex flex-col bg-slate-950 text-slate-100 overflow-y-auto">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 border-b border-slate-800 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <ShieldCheck className="w-3.5 h-3.5" /> LEI SUPREMA DA ENGENHARIA
                </span>
                <span className="text-xs font-mono text-slate-400 bg-slate-800 px-2.5 py-1 rounded-md border border-slate-700">
                  EducaFlow Engineering Constitution v1.0
                </span>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight flex items-center gap-2">
                <Award className="w-7 h-7 text-emerald-400" />
                EducaFlow Engineering Constitution & Development Standards
              </h1>
              <p className="text-sm text-slate-300 mt-1 max-w-4xl">
                Manual Técnico Definitivo para Desenvolvimento no Visual Studio Code — Regras Invioláveis de Arquitetura, Convenções, React 18+, TypeScript Estrito, Supabase, Edge Functions, IA Aurora, CI/CD, Acessibilidade e Segurança.
              </p>
            </div>

            <div className="bg-slate-900/90 border border-emerald-500/30 p-3.5 rounded-xl text-right">
              <span className="text-[10px] font-mono text-emerald-400 block uppercase font-bold">Status do Documento</span>
              <span className="text-xs font-bold text-white">Homologado & Vigorando</span>
              <span className="text-[10px] text-slate-400 block mt-0.5">Validade Incondicional</span>
            </div>
          </div>

          {/* Quick Philosophy Ticker / Chips */}
          <div className="mt-6 pt-4 border-t border-slate-800/80">
            <span className="text-[11px] font-mono text-slate-400 uppercase font-bold block mb-2">
              Pilares Fundamentais de Engenharia:
            </span>
            <div className="flex flex-wrap gap-2">
              {ENGINEERING_PHILOSOPHIES.map((p, idx) => (
                <div key={idx} className="bg-slate-900/80 border border-slate-800 px-3 py-1.5 rounded-lg text-xs text-slate-300 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  <span className="font-semibold text-white">{p.title.split('.')[1]}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid Content */}
      <div className="flex-1 max-w-7xl mx-auto w-full p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Filter & 20 Sections List */}
        <div className="lg:col-span-4 space-y-4">
          {/* Search Box */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Buscar em todas as 20 seções..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-all"
            />
          </div>

          {/* Category Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setCategoryFilter(cat.id)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all whitespace-nowrap ${
                  categoryFilter === cat.id
                    ? 'bg-indigo-600 text-white font-semibold shadow'
                    : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Section List (1 to 20) */}
          <div className="space-y-1.5 max-h-[600px] overflow-y-auto pr-1">
            {filteredSections.map(sec => (
              <button
                key={sec.id}
                onClick={() => setSelectedSectionId(sec.id)}
                className={`w-full text-left p-3 rounded-xl border transition-all flex items-center justify-between group ${
                  selectedSectionId === sec.id
                    ? 'bg-indigo-600/20 border-indigo-500/60 text-white shadow-md'
                    : 'bg-slate-900/60 border-slate-800/80 text-slate-300 hover:bg-slate-900 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`w-7 h-7 rounded-lg text-xs font-bold flex items-center justify-center shrink-0 ${
                    selectedSectionId === sec.id
                      ? 'bg-indigo-600 text-white'
                      : 'bg-slate-800 text-slate-400'
                  }`}>
                    {sec.number}
                  </span>
                  <div>
                    <h3 className="text-xs font-bold text-white group-hover:text-indigo-300 transition-colors line-clamp-1">
                      {sec.title}
                    </h3>
                    <p className="text-[10px] text-slate-400 line-clamp-1 mt-0.5">
                      {sec.summary}
                    </p>
                  </div>
                </div>
                <ChevronRight className={`w-4 h-4 shrink-0 transition-transform ${
                  selectedSectionId === sec.id ? 'text-indigo-400 translate-x-1' : 'text-slate-600'
                }`} />
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: Detailed View of Active Section */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6">
            {/* Section Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 rounded-xl">
                  {renderIcon(activeSection.iconName)}
                </div>
                <div>
                  <span className="text-[10px] font-mono text-indigo-400 uppercase font-bold">
                    Seção Oficial #{activeSection.number}
                  </span>
                  <h2 className="text-xl font-bold text-white">{activeSection.title}</h2>
                </div>
              </div>

              <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full">
                Em Vigor
              </span>
            </div>

            {/* Summary */}
            <p className="text-xs text-slate-300 bg-slate-950 p-4 rounded-xl border border-slate-800/80 mb-6 leading-relaxed">
              {activeSection.summary}
            </p>

            {/* Section Rules & Code Examples */}
            <div className="space-y-6">
              {activeSection.rules.map((rule, idx) => (
                <div key={idx} className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-5 space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                    <h3 className="text-sm font-bold text-white">{rule.ruleTitle}</h3>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed pl-4 border-l-2 border-indigo-500/30">
                    {rule.description}
                  </p>

                  {/* Code Examples if provided */}
                  {rule.codeExample && (
                    <div className="mt-3 bg-slate-900 p-3 rounded-lg border border-slate-800 relative font-mono text-[11px]">
                      <div className="flex items-center justify-between mb-1.5 pb-1 border-b border-slate-800">
                        <span className="text-[10px] text-emerald-400 font-bold uppercase">
                          Exemplo de Implementação Correta:
                        </span>
                        <button
                          onClick={() => handleCopy(rule.codeExample!, `code_${idx}`)}
                          className="p-1 hover:bg-slate-800 rounded text-slate-400 hover:text-white"
                          title="Copiar Código"
                        >
                          {copiedIndex === `code_${idx}` ? (
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                      <pre className="text-indigo-300 overflow-x-auto whitespace-pre-wrap">
                        {rule.codeExample}
                      </pre>
                    </div>
                  )}

                  {rule.badExample && (
                    <div className="mt-2 bg-rose-950/20 p-3 rounded-lg border border-rose-900/40 font-mono text-[11px]">
                      <span className="text-[10px] text-rose-400 font-bold uppercase block mb-1">
                        Proibido (Anti-Pattern):
                      </span>
                      <pre className="text-rose-300/80 overflow-x-auto whitespace-pre-wrap">
                        {rule.badExample}
                      </pre>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Section 20: Signatures and Homologation Banner */}
          {activeSection.number === 20 && (
            <div className="bg-gradient-to-b from-slate-900 to-emerald-950/30 border border-emerald-500/30 rounded-2xl p-6 text-center">
              <Award className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-white mb-2">
                Termo Oficial de Homologação da Engenharia
              </h3>
              <p className="text-xs text-slate-300 max-w-2xl mx-auto mb-6">
                Aprovação unânime do Conselho Técnico do EducaFlow. A partir deste ato, nenhuma nova documentação estrutural é necessária, declarando aberta a fase de implementação incremental no Visual Studio Code, Supabase e GitHub.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
                {HOMOLOGATION_SIGNATORIES.map((sig, sIdx) => (
                  <div key={sIdx} className="bg-slate-950/80 p-3 rounded-xl border border-slate-800 text-xs">
                    <span className="text-slate-400 block font-mono text-[10px] uppercase">Signatário</span>
                    <span className="font-bold text-white block mb-1">{sig.role}</span>
                    <span className="inline-flex items-center gap-1 text-[10px] text-emerald-400 font-medium">
                      <Check className="w-3 h-3" /> {sig.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
