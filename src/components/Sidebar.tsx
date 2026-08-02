import React from 'react';
import { ActiveTabType } from '../types';
import { 
  Users, 
  Calendar, 
  Clock, 
  CheckSquare, 
  BarChart2, 
  Grid, 
  BookOpen,
  Award,
  Heart,
  Brain,
  Zap,
  MapPin,
  Box,
  GitBranch,
  ShieldCheck,
  Compass,
  GitCommit,
  Bot,
  FileText,
  Database,
  Palette,
  Terminal,
  Sparkles,
  Server,
  Layout,
  Code
} from 'lucide-react';

interface SidebarProps {
  activeTab: ActiveTabType;
  setActiveTab: (tab: ActiveTabType) => void;
  totalPainsCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, totalPainsCount }) => {
  const blueprintItems: { id: ActiveTabType; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'sprint_1_foundation', label: 'Sprint 01 — Foundation (Produção)', icon: <Zap className="w-4 h-4 text-emerald-400" />, badge: 'Live 100%' },
    { id: 'sprint_0_plan', label: 'Sprint 0 Implementation Plan v1.0', icon: <Terminal className="w-4 h-4 text-indigo-400" />, badge: 'Execução' },
    { id: 'engineering_constitution', label: 'Engineering Constitution v1.0', icon: <Award className="w-4 h-4 text-emerald-400" />, badge: 'Lei Suprema' },
    { id: 'internal_engineering_blueprint', label: 'Engineering Blueprint v1.0', icon: <Code className="w-4 h-4 text-emerald-400" />, badge: 'VS Code Plan' },
    { id: 'ui_ux_master_prototype', label: 'UI/UX Master Prototype v1.0', icon: <Sparkles className="w-4 h-4 text-amber-500" />, badge: 'UI/UX Master' },
    { id: 'qa_testing_cicd', label: 'QA, Testing & CI/CD v1.0', icon: <ShieldCheck className="w-4 h-4 text-emerald-500" />, badge: 'QA/DevOps' },
    { id: 'frontend_ui_architecture', label: 'Frontend & UI Screens Spec v1.0', icon: <Layout className="w-4 h-4 text-indigo-500" />, badge: 'Next.js/UI' },
    { id: 'backend_api_architecture', label: 'Backend & API Contract v1.0', icon: <Server className="w-4 h-4 text-emerald-500" />, badge: 'API Spec' },
    { id: 'aurora_ai_architecture', label: 'Aurora AI Architecture v1.0', icon: <Sparkles className="w-4 h-4 text-amber-500" />, badge: 'AI Engine' },
    { id: 'functional_spec_ddd', label: 'Functional Spec & DDD v1.0', icon: <Terminal className="w-4 h-4" />, badge: 'Spec' },
    { id: 'design_system', label: 'Design System v1.0', icon: <Palette className="w-4 h-4" />, badge: 'UI/UX' },
    { id: 'product_constitution', label: 'Constituição do Produto', icon: <Award className="w-4 h-4" />, badge: 'CPO' },
    { id: 'system_blueprint', label: 'System Blueprint (Arquitetura)', icon: <Database className="w-4 h-4" />, badge: 'Engenharia' },
    { id: 'mvp_blueprint', label: 'EducaFlow MVP Blueprint', icon: <FileText className="w-4 h-4" />, badge: 'V1.0' },
  ];

  const cxStrategyItems: { id: ActiveTabType; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'cx_customer_journey', label: 'Jornada do Cliente (CX)', icon: <Compass className="w-4 h-4" />, badge: '11 Etapas' },
    { id: 'user_flow_master', label: 'User Flow Master', icon: <GitCommit className="w-4 h-4" />, badge: 'Fluxos' },
    { id: 'ai_personality_manual', label: 'Manual da IA', icon: <Bot className="w-4 h-4" />, badge: 'Persona' },
  ];

  const architectureItems: { id: ActiveTabType; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'ecosystem_map', label: 'Mapa do Ecossistema', icon: <Box className="w-4 h-4" />, badge: '5 Áreas' },
    { id: 'ecosystem_tree', label: 'Árvore Hierárquica', icon: <GitBranch className="w-4 h-4" />, badge: 'Árvore' },
    { id: 'critical_analysis', label: 'Análise Crítica', icon: <ShieldCheck className="w-4 h-4" />, badge: 'Análise' },
  ];

  const mainUxItems: { id: ActiveTabType; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'journey_overview', label: 'Jornada Cognitiva', icon: <MapPin className="w-4 h-4" />, badge: 'Do Dia' },
    { id: 'smart_flows', label: 'Fluxos Inteligentes', icon: <Zap className="w-4 h-4" />, badge: '8 Missões' },
    { id: 'ux_psychology', label: 'Psicologia & Ergonomia', icon: <Brain className="w-4 h-4" />, badge: 'Pilares' },
  ];

  const researchItems: { id: ActiveTabType; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'research_intro', label: 'Visão UX Research', icon: <Users className="w-4 h-4" /> },
    { id: 'before', label: '1. Antes da Aula', icon: <Calendar className="w-4 h-4" /> },
    { id: 'during', label: '2. Durante a Aula', icon: <Clock className="w-4 h-4" /> },
    { id: 'after', label: '3. Depois da Aula', icon: <CheckSquare className="w-4 h-4" /> },
    { id: 'closing', label: '4. Fechamentos', icon: <BarChart2 className="w-4 h-4" /> },
    { id: 'year_round', label: '5. No Ano Letivo', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'pain_matrix', label: 'Matriz Geral de Dores', icon: <Grid className="w-4 h-4" />, badge: 'MVP' }
  ];

  return (
    <aside className="w-64 bg-slate-900 text-white flex flex-col h-full shrink-0 select-none border-r border-slate-800">
      {/* Brand Header */}
      <div className="p-5 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-indigo-500 rounded-lg flex items-center justify-center font-black text-xl text-white shadow-md shadow-indigo-500/30">
            E
          </div>
          <div>
            <h1 className="font-extrabold tracking-tight text-lg text-white leading-none">EducaFlow</h1>
            <p className="text-[10px] text-indigo-400 font-semibold tracking-wider uppercase mt-1">UX & Product Architecture</p>
          </div>
        </div>
        <p className="text-[11px] text-slate-400 mt-2.5 font-mono flex items-center gap-1">
          <Award className="w-3.5 h-3.5 text-indigo-400" />
          Ecossistema do Professor - EF1
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-4 overflow-y-auto">
        {/* Group Blueprint: Product Blueprint */}
        <div className="space-y-1">
          <div className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest px-3 mb-1.5 flex items-center gap-1">
            <FileText className="w-3 h-3 text-emerald-400" />
            <span>Product Blueprint</span>
          </div>

          {blueprintItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full text-left px-3 py-2 rounded-lg font-medium text-xs transition-all duration-150 flex items-center justify-between cursor-pointer ${
                  isActive
                    ? 'bg-emerald-500 text-slate-950 shadow-sm font-black'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2.5 truncate">
                  <span className={isActive ? 'text-slate-950' : 'text-slate-400'}>
                    {item.icon}
                  </span>
                  <span className="truncate">{item.label}</span>
                </div>
                {item.badge && (
                  <span className={`text-[9px] px-1.5 py-0.5 rounded font-extrabold uppercase tracking-wider shrink-0 ${
                    isActive 
                      ? 'bg-emerald-600 text-slate-950' 
                      : 'bg-slate-800 text-emerald-400'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Group CX: Strategy & AI Manual */}
        <div className="space-y-1 pt-2 border-t border-slate-800/80">
          <div className="text-[10px] font-bold text-amber-400 uppercase tracking-widest px-3 mb-1.5 flex items-center gap-1">
            <Compass className="w-3 h-3 text-amber-400" />
            <span>Estratégia de CX & IA</span>
          </div>

          {cxStrategyItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full text-left px-3 py-2 rounded-lg font-medium text-xs transition-all duration-150 flex items-center justify-between cursor-pointer ${
                  isActive
                    ? 'bg-amber-500 text-slate-950 shadow-sm font-black'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2.5 truncate">
                  <span className={isActive ? 'text-slate-950' : 'text-slate-400'}>
                    {item.icon}
                  </span>
                  <span className="truncate">{item.label}</span>
                </div>
                {item.badge && (
                  <span className={`text-[9px] px-1.5 py-0.5 rounded font-extrabold uppercase tracking-wider shrink-0 ${
                    isActive 
                      ? 'bg-amber-600 text-slate-950' 
                      : 'bg-slate-800 text-amber-400'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Group 0: Product Architecture */}
        <div className="space-y-1 pt-2 border-t border-slate-800/80">
          <div className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest px-3 mb-1.5 flex items-center gap-1">
            <Box className="w-3 h-3 text-indigo-400" />
            <span>Arquitetura de Produto</span>
          </div>

          {architectureItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full text-left px-3 py-2 rounded-lg font-medium text-xs transition-all duration-150 flex items-center justify-between cursor-pointer ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-sm font-bold'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2.5 truncate">
                  <span className={isActive ? 'text-white' : 'text-slate-400'}>
                    {item.icon}
                  </span>
                  <span className="truncate">{item.label}</span>
                </div>
                {item.badge && (
                  <span className={`text-[9px] px-1.5 py-0.5 rounded font-extrabold uppercase tracking-wider shrink-0 ${
                    isActive 
                      ? 'bg-indigo-700 text-indigo-100' 
                      : 'bg-slate-800 text-indigo-300'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Group 1: UX Design & Smart Flows */}
        <div className="space-y-1 pt-2 border-t border-slate-800/80">
          <div className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest px-3 mb-1.5 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-indigo-400" />
            <span>Design de Experiência</span>
          </div>

          {mainUxItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full text-left px-3 py-2 rounded-lg font-medium text-xs transition-all duration-150 flex items-center justify-between cursor-pointer ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-sm font-bold'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2.5 truncate">
                  <span className={isActive ? 'text-white' : 'text-slate-400'}>
                    {item.icon}
                  </span>
                  <span className="truncate">{item.label}</span>
                </div>
                {item.badge && (
                  <span className={`text-[9px] px-1.5 py-0.5 rounded font-extrabold uppercase tracking-wider shrink-0 ${
                    isActive 
                      ? 'bg-indigo-700 text-indigo-100' 
                      : 'bg-slate-800 text-indigo-300'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Group 2: Research & Pain Mapping */}
        <div className="space-y-1 pt-2 border-t border-slate-800/80">
          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-3 mb-1.5">
            Mapa de Pesquisa de Dores
          </div>

          {researchItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full text-left px-3 py-2 rounded-lg font-medium text-xs transition-all duration-150 flex items-center justify-between cursor-pointer ${
                  isActive
                    ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/40 font-semibold'
                    : 'text-slate-400 hover:bg-slate-800/80 hover:text-slate-200'
                }`}
              >
                <div className="flex items-center gap-2.5 truncate">
                  <span className={isActive ? 'text-indigo-400' : 'text-slate-400'}>
                    {item.icon}
                  </span>
                  <span className="truncate">{item.label}</span>
                </div>
                {item.badge && (
                  <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wider shrink-0 ${
                    isActive 
                      ? 'bg-indigo-500/30 text-indigo-200' 
                      : 'bg-slate-800 text-slate-400'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Status Footer */}
      <div className="p-3.5 border-t border-slate-800 bg-slate-950/60">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/30 flex items-center justify-center font-bold text-xs shrink-0">
            <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
          </div>
          <div className="truncate">
            <p className="text-[11px] font-bold text-slate-200 truncate">Arquitetura de Produto</p>
            <p className="text-[10px] text-slate-400 font-medium truncate">
              5 Áreas • 10 Módulos
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
};
