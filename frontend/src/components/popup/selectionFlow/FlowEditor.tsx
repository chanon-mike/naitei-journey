import { accessTokenAtom } from '@/atoms/authAtom';
import { jobApi } from '@/libs/job';
import type { SelectionFlow, SelectionFlowBase } from '@/types/board';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
} from '@mui/material';
import { useAtom } from 'jotai';
import type { Dispatch, SetStateAction } from 'react';
import { useEffect, useState } from 'react';
import FlowEditSelector from './FlowEditSelector';

type FlowEditProps = {
  flowProcesses: SelectionFlow[];
  setFlowProcesses: Dispatch<SetStateAction<SelectionFlow[]>>;
  jobId: string;
};

const FlowEditor = ({ flowProcesses, setFlowProcesses, jobId }: FlowEditProps) => {
  const [accessToken] = useAtom(accessTokenAtom);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const sortedFlowProcesses = flowProcesses.sort((a, b) => a.step - b.step);
    setFlowProcesses(sortedFlowProcesses);
  }, [flowProcesses, setFlowProcesses]);

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const onAddBtnClick = async () => {
    const newFlowProcess: SelectionFlowBase = {
      process: '',
      step: flowProcesses.length + 1,
    };
    const flowProcessResponse: SelectionFlow = await jobApi.createSelectionFlow(
      accessToken,
      jobId,
      newFlowProcess
    );
    setFlowProcesses((prev) => [...prev, flowProcessResponse]);
  };

  return (
    <div>
      <Button variant="outlined" style={{ width: '100%' }} onClick={handleClickOpen}>
        選考フロー
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <Box sx={{ minWidth: '352px' }}>
          <DialogTitle fontWeight={'bold'}>選考フロー</DialogTitle>
          <DialogContent>
            {flowProcesses.map((process, index) => (
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

            <Box display="flex" flexDirection="column">
              <Box display="flex" justifyContent="center" alignItems="flex-start">
                <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                  <IconButton aria-label="add to button" size="large" onClick={onAddBtnClick}>
                    <AddCircleOutlineIcon fontSize="inherit" />
                  </IconButton>
                </Stack>
              </Box>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>閉じる</Button>
          </DialogActions>
        </Box>
      </Dialog>
    </div>
  );
};

export default FlowEditor;
