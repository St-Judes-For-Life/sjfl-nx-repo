import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';

import 'react-toastify/dist/ReactToastify.css';
import './styles.css';

import { ThemeProvider } from '@mui/material';
import { LocalizationProvider as DateLocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/en-in';
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from './app/shared/store/AuthProvider';
import { InternationalizationProvider } from './app/shared/store/InternationalizationProvider';
import { ReactQueryProvider } from './app/shared/store/ReactQueryProvider';
import { capacitorInit } from './app/shared/utils/capacitor';
import { Router } from './router/Router';
import { materialTheme } from './theme/material-theme';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <InternationalizationProvider>
      <DateLocalizationProvider
        dateAdapter={AdapterDayjs}
        adapterLocale="en-in"
      >
        <ReactQueryProvider>
          <ThemeProvider theme={materialTheme}>
            <AuthProvider>
              <Router />
            </AuthProvider>
          </ThemeProvider>
        </ReactQueryProvider>
        <ToastContainer position="top-center" />
      </DateLocalizationProvider>
    </InternationalizationProvider>
  </StrictMode>
);

capacitorInit();
