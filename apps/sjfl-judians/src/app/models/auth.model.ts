import { Maybe } from './maybe.model';

export interface User {
  uid: string;
  name: string;
  email?: Maybe<string>;
  mobile: string;
  imageUrl?: Maybe<string>;
}

export interface IAuthContext {
  isLoggedIn: boolean;
  user: Maybe<User>;
  logIn: () => void;
  logOut: () => void;
}
