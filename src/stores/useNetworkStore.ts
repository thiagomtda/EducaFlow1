import { create } from 'zustand';

interface NetworkState {
  isOnline: boolean;
  pendingSyncCount: number;
  lastSyncTimestamp: string | null;
  isSyncing: boolean;
  setOnlineStatus: (isOnline: boolean) => void;
  setPendingSyncCount: (count: number) => void;
  setLastSyncTimestamp: (timestamp: string) => void;
  setIsSyncing: (isSyncing: boolean) => void;
}

export const useNetworkStore = create<NetworkState>((set) => ({
  isOnline: typeof navigator !== 'undefined' ? navigator.onLine : true,
  pendingSyncCount: 0,
  lastSyncTimestamp: null,
  isSyncing: false,

  setOnlineStatus: (isOnline) => set({ isOnline }),
  setPendingSyncCount: (pendingSyncCount) => set({ pendingSyncCount }),
  setLastSyncTimestamp: (lastSyncTimestamp) => set({ lastSyncTimestamp }),
  setIsSyncing: (isSyncing) => set({ isSyncing }),
}));
