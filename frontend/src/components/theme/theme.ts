import { createTheme } from '@mui/material/styles';

const themeColors = {
  primary: '#44A0E3',
  secondary: '#14A350',
  background: '#FFFFFF',
  success: '#5AC67D',
  warning: '#f9cde7',
  error: '#D15061',
  info: '#33C2FF',
  black: '#000000',
  white: '#ffffff',
};

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: themeColors.primary,
    },
    secondary: {
      main: themeColors.secondary,
    },
    success: {
      main: themeColors.success,
    },
    warning: {
      main: themeColors.warning,
    },
    error: {
      main: themeColors.error,
    },
    background: {
      default: themeColors.background,
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
  components: {
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
    },
  },
});

export default theme;
