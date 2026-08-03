'use client';

import React, { useState, useRef } from 'react';
import { db } from '../db/dexieDb';
import { useAuthStore } from '../stores/useAuthStore';
import { X, Upload, Check, AlertCircle, FileSpreadsheet, Plus } from 'lucide-react';

interface ClassOnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (newClassId: string) => void;
}

export default function ClassOnboardingModal({
  isOpen,
  onClose,
  onSuccess,
}: ClassOnboardingModalProps) {
  const { user } = useAuthStore();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form states
  const [className, setClassName] = useState('');
  const [grade, setGrade] = useState<'1º Ano' | '2º Ano' | '3º Ano' | '4º Ano' | '5º Ano'>('3º Ano');
  const [shift, setShift] = useState<'Matutino' | 'Vespertino' | 'Integral'>('Matutino');
  const [studentsText, setStudentsText] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  // Process text or file content to extract student names
  const parseNames = (text: string): string[] => {
    return text
      .split(/\r?\n/)
      .map((name) => name.trim())
      .filter((name) => name.length > 0);
  };

  // Drag and drop handlers
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    const fileType = file.name.split('.').pop()?.toLowerCase();
    if (fileType !== 'txt' && fileType !== 'csv') {
      setError('Apenas arquivos de texto (.txt) ou planilhas (.csv) são suportados.');
      return;
    }

    setError(null);
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      if (content) {
        // If CSV, try to extract first column or just parse names
        let processedContent = content;
        if (fileType === 'csv') {
          const lines = content.split(/\r?\n/);
          const parsedLines = lines.map(line => {
            // strip quotes and split by comma or semicolon
            const parts = line.replace(/['"]/g, '').split(/[,;]/);
            return parts[0]?.trim() || '';
          }).filter(name => name.length > 0 && name.toLowerCase() !== 'nome' && name.toLowerCase() !== 'student' && name.toLowerCase() !== 'name');
          processedContent = parsedLines.join('\n');
        }
        
        setStudentsText(prev => prev ? `${prev}\n${processedContent}` : processedContent);
      }
    };
    reader.readAsText(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!className.trim()) {
      setError('O nome da turma é obrigatório.');
      return;
    }

    const studentNames = parseNames(studentsText);
    if (studentNames.length === 0) {
      setError('Por favor, adicione pelo menos um aluno.');
      return;
    }

    setIsSubmitting(true);

    try {
      const teacherId = user?.id || 'usr-prof-2026'; // Default fallback to Marta if not set
      const classId = `cls-onb-${Math.random().toString(36).substr(2, 9)}`;
      const classCode = `EF1-${Math.random().toString(36).substr(2, 4).toUpperCase()}`;

      // 1. Save Class record to Dexie
      await db.classes.put({
        id: classId,
        code: classCode,
        name: className.trim(),
        year: 2026,
        grade,
        shift,
        studentCount: studentNames.length,
        teacherId,
      });

      // 2. Save Students records to Dexie
      const studentRecords = studentNames.map((name, index) => ({
        id: `std-onb-${Math.random().toString(36).substr(2, 9)}-${index}`,
        classId,
        name,
        rollNumber: index + 1,
        status: 'active' as const,
        parentName: '',
      }));

      await db.students.bulkPut(studentRecords);

      // 3. Invoke success callback
      onSuccess(classId);
      onClose();
    } catch (err) {
      console.error('Error saving onboarding data:', err);
      setError('Erro ao salvar os dados no diário local. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-xl shadow-2xl relative flex flex-col my-8">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-800/80 flex items-center justify-between">
          <div>
            <h3 className="text-base font-extrabold text-white flex items-center gap-2">
              <Plus className="w-4 h-4 text-indigo-400" />
              Nova Turma & Cadastrar Alunos
            </h3>
            <p className="text-xs text-slate-400 mt-1">Crie turmas e importe alunos de forma instantânea.</p>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 hover:bg-slate-800 text-slate-400 hover:text-slate-200 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5 overflow-y-auto max-h-[75vh]">
          {error && (
            <div className="p-3 bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs rounded-xl flex items-start gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* Turma Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2 space-y-1.5">
              <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">Nome da Turma</label>
              <input
                type="text"
                required
                placeholder="Ex: 3º Ano C - Matutino"
                value={className}
                onChange={(e) => setClassName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 text-sm text-slate-200 px-3.5 py-2.5 rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500 font-bold"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">Série / Ano</label>
              <select
                value={grade}
                onChange={(e) => setGrade(e.target.value as any)}
                className="w-full bg-slate-950 border border-slate-800 text-sm text-slate-200 px-3.5 py-2.5 rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500 font-bold cursor-pointer"
              >
                <option value="1º Ano">1º Ano</option>
                <option value="2º Ano">2º Ano</option>
                <option value="3º Ano">3º Ano</option>
                <option value="4º Ano">4º Ano</option>
                <option value="5º Ano">5º Ano</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">Turno</label>
              <select
                value={shift}
                onChange={(e) => setShift(e.target.value as any)}
                className="w-full bg-slate-950 border border-slate-800 text-sm text-slate-200 px-3.5 py-2.5 rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500 font-bold cursor-pointer"
              >
                <option value="Matutino">Matutino</option>
                <option value="Vespertino">Vespertino</option>
                <option value="Integral">Integral</option>
              </select>
            </div>
          </div>

          {/* Student list paste */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">Nomes dos Alunos</label>
              <span className="text-[10px] text-slate-500 font-bold">
                {parseNames(studentsText).length} detectados
              </span>
            </div>

            <textarea
              placeholder="Digite ou cole um aluno por linha.&#10;Exemplo:&#10;Ana de Oliveira&#10;Bruno Mendes&#10;Carlos Silva"
              value={studentsText}
              onChange={(e) => setStudentsText(e.target.value)}
              rows={5}
              className="w-full bg-slate-950 border border-slate-800 text-sm text-slate-200 p-3.5 rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500 font-medium font-sans leading-relaxed"
            />
          </div>

          {/* Drag & Drop TXT/CSV Upload */}
          <div
            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onDragLeave={handleDrag}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-xl p-5 text-center cursor-pointer transition-all ${
              dragActive
                ? 'border-indigo-500 bg-indigo-500/5'
                : 'border-slate-800 hover:border-slate-750 hover:bg-slate-950/20'
            }`}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileInputChange}
              accept=".txt,.csv"
              className="hidden"
            />
            <div className="flex flex-col items-center justify-center gap-2">
              <div className="p-2.5 bg-indigo-500/10 border border-indigo-500/25 text-indigo-400 rounded-lg">
                <Upload className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-200">
                  Importar Lista de Alunos (.txt ou .csv)
                </p>
                <p className="text-[10px] text-slate-500 font-medium mt-1">
                  Arraste o arquivo ou clique para selecionar
                </p>
              </div>
            </div>
          </div>

          {/* Submit Actions */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800/60">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-4 py-2 bg-slate-950 hover:bg-slate-900 text-slate-400 hover:text-slate-200 rounded-xl text-xs font-bold transition-all cursor-pointer border border-slate-850"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-lg shadow-indigo-600/20 font-sans"
            >
              {isSubmitting ? (
                <>Salvando...</>
              ) : (
                <>
                  <Check className="w-4 h-4" />
                  Criar Turma
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
