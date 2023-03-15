import { StrictMode, useEffect } from 'react';
import * as ReactDOM from 'react-dom/client';
import './styles.scss';

import { Device } from '@capacitor/device';
import { i18n } from '@lingui/core';
import { I18nProvider } from '@lingui/react';
import { ThemeProvider } from '@mui/material';
import { RouterProvider } from 'react-router-dom';
import { AuthProvider } from './app/store/AuthProvider';
import { ReactQueryProvider } from './app/store/ReactQueryProvider';
import { dynamicActivate } from './i18n';
import { router } from './router';
import { materialTheme } from './theme/material-theme';

const I18nApp = () => {
  useEffect(() => {
    // With this method we dynamically load the catalogs
    const activate = async () => {
      const defaultLocale = await Device.getLanguageCode();
      dynamicActivate(defaultLocale.value);
    };
    activate();
  }, []);

  return (
    <ReactQueryProvider>
      <I18nProvider i18n={i18n} forceRenderOnLocaleChange={false}>
        <ThemeProvider theme={materialTheme}>
          <AuthProvider>
            <RouterProvider router={router} />
          </AuthProvider>
        </ThemeProvider>
      </I18nProvider>
    </ReactQueryProvider>
  );
};

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <I18nApp />
  </StrictMode>
);
