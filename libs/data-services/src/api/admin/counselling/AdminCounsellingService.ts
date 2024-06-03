import { filterEmptyProps } from '@sjfl/ui';
import { ADMIN_API } from '../../../constants/urls';
import { AdminRequestService } from '../../../lib/axios';
import { PaginatedResponse } from '../../../models/Pagination';
import {
  AdminCounsellingSession,
  FetchCounsellingSessionsAdminRequest,
  UpdateCounsellingSessionAdminRequest,
} from './model/AdminCounselling';

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
    url: `${ADMIN_API.counselling.search}/${type}`,
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
    `${ADMIN_API.counselling.base}/${id}/latest`
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
    `${ADMIN_API.counselling.base}/${id}/update`,
    session
  );
};
