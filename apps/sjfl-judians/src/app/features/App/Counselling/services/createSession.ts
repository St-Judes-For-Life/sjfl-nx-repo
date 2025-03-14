import { CreateSessionRequest, CreateSessionResponse } from '@sjfl/data';
import { API } from '../../../../shared/constants/api/urls';
import { ClientRequestService } from '../../../../shared/utils/axios';

export const createSession = (request: CreateSessionRequest) => {
  return ClientRequestService.request<CreateSessionResponse>({
    url: API.counselling.create,
    method: 'post',
    data: request,
  });
};
