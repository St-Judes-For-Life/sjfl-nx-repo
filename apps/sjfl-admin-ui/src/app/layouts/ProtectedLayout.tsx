import { Navigate } from 'react-router-dom';
import { App } from '../app';
import { useAuth } from '../modules/auth/hooks/useAuth';

export const ProtectedLayout = () => {
  const { isLoggedIn } = useAuth();

  if (isLoggedIn) {
    return <App />;
  }

  return <Navigate to="/auth/login" />;
};
