import { Capacitor } from '@capacitor/core';
import { createTheme } from '@mui/material';
import classNames from 'classnames';
import ThemeConstants from './theme.constants';

export const materialTheme = createTheme({
  typography: {
    fontFamily: 'Inter',
    fontSize: Capacitor.isNativePlatform() ? 18 : 16,
    button: {
      textTransform: 'none',
    },
  },
  palette: {
    primary: {
      main: ThemeConstants.kPrimaryColor,
    },
    secondary: {
      main: ThemeConstants.kSecondaryColor,
    },
    tertiary: {
      main: ThemeConstants.ktertiaryColor,
    },
    accent: {
      main: ThemeConstants.kaccentColor,
    },
    error: {
      main: ThemeConstants.kErrorColor,
    },
  },
  components: {
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
        text: {
          fontSize: 16,
        },
        contained: ({ theme }) => ({
          borderColor: theme.palette.primary.main,
        }),
        outlined: {
          borderColor: 'currentColor',
        },
      },
    },
    MuiAppBar: {
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
    MuiBottomNavigation: {
      defaultProps: {},
      styleOverrides: {
        root: {
          paddingTop: `env(safe-area-inset-bottom)`,
          paddingBottom: `env(safe-area-inset-top)`,
          paddingLeft: `env(safe-area-inset-left)`,
          paddingRight: `env(safe-area-inset-right)`,
        },
      },
    },
    MuiBottomNavigationAction: {
      styleOverrides: {
        root: {
          fontSize: '0.8rem',
        },
        label: {
          fontSize: 'unset !important',
          '&.Mui-selected': {
            fontSize: 'unset !important',
            fontWeight: 'bold',
          },
        },
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
        size: 'small',
      },
      styleOverrides: {
        root: {
          fontSize: 16,
        },
      },
    },
  },
});

declare module '@mui/material/styles' {
  interface Palette {
    tertiary: Palette['primary'];
    accent: Palette['primary'];
  }

  interface PaletteOptions {
    tertiary: PaletteOptions['primary'];
    accent: PaletteOptions['primary'];
  }
}

// Update the Button's color prop options
declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    tertiary: true;
    accent: true;
  }
}
