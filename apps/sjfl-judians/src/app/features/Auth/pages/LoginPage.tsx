import { zodResolver } from '@hookform/resolvers/zod';
import { t, Trans } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import LoadingButton from '@mui/lab/LoadingButton';
import { FormHelperText } from '@mui/material';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import { AxiosError } from 'axios';
import { useState } from 'react';
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { Scaffold } from '../../../shared/components/containers/Scaffold';
import { Logo } from '../../../shared/components/images/Logo';
import { ErrorResponse } from '../../../shared/models/error.model';
import { VerifyOtp } from '../components/VerifyOtp';
import { useSendOtp } from '../hooks/sendOtp';
import { LoginError } from '../models/Login';
import { OTPError, VerifyOtpRequest } from '../models/Otp';

const loginUserSchema = z.object({
  uid: z.string(),
});

type LoginUserForm = z.infer<typeof loginUserSchema>;

export const LoginPage = () => {
  const navigate = useNavigate();
  const { i18n } = useLingui();
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
    setError,
  } = useForm<LoginUserForm>({
    resolver: zodResolver(loginUserSchema),
  });
  const { mutateAsync: sendOtp, isPending: sendingOtp } = useSendOtp();

  const [verifyOtpReq, setVerifyOtpReq] =
    useState<Omit<VerifyOtpRequest, 'otp'>>();

  const handleSendOtp: SubmitHandler<LoginUserForm> = async (form) => {
    try {
      const resp = await sendOtp({
        uid: getValues('uid'),
        otpType: 'LOGIN',
        sendSms: true,
      });
      if (resp.status === 200) {
        setVerifyOtpReq({
          otpType: 'LOGIN',
          uid: form.uid,
        });
      }
    } catch (e) {
      const error = e as AxiosError<ErrorResponse>;
      const errorCode = error.response?.data.errorCode;
      if (errorCode === LoginError.USER_NOT_FOUND) {
        setError('uid', {
          type: 'manual',
          message: i18n._(
            t({
              id: 'Auth.Login.UserNotFound',
              message: 'Invalid UID. Please try again.',
            })
          ),
        });
      }
      if (errorCode === OTPError.USER_MAX_VERIFICATION_ATTEMPT_EXEMPTED) {
        setError('uid', {
          type: 'manual',
          message: i18n._(
            t({
              id: 'Auth.Login.MaxVerificationAttemptExempted',
              message:
                'You have reached the maximum verification attempts. Please try again later.',
            })
          ),
        });
      }
    }
  };

  const errorHandler: SubmitErrorHandler<LoginUserForm> = (errors) => {
    console.log(errors);
  };

  return (
    <>
      <Scaffold>
        <div className="flex justify-center pt-24 pb-10">
          <Logo size="medium"></Logo>
        </div>

        <form
          onSubmit={handleSubmit(handleSendOtp, errorHandler)}
          className="p-6 w-full flex flex-col flex-1 gap-6"
        >
          <FormControl fullWidth required>
            <FormLabel htmlFor="uid">
              <Trans id="Auth.UID">UID</Trans>
            </FormLabel>
            <OutlinedInput
              id="uid"
              fullWidth
              autoComplete="username"
              {...register('uid')}
              error={!!errors.uid}
              type="decimal"
              placeholder={i18n._(t({ id: 'Auth.UID_Placeholder' }))}
            />
            {errors.uid?.message && (
              <FormHelperText error className="text-sm">
                {errors.uid?.message}
              </FormHelperText>
            )}
          </FormControl>
          <Button color="accent" className="self-end" fullWidth={false}>
            <Trans id="Auth.Login.TroubleWithSignIn">
              Having trouble signing in?
            </Trans>
          </Button>
          <div className="flex-1 flex justify-end flex-col">
            <LoadingButton
              size="large"
              fullWidth
              variant="contained"
              color="primary"
              type="submit"
              loading={sendingOtp}
            >
              {i18n._(
                t({
                  id: 'Auth.SendOtp',
                  message: 'Send OTP',
                })
              )}
            </LoadingButton>
            <span className="flex items-center justify-center pt-4">
              <Trans id="Auth.Login.DontHaveAccount">
                Don't have an account?
              </Trans>
              <Button
                color="accent"
                fullWidth={false}
                className="!pl-3 !pt-[6px] "
                onClick={() => navigate('../register')}
              >
                {i18n._(
                  t({
                    id: 'Auth.Register',
                  })
                )}
              </Button>
            </span>
          </div>
        </form>
      </Scaffold>
      {!!verifyOtpReq && (
        <VerifyOtp
          open={!!verifyOtpReq}
          verifyReq={verifyOtpReq}
          onClose={() => {
            setVerifyOtpReq(undefined);
          }}
          onVerifyComplete={(status) => {
            console.log(status);
          }}
        />
      )}
    </>
  );
};
