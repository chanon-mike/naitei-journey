import { accessTokenAtom } from '@/atoms/authAtom';
import { columnsAtom } from '@/atoms/boardAtom';
import { jobApi } from '@/libs/job';
import type { Category, SelectionFlow, SelectionFlowBase } from '@/types/board';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
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
  const [columns, setColumns] = useAtom(columnsAtom);
  const [open, setOpen] = useState(false);
  const maxIndex = 6;

  const handleClickOpen = () => setOpen(true);
  const handleSave = async () => {
    await jobApi.editSelectionFlow(accessToken, jobId, flowProcesses);
    const newColumns: Category[] = await jobApi.getCategoryJobs(
      accessToken,
      columns[0].user_id,
      columns[0].type
    );
    newColumns.forEach((category) => {
      category.jobs.sort((a, b) => a.card_position - b.card_position);
    });
    setColumns(newColumns);
    setOpen(false);
  };

  const handleDeleteFlow = async (flowId: string): Promise<void> => {
    await jobApi.deleteSelectionFlow(accessToken, jobId, flowId);
    const newFlowProcesses = flowProcesses.filter((flow) => flow.id !== flowId);
    setFlowProcesses(newFlowProcesses);
  };

  const handleAddBtnClick = async () => {
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

  useEffect(() => {
    const sortedFlowProcesses = flowProcesses.sort((a, b) => a.step - b.step);
    setFlowProcesses(sortedFlowProcesses);
  }, [flowProcesses, setFlowProcesses]);

  return (
    <div>
      <Button variant="outlined" style={{ width: '100%' }} onClick={handleClickOpen}>
        選考フロー
      </Button>

      <Dialog open={open} onClose={handleSave}>
        <Box sx={{ minWidth: '352px' }}>
          <DialogTitle fontWeight={'bold'}>選考フロー</DialogTitle>
          <DialogContent sx={{ pb: 0 }}>
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

            <Box display="flex" justifyContent="center" alignItems="flex-start">
              <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                {flowProcesses.length > 0 && flowProcesses.length <= maxIndex && (
                  <IconButton
                    aria-label="delete flow"
                    size="large"
                    onClick={() => handleDeleteFlow(flowProcesses[flowProcesses.length - 1].id)}
                    sx={{ mt: 2 }}
                  >
                    <RemoveCircleOutlineIcon fontSize="inherit" />
                  </IconButton>
                )}
                {flowProcesses.length < maxIndex && (
                  <IconButton aria-label="add to button" size="large" onClick={handleAddBtnClick}>
                    <AddCircleOutlineIcon fontSize="inherit" />
                  </IconButton>
                )}
              </Stack>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleSave}>保存</Button>
          </DialogActions>
        </Box>
      </Dialog>
    </div>
  );
};

export default FlowEditor;
