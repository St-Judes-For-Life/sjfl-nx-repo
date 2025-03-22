export type OTPType = 'REGISTRATION' | 'LOGIN';

export type SendOtpRequest = {
  otpType: OTPType;
  uid: string;
  sendSms: boolean;
};

export type VerifyOtpRequest = {
  otpType: OTPType;
  uid: string;
  otp: string;
};

export const OTPError = {
  STALE_OTP: 'STALE_OTP',
  INVALID_OTP: 'INVALID_OTP',
  OTP_SEND_COOLDOWN_NOT_OVER: 'OTP_SEND_COOLDOWN_NOT_OVER',
  USER_MAX_VERIFICATION_ATTEMPT_EXEMPTED:
    'USER_MAX_VERIFICATION_ATTEMPT_EXEMPTED',
};
