import ClearIcon from '@mui/icons-material/Clear';
import IconButton from '@mui/material/IconButton';
import { FC } from 'react';
import { useLoggedInUser } from '../../../shared/hooks/useAuth';
import { MenuLinks } from './MenuLinks';
import { UserProfileLink } from './UserProfileLink';
import { Divider } from '@mui/material';

type DrawerMenuProps = {
  onDismiss: () => void;
  onMenuItemClick: (menuItemName: string) => void;
};

export const DrawerMenu: FC<DrawerMenuProps> = ({
  onDismiss,
  onMenuItemClick,
}) => {
  const user = useLoggedInUser();
  return (
    <div className="h-screen flex flex-col safe-area w-[80vw]">
      <IconButton
        aria-label="close-menu"
        className="!ml-auto !pr-4 mt-2"
        onClick={onDismiss}
        color="secondary"
      >
        <ClearIcon fontSize="large" />
      </IconButton>
      <UserProfileLink user={user} />
      <Divider variant="middle"></Divider>
      <MenuLinks onMenuItemClick={onMenuItemClick} />
    </div>
  );
};
