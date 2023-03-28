import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import { Page } from '../../../shared/components/containers/Page';
import IconButton from '@mui/material/IconButton';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Trans } from '@lingui/macro';

export const CounsellingLandingPage = () => {
  return (
    <Page>
      <AppBar position="sticky">
        <Toolbar>
          <IconButton size="large" edge="start">
            <CalendarMonthIcon />
          </IconButton>
          <h1 className="flex-grow">
            <Trans id="Counselling.Header">Counselling</Trans>
          </h1>
          <IconButton size="large" edge="end">
            <AddCircleOutlineIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Page>
  );
};
