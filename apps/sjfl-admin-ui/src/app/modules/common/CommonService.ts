import { AdminRequestService } from '../../../lib/axios';
import { API } from '../../constants/urls';
import { CommonLookup } from './models/CommonLookup';

export const fetchCommonLookupAdmin = () => {
  return AdminRequestService.get<CommonLookup>(API.common.lookup);
};
