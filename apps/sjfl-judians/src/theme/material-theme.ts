import { Capacitor } from '@capacitor/core';
import { createTheme } from '@mui/material';
import classNames from 'classnames';
import ThemeConstants from './theme.constants';

export const materialTheme = createTheme({
  typography: {
    fontFamily: 'Inter',
    fontSize: Capacitor.isNativePlatform() ? 18 : 16,
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
    MuiAppBar: {
      variants: [
        {
          props: { variant: 'elevation' },
          style: {},
        },
      ],
      defaultProps: {
        style: {
          backgroundColor: 'white',
          color: 'black',
          fontSize: 20,
          fontWeight: 600,
        },
        elevation: 1,
      },
      styleOverrides: {
        positionSticky: {
          paddingTop: `env(safe-area-inset-top)`,
          paddingLeft: `env(safe-area-inset-left)`,
          paddingRight: `env(safe-area-inset-right)`,
        },
        positionFixed: {
          paddingBottom: `env(safe-area-inset-bottom)`,
          paddingLeft: `env(safe-area-inset-left)`,
          paddingRight: `env(safe-area-inset-right)`,
        },
      },
    },
    MuiToggleButtonGroup: {
      defaultProps: {
        // className: classNames('!rounded-2xl', '!border-2', 'gap-2'),
      },
      styleOverrides: {
        groupedVertical: ({ theme }) => ({
          // borderColor: theme.palette.primary.main,
        }),
      },
    },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          fontSize: Capacitor.isNativePlatform() ? 18 : 16,
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          fontSize: 16,
        },
      },
    },
    MuiOutlinedInput: {
      defaultProps: {
        className: classNames('!rounded-xl'),
      },
    },
  },
});
