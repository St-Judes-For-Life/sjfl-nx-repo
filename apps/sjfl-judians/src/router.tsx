import { createBrowserRouter } from 'react-router-dom';
import { AppLayout } from './app/layout/AppLayout';
import { AuthLayout } from './app/layout/AuthLayout';
import { ProtectedRouteLayout } from './app/layout/ProtectedRouteLayout';
import { RootLayout } from './app/layout/RootLayout';
import { rootLoader } from './app/loaders/rootLoader';
import { AuthLandingPage } from './app/features/Auth/AuthLandingPage';
import { LoginPage } from './app/features/Auth/LoginPage';
import { RegisterPage } from './app/features/Auth/RegisterPage';
import { DashboardPage } from './app/features/Dashboard/DashboardPage';
import { AidLandingPage } from './app/features/Aid/AidLandingPage';
import { CounsellingLandingPage } from './app/features/Counselling/CounsellingLandingPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    loader: rootLoader,
    children: [
      {
        path: '/',
        element: <ProtectedRouteLayout />,
        children: [
          {
            path: '',
            element: <AppLayout />,
            children: [
              {
                path: '',
                element: <DashboardPage />,
              },
              {
                path: 'aid',
                element: <AidLandingPage />,
              },

              {
                path: 'counselling',
                element: <CounsellingLandingPage />,
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
