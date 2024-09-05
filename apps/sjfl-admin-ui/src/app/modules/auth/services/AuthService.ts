import { LoginRequest, TokenResponse } from '../models/Auth';
import { API } from '../../../constants/urls';
import { AdminRequestService } from '../../../../lib/axios';

export function login(req: LoginRequest) {
  return AdminRequestService.post<TokenResponse>(API.auth.login, req);
}
