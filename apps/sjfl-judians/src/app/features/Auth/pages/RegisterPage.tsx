import { zodResolver } from '@hookform/resolvers/zod';
import { t, Trans } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import { useState } from 'react';
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { Scaffold } from '../../../shared/components/containers/Scaffold';
import { Logo } from '../../../shared/components/images/Logo';
import { useAuth } from '../../../shared/hooks/useAuth';
import { VerifyOtp } from '../components/VerifyOtp';
import { useRegisterUser } from '../hooks/register';
import { VerifyOtpRequest } from '../models/Otp';

const registerUserSchema = z.object({
  uid: z.string(),
  name: z.string(),
  mobileNo: z.string().min(10).max(10),
  email: z.preprocess(
    (arg) => (arg === '' ? undefined : arg),
    z.string().email().optional()
  ),
});

type RegisterUserForm = z.infer<typeof registerUserSchema>;

export const RegisterPage = () => {
  const navigate = useNavigate();
  const { i18n } = useLingui();
  const {
    mutateAsync: requestRegistration,
    isPending: registrationInProgress,
  } = useRegisterUser();

  const [verifyOtpReq, setVerifyOtpReq] =
    useState<Omit<VerifyOtpRequest, 'otp'>>();

  const { register, handleSubmit, getValues } = useForm<RegisterUserForm>({
    resolver: zodResolver(registerUserSchema),
  });

  const submitHandler: SubmitHandler<RegisterUserForm> = async (user) => {
    try {
      const resp = await requestRegistration(user);

      if (resp.status === 200) {
        setVerifyOtpReq({
          otpType: 'REGISTRATION',
          uid: getValues('uid'),
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const errorHandler: SubmitErrorHandler<RegisterUserForm> = (errors) => {
    console.log(errors);
  };

  return (
    <>
      <Scaffold>
        <div className="flex justify-center items-end pt-24 pb-10">
          <Logo size="medium"></Logo>
        </div>

        <form
          className="p-6 w-full flex flex-col flex-1 gap-6"
          onSubmit={handleSubmit(submitHandler, errorHandler)}
        >
          <FormControl fullWidth required>
            <FormLabel htmlFor="uid">
              <Trans id="Auth.UID">UID</Trans>
            </FormLabel>
            <OutlinedInput
              id="uid"
              autoFocus={true}
              fullWidth
              {...register('uid')}
              autoComplete="username"
              placeholder={i18n._(
                t({ id: 'Auth.UID_Placeholder', message: 'Enter your UID' })
              )}
            />
          </FormControl>
          <FormControl fullWidth required>
            <FormLabel htmlFor="name">
              <Trans id="Auth.Name">Name</Trans>
            </FormLabel>
            <OutlinedInput
              id="name"
              fullWidth
              {...register('name')}
              autoComplete="name"
              placeholder={i18n._(
                t({
                  id: 'Auth.Name_Placeholder',
                  message: 'Enter your full name',
                })
              )}
            />
          </FormControl>
          <FormControl fullWidth required>
            <FormLabel htmlFor="mobile">
              <Trans id="Auth.Mobile">Mobile</Trans>
            </FormLabel>
            <OutlinedInput
              id="mobileNo"
              fullWidth
              autoComplete="tel"
              {...register('mobileNo')}
              type="tel"
              inputMode="tel"
              placeholder={i18n._(
                t({
                  id: 'Auth.Mobile_Placeholder',
                  message: 'Enter your mobile number',
                })
              )}
            />
          </FormControl>
          <FormControl fullWidth required={false}>
            <FormLabel htmlFor="email">
              <Trans id="Auth.Email">Email</Trans>
            </FormLabel>
            <OutlinedInput
              id="email"
              fullWidth
              {...register('email')}
              autoComplete="email"
              type="email"
              inputMode="email"
              placeholder={i18n._(
                t({
                  id: 'Auth.Email_Placeholder',
                  message: 'Enter your email id',
                })
              )}
            />
          </FormControl>

          <div className="flex-1 flex justify-end flex-col">
            <LoadingButton
              loading={registrationInProgress}
              size="large"
              fullWidth
              variant="contained"
              color="primary"
              type="submit"
            >
              {i18n._(
                t({
                  id: 'Auth.Register',
                })
              )}
            </LoadingButton>
            <span className="flex items-center justify-center pt-4">
              <Trans id="Auth.Register.AlreadyHaveAccount">
                Already have an account?
              </Trans>
              <Button
                color="accent"
                fullWidth={false}
                className="!pl-3 !pt-[6px]"
                onClick={() => navigate('../sign-in')}
              >
                {i18n._(
                  t({
                    id: 'Auth.SignIn',
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
