import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../db/dexieDb';

export function useDexieData() {
  const classes = useLiveQuery(() => db.classes.toArray(), [], []);
  const students = useLiveQuery(() => db.students.toArray(), [], []);
  const attendanceRecords = useLiveQuery(() => db.attendance.toArray(), [], []);
  const syncQueue = useLiveQuery(() => db.syncQueue.toArray(), [], []);

  return {
    classes,
    students,
    attendanceRecords,
    syncQueue,
    isLoaded: classes !== undefined && students !== undefined,
  };
}
