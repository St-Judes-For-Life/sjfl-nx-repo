import { useQuery } from '@tanstack/react-query';
import {
  FetchCounsellingSessionsClientRequest,
  fetchCounsellingSessionsClient,
} from '@sjfl/data';

export function useFetchCounselling(
  query: FetchCounsellingSessionsClientRequest
) {
  return useQuery({
    queryKey: ['counselling', query] as const,
    queryFn: ({ queryKey: [, query] }) => fetchCounsellingSessionsClient(query),
  });
}
