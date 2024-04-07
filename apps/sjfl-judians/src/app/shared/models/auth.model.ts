import { AxiosResponse } from 'axios';
import { VerifyOtpRequest } from '../../features/Auth/models/Otp';
import { UserProfile } from '../../features/Auth/models/Profile';
import { Maybe } from './maybe.model';

export interface User {
  uid: string;
  name: string;
  email?: Maybe<string>;
  mobileNo: string;
  imageUrl?: Maybe<string>;
}

export interface IAuthContext {
  isLoggedIn: boolean;
  user: Maybe<UserProfile>;
  logIn: (user: UserProfile) => void;
  logOut: () => void;
}
