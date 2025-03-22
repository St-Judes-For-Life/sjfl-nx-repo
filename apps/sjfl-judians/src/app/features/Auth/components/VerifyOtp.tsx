import { zodResolver } from '@hookform/resolvers/zod';
import CloseIcon from '@mui/icons-material/Close';
import { Button, Dialog } from '@mui/material';
import { FC, useState } from 'react';

import { i18n } from '@lingui/core';
import { t } from '@lingui/macro';
import LoadingButton from '@mui/lab/LoadingButton';
import { AxiosError } from 'axios';
import {
  Controller,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from 'react-hook-form';
import { z } from 'zod';
import { AppHeader } from '../../../shared/components/containers/AppHeader';
import { Scaffold } from '../../../shared/components/containers/Scaffold';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '../../../shared/components/inputs/InputOTP';
import { SlideUp } from '../../../shared/helpers/transitions/DialogTransitions';
import { useAuth } from '../../../shared/hooks/useAuth';
import { useCountdown } from '../../../shared/hooks/useCountdown';
import { ErrorResponse } from '../../../shared/models/error.model';
import { useFetchProfile } from '../hooks/profile';
import { useVerifyOtp } from '../hooks/verifyOtp';
import { OTPError, VerifyOtpRequest } from '../models/Otp';
import { useSendOtp } from '../hooks/sendOtp';

type VerifyOtpProps = {
  open: boolean;
  verifyReq: Omit<VerifyOtpRequest, 'otp'>;
  onVerifyComplete: (status: boolean) => void;
  onClose: VoidFunction;
};

const otpFormSchema = z.object({
  otp: z
    .string()
    .min(6, {
      message: 'Your one-time password must be 6 characters.',
    })
    .max(6, {
      message: 'Your one-time password must be 6 characters.',
    }),
});

type OTPForm = z.infer<typeof otpFormSchema>;

export const VerifyOtp: FC<VerifyOtpProps> = ({
  open = false,
  verifyReq,
  onVerifyComplete,
  onClose,
}) => {
  const { secondsLeft, restart, stopCountdown } = useCountdown(30);

  const [attemptsExceeded, setAttemptsExceeded] = useState(false);

  const { control, handleSubmit, reset, setError } = useForm<OTPForm>({
    resolver: zodResolver(otpFormSchema),
  });

  const { logIn } = useAuth();
  const { mutateAsync: verifyOtp, isPending: verifyingOtp } = useVerifyOtp();
  const { mutateAsync: fetchProfile, isPending: fetchingProfile } =
    useFetchProfile();

  const { mutateAsync: sendOtp } = useSendOtp();

  const submitHandler: SubmitHandler<OTPForm> = async (form) => {
    try {
      const resp = await verifyOtp({
        otp: form.otp,
        otpType: verifyReq.otpType,
        uid: verifyReq.uid,
      });

      if (resp) {
        console.log(resp);

        const profile = await fetchProfile();
        if (profile.data) {
          logIn(profile.data);
          onVerifyComplete(true);
        }
      }
    } catch (error) {
      const err = error as AxiosError<ErrorResponse>;
      console.error(err.response?.data);

      if (err.response?.data.errorCode === OTPError.STALE_OTP) {
        console.log('stale otp');
        setError('otp', {
          type: 'manual',
          message: i18n._(
            t({
              id: 'Auth.VerifyOTP.StaleOTP',
              message: 'OTP has expired. Please generate a new OTP.',
            })
          ),
        });
      }

      if (err.response?.data.errorCode === OTPError.INVALID_OTP) {
        console.log('invalid otp');
        setError('otp', {
          type: 'manual',
          message: i18n._(
            t({
              id: 'Auth.VerifyOTP.InvalidOTP',
              message: 'Invalid OTP. Please try again.',
            })
          ),
        });
      }

      if (
        err.response?.data.errorCode ===
        OTPError.USER_MAX_VERIFICATION_ATTEMPT_EXEMPTED
      ) {
        setAttemptsExceeded(true);
      }
    }
  };

  const errorHandler: SubmitErrorHandler<OTPForm> = (errors) => {
    console.log(errors);
  };

  const handleResend = async () => {
    try {
      const resp = await sendOtp({
        uid: verifyReq.uid,
        otpType: verifyReq.otpType,
        sendSms: true,
      });
      if (resp.status === 200) {
        reset({ otp: '' });
        stopCountdown();
        restart();
      }
    } catch (e) {
      const error = e as AxiosError<ErrorResponse>;
      if (
        error.response?.data.errorCode === OTPError.OTP_SEND_COOLDOWN_NOT_OVER
      ) {
        setError('otp', {
          type: 'manual',
          message: i18n._(
            t({
              id: 'Auth.VerifyOTP.OTPResendCooldown',
              message: 'Please wait before resending OTP.',
            })
          ),
        });
      }
    }
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const header = (
    <AppHeader
      title={i18n._(t({ id: 'Auth.VerifyOTP', message: 'Verify OTP' }))}
      backEnabled={true}
      backIcon={<CloseIcon />}
      onBack={handleClose}
    ></AppHeader>
  );

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullScreen
      TransitionComponent={SlideUp}
    >
      <Scaffold header={header}>
        {attemptsExceeded ? (
          <div className="flex flex-col justify-center items-center gap-16 p-4 mt-4">
            <img
              className="h-60 w-60"
              src="assets/access_denied.svg"
              alt="access denied"
            />
            <p className="text-center">
              {i18n._(
                t({
                  id: 'Auth.VerifyOTP.MaxVerificationAttemptExempted',
                  message:
                    'You have reached the maximum verification attempts. Please try again later.',
                })
              )}
            </p>
            <Button
              size="large"
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleClose}
            >
              Close
            </Button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit(submitHandler, errorHandler)}
            className="flex flex-col justify-center items-center gap-16 mt-4 p-4"
          >
            <Controller
              control={control}
              name="otp"
              render={({
                field: { onChange, onBlur, value, ref },
                fieldState,
              }) => (
                <div className="flex flex-col items-center gap-4 w-full">
                  <InputOTP
                    maxLength={6}
                    inputMode="numeric"
                    ref={ref}
                    value={value?.toString()}
                    onBlur={onBlur}
                    onChange={onChange}
                  >
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                    </InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup>
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                  {fieldState.error && (
                    <p className="text-red-500 text-sm">
                      {fieldState.error.message}
                    </p>
                  )}
                </div>
              )}
            ></Controller>
            <div className="flex flex-col items-center justify-center gap-4 w-full">
              <LoadingButton
                size="large"
                fullWidth
                variant="contained"
                color="primary"
                type="submit"
                loading={verifyingOtp || fetchingProfile}
              >
                Verify
              </LoadingButton>
              <Button
                size="large"
                fullWidth
                variant="outlined"
                color="primary"
                onClick={handleClose}
              >
                Cancel
              </Button>
              <div className="flex items-center">
                Didn't receive OTP?
                <Button
                  color="accent"
                  disabled={secondsLeft !== 0}
                  onClick={handleResend}
                >
                  Resend OTP
                </Button>
                {secondsLeft !== 0 && <span> in {secondsLeft}</span>}
              </div>
            </div>
          </form>
        )}
      </Scaffold>
    </Dialog>
  );
};
