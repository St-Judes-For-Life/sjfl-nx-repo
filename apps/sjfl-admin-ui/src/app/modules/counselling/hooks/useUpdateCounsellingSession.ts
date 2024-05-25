import { updateCounsellingSessionAdmin } from '@sjfl/data';
import { useMutation } from '@tanstack/react-query';

export function useUpdateCounsellingSession() {
  return useMutation({ mutationFn: updateCounsellingSessionAdmin });
}
