import { useQuery } from '@tanstack/react-query';
import { fetchCounsellingSessionAdmin } from '@sjfl/data';

export function useFetchCounsellingSessionById(id: string) {
  return useQuery({
    queryKey: ['counselling', id] as const,
    queryFn: ({ queryKey: [, id] }) => fetchCounsellingSessionAdmin(id),
  });
}
