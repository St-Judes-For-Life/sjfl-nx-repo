import {
  AdminCounsellingSession,
  AdminJudian,
  FetchCounsellingSessionsAdminRequest,
  FetchJudiansAdminRequest,
  PaginatedResponse,
  fetchCounsellingSessionsAdmin,
  fetchJudiansAdmin,
} from '@sjfl/data';
import { useQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { useSearchParams } from 'react-router-dom';
import { parseSearchParams } from '../../lib/utils';
import { SearchBy } from '../models/Search';

export function useItemSearch(item: SearchBy) {
  const [searchParams] = useSearchParams();
  return useQuery({
    queryKey: ['search', item, searchParams.toString()] as const,
    queryFn: async ({ queryKey: [, , query] }) => {
      return fetchSearchResults(
        item,
        parseSearchParams(new URLSearchParams(query))
      );
    },
  });
}

export async function fetchSearchResults(
  item: SearchBy,
  query: Record<string, unknown>
) {
  let searchResponse: AxiosResponse<
    PaginatedResponse<AdminCounsellingSession | AdminJudian>
  >;
  const hasQuery = Object.entries(query).length > 0;
  switch (item) {
    case 'judians':
      searchResponse = await fetchJudiansAdmin(
        query as FetchJudiansAdminRequest
      );
      // case 'aid':
      //   return fetchAidRequestAdmin({
      //     type: 'upcoming',
      //     ...query,
      //   } as FetchCounsellingSessionsAdminRequest);
      break;
    case 'counselling':
      searchResponse = await fetchCounsellingSessionsAdmin({
        type: hasQuery ? 'search' : 'all',
        ...query,
      } as FetchCounsellingSessionsAdminRequest);
      break;
    default:
      throw Error('unknown search');
  }
  return searchResponse;
}
