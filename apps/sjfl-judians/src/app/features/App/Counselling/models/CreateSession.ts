import { Maybe } from '../../../../shared/models/maybe.model';

export type CreateSessionRequest = {
  requestDate: string;
  note?: Maybe<string>;
};

export type CreateSessionResponse = {
  counsellingId: string;
  counsellingDate: string;
  note: string;
  counsellingStatus: string;
};
