import ClearIcon from '@mui/icons-material/Clear';
import IconButton from '@mui/material/IconButton';
import { FC } from 'react';
import { useLoggedInUser } from '../../../shared/helpers/hooks/useAuth';
import { MenuLinks } from './MenuLinks';
import { UserProfileLink } from './UserProfileLink';

type DrawerMenuProps = {
  onDismiss: () => void;
};

export const DrawerMenu: FC<DrawerMenuProps> = ({ onDismiss }) => {
  const user = useLoggedInUser();
  return (
    <div className="h-screen flex flex-col safe-area">
      <IconButton
        aria-label="close-menu"
        className="!justify-end !pr-4 mt-2"
        onClick={onDismiss}
        color="secondary"
      >
        <ClearIcon fontSize="large" />
      </IconButton>
      <UserProfileLink user={user} />
      <MenuLinks />
    </div>
  );
};
