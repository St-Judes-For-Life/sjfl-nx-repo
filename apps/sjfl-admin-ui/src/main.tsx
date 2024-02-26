import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';

import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './lib/queryClient';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router}></RouterProvider>
    </QueryClientProvider>
  </StrictMode>
);
