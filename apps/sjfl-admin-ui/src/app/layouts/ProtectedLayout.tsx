import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../modules/auth/hooks/useAuth';

export const ProtectedLayout = () => {
  const { isLoggedIn } = useAuth();

  if (isLoggedIn) {
    return <Outlet />;
  }

  return <Navigate to="/auth/login" />;
};
