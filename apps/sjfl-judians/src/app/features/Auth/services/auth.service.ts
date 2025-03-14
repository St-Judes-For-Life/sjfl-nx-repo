import { API } from '../../../shared/constants/api/urls';
import { User } from '../../../shared/models/auth.model';
import { asyncStore } from '@sjfl/data';
import { ClientRequestService } from '../../../shared/utils/axios';
import { AccessTokenResponse } from '../models/AccessToken';
import { VerifyOtpRequest } from '../models/Otp';

export const registerUser = (user: User) => {
  return ClientRequestService.request<void>({
    url: API.user.register,
    data: user,
    method: 'post',
  });
};

export const sendOtp = (uid: string) => {
  return ClientRequestService.request<AccessTokenResponse>({
    url: API.otp.send,
    data: { uid, otpType: 'LOGIN' },
    method: 'post',
  });
};

export const verifyOtp = async (request: VerifyOtpRequest) => {
  const resp = await ClientRequestService.request<AccessTokenResponse>({
    url: API.otp.verify,
    data: request,
    method: 'post',
  });
  if (resp.data.token) {
    await asyncStore.set('token', resp.data.token);
  }

  return resp.data;
};
