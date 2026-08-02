import React, { useState } from 'react';
import { ActiveTabType, PainStageId } from './types';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Sprint0PlanView } from './components/Sprint0PlanView';
import { BackendApiArchitectureView } from './components/BackendApiArchitectureView';
import { FrontendUiArchitectureView } from './components/FrontendUiArchitectureView';
import { QaTestingCicdView } from './components/QaTestingCicdView';
import { UiUxMasterPrototypeView } from './components/UiUxMasterPrototypeView';
import { InternalEngineeringBlueprintView } from './components/InternalEngineeringBlueprintView';
import { EngineeringConstitutionView } from './components/EngineeringConstitutionView';
import { AuroraAiArchitectureView } from './components/AuroraAiArchitectureView';
import { CustomerJourneyView } from './components/CustomerJourneyView';
import { UserFlowMasterView } from './components/UserFlowMasterView';
import { AIPersonalityManualView } from './components/AIPersonalityManualView';
import { MvpBlueprintView } from './components/MvpBlueprintView';
import { SystemBlueprintView } from './components/SystemBlueprintView';
import { ProductConstitutionView } from './components/ProductConstitutionView';
import { DesignSystemView } from './components/DesignSystemView';
import { FunctionalSpecDddView } from './components/FunctionalSpecDddView';
import { EcosystemMapView } from './components/EcosystemMapView';
import { EcosystemTreeView } from './components/EcosystemTreeView';
import { CriticalAnalysisView } from './components/CriticalAnalysisView';
import { TeacherJourneyView } from './components/TeacherJourneyView';
import { SmartFlowsView } from './components/SmartFlowsView';
import { UxPsychologyView } from './components/UxPsychologyView';
import { ResearchIntroView } from './components/ResearchIntroView';
import { PainMapStageView } from './components/PainMapStageView';
import { PainMatrixView } from './components/PainMatrixView';
import { PAIN_POINTS } from './data/painsData';
import TechnicalValidationPage from './app/page';
import { AppProviders } from './providers/AppProviders';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTabType>('sprint_1_foundation');

  const isStageTab = ['before', 'during', 'after', 'closing', 'year_round'].includes(activeTab);

  return (
    <AppProviders>
      <div className="w-full h-screen bg-slate-50 flex overflow-hidden font-sans text-slate-900 select-none antialiased">
        {/* Sidebar Navigation */}
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          totalPainsCount={PAIN_POINTS.length}
        />

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col h-full overflow-hidden bg-slate-50">
          {/* Top Header */}
          <Header
            activeTab={activeTab}
            onOpenMatrix={() => setActiveTab('pain_matrix')}
          />

          {/* Dynamic View Body */}
          <section className="flex-1 overflow-y-auto relative">
            {activeTab === 'sprint_1_foundation' && <TechnicalValidationPage />}

            {activeTab === 'sprint_0_plan' && <Sprint0PlanView />}

          {activeTab === 'engineering_constitution' && <EngineeringConstitutionView />}

          {activeTab === 'internal_engineering_blueprint' && <InternalEngineeringBlueprintView />}

          {activeTab === 'ui_ux_master_prototype' && <UiUxMasterPrototypeView />}

          {activeTab === 'qa_testing_cicd' && <QaTestingCicdView />}

          {activeTab === 'frontend_ui_architecture' && <FrontendUiArchitectureView />}

          {activeTab === 'backend_api_architecture' && <BackendApiArchitectureView />}

          {activeTab === 'aurora_ai_architecture' && <AuroraAiArchitectureView />}

          {activeTab === 'functional_spec_ddd' && <FunctionalSpecDddView />}

          {activeTab === 'design_system' && <DesignSystemView />}

          {activeTab === 'product_constitution' && <ProductConstitutionView />}

          {activeTab === 'system_blueprint' && <SystemBlueprintView />}

          {activeTab === 'mvp_blueprint' && <MvpBlueprintView />}

          {activeTab === 'cx_customer_journey' && <CustomerJourneyView />}

          {activeTab === 'user_flow_master' && <UserFlowMasterView />}

          {activeTab === 'ai_personality_manual' && <AIPersonalityManualView />}

          {activeTab === 'ecosystem_map' && <EcosystemMapView />}

          {activeTab === 'ecosystem_tree' && <EcosystemTreeView />}

          {activeTab === 'critical_analysis' && <CriticalAnalysisView />}

          {activeTab === 'journey_overview' && <TeacherJourneyView />}

          {activeTab === 'smart_flows' && <SmartFlowsView />}

          {activeTab === 'ux_psychology' && <UxPsychologyView />}

          {activeTab === 'research_intro' && (
            <ResearchIntroView onNavigateStage={(stage) => setActiveTab(stage)} />
          )}

          {isStageTab && (
            <PainMapStageView
              stageId={activeTab as PainStageId}
              onNavigateMatrix={() => setActiveTab('pain_matrix')}
            />
          )}

          {activeTab === 'pain_matrix' && <PainMatrixView />}
        </section>

        {/* Footer Branding */}
        <footer className="h-10 bg-white border-t border-slate-200 px-8 flex items-center justify-between text-[11px] text-slate-400 font-medium shrink-0">
          <div>© 2026 EDUCAFLOW - DESIGN DE EXPERIÊNCIA E FLUXOS INTELIGENTES (EF1)</div>
          <div className="flex items-center gap-4 font-mono text-[10px]">
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              METODOLOGIA: ERGONOMIA COGNITIVA DOCENTE
            </span>
            <span className="text-indigo-600 font-bold">8 MISSÕES SEM MENUS</span>
          </div>
        </footer>
      </main>
    </div>
  </AppProviders>
  );
}

