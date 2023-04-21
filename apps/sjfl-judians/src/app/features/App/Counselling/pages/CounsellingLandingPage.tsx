import { t } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import IconButton from '@mui/material/IconButton';
import { NavLink, Outlet } from 'react-router-dom';

import { AppHeader } from '../../../../shared/components/containers/AppHeader';
import { FilterChip } from '../../../../shared/components/containers/FilterChip';
import { Scaffold } from '../../../../shared/components/containers/Scaffold';

export const CounsellingLandingPage = () => {
  const { i18n } = useLingui();
  const header = (
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
  );
  return (
    <Scaffold header={header}>
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
    </Scaffold>
  );
};
