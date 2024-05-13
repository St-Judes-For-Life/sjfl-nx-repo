import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';

export const AuthLayout = () => {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    return <Outlet />;
  }

  return <Navigate to="/" />;
};
