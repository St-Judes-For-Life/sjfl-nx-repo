import { Trans } from '@lingui/macro';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import { Page } from '../../../components/Containers/Page';

export const AidLandingPage = () => {
  return (
    <Page>
      <AppBar position="sticky">
        <Toolbar>
          <IconButton size="large" edge="start">
            <MedicalServicesIcon />
          </IconButton>
          <h1 className="flex-grow">
            <Trans id="AidLanding.Header">Request Aid</Trans>
          </h1>
          <IconButton size="large" edge="end">
            <AddCircleOutlineIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Page>
  );
};
