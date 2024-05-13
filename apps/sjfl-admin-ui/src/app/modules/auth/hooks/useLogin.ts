import { useMutation } from '@tanstack/react-query';
import { login } from '../services/AuthService';

export function useLogin() {
  return useMutation({ mutationFn: login });
}
