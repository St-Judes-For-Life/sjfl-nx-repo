import { FC } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../helpers/hooks/useAuth';

/**
 * A route layout that requires the user to be logged in.
 * @returns None
 */
export const ProtectedRouteLayout: FC = () => {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    return <Navigate to="/auth" replace={true} />;
  }

  return <Outlet></Outlet>;
};
