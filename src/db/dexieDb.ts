import Dexie, { Table } from 'dexie';
import {
  SchoolClass,
  Student,
  AttendanceRecord,
  LessonJournal,
  LessonPlan,
  SyncQueueItem,
} from '../types';
import { AppConstants } from '../constants';
import { logger } from '../lib/logger';

export class EducaflowDexieDb extends Dexie {
  classes!: Table<SchoolClass, string>;
  students!: Table<Student, string>;
  attendance!: Table<AttendanceRecord, string>;
  lessonJournals!: Table<LessonJournal, string>;
  lessonPlans!: Table<LessonPlan, string>;
  syncQueue!: Table<SyncQueueItem, number>;

  constructor() {
    super(AppConstants.DEXIE_DB_NAME);

    this.version(AppConstants.DEXIE_DB_VERSION).stores({
      classes: 'id, code, name, grade',
      students: 'id, classId, name, rollNumber',
      attendance: 'id, studentId, classId, date, status, synced',
      lessonJournals: 'id, classId, date, synced',
      lessonPlans: 'id, grade, subject, synced',
      syncQueue: '++id, uuid, entity, action, status, createdAt',
    });
  }
}

export const db = new EducaflowDexieDb();

export async function initializeDexieSeedData(): Promise<boolean> {
  try {
    const classCount = await db.classes.count();
    if (classCount === 0) {
      logger.info('Iniciando população automática de dados demonstrativos do Dexie...');

      const sampleClass: SchoolClass = {
        id: 'cls-3a-2026',
        code: 'EF1-3A',
        name: 'Turma 3º Ano A - Matutino',
        year: 2026,
        grade: '3º Ano',
        shift: 'Matutino',
        studentCount: 5,
      };

      await db.classes.put(sampleClass);

      const sampleStudents: Student[] = [
        { id: 'std-001', classId: 'cls-3a-2026', name: 'Ana Clara Silva', rollNumber: 1, status: 'active' },
        { id: 'std-002', classId: 'cls-3a-2026', name: 'Bernardo Oliveira', rollNumber: 2, status: 'active' },
        { id: 'std-003', classId: 'cls-3a-2026', name: 'Carlos Eduardo Santos', rollNumber: 3, status: 'active' },
        { id: 'std-004', classId: 'cls-3a-2026', name: 'Daniela Lima', rollNumber: 4, status: 'active' },
        { id: 'std-005', classId: 'cls-3a-2026', name: 'Enzo Gabriel Ferreira', rollNumber: 5, status: 'active' },
      ];

      await db.students.bulkPut(sampleStudents);

      const todayStr = new Date().toISOString().split('T')[0];
      const sampleAttendance: AttendanceRecord[] = sampleStudents.map((std, idx) => ({
        id: `att-${std.id}-${todayStr}`,
        studentId: std.id,
        classId: 'cls-3a-2026',
        date: todayStr,
        status: idx === 3 ? 'absent' : 'present',
        synced: false,
        updatedAt: new Date().toISOString(),
      }));

      await db.attendance.bulkPut(sampleAttendance);

      logger.info('Dados demonstrativos do Dexie semeados com sucesso!', {
        classes: 1,
        students: sampleStudents.length,
        attendance: sampleAttendance.length,
      });
    }
    return true;
  } catch (err) {
    logger.error('Erro ao inicializar semente do Dexie', { error: String(err) });
    return false;
  }
}
