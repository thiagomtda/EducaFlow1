import React from 'react';

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 dark:bg-slate-950 p-6 text-center">
      <div className="relative w-16 h-16 mb-4">
        <div className="absolute inset-0 rounded-full border-4 border-indigo-200 dark:border-indigo-900"></div>
        <div className="absolute inset-0 rounded-full border-4 border-indigo-600 border-t-transparent animate-spin"></div>
      </div>
      <h2 className="text-lg font-bold text-slate-800 dark:text-slate-200">Carregando EducaFlow...</h2>
      <p className="text-xs text-slate-500 mt-1">Inicializando subsistemas de produção</p>
    </div>
  );
}
