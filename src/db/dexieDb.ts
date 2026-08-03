import Dexie, { Table } from 'dexie';
import { logger } from '../lib/logger';
import { SchoolClass, Student } from '../types';

export interface AttendanceRecord {
  id?: string;
  studentId: string;
  classId: string;
  date: string; // YYYY-MM-DD
  status: 'PRESENT' | 'ABSENT' | 'LATE';
  synced: boolean;
  updatedAt: string;
}

export interface StudentLog {
  id?: string;
  studentId: string;
  classId: string;
  type: 'PRAISE' | 'WARNING' | 'OBSERVATION' | 'ATTENTION';
  tag: string; // "Participativo", "Falta de Material", "Atitude Exemplar", "Necessita Atenção"
  description: string;
  date: string; // YYYY-MM-DD
  updatedAt: string;
  synced: boolean;
}

export interface GradeRecord {
  id?: string;
  studentId: string;
  classId: string;
  subject: string;
  evaluationName: string;
  grade: number;
  date: string; // YYYY-MM-DD
  updatedAt: string;
  synced: boolean;
}

export interface SyncQueueItem {
  id?: number;
  table: string;
  action: 'INSERT' | 'UPDATE' | 'DELETE';
  payload: any;
  createdAt: string;
}

export class EducaFlowDB extends Dexie {
  attendances!: Table<AttendanceRecord>;
  studentLogs!: Table<StudentLog>;
  grades!: Table<GradeRecord>;
  syncQueue!: Table<SyncQueueItem>;
  classes!: Table<SchoolClass & { teacherId?: string }>;
  students!: Table<Student & { parentName?: string }>;

  constructor() {
    super('EducaFlowDB');
    this.version(3).stores({
      attendances: '++id, studentId, [classId+date], synced',
      studentLogs: '++id, studentId, classId, date, type',
      grades: '++id, studentId, classId, date, subject',
      syncQueue: '++id, table, createdAt',
      classes: 'id, code, name, year, grade, shift, teacherId',
      students: 'id, classId, name, rollNumber, status'
    });
  }
}

export const db = new EducaFlowDB();

export async function initializeDexieSeedData(): Promise<boolean> {
  try {
    const classesCount = await db.classes.count();
    if (classesCount === 0) {
      logger.info('Iniciando população de turmas demonstrativas no Dexie...');
      const sampleClasses: (SchoolClass & { teacherId?: string })[] = [
        {
          id: 'cls-3a-2026',
          code: 'EF1-3A',
          name: 'Turma 3º Ano A - Matutino',
          year: 2026,
          grade: '3º Ano',
          shift: 'Matutino',
          studentCount: 5,
          teacherId: 'usr-prof-2026', // Marta
        },
        {
          id: 'cls-3b-2026',
          code: 'EF1-3B',
          name: 'Turma 3º Ano B - Vespertino',
          year: 2026,
          grade: '3º Ano',
          shift: 'Vespertino',
          studentCount: 5,
          teacherId: 'usr-prof-2026', // Marta
        },
        {
          id: 'cls-4a-2026',
          code: 'EF1-4A',
          name: 'Turma 4º Ano A - Matutino',
          year: 2026,
          grade: '4º Ano',
          shift: 'Matutino',
          studentCount: 5,
          teacherId: 'usr-prof-carlos', // Carlos
        },
        {
          id: 'cls-5a-2026',
          code: 'EF1-5B',
          name: 'Turma 5º Ano B - Integral',
          year: 2026,
          grade: '5º Ano',
          shift: 'Vespertino',
          studentCount: 5,
          teacherId: 'usr-prof-renata', // Renata
        }
      ];
      await db.classes.bulkPut(sampleClasses);
    }

    const studentsCount = await db.students.count();
    if (studentsCount === 0) {
      logger.info('Iniciando população de alunos demonstrativos no Dexie...');
      const sampleStudents: (Student & { parentName?: string })[] = [
        // Class 3º Ano A - Matutino (Marta)
        { id: 'std-001', classId: 'cls-3a-2026', name: 'Ana Clara Silva', rollNumber: 1, status: 'active', parentName: 'Marcos Silva' },
        { id: 'std-002', classId: 'cls-3a-2026', name: 'Bernardo Oliveira', rollNumber: 2, status: 'active', parentName: 'Renata Oliveira' },
        { id: 'std-003', classId: 'cls-3a-2026', name: 'Carlos Eduardo Santos', rollNumber: 3, status: 'active', parentName: 'Aline Santos' },
        { id: 'std-004', classId: 'cls-3a-2026', name: 'Daniela Lima', rollNumber: 4, status: 'active', parentName: 'Juliana Lima' },
        { id: 'std-005', classId: 'cls-3a-2026', name: 'Enzo Gabriel Ferreira', rollNumber: 5, status: 'active', parentName: 'Reginaldo Ferreira' },

        // Class 3º Ano B - Vespertino (Marta)
        { id: 'std-006', classId: 'cls-3b-2026', name: 'Felipe Ramos Barbosa', rollNumber: 1, status: 'active', parentName: 'Lúcia Ramos' },
        { id: 'std-007', classId: 'cls-3b-2026', name: 'Gabriela Costa Mendes', rollNumber: 2, status: 'active', parentName: 'Patrícia Costa' },
        { id: 'std-008', classId: 'cls-3b-2026', name: 'Heitor Souza Albuquerque', rollNumber: 3, status: 'active', parentName: 'Roberto Souza' },
        { id: 'std-009', classId: 'cls-3b-2026', name: 'Isadora Rocha Dias', rollNumber: 4, status: 'active', parentName: 'Cláudia Rocha' },
        { id: 'std-010', classId: 'cls-3b-2026', name: 'João Vitor Rezende', rollNumber: 5, status: 'active', parentName: 'Sérgio Rezende' },

        // Class 4º Ano A - Matutino (Carlos)
        { id: 'std-011', classId: 'cls-4a-2026', name: 'Kauã Silva Rodrigues', rollNumber: 1, status: 'active', parentName: 'Alessandra Silva' },
        { id: 'std-012', classId: 'cls-4a-2026', name: 'Larissa Mendes Fonseca', rollNumber: 2, status: 'active', parentName: 'Edson Mendes' },
        { id: 'std-013', classId: 'cls-4a-2026', name: 'Matheus Reis Garcia', rollNumber: 3, status: 'active', parentName: 'Sandra Reis' },
        { id: 'std-014', classId: 'cls-4a-2026', name: 'Nicole Cruz Peixoto', rollNumber: 4, status: 'active', parentName: 'Amanda Cruz' },
        { id: 'std-015', classId: 'cls-4a-2026', name: 'Otávio Melo Franco', rollNumber: 5, status: 'active', parentName: 'Geraldo Melo' },

        // Class 5º Ano B - Integral (Renata)
        { id: 'std-016', classId: 'cls-5a-2026', name: 'Pedro Alves Custódio', rollNumber: 1, status: 'active', parentName: 'Carla Alves' },
        { id: 'std-017', classId: 'cls-5a-2026', name: 'Rebeca Duarte Moreira', rollNumber: 2, status: 'active', parentName: 'Daniel Moreira' },
        { id: 'std-018', classId: 'cls-5a-2026', name: 'Samuel Teixeira Neves', rollNumber: 3, status: 'active', parentName: 'Marcos Teixeira' },
        { id: 'std-019', classId: 'cls-5a-2026', name: 'Yasmin Barbosa Lima', rollNumber: 4, status: 'active', parentName: 'Carla Barbosa' },
        { id: 'std-020', classId: 'cls-5a-2026', name: 'William Nunes Prado', rollNumber: 5, status: 'active', parentName: 'Simone Nunes' },
      ];
      await db.students.bulkPut(sampleStudents);
    }

    const attendanceCount = await db.attendances.count();
    if (attendanceCount === 0) {
      logger.info('Iniciando população automática de dados demonstrativos do Dexie...');

      const todayStr = new Date().toISOString().split('T')[0];
      const sampleAttendance: AttendanceRecord[] = [
        {
          studentId: 'std-001',
          classId: 'cls-3a-2026',
          date: todayStr,
          status: 'PRESENT',
          synced: false,
          updatedAt: new Date().toISOString(),
        },
        {
          studentId: 'std-002',
          classId: 'cls-3a-2026',
          date: todayStr,
          status: 'PRESENT',
          synced: false,
          updatedAt: new Date().toISOString(),
        },
        {
          studentId: 'std-003',
          classId: 'cls-3a-2026',
          date: todayStr,
          status: 'ABSENT',
          synced: false,
          updatedAt: new Date().toISOString(),
        },
        {
          studentId: 'std-004',
          classId: 'cls-3a-2026',
          date: todayStr,
          status: 'LATE',
          synced: false,
          updatedAt: new Date().toISOString(),
        },
        {
          studentId: 'std-005',
          classId: 'cls-3a-2026',
          date: todayStr,
          status: 'PRESENT',
          synced: false,
          updatedAt: new Date().toISOString(),
        },
      ];

      await db.attendances.bulkPut(sampleAttendance);

      logger.info('Dados demonstrativos de presença do Dexie semeados com sucesso!', {
        attendance: sampleAttendance.length,
      });
    }

    const logsCount = await db.studentLogs.count();
    if (logsCount === 0) {
      const todayStr = new Date().toISOString().split('T')[0];
      const sampleLogs: StudentLog[] = [
        {
          studentId: 'std-001',
          classId: 'cls-3a-2026',
          type: 'PRAISE',
          tag: 'Participativo',
          description: 'Muito participativa e ajudou a explicar o problema de matemática para os colegas.',
          date: todayStr,
          synced: false,
          updatedAt: new Date().toISOString(),
        },
        {
          studentId: 'std-003',
          classId: 'cls-3a-2026',
          type: 'WARNING',
          tag: 'Falta de Material',
          description: 'Esqueceu o caderno de língua portuguesa e o estojo.',
          date: todayStr,
          synced: false,
          updatedAt: new Date().toISOString(),
        },
        {
          studentId: 'std-004',
          classId: 'cls-3a-2026',
          type: 'ATTENTION',
          tag: 'Necessita Atenção',
          description: 'Demonstrou dispersão e cansaço excessivo durante as explicações.',
          date: todayStr,
          synced: false,
          updatedAt: new Date().toISOString(),
        }
      ];

      await db.studentLogs.bulkPut(sampleLogs);
      logger.info('Dados demonstrativos de ocorrências do Dexie semeados com sucesso!', {
        logs: sampleLogs.length,
      });
    }

    const gradesCount = await db.grades.count();
    if (gradesCount === 0) {
      const todayStr = new Date().toISOString().split('T')[0];
      const sampleGrades: GradeRecord[] = [
        {
          studentId: 'std-001',
          classId: 'cls-3a-2026',
          subject: 'Matemática',
          evaluationName: 'Atividade Prática Frações',
          grade: 9.5,
          date: todayStr,
          synced: false,
          updatedAt: new Date().toISOString(),
        },
        {
          studentId: 'std-002',
          classId: 'cls-3a-2026',
          subject: 'Matemática',
          evaluationName: 'Atividade Prática Frações',
          grade: 8.0,
          date: todayStr,
          synced: false,
          updatedAt: new Date().toISOString(),
        },
        {
          studentId: 'std-003',
          classId: 'cls-3a-2026',
          subject: 'Matemática',
          evaluationName: 'Atividade Prática Frações',
          grade: 7.0,
          date: todayStr,
          synced: false,
          updatedAt: new Date().toISOString(),
        }
      ];

      await db.grades.bulkPut(sampleGrades);
      logger.info('Dados demonstrativos de notas do Dexie semeados com sucesso!', {
        grades: sampleGrades.length,
      });
    }

    return true;
  } catch (err) {
    logger.error('Erro ao inicializar semente do Dexie', { error: String(err) });
    return false;
  }
}

