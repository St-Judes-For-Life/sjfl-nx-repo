import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import classNames from 'classnames';
import { ReactNode } from 'react';

type AppHeaderProps = {
  slots?: {
    left?: ReactNode;
    right?: ReactNode;
  };
  title: ReactNode;
  subtitle?: ReactNode;
  backEnabled?: boolean;
  backIcon?: ReactNode;
  onBack?: () => void;
  className?: string;
};

export const AppHeader = ({
  slots,
  title,
  subtitle,
  backEnabled = false,
  backIcon,
  onBack = () => null,
  className,
}: AppHeaderProps) => {
  backIcon ??= <ArrowBackIcon />;

  const leftSlot = backEnabled ? (
    <IconButton size="large" edge="start" onClick={onBack}>
      {backIcon}
    </IconButton>
  ) : (
    slots?.left
  );
  const rightSlot = slots?.right;

  const heading = subtitle ? (
    <span className="flex-grow ml-4">
      <h1 className="text-base font-semibold">{title}</h1>
      <h3 className="text-xs">{subtitle}</h3>
    </span>
  ) : (
    <h1 className="ml-4 flex-grow">{title}</h1>
  );

  return (
    <AppBar className={classNames(className)} position="static">
      <Toolbar>
        {leftSlot}
        {heading}
        {rightSlot}
      </Toolbar>
    </AppBar>
  );
};
