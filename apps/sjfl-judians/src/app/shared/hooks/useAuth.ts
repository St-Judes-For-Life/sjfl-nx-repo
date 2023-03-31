import { useContext } from 'react';
import { AuthContext } from '../store/AuthProvider';

export function useAuth() {
  return useContext(AuthContext);
}

export function useLoggedInUser() {
  const { isLoggedIn, user } = useContext(AuthContext);
  if (!isLoggedIn || !user) {
    throw new Error('User not logged in');
  }
  return user;
}
