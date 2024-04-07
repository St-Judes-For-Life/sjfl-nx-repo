import { useContext } from 'react';
import { AuthContext } from '../store/AuthProvider';

export function useAuth() {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error('No auth context');
  }

  return authContext;
}

export function useLoggedInUser() {
  const { isLoggedIn, user } = useAuth();

  if (!isLoggedIn || !user) {
    throw new Error('User not logged in');
  }

  return user;
}
