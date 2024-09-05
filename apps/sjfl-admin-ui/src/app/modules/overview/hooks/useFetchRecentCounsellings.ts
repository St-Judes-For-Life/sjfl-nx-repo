import { useQuery } from '@tanstack/react-query';
import { fetchCounsellingSessionsAdmin } from '../../counselling/services/CounsellingService';

export function useFetchRecentCounsellings() {
  return useQuery({
    queryKey: ['counselling', 'recent'],
    queryFn: () => fetchCounsellingSessionsAdmin({ type: 'all', size: 5 }),
  });
}
