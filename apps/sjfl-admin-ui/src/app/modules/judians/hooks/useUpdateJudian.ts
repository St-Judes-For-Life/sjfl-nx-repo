import { useMutation } from '@tanstack/react-query';
import { updateJudianAdmin } from '@sjfl/data';

export function useUpdateJudian() {
  return useMutation({ mutationFn: updateJudianAdmin });
}
