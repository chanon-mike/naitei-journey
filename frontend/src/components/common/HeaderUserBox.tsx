'use client';

import { useRef, useState } from 'react';

import { Box, Button, Link, Popover, Typography, useTheme } from '@mui/material';

import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import { styled } from '@mui/material/styles';
import { useUser } from '@auth0/nextjs-auth0/client';

const UserBoxButton = styled(Button)(
  ({ theme }) => `
        padding-left: ${theme.spacing(1)};
        padding-right: ${theme.spacing(1)};
`
);

const MenuUserBox = styled(Box)(
  ({ theme }) => `
        background: ${theme.palette.secondary.contrastText};
        padding: ${theme.spacing(2)};
`
);

const UserBoxText = styled(Box)(
  ({ theme }) => `
        text-align: left;
        padding-left: ${theme.spacing(1)};
`
);

const UserBoxLabel = styled(Typography)(
  ({ theme }) => `
        font-weight: ${theme.typography.fontWeightBold};
        color: ${theme.palette.text};
        display: block;
`
);



// const UserBoxDescription = styled(Typography)(
//   ({ theme }) => `
//         color: ${lighten(theme.palette.secondary.main, 0.5)}
// `
// );

function HeaderUserbox() {
  const theme = useTheme();
  const { user } = useUser();
  const ref = useRef(null);
  const [isOpen, setOpen] = useState<boolean>(false);

  const handleOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  return (
    <>
      <UserBoxButton color="inherit" ref={ref} onClick={handleOpen}>
        <SettingsIcon sx={{ fill: theme.palette.primary.main }} fontSize='large' />
      </UserBoxButton>
      <Popover
        anchorEl={ref.current}
        onClose={handleClose}
        open={isOpen}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        {user ? (
          <>
            <MenuUserBox sx={{ minWidth: 210 }} display="flex">
              <UserBoxText>
                <UserBoxLabel>{user.name}</UserBoxLabel>
              </UserBoxText>
            </MenuUserBox>
            {/* <Divider sx={{ mb: 0 }} />
            <List sx={{ p: 1 }} component="nav">
              <ListItem>
                <AccountBoxTwoToneIcon fontSize="small" />
                <ListItemText primary="My Profile" />
              </ListItem>
              <ListItem>
                <InboxTwoToneIcon fontSize="small" />
                <ListItemText primary="Messenger" />
              </ListItem>
              <ListItem>
                <AccountTreeTwoToneIcon fontSize="small" />
                <ListItemText primary="Account Settings" />
              </ListItem>
            </List>
            <Divider /> */}
            <Box sx={{ m: 1 }}>
              <Button color="primary" fullWidth>
                <LogoutIcon sx={{ mr: 1 }} />
                <Link href="/api/auth/logout" underline="none">サインアウト</Link>
              </Button>
            </Box>
          </>
        ) :
          <>
            <Box sx={{ m: 1 }}>
              <Button color="primary" fullWidth>
                <LoginIcon sx={{ mr: 1 }} />
                <Link href="/api/auth/login" underline="none">ログイン</Link>
              </Button>
            </Box>
          </>
        }

      </Popover>
    </>
  );
}

export default HeaderUserbox;
