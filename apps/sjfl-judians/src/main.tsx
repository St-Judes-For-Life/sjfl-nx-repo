import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import './styles.scss';

import { ThemeProvider } from '@mui/material';
import { RouterProvider } from 'react-router-dom';
import { AuthProvider } from './app/store/AuthProvider';
import { InternationalizationProvider } from './app/store/InternationalizationProvider';
import { ReactQueryProvider } from './app/store/ReactQueryProvider';
import { router } from './router';
import { materialTheme } from './theme/material-theme';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <InternationalizationProvider>
      <ReactQueryProvider>
        <ThemeProvider theme={materialTheme}>
          <AuthProvider>
            <RouterProvider router={router} />
          </AuthProvider>
        </ThemeProvider>
      </ReactQueryProvider>
    </InternationalizationProvider>
  </StrictMode>
);
