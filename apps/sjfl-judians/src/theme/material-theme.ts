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
      styleOverrides: {
        root: {
          borderRadius: '1em',
          borderWidth: '2px',
        },
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
        positionStatic: {
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
          paddingTop: `max(1.5rem, env(safe-area-inset-bottom))`,
          paddingBottom: `max(1.5rem, env(safe-area-inset-top))`,
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
    MuiSelect: {
      defaultProps: {
        className: classNames('!rounded-xl'),
        size: 'small',
        onFocus: (e) => {
          setTimeout(() => {
            e.target.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }, 100);
        },
      },
      styleOverrides: {
        nativeInput: {
          fontSize: 16,
          '> select:focus-visible': {
            borderRadius: '0.75rem',
            outlineWidth: '1px !important',
          },
        },
      },
    },

    MuiOutlinedInput: {
      defaultProps: {
        className: classNames('!rounded-xl'),
        size: 'small',
        onFocus: (e) => {
          setTimeout(() => {
            e.target.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }, 100);
        },
      },
      styleOverrides: {
        root: ({ theme }) => ({
          backgroundColor: 'white',
          fontSize: 16,
          '> input:focus-visible': {
            borderRadius: '0.75rem',
            outlineWidth: '1px !important',
          },

          '> .MuiSelect-select:focus-visible, > .MuiSelect-select:has(+ input:focus-visible)':
            {
              borderRadius: '0.75rem',
              outlineWidth: '1px !important',
              outlineStyle: 'solid',
              outlineColor: theme.palette.accent.main,
            },
        }),
      },
    },
    MuiDrawer: {
      styleOverrides: {
        root: {
          zIndex: 1500,
        },
        paperAnchorBottom: {
          paddingBottom: `env(safe-area-inset-bottom)`,
          paddingLeft: `env(safe-area-inset-left)`,
          paddingRight: `env(safe-area-inset-right)`,
        },
      },
    },
    MuiStep: {
      styleOverrides: {
        root: {
          fontSize: 8,
        },
      },
    },
    MuiStepper: {
      styleOverrides: {
        root: {
          fontSize: 8,
        },
      },
    },
    MuiStepLabel: {
      styleOverrides: {
        root: {
          '& > .MuiStepLabel-labelContainer > .MuiStepLabel-label': {
            fontSize: 12,
          },
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
declare module '@mui/material/IconButton' {
  interface IconButtonPropsColorOverrides {
    tertiary: true;
    accent: true;
  }
}
