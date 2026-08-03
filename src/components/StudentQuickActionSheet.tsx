'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { db } from '../db/dexieDb';
import { useNetworkStore } from '../stores/useNetworkStore';
import { processQueue } from '../lib/syncEngine';
import { logger } from '../lib/logger';
import { 
  X, 
  Sparkles, 
  Award, 
  AlertTriangle, 
  BookOpen, 
  Plus, 
  Check, 
  Smile, 
  Frown, 
  Clock, 
  HelpCircle,
  FileText
} from 'lucide-react';

interface StudentQuickActionSheetProps {
  isOpen: boolean;
  onClose: () => void;
  student: {
    id: string;
    name: string;
    rollNumber: number;
    classId: string;
  } | null;
}

const BEHAVIOR_PRESETS = [
  { type: 'PRAISE', tag: 'Participativo', icon: Smile, color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20 hover:bg-emerald-500/20' },
  { type: 'PRAISE', tag: 'Atitude Exemplar', icon: Award, color: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20 hover:bg-indigo-500/20' },
  { type: 'WARNING', tag: 'Sem Lição', icon: Frown, color: 'text-rose-400 bg-rose-500/10 border-rose-500/20 hover:bg-rose-500/20' },
  { type: 'WARNING', tag: 'Falta de Material', icon: AlertTriangle, color: 'text-amber-400 bg-amber-500/10 border-amber-500/20 hover:bg-amber-500/20' },
  { type: 'ATTENTION', tag: 'Desatento', icon: Clock, color: 'text-sky-400 bg-sky-500/10 border-sky-500/20 hover:bg-sky-500/20' },
];

export default function StudentQuickActionSheet({
  isOpen,
  onClose,
  student,
}: StudentQuickActionSheetProps) {
  const [activeTab, setActiveTab] = useState<'GRADE' | 'LOG'>('LOG');
  
  // Grade Form State
  const [subject, setSubject] = useState('Matemática');
  const [evaluationName, setEvaluationName] = useState('');
  const [gradeValue, setGradeValue] = useState('');
  
  // Log Form State
  const [selectedPreset, setSelectedPreset] = useState<typeof BEHAVIOR_PRESETS[0] | null>(null);
  const [logDescription, setLogDescription] = useState('');

  // UI feedback states
  const [isSaving, setIsSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Reset states on student change
  useEffect(() => {
    if (student) {
      setEvaluationName('');
      setGradeValue('');
      setSelectedPreset(null);
      setLogDescription('');
      setSuccessMessage(null);
      setErrorMessage(null);
    }
  }, [student]);

  if (!student) return null;

  const handleSaveGrade = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!evaluationName.trim()) {
      setErrorMessage('Por favor, informe o título da avaliação.');
      return;
    }
    const parsedGrade = parseFloat(gradeValue.replace(',', '.'));
    if (isNaN(parsedGrade) || parsedGrade < 0 || parsedGrade > 10) {
      setErrorMessage('A nota deve ser um valor de 0 a 10.');
      return;
    }

    setIsSaving(true);
    setErrorMessage(null);

    const timestamp = new Date().toISOString();
    const todayStr = timestamp.split('T')[0];

    const gradeRecord = {
      studentId: student.id,
      classId: student.classId,
      subject,
      evaluationName: evaluationName.trim(),
      grade: parsedGrade,
      date: todayStr,
      updatedAt: timestamp,
      synced: false,
    };

    try {
      logger.info(`Salvando nota rústica para o aluno ${student.name} no Dexie...`);
      
      await db.transaction('rw', [db.grades, db.syncQueue], async () => {
        const id = await db.grades.add(gradeRecord);
        await db.syncQueue.add({
          table: 'grades',
          action: 'INSERT',
          payload: { ...gradeRecord, id },
          createdAt: timestamp,
        });
      });

      // Update Zustand pending sync queue count
      const pendingCount = await db.syncQueue.count();
      useNetworkStore.getState().setPendingSyncCount(pendingCount);

      if (typeof navigator !== 'undefined' && navigator.onLine) {
        processQueue(); // non-blocking sync trigger
      }

      setSuccessMessage('Nota salva com sucesso!');
      setTimeout(() => {
        setSuccessMessage(null);
        onClose();
      }, 1500);
    } catch (err) {
      logger.error('Erro ao salvar nota rápida no Dexie:', { error: String(err) });
      setErrorMessage('Não foi possível salvar a nota localmente.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveLog = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPreset && !logDescription.trim()) {
      setErrorMessage('Selecione uma pílula de comportamento ou digite uma ocorrência.');
      return;
    }

    setIsSaving(true);
    setErrorMessage(null);

    const timestamp = new Date().toISOString();
    const todayStr = timestamp.split('T')[0];

    const finalType = selectedPreset ? (selectedPreset.type as 'PRAISE' | 'WARNING' | 'ATTENTION' | 'OBSERVATION') : 'OBSERVATION';
    const finalTag = selectedPreset ? selectedPreset.tag : 'Observação';
    const finalDesc = logDescription.trim() || `Registro de ocorrência: ${finalTag}`;

    const logRecord = {
      studentId: student.id,
      classId: student.classId,
      type: finalType,
      tag: finalTag,
      description: finalDesc,
      date: todayStr,
      updatedAt: timestamp,
      synced: false,
    };

    try {
      logger.info(`Salvando ocorrência comportamental para o aluno ${student.name} no Dexie...`);
      
      await db.transaction('rw', [db.studentLogs, db.syncQueue], async () => {
        const id = await db.studentLogs.add(logRecord);
        await db.syncQueue.add({
          table: 'student_logs',
          action: 'INSERT',
          payload: { ...logRecord, id },
          createdAt: timestamp,
        });
      });

      // Update Zustand pending sync queue count
      const pendingCount = await db.syncQueue.count();
      useNetworkStore.getState().setPendingSyncCount(pendingCount);

      if (typeof navigator !== 'undefined' && navigator.onLine) {
        processQueue();
      }

      setSuccessMessage('Ocorrência salva com sucesso!');
      setTimeout(() => {
        setSuccessMessage(null);
        onClose();
      }, 1500);
    } catch (err) {
      logger.error('Erro ao salvar ocorrência no Dexie:', { error: String(err) });
      setErrorMessage('Não foi possível salvar a ocorrência localmente.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950 z-50 backdrop-blur-xs cursor-pointer"
          />

          {/* Sliding Bottom Sheet */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="fixed bottom-0 left-0 right-0 max-w-lg mx-auto bg-slate-900 border-t border-slate-800 rounded-t-3xl z-50 overflow-hidden shadow-2xl flex flex-col max-h-[85vh] pb-safe"
          >
            {/* Header / Grab bar */}
            <div className="w-full flex flex-col items-center pt-3 pb-4 px-6 border-b border-slate-850">
              <div className="w-12 h-1 bg-slate-700 rounded-full mb-3" />
              <div className="w-full flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-black text-white uppercase tracking-wider">
                    Registro Rápido
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Estudante: <strong className="text-slate-200 font-bold">{student.name}</strong> (#{student.rollNumber})
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="p-1.5 bg-slate-950 hover:bg-slate-800 text-slate-400 hover:text-slate-200 rounded-lg transition-colors cursor-pointer"
                >
                  <X className="w-4.5 h-4.5" />
                </button>
              </div>
            </div>

            {/* Tab Bar Selection */}
            <div className="grid grid-cols-2 bg-slate-950 border-b border-slate-850 p-1">
              <button
                type="button"
                onClick={() => { setActiveTab('LOG'); setErrorMessage(null); }}
                className={`py-3 text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  activeTab === 'LOG'
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Smile className="w-4 h-4" />
                Ocorrência / Comportamento
              </button>
              <button
                type="button"
                onClick={() => { setActiveTab('GRADE'); setErrorMessage(null); }}
                className={`py-3 text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  activeTab === 'GRADE'
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <BookOpen className="w-4 h-4" />
                Nota / Avaliação
              </button>
            </div>

            {/* Scrollable Content Container */}
            <div className="p-6 overflow-y-auto flex-1 space-y-4">
              {/* Messages banners */}
              {successMessage && (
                <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 p-3.5 rounded-xl text-xs font-bold flex items-center gap-2 animate-bounce">
                  <Check className="w-4 h-4" />
                  {successMessage}
                </div>
              )}
              {errorMessage && (
                <div className="bg-rose-500/10 border border-rose-500/20 text-rose-400 p-3.5 rounded-xl text-xs font-bold flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" />
                  {errorMessage}
                </div>
              )}

              {activeTab === 'LOG' ? (
                /* Behavioral log form */
                <form onSubmit={handleSaveLog} className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                      Comportamento Rápido (Selecione)
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {BEHAVIOR_PRESETS.map((preset, idx) => {
                        const Icon = preset.icon;
                        const isSelected = selectedPreset?.tag === preset.tag;
                        return (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => setSelectedPreset(isSelected ? null : preset)}
                            className={`px-3 py-2.5 rounded-xl border text-xs font-bold transition-all flex items-center gap-2 active:scale-95 cursor-pointer ${
                              isSelected
                                ? 'bg-indigo-600 border-indigo-500 text-white shadow-md shadow-indigo-600/25'
                                : preset.color
                            }`}
                          >
                            <Icon className="w-4 h-4" />
                            {preset.tag}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      Descrição / Observações adicionais
                    </label>
                    <textarea
                      value={logDescription}
                      onChange={(e) => setLogDescription(e.target.value)}
                      placeholder="Ex: Aluno auxiliou colegas de grupo na atividade de fixação..."
                      className="w-full h-24 bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs sm:text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSaving}
                      className="w-full py-3 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white font-bold rounded-xl text-xs transition-all active:scale-98 shadow-lg shadow-indigo-600/15 cursor-pointer"
                    >
                      {isSaving ? 'Salvando...' : 'Salvar Ocorrência'}
                    </button>
                  </div>
                </form>
              ) : (
                /* Grade log form */
                <form onSubmit={handleSaveGrade} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        Componente Curricular
                      </label>
                      <select
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs sm:text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      >
                        <option value="Matemática">Matemática</option>
                        <option value="Língua Portuguesa">Língua Portuguesa</option>
                        <option value="Ciências da Natureza">Ciências da Natureza</option>
                        <option value="História">História</option>
                        <option value="Geografia">Geografia</option>
                        <option value="Artes">Artes</option>
                        <option value="Geral">Geral / Multidisciplinar</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        Nota (0 a 10)
                      </label>
                      <input
                        type="text"
                        value={gradeValue}
                        onChange={(e) => setGradeValue(e.target.value)}
                        placeholder="Ex: 8.5"
                        maxLength={4}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs sm:text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-bold"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      Nome da Avaliação / Atividade
                    </label>
                    <input
                      type="text"
                      value={evaluationName}
                      onChange={(e) => setEvaluationName(e.target.value)}
                      placeholder="Ex: Atividade Prática Frações, Participação em Aula, etc."
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs sm:text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSaving}
                      className="w-full py-3 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white font-bold rounded-xl text-xs transition-all active:scale-98 shadow-lg shadow-emerald-600/15 cursor-pointer"
                    >
                      {isSaving ? 'Salvando...' : 'Salvar Nota'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
