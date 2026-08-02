import { useEffect } from 'react';
import { useNetworkStore } from '../stores/useNetworkStore';
import { logger } from '../lib/logger';

export function useNetworkStatus() {
  const { setOnlineStatus, isOnline } = useNetworkStore();

  useEffect(() => {
    const handleOnline = () => {
      logger.info('Conexão com a Internet REESTABELECIDA');
      setOnlineStatus(true);
    };

    const handleOffline = () => {
      logger.warn('Modo OFFLINE ativado! Mutações serão gravadas na fila local Dexie.');
      setOnlineStatus(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [setOnlineStatus]);

  return { isOnline };
}
