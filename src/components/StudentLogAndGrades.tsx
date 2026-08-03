'use client';

import { useState } from 'react';
import { db, StudentLog, GradeRecord, AttendanceRecord } from '../db/dexieDb';
import { useNetworkStore } from '../stores/useNetworkStore';
import { processQueue } from '../lib/syncEngine';
import { logger } from '../lib/logger';
import StudentReportModal from './StudentReportModal';
import { 
  User, 
  Award, 
  AlertCircle, 
  BookOpen, 
  Plus, 
  FileText, 
  CheckCircle2, 
  ThumbsUp, 
  TrendingUp, 
  Calendar,
  Sparkles,
  ClipboardList,
  FileDown
} from 'lucide-react';

interface Student {
  id: string;
  name: string;
  rollNumber: number;
}

interface StudentLogAndGradesProps {
  students: Student[];
  classId: string;
  allLogs: StudentLog[];
  allGrades: GradeRecord[];
  attendanceRecords: AttendanceRecord[];
  onSaveSuccess?: () => void;
}

export default function StudentLogAndGrades({
  students,
  classId,
  allLogs,
  allGrades,
  attendanceRecords,
  onSaveSuccess,
}: StudentLogAndGradesProps) {
  const [selectedStudentId, setSelectedStudentId] = useState<string>(students[0]?.id || '');
  const [activeTab, setActiveTab] = useState<'LOG' | 'GRADE'>('LOG');
  const [isReportOpen, setIsReportOpen] = useState(false);

  // Log Form State
  const [logType, setLogType] = useState<'PRAISE' | 'WARNING' | 'OBSERVATION' | 'ATTENTION'>('PRAISE');
  const [logTag, setLogTag] = useState('Participativo');
  const [logDescription, setLogDescription] = useState('');

  // Grade Form State
  const [subject, setSubject] = useState('Matemática');
  const [evaluationName, setEvaluationName] = useState('Atividade Prática');
  const [gradeValue, setGradeValue] = useState<number>(8.5);

  const [isSaving, setIsSaving] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const selectedStudent = students.find((s) => s.id === selectedStudentId);

  const occurrenceTags = {
    PRAISE: ['Participativo', 'Atitude Exemplar', 'Liderança', 'Colaboração'],
    WARNING: ['Falta de Material', 'Conversa Paralela', 'Sem Dever de Casa', 'Atraso em Sala'],
    OBSERVATION: ['Foco Reduzido', 'Criatividade Alta', 'Ritmo de Leitura', 'Trabalho em Equipe'],
    ATTENTION: ['Necessita Atenção', 'Mudança de Humor', 'Dificuldade de Foco', 'Cansaço Excessivo'],
  };

  const handleLogTypeChange = (type: 'PRAISE' | 'WARNING' | 'OBSERVATION' | 'ATTENTION') => {
    setLogType(type);
    setLogTag(occurrenceTags[type][0]);
  };

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleSaveLog = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedStudentId) return;

    setIsSaving(true);
    const todayStr = new Date().toISOString().split('T')[0];
    const timestamp = new Date().toISOString();

    const logData: StudentLog = {
      studentId: selectedStudentId,
      classId,
      type: logType,
      tag: logTag,
      description: logDescription.trim() || `${logTag} registrado em sala de aula.`,
      date: todayStr,
      synced: false,
      updatedAt: timestamp,
    };

    try {
      await db.transaction('rw', [db.studentLogs, db.syncQueue], async () => {
        // 1. Save locally in Dexie IndexedDB
        const newId = await db.studentLogs.add(logData);
        logData.id = String(newId);

        // 2. Queue for background sync
        await db.syncQueue.add({
          table: 'student_logs',
          action: 'INSERT',
          payload: logData,
          createdAt: timestamp,
        });
      });

      logger.info(`Ocorrência adicionada para o aluno ${selectedStudent?.name} no Dexie.`);
      
      // Update UI state
      setLogDescription('');
      triggerToast('Ocorrência registrada localmente com sucesso! 📝');

      // Update Zustand pending counts
      const pendingCount = await db.syncQueue.count();
      useNetworkStore.getState().setPendingSyncCount(pendingCount);

      // Trigger sync if online
      if (typeof navigator !== 'undefined' && navigator.onLine) {
        processQueue();
      }

      if (onSaveSuccess) onSaveSuccess();
    } catch (err) {
      logger.error('Erro ao salvar ocorrência localmente:', { error: String(err) });
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveGrade = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedStudentId) return;

    setIsSaving(true);
    const todayStr = new Date().toISOString().split('T')[0];
    const timestamp = new Date().toISOString();

    const gradeData: GradeRecord = {
      studentId: selectedStudentId,
      classId,
      subject,
      evaluationName: evaluationName.trim() || 'Atividade Prática',
      grade: gradeValue,
      date: todayStr,
      synced: false,
      updatedAt: timestamp,
    };

    try {
      await db.transaction('rw', [db.grades, db.syncQueue], async () => {
        // 1. Save locally in Dexie IndexedDB
        const newId = await db.grades.add(gradeData);
        gradeData.id = String(newId);

        // 2. Queue for background sync
        await db.syncQueue.add({
          table: 'grades',
          action: 'INSERT',
          payload: gradeData,
          createdAt: timestamp,
        });
      });

      logger.info(`Nota adicionada para o aluno ${selectedStudent?.name} no Dexie.`);
      
      // Reset form fields
      setEvaluationName('Atividade Prática');
      setGradeValue(8.5);
      triggerToast('Avaliação registrada localmente com sucesso! 📊');

      // Update Zustand pending counts
      const pendingCount = await db.syncQueue.count();
      useNetworkStore.getState().setPendingSyncCount(pendingCount);

      // Trigger sync if online
      if (typeof navigator !== 'undefined' && navigator.onLine) {
        processQueue();
      }

      if (onSaveSuccess) onSaveSuccess();
    } catch (err) {
      logger.error('Erro ao salvar nota localmente:', { error: String(err) });
    } finally {
      setIsSaving(false);
    }
  };

  // Filter logs & grades for selected student
  const studentLogsFiltered = allLogs.filter((l) => l.studentId === selectedStudentId);
  const studentGradesFiltered = allGrades.filter((g) => g.studentId === selectedStudentId);

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col justify-between h-full">
      <div>
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="font-bold text-base text-white flex items-center gap-2">
              <ClipboardList className="w-5 h-5 text-indigo-400" />
              Diário de Ocorrências & Notas
            </h3>
            <p className="text-xs text-slate-400">Gerenciamento offline de desempenho</p>
          </div>
          <span className="px-2 py-0.5 text-[10px] font-mono bg-violet-500/10 text-violet-400 border border-violet-500/30 rounded-full font-semibold">
            DEXIE ACTIVE
          </span>
        </div>

        {/* Student Selection dropdown */}
        <div className="mb-4">
          <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 flex justify-between items-center">
            <span>Selecionar Estudante</span>
            <button
              type="button"
              onClick={() => setIsReportOpen(true)}
              className="text-[10px] font-bold text-indigo-400 hover:text-indigo-300 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <FileDown className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
              Gerar Relatório / PDF
            </button>
          </label>
          <div className="relative">
            <select
              value={selectedStudentId}
              onChange={(e) => setSelectedStudentId(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-indigo-500 transition-colors appearance-none cursor-pointer"
            >
              {students.map((s) => (
                <option key={s.id} value={s.id}>
                  #{s.rollNumber} - {s.name}
                </option>
              ))}
            </select>
            <User className="absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-500" />
          </div>
        </div>

        {/* Tabs switcher */}
        <div className="grid grid-cols-2 gap-2 p-1 bg-slate-950 border border-slate-800 rounded-xl mb-4">
          <button
            onClick={() => setActiveTab('LOG')}
            className={`py-1.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === 'LOG'
                ? 'bg-indigo-600 text-white'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <AlertCircle className="w-3.5 h-3.5" />
            Registar Ocorrência
          </button>
          <button
            onClick={() => setActiveTab('GRADE')}
            className={`py-1.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === 'GRADE'
                ? 'bg-indigo-600 text-white'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            Lançar Nota / Avaliação
          </button>
        </div>

        {/* Toast Notification inside component */}
        {toastMessage && (
          <div className="mb-4 p-3 bg-indigo-950/80 border border-indigo-800/80 text-indigo-300 rounded-xl text-xs flex items-center gap-2 animate-fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Tab Content: LOG Form */}
        {activeTab === 'LOG' && (
          <form onSubmit={handleSaveLog} className="space-y-3">
            {/* Occurrence Type selector */}
            <div>
              <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                Tipo de Ocorrência
              </label>
              <div className="grid grid-cols-4 gap-1.5">
                {(['PRAISE', 'WARNING', 'OBSERVATION', 'ATTENTION'] as const).map((type) => {
                  const styles = {
                    PRAISE: 'border-emerald-500/20 bg-emerald-500/5 text-emerald-400 hover:bg-emerald-500/10 active:bg-emerald-500/20',
                    WARNING: 'border-rose-500/20 bg-rose-500/5 text-rose-400 hover:bg-rose-500/10 active:bg-rose-500/20',
                    OBSERVATION: 'border-indigo-500/20 bg-indigo-500/5 text-indigo-400 hover:bg-indigo-500/10 active:bg-indigo-500/20',
                    ATTENTION: 'border-amber-500/20 bg-amber-500/5 text-amber-400 hover:bg-amber-500/10 active:bg-amber-500/20',
                  };
                  const activeStyles = {
                    PRAISE: 'border-emerald-500 bg-emerald-500/20 text-emerald-300',
                    WARNING: 'border-rose-500 bg-rose-500/20 text-rose-300',
                    OBSERVATION: 'border-indigo-500 bg-indigo-500/20 text-indigo-300',
                    ATTENTION: 'border-amber-500 bg-amber-500/20 text-amber-300',
                  };
                  const labels = {
                    PRAISE: 'Elogio',
                    WARNING: 'Alerta',
                    OBSERVATION: 'Obs.',
                    ATTENTION: 'Atenção',
                  };
                  return (
                    <button
                      key={type}
                      type="button"
                      onClick={() => handleLogTypeChange(type)}
                      className={`py-1.5 px-1 border rounded-lg text-[10px] font-bold transition-all text-center cursor-pointer ${
                        logType === type ? activeStyles[type] : styles[type]
                      }`}
                    >
                      {labels[type]}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quick tags list */}
            <div>
              <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                Etiqueta Rápida (Tag)
              </label>
              <div className="flex flex-wrap gap-1.5">
                {occurrenceTags[logType].map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => setLogTag(tag)}
                    className={`px-2 py-1 rounded-lg text-[10px] font-semibold transition-all border cursor-pointer ${
                      logTag === tag
                        ? 'bg-slate-100 text-slate-900 border-slate-100'
                        : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Description comment */}
            <div>
              <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                Detalhamento / Descrição
              </label>
              <textarea
                value={logDescription}
                onChange={(e) => setLogDescription(e.target.value)}
                placeholder="Insira detalhes específicos da ocorrência ou atitude..."
                rows={2}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition-colors resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={isSaving}
              className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-bold text-xs rounded-xl shadow-lg shadow-indigo-600/15 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{isSaving ? 'Registrando...' : 'Registrar Ocorrência'}</span>
            </button>
          </form>
        )}

        {/* Tab Content: GRADE Form */}
        {activeTab === 'GRADE' && (
          <form onSubmit={handleSaveGrade} className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                  Disciplina
                </label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-indigo-500 transition-colors cursor-pointer"
                >
                  <option>Matemática</option>
                  <option>Língua Portuguesa</option>
                  <option>Ciências da Natureza</option>
                  <option>História</option>
                  <option>Geografia</option>
                  <option>Artes</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                  Tipo de Avaliação
                </label>
                <input
                  type="text"
                  value={evaluationName}
                  onChange={(e) => setEvaluationName(e.target.value)}
                  placeholder="Ex: Prova 1, Redação, etc."
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition-colors"
                />
              </div>
            </div>

            {/* Grade interactive selector */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Nota / Conceito
                </label>
                <span className="text-xs font-extrabold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 border border-indigo-500/20 rounded-md">
                  {gradeValue.toFixed(1)} / 10.0
                </span>
              </div>
              
              {/* Range slider */}
              <input
                type="range"
                min="0"
                max="10"
                step="0.5"
                value={gradeValue}
                onChange={(e) => setGradeValue(parseFloat(e.target.value))}
                className="w-full accent-indigo-500 bg-slate-950 h-1 rounded-lg appearance-none cursor-pointer"
              />

              {/* Fast selector buttons */}
              <div className="grid grid-cols-6 gap-1 mt-2">
                {[10.0, 9.0, 8.0, 7.0, 6.0, 5.0].map((val) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => setGradeValue(val)}
                    className={`py-1 border rounded-lg text-[10px] font-extrabold transition-all text-center cursor-pointer ${
                      gradeValue === val
                        ? 'bg-indigo-600 text-white border-indigo-500'
                        : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    {val.toFixed(0)}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={isSaving}
              className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-bold text-xs rounded-xl shadow-lg shadow-indigo-600/15 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <TrendingUp className="w-3.5 h-3.5" />
              <span>{isSaving ? 'Registrando...' : 'Gravar Nota'}</span>
            </button>
          </form>
        )}

        {/* History / Live Local Feed for the Selected Student */}
        <div className="mt-4 pt-4 border-t border-slate-800/80">
          <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <ClipboardList className="w-3.5 h-3.5 text-indigo-400" />
            Histórico Recente de {selectedStudent?.name.split(' ')[0]}
          </h4>

          <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
            {studentLogsFiltered.length === 0 && studentGradesFiltered.length === 0 ? (
              <p className="text-[10px] text-slate-500 italic py-2 text-center">
                Nenhum registro encontrado para este aluno neste dispositivo.
              </p>
            ) : (
              <>
                {/* Render Logs */}
                {studentLogsFiltered.map((log) => {
                  const colors = {
                    PRAISE: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400',
                    WARNING: 'bg-rose-500/10 border-rose-500/20 text-rose-400',
                    OBSERVATION: 'bg-indigo-500/10 border-indigo-500/20 text-indigo-400',
                    ATTENTION: 'bg-amber-500/10 border-amber-500/20 text-amber-400',
                  };
                  return (
                    <div
                      key={log.id || String(Math.random())}
                      className="p-2 bg-slate-950/80 border border-slate-800/40 rounded-xl flex items-start gap-2 text-[10px]"
                    >
                      <span className={`px-1.5 py-0.5 rounded text-[8px] font-extrabold shrink-0 ${colors[log.type]}`}>
                        {log.tag}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="text-slate-300 leading-tight truncate">{log.description}</p>
                      </div>
                      <span className="text-[8px] font-mono text-slate-600 self-center">
                        {log.date.substring(5)}
                      </span>
                    </div>
                  );
                })}

                {/* Render Grades */}
                {studentGradesFiltered.map((g) => (
                  <div
                    key={g.id || String(Math.random())}
                    className="p-2 bg-slate-950/80 border border-slate-800/40 rounded-xl flex items-center justify-between text-[10px]"
                  >
                    <div className="flex items-center gap-2">
                      <span className="px-1.5 py-0.5 rounded text-[8px] font-extrabold bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 shrink-0">
                        {g.subject}
                      </span>
                      <span className="text-slate-300 font-medium truncate max-w-[120px]">
                        {g.evaluationName}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`font-mono font-black ${g.grade >= 7 ? 'text-emerald-400' : g.grade >= 5 ? 'text-amber-400' : 'text-rose-400'}`}>
                        {g.grade.toFixed(1)}
                      </span>
                      <span className="text-[8px] font-mono text-slate-600">
                        {g.date.substring(5)}
                      </span>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      </div>

      <div className="text-[9px] text-slate-600 text-center font-mono mt-3">
        Durable persistence configured over Dexie and synchronized automatically.
      </div>

      <StudentReportModal
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
        students={students}
        initialStudentId={selectedStudentId}
        attendanceRecords={attendanceRecords}
        studentLogs={allLogs}
        grades={allGrades}
        classId={classId}
      />
    </div>
  );
}
