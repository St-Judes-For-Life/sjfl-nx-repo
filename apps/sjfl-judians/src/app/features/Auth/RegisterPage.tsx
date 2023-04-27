import { t, Trans } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import { useNavigate } from 'react-router-dom';
import { Scaffold } from '../../shared/components/containers/Scaffold';
import { Logo } from '../../shared/components/images/Logo';

export const RegisterPage = () => {
  const navigate = useNavigate();
  const { i18n } = useLingui();

  return (
    <Scaffold>
      <div className="flex justify-center items-end pt-24 pb-10">
        <Logo size="medium"></Logo>
      </div>

      <div className="p-6 w-full flex flex-col flex-1 gap-6">
        <FormControl fullWidth required>
          <FormLabel htmlFor="uid">
            <Trans id="Auth.UID">UID</Trans>
          </FormLabel>
          <OutlinedInput
            id="uid"
            autoFocus={true}
            fullWidth
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
            id="mobile"
            fullWidth
            autoComplete="tel"
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
          <Button size="large" fullWidth variant="contained" color="primary">
            <Trans id="Auth.Register"></Trans>
          </Button>
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
              <Trans id="Auth.SignIn"></Trans>
            </Button>
          </span>
        </div>
      </div>
    </Scaffold>
  );
};
