import { PaginatedResponse, filterEmptyProps } from '@sjfl/data';
import { AdminRequestService } from '../../../../lib/axios';
import { API } from '../../../constants/urls';
import { AdminJudian } from '../models/Judians';

export type FetchJudiansAdminRequest = {
  status: 'active' | 'inactive';
  page: number;
  size: number;
  uid: string;
  name: string;
  phoneNo: string;
  email: string;
};

export const fetchJudiansAdmin = async ({
  status = 'active',
  page = 1,
  size = 10,

  name,
  uid,
  phoneNo,
  email,
}: FetchJudiansAdminRequest) => {
  return AdminRequestService.request<PaginatedResponse<AdminJudian>>({
    method: 'get',
    url: `${API.judian.search}/${status.toLocaleLowerCase()}`,
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
    `${API.judian.base}/${uid}/latest`
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
    `${API.judian.base}/${uid}/update`,
    judian
  );
};
