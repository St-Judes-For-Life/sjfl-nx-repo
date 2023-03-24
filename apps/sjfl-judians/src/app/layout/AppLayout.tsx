import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import HomeIcon from '@mui/icons-material/Home';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import MenuIcon from '@mui/icons-material/Menu';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Paper from '@mui/material/Paper';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { SyntheticEvent, useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { DrawerMenu } from '../features/App/DrawerMenu/DrawerMenu';

export const Component = () => {
  const [route, setRoute] = useState<string>('');
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setRoute(location.pathname.replace('/', ''));
  }, [location]);

  const onRouteChange = (_event: SyntheticEvent, route: string) => {
    if (route === 'menu') {
      setDrawerOpen(true);
      return;
    }
    setRoute(route);
    navigate(route);
  };

  const openDrawer = () => setDrawerOpen(true);
  const closeDrawer = () => setDrawerOpen(false);

  return (
    <>
      <Outlet></Outlet>
      <Paper
        component="footer"
        className="fixed bottom-0 left-0 right-0"
        elevation={3}
      >
        <BottomNavigation showLabels value={route} onChange={onRouteChange}>
          <BottomNavigationAction label="Home" value="" icon={<HomeIcon />} />
          <BottomNavigationAction
            label="Aid"
            value="aid"
            icon={<MedicalServicesIcon />}
          />
          <BottomNavigationAction
            label="Counselling"
            value="counselling"
            icon={<CalendarMonthIcon />}
          />
          <BottomNavigationAction
            label="Menu"
            value="menu"
            icon={<MenuIcon />}
          />
        </BottomNavigation>
      </Paper>
      <SwipeableDrawer
        anchor="right"
        open={drawerOpen}
        onClose={closeDrawer}
        onOpen={openDrawer}
      >
        <DrawerMenu onDismiss={closeDrawer} />
      </SwipeableDrawer>
    </>
  );
};

Component.displayName = 'AppLayout';
