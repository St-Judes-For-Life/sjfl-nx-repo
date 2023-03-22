import { createBrowserRouter } from 'react-router-dom';
import { AuthLandingPage } from './app/features/Auth/AuthLandingPage';
import { LoginPage } from './app/features/Auth/LoginPage';
import { RegisterPage } from './app/features/Auth/RegisterPage';
import { AuthLayout } from './app/layout/AuthLayout';
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
                  const { DashboardPage } = await import(
                    './app/features/App/AppRouter'
                  );
                  return { Component: DashboardPage };
                },
              },
              {
                path: 'aid',
                lazy: async () => {
                  const { AidLandingPage } = await import(
                    './app/features/App/AppRouter'
                  );
                  return { Component: AidLandingPage };
                },
              },

              {
                path: 'counselling',
                lazy: async () => {
                  const { CounsellingLandingPage } = await import(
                    './app/features/App/AppRouter'
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
        element: <AuthLayout />,
        children: [
          {
            path: '',
            element: <AuthLandingPage />,
          },
          {
            path: 'sign-in',
            element: <LoginPage />,
          },
          {
            path: 'register',
            element: <RegisterPage />,
          },
        ],
      },
    ],
  },
]);
