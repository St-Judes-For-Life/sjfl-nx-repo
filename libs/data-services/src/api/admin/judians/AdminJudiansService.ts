import { filterEmptyProps } from '@sjfl/ui';
import { ADMIN_API } from '../../../constants/urls';
import { AdminRequestService } from '../../../lib/axios';
import { PaginatedResponse } from '../../../models/Pagination';
import { AdminJudian } from './models/Judians';

export type FetchJudiansAdminRequest = {
  type: 'active' | 'inactive';
  page: number;
  size: number;
  uid: string;
  name: string;
  phoneNo: string;
  email: string;
};

export const fetchJudiansAdmin = async ({
  type = 'active',
  page = 1,
  size = 10,

  name,
  uid,
  phoneNo,
  email,
}: FetchJudiansAdminRequest) => {
  return AdminRequestService.request<PaginatedResponse<AdminJudian>>({
    method: 'get',
    url: `${ADMIN_API.judian.search}/${type}`,
    params: filterEmptyProps({
      page,
      size,
      phoneNo,
      email,
      name,
      uid,
    }),
  });
};
