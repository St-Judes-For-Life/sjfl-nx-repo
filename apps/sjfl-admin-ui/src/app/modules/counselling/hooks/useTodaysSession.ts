import { useQuery } from '@tanstack/react-query';
import { fetchCounsellingSessionsAdmin } from '../services/CounsellingService';

export function useTodaysSessions() {
  return useQuery({
    queryKey: ['counselling', 'today'],
    queryFn: () => fetchCounsellingSessionsAdmin({ type: 'today' }),
  });
}
