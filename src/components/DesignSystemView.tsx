import { useState } from 'react';
import { 
  BRAND_VISUAL_PHILOSOPHY, 
  DESIGN_CONCEPT, 
  COLOR_TOKENS, 
  TYPOGRAPHY_TOKENS, 
  SPACING_SYSTEM, 
  GRID_SYSTEM, 
  COMPONENT_LIBRARY, 
  ICON_SYSTEM_RULES, 
  UI_STATES, 
  MICROINTERACTION_RULES, 
  ACCESSIBILITY_RULES_WCAG, 
  DESIGN_CONSISTENCY_RULES, 
  HEAD_OF_DESIGN_VERDICT 
} from '../data/designSystemData';
import { 
  Palette, 
  Type, 
  Grid, 
  Layers, 
  Sparkles, 
  CheckCircle2, 
  Eye, 
  ShieldCheck, 
  Award, 
  Copy, 
  Check, 
  Bot, 
  WifiOff, 
  AlertTriangle, 
  FolderPlus, 
  RefreshCw, 
  Maximize2, 
  MousePointer, 
  Smartphone, 
  Monitor, 
  Tablet, 
  Lock, 
  Sliders, 
  Zap, 
  Info,
  Clock
} from 'lucide-react';

export const DesignSystemView = () => {
  const [activeTab, setActiveTab] = useState<'philosophy' | 'colors' | 'typography' | 'components' | 'uistates' | 'accessibility' | 'verdict'>('philosophy');
  const [copiedHex, setCopiedHex] = useState<string | null>(null);
  const [simulatedState, setSimulatedState] = useState<string>('1. Estado de Carregamento (Loading)');
  const [selectedColorCat, setSelectedColorCat] = useState<string>('Todas');

  const handleCopyHex = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 2000);
  };

  const filteredColors = selectedColorCat === 'Todas' 
    ? COLOR_TOKENS 
    : COLOR_TOKENS.filter(c => c.category === selectedColorCat);

  return (
    <div className="p-8 space-y-6 overflow-y-auto h-full bg-slate-50">
      {/* Top Banner - Head of Design Header */}
      <div className="bg-slate-900 text-white rounded-xl p-6 border border-slate-800 shadow-xl relative overflow-hidden">
        <div className="space-y-2 relative z-10 max-w-4xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 bg-amber-500 text-slate-950 font-black text-xs rounded-full uppercase tracking-widest inline-block">
              Head of Design & UX Director
            </span>
            <span className="px-3 py-1 bg-indigo-500/30 text-indigo-300 font-bold text-xs rounded-full border border-indigo-500/30 uppercase tracking-widest inline-block">
              Design System v1.0 Oficial
            </span>
          </div>
          <h3 className="text-2xl font-black text-white tracking-tight">
            EducaFlow Design System v1.0 — Guia Supremo de Identidade Visual
          </h3>
          <p className="text-slate-300 text-sm leading-relaxed">
            A única fonte da verdade para a linguagem visual, paleta semântica, tipografia, grid, biblioteca de componentes, microinterações e regras de acessibilidade do EducaFlow.
          </p>
        </div>
      </div>

      {/* Main Sub-Navigation Bar */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab('philosophy')}
          className={`px-4 py-2.5 rounded-lg text-xs font-extrabold transition-all cursor-pointer flex items-center gap-2 shrink-0 ${
            activeTab === 'philosophy'
              ? 'bg-amber-500 text-slate-950 shadow-xs font-black'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Sparkles className="w-4 h-4 text-slate-950" />
          <span>1. Filosofia & Conceito</span>
        </button>

        <button
          onClick={() => setActiveTab('colors')}
          className={`px-4 py-2.5 rounded-lg text-xs font-extrabold transition-all cursor-pointer flex items-center gap-2 shrink-0 ${
            activeTab === 'colors'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Palette className="w-4 h-4" />
          <span>2. Paleta Oficial & Tokens</span>
        </button>

        <button
          onClick={() => setActiveTab('typography')}
          className={`px-4 py-2.5 rounded-lg text-xs font-extrabold transition-all cursor-pointer flex items-center gap-2 shrink-0 ${
            activeTab === 'typography'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Type className="w-4 h-4" />
          <span>3. Tipografia, Espaço & Grid</span>
        </button>

        <button
          onClick={() => setActiveTab('components')}
          className={`px-4 py-2.5 rounded-lg text-xs font-extrabold transition-all cursor-pointer flex items-center gap-2 shrink-0 ${
            activeTab === 'components'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>4. Biblioteca de Componentes</span>
        </button>

        <button
          onClick={() => setActiveTab('uistates')}
          className={`px-4 py-2.5 rounded-lg text-xs font-extrabold transition-all cursor-pointer flex items-center gap-2 shrink-0 ${
            activeTab === 'uistates'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Zap className="w-4 h-4 text-amber-400" />
          <span>5. Estados UI & Microinterações</span>
        </button>

        <button
          onClick={() => setActiveTab('accessibility')}
          className={`px-4 py-2.5 rounded-lg text-xs font-extrabold transition-all cursor-pointer flex items-center gap-2 shrink-0 ${
            activeTab === 'accessibility'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Eye className="w-4 h-4" />
          <span>6. Acessibilidade & Consistência</span>
        </button>

        <button
          onClick={() => setActiveTab('verdict')}
          className={`px-4 py-2.5 rounded-lg text-xs font-extrabold transition-all cursor-pointer flex items-center gap-2 shrink-0 ${
            activeTab === 'verdict'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Award className="w-4 h-4 text-emerald-400" />
          <span>7. Parecer Técnico (10 Anos)</span>
        </button>
      </div>

      {/* TAB 1: VISUAL PHILOSOPHY & CONCEPT */}
      {activeTab === 'philosophy' && (
        <div className="space-y-6">
          {/* Concept Header */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center gap-2 text-xs font-black text-indigo-600 uppercase tracking-wider">
              <Sparkles className="w-5 h-5 text-indigo-600" />
              <span>Conceito Visual Oficial de Design</span>
            </div>
            <h3 className="text-xl font-black text-slate-900">
              Estilo: {DESIGN_CONCEPT.styleName}
            </h3>
            <p className="text-xs text-slate-700 leading-relaxed font-medium bg-slate-50 p-4 rounded-xl border border-slate-200">
              <strong>Justificativa do Head de Design:</strong> {DESIGN_CONCEPT.whyChosen}
            </p>

            <div className="pt-2 space-y-2">
              <strong className="text-xs font-extrabold text-slate-900 uppercase block">Atributos-Chave Inegociáveis:</strong>
              <div className="flex flex-wrap gap-2">
                {DESIGN_CONCEPT.keyAttributes.map((attr, idx) => (
                  <span key={idx} className="px-3 py-1.5 bg-indigo-50 text-indigo-900 text-xs font-bold rounded-lg border border-indigo-100">
                    ✔ {attr}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Philosophy Grid */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
            <h4 className="text-sm font-black text-slate-900 uppercase tracking-wider">
              Os 7 Pilares de Sentimento Emocional da Marca
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {BRAND_VISUAL_PHILOSOPHY.map((item, idx) => (
                <div key={idx} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                  <span className="px-2.5 py-0.5 bg-amber-100 text-amber-900 text-[10px] font-black rounded uppercase">
                    Pilar #{idx + 1}
                  </span>
                  <h5 className="text-sm font-black text-slate-900">{item.concept}</h5>
                  <p className="text-xs text-slate-600 font-bold">{item.feeling}</p>
                  <div className="p-2.5 bg-white rounded-lg border border-slate-200 text-[11px] text-slate-700 font-medium">
                    <strong className="text-slate-900 font-bold block mb-0.5">Execução Visual:</strong>
                    {item.visualExecution}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: OFFICIAL COLOR PALETTE */}
      {activeTab === 'colors' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-mono font-bold text-indigo-600 uppercase tracking-widest block">
                  Tokens de Cor
                </span>
                <h4 className="text-lg font-black text-slate-900">
                  Paleta de Cores Semântica & Contraste WCAG AA/AAA
                </h4>
              </div>

              {/* Category Filter */}
              <div className="flex items-center gap-1 overflow-x-auto">
                {['Todas', 'Primária', 'Secundária', 'Feedback / Estado', 'Superfície & Neutros'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedColorCat(cat)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      selectedColorCat === cat
                        ? 'bg-slate-900 text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredColors.map((color, idx) => (
                <div key={idx} className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs space-y-3 p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-8 h-8 rounded-lg border border-slate-300 shadow-xs shrink-0" 
                        style={{ backgroundColor: color.hex }}
                      />
                      <div>
                        <h5 className="text-xs font-black text-slate-900">{color.name}</h5>
                        <span className="text-[10px] font-mono text-slate-500 font-bold block">{color.role}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleCopyHex(color.hex)}
                      className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-mono text-[10px] font-bold rounded-md flex items-center gap-1 cursor-pointer transition-all shrink-0"
                    >
                      {copiedHex === color.hex ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-600" />
                          <span>Copiado!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3 text-slate-500" />
                          <span>{color.hex}</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 space-y-1 text-xs">
                    <div className="flex items-center justify-between text-[10px] font-mono font-bold text-indigo-700">
                      <span>CONTRASTE WCAG:</span>
                      <span>{color.contrastRatio}</span>
                    </div>
                    <p className="text-[11px] text-slate-600 font-medium leading-tight">{color.usageGuide}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: TYPOGRAPHY, SPACING & GRID */}
      {activeTab === 'typography' && (
        <div className="space-y-6">
          {/* Typography Scale */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
            <h4 className="text-sm font-black text-slate-900 uppercase tracking-wider">
              Escala Tipográfica Oficial (Plus Jakarta Sans & JetBrains Mono)
            </h4>

            <div className="space-y-3">
              {TYPOGRAPHY_TOKENS.map((token, idx) => (
                <div key={idx} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-2 border-b border-slate-200">
                    <span className="text-xs font-black text-indigo-600 uppercase tracking-wider">{token.level}</span>
                    <div className="flex items-center gap-3 text-[10px] font-mono text-slate-600 font-bold">
                      <span>Tamanho: {token.sizePx}</span>
                      <span>Peso: {token.weight}</span>
                      <span>Altura Linha: {token.lineHeight}</span>
                    </div>
                  </div>

                  {/* Live Specimen Preview */}
                  <div className="pt-1">
                    <p 
                      style={{ 
                        fontSize: token.sizePx, 
                        fontWeight: token.weight.includes('800') ? 800 : token.weight.includes('700') ? 700 : 500,
                        lineHeight: token.lineHeight,
                        fontFamily: token.fontFamily.includes('Mono') ? 'ui-monospace, monospace' : 'inherit'
                      }}
                      className="text-slate-900 truncate"
                    >
                      EducaFlow — Devolvendo o tempo e a paixão de ensinar.
                    </p>
                  </div>

                  <p className="text-[11px] text-slate-500 font-medium"><strong>Uso Recomendado:</strong> {token.useCase}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Spacing & Grid Specs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Spacing */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
              <h4 className="text-sm font-black text-slate-900 uppercase tracking-wider">
                Sistema de Espaçamento (Escala 4px)
              </h4>

              <div className="space-y-2">
                {SPACING_SYSTEM.scale.map((s, idx) => (
                  <div key={idx} className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2 font-mono font-bold">
                      <span className="px-2 py-0.5 bg-indigo-100 text-indigo-800 rounded">{s.token}</span>
                      <span className="text-slate-900">{s.px}</span>
                    </div>
                    <span className="text-slate-600 font-medium text-[11px]">{s.useCase}</span>
                  </div>
                ))}
              </div>

              <div className="p-3 bg-amber-50 rounded-lg border border-amber-200 text-xs text-amber-950 font-medium">
                <strong>Regra de Ouro:</strong> {SPACING_SYSTEM.goldenRule}
              </div>
            </div>

            {/* Grid */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
              <h4 className="text-sm font-black text-slate-900 uppercase tracking-wider">
                Sistema de Grid Responsivo
              </h4>

              <div className="space-y-3 text-xs">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                  <div className="flex items-center gap-2 text-indigo-700 font-black">
                    <Monitor className="w-4 h-4" />
                    <span>Desktop ({GRID_SYSTEM.desktop.breakpoint})</span>
                  </div>
                  <p className="text-slate-600 font-medium">12 Colunas • Gutter {GRID_SYSTEM.desktop.gutterPx}px • Margin {GRID_SYSTEM.desktop.marginPx}px • Sidebar fixa de {GRID_SYSTEM.desktop.sidebarWidthPx}px.</p>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                  <div className="flex items-center gap-2 text-indigo-700 font-black">
                    <Tablet className="w-4 h-4" />
                    <span>Tablet ({GRID_SYSTEM.tablet.breakpoint})</span>
                  </div>
                  <p className="text-slate-600 font-medium">8 Colunas • Gutter {GRID_SYSTEM.tablet.gutterPx}px • Margin {GRID_SYSTEM.tablet.marginPx}px • {GRID_SYSTEM.tablet.sidebarBehavior}.</p>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                  <div className="flex items-center gap-2 text-indigo-700 font-black">
                    <Smartphone className="w-4 h-4" />
                    <span>Mobile ({GRID_SYSTEM.mobile.breakpoint})</span>
                  </div>
                  <p className="text-slate-600 font-medium">4 Colunas • Gutter {GRID_SYSTEM.mobile.gutterPx}px • Margin {GRID_SYSTEM.mobile.marginPx}px • {GRID_SYSTEM.mobile.sidebarBehavior}. Touch target mínimo de 44px.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: COMPONENT LIBRARY */}
      {activeTab === 'components' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
            <h4 className="text-sm font-black text-slate-900 uppercase tracking-wider">
              Biblioteca Oficial de Componentes (15 Componentes)
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {COMPONENT_LIBRARY.map((comp, idx) => (
                <div key={idx} className="p-5 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                    <h5 className="text-xs font-black text-slate-900">{comp.name}</h5>
                    <span className="px-2 py-0.5 bg-indigo-100 text-indigo-800 text-[9px] font-bold rounded uppercase">
                      {comp.category}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 font-medium">{comp.description}</p>

                  <div className="space-y-1.5 text-xs">
                    <div className="text-[11px] font-bold text-slate-800">Variantes Suportadas:</div>
                    <div className="flex flex-wrap gap-1">
                      {comp.variants.map((v, i) => (
                        <span key={i} className="px-2 py-0.5 bg-white border border-slate-200 rounded text-[10px] text-slate-700 font-medium">
                          {v}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="p-2.5 bg-white rounded-lg border border-slate-200 text-[11px] text-slate-700 space-y-1">
                    <strong className="text-indigo-900 block font-bold text-[10px] uppercase">Regras de Acessibilidade:</strong>
                    <p className="font-medium leading-snug">{comp.accessibilityRules}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: UI STATES & MICROINTERACTIONS */}
      {activeTab === 'uistates' && (
        <div className="space-y-6">
          {/* UI States Simulator */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h4 className="text-sm font-black text-slate-900 uppercase tracking-wider">
                Simulador dos 6 Estados Oficiais da Interface
              </h4>

              <div className="flex items-center gap-1 overflow-x-auto">
                {UI_STATES.map((state) => (
                  <button
                    key={state.stateName}
                    onClick={() => setSimulatedState(state.stateName)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      simulatedState === state.stateName
                        ? 'bg-slate-900 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {state.stateName.split('.')[0]}
                  </button>
                ))}
              </div>
            </div>

            {/* Selected State Active Box */}
            {(() => {
              const activeStateObj = UI_STATES.find(s => s.stateName === simulatedState) || UI_STATES[0];

              return (
                <div className="p-6 bg-slate-900 text-white rounded-xl border border-slate-800 space-y-4 shadow-md">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <span className="text-xs font-mono font-black text-amber-400 uppercase tracking-widest">
                      {activeStateObj.stateName}
                    </span>
                    <span className="px-2.5 py-0.5 bg-slate-800 text-slate-300 font-mono text-[10px] font-bold rounded">
                      Gatilho: {activeStateObj.visualTrigger}
                    </span>
                  </div>

                  {/* Visual Specimen Box */}
                  <div className="p-6 bg-white text-slate-900 rounded-xl border border-slate-200 space-y-3">
                    <span className="text-[10px] font-mono font-bold text-slate-400 uppercase block">
                      Visualização ao Vivo na Tela do Professor:
                    </span>

                    {activeStateObj.stateName.includes('Loading') && (
                      <div className="space-y-3 animate-pulse">
                        <div className="h-4 bg-slate-200 rounded w-1/3"></div>
                        <div className="h-10 bg-slate-100 rounded w-full"></div>
                        <div className="h-10 bg-slate-100 rounded w-2/3"></div>
                      </div>
                    )}

                    {activeStateObj.stateName.includes('Offline') && (
                      <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg flex items-center gap-3 text-amber-950 text-xs font-medium">
                        <WifiOff className="w-5 h-5 text-amber-600 shrink-0" />
                        <span>{activeStateObj.microcopyPattern}</span>
                      </div>
                    )}

                    {activeStateObj.stateName.includes('Erro') && (
                      <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl space-y-2 text-rose-950 text-xs">
                        <div className="flex items-center gap-2 font-bold text-rose-800">
                          <AlertTriangle className="w-4 h-4" />
                          <span>Atenção: Falha Temporária</span>
                        </div>
                        <p>{activeStateObj.microcopyPattern}</p>
                        <button className="px-3 py-1.5 bg-rose-600 text-white font-bold rounded-lg text-xs cursor-pointer">
                          Tentar Novamente
                        </button>
                      </div>
                    )}

                    {activeStateObj.stateName.includes('Vazio') && (
                      <div className="py-6 text-center space-y-3">
                        <FolderPlus className="w-10 h-10 text-slate-300 mx-auto" />
                        <p className="text-xs text-slate-600 font-medium max-w-sm mx-auto">{activeStateObj.microcopyPattern}</p>
                        <button className="px-4 py-2 bg-indigo-600 text-white font-bold rounded-lg text-xs cursor-pointer inline-block">
                          + Criar Roteiro
                        </button>
                      </div>
                    )}

                    {activeStateObj.stateName.includes('Sucesso') && (
                      <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg flex items-center gap-3 text-emerald-950 text-xs font-medium">
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                        <span>{activeStateObj.microcopyPattern}</span>
                      </div>
                    )}

                    {activeStateObj.stateName.includes('Sincronizando') && (
                      <div className="p-3 bg-indigo-50 border border-indigo-200 rounded-lg flex items-center gap-3 text-indigo-950 text-xs font-medium">
                        <RefreshCw className="w-5 h-5 text-indigo-600 animate-spin shrink-0" />
                        <span>{activeStateObj.microcopyPattern}</span>
                      </div>
                    )}
                  </div>

                  <p className="text-xs text-slate-300 font-medium">
                    <strong>Comportamento Técnico do Componente:</strong> {activeStateObj.componentBehavior}
                  </p>
                </div>
              );
            })()}
          </div>

          {/* Microinteractions Rules */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
            <h4 className="text-sm font-black text-slate-900 uppercase tracking-wider">
              Regras Oficiais de Microinterações & Animações Discretas
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                <strong className="text-slate-900 block font-bold">150ms — Snappy Micro</strong>
                <p className="text-slate-600 font-medium">{MICROINTERACTION_RULES.timing.snappyMicro}</p>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                <strong className="text-slate-900 block font-bold">250ms — Modal Transition</strong>
                <p className="text-slate-600 font-medium">{MICROINTERACTION_RULES.timing.modalTransition}</p>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                <strong className="text-slate-900 block font-bold">Easing Easing & Haptics</strong>
                <p className="text-slate-600 font-medium">{MICROINTERACTION_RULES.easing}. {MICROINTERACTION_RULES.mobileHaptics}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 6: ACCESSIBILITY & CONSISTENCY */}
      {activeTab === 'accessibility' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* WCAG AA Checklist */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
              <h4 className="text-sm font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <Eye className="w-5 h-5 text-indigo-600" />
                <span>Regras de Acessibilidade (WCAG 2.1 AA)</span>
              </h4>

              <div className="space-y-3 text-xs">
                {ACCESSIBILITY_RULES_WCAG.map((item, idx) => (
                  <div key={idx} className="p-3 bg-emerald-50/70 rounded-xl border border-emerald-100 space-y-1">
                    <strong className="text-emerald-900 font-black block">✔ {item.rule}</strong>
                    <p className="text-emerald-950 font-medium leading-relaxed">{item.details}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Consistency Manual */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
              <h4 className="text-sm font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-amber-500" />
                <span>Manual de Consistência (Guarda Anti-Inconsistência)</span>
              </h4>

              <div className="space-y-3 text-xs">
                {DESIGN_CONSISTENCY_RULES.map((rule, idx) => (
                  <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                    <strong className="text-slate-900 font-black block">{rule.title}</strong>
                    <p className="text-slate-600 font-medium leading-relaxed">{rule.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 7: HEAD OF DESIGN VERDICT (10-YEAR SCALABILITY) */}
      {activeTab === 'verdict' && (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-xl border border-slate-800 p-8 space-y-6 shadow-xl">
            <div className="flex items-center gap-3 pb-4 border-b border-slate-800">
              <Award className="w-8 h-8 text-amber-400 shrink-0" />
              <div>
                <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest block">
                  {HEAD_OF_DESIGN_VERDICT.directorName}
                </span>
                <h3 className="text-xl font-black text-white">{HEAD_OF_DESIGN_VERDICT.verdictTitle}</h3>
              </div>
            </div>

            <div className="p-4 bg-emerald-500/20 border border-emerald-500/40 rounded-xl flex items-center gap-3 text-emerald-300 font-black text-sm">
              <CheckCircle2 className="w-6 h-6 shrink-0 text-emerald-400" />
              <span>{HEAD_OF_DESIGN_VERDICT.status}</span>
            </div>

            <p className="text-slate-200 text-sm leading-relaxed font-medium bg-slate-800/80 p-6 rounded-xl border border-slate-700">
              "{HEAD_OF_DESIGN_VERDICT.statement}"
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-medium">
              <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-700/80 space-y-1">
                <span className="text-amber-400 font-bold block">1. Escalabilidade de Código</span>
                <p className="text-slate-300">Compatível com Tailwind 4 e tokens CSS reaproveitáveis em React e PWA.</p>
              </div>

              <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-700/80 space-y-1">
                <span className="text-amber-400 font-bold block">2. Inclusão Total</span>
                <p className="text-slate-300">Conformidade garantida para professores com baixa acuidade visual ou uso sob luz solar.</p>
              </div>

              <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-700/80 space-y-1">
                <span className="text-amber-400 font-bold block">3. Velocidade de Eng.</span>
                <p className="text-slate-300">Criação de novas telas sem redesenhar componentes básicos (Zero UI Debt).</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
