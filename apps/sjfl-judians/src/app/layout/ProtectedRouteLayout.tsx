import { FC } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../helpers/hooks/useAuth';

/**
 * A route layout that requires the user to be logged in.
 * @returns None
 */
export const ProtectedRouteLayout: FC = () => {
  const { isLoggedIn } = useAuth();
  const location = useLocation();

  if (!isLoggedIn) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  return <Outlet></Outlet>;
};
