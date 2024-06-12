import { ADMIN_API } from '../../../constants/urls';
import { AdminRequestService } from '../../../lib/axios';
import { filterEmptyProps } from '../../../lib/utils';
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

export const fetchJudianByIdAdmin = (uid: string) => {
  return AdminRequestService.get<AdminJudian>(
    `${ADMIN_API.judian.base}/${uid}/latest`
  );
};

export const updateJudianAdmin = ({
  uid,
  judian,
}: {
  uid: string;
  judian: Partial<AdminJudian>;
}) => {
  return AdminRequestService.post<AdminJudian>(
    `${ADMIN_API.judian.base}/${uid}/update`,
    judian
  );
};
