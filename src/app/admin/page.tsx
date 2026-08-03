'use client';

import React, { useState } from 'react';
import { useAuthStore } from '../../stores/useAuthStore';
import { useDexieData } from '../../hooks/useDexieData';
import { db } from '../../db/dexieDb';
import { syncEngine } from '../../services/syncEngine';
import ClassManagementModal from '../../components/admin/ClassManagementModal';
import StudentManagementModal from '../../components/admin/StudentManagementModal';
import AuroraAlertsWidget from '../../components/admin/AuroraAlertsWidget';
import {
  GraduationCap,
  Users,
  BookOpen,
  UserCheck,
  LogOut,
  Plus,
  Search,
  Filter,
  CheckCircle2,
  Trash2,
  AlertCircle,
  TrendingUp,
  MapPin,
  ClipboardList,
  ChevronRight,
  Sparkles,
  Layers,
  Award
} from 'lucide-react';
import { logger } from '../../lib/logger';

interface MockTeacher {
  id: string;
  name: string;
  email: string;
  classes: string[];
  subjects: string[];
  status: 'active' | 'inactive';
}

interface MockClassSubject {
  id: string;
  className: string;
  subject: string;
  teacherName: string;
  schedule: string;
}

export default function AdminDashboardPage() {
  const { user, logout } = useAuthStore();
  const { classes, students, allClasses, allStudents } = useDexieData();

  // Selected Tab inside Admin view
  const [activeTab, setActiveTab] = useState<'overview' | 'teachers' | 'classes'>('overview');

  // Search filter states
  const [teacherSearch, setTeacherSearch] = useState('');
  const [classSearch, setClassSearch] = useState('');

  // Modals status
  const [isClassModalOpen, setIsClassModalOpen] = useState(false);
  const [isStudentModalOpen, setIsStudentModalOpen] = useState(false);

  // Add teacher form/modal state
  const [isAddTeacherOpen, setIsAddTeacherOpen] = useState(false);
  const [newTeacherName, setNewTeacherName] = useState('');
  const [newTeacherEmail, setNewTeacherEmail] = useState('');
  const [newTeacherClass, setNewTeacherClass] = useState('cls-3a-2026');

  // Assignment states (Requirement 4)
  const [assignTeacherId, setAssignTeacherId] = useState('');
  const [assignClassId, setAssignClassId] = useState('');
  const [assignSubject, setAssignSubject] = useState('Matemática');
  const [assignSchedule, setAssignSchedule] = useState('Segunda/Quarta 08:00');
  const [assignSuccessMessage, setAssignSuccessMessage] = useState<string | null>(null);

  // Initial list of teachers
  const [teachers, setTeachers] = useState<MockTeacher[]>([
    {
      id: 'usr-prof-2026',
      name: 'Prof.ª Marta Vasconcelos',
      email: 'professora.marta@educaflow.edu.br',
      classes: ['Turma 3º Ano A - Matutino', 'Turma 3º Ano B - Vespertino'],
      subjects: ['Matemática', 'Ciências', 'Língua Portuguesa'],
      status: 'active',
    },
    {
      id: 'usr-prof-carlos',
      name: 'Prof. Carlos Alberto Ramos',
      email: 'carlos.ramos@educaflow.edu.br',
      classes: ['Turma 4º Ano A - Matutino'],
      subjects: ['Geografia', 'História'],
      status: 'active',
    },
    {
      id: 'usr-prof-renata',
      name: 'Prof.ª Renata Abreu',
      email: 'renata.abreu@educaflow.edu.br',
      classes: ['Turma 5º Ano B - Integral'],
      subjects: ['Artes', 'Educação Física'],
      status: 'active',
    },
    {
      id: 'usr-prof-marina',
      name: 'Prof.ª Marina Souza',
      email: 'marina.souza@educaflow.edu.br',
      classes: ['1º Ano A - Matutino'],
      subjects: ['Língua Portuguesa', 'Artes'],
      status: 'active',
    },
  ]);

  // Initial class subjects links
  const [classSubjects, setClassSubjects] = useState<MockClassSubject[]>([
    { id: 'cs-1', className: 'Turma 3º Ano A - Matutino', subject: 'Matemática', teacherName: 'Prof.ª Marta Vasconcelos', schedule: 'Segunda/Quarta 08:00' },
    { id: 'cs-2', className: 'Turma 3º Ano A - Matutino', subject: 'Língua Portuguesa', teacherName: 'Prof.ª Marta Vasconcelos', schedule: 'Terça/Quinta 09:30' },
    { id: 'cs-3', className: 'Turma 3º Ano B - Vespertino', subject: 'Matemática', teacherName: 'Prof.ª Marta Vasconcelos', schedule: 'Segunda/Quarta 14:00' },
    { id: 'cs-4', className: 'Turma 4º Ano A - Matutino', subject: 'Geografia', teacherName: 'Prof. Carlos Alberto Ramos', schedule: 'Quinta 10:30' },
    { id: 'cs-5', className: 'Turma 5º Ano B - Integral', subject: 'Educação Física', teacherName: 'Prof.ª Renata Abreu', schedule: 'Sexta 14:30' },
  ]);

  // Handle adding a teacher
  const handleAddTeacher = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTeacherName || !newTeacherEmail) return;

    const initialClass = allClasses.find(c => c.id === newTeacherClass);
    const newTeacher: MockTeacher = {
      id: `usr-prof-${Date.now()}`,
      name: newTeacherName,
      email: newTeacherEmail,
      classes: [initialClass ? initialClass.name : 'Outra Turma'],
      subjects: ['Geral EF1'],
      status: 'active',
    };

    setTeachers([newTeacher, ...teachers]);

    // Automatically update the teacher in dynamic classes DB if possible
    if (initialClass) {
      const updatedClass = { ...initialClass, teacherId: newTeacher.id };
      db.classes.put(updatedClass).then(() => {
        syncEngine.enqueue('classes', 'UPDATE', updatedClass);
      });
    }

    setNewTeacherName('');
    setNewTeacherEmail('');
    setIsAddTeacherOpen(false);
  };

  // Toggle status
  const toggleTeacherStatus = (id: string) => {
    setTeachers(teachers.map(t => t.id === id ? { ...t, status: t.status === 'active' ? 'inactive' : 'active' } : t));
  };

  // Handle teacher assignment to class & subject (Requirement 4)
  const handleAssignTeacher = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!assignTeacherId || !assignClassId) {
      alert('Selecione um professor e uma turma para vincular.');
      return;
    }

    const selectedTeacher = teachers.find(t => t.id === assignTeacherId);
    const selectedClass = allClasses.find(c => c.id === assignClassId);

    if (!selectedTeacher || !selectedClass) return;

    // 1. Create a new Mock link for displaying in current tab grid
    const newLink: MockClassSubject = {
      id: `cs-${Date.now()}`,
      className: selectedClass.name,
      subject: assignSubject,
      teacherName: selectedTeacher.name,
      schedule: assignSchedule
    };

    setClassSubjects([newLink, ...classSubjects]);

    // 2. Update local teachers state classes & subjects arrays
    setTeachers(teachers.map(t => {
      if (t.id === assignTeacherId) {
        const updatedClasses = Array.from(new Set([...t.classes, selectedClass.name]));
        const updatedSubjects = Array.from(new Set([...t.subjects, assignSubject]));
        return { ...t, classes: updatedClasses, subjects: updatedSubjects };
      }
      return t;
    }));

    try {
      // 3. Update the persistent teacher ID in Dexie and queue synchronization
      const updatedClassPayload = {
        ...selectedClass,
        teacherId: assignTeacherId
      };
      await db.classes.put(updatedClassPayload);
      await syncEngine.enqueue('classes', 'UPDATE', updatedClassPayload);

      setAssignSuccessMessage(`Professor(a) ${selectedTeacher.name} vinculado à turma "${selectedClass.name}" com sucesso!`);
      setTimeout(() => setAssignSuccessMessage(null), 4000);

      logger.info(`Vínculo de professor criado: ${selectedTeacher.name} -> ${selectedClass.name} [${assignSubject}]`);
    } catch (err) {
      logger.error('Erro ao salvar atribuição no Dexie', { error: String(err) });
    }
  };

  const adminName = user?.name || 'Coord.ª Ana Beatriz';
  const schoolName = user?.schoolName || 'Escola Municipal Monteiro Lobato';

  // Filtered lists
  const filteredTeachers = teachers.filter(t =>
    t.name.toLowerCase().includes(teacherSearch.toLowerCase()) ||
    t.email.toLowerCase().includes(teacherSearch.toLowerCase())
  );

  const filteredClassSubjects = classSubjects.filter(cs =>
    cs.className.toLowerCase().includes(classSearch.toLowerCase()) ||
    cs.subject.toLowerCase().includes(classSearch.toLowerCase()) ||
    cs.teacherName.toLowerCase().includes(classSearch.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      
      {/* 1. Admin Header */}
      <header className="border-b border-slate-900 bg-slate-900/40 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center gap-4">
          
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-tr from-emerald-600 to-indigo-600 text-white rounded-xl shadow-lg shadow-emerald-500/20">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-lg font-black tracking-tight text-white flex items-center gap-2">
                EducaFlow
                <span className="text-[10px] bg-emerald-500/10 text-emerald-400 font-extrabold px-1.5 py-0.5 rounded-full border border-emerald-500/20 uppercase tracking-wide">
                  Painel Admin
                </span>
              </h1>
              <p className="text-xs text-slate-400 font-medium">
                {schoolName}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="text-right hidden md:block">
              <p className="text-xs font-bold text-slate-200 leading-none">{adminName}</p>
              <p className="text-[10px] text-emerald-400 font-semibold mt-0.5">Coordenador(a)</p>
            </div>
            <button
              onClick={logout}
              className="p-1.5 hover:bg-rose-500/10 text-slate-400 hover:text-rose-400 rounded-lg transition-colors cursor-pointer ml-2"
              title="Encerrar sessão"
            >
              <LogOut className="w-4.5 h-4.5" />
            </button>
          </div>

        </div>
      </header>

      {/* 2. Welcome Banner */}
      <div className="max-w-7xl mx-auto w-full px-4 pt-6 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-slate-900 to-emerald-950/25 border border-slate-850 rounded-2xl p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              Olá, {adminName.split(' ')[0]}! 👋
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Gerencie professores cadastrados, acompanhe vínculos de turmas e visualize métricas pedagógicas em tempo real.
            </p>
          </div>
          <div className="px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl text-xs font-mono font-bold">
            Ano Letivo: 2026
          </div>
        </div>
      </div>

      {/* Action CTA Bar */}
      <div className="max-w-7xl mx-auto w-full px-4 pt-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <button
          onClick={() => setIsClassModalOpen(true)}
          className="p-4 bg-slate-900 border border-slate-850 rounded-xl flex items-center justify-between hover:border-emerald-500/40 transition-all cursor-pointer group text-left"
        >
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-emerald-500/10 text-emerald-400 rounded-lg group-hover:scale-105 transition-transform">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-white">Gestão de Turmas</p>
              <p className="text-[10px] text-slate-400">Cadastre novas turmas, altere turnos e defina regentes</p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-500 group-hover:translate-x-1 transition-transform" />
        </button>

        <button
          onClick={() => setIsStudentModalOpen(true)}
          className="p-4 bg-slate-900 border border-slate-850 rounded-xl flex items-center justify-between hover:border-indigo-500/40 transition-all cursor-pointer group text-left"
        >
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-indigo-500/10 text-indigo-400 rounded-lg group-hover:scale-105 transition-transform">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-white">Gestão de Alunos</p>
              <p className="text-[10px] text-slate-400">Cadastre estudantes, número de chamada e responsáveis</p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-500 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* 3. Navigation Tabs */}
      <div className="max-w-7xl mx-auto w-full px-4 pt-6 sm:px-6 lg:px-8">
        <div className="flex border-b border-slate-900 gap-1 overflow-x-auto scrollbar-hide">
          <button
            onClick={() => setActiveTab('overview')}
            className={`pb-3 px-4 text-xs sm:text-sm font-bold flex items-center gap-2 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'overview'
                ? 'border-emerald-500 text-white font-black'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layers className="w-4 h-4 text-emerald-400" />
            Visão Geral & Métricas
          </button>
          <button
            onClick={() => setActiveTab('teachers')}
            className={`pb-3 px-4 text-xs sm:text-sm font-bold flex items-center gap-2 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'teachers'
                ? 'border-emerald-500 text-white font-black'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Users className="w-4 h-4 text-emerald-400" />
            Professores Cadastrados ({teachers.length})
          </button>
          <button
            onClick={() => setActiveTab('classes')}
            className={`pb-3 px-4 text-xs sm:text-sm font-bold flex items-center gap-2 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'classes'
                ? 'border-emerald-500 text-white font-black'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <BookOpen className="w-4 h-4 text-emerald-400" />
            Turmas & Vínculos ({classSubjects.length})
          </button>
        </div>
      </div>

      {/* 4. Dashboard Workspaces */}
      <main className="max-w-7xl mx-auto w-full px-4 py-6 sm:px-6 lg:px-8 flex-1">
        
        {/* TAB 1: VISÃO GERAL */}
        {activeTab === 'overview' && (
          <div className="space-y-6 animate-fade-in">
            {/* Quick Metrics Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-slate-900 border border-slate-850 p-4 rounded-xl flex items-center gap-3">
                <div className="p-3 bg-indigo-500/10 text-indigo-400 rounded-lg">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Professores</p>
                  <p className="text-xl font-extrabold text-white">{teachers.length}</p>
                </div>
              </div>

              <div className="bg-slate-900 border border-slate-850 p-4 rounded-xl flex items-center gap-3">
                <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-lg">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Turmas</p>
                  <p className="text-xl font-extrabold text-white">{allClasses.length}</p>
                </div>
              </div>

              <div className="bg-slate-900 border border-slate-850 p-4 rounded-xl flex items-center gap-3">
                <div className="p-3 bg-amber-500/10 text-amber-400 rounded-lg">
                  <UserCheck className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Alunos Ativos</p>
                  <p className="text-xl font-extrabold text-white">{allStudents.length}</p>
                </div>
              </div>

              <div className="bg-slate-900 border border-slate-850 p-4 rounded-xl flex items-center gap-3">
                <div className="p-3 bg-rose-500/10 text-rose-400 rounded-lg">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Presença Geral</p>
                  <p className="text-xl font-extrabold text-white">96.4%</p>
                </div>
              </div>
            </div>

            {/* Aurora AI Alerts Panel */}
            <AuroraAlertsWidget />

            {/* School Metrics Overview Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Performance Panel */}
              <div className="lg:col-span-2 bg-slate-900 border border-slate-850 rounded-2xl p-5 space-y-4">
                <div className="flex justify-between items-center border-b border-slate-850 pb-3">
                  <h3 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2">
                    <Award className="w-4 h-4 text-emerald-400" />
                    Índice de Engajamento e Desempenho Escolar
                  </h3>
                  <span className="text-xs text-indigo-400 font-mono font-bold">BNCC Cobertura: 88%</span>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-xs text-slate-400 font-semibold mb-1">
                      <span>Frequência nas Aulas</span>
                      <span className="text-emerald-400 font-bold">96.4% (Excelente)</span>
                    </div>
                    <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden">
                      <div className="bg-emerald-500 h-full rounded-full" style={{ width: '96.4%' }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs text-slate-400 font-semibold mb-1">
                      <span>Lançamento de Ocorrências Positivas (Elogios)</span>
                      <span className="text-indigo-400 font-bold">78%</span>
                    </div>
                    <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden">
                      <div className="bg-indigo-500 h-full rounded-full" style={{ width: '78%' }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs text-slate-400 font-semibold mb-1">
                      <span>Média Geral Escolar</span>
                      <span className="text-amber-400 font-bold">8.2 / 10.0</span>
                    </div>
                    <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden">
                      <div className="bg-amber-500 h-full rounded-full" style={{ width: '82%' }} />
                    </div>
                  </div>
                </div>

                <div className="bg-slate-950 p-4 rounded-xl border border-slate-850 flex items-start gap-3 mt-4">
                  <Sparkles className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                  <p className="text-xs text-slate-300 leading-relaxed">
                    <strong>Análise Aurora AI Coordenador:</strong> Todas as {allClasses.length} turmas estão ativas hoje. O 3º Ano A possui a maior taxa de presença desta semana (100%). Lembre-se de revisar os planos de aula da próxima semana para alinhamento pedagógico à BNCC.
                  </p>
                </div>
              </div>

              {/* Side Stats */}
              <div className="bg-slate-900 border border-slate-850 rounded-2xl p-5 space-y-4 flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-black text-white uppercase tracking-wider pb-3 border-b border-slate-850 mb-3 flex items-center gap-2">
                    <ClipboardList className="w-4 h-4 text-emerald-400" />
                    Atividade Recente (Hoje)
                  </h3>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs border-b border-slate-850/40 pb-2">
                      <span className="text-slate-300">Chamadas Finalizadas</span>
                      <span className="font-bold text-emerald-400">4 / 4</span>
                    </div>
                    <div className="flex items-center justify-between text-xs border-b border-slate-850/40 pb-2">
                      <span className="text-slate-300">Novas Ocorrências</span>
                      <span className="font-bold text-indigo-400">3 Registradas</span>
                    </div>
                    <div className="flex items-center justify-between text-xs border-b border-slate-850/40 pb-2">
                      <span className="text-slate-300">Notas Lançadas</span>
                      <span className="font-bold text-amber-400">12 Avaliações</span>
                    </div>
                    <div className="flex items-center justify-between text-xs pb-1">
                      <span className="text-slate-300">Fila Sincronizada</span>
                      <span className="font-bold text-emerald-400">100% Sincronizado</span>
                    </div>
                  </div>
                </div>

                <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs p-3 rounded-xl flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  Modo centralizado seguro ativo.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: GERENCIAMENTO DE PROFESSORES */}
        {activeTab === 'teachers' && (
          <div className="space-y-6 animate-fade-in">
            {/* Controls Bar */}
            <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 bg-slate-900 border border-slate-850 p-4 rounded-xl">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Pesquisar professores pelo nome ou e-mail..."
                  value={teacherSearch}
                  onChange={(e) => setTeacherSearch(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 focus:outline-none focus:border-emerald-500 rounded-lg py-2 pl-9 pr-4 text-xs sm:text-sm text-slate-200"
                />
              </div>
              
              <button
                onClick={() => setIsAddTeacherOpen(true)}
                className="py-2 px-4 bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold rounded-lg text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-emerald-600/10"
              >
                <Plus className="w-4 h-4 stroke-[3]" />
                Adicionar Professor
              </button>
            </div>

            {/* Teacher List Table */}
            <div className="bg-slate-900 border border-slate-850 rounded-2xl overflow-hidden">
              {/* Desktop/Tablet Table Layout */}
              <div className="hidden sm:block overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-850 bg-slate-950/40 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      <th className="py-4 px-6">Professor(a)</th>
                      <th className="py-4 px-6">E-mail</th>
                      <th className="py-4 px-6">Turmas Associadas</th>
                      <th className="py-4 px-6">Disciplinas</th>
                      <th className="py-4 px-6 text-center">Status</th>
                      <th className="py-4 px-6 text-right">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-850 text-xs sm:text-sm">
                    {filteredTeachers.map((t) => (
                      <tr key={t.id} className="hover:bg-slate-850/30 transition-colors">
                        <td className="py-4 px-6 font-bold text-white flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold font-mono">
                            {t.name[0]}
                          </div>
                          {t.name}
                        </td>
                        <td className="py-4 px-6 text-slate-400 font-mono text-xs">{t.email}</td>
                        <td className="py-4 px-6">
                          <div className="flex flex-wrap gap-1">
                            {t.classes.map((c, i) => (
                              <span key={i} className="bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 px-2 py-0.5 rounded text-[10px] font-semibold">
                                {c}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <p className="text-slate-300 font-medium truncate max-w-[150px]">{t.subjects.join(', ')}</p>
                        </td>
                        <td className="py-4 px-6 text-center">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase border ${
                            t.status === 'active'
                              ? 'bg-emerald-500/10 border-emerald-500/25 text-emerald-400'
                              : 'bg-red-500/10 border-red-500/25 text-red-400'
                          }`}>
                            {t.status === 'active' ? 'Ativo' : 'Inativo'}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-right">
                          <button
                            onClick={() => toggleTeacherStatus(t.id)}
                            className={`px-2.5 py-1 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                              t.status === 'active'
                                ? 'bg-red-500/10 border-red-500/20 hover:bg-red-500/20 text-red-400'
                                : 'bg-emerald-500/10 border-emerald-500/20 hover:bg-emerald-500/20 text-emerald-400'
                            }`}
                          >
                            {t.status === 'active' ? 'Desativar' : 'Ativar'}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile View: Vertical Stacked/Collapsible Cards (<640px) */}
              <div className="block sm:hidden divide-y divide-slate-850 p-4 space-y-4">
                {filteredTeachers.map((t) => (
                  <div key={t.id} className="bg-slate-950/60 p-4 rounded-xl border border-slate-850/80 space-y-3.5">
                    {/* Header: Avatar, Name & Status */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold font-mono">
                          {t.name[0]}
                        </div>
                        <div>
                          <h4 className="text-sm font-black text-white">{t.name}</h4>
                          <p className="text-[10px] text-slate-500 font-mono">{t.email}</p>
                        </div>
                      </div>
                      <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold tracking-wider uppercase border ${
                        t.status === 'active'
                          ? 'bg-emerald-500/10 border-emerald-500/25 text-emerald-400'
                          : 'bg-red-500/10 border-red-500/25 text-red-400'
                      }`}>
                        {t.status === 'active' ? 'Ativo' : 'Inativo'}
                      </span>
                    </div>

                    {/* Classes & Subjects */}
                    <div className="grid grid-cols-2 gap-3 text-xs border-t border-slate-850/50 pt-3">
                      <div>
                        <span className="block text-[9px] font-bold text-slate-500 uppercase tracking-wider mb-1">Turmas</span>
                        <div className="flex flex-wrap gap-1">
                          {t.classes && t.classes.length > 0 ? (
                            t.classes.map((c, i) => (
                              <span key={i} className="bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 px-1.5 py-0.5 rounded text-[9px] font-semibold">
                                {c}
                              </span>
                            ))
                          ) : (
                            <span className="text-slate-600 italic">Nenhuma</span>
                          )}
                        </div>
                      </div>
                      <div>
                        <span className="block text-[9px] font-bold text-slate-500 uppercase tracking-wider mb-1">Disciplinas</span>
                        <p className="text-slate-300 font-medium text-[11px] truncate" title={t.subjects.join(', ')}>
                          {t.subjects && t.subjects.length > 0 ? t.subjects.join(', ') : 'Nenhuma'}
                        </p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-end border-t border-slate-850/50 pt-3">
                      <button
                        onClick={() => toggleTeacherStatus(t.id)}
                        className={`w-full py-2.5 text-xs font-bold rounded-lg border transition-all cursor-pointer text-center ${
                          t.status === 'active'
                            ? 'bg-red-500/10 border-red-500/20 hover:bg-red-500/20 text-red-400'
                            : 'bg-emerald-500/10 border-emerald-500/20 hover:bg-emerald-500/20 text-emerald-400'
                        }`}
                      >
                        {t.status === 'active' ? 'Desativar Professor' : 'Ativar Professor'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: TURMAS & VÍNCULOS */}
        {activeTab === 'classes' && (
          <div className="space-y-6 animate-fade-in">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* REQUIREMENT 4: ATRIBUIÇÃO DE DISCIPLINAS/PROFESSORES */}
              <div className="bg-slate-900 border border-slate-850 p-5 rounded-2xl space-y-4 h-fit">
                <h3 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2 pb-2 border-b border-slate-850">
                  <UserCheck className="w-4 h-4 text-emerald-400" />
                  Atribuir Docência
                </h3>

                {assignSuccessMessage && (
                  <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 p-3 rounded-xl text-xs flex items-center gap-2 animate-fade-in">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <p>{assignSuccessMessage}</p>
                  </div>
                )}

                <form onSubmit={handleAssignTeacher} className="space-y-4 text-xs">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                      1. Selecione o Professor(a)
                    </label>
                    <select
                      value={assignTeacherId}
                      onChange={(e) => setAssignTeacherId(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 focus:outline-none focus:border-emerald-500 rounded-xl px-3 py-2 text-slate-200"
                    >
                      <option value="">Selecione...</option>
                      {teachers.filter(t => t.status === 'active').map((t) => (
                        <option key={t.id} value={t.id}>
                          {t.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                      2. Selecione a Turma Ativa
                    </label>
                    <select
                      value={assignClassId}
                      onChange={(e) => setAssignClassId(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 focus:outline-none focus:border-emerald-500 rounded-xl px-3 py-2 text-slate-200"
                    >
                      <option value="">Selecione...</option>
                      {allClasses.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.name} ({c.code})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                      3. Disciplina / Matéria
                    </label>
                    <select
                      value={assignSubject}
                      onChange={(e) => setAssignSubject(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 focus:outline-none focus:border-emerald-500 rounded-xl px-3 py-2 text-slate-200"
                    >
                      <option value="Matemática">Matemática</option>
                      <option value="Língua Portuguesa">Língua Portuguesa</option>
                      <option value="Ciências">Ciências</option>
                      <option value="Geografia">Geografia</option>
                      <option value="História">História</option>
                      <option value="Artes">Artes</option>
                      <option value="Educação Física">Educação Física</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                      4. Horário de Aula
                    </label>
                    <input
                      type="text"
                      value={assignSchedule}
                      onChange={(e) => setAssignSchedule(e.target.value)}
                      placeholder="Ex: Segunda/Quarta 08:00"
                      className="w-full bg-slate-950 border border-slate-800 focus:outline-none focus:border-emerald-500 rounded-xl px-3 py-2 text-slate-200"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2 px-3 bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold rounded-xl text-xs sm:text-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-lg shadow-emerald-600/10"
                  >
                    <UserCheck className="w-4 h-4" />
                    Vincular Atribuição
                  </button>
                </form>
              </div>

              {/* Grid of existing/filtered associations */}
              <div className="lg:col-span-2 space-y-4">
                {/* Controls Bar */}
                <div className="flex items-center bg-slate-900 border border-slate-850 p-4 rounded-xl">
                  <div className="relative flex-1">
                    <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Pesquisar vínculos por turma, matéria ou professor..."
                      value={classSearch}
                      onChange={(e) => setClassSearch(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 focus:outline-none focus:border-emerald-500 rounded-lg py-2 pl-9 pr-4 text-xs text-slate-200"
                    />
                  </div>
                </div>

                {/* Class Subjects Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredClassSubjects.map((cs) => (
                    <div key={cs.id} className="bg-slate-900 border border-slate-850 p-4 rounded-2xl flex justify-between items-start hover:border-slate-800 transition-all">
                      <div className="space-y-2">
                        <span className="text-[10px] bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 px-2 py-0.5 rounded font-extrabold uppercase tracking-wider">
                          {cs.className}
                        </span>
                        <h4 className="text-xs sm:text-sm font-extrabold text-white">{cs.subject}</h4>
                        <p className="text-[11px] text-slate-400 font-medium">Docente: <strong className="text-slate-200">{cs.teacherName}</strong></p>
                      </div>
                      <div className="text-right flex flex-col items-end gap-3 shrink-0">
                        <span className="text-[10px] font-mono text-slate-500 font-bold">{cs.schedule}</span>
                        <button
                          onClick={() => {
                            setClassSubjects(classSubjects.filter(item => item.id !== cs.id));
                          }}
                          className="p-1.5 hover:bg-red-500/10 text-slate-500 hover:text-red-400 rounded-lg transition-colors cursor-pointer"
                          title="Desvincular matéria"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        )}

      </main>

      {/* 5. Add Teacher Slide-Over Modal / Dialog */}
      {isAddTeacherOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-850 w-full max-w-md rounded-2xl overflow-hidden p-6 space-y-4">
            <h3 className="text-lg font-black text-white flex items-center gap-2">
              <Plus className="w-5 h-5 text-emerald-400 stroke-[3]" />
              Novo Cadastro de Docente
            </h3>
            
            <form onSubmit={handleAddTeacher} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  Nome Completo
                </label>
                <input
                  type="text"
                  required
                  value={newTeacherName}
                  onChange={(e) => setNewTeacherName(e.target.value)}
                  placeholder="ex: Prof.ª Cláudia Mendes"
                  className="w-full bg-slate-950 border border-slate-800 focus:outline-none focus:border-emerald-500 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-200"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  E-mail de Acesso
                </label>
                <input
                  type="email"
                  required
                  value={newTeacherEmail}
                  onChange={(e) => setNewTeacherEmail(e.target.value)}
                  placeholder="claudia@escola.edu.br"
                  className="w-full bg-slate-950 border border-slate-800 focus:outline-none focus:border-emerald-500 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-200"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  Vincular Turma Inicial
                </label>
                <select
                  value={newTeacherClass}
                  onChange={(e) => setNewTeacherClass(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 focus:outline-none focus:border-emerald-500 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-200"
                >
                  {allClasses.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex gap-3 justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddTeacherOpen(false)}
                  className="px-4 py-2 hover:bg-slate-850 text-slate-400 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold rounded-xl text-xs sm:text-sm transition-all cursor-pointer"
                >
                  Confirmar Cadastro
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Class & Student Management Modals */}
      <ClassManagementModal
        isOpen={isClassModalOpen}
        onClose={() => setIsClassModalOpen(false)}
        classes={allClasses}
        teachersList={teachers.map(t => ({ id: t.id, name: t.name }))}
      />

      <StudentManagementModal
        isOpen={isStudentModalOpen}
        onClose={() => setIsStudentModalOpen(false)}
        students={allStudents}
        classes={allClasses}
      />

      {/* 6. Footer */}
      <footer className="max-w-7xl mx-auto w-full px-4 mt-auto py-8 border-t border-slate-950 text-center text-xs text-slate-600">
        EducaFlow Admin Dashboard &copy; 2026 — Gestão Centralizada de Docentes e Atribuições.
      </footer>
    </div>
  );
}
