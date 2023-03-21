import { Divider } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import classNames from 'classnames';
import { FC } from 'react';
import { User } from '../../models/auth.model';

type Props = {
  user: User;
  className?: string;
};

export const UserProfileLink: FC<Props> = ({ user, className }) => {
  return (
    <section
      className={classNames(className, 'flex flex-col justify-end pt-4')}
    >
      <button className="flex gap-4 p-5">
        <Avatar
          src={user.imageUrl}
          sx={{ width: '6rem', height: '6rem', fontSize: '3rem' }}
        >
          {user.name.substring(0, 1).toLocaleUpperCase()}
        </Avatar>
        <span className="text-left">
          <h2 className="text-2xl font-bold text-primary">{user.name}</h2>
          {user.email && (
            <h3 className="text-lg text-secondary">{user.email}</h3>
          )}
          <h4 className="text-tertiary">{user.mobile}</h4>
        </span>
      </button>
      <Divider variant="middle"></Divider>
    </section>
  );
};
