import { useMutation } from '@tanstack/react-query';
import { createSession } from '../services/createSession';

export function useCreateSession() {
  return useMutation({ mutationFn: createSession });
}
