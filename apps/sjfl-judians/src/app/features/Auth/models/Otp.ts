export type VerifyOtpRequest = {
  otpType: 'REGISTRATION' | 'LOGIN';
  uid: string;
  otp: string;
};
