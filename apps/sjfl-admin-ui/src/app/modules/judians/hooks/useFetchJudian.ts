import { useQuery } from '@tanstack/react-query';
import { fetchJudianById } from '@sjfl/data';

export function useFetchJudian(id: string) {
  return useQuery({
    queryKey: ['judian', id] as const,
    queryFn: ({ queryKey: [, uid] }) => fetchJudianById(uid),
  });
}
