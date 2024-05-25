import { CLIENT_API } from '../../../constants/urls';
import { ClientRequestService } from '../../../lib/axios';
import { PaginatedResponse, PaginationReq } from '../../../models/Pagination';
import { ClientCounsellingSession } from './models/ClientCounselling';

export type FetchCounsellingSessionsClientRequest = {
  type: 'upcoming' | 'past';
} & PaginationReq;

export const fetchCounsellingSessions = async ({
  type,
  page = 1,
  size = 10,
}: FetchCounsellingSessionsClientRequest) => {
  const url = `${CLIENT_API.counselling.search}/${type}`;
  const resp = await ClientRequestService.request<
    PaginatedResponse<ClientCounsellingSession>
  >({
    method: 'get',
    url,
    params: { page, size },
  });

  if (resp.status === 200) {
    return resp.data;
  } else {
    throw Error();
  }
};
