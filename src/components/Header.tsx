import React from 'react';
import { ActiveTabType } from '../types';
import { Sparkles, Brain, LogOut, UserCheck } from 'lucide-react';
import { useAuthStore } from '../stores/useAuthStore';

interface HeaderProps {
  activeTab: ActiveTabType;
  onOpenMatrix: () => void;
}

const TAB_TITLES: Record<ActiveTabType, { title: string; subtitle: string }> = {
  sprint_1_foundation: {
    title: 'EducaFlow Sprint 01 — Foundation & Technical Infrastructure',
    subtitle: 'Cockpit Técnico ao Vivo — Validação Integrada dos 10 Subsistemas (Next.js 15, React 19, Supabase, Dexie IndexedDB, Zustand, TanStack Query, PWA, Sync Engine & Aurora AI Proxy)'
  },
  sprint_0_plan: {
    title: 'EducaFlow Sprint 0 Implementation Plan & Repository Bootstrap v1.0',
    subtitle: 'Guia Operacional Definitivo de Inicialização do Repositório — Roteiro de 5 Dias, Árvore de Pastas, Dependências, Comandos CLI, Checklists Supabase/GitHub, Arquivos Iniciais e Certificado de Prontidão'
  },
  engineering_constitution: {
    title: 'EducaFlow Engineering Constitution & Development Standards v1.0',
    subtitle: 'Lei Suprema da Engenharia do EducaFlow — Manual Técnico Definitivo em 20 Seções (Filosofia, Arquitetura, Convenções, React, TypeScript, Supabase, Deno Edge Functions, IA Aurora, CI/CD, Acessibilidade e Segurança)'
  },
  internal_engineering_blueprint: {
    title: 'EducaFlow Internal Engineering Blueprint v1.0',
    subtitle: 'Guia Definitivo de Implementação no Visual Studio Code — Arquitetura de Software, Fluxos E2E (React, Dexie.js, Supabase, Deno Edge Functions, IA Aurora), Estrutura de Pastas, Mapeamento de Jornadas Técnicas e Plano de Execução'
  },
  ui_ux_master_prototype: {
    title: 'EducaFlow Complete UI/UX Master Prototype & Screen Specification v1.0',
    subtitle: 'Especificação Técnica Definitiva das 10 Telas Mestre do MVP em 13 Dimensões: Layout, Componentes, Estados, Microinterações, HCI, Copywriting, Responsividade, WCAG 2.2 AA, Regras, Aurora AI, Performance e Sprints VS Code'
  },
  qa_testing_cicd: {
    title: 'EducaFlow Quality Assurance, Testing & CI/CD Blueprint v1.0',
    subtitle: 'Estratégia Completa de Testes Automatizados (Unitários, Integração, E2E, IA Aurora, Offline-First, WCAG 2.2 AA, RLS e Performance) com Pipeline CI/CD em 5 Estágios'
  },
  frontend_ui_architecture: {
    title: 'EducaFlow Frontend Architecture & UI Screens Specification v1.0',
    subtitle: 'Arquitetura Next.js/React, Gerenciamento de Estado, PWA Offline-First, Dexie.js, Design System, e Especificação das 10 Telas do MVP'
  },
  backend_api_architecture: {
    title: 'EducaFlow Backend Architecture & API Contract v1.0',
    subtitle: 'Schema PostgreSQL/Supabase, Políticas Row Level Security (RLS), Contratos REST/Edge Functions, Engine Offline-First e Conformidade LGPD'
  },
  aurora_ai_architecture: {
    title: 'Aurora AI Architecture v1.0 — Arquitetura Cognitiva & Prompt Engineering Bible',
    subtitle: 'Níveis de Autonomia (Human-in-the-Loop), Biblioteca Oficial de Prompts Mestres, RAG Hybrid Search, AI Safety & Evaluation Framework'
  },
  functional_spec_ddd: {
    title: 'EducaFlow Functional Specification & Domain Model v1.0 (DDD)',
    subtitle: 'Especificação técnica detalhada dos 7 módulos MVP (17 aspectos), Modelagem DDD por Bounded Context e Matriz de Dependências para Supabase'
  },
  design_system: {
    title: 'EducaFlow Design System v1.0 — Guia de Identidade Visual & UX',
    subtitle: 'Fonte única da verdade: Filosofia da Marca, Paleta Semântica, Tipografia, Grid, Biblioteca de Componentes, Estados da UI e Acessibilidade'
  },
  product_constitution: {
    title: 'EducaFlow Product Constitution — Constituição Oficial & Visão do Produto',
    subtitle: 'Diretrizes supremas do CPO: Missão, Visão 10 anos, 10 Princípios de Ouro, Práticas Proibidas, Matriz de Aprovação e Manifesto'
  },
  system_blueprint: {
    title: 'EducaFlow System Blueprint — Arquitetura de Sistema & Banco Lógico',
    subtitle: 'Mapeamento detalhado das 10 entidades centrais, guardrails da IA, fluxo global de dados e auditoria técnica para 5 anos de escalabilidade'
  },
  mvp_blueprint: {
    title: 'EducaFlow MVP Blueprint — Plano Executivo de Desenvolvimento V1.0',
    subtitle: 'Especificação técnica de funcionalidades, esforço estimado, matriz de dependências, planejamento de Sprints e Roadmap V1.0 a V3.0'
  },
  cx_customer_journey: {
    title: 'Jornada do Cliente EducaFlow — As 11 Etapas da Experiência',
    subtitle: 'Da descoberta ao uso diário, renovação e indicação orgânica entre professores do Ensino Fundamental I'
  },
  user_flow_master: {
    title: 'User Flow Master — Mapeamento Completo de Fluxos do Professor',
    subtitle: 'Navegação sem atrito do login até a conclusão das missões diárias com atalhos inteligentes da IA'
  },
  ai_personality_manual: {
    title: 'Manual de Personalidade da IA EducaFlow — Diretrizes de Conversação',
    subtitle: 'Colega de trabalho experiente, organizada e acolhedora: tom de voz, princípios pedagógicos, limites e matriz de decisão'
  },
  ecosystem_map: {
    title: 'Mapa do Ecossistema EducaFlow — As 5 Áreas de Experiência',
    subtitle: 'Estruturação do produto em 5 grandes áreas e 10 módulos funcionais sem excesso de menus'
  },
  ecosystem_tree: {
    title: 'Árvore Hierárquica da Arquitetura Funcional do EducaFlow',
    subtitle: 'Visão sistêmica completa: Plataforma → Áreas de Experiência → Módulos → Sub-funcionalidades'
  },
  critical_analysis: {
    title: 'Análise Crítica de Arquitetura de Produto',
    subtitle: 'Validação da estrutura: redundâncias, fusões, geração de valor e curva de aprendizado inferior a 5 minutos'
  },
  journey_overview: {
    title: 'Jornada Cognitiva do Professor (Do Despertar ao Descanso)',
    subtitle: 'Análise detalhada do estado mental, emocional e necessidades do professor em 4 momentos do seu dia'
  },
  smart_flows: {
    title: 'Fluxos Inteligentes — Substituindo Menus por Missões Naturais',
    subtitle: 'Proposta de 8 missões contínuas que levam o professor ao resultado com o menor número de cliques'
  },
  ux_psychology: {
    title: 'Psicologia Cognitiva & Ergonomia Digital no EducaFlow',
    subtitle: 'Princípios de design desenhados para reduzir ansiedade, eliminar atrito e respeitar o tempo do professor'
  },
  research_intro: {
    title: 'Mapa das Dores do Professor — Pesquisa de UX Research',
    subtitle: 'Estudo em profundidade sobre a rotina real de docentes do Ensino Fundamental I (1º ao 5º ano)'
  },
  before: {
    title: 'Etapa 1: Antes da Aula — Preparação & Planejamento',
    subtitle: 'Planejamento semanal de aulas, buscas por materiais e formatação de atividades com alinhamento BNCC'
  },
  during: {
    title: 'Etapa 2: Durante a Aula — Regência & Gestão de Sala',
    subtitle: 'Chamada de frequência, acompanhamento de alfabetização/hipótese de escrita e controle de tempo'
  },
  after: {
    title: 'Etapa 3: Depois da Aula — Diário & Correções em Casa',
    subtitle: 'Preenchimento do diário de classe oficial, vinculação de códigos BNCC e correção manual de cadernos'
  },
  closing: {
    title: 'Etapa 4: Fechamentos Bimestrais & Avaliações',
    subtitle: 'Redação de pareceres pedagógicos descritivos individuais, avaliações e relatórios do conselho'
  },
  year_round: {
    title: 'Etapa 5: Durante o Ano Letivo — Comunicação & Gestão',
    subtitle: 'Mensagens de pais de alunos, reuniões de pais e acompanhamento da cobertura do currículo anual'
  },
  pain_matrix: {
    title: 'Matriz Classificatória das Dores & Priorização de MVP',
    subtitle: 'Classificação por Impacto, Frequência de Ocorrência, Valor Percebido em Assinatura e Prioridade no MVP'
  }
};

export const Header: React.FC<HeaderProps> = ({ activeTab, onOpenMatrix }) => {
  const currentInfo = TAB_TITLES[activeTab] || TAB_TITLES.journey_overview;
  const { user, logout } = useAuthStore();

  const handleLogout = async () => {
    await logout();
    if (typeof window !== 'undefined') {
      window.location.href = '/login';
    }
  };

  return (
    <header className="h-20 bg-white border-b border-slate-200 px-8 flex items-center justify-between shrink-0 shadow-xs">
      <div>
        <h2 className="text-xl font-bold text-slate-800 tracking-tight flex items-center gap-2">
          {currentInfo.title}
        </h2>
        <p className="text-slate-500 text-xs mt-0.5 font-medium flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
          <span>{currentInfo.subtitle}</span>
        </p>
      </div>

      <div className="flex items-center gap-4">
        {user && (
          <div className="flex items-center gap-3 bg-slate-50 border border-slate-200/80 px-3 py-1.5 rounded-xl">
            <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-xs shrink-0 overflow-hidden shadow-xs">
              {user.avatarUrl ? (
                <img src={user.avatarUrl} alt={user.name} className="w-full h-full object-cover" />
              ) : (
                <span>{user.name.slice(0, 2).toUpperCase()}</span>
              )}
            </div>
            <div className="hidden md:block text-left">
              <p className="text-xs font-bold text-slate-800 leading-tight">{user.name}</p>
              <p className="text-[10px] text-slate-500 font-medium leading-tight">{user.schoolName}</p>
            </div>
            <button
              onClick={handleLogout}
              title="Encerrar Sessão"
              className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors ml-1"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        )}

        <div className="hidden xl:flex items-center gap-2 px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-bold rounded-full border border-indigo-200">
          <Brain className="w-3.5 h-3.5 text-indigo-600" />
          <span>DESIGN DE EXPERIÊNCIA & ERGONOMIA COGNITIVA</span>
        </div>
      </div>
    </header>
  );
};

