import { createBrowserRouter } from 'react-router-dom';
import { ProtectedRouteLayout } from './app/layout/ProtectedRouteLayout';
import { RootLayout } from './app/layout/RootLayout';
import { rootLoader } from './app/loaders/rootLoader';

export const router = createBrowserRouter([
  {
    path: '',
    element: <RootLayout />,
    loader: rootLoader,
    children: [
      {
        path: '',
        element: <ProtectedRouteLayout />,
        children: [
          {
            path: '',
            lazy: () => import('./app/layout/AppLayout'),
            children: [
              {
                path: '',
                lazy: async () => {
                  const { DashboardPage } = await import('./app/features/App');
                  return { Component: DashboardPage };
                },
              },
              {
                path: 'aid',
                lazy: async () => {
                  const { AidLandingPage } = await import('./app/features/App');
                  return { Component: AidLandingPage };
                },
              },

              {
                path: 'counselling',
                lazy: async () => {
                  const { CounsellingLandingPage } = await import(
                    './app/features/App'
                  );
                  return { Component: CounsellingLandingPage };
                },
              },
            ],
          },
        ],
      },
      {
        path: 'auth',
        lazy: async () => {
          const { AuthLayout } = await import('./app/features/Auth');
          return { Component: AuthLayout };
        },
        children: [
          {
            path: '',
            lazy: async () => {
              const { AuthLandingPage } = await import('./app/features/Auth');
              return { Component: AuthLandingPage };
            },
          },
          {
            path: 'sign-in',
            lazy: async () => {
              const { LoginPage } = await import('./app/features/Auth');
              return { Component: LoginPage };
            },
          },
          {
            path: 'register',
            lazy: async () => {
              const { RegisterPage } = await import('./app/features/Auth');
              return { Component: RegisterPage };
            },
          },
        ],
      },
    ],
  },
]);
