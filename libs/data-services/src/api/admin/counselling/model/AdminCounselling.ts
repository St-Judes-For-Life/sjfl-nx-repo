import { PaginationReq } from '../../../../models';
import {
  ClientCounsellingSession,
  CounsellingStatus,
} from '../../../client/counselling/models/ClientCounselling';

export type AdminCounsellingSession = ClientCounsellingSession & {
  userResponse: UserResponse;
};

export interface UserResponse {
  uid: string;
  name: string;
  gender: string;
  dateOfBirth: string;
  mobileNumber: string;
  email: string;
  imageUrl: string;
  createdAt: string;
}

export type FetchCounsellingSessionsAdminRequest = {
  type: 'all' | 'today' | 'search';
  fromDate: string;
  toDate: string;
  name: string;
  uid: string;
  counsellingStatuses: CounsellingStatus;
} & PaginationReq;

export type UpdateCounsellingSessionAdminRequest = Partial<
  Pick<
    AdminCounsellingSession,
    'counsellingDate' | 'note' | 'statusNote' | 'counsellingStatus'
  >
>;
