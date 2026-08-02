import { useEffect } from 'react';
import { syncEngine } from '../services/syncEngine';
import { useNetworkStore } from '../stores/useNetworkStore';
import { AppConstants } from '../constants';

export function useOfflineSync() {
  const { isOnline, isSyncing, pendingSyncCount, lastSyncTimestamp } = useNetworkStore();

  useEffect(() => {
    if (isOnline) {
      syncEngine.processQueue();

      const interval = setInterval(() => {
        syncEngine.processQueue();
      }, AppConstants.SYNC_INTERVAL_MS);

      return () => clearInterval(interval);
    }
  }, [isOnline]);

  const triggerManualSync = async () => {
    return await syncEngine.processQueue();
  };

  return {
    isOnline,
    isSyncing,
    pendingSyncCount,
    lastSyncTimestamp,
    triggerManualSync,
  };
}
