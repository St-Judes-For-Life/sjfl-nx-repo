import { QueryClient } from '@tanstack/react-query';
import {
  PersistedClient,
  Persister,
} from '@tanstack/react-query-persist-client';
import { asyncStore } from './async-storage/async-storage';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 60 * 24, // 24 hours
      // staleTime: Infinity,
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

/**
 * Creates a persister using
 */
export function createCustomPersister(idbValidKey: IDBValidKey = 'reactQuery') {
  return {
    persistClient: async (client: PersistedClient) => {
      asyncStore.set(idbValidKey as string, client);
    },
    restoreClient: async () => {
      return await asyncStore.get<PersistedClient>(idbValidKey as string);
    },
    removeClient: async () => {
      await asyncStore.delete(idbValidKey as string);
    },
  } as Persister;
}
