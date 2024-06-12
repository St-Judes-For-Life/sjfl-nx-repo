import {
  createContext,
  FC,
  PropsWithChildren,
  useEffect,
  useState,
} from 'react';
import { UserProfile } from '../../features/Auth/models/Profile';
import { IAuthContext } from '../models/auth.model';
import { Maybe } from '../models/maybe.model';
import { asyncStore } from '@sjfl/data';

export const AuthContext = createContext<IAuthContext | null>(null);

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<Maybe<UserProfile>>(undefined);
  const isLoggedIn = !!user;

  const logIn = (user: UserProfile) => {
    setUser(user);
    asyncStore.set('user', user);
  };

  const logOut = () => {
    setUser(undefined);
    asyncStore.delete('user');
  };

  useEffect(() => {
    (async () => {
      const user = await asyncStore.get<Maybe<UserProfile>>('user');
      if (user) {
        setUser(user);
      }
    })();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        logIn,
        logOut,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
