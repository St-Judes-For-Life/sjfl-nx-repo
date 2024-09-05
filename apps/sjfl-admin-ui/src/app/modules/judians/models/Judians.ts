import { MaybeNull } from '@sjfl/data';

export interface AdminJudian {
  uid: string;
  fullName: string;
  mobileNo: string;
  dateOfBirth: MaybeNull<Date>;
  gender: MaybeNull<string>;
  email: MaybeNull<string>;
  guardianName: MaybeNull<string>;
  guardianRelationship: MaybeNull<string>;
  guardianMobile: MaybeNull<string>;
  guardianEmail: MaybeNull<string>;
  fullAddress: MaybeNull<string>;
  accountLocked: boolean;
  otpVerificationAttempts: string;
  createdAt: string;
  createdBy: string;
  updatedAt: Date;
  updatedBy: string;
}

export type UpdateJudianRequestAdmin = Omit<
  AdminJudian,
  | 'uid'
  | 'createdAt'
  | 'createdBy'
  | 'updatedAt'
  | 'updatedBy'
  | 'otpVerificationAttempts'
>;
