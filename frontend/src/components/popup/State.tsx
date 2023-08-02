import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import SelectRank from './SelectRank';

const State = () => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        variant="outlined"
        style={{ width: '100%' }}
        onClick={handleClickOpen}
      >
        志望状況
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle fontWeight={'bold'}>カード作成</DialogTitle>
        <DialogContent>
          <Box display="flex" justifyContent="space-between" marginBottom={'20px'} marginTop={'20px'}>
            <TextField
              id="outlined-basic"
              variant="outlined"
              label="企業名"
              style={{ width: '40%' }}
              inputProps={{ style: { textAlign: 'center', fontSize: '20px' } }}
              size="medium"
            />
            <SelectRank />
          </Box>
          <Box display="flex" justifyContent="flex-start" marginBottom={'20px'}>
            <TextField
              id="outlined-basic"
              variant="outlined"
              label="業種"
              style={{ width: '30%', marginRight: '20px' }}
              inputProps={{ style: { textAlign: 'center', fontSize: '20px' } }}
              size="small"
            />
            <TextField
              id="outlined-basic"
              variant="outlined"
              label="職種"
              style={{ width: '30%' }}
              inputProps={{ style: { textAlign: 'center', fontSize: '20px' } }}
              size="small"
            />
          </Box>
          <Box display="flex" justifyContent="flex-start" marginBottom={'20px'}>
            <TextField
              id="outlined-basic"
              variant="outlined"
              label="0"
              style={{ width: '10%', marginRight: '20px' }}
              inputProps={{ style: { textAlign: 'center', fontSize: '20px' } }}
              size="small"
            />
            <TextField
              id="outlined-basic"
              variant="outlined"
              label="週"
              style={{ width: '10%', marginRight: '20px' }}
              inputProps={{ style: { textAlign: 'center', fontSize: '20px' } }}
              size="small"
            />
            <TextField
              id="outlined-basic"
              variant="outlined"
              label="4/1"
              style={{ width: '10%', marginRight: '20px' }}
              inputProps={{ style: { textAlign: 'center', fontSize: '20px' } }}
              size="small"
            />
            <Typography variant="h5" fontWeight={'bold'}>
              ~
            </Typography>
            <TextField
              id="outlined-basic"
              variant="outlined"
              label="4/2"
              style={{ width: '10%', marginLeft: '20px' }}
              inputProps={{ style: { textAlign: 'center', fontSize: '20px' } }}
              size="small"
            />
          </Box>
          <Box display="flex" justifyContent="flex-start" marginBottom={'20px'}>
            <TextField
              id="outlined-basic"
              variant="outlined"
              label="URL"
              style={{ width: '60%' }}
              inputProps={{ style: { textAlign: 'center', fontSize: '20px' } }}
              size="small"
            />
          </Box>
          <Box marginBottom={'20px'}>
            <TextField
              id="outlined-multiline-static"
              label="メモ"
              style={{ width: '80%' }}
              multiline
              rows={4}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Subscribe</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
export default State