import type { FlowForm } from '@/types/form';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import type { Dispatch, SetStateAction } from 'react';
import { useState } from 'react';
import FlowSelector from './FlowSelector';
import { SelectionFlow } from '@/types/board';
import FlowEditSelector from './FlowEditSelector';

type FlowEditProps = {
  flowProcesses: SelectionFlow[];
  setFlowProcesses: Dispatch<SetStateAction<SelectionFlow[]>>;
};

const FlowEditor = ({ flowProcesses, setFlowProcesses }: FlowEditProps) => {
  const [open, setOpen] = useState(false);
  const maxStep = flowProcesses.length;

  const sortedFlowProcesses = [...flowProcesses].sort((a, b) => a.step - b.step);


  console.log('flowProsess: ', flowProcesses);

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  /*const getFlowProcess = (index: number) =>
    flowProcesses.find((fp) => fp.step === index + 1) || { job_id: flowForm, step: index + 1, process: '' };
  */
  const isPreviousStepSelected = (step: number) =>
    step === 1 || flowProcesses.some((fp) => fp.step === step - 1);

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
          <Button onClick={handleClose}>キャンセル</Button>
          <Button onClick={handleClose}>保存</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default FlowEditor;
