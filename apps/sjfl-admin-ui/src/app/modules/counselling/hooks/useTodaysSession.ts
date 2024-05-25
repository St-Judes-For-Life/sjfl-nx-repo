import { useQuery } from '@tanstack/react-query';
import { fetchCounsellingSessionsAdmin } from '@sjfl/data';

export function useTodaysSessions() {
  return useQuery({
    queryKey: ['counselling', 'today'],
    queryFn: () => fetchCounsellingSessionsAdmin({ type: 'today' }),
  });
}
