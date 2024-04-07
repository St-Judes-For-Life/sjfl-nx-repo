import { useMutation } from '@tanstack/react-query';
import { sendOtp } from '../services/auth.service';

export function useSendOtp() {
  return useMutation({ mutationFn: sendOtp });
}
