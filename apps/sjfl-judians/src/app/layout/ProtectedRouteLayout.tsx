import { FC, PropsWithChildren, useContext, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { AuthContext } from '../store/AuthProvider';

export const ProtectedRouteLayout: FC<PropsWithChildren> = ({ children }) => {
  const navigate = useNavigate();
  const { isLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/auth', { replace: true });
    }
  }, [isLoggedIn, navigate]);

  return <Outlet></Outlet>;
};
