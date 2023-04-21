import { t, Trans } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { FilterChip } from '../../../../shared/components/containers/FilterChip';
import { Scaffold } from '../../../../shared/components/containers/Scaffold';
import { AppHeader } from '../../../../shared/components/containers/AppHeader';

export const AidLandingPage = () => {
  const { i18n } = useLingui();
  const navigate = useNavigate();

  const createRequestHandler = () => {
    navigate('../editor/create');
  };

  const header = (
    <AppHeader
      slots={{
        left: <MedicalServicesIcon color="primary" />,
        right: (
          <IconButton size="large" edge="end" onClick={createRequestHandler}>
            <AddCircleOutlineIcon />
          </IconButton>
        ),
      }}
      title={i18n._(t({ id: 'AidLanding.Title', message: 'Aid' }))}
    />
  );

  return (
    <Scaffold header={header}>
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
    </Scaffold>
  );
};
