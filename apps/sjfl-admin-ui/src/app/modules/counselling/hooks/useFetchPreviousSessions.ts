import { useQuery } from '@tanstack/react-query';
import { fetchCounsellingSessionsAdmin } from '../services/CounsellingService';

export function useFetchPreviousSessions(id?: string) {
  return useQuery({
    queryKey: ['counselling', 'previous', id] as const,
    queryFn: ({ queryKey: [, , uid] }) =>
      fetchCounsellingSessionsAdmin({
        type: 'search',
        uid,
      }),
    enabled: !!id,
  });
}
