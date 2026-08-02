export class AppConstants {
  static readonly APP_NAME = 'EducaFlow';
  static readonly APP_SLOGAN = 'Plataforma para Professores do Ensino Fundamental I';
  static readonly DEXIE_DB_NAME = 'EducaflowLocalDb';
  static readonly DEXIE_DB_VERSION = 1;
  static readonly MAX_SYNC_RETRIES = 5;
  static readonly SYNC_INTERVAL_MS = 15000;
  static readonly STORAGE_THEME_KEY = 'educaflow_theme';
  static readonly STORAGE_AUTH_KEY = 'educaflow_auth_session';
}

export const GRADES_EF1 = [
  '1º Ano',
  '2º Ano',
  '3º Ano',
  '4º Ano',
  '5º Ano',
] as const;

export const SUBJECTS_EF1 = [
  'Língua Portuguesa',
  'Matemática',
  'Ciências',
  'Geografia',
  'História',
  'Arte',
  'Educação Física',
  'Ensino Religioso',
] as const;

export const SUPABASE_TABLES = {
  CLASSES: 'classes',
  STUDENTS: 'students',
  ATTENDANCE: 'attendance_records',
  LESSON_JOURNALS: 'lesson_journals',
  LESSON_PLANS: 'lesson_plans',
  SYNC_LOGS: 'sync_logs',
} as const;
