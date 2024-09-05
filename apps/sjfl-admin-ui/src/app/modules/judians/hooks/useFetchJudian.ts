import { useQuery } from '@tanstack/react-query';
import { fetchJudianByIdAdmin } from '../services/JudiansService';

export function useFetchJudian(id: string) {
  return useQuery({
    queryKey: ['judian', id] as const,
    queryFn: ({ queryKey: [, uid] }) => fetchJudianByIdAdmin(uid),
  });
}
