import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../shared/hooks/useAuth';

/**
 * A layout component that redirects the user to the home page if they are logged in.
 * @returns None
 */
export const AuthLayout = () => {
  const { isLoggedIn } = useAuth();

  if (isLoggedIn) {
    return <Navigate to="/" replace={true} />;
  }

  return <Outlet></Outlet>;
};
