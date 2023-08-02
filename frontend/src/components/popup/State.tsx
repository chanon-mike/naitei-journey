import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import * as React from 'react';

const StateSelect = () => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" style={{ width: '100%' }} onClick={handleClickOpen}>
        志望状況
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle fontWeight={'bold'}>選考状況選択</DialogTitle>
        <DialogContent>
          <Box>
            <Typography variant="h6">フロー</Typography>
            <Box
              display="flex"
              justifyContent="space-between"
              marginBottom={'20px'}
              marginTop={'20px'}
            >
              <Button variant="outlined" style={{ width: '30%' }}>
                ES
              </Button>
              <Button variant="outlined" style={{ width: '30%' }}>
                Webテスト
              </Button>
              <Button variant="outlined" style={{ width: '30%' }}>
                1次面接
              </Button>
            </Box>
            <Box
              display="flex"
              justifyContent="space-between"
              marginBottom={'20px'}
              marginTop={'20px'}
            >
              <Button variant="outlined" style={{ width: '30%' }}>
                2次面接
              </Button>
              <Button variant="outlined" style={{ width: '30%' }}>
                3次面接
              </Button>
              <Button variant="outlined" style={{ width: '30%' }}>
                最終面接
              </Button>
            </Box>
            <Box
              display="flex"
              justifyContent="space-between"
              marginBottom={'20px'}
              marginTop={'20px'}
            >
              <Button variant="outlined" style={{ width: '30%' }}>
                その他
              </Button>
            </Box>
          </Box>

          <hr />

          <Box>
            <Typography variant="h6" marginTop={'20px'}>
              選考状況
            </Typography>
            <Box
              display="flex"
              justifyContent="space-between"
              marginBottom={'20px'}
              marginTop={'20px'}
            >
              <Button variant="outlined" style={{ width: '30%' }}>
                未完了
              </Button>
              <Button variant="outlined" style={{ width: '30%' }}>
                調整中
              </Button>
              <Button variant="outlined" style={{ width: '30%' }}>
                結果待ち
              </Button>
            </Box>
          </Box>

          <hr />

          <Box>
            <Typography variant="h6" marginTop={'20px'}>
              日程
            </Typography>
            <Box display="flex" justifyContent="flex-start" marginTop={'20px'}>
              <TextField
                id="outlined-basic"
                variant="outlined"
                label="月"
                style={{ width: '10%', marginRight: '20px' }}
                inputProps={{ style: { textAlign: 'center', fontSize: '20px' } }}
                size="small"
              />
              <Typography variant="h5" fontWeight={'bold'}>
                /
              </Typography>
              <TextField
                id="outlined-basic"
                variant="outlined"
                label="日"
                style={{ width: '10%', marginLeft: '20px' }}
                inputProps={{ style: { textAlign: 'center', fontSize: '20px' } }}
                size="small"
              />
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Subscribe</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default StateSelect;
