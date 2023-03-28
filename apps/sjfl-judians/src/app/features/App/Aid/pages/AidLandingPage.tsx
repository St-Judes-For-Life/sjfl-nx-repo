import { t, Trans } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import { NavLink, Outlet } from 'react-router-dom';
import { FilterChip } from '../../../../shared/components/containers/FilterChip';
import { Page } from '../../../../shared/components/containers/Page';

export const AidLandingPage = () => {
  const { i18n } = useLingui();
  return (
    <Page className="flex flex-col">
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
      <div className="flex gap-4 p-4">
        <NavLink to="in-progress" className="flex-grow" draggable={false}>
          {({ isActive }) => (
            <FilterChip
              label={i18n._(
                t({ id: 'AidLanding.InProgress', message: 'In Progress' })
              )}
              selected={isActive}
            />
          )}
        </NavLink>
        <NavLink to="completed" className="flex-grow">
          {({ isActive }) => (
            <FilterChip
              label={i18n._(
                t({ id: 'AidLanding.Completed', message: 'Completed' })
              )}
              selected={isActive}
            />
          )}
        </NavLink>
      </div>
      <Outlet></Outlet>
    </Page>
  );
};
