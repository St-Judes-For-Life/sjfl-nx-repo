import { zodResolver } from '@hookform/resolvers/zod';
import CloseIcon from '@mui/icons-material/Close';
import { Button, Dialog } from '@mui/material';
import { FC } from 'react';

import { i18n } from '@lingui/core';
import { t } from '@lingui/macro';
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
import { useCountdown } from '../../../shared/hooks/useCountdown';
import { VerifyOtpRequest } from '../models/Otp';
import { useVerifyOtp } from '../hooks/verifyOtp';
import { useFetchProfile } from '../hooks/profile';
import { useAuth } from '../../../shared/hooks/useAuth';
import LoadingButton from '@mui/lab/LoadingButton';

type VerifyOtpProps = {
  open: boolean;
  verifyReq: Omit<VerifyOtpRequest, 'otp'>;
  onVerifyComplete: (status: boolean) => void;
  onClose: VoidFunction;
};

const otpFormSchema = z.object({
  otp: z.string().min(6).max(6),
});

type OTPForm = z.infer<typeof otpFormSchema>;

export const VerifyOtp: FC<VerifyOtpProps> = ({
  open = false,
  verifyReq,
  onVerifyComplete,
  onClose,
}) => {
  const { secondsLeft, restart, stopCountdown } = useCountdown(30);

  const { control, handleSubmit, reset } = useForm<OTPForm>({
    resolver: zodResolver(otpFormSchema),
  });

  const { logIn } = useAuth();
  const { mutateAsync: verifyOtp, isPending: verifyingOtp } = useVerifyOtp();
  const { mutateAsync: fetchProfile, isPending: fetchingProfile } =
    useFetchProfile();

  const submitHandler: SubmitHandler<OTPForm> = async (form) => {
    const resp = await verifyOtp({
      otp: form.otp,
      otpType: verifyReq.otpType,
      uid: verifyReq.uid,
    });

    if (resp) {
      const profile = await fetchProfile();
      if (profile) {
        logIn(profile);
        onVerifyComplete(true);
      } else {
        onVerifyComplete(false);
      }
    } else {
      onVerifyComplete(false);
    }
  };

  const errorHandler: SubmitErrorHandler<OTPForm> = (errors) => {
    console.log(errors);
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
        <form
          onSubmit={handleSubmit(submitHandler, errorHandler)}
          className="flex flex-col justify-center items-center gap-16 mt-4 p-4"
        >
          <Controller
            control={control}
            name="otp"
            render={({ field: { onChange, onBlur, value, ref } }) => (
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
                onClick={restart}
              >
                Resend OTP
              </Button>
              {secondsLeft !== 0 && <span> in {secondsLeft}</span>}
            </div>
          </div>
        </form>
      </Scaffold>
    </Dialog>
  );
};
