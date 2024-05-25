import { CLIENT_API } from '../../../constants/urls';
import { ClientRequestService } from '../../../lib/axios';
import { UserProfile } from './models/Profile';

export const getUserProfile = async () => {
  return ClientRequestService.request<UserProfile>({
    url: CLIENT_API.user.profile,
    method: 'get',
  });
};

export const updateUserProfile = async (profile: UserProfile) => {
  return ClientRequestService.request<UserProfile>({
    url: CLIENT_API.user.profile,
    method: 'put',
    data: profile,
  });
};
