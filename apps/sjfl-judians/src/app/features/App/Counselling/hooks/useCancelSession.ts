import { useMutation } from '@tanstack/react-query';
import { cancelCounsellingSessionClient } from '@sjfl/data';

export function useCancelSession() {
  return useMutation({ mutationFn: cancelCounsellingSessionClient });
}
