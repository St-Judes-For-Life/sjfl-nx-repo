import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';

import './styles.css';
import 'react-toastify/dist/ReactToastify.css';

import { ThemeProvider } from '@mui/material';
import { AuthProvider } from './app/shared/store/AuthProvider';
import { InternationalizationProvider } from './app/shared/store/InternationalizationProvider';
import { ReactQueryProvider } from './app/shared/store/ReactQueryProvider';
import { capacitorInit } from './app/shared/utils/capacitor';
import { Router } from './router/Router';
import { materialTheme } from './theme/material-theme';
import { ToastContainer } from 'react-toastify';
import { queryClient } from './app/shared/utils/react-query';
import { workflowConfigQuery } from './app/features/App/Aid/queries/aid-workflow.query';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <InternationalizationProvider>
      <ReactQueryProvider>
        <ThemeProvider theme={materialTheme}>
          <AuthProvider>
            <Router />
          </AuthProvider>
        </ThemeProvider>
      </ReactQueryProvider>
      <ToastContainer position="top-center" />
    </InternationalizationProvider>
  </StrictMode>
);

capacitorInit();
