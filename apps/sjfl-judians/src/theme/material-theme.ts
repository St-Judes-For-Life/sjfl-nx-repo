import { createTheme } from '@mui/material';
import classNames from 'classnames';
import ThemeConstants from './theme.constants';

export const materialTheme = createTheme({
  typography: {
    fontFamily: 'Inter',
  },
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: ThemeConstants.kPrimaryColor,
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
  },
  components: {
    // Name of the component
    MuiButtonBase: {
      defaultProps: {
        // The props to change the default for.
        disableRipple: true, // No more ripple, on the whole application 💣!
      },
    },
    MuiButton: {
      defaultProps: {
        className: classNames('!rounded-2xl', '!border-2'),
      },
      styleOverrides: {
        contained: ({ theme }) => ({
          borderColor: theme.palette.primary.main,
        }),
        outlined: {
          borderColor: 'currentColor',
        },
      },
    },
  },
});
