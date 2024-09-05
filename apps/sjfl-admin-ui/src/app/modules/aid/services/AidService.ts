import { filterEmptyProps, PaginatedResponse } from '@sjfl/data';
import { API } from '../../../constants/urls';
import { AdminRequestService } from '../../../../lib/axios';
import {
  AdminCounsellingSession,
  FetchCounsellingSessionsAdminRequest,
} from '../../counselling/models/AdminCounselling';

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
