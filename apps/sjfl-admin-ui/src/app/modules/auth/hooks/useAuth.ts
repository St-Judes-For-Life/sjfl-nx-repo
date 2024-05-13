import { useContext } from 'react';
import { AuthContext } from '../store/AuthProvider';

export function useAuth() {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error('No auth context');
  }

  return authContext;
}
