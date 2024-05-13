import { LoginRequest, TokenResponse } from '../models/Auth';
import { RequestService } from '../../../../lib/axios';
import { API } from '../../../constants/urls';

export function login(req: LoginRequest) {
  return RequestService.post<TokenResponse>(API.auth.login, req);
}
