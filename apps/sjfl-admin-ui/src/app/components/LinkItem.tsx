import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { cn } from '@sjfl/ui';

type LinkItemProps = {
  to: string;
};

export const LinkItem: FC<
  React.HTMLAttributes<HTMLAnchorElement> & LinkItemProps
> = ({ to, children, className, ...props }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cn(
          className,
          isActive ? 'border-b border-slate-800' : '',
          'md:hover:border-b'
        )
      }
      {...props}
    >
      {children}
    </NavLink>
  );
};
