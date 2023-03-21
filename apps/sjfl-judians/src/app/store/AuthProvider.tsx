import React, { createContext, PropsWithChildren, useState } from 'react';
import { IAuthContext } from '../models/auth.model';

export const AuthContext = createContext<IAuthContext>({
  isLoggedIn: false,
  user: undefined,
  logIn: () => {
    return;
  },
  logOut: () => {
    return;
  },
});

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const logIn = () => setLoggedIn(true);
  const logOut = () => setLoggedIn(false);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        logIn,
        logOut,
        user: {
          uid: '',
          name: 'Rahul Sharma',
          email: 'rahul.sharma@gmail.com',
          mobile: '+91 9988776655',
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
