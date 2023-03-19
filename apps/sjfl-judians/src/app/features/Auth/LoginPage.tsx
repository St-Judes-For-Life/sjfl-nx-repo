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
import { Logo } from '../../components/Logo/Logo';
import { Page } from '../../components/Page/Page';

export const LoginPage = () => {
  const { i18n } = useLingui();
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };
  return (
    <Page>
      <div className="pt-40 flex justify-center">
        <Logo size="small"></Logo>
      </div>
      <div className="flex-1 p-8 w-full flex flex-col gap-6">
        <FormControl fullWidth={true}>
          <FormLabel htmlFor="uid">
            <Trans id="LoginPage.UID">UID</Trans>
          </FormLabel>
          <OutlinedInput
            id="uid"
            autoFocus={true}
            fullWidth={true}
            autoComplete="username"
            placeholder={i18n._(
              t({ id: 'LoginPage.UID_Placeholder', message: 'Enter your UID' })
            )}
          />
        </FormControl>
        <FormControl fullWidth={true}>
          <FormLabel htmlFor="password">Password</FormLabel>
          <OutlinedInput
            id="password"
            type={showPassword ? 'text' : 'password'}
            autoComplete="current-password"
            fullWidth={true}
            placeholder={i18n._(
              t({
                id: 'LoginPage.Password_Placeholder',
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
        <Button
          size="large"
          fullWidth={true}
          variant="contained"
          color="primary"
        >
          <Trans id="Auth.SignIn"></Trans>
        </Button>
      </div>
    </Page>
  );
};
