import { API } from '../../../shared/constants/api/urls';
import { User } from '../../../shared/models/auth.model';
import { asyncStore } from '../../../shared/utils/async-storage/async-storage';
import { RequestService } from '../../../shared/utils/axios';
import { AccessTokenResponse } from '../models/AccessToken';
import { VerifyOtpRequest } from '../models/Otp';

export const registerUser = (user: User) => {
  return RequestService.request<void>({
    url: API.user.register,
    data: user,
    method: 'post',
  });
};

export const sendOtp = (uid: string) => {
  return RequestService.request<AccessTokenResponse>({
    url: API.otp.send,
    data: { uid, otpType: 'LOGIN' },
    method: 'post',
  });
};

export const verifyOtp = async (request: VerifyOtpRequest) => {
  const resp = await RequestService.request<AccessTokenResponse>({
    url: API.otp.verify,
    data: request,
    method: 'post',
  });
  if (resp.data.token) {
    await asyncStore.set('token', resp.data.token);
  }

  return resp.data;
};
