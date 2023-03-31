import {
  createContext,
  FC,
  PropsWithChildren,
  useEffect,
  useState,
} from 'react';
import { IAuthContext, User } from '../models/auth.model';
import { Maybe } from '../models/maybe.model';
import { asyncStore } from '../utils/async-storage/async-storage';

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

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState<Maybe<User>>(undefined);

  const logIn = () => {
    setLoggedIn(true);
    const loggedInUser = {
      uid: '',
      name: 'Rahul Sharma',
      email: 'rahul.sharma@gmail.com',
      mobile: '+91 9988776655',
    };
    setUser(loggedInUser);
    asyncStore.set('user', loggedInUser);
  };
  const logOut = () => {
    setLoggedIn(false);
    setUser(undefined);
    asyncStore.delete('user');
  };

  useEffect(() => {
    (async () => {
      const user = await asyncStore.get<Maybe<User>>('user');
      if (user) {
        logIn();
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
