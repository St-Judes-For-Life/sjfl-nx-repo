import { Maybe, MaybeNull } from '../../../../models';

export interface UserProfile {
  name: string;
  gender?: Maybe<string>;
  dateOfBirth?: MaybeNull<string>;
  mobileNumber: string;
  email?: Maybe<string>;
  imageUrl?: Maybe<string>;
}
