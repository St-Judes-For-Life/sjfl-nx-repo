import { Trans } from '@lingui/macro';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { Logo } from '../../components/Logo/Logo';
import { Page } from '../../components/Page/Page';
export const AuthLandingPage = () => {
  const navigate = useNavigate();

  return (
    <Page className="flex items-center justify-around flex-col">
      <Logo size="large"></Logo>
      <section className="grid gap-5 w-full px-8">
        <Button
          size="large"
          fullWidth={true}
          variant="contained"
          color="primary"
          onClick={() => {
            navigate('register');
          }}
        >
          <Trans id="AuthLanding.Register">REGISTER</Trans>
        </Button>
        <Button
          size="large"
          fullWidth={true}
          variant="outlined"
          color="primary"
          onClick={() => {
            navigate('sign-in');
          }}
        >
          <Trans id="AuthLanding.SignIn"> SIGN IN</Trans>
        </Button>
      </section>
    </Page>
  );
};
