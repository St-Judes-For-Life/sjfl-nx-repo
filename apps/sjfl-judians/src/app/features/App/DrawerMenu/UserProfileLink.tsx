import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import classNames from 'classnames';
import { FC } from 'react';
import { UserProfile } from '../../Auth/models/Profile';

type UserProfileLinkProps = {
  user: UserProfile;
  className?: string;
};

export const UserProfileLink: FC<UserProfileLinkProps> = ({
  user,
  className,
}) => {
  return (
    <section
      className={classNames(
        className,
        'flex flex-col justify-end items-start pt-2'
      )}
    >
      <Button className="flex gap-4 !p-3">
        <Avatar
          src={user.imageUrl}
          sx={{ width: '6rem', height: '6rem', fontSize: '3rem' }}
        >
          {user.name?.substring(0, 1).toLocaleUpperCase()}
        </Avatar>
        <span className="text-left">
          <h2 className="text-2xl font-bold text-primary">{user.name}</h2>
          {user.email && (
            <h3 className="text-lg text-secondary">{user.email}</h3>
          )}
          <h4 className="text-tertiary">{user.mobileNumber}</h4>
        </span>
      </Button>
    </section>
  );
};
