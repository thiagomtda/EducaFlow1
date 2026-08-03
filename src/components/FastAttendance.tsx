'use client';

import { useState, useEffect } from 'react';
import { saveAttendanceBatch } from '../hooks/useAttendance';
import { logger } from '../lib/logger';
import { CheckCircle2, AlertCircle, NotebookPen } from 'lucide-react';
import { useDexieData } from '../hooks/useDexieData';
import { calculateStudentRisk } from '../lib/auroraRiskEngine';
import StudentQuickActionSheet from './StudentQuickActionSheet';

interface Student {
  id: string;
  name: string;
  rollNumber: number;
}

export default function FastAttendance({
  classId,
  students,
  onSaveSuccess,
}: {
  classId: string;
  students: Student[];
  onSaveSuccess?: () => void;
}) {
  const today = new Date().toISOString().split('T')[0];

  const { allStudents, allClasses, attendanceRecords, studentLogs } = useDexieData();

  const classMap: Record<string, string> = {};
  allClasses?.forEach((c) => {
    classMap[c.id] = c.name;
  });

  // Local attendance state
  const [attendance, setAttendance] = useState<Record<string, 'PRESENT' | 'ABSENT' | 'LATE'>>(
    () => Object.fromEntries(students.map((s) => [s.id, 'PRESENT']))
  );

  // Selected student for the bottom sheet
  const [selectedStudentForSheet, setSelectedStudentForSheet] = useState<any | null>(null);

  // Lesson Content Local State
  const [lessonContent, setLessonContent] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(`educaflow:lesson_content:${classId}:${today}`) || '';
    }
    return '';
  });

  // Sync lesson content with classId and date
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setLessonContent(localStorage.getItem(`educaflow:lesson_content:${classId}:${today}`) || '');
    }
  }, [classId, today]);

  // Sync attendance list with students prop changes dynamically
  useEffect(() => {
    setAttendance((prev) => {
      const next = { ...prev };
      // Add any missing student ids
      students.forEach((s) => {
        if (!next[s.id]) {
          next[s.id] = 'PRESENT';
        }
      });
      // Clean up deleted students' ids to keep clean state payload
      Object.keys(next).forEach((key) => {
        if (!students.some((s) => s.id === key)) {
          delete next[key];
        }
      });
      return next;
    });
  }, [students]);

  const [isSaving, setIsSaving] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const setStudentStatus = (studentId: string, status: 'PRESENT' | 'ABSENT' | 'LATE') => {
    setAttendance((prev) => ({
      ...prev,
      [studentId]: status
    }));
  };

  const handleMarkAllPresent = () => {
    const updated = { ...attendance };
    students.forEach((s) => {
      updated[s.id] = 'PRESENT';
    });
    setAttendance(updated);
    logger.info('Todos os alunos foram marcados como PRESENTES na memória local.');
  };

  const handleSave = async () => {
    setIsSaving(true);
    const records = Object.entries(attendance).map(([studentId, status]) => ({
      studentId,
      status: status as 'PRESENT' | 'ABSENT' | 'LATE',
    }));

    try {
      logger.info(`Salvando lote de presença para a turma ${classId} no dia ${today}...`);
      await saveAttendanceBatch(classId, today, records);
      
      // Save lesson content
      if (typeof window !== 'undefined') {
        localStorage.setItem(`educaflow:lesson_content:${classId}:${today}`, lessonContent.trim());
      }
      logger.info('Chamada em lote e conteúdo ministrado salvos com sucesso.');
      
      setShowToast(true);
      setTimeout(() => setShowToast(false), 4000);

      if (onSaveSuccess) {
        onSaveSuccess();
      }
    } catch (error) {
      logger.error('Erro ao salvar chamada em lote:', { error: String(error) });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden flex flex-col justify-between h-full">
      <div>
        <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
          <div>
            <h3 className="font-bold text-base text-white flex items-center gap-2">
              Chamada Rápida (Toque)
            </h3>
            <p className="text-xs text-slate-400">Data: {today}</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleMarkAllPresent}
              className="px-2.5 py-1.5 text-[10px] font-bold bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 hover:border-emerald-500/45 rounded-lg transition-all flex items-center gap-1 active:scale-95 cursor-pointer"
              title="Marcar todos os alunos desta lista como presentes"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              Marcar Todos Presentes
            </button>
            <span className="px-2.5 py-0.5 text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full">
              DIÁRIO ATIVO
            </span>
          </div>
        </div>

        {showToast && (
          <div className="mb-4 p-3 bg-emerald-950/80 border border-emerald-800/80 text-emerald-300 rounded-xl text-xs flex items-center gap-2 animate-fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Chamada e conteúdo salvos localmente e enviados para a fila! 🚀</span>
          </div>
        )}

        <div 
          className="space-y-3 mb-4 max-h-96 md:max-h-[380px] overflow-y-auto pr-1 scroll-smooth"
          style={{ overscrollBehaviorY: 'contain' }}
        >
          {students.map((student) => {
            const status = attendance[student.id] || 'PRESENT';

            // Retrieve student's full data from Dexie state
            const foundStudent = allStudents?.find(s => s.id === student.id);
            const studentWithClassId = foundStudent || {
              id: student.id,
              name: student.name,
              rollNumber: student.rollNumber,
              classId: classId,
              status: 'active'
            };

            const riskProfile = calculateStudentRisk(studentWithClassId, classMap, attendanceRecords || [], studentLogs || []);
            const isHighRisk = riskProfile.riskLevel === 'HIGH';

            return (
              <div
                key={student.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 bg-slate-950 border border-slate-800/60 rounded-xl hover:bg-slate-900/40 transition-all select-none gap-3"
              >
                {/* Clicking on the student name or avatar area triggers the Quick Action bottom sheet */}
                <div 
                  onClick={() => setSelectedStudentForSheet(studentWithClassId)}
                  className="flex items-center gap-2.5 cursor-pointer hover:bg-slate-800/30 p-1.5 -ml-1.5 rounded-lg transition-all group flex-1 mr-2"
                  title="Toque para Registro Rápido (Notas/Ocorrências)"
                >
                  <span className="text-[10px] font-mono font-bold text-slate-500 w-5">
                    #{student.rollNumber}
                  </span>
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold text-slate-200 flex items-center gap-1.5 group-hover:text-indigo-400 transition-colors">
                      {student.name}
                      {isHighRisk && (
                        <span className="relative group/tooltip inline-block shrink-0">
                          <AlertCircle className="w-3.5 h-3.5 text-rose-500 hover:text-rose-400" />
                          <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-1.5 hidden group-hover/tooltip:block bg-slate-950 border border-slate-800 text-slate-200 text-[10px] p-2 rounded-lg z-50 pointer-events-none shadow-xl w-60 max-w-xs text-left whitespace-normal font-sans">
                            <p className="font-bold text-rose-400">Risco Alto (Aurora AI)</p>
                            <p className="opacity-80 text-[9px] mt-0.5">{riskProfile.reasons.join(', ')}</p>
                          </span>
                        </span>
                      )}
                    </span>
                    <span className="text-[9px] text-indigo-400 flex items-center gap-1 opacity-60 group-hover:opacity-100 transition-opacity mt-0.5">
                      <NotebookPen className="w-2.5 h-2.5" />
                      Registrar Nota / Ocorrência
                    </span>
                  </div>
                </div>

                {/* Tactile PFA Pills (min 48px height) with Scale Feedback */}
                <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
                  <button
                    type="button"
                    onClick={() => setStudentStatus(student.id, 'PRESENT')}
                    className={`h-12 w-12 sm:w-14 rounded-xl font-black text-xs flex flex-col items-center justify-center transition-all duration-150 active:scale-95 cursor-pointer ${
                      status === 'PRESENT'
                        ? 'bg-emerald-500/20 border-2 border-emerald-500 text-emerald-400 shadow-md shadow-emerald-500/10'
                        : 'bg-slate-900 border border-slate-800 text-slate-500 hover:text-slate-400'
                    }`}
                    title="Presente"
                  >
                    <span>P</span>
                    <span className="text-[7px] opacity-75 font-bold uppercase">Pres.</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setStudentStatus(student.id, 'ABSENT')}
                    className={`h-12 w-12 sm:w-14 rounded-xl font-black text-xs flex flex-col items-center justify-center transition-all duration-150 active:scale-95 cursor-pointer ${
                      status === 'ABSENT'
                        ? 'bg-rose-500/20 border-2 border-rose-500 text-rose-400 shadow-md shadow-rose-500/10'
                        : 'bg-slate-900 border border-slate-800 text-slate-500 hover:text-slate-400'
                    }`}
                    title="Falta"
                  >
                    <span>F</span>
                    <span className="text-[7px] opacity-75 font-bold uppercase">Falt.</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setStudentStatus(student.id, 'LATE')}
                    className={`h-12 w-12 sm:w-14 rounded-xl font-black text-xs flex flex-col items-center justify-center transition-all duration-150 active:scale-95 cursor-pointer ${
                      status === 'LATE'
                        ? 'bg-amber-500/20 border-2 border-amber-500 text-amber-400 shadow-md shadow-amber-500/10'
                        : 'bg-slate-900 border border-slate-800 text-slate-500 hover:text-slate-400'
                    }`}
                    title="Atraso"
                  >
                    <span>A</span>
                    <span className="text-[7px] opacity-75 font-bold uppercase">Atr.</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Card Minimalista de Conteúdo Ministrado do Dia */}
      <div className="mt-2 mb-4 bg-slate-950/40 border border-slate-800/80 p-3.5 rounded-xl space-y-2">
        <div className="flex items-center justify-between">
          <label htmlFor="lessonContent" className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider flex items-center gap-1.5 select-none">
            <NotebookPen className="w-3.5 h-3.5" />
            Conteúdo Ministrado do Dia
          </label>
          <span className="text-[9px] text-slate-500 font-mono select-none">Pauta da Aula</span>
        </div>
        <input
          id="lessonContent"
          type="text"
          value={lessonContent}
          onChange={(e) => setLessonContent(e.target.value)}
          placeholder="Ex: Frações Equivalentes - Exercícios pág. 42"
          className="w-full bg-slate-950 border border-slate-800/80 rounded-lg p-2.5 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-indigo-500 font-medium"
        />
      </div>

      <div>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 disabled:opacity-50 text-white font-bold text-xs rounded-xl shadow-lg shadow-indigo-600/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          {isSaving ? (
            <>
              <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Salvando Diário...</span>
            </>
          ) : (
            <span>Finalizar Chamada Rápida e Diário</span>
          )}
        </button>
        <p className="text-[9px] text-slate-500 text-center mt-2 select-none">
          Toque no nome do aluno para registrar ocorrências ou notas sem sair da chamada.
        </p>
      </div>

      {/* Render Slide Up Student Quick Action Sheet */}
      <StudentQuickActionSheet
        isOpen={selectedStudentForSheet !== null}
        onClose={() => setSelectedStudentForSheet(null)}
        student={selectedStudentForSheet}
      />
    </div>
  );
}
