import Button, { ButtonProps } from '@mui/material/Button';
import { FC, PropsWithChildren } from 'react';

export const MenuItem: FC<PropsWithChildren<ButtonProps>> = ({
  children,
  ...props
}) => {
  return (
    <Button
      size="large"
      color="secondary"
      className="!justify-start"
      fullWidth
      sx={{ fontSize: '1.3rem' }}
      {...props}
    >
      {children}
    </Button>
  );
};
