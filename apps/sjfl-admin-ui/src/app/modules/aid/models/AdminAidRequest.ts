import { AidRequest, PaginationReq } from "@sjfl/data";


export enum AidStatus {
    INPROGRESS = 'INPROGRESS',
    CANCELLED = 'CANCELLED',
    REJECTED = 'REJECTED',
    APPROVED = 'APPROVED',
    RESUBMIT = 'RESUBMIT',
    ALL = 'ALL'
}

export type AdminAidRequest = AidRequest & {
    reqId: string;
    uid: string;
    userName: string;
    approvedAmount: string | null;
    note: string;
    aidStatus: AidStatus;
    codeValueList: {
        code: string;
        value: string;
    }[];
    docList: {
        docName: string;
        docPath: string;
        type: string;
    }[];
};

export type FetchAdminAidRequest = {
  type: 'all' | 'today' | 'search';
  fromDate: string;
  toDate: string;
  name: string;
  uid: string;
} & PaginationReq;