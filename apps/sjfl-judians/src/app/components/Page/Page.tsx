import classNames from 'classnames';
import { FC, PropsWithChildren } from 'react';

export const Page: FC<PropsWithChildren<{ className?: string }>> = ({
  children,
  className,
}) => {
  return <div className={classNames('h-screen', className)}>{children}</div>;
};
