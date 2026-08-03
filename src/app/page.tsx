'use client';

import React, { useState } from 'react';
import { useAuthStore } from '../stores/useAuthStore';
import { useAppStore } from '../stores/useAppStore';
import { useNetworkStore } from '../stores/useNetworkStore';
import { useDexieData } from '../hooks/useDexieData';
import { useOfflineSync } from '../hooks/useOfflineSync';
import FastAttendance from '../components/FastAttendance';
import AuroraLessonPlanner from '../components/AuroraLessonPlanner';
import StudentLogAndGrades from '../components/StudentLogAndGrades';
import StudentReportModal from '../components/StudentReportModal';
import ClassOnboardingModal from '../components/ClassOnboardingModal';
import { scanAllStudentsRisk } from '../lib/auroraRiskEngine';
import { AppConstants } from '../constants';
import {
  Wifi,
  WifiOff,
  RefreshCw,
  FileText,
  LogOut,
  GraduationCap,
  Calendar,
  Sparkles,
  UserCheck,
  ClipboardList,
  ChevronRight,
  BookOpen,
  Plus,
  AlertTriangle,
  Lightbulb,
  CheckCircle,
  TrendingUp,
  Brain,
  ShieldAlert,
  Loader2
} from 'lucide-react';

export default function ProductionDashboardPage() {
  const { user, loginDemoTeacher, logout } = useAuthStore();
  const { selectedClass, setSelectedClass, teacherActiveTab: activeTab, setTeacherActiveTab: setActiveTab } = useAppStore();
  const { isOnline, pendingSyncCount } = useNetworkStore();
  const { classes, students, attendanceRecords, studentLogs, grades, isLoaded } = useDexieData();
  const { triggerManualSync, isSyncing } = useOfflineSync();

  const [isReportOpen, setIsReportOpen] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState('Língua Portuguesa');
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
  const [auroraTip, setAuroraTip] = useState<string>('');
  const [isGeneratingTip, setIsGeneratingTip] = useState(false);

  // Scan risk profiles for all students
  const riskProfiles = React.useMemo(() => {
    if (!students || !classes) return [];
    return scanAllStudentsRisk(students, classes, attendanceRecords, studentLogs);
  }, [students, classes, attendanceRecords, studentLogs]);

  // High risk students
  const highRiskStudents = React.useMemo(() => {
    return riskProfiles.filter(p => p.riskLevel === 'HIGH');
  }, [riskProfiles]);

  // Dynamic suggestion generator calling server endpoint
  const generateAuroraTip = async (subjectName: string, classGrade: string) => {
    setIsGeneratingTip(true);
    try {
      const response = await fetch('/api/aurora', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: `Gere um "Boletim de Insights Rápidos" para hoje direcionado a um professor do Ensino Fundamental I.
O assunto da aula de hoje é "${subjectName}" para alunos do "${classGrade}". 
Forneça exatamente duas frases inspiradoras e uma atividade prática rápida de 10 minutos focada em engajamento ativo que o professor possa aplicar instantaneamente na sala de aula.
Seja direto, caloroso e focado, sem enrolação ou introduções longas. Formate com parágrafos claros.`
        })
      });
      const data = await response.json();
      if (data.success && data.content) {
        setAuroraTip(data.content);
      } else {
        setAuroraTip(`💡 Dica para ${subjectName} (${classGrade}): Desenvolva uma atividade em grupo onde os alunos possam aplicar conceitos práticos no cotidiano escolar, estimulando a reflexão compartilhada.`);
      }
    } catch (err) {
      setAuroraTip(`💡 Dica para ${subjectName} (${classGrade}): Divida a classe em pequenos grupos e proponha um desafio gamificado baseado no conteúdo de hoje para aumentar o foco e a participação.`);
    } finally {
      setIsGeneratingTip(false);
    }
  };

  // Prepopulate tip when subject or class changes
  React.useEffect(() => {
    if (selectedClass) {
      generateAuroraTip(selectedSubject, selectedClass.grade || '3º Ano');
    }
  }, [selectedSubject, selectedClass]);

  // Auto-select first allowed class on mount or when classes change
  React.useEffect(() => {
    if (classes && classes.length > 0) {
      const isSelectedAllowed = classes.some(c => c.id === selectedClass?.id);
      if (!selectedClass || !isSelectedAllowed) {
        setSelectedClass(classes[0]);
      }
    }
  }, [classes, selectedClass, setSelectedClass]);

  // Fallback defaults if Auth context not populated yet
  const teacherName = user ? user.name : 'Ana Silva';
  const schoolName = user ? user.schoolName : 'Escola Modelo';
  const className = selectedClass ? selectedClass.name : '3º Ano B (Fundamental I)';
  const classId = selectedClass ? selectedClass.id : 'cls-3a-2026';

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Bom dia';
    if (hour < 18) return 'Boa tarde';
    return 'Boa noite';
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans pb-24 md:pb-8 selection:bg-indigo-500 selection:text-white">
      
      {/* 1. Main Clean Production Header */}
      <header className="border-b border-slate-900 bg-slate-900/40 backdrop-blur-md sticky top-0 z-30 pt-safe">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          
          {/* Logo & School Context */}
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-tr from-indigo-600 to-violet-500 text-white rounded-xl shadow-lg shadow-indigo-500/20">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-lg font-black tracking-tight text-white flex items-center gap-2">
                {AppConstants.APP_NAME}
                <span className="text-[10px] bg-indigo-500/10 text-indigo-400 font-extrabold px-1.5 py-0.5 rounded-full border border-indigo-500/20 uppercase">
                  Conexão Segura
                </span>
              </h1>
              <div className="flex flex-wrap items-center gap-1.5 mt-0.5 text-xs text-slate-400 font-medium">
                <span>{schoolName} •</span>
                {classes && classes.length > 1 ? (
                  <select
                    value={selectedClass?.id || ''}
                    onChange={(e) => {
                      const found = classes.find(c => c.id === e.target.value);
                      if (found) setSelectedClass(found);
                    }}
                    className="bg-slate-900 border border-slate-800 text-xs text-indigo-400 font-black px-2 py-0.5 rounded focus:outline-none focus:ring-1 focus:ring-indigo-500 cursor-pointer"
                  >
                    {classes.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                ) : (
                  <span className="text-indigo-400 font-black">{className}</span>
                )}
              </div>
            </div>
          </div>

          {/* Connection Status & Actions */}
          <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
            
            {/* Connection State Indicator with Manual Sync Action */}
            <div className="flex items-center gap-2">
              <div className={`px-2.5 py-1 rounded-full text-[10px] font-bold font-mono tracking-wider flex items-center gap-1.5 border ${
                isOnline 
                  ? 'bg-emerald-500/10 border-emerald-500/25 text-emerald-400' 
                  : 'bg-amber-500/10 border-amber-500/25 text-amber-400'
              }`}>
                <span className={`w-1.5 h-1.5 rounded-full ${isOnline ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`}></span>
                {isOnline ? 'CONECTADO' : 'SEM CONEXÃO'}
                {pendingSyncCount > 0 && ` (${pendingSyncCount} pendentes)`}
              </div>

              {/* Discreet Sync Button */}
              {pendingSyncCount > 0 && isOnline && (
                <button
                  onClick={triggerManualSync}
                  disabled={isSyncing}
                  className="p-1.5 bg-indigo-600/20 border border-indigo-500/30 hover:bg-indigo-600/30 text-indigo-400 rounded-lg transition-all"
                  title="Sincronizar dados pendentes"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin text-white' : ''}`} />
                </button>
              )}
            </div>

            {/* Quick Actions & Session Menu */}
            <div className="flex items-center gap-2">
              {/* Dossiê / Relatório PDF Button */}
              <button
                onClick={() => setIsReportOpen(true)}
                className="px-3 py-1.5 bg-slate-900 hover:bg-slate-850 text-slate-200 border border-slate-800 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
              >
                <FileText className="w-3.5 h-3.5 text-indigo-400" />
                <span className="hidden sm:inline">Dossiê do Aluno</span>
                <span className="sm:hidden">Dossiê</span>
              </button>

              {/* Nova Turma / Cadastrar Alunos Button */}
              <button
                onClick={() => setIsOnboardingOpen(true)}
                className="px-3 py-1.5 bg-indigo-600/10 hover:bg-indigo-600/20 text-indigo-400 border border-indigo-500/25 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
              >
                <Plus className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">➕ Nova Turma / Cadastrar Alunos</span>
                <span className="sm:hidden">➕ Turma</span>
              </button>

              {/* Profile avatar / LogOut */}
              <div className="flex items-center gap-2 pl-2 border-l border-slate-800/80">
                <div className="hidden md:block text-right">
                  <p className="text-xs font-bold text-slate-200 leading-none">{teacherName}</p>
                  <p className="text-[10px] text-indigo-400 font-semibold mt-0.5">Professor(a)</p>
                </div>
                {user ? (
                  <button
                    onClick={logout}
                    className="p-1.5 hover:bg-rose-500/10 text-slate-400 hover:text-rose-400 rounded-lg transition-colors cursor-pointer"
                    title="Desconectar sessão do professor"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={loginDemoTeacher}
                    className="p-1.5 hover:bg-indigo-500/10 text-indigo-400 rounded-lg transition-colors cursor-pointer"
                    title="Entrar como Professor Demo"
                  >
                    <UserCheck className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

          </div>
        </div>
      </header>

      {/* 2. Main Content Area conditional on having classes */}
      {isLoaded && classes && classes.length === 0 ? (
        <div className="max-w-7xl mx-auto w-full px-4 py-16 sm:px-6 lg:px-8 flex-1 flex flex-col items-center justify-center">
          <div className="max-w-xl w-full text-center p-8 bg-slate-900/40 border border-slate-850 rounded-3xl space-y-6 shadow-2xl backdrop-blur-sm">
            <div className="w-16 h-16 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 rounded-2xl flex items-center justify-center mx-auto shadow-md">
              <GraduationCap className="w-8 h-8" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-extrabold text-white">Boas-vindas ao EducaFlow! 👋</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Olá, Professor(a). Para começar a utilizar o seu diário de classe inteligente, você precisa cadastrar a sua primeira turma de alunos. É simples, rápido e leva menos de 1 minuto!
              </p>
            </div>
            
            <div className="bg-slate-950/50 border border-slate-850 rounded-xl p-4 text-left space-y-2.5">
              <p className="text-xs font-bold text-slate-300 uppercase tracking-wider">Como funciona?</p>
              <ul className="text-xs text-slate-400 space-y-1.5 list-disc pl-4 font-medium">
                <li>Informe o nome, série e turno da sua turma.</li>
                <li>Cole a lista de nomes dos alunos diretamente (um por linha).</li>
                <li>Ou importe rapidamente uma lista em arquivo <span className="font-mono text-indigo-400 font-bold">.txt</span> ou <span className="font-mono text-indigo-400 font-bold">.csv</span>.</li>
              </ul>
            </div>

            <button
              onClick={() => setIsOnboardingOpen(true)}
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 active:scale-98 text-white rounded-xl font-bold text-sm transition-all inline-flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-indigo-600/20 font-sans"
            >
              <Plus className="w-4 h-4" />
              Cadastrar Minha Primeira Turma
            </button>
          </div>
        </div>
      ) : (
        <>
          {/* Welcome & Quick Action Banner */}
          <div className="max-w-7xl mx-auto w-full px-4 pt-6 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Welcome Message & Daily Progress Indicator */}
              <div className="lg:col-span-2 bg-gradient-to-br from-slate-900 to-indigo-950/20 border border-slate-850 rounded-2xl p-6 flex flex-col justify-between gap-6">
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
                    {getGreeting()}, Prof.ª {teacherName.split(' ')[0]}! 👋
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-400 mt-2 leading-relaxed">
                    Gerencie suas turmas, registre notas e planeje suas aulas de acordo com a BNCC de forma simples e segura, com total funcionamento offline.
                  </p>
                </div>
                
                {/* Progress indicator */}
                <div className="border-t border-slate-800/60 pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-indigo-500/10 border border-indigo-500/25 text-indigo-400 rounded-lg">
                      <ClipboardList className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 font-semibold leading-none">Progresso Diário de Chamadas</p>
                      <p className="text-sm font-bold text-slate-200 mt-1">2 de 4 turmas com chamada realizada hoje</p>
                    </div>
                  </div>
                  
                  {/* Progress visual bar */}
                  <div className="w-full sm:w-48 bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div className="bg-indigo-500 h-full w-1/2 rounded-full transition-all duration-500"></div>
                  </div>
                </div>
              </div>

              {/* Action Card: Iniciar Chamada de Hoje */}
              <div className="bg-slate-900 border border-slate-850 rounded-2xl p-6 flex flex-col justify-between gap-4 shadow-xl">
                <div className="space-y-3">
                  <h3 className="text-sm font-extrabold text-white uppercase tracking-wider flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    Ação Rápida da Aula
                  </h3>
                  
                  {/* Selector for Class */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Turma</label>
                    {classes && classes.length > 0 ? (
                      <select
                        value={selectedClass?.id || ''}
                        onChange={(e) => {
                          const found = classes.find(c => c.id === e.target.value);
                          if (found) setSelectedClass(found);
                        }}
                        className="w-full bg-slate-950 border border-slate-800 text-sm text-slate-200 px-3 py-2 rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500 cursor-pointer font-bold"
                      >
                        {classes.map(c => (
                          <option key={c.id} value={c.id}>{c.name}</option>
                        ))}
                      </select>
                    ) : (
                      <div className="text-xs text-slate-400 font-bold bg-slate-950 px-3 py-2 border border-slate-800 rounded-xl">
                        {className}
                      </div>
                    )}
                  </div>

                  {/* Selector for Subject / Discipline */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Disciplina em Foco</label>
                    <select
                      value={selectedSubject}
                      onChange={(e) => setSelectedSubject(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 text-sm text-slate-200 px-3 py-2 rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500 cursor-pointer font-bold"
                    >
                      <option value="Língua Portuguesa">Língua Portuguesa</option>
                      <option value="Matemática">Matemática</option>
                      <option value="Ciências">Ciências</option>
                      <option value="História">História</option>
                      <option value="Geografia">Geografia</option>
                      <option value="Arte">Arte</option>
                      <option value="Educação Física">Educação Física</option>
                    </select>
                  </div>
                </div>

                {/* Start Button */}
                <button
                  onClick={() => {
                    setActiveTab('attendance');
                    if (typeof window !== 'undefined') {
                      localStorage.setItem('educaflow_current_subject', selectedSubject);
                    }
                  }}
                  className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 active:scale-98 text-white rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-indigo-600/25 font-sans"
                >
                  <UserCheck className="w-4 h-4" />
                  Iniciar Chamada de Hoje
                </button>
              </div>

            </div>
          </div>

          {/* Copiloto Aurora AI Daily Briefing */}
          <div className="max-w-7xl mx-auto w-full px-4 pt-6 sm:px-6 lg:px-8">
            <div className="bg-slate-900 border border-slate-850 rounded-2xl p-6 shadow-xl relative overflow-hidden">
              
              <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl pointer-events-none"></div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/60 pb-5">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-amber-500/10 border border-amber-500/20 text-amber-400 rounded-xl shadow-inner">
                    <Sparkles className="w-5 h-5 animate-pulse" />
                  </div>
                  <div>
                    <h3 className="text-base font-black text-white flex items-center gap-2">
                      Copiloto Aurora AI <span className="text-[10px] bg-amber-500/10 border border-amber-500/20 text-amber-400 font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider">Briefing Matinal</span>
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">Visão pedagógica e preventiva para o dia letivo.</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => generateAuroraTip(selectedSubject, selectedClass?.grade || '3º Ano')}
                    disabled={isGeneratingTip}
                    className="px-3.5 py-2 bg-amber-500/10 border border-amber-500/20 hover:bg-amber-500/20 text-amber-400 disabled:opacity-50 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-all cursor-pointer shadow-sm"
                  >
                    {isGeneratingTip ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        Sintonizando...
                      </>
                    ) : (
                      <>
                        <RefreshCw className="w-3.5 h-3.5" />
                        Regenerar Insight
                      </>
                    )}
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-5">
                
                {/* Left Block: Day summary & Risk Engine alert */}
                <div className="space-y-4">
                  <div>
                    <span className="text-[10px] font-extrabold text-indigo-400 uppercase tracking-wider block">Minhas Turmas Ativas</span>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {classes && classes.map(c => (
                        <span 
                          key={c.id} 
                          onClick={() => setSelectedClass(c)}
                          className={`px-3 py-1.5 text-xs font-bold rounded-xl border cursor-pointer transition-all ${
                            selectedClass?.id === c.id 
                              ? 'bg-indigo-600/20 border-indigo-500 text-indigo-300 font-extrabold' 
                              : 'bg-slate-950 border-slate-850 text-slate-400 hover:border-slate-800'
                          }`}
                        >
                          🏫 {c.name} ({c.studentCount} Alunos)
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <span className="text-[10px] font-extrabold text-rose-400 uppercase tracking-wider block">Risco de Evasão & Alerta Preventivo</span>
                    
                    {highRiskStudents.length > 0 ? (
                      <div className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-xl space-y-3">
                        <div className="flex items-center gap-2 text-rose-400">
                          <AlertTriangle className="w-4 h-4 shrink-0" />
                          <p className="text-xs font-bold">Risco crítico detectado ({highRiskStudents.length} {highRiskStudents.length === 1 ? 'aluno' : 'alunos'})</p>
                        </div>
                        <div className="space-y-2 max-h-36 overflow-y-auto pr-1">
                          {highRiskStudents.map(student => (
                            <div key={student.studentId} className="text-xs border-b border-rose-500/10 pb-2 last:border-b-0 last:pb-0">
                              <p className="font-extrabold text-slate-200">{student.name} ({student.className})</p>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {student.reasons.map((r, i) => (
                                  <span key={i} className="bg-rose-500/15 text-rose-400 px-1.5 py-0.5 rounded text-[10px] font-medium">
                                    {r}
                                  </span>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs font-bold text-slate-200">Frequência escolar estável</p>
                          <p className="text-[11px] text-slate-400 mt-1">
                            Todos os alunos mantêm presença acima dos limites preventivos de 75%. Continue com o bom acompanhamento!
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Right Block: Pedagogical Suggestion */}
                <div className="space-y-3">
                  <span className="text-[10px] font-extrabold text-amber-400 uppercase tracking-wider block flex items-center gap-1">
                    <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
                    Sugestão Pedagógica: {selectedSubject}
                  </span>

                  {isGeneratingTip ? (
                    <div className="p-5 bg-slate-950/60 border border-slate-850 rounded-xl h-48 flex flex-col items-center justify-center gap-3">
                      <RefreshCw className="w-6 h-6 text-amber-400 animate-spin" />
                      <p className="text-xs text-slate-400 font-bold">Gerando insight personalizado via Aurora AI...</p>
                    </div>
                  ) : (
                    <div className="p-5 bg-slate-950/60 border border-slate-850 rounded-xl h-48 overflow-y-auto pr-1 text-slate-300">
                      <p className="text-xs leading-relaxed whitespace-pre-wrap font-sans">
                        {auroraTip || `Selecione uma matéria ou clique em "Regenerar Insight" para obter uma recomendação pedagógica detalhada com base na BNCC.`}
                      </p>
                    </div>
                  )}
                </div>

              </div>

            </div>
          </div>

      {/* Indicator Cards of the Day */}
      <div className="max-w-7xl mx-auto w-full px-4 pt-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* Card 1: Chamadas Realizadas */}
          <div 
            onClick={() => setActiveTab('attendance')}
            className="bg-slate-900/60 hover:bg-slate-900 border border-slate-850 hover:border-indigo-500/50 p-5 rounded-2xl flex items-center justify-between gap-4 transition-all duration-200 cursor-pointer group shadow-md"
          >
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest block">Frequência Diária</span>
              <p className="text-base font-extrabold text-white group-hover:text-indigo-400 transition-colors">Chamadas Realizadas</p>
              <p className="text-xs text-slate-400">2 de 4 turmas finalizadas hoje</p>
            </div>
            <div className="w-12 h-12 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform shrink-0">
              <UserCheck className="w-5 h-5" />
            </div>
          </div>

          {/* Card 2: Acesso ao Diário */}
          <div 
            onClick={() => setActiveTab('diary')}
            className="bg-slate-900/60 hover:bg-slate-900 border border-slate-850 hover:border-emerald-500/50 p-5 rounded-2xl flex items-center justify-between gap-4 transition-all duration-200 cursor-pointer group shadow-md"
          >
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest block">Diário Digital</span>
              <p className="text-base font-extrabold text-white group-hover:text-emerald-400 transition-colors">Diário & Notas</p>
              <p className="text-xs text-slate-400">Diário 100% atualizado hoje</p>
            </div>
            <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform shrink-0">
              <ClipboardList className="w-5 h-5" />
            </div>
          </div>

          {/* Card 3: Planejador AI */}
          <div 
            onClick={() => setActiveTab('planner')}
            className="bg-slate-900/60 hover:bg-slate-900 border border-slate-850 hover:border-amber-500/50 p-5 rounded-2xl flex items-center justify-between gap-4 transition-all duration-200 cursor-pointer group shadow-md"
          >
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest block">Inteligência Pedagógica</span>
              <p className="text-base font-extrabold text-white group-hover:text-amber-400 transition-colors">Aurora AI (Assistente)</p>
              <p className="text-xs text-slate-400">Planejamento alinhado à BNCC</p>
            </div>
            <div className="w-12 h-12 bg-amber-500/10 border border-amber-500/20 text-amber-400 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
          </div>

        </div>
      </div>

      {/* 3. Segmented Navigation Tabs (Desktop view center selector) */}
      <div className="max-w-7xl mx-auto w-full px-4 pt-6 sm:px-6 lg:px-8 hidden md:block">
        <div className="flex border-b border-slate-900">
          <button
            onClick={() => setActiveTab('attendance')}
            className={`pb-3 px-6 text-sm font-bold flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
              activeTab === 'attendance'
                ? 'border-indigo-500 text-white font-black'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <UserCheck className="w-4 h-4" />
            Diário de Presença (Chamada)
          </button>
          <button
            onClick={() => setActiveTab('diary')}
            className={`pb-3 px-6 text-sm font-bold flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
              activeTab === 'diary'
                ? 'border-indigo-500 text-white font-black'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <ClipboardList className="w-4 h-4" />
            Ocorrências & Notas
          </button>
          <button
            onClick={() => setActiveTab('planner')}
            className={`pb-3 px-6 text-sm font-bold flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
              activeTab === 'planner'
                ? 'border-indigo-500 text-white font-black'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            Planejador BNCC (Aurora AI)
          </button>
        </div>
      </div>

      {/* 4. Core Tab Workspaces */}
      <main className="max-w-7xl mx-auto w-full px-4 py-6 sm:px-6 lg:px-8 flex-1">
        {!isLoaded ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <RefreshCw className="w-8 h-8 text-indigo-400 animate-spin" />
            <p className="text-xs text-slate-400 font-medium">Carregando Diário Digital de Classe...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            
            {/* Tab 1: Chamada Rápida */}
            {activeTab === 'attendance' && students && (
              <div className="animate-fade-in max-w-3xl mx-auto w-full">
                <FastAttendance
                  classId={classId}
                  students={students}
                  onSaveSuccess={() => {}}
                />
              </div>
            )}

            {/* Tab 2: Diário & Notas */}
            {activeTab === 'diary' && students && (
              <div className="animate-fade-in max-w-3xl mx-auto w-full">
                <StudentLogAndGrades
                  students={students}
                  classId={classId}
                  allLogs={studentLogs}
                  allGrades={grades}
                  attendanceRecords={attendanceRecords}
                  onSaveSuccess={() => {}}
                />
              </div>
            )}

            {/* Tab 3: Assistente Aurora AI */}
            {activeTab === 'planner' && (
              <div className="animate-fade-in max-w-4xl mx-auto w-full">
                <AuroraLessonPlanner />
              </div>
            )}

          </div>
        )}
      </main>
      </>
      )}

      {/* 5. Sticky Bottom Navigation Bar for Mobile Viewports */}
      {classes && classes.length > 0 && (
        <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-900/90 backdrop-blur-lg border-t border-slate-800 p-2 flex justify-around items-center pb-safe">
        <button
          onClick={() => setActiveTab('attendance')}
          className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all ${
            activeTab === 'attendance' ? 'text-indigo-400' : 'text-slate-500 hover:text-slate-400'
          }`}
        >
          <UserCheck className="w-5 h-5" />
          <span className="text-[10px] font-bold">Chamada</span>
        </button>
        <button
          onClick={() => setActiveTab('diary')}
          className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all ${
            activeTab === 'diary' ? 'text-indigo-400' : 'text-slate-500 hover:text-slate-400'
          }`}
        >
          <ClipboardList className="w-5 h-5" />
          <span className="text-[10px] font-bold">Ocorrências</span>
        </button>
        <button
          onClick={() => setActiveTab('planner')}
          className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all ${
            activeTab === 'planner' ? 'text-indigo-400' : 'text-slate-500 hover:text-slate-400'
          }`}
        >
          <Sparkles className="w-5 h-5" />
          <span className="text-[10px] font-bold">Planejador</span>
        </button>
      </nav>
      )}

      {/* 6. Footer */}
      <footer className="max-w-7xl mx-auto w-full px-4 mt-auto pt-8 border-t border-slate-950 text-center text-xs text-slate-600">
        EducaFlow &copy; 2026 — Diário Escolar Inteligente e Seguro para o Ensino Fundamental I.
      </footer>

      {/* 7. Student Report Modal Portal */}
      {students && (
        <StudentReportModal
          isOpen={isReportOpen}
          onClose={() => setIsReportOpen(false)}
          students={students}
          attendanceRecords={attendanceRecords}
          studentLogs={studentLogs}
          grades={grades}
          classId={classId}
        />
      )}

    </div>
  );
}
