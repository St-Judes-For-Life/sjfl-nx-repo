import { PaginationReq } from '@sjfl/data';

import { AidStatus } from '@sjfl/data';

export type FetchAidAdminRequest = {
  type: 'all' | 'today' | 'search';
  fromDate: string;
  toDate: string;
  name: string;
  uid: string;
  aidStatuses: AidStatus;
} & PaginationReq;
