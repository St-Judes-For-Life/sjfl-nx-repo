import { ProfilePage, HelpPage, SettingsPage } from '.';
import { DrawerItems } from '../models/DrawerItem';

export type ActiveMenuItemProps = {
  activeMenuItem: DrawerItems;
  onClose: VoidFunction;
};

export const ActiveMenuItem = ({
  activeMenuItem,
  onClose: handleClose,
}: ActiveMenuItemProps) => {
  if (activeMenuItem === 'profile') {
    return <ProfilePage onClose={handleClose}></ProfilePage>;
  } else if (activeMenuItem === 'help') {
    return <HelpPage onClose={handleClose}></HelpPage>;
  } else if (activeMenuItem === 'settings') {
    return <SettingsPage onClose={handleClose}></SettingsPage>;
  } else {
    return <div></div>;
  }
};
