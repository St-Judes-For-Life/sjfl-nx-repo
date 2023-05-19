import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import HomeIcon from '@mui/icons-material/Home';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import MenuIcon from '@mui/icons-material/Menu';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Paper from '@mui/material/Paper';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { SyntheticEvent, useEffect, useState } from 'react';
import {
  Outlet,
  useLocation,
  useNavigate,
  useNavigation,
} from 'react-router-dom';
import { Scaffold } from '../../shared/components/containers/Scaffold';
import { FullScreenSpinner } from '../../shared/components/progress/FullScreenSpinner';
import { DrawerMenu } from './DrawerMenu/DrawerMenu';

export const AppLayout = () => {
  const location = useLocation();

  const [route, setRoute] = useState<string>('');
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const navigation = useNavigation();
  const showSpinner = navigation.state === 'submitting';

  useEffect(() => {
    setRoute(location.pathname.split('/')[1]);
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

  const footer = (
    <Paper component="footer" elevation={3}>
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
        <BottomNavigationAction label="Menu" value="menu" icon={<MenuIcon />} />
      </BottomNavigation>
    </Paper>
  );

  return (
    <Scaffold footer={footer}>
      <>
        {showSpinner ? <FullScreenSpinner /> : <Outlet />}
        <SwipeableDrawer
          anchor="right"
          open={drawerOpen}
          onClose={closeDrawer}
          onOpen={openDrawer}
        >
          <DrawerMenu onDismiss={closeDrawer} />
        </SwipeableDrawer>
      </>
    </Scaffold>
  );
};
