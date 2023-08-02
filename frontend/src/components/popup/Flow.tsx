import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import * as React from 'react';
import SelectFlow from './SelectFlow';

const FlowSetting = () => {
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
        選考フロー
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle fontWeight={'bold'}>選考フロー</DialogTitle>
        <DialogContent>
          <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
            <SelectFlow />
            <ArrowDownwardIcon />
            <SelectFlow />
            <ArrowDownwardIcon />
            <SelectFlow />
            <ArrowDownwardIcon />
            <SelectFlow />
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
export default FlowSetting;
