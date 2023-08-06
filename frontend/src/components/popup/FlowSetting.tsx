import type { FlowForm } from '@/types/form';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import type { Dispatch, SetStateAction } from 'react';
import { useState } from 'react';
import FlowSelector from './FlowSelector';

type FlowSettingProps = {
  flowProcesses: FlowForm[];
  setFlowProcesses: Dispatch<SetStateAction<FlowForm[]>>;
};

const FlowSetting = ({ flowProcesses, setFlowProcesses }: FlowSettingProps) => {
  const [open, setOpen] = useState(false);
  const maxStep = 6;

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const getFlowProcess = (index: number) =>
    flowProcesses.find((fp) => fp.step === index + 1) || { step: index + 1, process: '' };
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
          {[...Array(maxStep)].map(
            (_, index) =>
              isPreviousStepSelected(index + 1) && (
                <Box
                  key={index}
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="center"
                >
                  <FlowSelector
                    flowProcess={getFlowProcess(index)}
                    flowStep={index + 1}
                    setFlowProcesses={setFlowProcesses}
                  />
                  {index !== maxStep - 1 && <ArrowDownwardIcon />}
                </Box>
              )
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>保存</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default FlowSetting;
