import { FC } from 'react';
import { useLoggedInUser } from '../../helpers/hooks/useAuth';
import { Page } from '../Page/Page';
import { MenuLinks } from './MenuLinks';
import { UserProfileLink } from './UserProfileLink';

type Props = {
  onDismiss: () => void;
};

export const DrawerMenu: FC<Props> = () => {
  const user = useLoggedInUser();
  return (
    <Page className="flex flex-col safe-area">
      <UserProfileLink user={user} />
      <MenuLinks />
    </Page>
  );
};
