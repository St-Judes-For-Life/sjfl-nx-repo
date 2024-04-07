import { useMutation } from '@tanstack/react-query';
import { getUserProfile } from '../services/profile.service';

export function useFetchProfile() {
  return useMutation({ mutationFn: getUserProfile });
}
