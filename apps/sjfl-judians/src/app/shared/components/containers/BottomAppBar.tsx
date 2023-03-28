import AppBar, { AppBarProps } from '@mui/material/AppBar';
import { FC } from 'react';

export const BottomAppBar: FC<AppBarProps> = ({ children, ...props }) => {
  return (
    <AppBar
      variant="outlined"
      position="fixed"
      component="footer"
      elevation={0}
      sx={{ top: 'auto', bottom: 0 }}
      {...props}
    >
      {children}
    </AppBar>
  );
};
