import { MaybeNull } from '../../../../models';

export type CounsellingSearchTypeClient = 'upcoming' | 'past';

export type CreateSessionRequest = {
  requestDate: string;
  note?: MaybeNull<string>;
};

export type CreateSessionResponse = {
  counsellingId: string;
  counsellingDate: string;
  note: string;
  counsellingStatus: string;
};

export type CounsellingStatus =
  | 'REQUESTED'
  | 'RESCHEDULED'
  | 'ACCEPTED'
  | 'CANCELLED'
  | 'REJECTED'
  | 'COMPLETED';

export type CounsellingSession = {
  counsellingId: string;
  counsellingDate: string;
  note: string;
  counsellingStatus: CounsellingStatus;
  statusNote: string;
  userName: string;
  eventTime: string;
};
