import { Trans } from '@lingui/macro';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { Page } from '../../../../shared/components/containers/Page';

export const AidRequestSuccess = () => {
  const navigate = useNavigate();
  return (
    <Page className="flex flex-col gap-6 items-center justify-center">
      <CheckCircleOutlineIcon
        color="success"
        sx={{ fontSize: '7rem' }}
        className="mt-6"
      />
      <h1 className="text-3xl font-light text-primary text-center">
        <Trans id="AidRequestSuccess.Created">
          Your request has been received
        </Trans>
      </h1>
      <img src="/assets/aid_success.svg" alt="Aid Request Created" />
      <h2 className="text-xl font-light text-primary text-center">
        Req ID - REQ123456
      </h2>
      <Button fullWidth variant="contained" onClick={() => navigate('/aid')}>
        <Trans id="Btn.GoHome">GO TO HOME</Trans>
      </Button>
      <Button fullWidth variant="outlined">
        <Trans id="AidRequestSuccess.ViewReq">VIEW REQUEST</Trans>
      </Button>
    </Page>
  );
};
