import { useMutation } from '@tanstack/react-query';
import { updateCounsellingSessionAdmin } from '../services/CounsellingService';

export function useUpdateCounsellingSession() {
  return useMutation({ mutationFn: updateCounsellingSessionAdmin });
}
