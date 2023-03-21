import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import LockResetIcon from '@mui/icons-material/LockReset';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';

import { MenuItem } from './MenuItem';
import Divider from '@mui/material/Divider';
import { useAuth } from '../../helpers/hooks/useAuth';
import { Trans } from '@lingui/macro';

export const MenuLinks = () => {
  const { logOut } = useAuth();

  const onLogout = () => {
    logOut();
  };

  return (
    <section className="flex-1 flex flex-col items-start p-4 gap-8">
      <MenuItem>
        <AccountCircleIcon fontSize="medium" className="mr-8" />
        <Trans id="Drawer.Profile">Profile</Trans>
      </MenuItem>
      <MenuItem>
        <LockResetIcon fontSize="medium" className="mr-8" />
        <Trans id="Drawer.ChangePassword">Change Password</Trans>
      </MenuItem>
      <MenuItem>
        <HelpOutlineIcon fontSize="medium" className="mr-8" />
        <Trans id="Drawer.Help">Help</Trans>
      </MenuItem>
      <MenuItem>
        <SettingsIcon fontSize="medium" className="mr-8" />
        <Trans id="Drawer.Settings">Settings</Trans>
      </MenuItem>
      <div className="flex-1 flex flex-col justify-end w-full">
        <Divider></Divider>
        <MenuItem color="error" onClick={onLogout}>
          <LogoutIcon fontSize="medium" className="mr-8" />

          <Trans id="Drawer.Logout">Log out</Trans>
        </MenuItem>
      </div>
    </section>
  );
};
