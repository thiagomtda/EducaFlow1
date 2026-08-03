'use client';

import React, { useState, useEffect } from 'react';
import { X, Plus, Edit2, Trash2, AlertCircle, Save, BookOpen, Check } from 'lucide-react';
import { db } from '../../db/dexieDb';
import { syncEngine } from '../../services/syncEngine';
import { SchoolClass } from '../../types';
import { logger } from '../../lib/logger';

interface ClassManagementModalProps {
  isOpen: boolean;
  onClose: () => void;
  classes: (SchoolClass & { teacherId?: string })[];
  teachersList: { id: string; name: string }[];
}

export default function ClassManagementModal({ isOpen, onClose, classes, teachersList }: ClassManagementModalProps) {
  const [editingClass, setEditingClass] = useState<(SchoolClass & { teacherId?: string }) | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Form Fields
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [year, setYear] = useState(2026);
  const [grade, setGrade] = useState<'1º Ano' | '2º Ano' | '3º Ano' | '4º Ano' | '5º Ano'>('3º Ano');
  const [shift, setShift] = useState<'Matutino' | 'Vespertino' | 'Integral'>('Matutino');
  const [teacherId, setTeacherId] = useState('');

  // Clear messages after 3s
  useEffect(() => {
    if (errorMessage) {
      const t = setTimeout(() => setErrorMessage(null), 4000);
      return () => clearTimeout(t);
    }
  }, [errorMessage]);

  useEffect(() => {
    if (successMessage) {
      const t = setTimeout(() => setSuccessMessage(null), 4000);
      return () => clearTimeout(t);
    }
  }, [successMessage]);

  if (!isOpen) return null;

  const resetForm = () => {
    setName('');
    setCode('');
    setYear(2026);
    setGrade('3º Ano');
    setShift('Matutino');
    setTeacherId('');
    setEditingClass(null);
    setIsAdding(false);
  };

  const handleEdit = (cls: SchoolClass & { teacherId?: string }) => {
    setEditingClass(cls);
    setIsAdding(false);
    setName(cls.name);
    setCode(cls.code);
    setYear(cls.year);
    setGrade(cls.grade);
    setShift(cls.shift);
    setTeacherId(cls.teacherId || '');
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!name.trim()) {
      setErrorMessage('O nome da turma é obrigatório.');
      return;
    }

    const classCode = code.trim() || `EF1-${grade[0]}${shift[0]}-${Date.now().toString().slice(-3)}`;

    try {
      const targetId = editingClass ? editingClass.id : `cls-${Date.now()}`;
      
      // Calculate current student count (if editing, preserve or recount, if new, 0)
      let currentStudentCount = 0;
      if (editingClass) {
        currentStudentCount = await db.students.where('classId').equals(editingClass.id).count();
      }

      const classPayload = {
        id: targetId,
        code: classCode,
        name: name.trim(),
        year,
        grade,
        shift,
        studentCount: currentStudentCount,
        teacherId: teacherId || undefined,
      };

      // Write to Dexie
      await db.classes.put(classPayload);
      
      // Enqueue in syncQueue
      await syncEngine.enqueue('classes', editingClass ? 'UPDATE' : 'INSERT', classPayload);

      logger.info(`Turma ${editingClass ? 'atualizada' : 'cadastrada'} com sucesso no Dexie e fila de sync.`, classPayload);
      setSuccessMessage(`Turma "${name}" ${editingClass ? 'salva' : 'cadastrada'} com sucesso!`);
      resetForm();
    } catch (err) {
      logger.error('Erro ao salvar turma no Dexie', { error: String(err) });
      setErrorMessage('Erro ao persistir a turma localmente.');
    }
  };

  const handleDelete = async (classId: string, className: string) => {
    try {
      // REQUIREMENT CHECK: Prevent deletion of class with linked students
      const studentsInClass = await db.students.where('classId').equals(classId).count();
      
      if (studentsInClass > 0) {
        setErrorMessage(`Não é possível excluir a turma "${className}" porque existem ${studentsInClass} aluno(s) vinculado(s) a ela.`);
        return;
      }

      if (confirm(`Tem certeza de que deseja excluir a turma "${className}"?`)) {
        await db.classes.delete(classId);
        await syncEngine.enqueue('classes', 'DELETE', { id: classId });
        
        logger.info(`Turma ${className} excluída com sucesso.`);
        setSuccessMessage(`Turma "${className}" excluída.`);
        resetForm();
      }
    } catch (err) {
      logger.error('Erro ao excluir turma', { error: String(err) });
      setErrorMessage('Erro ao excluir turma do banco de dados.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 w-full max-w-4xl rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row h-[85vh] max-h-[650px]">
        
        {/* Left Side: Classes List */}
        <div className="w-full md:w-1/2 p-5 border-r border-slate-800 flex flex-col h-full bg-slate-900/60">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-base font-black text-white flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-emerald-400" />
              Gestão de Turmas ({classes.length})
            </h3>
            <button
              onClick={() => {
                setIsAdding(true);
                setEditingClass(null);
                setName('');
                setCode('');
                setYear(2026);
                setGrade('3º Ano');
                setShift('Matutino');
                setTeacherId('');
              }}
              className="px-2.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-extrabold rounded-lg text-xs transition-all flex items-center gap-1 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5 stroke-[3]" />
              Nova Turma
            </button>
          </div>

          <div className="flex-1 overflow-y-auto space-y-2 pr-1">
            {classes.length === 0 ? (
              <div className="text-center py-10 text-slate-500 text-xs">
                Nenhuma turma cadastrada no sistema.
              </div>
            ) : (
              classes.map((cls) => {
                const isSelected = editingClass?.id === cls.id;
                const assignedTeacher = teachersList.find(t => t.id === cls.teacherId);
                return (
                  <div
                    key={cls.id}
                    className={`p-3 rounded-xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-slate-800/80 border-emerald-500/50 shadow-inner'
                        : 'bg-slate-950/40 border-slate-850 hover:border-slate-800 hover:bg-slate-950/60'
                    }`}
                    onClick={() => handleEdit(cls)}
                  >
                    <div className="flex justify-between items-start gap-2">
                      <div>
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="text-[10px] bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 px-1.5 py-0.5 rounded font-bold uppercase">
                            {cls.code}
                          </span>
                          <span className="text-[10px] bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded font-semibold">
                            {cls.shift}
                          </span>
                        </div>
                        <h4 className="text-xs sm:text-sm font-bold text-white mt-1.5">{cls.name}</h4>
                        <p className="text-[11px] text-slate-400 mt-1">
                          Professor(a): <strong className="text-slate-300">{assignedTeacher ? assignedTeacher.name : 'Nenhum'}</strong>
                        </p>
                      </div>
                      
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(cls.id, cls.name);
                        }}
                        className="p-1.5 hover:bg-rose-500/10 text-slate-500 hover:text-rose-400 rounded-lg transition-colors cursor-pointer"
                        title="Excluir Turma"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right Side: Form View (Add / Edit) */}
        <div className="w-full md:w-1/2 p-6 flex flex-col justify-between bg-slate-900 h-full relative">
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1 hover:bg-slate-800 text-slate-400 hover:text-slate-200 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex-1 overflow-y-auto pr-1">
            <h3 className="text-base font-black text-white mb-4 flex items-center gap-2">
              {editingClass ? (
                <>
                  <Edit2 className="w-4 h-4 text-emerald-400" />
                  Editar Turma
                </>
              ) : isAdding ? (
                <>
                  <Plus className="w-4 h-4 text-emerald-400" />
                  Adicionar Turma
                </>
              ) : (
                <>
                  <BookOpen className="w-4 h-4 text-slate-400" />
                  Selecione uma turma para editar
                </>
              )}
            </h3>

            {/* Status alerts */}
            {errorMessage && (
              <div className="mb-4 bg-rose-500/10 border border-rose-500/20 text-rose-400 p-3 rounded-xl text-xs flex items-start gap-2 animate-fade-in">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <p>{errorMessage}</p>
              </div>
            )}

            {successMessage && (
              <div className="mb-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 p-3 rounded-xl text-xs flex items-center gap-2 animate-fade-in">
                <Check className="w-4 h-4" />
                <p>{successMessage}</p>
              </div>
            )}

            {(editingClass || isAdding) ? (
              <form onSubmit={handleSave} className="space-y-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                    Nome da Turma
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ex: Turma 3º Ano C - Matutino"
                    className="w-full bg-slate-950 border border-slate-800 focus:outline-none focus:border-emerald-500 rounded-xl px-3 py-2 text-xs sm:text-sm text-slate-200"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                      Código da Turma
                    </label>
                    <input
                      type="text"
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      placeholder="Ex: EF1-3C"
                      className="w-full bg-slate-950 border border-slate-800 focus:outline-none focus:border-emerald-500 rounded-xl px-3 py-2 text-xs sm:text-sm text-slate-200"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                      Ano Letivo
                    </label>
                    <input
                      type="number"
                      required
                      value={year}
                      onChange={(e) => setYear(parseInt(e.target.value) || 2026)}
                      className="w-full bg-slate-950 border border-slate-800 focus:outline-none focus:border-emerald-500 rounded-xl px-3 py-2 text-xs sm:text-sm text-slate-200"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                      Série / Ano
                    </label>
                    <select
                      value={grade}
                      onChange={(e: any) => setGrade(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 focus:outline-none focus:border-emerald-500 rounded-xl px-3 py-2 text-xs text-slate-200"
                    >
                      <option value="1º Ano">1º Ano</option>
                      <option value="2º Ano">2º Ano</option>
                      <option value="3º Ano">3º Ano</option>
                      <option value="4º Ano">4º Ano</option>
                      <option value="5º Ano">5º Ano</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                      Turno
                    </label>
                    <select
                      value={shift}
                      onChange={(e: any) => setShift(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 focus:outline-none focus:border-emerald-500 rounded-xl px-3 py-2 text-xs text-slate-200"
                    >
                      <option value="Matutino">Matutino</option>
                      <option value="Vespertino">Vespertino</option>
                      <option value="Integral">Integral</option>
                    </select>
                  </div>
                </div>

                {/* REQUIREMENT 4: ASSIGN TEACHER/SUBJECT PANEL */}
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                    Atribuir Professor(a) Regente
                  </label>
                  <select
                    value={teacherId}
                    onChange={(e) => setTeacherId(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 focus:outline-none focus:border-emerald-500 rounded-xl px-3 py-2 text-xs text-slate-200"
                  >
                    <option value="">Nenhum professor regente</option>
                    {teachersList.map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.name}
                      </option>
                    ))}
                  </select>
                  <p className="text-[10px] text-slate-500 mt-1">
                    O professor selecionado terá visibilidade para lançar presenças, ocorrências e diários desta turma.
                  </p>
                </div>

                <div className="flex gap-2 justify-end pt-4">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-4 py-2 hover:bg-slate-850 text-slate-400 rounded-xl text-xs font-bold transition-all cursor-pointer"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold rounded-xl text-xs transition-all flex items-center gap-1 cursor-pointer"
                  >
                    <Save className="w-3.5 h-3.5" />
                    Salvar Turma
                  </button>
                </div>
              </form>
            ) : (
              <div className="h-48 flex flex-col items-center justify-center text-slate-500 text-xs text-center border-2 border-dashed border-slate-800 rounded-2xl p-6">
                <BookOpen className="w-8 h-8 text-slate-600 mb-2" />
                <p className="max-w-[200px]">Escolha uma turma da lista ao lado para alterar os dados ou clique em <strong>"Nova Turma"</strong> para cadastrar.</p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
