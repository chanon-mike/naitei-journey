import type { FlowForm } from '@/types/form';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from '@mui/material';
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

  const handleDeleteFlow = () => {
    // Delete flow process at the last index
    const newFlowProcesses = flowProcesses.slice(0, -1);
    setFlowProcesses(newFlowProcesses);
  };

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
                  <Box display="flex" sx={{ width: '100%' }}>
                    <FlowSelector
                      flowProcess={getFlowProcess(index)}
                      flowStep={index + 1}
                      setFlowProcesses={setFlowProcesses}
                    />
                    {index <= maxStep && index === flowProcesses.length - 1 && (
                      <IconButton
                        aria-label="delete flow"
                        size="medium"
                        onClick={() => handleDeleteFlow()}
                      >
                        <RemoveCircleOutlineIcon fontSize="inherit" color="inherit" />
                      </IconButton>
                    )}
                  </Box>
                  {index !== maxStep - 1 && <ArrowDownwardIcon />}
                </Box>
              )
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>閉じる</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default FlowSetting;
