import type { SelectionFlow } from '@/types/board';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import type { Dispatch, SetStateAction } from 'react';
import { useState } from 'react';
import FlowEditSelector from './FlowEditSelector';

type FlowEditProps = {
  flowProcesses: SelectionFlow[];
  setFlowProcesses: Dispatch<SetStateAction<SelectionFlow[]>>;
};

const FlowEditor = ({ flowProcesses, setFlowProcesses }: FlowEditProps) => {
  const [open, setOpen] = useState(false);

  const sortedFlowProcesses = [...flowProcesses].sort((a, b) => a.step - b.step);

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button variant="outlined" style={{ width: '100%' }} onClick={handleClickOpen}>
        選考フロー
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle fontWeight={'bold'}>選考フロー</DialogTitle>
        <DialogContent>
          {sortedFlowProcesses.map((process, index) => (
            <Box
              key={index}
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
            >
              <FlowEditSelector
                flowProcess={process}
                flowStep={index + 1}
                setFlowProcesses={setFlowProcesses}
              />
            </Box>
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>閉じる</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default FlowEditor;
