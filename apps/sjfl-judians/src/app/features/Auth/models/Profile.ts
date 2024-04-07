import { Maybe } from '../../../shared/models/maybe.model';

export interface UserProfile {
  name: string;
  gender: string;
  dateOfBirth: string;
  mobileNumber: string;
  email: string;
  imageUrl?: Maybe<string>;
}
