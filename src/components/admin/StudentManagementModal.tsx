'use client';

import React, { useState, useEffect } from 'react';
import { X, Plus, Edit2, Trash2, AlertCircle, Save, Users, Search, Filter, Check, GraduationCap } from 'lucide-react';
import { db } from '../../db/dexieDb';
import { syncEngine } from '../../services/syncEngine';
import { Student, SchoolClass } from '../../types';
import { logger } from '../../lib/logger';

interface StudentManagementModalProps {
  isOpen: boolean;
  onClose: () => void;
  students: (Student & { parentName?: string })[];
  classes: SchoolClass[];
}

export default function StudentManagementModal({ isOpen, onClose, students, classes }: StudentManagementModalProps) {
  const [editingStudent, setEditingStudent] = useState<(Student & { parentName?: string }) | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Search & Filter
  const [searchTerm, setSearchTerm] = useState('');
  const [classFilter, setClassFilter] = useState<string>('');

  // Form Fields
  const [name, setName] = useState('');
  const [classId, setClassId] = useState('');
  const [rollNumber, setRollNumber] = useState(1);
  const [parentName, setParentName] = useState('');
  const [status, setStatus] = useState<'active' | 'transferred' | 'inactive'>('active');

  // Sync state transitions or updates
  useEffect(() => {
    if (classes.length > 0 && !classId) {
      setClassId(classes[0].id);
    }
  }, [classes]);

  // Clear messages after 4s
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
    if (classes.length > 0) {
      setClassId(classes[0].id);
    } else {
      setClassId('');
    }
    setRollNumber(1);
    setParentName('');
    setStatus('active');
    setEditingStudent(null);
    setIsAdding(false);
  };

  const handleEdit = (std: Student & { parentName?: string }) => {
    setEditingStudent(std);
    setIsAdding(false);
    setName(std.name);
    setClassId(std.classId);
    setRollNumber(std.rollNumber);
    setParentName(std.parentName || '');
    setStatus(std.status);
  };

  const updateClassStudentCount = async (cid: string) => {
    try {
      const count = await db.students.where('classId').equals(cid).count();
      const cls = await db.classes.get(cid);
      if (cls) {
        cls.studentCount = count;
        await db.classes.put(cls);
        await syncEngine.enqueue('classes', 'UPDATE', cls);
      }
    } catch (e) {
      logger.warn('Failed to update class student count:', e);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!name.trim()) {
      setErrorMessage('O nome do aluno é obrigatório.');
      return;
    }
    if (!classId) {
      setErrorMessage('É obrigatório selecionar uma turma.');
      return;
    }

    try {
      const targetId = editingStudent ? editingStudent.id : `std-${Date.now()}`;
      const originalClassId = editingStudent ? editingStudent.classId : null;

      const studentPayload = {
        id: targetId,
        classId,
        name: name.trim(),
        rollNumber,
        status,
        parentName: parentName.trim() || undefined,
        avatarUrl: editingStudent?.avatarUrl || `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=120`
      };

      // Write to Dexie
      await db.students.put(studentPayload);

      // Enqueue in syncQueue
      await syncEngine.enqueue('students', editingStudent ? 'UPDATE' : 'INSERT', studentPayload);

      // Recalculate student counts for involved classes
      await updateClassStudentCount(classId);
      if (originalClassId && originalClassId !== classId) {
        await updateClassStudentCount(originalClassId);
      }

      logger.info(`Aluno ${editingStudent ? 'atualizado' : 'cadastrado'} com sucesso no Dexie e fila de sync.`, studentPayload);
      setSuccessMessage(`Aluno "${name}" ${editingStudent ? 'salvo' : 'cadastrado'} com sucesso!`);
      resetForm();
    } catch (err) {
      logger.error('Erro ao salvar aluno no Dexie', { error: String(err) });
      setErrorMessage('Erro ao persistir o aluno localmente.');
    }
  };

  const handleDelete = async (studentId: string, studentName: string, studentClassId: string) => {
    if (confirm(`Tem certeza de que deseja excluir o aluno "${studentName}"?`)) {
      try {
        await db.students.delete(studentId);
        await syncEngine.enqueue('students', 'DELETE', { id: studentId });

        // Recalculate student counts
        await updateClassStudentCount(studentClassId);

        logger.info(`Aluno ${studentName} excluído com sucesso.`);
        setSuccessMessage(`Aluno "${studentName}" excluído.`);
        resetForm();
      } catch (err) {
        logger.error('Erro ao excluir aluno', { error: String(err) });
        setErrorMessage('Erro ao excluir aluno do banco de dados.');
      }
    }
  };

  // Filter students based on search and class filter
  const filteredStudents = students.filter((std) => {
    const matchesSearch = std.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesClass = classFilter ? std.classId === classFilter : true;
    return matchesSearch && matchesClass;
  });

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 w-full max-w-5xl rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row h-[85vh] max-h-[680px]">
        
        {/* Left Side: Students List, Filters & Search */}
        <div className="w-full md:w-3/5 p-5 border-r border-slate-800 flex flex-col h-full bg-slate-900/60">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-base font-black text-white flex items-center gap-2">
              <Users className="w-5 h-5 text-emerald-400" />
              Gestão de Alunos ({students.length})
            </h3>
            <button
              onClick={() => {
                setIsAdding(true);
                setEditingStudent(null);
                setName('');
                setRollNumber(students.length + 1);
                setParentName('');
                setStatus('active');
              }}
              className="px-2.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-extrabold rounded-lg text-xs transition-all flex items-center gap-1 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5 stroke-[3]" />
              Novo Aluno
            </button>
          </div>

          {/* Search & Filter Controls */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4 bg-slate-950/30 p-2 border border-slate-850 rounded-xl">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Pesquisar por nome..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 focus:outline-none focus:border-emerald-500 rounded-lg py-1.5 pl-8 pr-3 text-xs text-slate-200"
              />
            </div>

            <div className="relative flex items-center gap-1">
              <Filter className="w-3.5 h-3.5 text-slate-500 shrink-0" />
              <select
                value={classFilter}
                onChange={(e) => setClassFilter(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 focus:outline-none focus:border-emerald-500 rounded-lg py-1.5 px-2 text-[11px] text-slate-400 font-medium"
              >
                <option value="">Filtrar: Todas as Turmas</option>
                {classes.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto pr-1">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-850 bg-slate-950/30 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                  <th className="py-2.5 px-3 text-center w-12">Nº</th>
                  <th className="py-2.5 px-3">Estudante</th>
                  <th className="py-2.5 px-3">Turma</th>
                  <th className="py-2.5 px-3 text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-850/60 text-xs">
                {filteredStudents.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="text-center py-12 text-slate-500 text-xs">
                      Nenhum aluno localizado com os filtros selecionados.
                    </td>
                  </tr>
                ) : (
                  filteredStudents.map((std) => {
                    const studentClass = classes.find((c) => c.id === std.classId);
                    const isSelected = editingStudent?.id === std.id;
                    return (
                      <tr
                        key={std.id}
                        className={`hover:bg-slate-850/20 transition-colors cursor-pointer ${
                          isSelected ? 'bg-slate-850/70 border-l-2 border-emerald-500' : ''
                        }`}
                        onClick={() => handleEdit(std)}
                      >
                        <td className="py-3 px-3 text-center font-mono font-bold text-slate-400">
                          {std.rollNumber}
                        </td>
                        <td className="py-3 px-3">
                          <p className="font-extrabold text-white">{std.name}</p>
                          {std.parentName && (
                            <p className="text-[10px] text-slate-400 font-medium truncate max-w-[150px]">
                              Resp: {std.parentName}
                            </p>
                          )}
                        </td>
                        <td className="py-3 px-3">
                          <span className="bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 px-1.5 py-0.5 rounded text-[10px] font-bold uppercase">
                            {studentClass ? studentClass.code : 'S/T'}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-right" onClick={(e) => e.stopPropagation()}>
                          <button
                            onClick={() => handleDelete(std.id, std.name, std.classId)}
                            className="p-1 hover:bg-rose-500/15 text-slate-500 hover:text-rose-400 rounded transition-colors cursor-pointer"
                            title="Excluir Aluno"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Side: Form View (Add / Edit) */}
        <div className="w-full md:w-2/5 p-6 flex flex-col justify-between bg-slate-900 h-full relative">
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1 hover:bg-slate-800 text-slate-400 hover:text-slate-200 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex-1 overflow-y-auto pr-1">
            <h3 className="text-base font-black text-white mb-4 flex items-center gap-2">
              {editingStudent ? (
                <>
                  <Edit2 className="w-4 h-4 text-emerald-400" />
                  Editar Estudante
                </>
              ) : isAdding ? (
                <>
                  <Plus className="w-4 h-4 text-emerald-400" />
                  Novo Cadastro de Aluno
                </>
              ) : (
                <>
                  <GraduationCap className="w-4 h-4 text-slate-400" />
                  Selecione um aluno para editar
                </>
              )}
            </h3>

            {/* Alerts */}
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

            {(editingStudent || isAdding) ? (
              <form onSubmit={handleSave} className="space-y-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                    Nome Completo do Aluno
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ex: Pedro Henrique Souza"
                    className="w-full bg-slate-950 border border-slate-800 focus:outline-none focus:border-emerald-500 rounded-xl px-3 py-2 text-xs sm:text-sm text-slate-200"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                    Turma Vinculada
                  </label>
                  <select
                    value={classId}
                    onChange={(e) => setClassId(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 focus:outline-none focus:border-emerald-500 rounded-xl px-3 py-2 text-xs text-slate-200"
                  >
                    <option value="" disabled>Selecione uma turma ativa</option>
                    {classes.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                      Nº na Chamada
                    </label>
                    <input
                      type="number"
                      required
                      min={1}
                      max={100}
                      value={rollNumber}
                      onChange={(e) => setRollNumber(parseInt(e.target.value) || 1)}
                      className="w-full bg-slate-950 border border-slate-800 focus:outline-none focus:border-emerald-500 rounded-xl px-3 py-2 text-xs text-slate-200"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                      Status do Aluno
                    </label>
                    <select
                      value={status}
                      onChange={(e: any) => setStatus(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 focus:outline-none focus:border-emerald-500 rounded-xl px-3 py-2 text-xs text-slate-200"
                    >
                      <option value="active">Ativo</option>
                      <option value="transferred">Transferido</option>
                      <option value="inactive">Inativo</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                    Nome do Responsável
                  </label>
                  <input
                    type="text"
                    value={parentName}
                    onChange={(e) => setParentName(e.target.value)}
                    placeholder="Ex: Maria Alice Souza"
                    className="w-full bg-slate-950 border border-slate-800 focus:outline-none focus:border-emerald-500 rounded-xl px-3 py-2 text-xs sm:text-sm text-slate-200"
                  />
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
                    Salvar Aluno
                  </button>
                </div>
              </form>
            ) : (
              <div className="h-48 flex flex-col items-center justify-center text-slate-500 text-xs text-center border-2 border-dashed border-slate-800 rounded-2xl p-6">
                <Users className="w-8 h-8 text-slate-600 mb-2" />
                <p className="max-w-[180px]">Escolha um aluno da lista ao lado para alterar os dados ou clique em <strong>"Novo Aluno"</strong> para cadastrar.</p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
