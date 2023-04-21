import { Trans } from '@lingui/macro';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { Logo } from '../../../shared/components/images/Logo';
import { Page } from '../../../shared/components/containers/Page';
import { useLoggedInUser } from '../../../shared/hooks/useAuth';

export const DashboardPage = () => {
  const user = useLoggedInUser();
  const firstName = user?.name.split(' ')[0];

  const navigate = useNavigate();

  const createRequestHandler = () => {
    navigate('./aid/editor/create');
  };

  return (
    <>
      <div className="flex-grow flex flex-col items-center justify-center">
        <h2 className="text-3xl text-primary font-bold text-center">
          <Trans id="Dashboard.Hi">Hello {firstName},</Trans>
        </h2>
        <h2 className="pt-2 pb-10 text-2xl text-primary font-bold text-center">
          <Trans id="Dashboard.Welcome">Welcome to</Trans>
        </h2>
        <Logo></Logo>
      </div>
      <div className="flex-1 flex flex-col justify-center px-6 gap-4">
        <Button
          size="large"
          fullWidth
          variant="contained"
          color="primary"
          onClick={createRequestHandler}
        >
          <Trans id="Dashboard.Aid">REQUEST FOR AID</Trans>
        </Button>
        <Button
          size="large"
          fullWidth
          variant="contained"
          color="primary"
          onClick={() => navigate('counselling')}
        >
          <Trans id="Dashboard.Schedule">SCHEDULE A SESSION</Trans>
        </Button>
      </div>
    </>
  );
};
