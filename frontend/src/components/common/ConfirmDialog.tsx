import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import type { Dispatch, ReactNode, SetStateAction } from 'react';

type ConfirmDialogProps = {
  title: string;
  children?: ReactNode;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  onConfirm: () => void;
};

const ConfirmDialog = ({ title, children, open, setOpen, onConfirm }: ConfirmDialogProps) => {
  return (
    <Dialog open={open} onClose={() => setOpen(false)} aria-labelledby="confirm-dialog">
      <DialogTitle id="confirm-dialog" variant="h6" fontSize="20px">
        {title}
      </DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Button variant="contained" onClick={() => setOpen(false)} color="inherit">
          キャンセル
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            setOpen(false);
            onConfirm();
          }}
          color="error"
        >
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
