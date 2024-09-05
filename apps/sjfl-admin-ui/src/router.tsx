import { Outlet, RouteObject, createBrowserRouter } from 'react-router-dom';
import { GenericErrorPage } from './app/components/GenericErrorPage';
import { ProtectedLayout } from './app/layouts/ProtectedLayout';
import { AuthLayout } from './app/modules/auth/AuthLayout';
import { LoginPage } from './app/modules/auth/LoginPage';
import { queryClient } from './lib/queryClient';
import { fetchCommonLookupAdmin } from './app/modules/common/CommonService';

export const routes: RouteObject[] = [
  {
    path: '',
    element: <ProtectedLayout />,
    children: [
      {
        path: '',
        element: <Outlet />,
        errorElement: <GenericErrorPage />,
        loader: () =>
          queryClient.fetchQuery({
            queryKey: ['common', 'lookup'] as const,
            queryFn: fetchCommonLookupAdmin,
            staleTime: Infinity,
            gcTime: Infinity,
          }),
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
                path: ':uid',
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
            children: [
              {
                path: '',
                lazy: async () => {
                  const { SettingsPage } = await import(
                    './app/modules/settings/pages/SettingsPage'
                  );
                  return { Component: SettingsPage };
                },
              },
              {
                path: 'manage-aid',
                lazy: async () => {
                  const { ManageAidPage } = await import(
                    './app/modules/settings/pages/ManageAidPage'
                  );
                  return { Component: ManageAidPage };
                },
              },
              {
                path: 'manage-approvers',
                lazy: async () => {
                  const { ManageApproversPage } = await import(
                    './app/modules/settings/pages/ManageApproversPage'
                  );
                  return { Component: ManageApproversPage };
                },
              },
              {
                path: 'manage-counselling',
                lazy: async () => {
                  const { ManageCounsellingPage } = await import(
                    './app/modules/settings/pages/ManageCounsellingPage'
                  );
                  return { Component: ManageCounsellingPage };
                },
              },
              {
                path: 'manage-languages',
                lazy: async () => {
                  const { ManageLanguagesPage } = await import(
                    './app/modules/settings/pages/ManageLanguagesPage'
                  );
                  return { Component: ManageLanguagesPage };
                },
              },
            ],
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
