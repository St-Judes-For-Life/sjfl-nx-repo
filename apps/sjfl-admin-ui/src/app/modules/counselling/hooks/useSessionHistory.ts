import { useQueries } from '@tanstack/react-query';
import {
  fetchCounsellingSessionAdmin,
  fetchSessionHistoryAdmin,
} from '../services/CounsellingService';

export function useSessionHistory(sessionId: string) {
  return useQueries({
    queries: [
      {
        queryKey: ['counselling', sessionId] as const,
        queryFn: () => fetchCounsellingSessionAdmin(sessionId),
      },
      {
        queryKey: ['counselling', 'history', sessionId] as const,
        queryFn: () => fetchSessionHistoryAdmin(sessionId),
      },
    ],
    combine: (results) => {
      const [{ data: sessionResp }, { data: historyResp }] = results;
      let joinedData;
      if (sessionResp?.data && historyResp?.data?.data) {
        const historicalEvents = historyResp.data.data;
        const latestStatus = sessionResp.data;
        joinedData = [latestStatus, ...historicalEvents];
      }
      return {
        data: joinedData,
        isPending: results.some((result) => result.isPending),
        isLoading: results.some((result) => result.isLoading),
        isError: results.some((result) => result.isError),
      };
    },
  });
}
