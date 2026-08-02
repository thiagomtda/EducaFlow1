import React, { useState } from 'react';
import { HIERARCHICAL_TREE_DATA } from '../data/ecosystemMapData';
import { TreeNode } from '../types';
import { 
  GitBranch, 
  ChevronDown, 
  ChevronRight, 
  Box, 
  Layers, 
  CheckCircle2, 
  Sparkles, 
  Info,
  ShieldCheck
} from 'lucide-react';

export const EcosystemTreeView = () => {
  const [expandedNodes, setExpandedNodes] = useState<Record<string, boolean>>({
    root: true,
    'tree-area-1': true,
    'tree-area-2': true,
    'tree-area-3': true,
    'tree-area-4': true,
    'tree-area-5': true
  });

  const toggleExpand = (id: string) => {
    setExpandedNodes(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const expandAll = () => {
    const allIds: Record<string, boolean> = { root: true };
    const traverse = (node: TreeNode) => {
      allIds[node.id] = true;
      node.children?.forEach(traverse);
    };
    traverse(HIERARCHICAL_TREE_DATA);
    setExpandedNodes(allIds);
  };

  const collapseAll = () => {
    setExpandedNodes({ root: true });
  };

  const renderTreeNode = (node: TreeNode, depth: number = 0) => {
    const hasChildren = node.children && node.children.length > 0;
    const isExpanded = expandedNodes[node.id] ?? true;

    // Styling based on node type
    let nodeBg = 'bg-white border-slate-200 text-slate-800';
    let typeBadgeBg = 'bg-slate-100 text-slate-600';

    if (node.type === 'platform') {
      nodeBg = 'bg-slate-900 text-white border-slate-800 shadow-md';
      typeBadgeBg = 'bg-indigo-500 text-white';
    } else if (node.type === 'area') {
      nodeBg = 'bg-indigo-50/80 border-indigo-200 text-indigo-950 font-bold';
      typeBadgeBg = 'bg-indigo-600 text-white';
    } else if (node.type === 'module') {
      nodeBg = 'bg-slate-50 border-slate-300 text-slate-900 font-semibold';
      typeBadgeBg = 'bg-emerald-600 text-white';
    } else if (node.type === 'feature') {
      nodeBg = 'bg-white border-slate-200 text-slate-700 text-xs';
      typeBadgeBg = 'bg-slate-200 text-slate-700';
    }

    return (
      <div key={node.id} className="space-y-2">
        <div 
          onClick={() => hasChildren && toggleExpand(node.id)}
          className={`p-3 rounded-xl border flex items-center justify-between gap-3 transition-all ${nodeBg} ${
            hasChildren ? 'cursor-pointer hover:border-indigo-400' : ''
          }`}
          style={{ marginLeft: `${depth * 20}px` }}
        >
          <div className="flex items-center gap-2.5 truncate">
            {hasChildren ? (
              <button className="p-1 hover:bg-slate-200/50 rounded transition-colors text-slate-500">
                {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
              </button>
            ) : (
              <span className="w-4 h-4 inline-block text-center text-slate-300">•</span>
            )}

            {node.code && (
              <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-slate-200/60 text-slate-700 shrink-0">
                {node.code}
              </span>
            )}

            <span className="text-xs sm:text-sm font-bold truncate">{node.label}</span>

            {node.details && (
              <span className="text-xs text-slate-400 font-normal hidden md:inline truncate">
                — {node.details}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {node.status && (
              <span className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded ${typeBadgeBg}`}>
                {node.status}
              </span>
            )}
          </div>
        </div>

        {/* Children Render */}
        {hasChildren && isExpanded && (
          <div className="space-y-2 border-l-2 border-slate-200/80 ml-4 pl-2">
            {node.children!.map(child => renderTreeNode(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="p-8 space-y-6 overflow-y-auto h-full bg-slate-50">
      {/* Header */}
      <div className="bg-slate-900 text-white rounded-xl p-6 border border-slate-800 shadow-lg relative overflow-hidden">
        <div className="space-y-2 relative z-10 max-w-3xl">
          <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 text-xs font-bold rounded-full border border-emerald-500/30 uppercase tracking-widest inline-block">
            Mapeamento Funcional Completo
          </span>
          <h3 className="text-2xl font-black text-white tracking-tight">
            Árvore Hierárquica do Ecossistema EducaFlow
          </h3>
          <p className="text-slate-300 text-sm leading-relaxed">
            Visão estruturada de toda a arquitetura funcional da plataforma: desde o Núcleo Principal até as 5 Áreas de Experiência, Módulos e Sub-funcionalidades.
          </p>
        </div>
      </div>

      {/* Control Actions */}
      <div className="flex items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
          <GitBranch className="w-4 h-4 text-indigo-600" />
          <span>Estrutura de Nós Funcionais (Plataforma → Área → Módulo → Funcionalidade)</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={expandAll}
            className="px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold rounded-lg border border-indigo-200 transition-colors cursor-pointer"
          >
            Expandir Tudo
          </button>
          <button
            onClick={collapseAll}
            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-lg border border-slate-300 transition-colors cursor-pointer"
          >
            Recolher
          </button>
        </div>
      </div>

      {/* Hierarchical Tree Render */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-3">
        {renderTreeNode(HIERARCHICAL_TREE_DATA)}
      </div>
    </div>
  );
};
