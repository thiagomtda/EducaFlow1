import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../db/dexieDb';
import { useAuthStore } from '../stores/useAuthStore';

// Rich Mock Classes with assigned Teacher IDs (RBAC alignment)
const MOCK_CLASSES = [
  {
    id: 'cls-3a-2026',
    code: 'EF1-3A',
    name: 'Turma 3º Ano A - Matutino',
    year: 2026,
    grade: '3º Ano' as const,
    shift: 'Matutino' as const,
    studentCount: 5,
    teacherId: 'usr-prof-2026', // Marta
  },
  {
    id: 'cls-3b-2026',
    code: 'EF1-3B',
    name: 'Turma 3º Ano B - Vespertino',
    year: 2026,
    grade: '3º Ano' as const,
    shift: 'Vespertino' as const,
    studentCount: 5,
    teacherId: 'usr-prof-2026', // Marta
  },
  {
    id: 'cls-4a-2026',
    code: 'EF1-4A',
    name: 'Turma 4º Ano A - Matutino',
    year: 2026,
    grade: '4º Ano' as const,
    shift: 'Matutino' as const,
    studentCount: 5,
    teacherId: 'usr-prof-carlos', // Carlos
  },
  {
    id: 'cls-5a-2026',
    code: 'EF1-5B',
    name: 'Turma 5º Ano B - Integral',
    year: 2026,
    grade: '5º Ano' as const,
    shift: 'Vespertino' as const,
    studentCount: 5,
    teacherId: 'usr-prof-renata', // Renata
  }
];

// Students mapped to specific Class IDs
const MOCK_STUDENTS = [
  // Class 3º Ano A - Matutino (Marta)
  { id: 'std-001', classId: 'cls-3a-2026', name: 'Ana Clara Silva', rollNumber: 1, status: 'active' as const },
  { id: 'std-002', classId: 'cls-3a-2026', name: 'Bernardo Oliveira', rollNumber: 2, status: 'active' as const },
  { id: 'std-003', classId: 'cls-3a-2026', name: 'Carlos Eduardo Santos', rollNumber: 3, status: 'active' as const },
  { id: 'std-004', classId: 'cls-3a-2026', name: 'Daniela Lima', rollNumber: 4, status: 'active' as const },
  { id: 'std-005', classId: 'cls-3a-2026', name: 'Enzo Gabriel Ferreira', rollNumber: 5, status: 'active' as const },

  // Class 3º Ano B - Vespertino (Marta)
  { id: 'std-006', classId: 'cls-3b-2026', name: 'Felipe Ramos Barbosa', rollNumber: 1, status: 'active' as const },
  { id: 'std-007', classId: 'cls-3b-2026', name: 'Gabriela Costa Mendes', rollNumber: 2, status: 'active' as const },
  { id: 'std-008', classId: 'cls-3b-2026', name: 'Heitor Souza Albuquerque', rollNumber: 3, status: 'active' as const },
  { id: 'std-009', classId: 'cls-3b-2026', name: 'Isadora Rocha Dias', rollNumber: 4, status: 'active' as const },
  { id: 'std-010', classId: 'cls-3b-2026', name: 'João Vitor Rezende', rollNumber: 5, status: 'active' as const },

  // Class 4º Ano A - Matutino (Carlos)
  { id: 'std-011', classId: 'cls-4a-2026', name: 'Kauã Silva Rodrigues', rollNumber: 1, status: 'active' as const },
  { id: 'std-012', classId: 'cls-4a-2026', name: 'Larissa Mendes Fonseca', rollNumber: 2, status: 'active' as const },
  { id: 'std-013', classId: 'cls-4a-2026', name: 'Matheus Reis Garcia', rollNumber: 3, status: 'active' as const },
  { id: 'std-014', classId: 'cls-4a-2026', name: 'Nicole Cruz Peixoto', rollNumber: 4, status: 'active' as const },
  { id: 'std-015', classId: 'cls-4a-2026', name: 'Otávio Melo Franco', rollNumber: 5, status: 'active' as const },

  // Class 5º Ano B - Integral (Renata)
  { id: 'std-016', classId: 'cls-5a-2026', name: 'Pedro Alves Custódio', rollNumber: 1, status: 'active' as const },
  { id: 'std-017', classId: 'cls-5a-2026', name: 'Rebeca Duarte Moreira', rollNumber: 2, status: 'active' as const },
  { id: 'std-018', classId: 'cls-5a-2026', name: 'Samuel Teixeira Neves', rollNumber: 3, status: 'active' as const },
  { id: 'std-019', classId: 'cls-5a-2026', name: 'Yasmin Barbosa Lima', rollNumber: 4, status: 'active' as const },
  { id: 'std-020', classId: 'cls-5a-2026', name: 'William Nunes Prado', rollNumber: 5, status: 'active' as const },
];

export function useDexieData() {
  const { user } = useAuthStore();
  const classesList = useLiveQuery(() => db.classes.toArray(), [], []);
  const studentsList = useLiveQuery(() => db.students.toArray(), [], []);
  const attendanceRecords = useLiveQuery(() => db.attendances.toArray(), [], []);
  const studentLogs = useLiveQuery(() => db.studentLogs.toArray(), [], []);
  const grades = useLiveQuery(() => db.grades.toArray(), [], []);
  const syncQueue = useLiveQuery(() => db.syncQueue.toArray(), [], []);

  // Filter classes based on role and id
  const allowedClasses = (classesList || []).filter((cls) => {
    if (!user) return false;
    // Admin sees all
    if (user.role === 'admin' || user.role === 'ADMIN') return true;
    // Teacher sees only assigned
    return cls.teacherId === user.id;
  });

  // Filter students based on allowed classes
  const allowedClassIds = allowedClasses.map((c) => c.id);
  const allowedStudents = (studentsList || []).filter((std) => allowedClassIds.includes(std.classId));

  return {
    classes: allowedClasses,
    students: allowedStudents,
    allClasses: classesList || [],
    allStudents: studentsList || [],
    attendanceRecords: attendanceRecords || [],
    studentLogs: studentLogs || [],
    grades: grades || [],
    syncQueue: syncQueue || [],
    isLoaded: 
      classesList !== undefined && 
      studentsList !== undefined && 
      attendanceRecords !== undefined && 
      studentLogs !== undefined && 
      grades !== undefined,
  };
}
