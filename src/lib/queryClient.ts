import { QueryClient } from '@tanstack/react-query';
import { logger } from './logger';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 60 * 24, // 24 hours garbage collection cache
      retry: 2,
      refetchOnWindowFocus: false,
    },
    mutations: {
      onError: (error) => {
        logger.error('TanStack Query Mutation Error', { error: String(error) });
      },
    },
  },
});
