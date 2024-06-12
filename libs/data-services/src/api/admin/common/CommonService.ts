import { ADMIN_API } from '../../../constants/urls';
import { AdminRequestService } from '../../../lib/axios';
import { CommonLookup } from './models/CommonLookup';

export const fetchCommonLookupAdmin = () => {
  return AdminRequestService.get<CommonLookup>(ADMIN_API.common.lookup);
};
