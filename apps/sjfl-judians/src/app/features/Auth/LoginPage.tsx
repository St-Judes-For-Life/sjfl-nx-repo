import { t, Trans } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import { MouseEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Logo } from '../../shared/components/images/Logo';
import { Page } from '../../shared/components/containers/Page';
import { useAuth } from '../../shared/helpers/hooks/useAuth';

export const LoginPage = () => {
  const navigate = useNavigate();
  const { i18n } = useLingui();
  const [showPassword, setShowPassword] = useState(false);
  const { logIn } = useAuth();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };
  return (
    <Page className="flex flex-col">
      <div className="flex justify-center pt-24 pb-10">
        <Logo size="medium"></Logo>
      </div>

      <div className="p-8 w-full flex flex-col flex-1 gap-6">
        <FormControl fullWidth={true}>
          <FormLabel htmlFor="uid">
            <Trans id="Auth.UID">UID</Trans>
          </FormLabel>
          <OutlinedInput
            id="uid"
            autoFocus={true}
            fullWidth={true}
            autoComplete="username"
            placeholder={i18n._(
              t({ id: 'Auth.UID_Placeholder', message: 'Enter your UID' })
            )}
          />
        </FormControl>
        <FormControl fullWidth={true}>
          <FormLabel htmlFor="password">
            <Trans id="Auth.Password">Password</Trans>
          </FormLabel>
          <OutlinedInput
            id="password"
            type={showPassword ? 'text' : 'password'}
            autoComplete="current-password"
            fullWidth={true}
            placeholder={i18n._(
              t({
                id: 'Auth.Password_Placeholder',
                message: 'Enter your Password',
              })
            )}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        <Button color="accent" className="self-end" fullWidth={false}>
          <Trans id="Auth.Login.TroubleWithSignIn">
            Having trouble signing in?
          </Trans>
        </Button>
        <div className="flex-1 flex justify-end flex-col">
          <Button
            size="large"
            fullWidth={true}
            variant="contained"
            color="primary"
            onClick={logIn}
          >
            <Trans id="Auth.SignIn"></Trans>
          </Button>
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
              <Trans id="Auth.Register"></Trans>
            </Button>
          </span>
        </div>
      </div>
    </Page>
  );
};
