import { createBrowserRouter, Navigate, redirect } from 'react-router-dom';
import { ProtectedRouteLayout } from '../app/shared/layout/ProtectedRouteLayout';
import { RootLayout } from '../app/shared/layout/RootLayout';
import { rootLoader } from '../app/shared/loaders/rootLoader';
import { workflowConfigLoader } from '../app/features/App/Aid/loaders/workflow-config.loader';

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
            lazy: async () => {
              const { AppLayout } = await import('../app/features/App');
              return { Component: AppLayout };
            },
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
                loader: workflowConfigLoader,
                children: [
                  {
                    path: '',
                    loader: () => redirect('requests'),
                  },
                  {
                    path: 'editor',
                    lazy: async () => {
                      const { AidRequestEditorLayout } = await import(
                        '../app/features/App/Aid'
                      );
                      return { Component: AidRequestEditorLayout };
                    },
                    children: [
                      {
                        path: 'create',
                        lazy: async () => {
                          const { AidRequestFlow } = await import(
                            '../app/features/App/Aid'
                          );
                          return { Component: AidRequestFlow };
                        },
                      },
                      {
                        path: ':id',
                        lazy: async () => {
                          const { AidRequestFlow } = await import(
                            '../app/features/App/Aid'
                          );
                          return { Component: AidRequestFlow };
                        },
                      },
                    ],
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
                        loader: () => redirect('in-progress'),
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
                    children: [
                      {
                        path: '',
                        loader: () => redirect('upcoming'),
                      },
                      {
                        path: 'upcoming',
                        lazy: async () => {
                          const { UpcomingCounselling } = await import(
                            '../app/features/App/Counselling'
                          );
                          return { Component: UpcomingCounselling };
                        },
                      },
                      {
                        path: 'past',
                        lazy: async () => {
                          const { PastCounselling } = await import(
                            '../app/features/App/Counselling'
                          );
                          return { Component: PastCounselling };
                        },
                      },
                    ],
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
