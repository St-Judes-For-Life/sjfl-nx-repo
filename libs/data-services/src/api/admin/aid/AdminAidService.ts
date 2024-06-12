import { filterEmptyProps } from '../../../lib/utils';
import { ADMIN_API } from '../../../constants/urls';
import { AdminRequestService } from '../../../lib/axios';
import { PaginatedResponse } from '../../../models/Pagination';
import {
  AdminCounsellingSession,
  FetchCounsellingSessionsAdminRequest,
} from '../counselling/model/AdminCounselling';

export const fetchAidRequestAdmin = async ({
  type,
  page = 1,
  size = 10,
  fromDate,
  toDate,
  name,
  uid,
  counsellingStatuses,
}: FetchCounsellingSessionsAdminRequest) => {
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
