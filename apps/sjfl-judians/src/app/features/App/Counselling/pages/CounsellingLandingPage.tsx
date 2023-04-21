import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { t, Trans } from '@lingui/macro';
import { NavLink, Outlet } from 'react-router-dom';
import { useLingui } from '@lingui/react';

import { Page } from '../../../../shared/components/containers/Page';
import { FilterChip } from '../../../../shared/components/containers/FilterChip';
import { AppHeader } from '../../../../shared/components/containers/AppHeader';

export const CounsellingLandingPage = () => {
  const { i18n } = useLingui();
  return (
    <Page className="flex flex-col">
      <AppHeader
        slots={{
          left: <CalendarMonthIcon color="primary" />,
          right: (
            <IconButton size="large" edge="end">
              <AddCircleOutlineIcon />
            </IconButton>
          ),
        }}
        title={i18n._(t({ id: 'Counselling.Header', message: 'Counselling' }))}
      />
      <div className="flex gap-4 p-4">
        <NavLink to="upcoming" className="flex-grow" draggable={false}>
          {({ isActive }) => (
            <FilterChip
              label={i18n._(
                t({ id: 'CounsellingLanding.Upcoming', message: 'Upcoming' })
              )}
              selected={isActive}
            />
          )}
        </NavLink>
        <NavLink to="past" className="flex-grow">
          {({ isActive }) => (
            <FilterChip
              label={i18n._(
                t({ id: 'CounsellingLanding.Past', message: 'Past' })
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
