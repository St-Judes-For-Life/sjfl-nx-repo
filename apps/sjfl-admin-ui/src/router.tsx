import { RouteObject, createBrowserRouter } from 'react-router-dom';
import { App } from './app/app';
import { LoginPage } from './app/modules/auth/LoginPage';
import { ProtectedLayout } from './app/layouts/ProtectedLayout';
import { AuthLayout } from './app/modules/auth/AuthLayout';

export const routes: RouteObject[] = [
  {
    path: '',
    element: <ProtectedLayout />,
    children: [
      {
        path: '',
        element: <App />,
        children: [
          {
            path: '',
            lazy: async () => {
              const { OverviewPage } = await import(
                './app/modules/overview/OverviewPage'
              );
              return { Component: OverviewPage };
            },
          },

          {
            path: 'aid',
            children: [
              {
                path: '',
                lazy: async () => {
                  const { AidPage } = await import('./app/modules/aid/AidPage');
                  return { Component: AidPage };
                },
              },
              {
                path: ':id',
                lazy: async () => {
                  const { AidPage } = await import('./app/modules/aid/AidPage');
                  return { Component: AidPage };
                },
              },
            ],
          },
          {
            path: 'counselling',
            children: [
              {
                path: '',
                lazy: async () => {
                  const { CounsellingPage } = await import(
                    './app/modules/counselling/CounsellingPage'
                  );
                  return { Component: CounsellingPage };
                },
              },
              {
                path: ':id',
                lazy: async () => {
                  const { CounsellingRequestPage } = await import(
                    './app/modules/counselling/CounsellingRequestPage'
                  );
                  return { Component: CounsellingRequestPage };
                },
              },
            ],
          },
          {
            path: 'judians',
            children: [
              {
                path: '',
                lazy: async () => {
                  const { JudiansPage } = await import(
                    './app/modules/judians/pages/JudiansPage'
                  );
                  return { Component: JudiansPage };
                },
              },
              {
                path: ':id',
                lazy: async () => {
                  const { JudianDetailPage } = await import(
                    './app/modules/judians/pages/JudianDetailPage'
                  );
                  return { Component: JudianDetailPage };
                },
              },
            ],
          },
          {
            path: 'settings',
            lazy: async () => {
              const { SettingsPage } = await import(
                './app/modules/settings/SettingsPage'
              );
              return { Component: SettingsPage };
            },
          },
        ],
      },
    ],
  },

  {
    path: 'auth',
    element: <AuthLayout />,
    children: [
      {
        path: 'login',
        element: <LoginPage />,
      },
    ],
  },
];

export const router = createBrowserRouter(routes);
