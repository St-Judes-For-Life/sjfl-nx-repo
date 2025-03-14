import { useQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { useSearchParams } from 'react-router-dom';
import { parseSearchParams } from '../../lib/utils';
import { SearchBy } from '../models/Search';
import { PaginatedResponse } from '@sjfl/data';
import {
  AdminCounsellingSession,
  FetchCounsellingSessionsAdminRequest,
} from '../modules/counselling/models/AdminCounselling';
import { AdminJudian } from '../modules/judians/models/Judians';
import {
  FetchJudiansAdminRequest,
  fetchJudiansAdmin,
} from '../modules/judians/services/JudiansService';
import { fetchCounsellingSessionsAdmin } from '../modules/counselling/services/CounsellingService';
import { FetchAidAdminRequest } from '../modules/aid/models/AdminAid';
import { fetchAidRequestAdmin } from '../modules/aid/services/AidService';
import { AdminAidRequest } from '../modules/aid/models/AdminAidRequest';

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
    PaginatedResponse<AdminCounsellingSession | AdminJudian | AdminAidRequest>
  >;
  const hasQuery = Object.entries(query).length > 0;
  switch (item) {
    case 'judians':
      searchResponse = await fetchJudiansAdmin(
        query as FetchJudiansAdminRequest
      );
      break;
    case 'aid':
      searchResponse = await fetchAidRequestAdmin({
        type: hasQuery ? 'search' : 'all',
        ...query,
      } as FetchAidAdminRequest);
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
