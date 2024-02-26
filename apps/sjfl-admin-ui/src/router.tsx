import { RouteObject, createBrowserRouter } from 'react-router-dom';
import { App } from './app/app';

export const routes: RouteObject[] = [
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
              const { CounsellingPage } = await import(
                './app/modules/counselling/CounsellingPage'
              );
              return { Component: CounsellingPage };
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
];

export const router = createBrowserRouter(routes);
