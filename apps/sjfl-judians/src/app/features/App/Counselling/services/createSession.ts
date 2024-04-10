import { API } from '../../../../shared/constants/api/urls';
import { RequestService } from '../../../../shared/utils/axios';
import {
  CreateSessionRequest,
  CreateSessionResponse,
} from '../models/CreateSession';

export const createSession = (request: CreateSessionRequest) => {
  return RequestService.request<CreateSessionResponse>({
    url: API.counselling.create,
    method: 'post',
    data: request,
  });
};
