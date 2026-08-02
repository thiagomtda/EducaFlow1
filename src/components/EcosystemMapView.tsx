import React, { useState } from 'react';
import { ECOSYSTEM_AREAS } from '../data/ecosystemMapData';
import { EcosystemModule } from '../types';
import { 
  LayoutDashboard, 
  CheckSquare, 
  Users, 
  BookOpen, 
  Sparkles, 
  FileText, 
  Award, 
  LineChart, 
  FileSignature, 
  HeartHandshake, 
  MessageSquare, 
  Camera, 
  ShieldCheck, 
  Clock, 
  FolderArchive,
  Layers,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Zap,
  Box
} from 'lucide-react';

const ICON_MAP: Record<string, React.ReactNode> = {
  LayoutDashboard: <LayoutDashboard className="w-5 h-5" />,
  CheckSquare: <CheckSquare className="w-5 h-5" />,
  Users: <Users className="w-5 h-5" />,
  BookOpen: <BookOpen className="w-5 h-5" />,
  Sparkles: <Sparkles className="w-5 h-5" />,
  FileText: <FileText className="w-5 h-5" />,
  Award: <Award className="w-5 h-5" />,
  LineChart: <LineChart className="w-5 h-5" />,
  FileSignature: <FileSignature className="w-5 h-5" />,
  HeartHandshake: <HeartHandshake className="w-5 h-5" />,
  MessageSquare: <MessageSquare className="w-5 h-5" />,
  Camera: <Camera className="w-5 h-5" />,
  ShieldCheck: <ShieldCheck className="w-5 h-5" />,
  Clock: <Clock className="w-5 h-5" />,
  FolderArchive: <FolderArchive className="w-5 h-5" />
};

export const EcosystemMapView = () => {
  const [selectedAreaId, setSelectedAreaId] = useState<string>('area-1');
  const [selectedModuleId, setSelectedModuleId] = useState<string>('mod-1-1');

  const selectedArea = ECOSYSTEM_AREAS.find(a => a.id === selectedAreaId) || ECOSYSTEM_AREAS[0];
  
  // Find currently selected module in any area or current area
  const selectedModule: EcosystemModule = 
    selectedArea.modules.find(m => m.id === selectedModuleId) || selectedArea.modules[0];

  return (
    <div className="p-8 space-y-6 overflow-y-auto h-full bg-slate-50">
      {/* Banner */}
      <div className="bg-slate-900 text-white rounded-xl p-6 border border-slate-800 shadow-lg relative overflow-hidden">
        <div className="space-y-2 relative z-10 max-w-3xl">
          <span className="px-3 py-1 bg-indigo-500/20 text-indigo-300 text-xs font-bold rounded-full border border-indigo-500/30 uppercase tracking-widest inline-block">
            Arquitetura de Produto & Ecossistema
          </span>
          <h3 className="text-2xl font-black text-white tracking-tight">
            Mapa do Ecossistema EducaFlow — As 5 Áreas de Experiência
          </h3>
          <p className="text-slate-300 text-sm leading-relaxed">
            Eliminamos menuzinhos e taxonomias complexas. O produto é dividido em <strong>5 Grandes Áreas de Experiência</strong> alinhadas à vida real do professor de Ensino Fundamental I, contemplando todos os seus módulos funcionais.
          </p>
        </div>
      </div>

      {/* Area Selector Tabs (No more than 5 areas) */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
        {ECOSYSTEM_AREAS.map((area) => {
          const isSelected = area.id === selectedAreaId;
          return (
            <button
              key={area.id}
              onClick={() => {
                setSelectedAreaId(area.id);
                setSelectedModuleId(area.modules[0].id);
              }}
              className={`p-4 rounded-xl border text-left transition-all space-y-2 cursor-pointer relative overflow-hidden ${
                isSelected
                  ? 'bg-indigo-600 text-white border-indigo-500 shadow-md ring-2 ring-indigo-400/30'
                  : 'bg-white hover:bg-slate-100 text-slate-800 border-slate-200'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded ${
                  isSelected ? 'bg-indigo-700 text-indigo-100' : 'bg-slate-100 text-slate-500'
                }`}>
                  {area.number}
                </span>
                <div className={`p-1.5 rounded-lg ${isSelected ? 'bg-white/10 text-white' : 'bg-slate-100 text-slate-600'}`}>
                  {ICON_MAP[area.iconName] || <Box className="w-4 h-4" />}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-extrabold line-clamp-2 leading-snug">{area.title}</h4>
                <p className={`text-[10px] mt-1 font-medium ${isSelected ? 'text-indigo-200' : 'text-slate-400'}`}>
                  {area.modules.length} Módulos
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Area Objective & Core Focus */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-6">
        <div className="pb-4 border-b border-slate-100 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 bg-indigo-50 text-indigo-700 text-[10px] font-bold rounded-full border border-indigo-200 uppercase">
                {selectedArea.number}
              </span>
              <span className="text-xs font-bold text-slate-400">Área de Experiência do Professor</span>
            </div>
            <h3 className="text-xl font-black text-slate-900">{selectedArea.title}</h3>
            <p className="text-xs text-slate-600 font-medium max-w-3xl">{selectedArea.description}</p>
          </div>

          <div className="p-3 bg-indigo-50/70 border border-indigo-100 rounded-xl text-xs text-indigo-950 font-medium max-w-xs">
            <span className="font-bold text-indigo-700 block mb-0.5">Objetivo de Experiência:</span>
            {selectedArea.coreExperienceObjective}
          </div>
        </div>

        {/* Modules List in this Area */}
        <div className="space-y-4">
          <h4 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider flex items-center gap-2">
            <Layers className="w-4 h-4 text-indigo-600" />
            <span>Módulos Integrados na {selectedArea.number}</span>
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {selectedArea.modules.map((mod) => {
              const isModSelected = mod.id === selectedModule.id;
              const isMvp = mod.mvpStatus.includes('MVP');

              return (
                <div
                  key={mod.id}
                  onClick={() => setSelectedModuleId(mod.id)}
                  className={`p-5 rounded-xl border cursor-pointer transition-all space-y-4 relative ${
                    isModSelected
                      ? 'bg-slate-900 text-white border-slate-800 shadow-md ring-2 ring-indigo-500/40'
                      : 'bg-slate-50 hover:bg-slate-100/80 text-slate-800 border-slate-200'
                  }`}
                >
                  {/* Module Header */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className={`p-2.5 rounded-lg shrink-0 ${
                        isModSelected ? 'bg-indigo-600 text-white' : 'bg-white border border-slate-200 text-indigo-600'
                      }`}>
                        {ICON_MAP[mod.iconName] || <Box className="w-5 h-5" />}
                      </div>
                      <div>
                        <span className={`text-[10px] font-mono font-bold uppercase ${
                          isModSelected ? 'text-indigo-300' : 'text-slate-400'
                        }`}>
                          {mod.code}
                        </span>
                        <h5 className="text-sm font-extrabold leading-snug">{mod.name}</h5>
                      </div>
                    </div>

                    <span className={`text-[9px] font-extrabold px-2 py-0.5 rounded font-mono uppercase tracking-wider shrink-0 ${
                      isMvp
                        ? (isModSelected ? 'bg-emerald-500 text-slate-950' : 'bg-emerald-100 text-emerald-800 border border-emerald-200')
                        : (isModSelected ? 'bg-slate-800 text-amber-300' : 'bg-amber-100 text-amber-800 border border-amber-200')
                    }`}>
                      {isMvp ? 'MVP P1' : 'Versão V2'}
                    </span>
                  </div>

                  <p className={`text-xs leading-relaxed ${isModSelected ? 'text-slate-300' : 'text-slate-600'}`}>
                    {mod.tagline}
                  </p>

                  {/* Deep Specs Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-2 border-t border-slate-200/40">
                    <div className={`p-2.5 rounded-lg ${isModSelected ? 'bg-slate-800/80' : 'bg-white border border-slate-200'}`}>
                      <span className={`text-[10px] font-bold block mb-0.5 ${isModSelected ? 'text-indigo-300' : 'text-indigo-600'}`}>
                        Objetivo Principal:
                      </span>
                      <p className={`text-[11px] font-medium leading-snug ${isModSelected ? 'text-slate-200' : 'text-slate-700'}`}>
                        {mod.mainObjective}
                      </p>
                    </div>

                    <div className={`p-2.5 rounded-lg ${isModSelected ? 'bg-slate-800/80' : 'bg-white border border-slate-200'}`}>
                      <span className={`text-[10px] font-bold block mb-0.5 ${isModSelected ? 'text-rose-300' : 'text-rose-600'}`}>
                        Problema que Resolve:
                      </span>
                      <p className={`text-[11px] font-medium leading-snug ${isModSelected ? 'text-slate-200' : 'text-slate-700'}`}>
                        {mod.problemSolved}
                      </p>
                    </div>
                  </div>

                  {/* Metrics Badges */}
                  <div className="flex flex-wrap items-center gap-2 pt-1 text-[10px] font-medium">
                    <span className={`px-2 py-1 rounded border ${
                      isModSelected ? 'bg-slate-800 text-slate-300 border-slate-700' : 'bg-white text-slate-600 border-slate-200'
                    }`}>
                      ⏱ <strong>Frequência:</strong> {mod.usageFrequency}
                    </span>

                    <span className={`px-2 py-1 rounded border ${
                      isModSelected ? 'bg-slate-800 text-amber-300 border-slate-700' : 'bg-amber-50 text-amber-900 border-amber-200'
                    }`}>
                      💎 <strong>Valor Percebido:</strong> {mod.perceivedValue}
                    </span>

                    {mod.dependencies.length > 0 && (
                      <span className={`px-2 py-1 rounded border ${
                        isModSelected ? 'bg-slate-800 text-indigo-200 border-slate-700' : 'bg-indigo-50 text-indigo-900 border-indigo-200'
                      }`}>
                        🔗 <strong>Dependências:</strong> {mod.dependencies.join(', ')}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
