import { useQuery } from '@tanstack/react-query';
import { fetchAidRequestAdmin } from '../../aid/services/AidService';

export function useFetchRecentAidRequests() {
  return useQuery({
    queryKey: ['aid', 'recent'],
    queryFn: () => fetchAidRequestAdmin({ type: 'all', size: 5 }),
  });
}
