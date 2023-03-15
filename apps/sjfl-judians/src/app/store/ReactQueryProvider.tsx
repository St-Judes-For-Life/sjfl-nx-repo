import { Capacitor } from '@capacitor/core';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import {
  PersistQueryClientOptions,
  PersistQueryClientProvider,
} from '@tanstack/react-query-persist-client';
import { FC, PropsWithChildren } from 'react';
import { createIDBPersister, queryClient } from '../utils/react-query';

const persister = createIDBPersister();

export const ReactQueryProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <PersistQueryClientProvider
      client={queryClient}
      onSuccess={() => {
        console.log('success loading');
      }}
      persistOptions={
        {
          persister,
        } satisfies Omit<PersistQueryClientOptions, 'queryClient'>
      }
    >
      {children}
      {!Capacitor.isNativePlatform() && <ReactQueryDevtools />}
    </PersistQueryClientProvider>
  );
};
