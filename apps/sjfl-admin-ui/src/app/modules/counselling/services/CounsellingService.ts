import { PaginatedResponse, filterEmptyProps } from '@sjfl/data';
import { AdminRequestService } from '../../../../lib/axios';
import {
  AdminCounsellingSession,
  FetchCounsellingSessionsAdminRequest,
  UpdateCounsellingSessionAdminRequest,
} from '../models/AdminCounselling';
import { API } from '../../../constants/urls';

export const fetchCounsellingSessionsAdmin = async ({
  type = 'all',
  page = 1,
  size = 10,
  fromDate,
  toDate,
  name,
  uid,
  counsellingStatuses,
}: Partial<FetchCounsellingSessionsAdminRequest>) => {
  return AdminRequestService.request<
    PaginatedResponse<AdminCounsellingSession>
  >({
    method: 'get',
    url: `${API.counselling.search}/${type}`,
    params: filterEmptyProps({
      page,
      size,
      fromDate,
      toDate,
      name,
      uid,
      counsellingStatuses,
    }),
  });
};

export const fetchCounsellingSessionAdmin = (id: string) => {
  return AdminRequestService.get<AdminCounsellingSession>(
    `${API.counselling.base}/${id}/latest`
  );
};

export const updateCounsellingSessionAdmin = ({
  id,
  session,
}: {
  id: string;
  session: UpdateCounsellingSessionAdminRequest;
}) => {
  return AdminRequestService.post<AdminCounsellingSession>(
    `${API.counselling.base}/${id}/update`,
    session
  );
};

export const fetchSessionHistoryAdmin = (sessionId: string) => {
  return AdminRequestService.get<PaginatedResponse<AdminCounsellingSession>>(
    `${API.counselling.base}/${sessionId}/history`,
    {
      params: {
        size: 1000,
      },
    }
  );
};
