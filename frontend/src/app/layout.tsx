import GoogleAnalytics from '@/components/common/GoogleAnalytics';
import Header from '@/components/common/Header';
import ThemeRegistry from '@/components/theme/ThemeRegistry';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import { Box } from '@mui/material';
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '内定Journey',
  description: '内定までの道を管理するサイト！企業の選考状況など管理しましょう！',
  themeColor: '#ffffff',
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <head>
        <GoogleAnalytics />
      </head>
      <UserProvider>
        <body>
          <ThemeRegistry options={{ key: 'mui' }}>
            <Header />
            <Box sx={{ mt: '100px' }}>{children}</Box>
          </ThemeRegistry>
        </body>
      </UserProvider>
    </html>
  );
};

export default RootLayout;
