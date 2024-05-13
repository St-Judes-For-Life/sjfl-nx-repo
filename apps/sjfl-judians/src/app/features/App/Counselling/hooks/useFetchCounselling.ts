import { useQuery } from '@tanstack/react-query';
import {
  FetchCounsellingSessions,
  fetchCounsellingSessions,
} from '../services/fetchCounselling';

export function useFetchCounselling(query: FetchCounsellingSessions) {
  return useQuery({
    queryKey: ['counselling', query] as const,
    queryFn: ({ queryKey: [, query] }) => fetchCounsellingSessions(query),
  });
}
