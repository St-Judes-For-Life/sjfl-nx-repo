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
import { ToastService } from './app/shared/components/containers/Toast';
import { ToastContainer } from 'react-toastify';

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
    </InternationalizationProvider>
    <ToastContainer position="top-center" />
  </StrictMode>
);

capacitorInit();
