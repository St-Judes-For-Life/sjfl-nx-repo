import { useQuery } from '@tanstack/react-query';
import { fetchCounsellingSessionAdmin } from '../services/CounsellingService';

export function useFetchCounsellingSessionById(id: string) {
  return useQuery({
    queryKey: ['counselling', id] as const,
    queryFn: ({ queryKey: [, id] }) => fetchCounsellingSessionAdmin(id),
  });
}
