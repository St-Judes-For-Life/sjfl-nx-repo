import { createBrowserRouter } from 'react-router-dom';
import { AppLayout } from './app/layout/AppLayout';
import { AuthLayout } from './app/layout/AuthLayout';
import { ProtectedRouteLayout } from './app/layout/ProtectedRouteLayout';
import { RootLayout } from './app/layout/RootLayout';
import { rootLoader } from './app/loaders/rootLoader';
import { AuthLandingPage } from './app/pages/Auth/AuthLandingPage';
import { LoginPage } from './app/pages/Auth/LoginPage';
import { RegisterPage } from './app/pages/Auth/RegisterPage';

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
            path: '/',
            element: <AppLayout />,
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
