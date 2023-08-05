'use client';

import { Box, Link, List, ListItem, ListItemText } from '@mui/material';
import { styled } from '@mui/material/styles';

const ListWrapper = styled(Box)(
  ({ theme }) => `
        .MuiTouchRipple-root {
            display: none;
        }
        
        .MuiListItem-root {
            transition: ${theme.transitions.create(['color', 'fill'])};
            
            &.MuiListItem-indicators {
                padding: ${theme.spacing(1, 2)};
                cursor: pointer;
            
                .MuiListItemText-root {
                    .MuiTypography-root {
                        &:before {
                          height: 4px;
                          width: 22px;
                          opacity: 0;
                          visibility: hidden;
                          display: block;
                          position: absolute;
                          bottom: -10px;
                          transition: all .2s;
                          border-radius: 10px;
                          content: "";
                          background: ${theme.palette.primary.main};
                        }
                    }
                }

                &.active,
                &:active,
                &:hover {
                
                    background: transparent;
                
                    .MuiListItemText-root {
                        .MuiTypography-root {
                            &:before {
                                opacity: 1;
                                visibility: visible;
                                bottom: 0px;
                            }
                        }
                    }
                }
            }
        }
`
);

function HeaderMenu() {
  // const ref = useRef(null);
  // const [isOpen, setOpen] = useState<boolean>(false);

  // const handleOpen = (): void => {
  //   setOpen(true);
  // };

  // const handleClose = (): void => {
  //   setOpen(false);
  // };

  return (
    <>
      <ListWrapper
        sx={{
          display: 'block',
        }}
      >
        <List disablePadding component={Box} display="flex">
          <ListItem classes={{ root: 'MuiListItem-indicators' }}>
            <Link href="/intern" underline="none" sx={{ color: 'black' }}>
              <ListItemText primaryTypographyProps={{ noWrap: true }} primary="インターン" />
            </Link>
          </ListItem>
          <ListItem classes={{ root: 'MuiListItem-indicators' }}>
            <Link href="/fulltime" underline="none" sx={{ color: 'black' }}>
              <ListItemText primaryTypographyProps={{ noWrap: true }} primary="本選考" />
            </Link>
          </ListItem>
          {/* <ListItem
            classes={{ root: 'MuiListItem-indicators' }}
            ref={ref}
            onClick={handleOpen}
          >
            <ListItemText
              primaryTypographyProps={{ noWrap: true }}
              primary={
                <Box display="flex" alignItems="center">
                  Others
                  <Box display="flex" alignItems="center" pl={0.3}>
                    <ExpandMoreTwoToneIcon fontSize="small" />
                  </Box>
                </Box>
              }
            />
          </ListItem> */}
        </List>
      </ListWrapper>
      {/* <Menu anchorEl={ref.current} onClose={handleClose} open={isOpen}>
        <MenuItem sx={{ px: 3 }} >
          Overview
        </MenuItem>
        <MenuItem sx={{ px: 3 }} >
          Tabs
        </MenuItem>
        <MenuItem sx={{ px: 3 }} >
          Cards
        </MenuItem>
        <MenuItem sx={{ px: 3 }}>
          Modals
        </MenuItem>
      </Menu> */}
    </>
  );
}

export default HeaderMenu;
