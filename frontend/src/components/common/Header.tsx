'use client';
import { Box, Divider, Link, Stack, alpha, lighten, styled, useTheme } from '@mui/material';
import HeaderMenu from './HeaderBox';
import HeaderUserbox from './HeaderUserBox';
import HomeIcon from '@mui/icons-material/Home';

const HeaderWrapper = styled(Box)(
  ({ theme }) => `
        height: 80px;
        color: ${theme.palette.text.primary};
        padding: ${theme.spacing(0, 2)};  
        right: 0;
        top: 0;
        z-index: 6;
        background-color: ${alpha(theme.palette.background.paper, 0.95)};
        backdrop-filter: blur(3px);
        position: fixed;
        justify-content: space-between;
        width: 100%;
        @media (min-width: ${theme.breakpoints.values.lg}px) {
            left: 0px;
            width: auto;
        }
`
);

function Header() {
  const theme = useTheme();

  return (
    <HeaderWrapper
      display="flex"
      alignItems="center"
      sx={{
        boxShadow:
          theme.palette.mode === 'dark'
            ? `0 1px 0 ${alpha(
              lighten(theme.palette.primary.main, 0.5),
              0.15
            )}, 0px 2px 8px -3px rgba(0, 0, 0, 0.2), 0px 5px 22px -4px rgba(0, 0, 0, .1)`
            : `0px 2px 8px -3px ${alpha('#223354', 0.2)}, 0px 5px 22px -4px ${alpha(
              '#223354',
              0.1
            )}`,
      }}
    >
      <Link href="/" underline="none" sx={{ m: 1 }}>
        <svg width={0} height={0}>
          <linearGradient id="linearColors" gradientTransform="rotate(90)">
            <stop offset={0} stopColor={theme.palette.primary.main} />
            <stop offset={1} stopColor={theme.palette.secondary.main} />
          </linearGradient>
        </svg>
        <HomeIcon sx={{ fill: 'url(#linearColors)' }} fontSize='large' />
      </Link>
      <Stack
        direction="row"
        divider={<Divider orientation="vertical" flexItem />}
        alignItems="center"
        spacing={2}
      >
        <HeaderMenu />
      </Stack>
      <Box display="flex" alignItems="center">
        <HeaderUserbox />
        <Box
          component="span"
          sx={{
            ml: 2,
            display: { lg: 'none', xs: 'inline-block' },
          }}
        />
      </Box>
    </HeaderWrapper>
  );
}

export default Header;
