export interface AdminJudian {
  uid: string;
  fullName: string;
  mobileNo: string;
  dateOfBirth: Date;
  gender: string;
  email: string;
  guardianName: string;
  guardianRelationship: string;
  guardianMobile: string;
  guardianEmail: string;
  fullAddress: string;
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
