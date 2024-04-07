import { useMutation } from '@tanstack/react-query';
import { registerUser } from '../services/auth.service';

export const useRegisterUser = () => {
  return useMutation({ mutationFn: registerUser });
};
