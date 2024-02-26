import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { cn } from '../../lib/utils';

type LinkItemProps = {
  to: string;
};

export const LinkItem: FC<
  React.HTMLAttributes<HTMLAnchorElement> & LinkItemProps
> = ({ to, children, className }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cn(
          className,
          isActive ? 'border-b border-slate-800' : '',
          'hover:border-b'
        )
      }
    >
      {children}
    </NavLink>
  );
};
