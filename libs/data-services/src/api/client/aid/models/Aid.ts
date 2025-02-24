
export type AidRequest = {
    reqId: string;
    uid: string;
    userName: string;
    supportSystem: string;
    natureOfSupport: string;
    totalAmount: string;
    requestedAmount: string;
    approvedAmount: string | null;
    note: string;
    aidStatus: string;
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