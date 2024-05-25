import { fetchCounsellingSessionsAdmin } from '@sjfl/data';
import { useQuery } from '@tanstack/react-query';

export function useFetchRecentCounsellings() {
  return useQuery({
    queryKey: ['counselling', 'recent'],
    queryFn: () => fetchCounsellingSessionsAdmin({ type: 'all', size: 5 }),
  });
}
