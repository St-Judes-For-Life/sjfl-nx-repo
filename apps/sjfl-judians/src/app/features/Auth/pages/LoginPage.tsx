import { zodResolver } from '@hookform/resolvers/zod';
import { t, Trans } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import LoadingButton from '@mui/lab/LoadingButton';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import { useState } from 'react';
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { Scaffold } from '../../../shared/components/containers/Scaffold';
import { Logo } from '../../../shared/components/images/Logo';
import { VerifyOtp } from '../components/VerifyOtp';
import { useSendOtp } from '../hooks/sendOtp';
import { VerifyOtpRequest } from '../models/Otp';

const loginUserSchema = z.object({
  uid: z.string(),
});

type LoginUserForm = z.infer<typeof loginUserSchema>;

export const LoginPage = () => {
  const navigate = useNavigate();
  const { i18n } = useLingui();
  const { register, handleSubmit, getValues } = useForm<LoginUserForm>({
    resolver: zodResolver(loginUserSchema),
  });
  const { mutateAsync: sendOtp, isPending: sendingOtp } = useSendOtp();

  const [verifyOtpReq, setVerifyOtpReq] =
    useState<Omit<VerifyOtpRequest, 'otp'>>();

  const handleSendOtp: SubmitHandler<LoginUserForm> = async (form) => {
    const resp = await sendOtp(getValues('uid'));
    if (resp.status === 200) {
      setVerifyOtpReq({
        otpType: 'LOGIN',
        uid: form.uid,
      });
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
              type="decimal"
              placeholder={i18n._(t({ id: 'Auth.UID_Placeholder' }))}
            />
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
