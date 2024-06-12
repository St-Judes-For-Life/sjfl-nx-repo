import { FC, PropsWithChildren, ReactElement } from 'react';
import Button from '@mui/material/Button';

export const DrawerActionBtn: FC<
  PropsWithChildren<{
    icon: ReactElement;
    onClick: VoidFunction;
    destructive?: boolean;
    disabled?: boolean;
  }>
> = ({ icon, children, onClick, destructive = false, disabled = false }) => {
  return (
    <Button
      size="large"
      fullWidth
      variant="text"
      color={destructive ? 'error' : 'primary'}
      onClick={onClick}
      className="!justify-start !p-4 !items-center !text-lg"
      disabled={disabled}
    >
      {icon}
      <span className="ml-6">{children}</span>
    </Button>
  );
};
