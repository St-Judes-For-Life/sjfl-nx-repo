import { useMutation } from '@tanstack/react-query';
import { updateJudianAdmin } from '../services/JudiansService';

export function useUpdateJudian() {
  return useMutation({ mutationFn: updateJudianAdmin });
}
