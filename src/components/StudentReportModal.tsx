'use client';

import { useState } from 'react';
import { AttendanceRecord, StudentLog, GradeRecord } from '../db/dexieDb';
import { 
  X, 
  Printer, 
  GraduationCap, 
  Calendar, 
  Award, 
  AlertTriangle, 
  FileText, 
  TrendingUp, 
  ArrowLeftRight, 
  BookOpen, 
  Clock, 
  CheckCircle,
  FileDown
} from 'lucide-react';

interface Student {
  id: string;
  name: string;
  rollNumber: number;
}

interface StudentReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  students: Student[];
  initialStudentId?: string;
  attendanceRecords: AttendanceRecord[];
  studentLogs: StudentLog[];
  grades: GradeRecord[];
  classId: string;
}

export default function StudentReportModal({
  isOpen,
  onClose,
  students,
  initialStudentId,
  attendanceRecords,
  studentLogs,
  grades,
  classId,
}: StudentReportModalProps) {
  const [selectedStudentId, setSelectedStudentId] = useState<string>(
    initialStudentId || students[0]?.id || ''
  );

  if (!isOpen) return null;

  const selectedStudent = students.find((s) => s.id === selectedStudentId);

  // 1. Calculate Attendance Stats
  const studentAttendance = attendanceRecords.filter((a) => a.studentId === selectedStudentId);
  const totalClasses = studentAttendance.length;
  const presences = studentAttendance.filter((a) => a.status === 'PRESENT').length;
  const lateArrivals = studentAttendance.filter((a) => a.status === 'LATE').length;
  const absences = studentAttendance.filter((a) => a.status === 'ABSENT').length;
  
  const presenceRate = totalClasses > 0 
    ? Math.round(((totalClasses - absences) / totalClasses) * 100) 
    : 100;

  // 2. Calculate Grade Stats
  const studentGrades = grades.filter((g) => g.studentId === selectedStudentId);
  const averageGrade = studentGrades.length > 0
    ? (studentGrades.reduce((sum, g) => sum + g.grade, 0) / studentGrades.length).toFixed(1)
    : 'N/A';

  // 3. Filter Logs
  const studentLogsFiltered = studentLogs.filter((l) => l.studentId === selectedStudentId);
  const praisesCount = studentLogsFiltered.filter((l) => l.type === 'PRAISE').length;
  const warningsCount = studentLogsFiltered.filter((l) => l.type === 'WARNING').length;
  const attentionCount = studentLogsFiltered.filter((l) => l.type === 'ATTENTION').length;
  const observationsCount = studentLogsFiltered.filter((l) => l.type === 'OBSERVATION').length;

  const handlePrint = () => {
    window.print();
  };

  const currentDateStr = new Date().toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in overflow-y-auto">
      {/* CSS customizado para garantir uma impressão A4 perfeita no padrão escolar */}
      <style>{`
        @media print {
          /* Esconder toda a UI e mostrar apenas a área de relatório */
          body * {
            visibility: hidden !important;
          }
          #printable-report-area, #printable-report-area * {
            visibility: visible !important;
          }
          #printable-report-area {
            position: absolute !important;
            left: 0 !important;
            top: 0 !important;
            width: 100% !important;
            max-width: 100% !important;
            height: auto !important;
            background: white !important;
            color: black !important;
            padding: 20mm !important;
            box-shadow: none !important;
            margin: 0 !important;
            border: none !important;
          }
          /* Estilizar elementos de impressão para alto contraste e nitidez */
          .print-header {
            border-bottom: 2px solid #000 !important;
            padding-bottom: 15px !important;
            margin-bottom: 25px !important;
          }
          .print-title {
            color: #000 !important;
            font-size: 24pt !important;
            font-weight: bold !important;
          }
          .print-subtitle {
            color: #444 !important;
            font-size: 11pt !important;
          }
          .print-badge {
            border: 1px solid #000 !important;
            background: none !important;
            color: #000 !important;
          }
          .print-table {
            width: 100% !important;
            border-collapse: collapse !important;
            margin-top: 15px !important;
          }
          .print-table th, .print-table td {
            border: 1px solid #ddd !important;
            padding: 8px !important;
            text-align: left !important;
            font-size: 10pt !important;
            color: #000 !important;
          }
          .print-table th {
            background-color: #f5f5f5 !important;
            font-weight: bold !important;
          }
          .print-grid {
            display: grid !important;
            grid-template-columns: repeat(4, 1fr) !important;
            gap: 15px !important;
            margin-bottom: 25px !important;
          }
          .print-metric-card {
            border: 1px solid #ccc !important;
            padding: 12px !important;
            text-align: center !important;
            background: #fafafa !important;
          }
          .print-metric-value {
            font-size: 18pt !important;
            font-weight: bold !important;
            color: #000 !important;
          }
          .print-section-title {
            border-left: 4px solid #333 !important;
            padding-left: 8px !important;
            font-size: 13pt !important;
            font-weight: bold !important;
            margin-top: 25px !important;
            margin-bottom: 12px !important;
            color: #000 !important;
          }
          /* Esconder elementos desnecessários na folha de impressão */
          .no-print {
            display: none !important;
          }
        }
      `}</style>

      {/* Main Modal Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-slide-up">
        
        {/* Modal Header */}
        <div className="p-5 border-b border-slate-800 flex justify-between items-center bg-slate-900/60 no-print">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 rounded-xl">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-extrabold text-white">Relatório Individual do Aluno</h2>
              <p className="text-xs text-slate-400">Geração de dossiê completo para impressão e conselho de classe</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-slate-800 text-slate-400 hover:text-slate-200 rounded-xl transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Control Panel */}
        <div className="p-4 bg-slate-950 border-b border-slate-800/60 flex flex-col sm:flex-row gap-3 items-center justify-between no-print">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <label className="text-xs font-bold text-slate-400 uppercase shrink-0">
              Estudante:
            </label>
            <select
              value={selectedStudentId}
              onChange={(e) => setSelectedStudentId(e.target.value)}
              className="px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-indigo-500 transition-colors cursor-pointer w-full sm:w-64"
            >
              {students.map((s) => (
                <option key={s.id} value={s.id}>
                  #{s.rollNumber} - {s.name}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={handlePrint}
            className="w-full sm:w-auto px-4 py-2 bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-indigo-600/25"
          >
            <Printer className="w-4 h-4" />
            <span>Imprimir / Exportar PDF</span>
          </button>
        </div>

        {/* Printable & Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto p-6 bg-slate-900 text-slate-100">
          
          {selectedStudent ? (
            <div id="printable-report-area" className="bg-slate-950 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-inner relative">
              
              {/* Report Header */}
              <div className="print-header flex flex-col md:flex-row justify-between items-start md:items-center pb-6 border-b border-slate-800 mb-6 gap-4">
                <div>
                  <h1 className="print-title text-2xl font-black text-white tracking-tight flex items-center gap-2">
                    <GraduationCap className="w-7 h-7 text-indigo-400 shrink-0 no-print" />
                    EducaFlow
                  </h1>
                  <p className="print-subtitle text-xs text-slate-400 mt-0.5">Dossiê de Desempenho e Frequência Escolar</p>
                </div>
                <div className="text-left md:text-right text-xs">
                  <p className="font-semibold text-slate-200">Turma: <span className="font-mono text-indigo-400 font-bold uppercase">{classId}</span></p>
                  <p className="text-slate-400 mt-0.5">Gerado em: {currentDateStr}</p>
                </div>
              </div>

              {/* Student Basic Info */}
              <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <span className="text-[10px] font-mono font-bold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
                    ESTUDANTE MATRICULADO
                  </span>
                  <h2 className="text-base sm:text-lg font-black text-white mt-1">
                    {selectedStudent.name}
                  </h2>
                  <p className="text-xs text-slate-400">Chamada / Número: #{selectedStudent.rollNumber}</p>
                </div>
                <div className="text-xs text-slate-400 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-slate-500" />
                  <span>Ano Letivo: 2026</span>
                </div>
              </div>

              {/* Metrics Grid */}
              <div className="print-grid grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                
                {/* Metric 1: Attendance Rate */}
                <div className="print-metric-card p-4 bg-slate-900 border border-slate-800 rounded-xl text-center flex flex-col justify-between">
                  <div className="no-print flex justify-center mb-1">
                    <CheckCircle className={`w-5 h-5 ${presenceRate >= 90 ? 'text-emerald-400' : 'text-amber-400'}`} />
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Frequência</span>
                  <div className="print-metric-value text-2xl font-black text-white mt-1">
                    {presenceRate}%
                  </div>
                  <span className="text-[9px] text-slate-500 mt-0.5">{presences} presenças de {totalClasses} dias</span>
                </div>

                {/* Metric 2: Absences */}
                <div className="print-metric-card p-4 bg-slate-900 border border-slate-800 rounded-xl text-center flex flex-col justify-between">
                  <div className="no-print flex justify-center mb-1">
                    <AlertTriangle className={`w-5 h-5 ${absences > 5 ? 'text-rose-400' : 'text-slate-500'}`} />
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Faltas Totais</span>
                  <div className="print-metric-value text-2xl font-black text-white mt-1">
                    {absences}
                  </div>
                  <span className="text-[9px] text-slate-500 mt-0.5">{lateArrivals} atrasos tolerados</span>
                </div>

                {/* Metric 3: Grade Average */}
                <div className="print-metric-card p-4 bg-slate-900 border border-slate-800 rounded-xl text-center flex flex-col justify-between">
                  <div className="no-print flex justify-center mb-1">
                    <TrendingUp className="w-5 h-5 text-indigo-400" />
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Média Geral</span>
                  <div className="print-metric-value text-2xl font-black text-white mt-1">
                    {averageGrade}
                  </div>
                  <span className="text-[9px] text-slate-500 mt-0.5">Baseado em {studentGrades.length} avaliações</span>
                </div>

                {/* Metric 4: Warnings & Logs */}
                <div className="print-metric-card p-4 bg-slate-900 border border-slate-800 rounded-xl text-center flex flex-col justify-between">
                  <div className="no-print flex justify-center mb-1">
                    <Award className="w-5 h-5 text-emerald-400" />
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Ocorrências</span>
                  <div className="print-metric-value text-2xl font-black text-white mt-1">
                    {studentLogsFiltered.length}
                  </div>
                  <span className="text-[9px] text-slate-500 mt-0.5">{praisesCount} elogios / {warningsCount} alertas</span>
                </div>

              </div>

              {/* Section: Academic Grades */}
              <div className="mb-6">
                <h3 className="print-section-title text-sm font-black text-white uppercase tracking-wider mb-3 pb-1 border-b border-slate-800 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-indigo-400 no-print" />
                  Notas e Rendimento Escolar
                </h3>

                {studentGrades.length === 0 ? (
                  <p className="text-xs text-slate-500 italic py-2 text-center bg-slate-900/40 border border-slate-850 rounded-xl">
                    Nenhuma nota registrada para este aluno.
                  </p>
                ) : (
                  <table className="print-table w-full text-xs text-left text-slate-300">
                    <thead className="bg-slate-900 text-slate-400 font-bold uppercase text-[10px]">
                      <tr>
                        <th className="p-3 border-b border-slate-800">Disciplina</th>
                        <th className="p-3 border-b border-slate-800">Avaliação / Atividade</th>
                        <th className="p-3 border-b border-slate-800">Data</th>
                        <th className="p-3 border-b border-slate-800 text-right">Nota</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-850">
                      {studentGrades.map((g) => (
                        <tr key={g.id || String(Math.random())} className="hover:bg-slate-900/40">
                          <td className="p-3 font-semibold text-slate-200">{g.subject}</td>
                          <td className="p-3 text-slate-300">{g.evaluationName}</td>
                          <td className="p-3 text-slate-400 font-mono">{g.date}</td>
                          <td className="p-3 text-right font-bold text-slate-200">
                            <span className={`px-2 py-0.5 rounded font-mono ${g.grade >= 7.0 ? 'text-emerald-400 bg-emerald-500/10' : g.grade >= 5.0 ? 'text-amber-400 bg-amber-500/10' : 'text-rose-400 bg-rose-500/10'}`}>
                              {g.grade.toFixed(1)}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>

              {/* Section: Occurrence History */}
              <div className="mb-6">
                <h3 className="print-section-title text-sm font-black text-white uppercase tracking-wider mb-3 pb-1 border-b border-slate-800 flex items-center gap-2">
                  <Award className="w-4 h-4 text-indigo-400 no-print" />
                  Registro de Comportamento e Ocorrências
                </h3>

                {studentLogsFiltered.length === 0 ? (
                  <p className="text-xs text-slate-500 italic py-2 text-center bg-slate-900/40 border border-slate-850 rounded-xl">
                    Nenhuma ocorrência registrada para este aluno.
                  </p>
                ) : (
                  <table className="print-table w-full text-xs text-left text-slate-300">
                    <thead className="bg-slate-900 text-slate-400 font-bold uppercase text-[10px]">
                      <tr>
                        <th className="p-3 border-b border-slate-800">Tipo</th>
                        <th className="p-3 border-b border-slate-800">Etiqueta</th>
                        <th className="p-3 border-b border-slate-800">Detalhamento</th>
                        <th className="p-3 border-b border-slate-800">Data</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-850">
                      {studentLogsFiltered.map((log) => {
                        const badges = {
                          PRAISE: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
                          WARNING: 'bg-rose-500/10 text-rose-400 border border-rose-500/20',
                          OBSERVATION: 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20',
                          ATTENTION: 'bg-amber-500/10 text-amber-400 border border-amber-500/20',
                        };
                        const labels = {
                          PRAISE: 'Elogio',
                          WARNING: 'Alerta',
                          OBSERVATION: 'Obs.',
                          ATTENTION: 'Atenção',
                        };
                        return (
                          <tr key={log.id || String(Math.random())} className="hover:bg-slate-900/40">
                            <td className="p-3">
                              <span className={`print-badge px-2 py-0.5 rounded font-extrabold text-[9px] uppercase tracking-wider ${badges[log.type]}`}>
                                {labels[log.type]}
                              </span>
                            </td>
                            <td className="p-3 font-semibold text-slate-200">{log.tag}</td>
                            <td className="p-3 text-slate-300 italic">{log.description}</td>
                            <td className="p-3 text-slate-400 font-mono">{log.date}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                )}
              </div>

              {/* Signature Area for Print */}
              <div className="mt-16 pt-8 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-8 text-center text-xs">
                <div className="w-full sm:w-64">
                  <div className="border-b border-slate-600 pb-1 mb-2"></div>
                  <p className="font-semibold text-slate-300">Assinatura do Coordenador(a)</p>
                  <p className="text-[10px] text-slate-500">EducaFlow Sistema Escolar</p>
                </div>
                <div className="w-full sm:w-64">
                  <div className="border-b border-slate-600 pb-1 mb-2"></div>
                  <p className="font-semibold text-slate-300">Assinatura do Professor(a)</p>
                  <p className="text-[10px] text-slate-500">Responsável pela Turma</p>
                </div>
              </div>

            </div>
          ) : (
            <p className="text-slate-400 text-center py-10">Selecione um estudante acima.</p>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-500 no-print">
          <span>EducaFlow PWA Engine</span>
          <span>Dossiê Escolar Seguro</span>
        </div>

      </div>
    </div>
  );
}
