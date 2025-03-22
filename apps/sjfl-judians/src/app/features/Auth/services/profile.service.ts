import { API } from '../../../shared/constants/api/urls';
import { ClientRequestService } from '../../../shared/utils/axios';
import { UserProfile } from '../models/Profile';

export const getUserProfile = async () => {
  const resp = await ClientRequestService.request<UserProfile>({
    url: API.user.profile,
    method: 'get',
  });
  console.log({ data: resp.data });
  if (resp.status === 200) {
    return resp.data;
  } else {
    throw new Error('dafuq');
  }
};

export const updateUserProfile = async (profile: UserProfile) => {
  const resp = await ClientRequestService.request<UserProfile>({
    url: API.user.profile,
    method: 'put',
    data: profile,
  });
  console.log(resp);
  if (resp.status === 200) {
    return resp.data;
  } else {
    throw new Error('dafuq');
  }
};
