import { useQuery } from '@tanstack/react-query';
import { fetchSessionByIdClient } from '@sjfl/data';

export function useFetchSessionById(sessionId: string) {
  return useQuery({
    queryKey: ['counselling', sessionId] as const,
    queryFn: () => fetchSessionByIdClient(sessionId),
  });
}
