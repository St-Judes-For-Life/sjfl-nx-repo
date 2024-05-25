import {
  createContext,
  FC,
  PropsWithChildren,
  useEffect,
  useState,
} from 'react';
import { TokenResponse } from '../models/Auth';

export interface IAuthContext {
  isLoggedIn: boolean;
  logIn: (tokenResp: TokenResponse) => void;
  logOut: () => void;
}

export const AuthContext = createContext<IAuthContext | null>(null);

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const logIn = ({ token }: TokenResponse) => {
    setIsLoggedIn(true);
    localStorage.setItem('token', token);
  };

  const logOut = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('token');
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        logIn,
        logOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
