import ClearIcon from '@mui/icons-material/Clear';
import IconButton from '@mui/material/IconButton';
import { FC } from 'react';
import { useLoggedInUser } from '../../../helpers/hooks/useAuth';
import { Page } from '../../../components/Containers/Page';
import { MenuLinks } from './MenuLinks';
import { UserProfileLink } from './UserProfileLink';

type Props = {
  onDismiss: () => void;
};

export const DrawerMenu: FC<Props> = ({ onDismiss }) => {
  const user = useLoggedInUser();
  return (
    <Page className="flex flex-col safe-area">
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
    </Page>
  );
};
