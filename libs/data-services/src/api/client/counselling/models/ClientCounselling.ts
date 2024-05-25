export type CounsellingStatus =
  | 'REQUESTED'
  | 'RESCHEDULED'
  | 'ACCEPTED'
  | 'CANCELLED'
  | 'REJECTED'
  | 'COMPLETED';

export type ClientCounsellingSession = {
  counsellingId: string;
  counsellingDate: string;
  note: string;
  counsellingStatus: CounsellingStatus;
};
