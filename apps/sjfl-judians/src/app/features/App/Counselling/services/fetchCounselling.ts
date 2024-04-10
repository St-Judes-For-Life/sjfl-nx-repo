import { API } from '../../../../shared/constants/api/urls';
import { RequestService } from '../../../../shared/utils/axios';
import { CounsellingSessions } from '../models/CounsellingSession';

export type FetchCounsellingSessions = {
  type: 'upcoming' | 'past';
  page?: number;
  size?: number;
};

export const fetchCounsellingSessions = async ({
  type,
  page = 1,
  size = 10,
}: FetchCounsellingSessions) => {
  const url = `${API.counselling.base}/${type}`;
  const resp = await RequestService.request<CounsellingSessions>({
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
