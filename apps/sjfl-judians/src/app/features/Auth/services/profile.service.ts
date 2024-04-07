import { API } from '../../../shared/constants/api/urls';
import { RequestService } from '../../../shared/utils/axios';
import { UserProfile } from '../models/Profile';

export const getUserProfile = async () => {
  const resp = await RequestService.request<UserProfile>({
    url: API.user.profile,
    method: 'get',
  });
  if (resp.status === 200) {
    return resp.data;
  } else {
    throw new Error('dafuq');
  }
};
