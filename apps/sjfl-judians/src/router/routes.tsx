import { createBrowserRouter, Navigate } from 'react-router-dom';
import { ProtectedRouteLayout } from '../app/shared/layout/ProtectedRouteLayout';
import { RootLayout } from '../app/shared/layout/RootLayout';
import { rootLoader } from '../app/shared/loaders/rootLoader';

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
            lazy: () => import('../app/features/App'),
            children: [
              {
                path: '',
                lazy: async () => {
                  const { DashboardPage } = await import('../app/features/App');
                  return { Component: DashboardPage };
                },
              },
              {
                path: 'aid',
                children: [
                  {
                    path: '',
                    element: <Navigate to="requests" replace />,
                  },
                  {
                    path: 'requests',
                    lazy: async () => {
                      const { AidLandingPage } = await import(
                        '../app/features/App/Aid'
                      );
                      return { Component: AidLandingPage };
                    },
                    children: [
                      {
                        path: '',
                        element: <Navigate to="in-progress" replace />,
                      },
                      {
                        path: 'in-progress',
                        lazy: async () => {
                          const { InProgressAid } = await import(
                            '../app/features/App/Aid'
                          );
                          return { Component: InProgressAid };
                        },
                      },
                      {
                        path: 'completed',
                        lazy: async () => {
                          const { CompletedAid } = await import(
                            '../app/features/App/Aid'
                          );
                          return { Component: CompletedAid };
                        },
                      },
                      {
                        path: 'create',
                      },
                      {
                        path: 'edit/:id',
                      },
                    ],
                  },
                ],
              },

              {
                path: 'counselling',
                children: [
                  {
                    path: '',
                    lazy: async () => {
                      const { CounsellingLandingPage } = await import(
                        '../app/features/App/Counselling'
                      );
                      return { Component: CounsellingLandingPage };
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
        lazy: async () => {
          const { AuthLayout } = await import('../app/features/Auth');
          return { Component: AuthLayout };
        },
        children: [
          {
            path: '',
            lazy: async () => {
              const { AuthLandingPage } = await import('../app/features/Auth');
              return { Component: AuthLandingPage };
            },
          },
          {
            path: 'sign-in',
            lazy: async () => {
              const { LoginPage } = await import('../app/features/Auth');
              return { Component: LoginPage };
            },
          },
          {
            path: 'register',
            lazy: async () => {
              const { RegisterPage } = await import('../app/features/Auth');
              return { Component: RegisterPage };
            },
          },
        ],
      },
    ],
  },
]);
