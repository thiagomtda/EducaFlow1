import { useEffect } from 'react';
import { db, AttendanceRecord } from '../db/dexieDb';
import { useNetworkStore } from '../stores/useNetworkStore';
import { processQueue, initAutoSync } from '../lib/syncEngine';

export async function saveAttendanceBatch(
  classId: string,
  date: string,
  records: { studentId: string; status: 'PRESENT' | 'ABSENT' | 'LATE' }[]
) {
  const timestamp = new Date().toISOString();

  await db.transaction('rw', [db.attendances, db.syncQueue], async () => {
    for (const record of records) {
      const attendanceData: AttendanceRecord = {
        studentId: record.studentId,
        classId,
        date,
        status: record.status,
        synced: false,
        updatedAt: timestamp,
      };

      // 1. Salva ou atualiza no IndexedDB local
      await db.attendances.put(attendanceData);

      // 2. Adiciona à fila de sincronização
      await db.syncQueue.add({
        table: 'attendances',
        action: 'UPDATE',
        payload: attendanceData,
        createdAt: timestamp,
      });
    }
  });

  // Atualiza o Zustand de forma reativa para que o número de alterações pendentes seja mostrado de imediato
  const pendingCount = await db.syncQueue.count();
  useNetworkStore.getState().setPendingSyncCount(pendingCount);

  // Se estiver online, processa a fila de forma automática
  if (typeof navigator !== 'undefined' && navigator.onLine) {
    processQueue();
  }
}

export function useAttendance() {
  const { isOnline, pendingSyncCount } = useNetworkStore();

  useEffect(() => {
    initAutoSync();
  }, []);

  const saveBatch = async (
    classId: string,
    date: string,
    records: { studentId: string; status: 'PRESENT' | 'ABSENT' | 'LATE' }[]
  ) => {
    await saveAttendanceBatch(classId, date, records);
  };

  return {
    saveAttendanceBatch: saveBatch,
    isOnline,
    pendingSyncCount,
  };
}

