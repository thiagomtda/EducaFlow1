export type UserRole = 'teacher' | 'coordinator' | 'admin';

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  schoolName: string;
  avatarUrl?: string;
  createdAt: string;
}

export interface AuthSession {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
  user: UserProfile;
}

export interface AuthErrorState {
  code: string;
  message: string;
  details?: string;
}

export interface SchoolClass {
  id: string;
  code: string;
  name: string;
  year: number;
  grade: '1º Ano' | '2º Ano' | '3º Ano' | '4º Ano' | '5º Ano';
  shift: 'Matutino' | 'Vespertino' | 'Integral';
  studentCount: number;
}

export interface Student {
  id: string;
  classId: string;
  name: string;
  rollNumber: number;
  status: 'active' | 'transferred' | 'inactive';
  avatarUrl?: string;
}

export type AttendanceStatus = 'present' | 'absent' | 'justified' | 'late';

export interface AttendanceRecord {
  id: string;
  studentId: string;
  classId: string;
  date: string;
  status: AttendanceStatus;
  notes?: string;
  synced: boolean;
  updatedAt: string;
}

export interface LessonJournal {
  id: string;
  classId: string;
  date: string;
  subject: string;
  content: string;
  bnccCodes: string[];
  observations?: string;
  synced: boolean;
  createdAt: string;
}

export interface LessonPlan {
  id: string;
  title: string;
  grade: string;
  subject: string;
  objectives: string[];
  bnccCompetencies: string[];
  methodology: string;
  evaluation: string;
  generatedByAi: boolean;
  synced: boolean;
  createdAt: string;
}

export type SyncAction = 'CREATE' | 'UPDATE' | 'DELETE';
export type SyncEntity = 'attendance' | 'lessonJournal' | 'lessonPlan' | 'student';
export type SyncItemStatus = 'PENDING' | 'SYNCING' | 'SUCCESS' | 'ERROR';

export interface SyncQueueItem {
  id?: number;
  uuid: string;
  entity: SyncEntity;
  action: SyncAction;
  payload: Record<string, unknown>;
  status: SyncItemStatus;
  createdAt: string;
  retries: number;
  lastErrorMessage?: string;
}

export type ThemeMode = 'light' | 'dark' | 'system';

export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

export interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  context?: Record<string, unknown>;
}

export interface SystemHealthStatus {
  supabase: 'connected' | 'disconnected' | 'pending';
  dexie: 'active' | 'error' | 'pending';
  zustand: 'ready';
  tanstackQuery: 'ready';
  pwa: 'registered' | 'unsupported' | 'checking';
  network: 'online' | 'offline';
  logger: 'active';
  envValidation: 'valid' | 'invalid';
}
