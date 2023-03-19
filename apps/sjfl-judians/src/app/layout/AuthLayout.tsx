import { useContext, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { AuthContext } from '../store/AuthProvider';

/**
 * A layout component that redirects the user to the home page if they are logged in.
 * @returns None
 */
export const AuthLayout = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/', { replace: true });
    }
  }, [isLoggedIn, navigate]);
  return <Outlet></Outlet>;
};
