import React, { useEffect } from 'react';
import { QueryProvider } from './QueryProvider';
import { AuthProvider } from './AuthProvider';
import { ThemeProvider } from './ThemeProvider';
import { useNetworkStatus } from '../hooks/useNetworkStatus';
import { initializeDexieSeedData } from '../db/dexieDb';
import { logger } from '../lib/logger';

function NetworkListener({ children }: { children: React.ReactNode }) {
  useNetworkStatus();

  useEffect(() => {
    initializeDexieSeedData().then((success) => {
      if (success) {
        logger.info('Dexie IndexedDB verificado e semeado.');
      }
    });
  }, []);

  return <>{children}</>;
}

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <QueryProvider>
      <AuthProvider>
        <ThemeProvider>
          <NetworkListener>{children}</NetworkListener>
        </ThemeProvider>
      </AuthProvider>
    </QueryProvider>
  );
}
