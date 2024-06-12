import { updateCounsellingSessionClient } from '@sjfl/data';
import { useMutation } from '@tanstack/react-query';

export function useUpdateSession() {
  return useMutation({ mutationFn: updateCounsellingSessionClient });
}
