import { createTheme } from '@mui/material/styles';
import { Roboto } from 'next/font/google';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

// text: '#000000',
// background: '#ffffff',
// primary: '#8fb3ff',
// secondary: '#ebf1ff',
// accent: '#d41d6d',

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#d41d6d',
    },
    secondary: {
      main: '#8fb3ff',
    },
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
  components: {
    MuiAlert: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...(ownerState.severity === 'info' && {
            backgroundColor: '#60a5fa',
          }),
        }),
      },
    },
  },
});

export default theme;
