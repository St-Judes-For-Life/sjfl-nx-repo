import { CLIENT_API } from '../../../constants/urls';
import { ClientRequestService } from '../../../lib/axios';
import { PaginatedResponse, PaginationReq } from '../../../models/Pagination';
import {
  ClientCounsellingSession,
  CreateSessionRequest,
} from './models/ClientCounselling';

export type FetchCounsellingSessionsClientRequest = {
  type: 'upcoming' | 'past';
} & PaginationReq;

export const fetchCounsellingSessionsClient = async ({
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

export const fetchSessionByIdClient = (sessionId: string) => {
  return ClientRequestService.get<ClientCounsellingSession>(
    `${CLIENT_API.counselling.base}/${sessionId}/latest`
  );
};

export const fetchSessionHistoryClient = (sessionId: string) => {
  return ClientRequestService.get<PaginatedResponse<ClientCounsellingSession>>(
    `${CLIENT_API.counselling.base}/${sessionId}/history`,
    {
      params: {
        size: 1000,
      },
    }
  );
};

export const updateCounsellingSessionClient = ({
  sessionId,
  session,
}: {
  sessionId: string;
  session: CreateSessionRequest;
}) => {
  return ClientRequestService.put<ClientCounsellingSession>(
    `${CLIENT_API.counselling.base}/${sessionId}/update`,
    session
  );
};

export const cancelCounsellingSessionClient = (sessionId: string) => {
  return ClientRequestService.put<ClientCounsellingSession>(
    `${CLIENT_API.counselling.base}/${sessionId}/cancel`
  );
};
