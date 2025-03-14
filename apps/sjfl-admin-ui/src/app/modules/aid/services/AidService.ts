import { filterEmptyProps, PaginatedResponse } from '@sjfl/data';
import { API } from '../../../constants/urls';
import { AdminRequestService } from '../../../../lib/axios';
import {
  AdminAidRequest,
  FetchAdminAidRequest,
} from '../models/AdminAidRequest';

export const fetchAidRequestAdmin = async ({
  type,
  page = 1,
  size = 10,
  fromDate,
  toDate,
  name,
  uid,
}: Partial<FetchAdminAidRequest>) => {
  return AdminRequestService.request<PaginatedResponse<AdminAidRequest>>({
    method: 'get',
    url: `${API.aid.search}/${type}`,
    params: filterEmptyProps({
      page,
      size,
      fromDate,
      toDate,
      name,
      uid,
    }),
  });
};
