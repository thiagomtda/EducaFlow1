import { AttendanceRecord, StudentLog } from '../db/dexieDb';
import { Student } from '../types';

export interface StudentRiskProfile {
  studentId: string;
  name: string;
  classId: string;
  className: string;
  riskLevel: 'HIGH' | 'MEDIUM' | 'NORMAL';
  attendanceRate: number; // 0 to 100
  consecutiveAbsences: number;
  recentAlertsCount: number;
  reasons: string[];
}

/**
 * Calculates the risk level and returns a risk profile for a single student.
 */
export function calculateStudentRisk(
  student: Student,
  classMap: Record<string, string>, // classId -> className
  attendances: AttendanceRecord[],
  logs: StudentLog[]
): StudentRiskProfile {
  // 1. Filter student data
  const studentAttendances = attendances.filter((a) => a.studentId === student.id);
  const studentLogs = logs.filter((l) => l.studentId === student.id);

  // 2. Attendance Rate
  const totalAttendances = studentAttendances.length;
  const absentRecords = studentAttendances.filter((a) => a.status === 'ABSENT');
  const attendanceRate = totalAttendances > 0 
    ? ((totalAttendances - absentRecords.length) / totalAttendances) * 100 
    : 100;

  // 3. Consecutive Absences (sorted by date)
  const sortedAttendances = [...studentAttendances].sort((a, b) => a.date.localeCompare(b.date));
  let maxConsecutiveAbsences = 0;
  let currentStreak = 0;
  for (const record of sortedAttendances) {
    if (record.status === 'ABSENT') {
      currentStreak++;
      if (currentStreak > maxConsecutiveAbsences) {
        maxConsecutiveAbsences = currentStreak;
      }
    } else {
      currentStreak = 0;
    }
  }

  // 4. Behavioral Alerts in the last 14 days
  const today = new Date();
  const fourteenDaysAgo = new Date(today.getTime() - 14 * 24 * 60 * 60 * 1000);
  const fourteenDaysAgoStr = fourteenDaysAgo.toISOString().split('T')[0];

  const recentAlerts = studentLogs.filter((l) => {
    const isBehavioral = l.type === 'WARNING' || l.type === 'ATTENTION';
    const isRecent = l.date >= fourteenDaysAgoStr;
    return isBehavioral && isRecent;
  });

  // 5. Classification Logic
  let riskLevel: 'HIGH' | 'MEDIUM' | 'NORMAL' = 'NORMAL';
  const reasons: string[] = [];

  // HIGH RISK
  if (totalAttendances > 0 && attendanceRate < 75) {
    riskLevel = 'HIGH';
    reasons.push(`Frequência abaixo de 75% (${attendanceRate.toFixed(1)}%)`);
  }
  if (maxConsecutiveAbsences >= 3) {
    riskLevel = 'HIGH';
    reasons.push(`${maxConsecutiveAbsences} faltas consecutivas na chamada`);
  }
  if (recentAlerts.length >= 2) {
    riskLevel = 'HIGH';
    reasons.push(`${recentAlerts.length} alertas comportamentais nos últimos 14 dias`);
  }

  // MEDIUM RISK (if not already high)
  if (riskLevel !== 'HIGH') {
    if (totalAttendances > 0 && attendanceRate >= 75 && attendanceRate < 85) {
      riskLevel = 'MEDIUM';
      reasons.push(`Frequência em nível de atenção (${attendanceRate.toFixed(1)}%)`);
    }
    if (recentAlerts.length === 1) {
      riskLevel = 'MEDIUM';
      reasons.push(`1 alerta comportamental recente (${recentAlerts[0].tag})`);
    }
  }

  return {
    studentId: student.id,
    name: student.name,
    classId: student.classId,
    className: classMap[student.classId] || 'Turma não identificada',
    riskLevel,
    attendanceRate,
    consecutiveAbsences: maxConsecutiveAbsences,
    recentAlertsCount: recentAlerts.length,
    reasons,
  };
}

/**
 * Scans all active/inactive students and generates risk profiles for them.
 */
export function scanAllStudentsRisk(
  students: Student[],
  classes: { id: string; name: string }[],
  attendances: AttendanceRecord[],
  logs: StudentLog[]
): StudentRiskProfile[] {
  const classMap: Record<string, string> = {};
  classes.forEach((c) => {
    classMap[c.id] = c.name;
  });

  return students.map((student) => 
    calculateStudentRisk(student, classMap, attendances, logs)
  );
}
