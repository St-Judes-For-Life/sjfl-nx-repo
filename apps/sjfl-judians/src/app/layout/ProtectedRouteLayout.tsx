import { FC, useContext, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { AuthContext } from '../store/AuthProvider';

/**
 * A route layour that requires the user to be logged in.
 * @returns None
 */
export const ProtectedRouteLayout: FC = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/auth', { replace: true });
    }
  }, [isLoggedIn, navigate]);

  return <Outlet></Outlet>;
};
