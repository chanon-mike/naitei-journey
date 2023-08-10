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
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
} from '@mui/material';
import { useAtom } from 'jotai';
import type { Dispatch, ReactNode, SetStateAction } from 'react';
import { useEffect, useState } from 'react';
import FlowEditSelector from './FlowEditSelector';

const FlowInput = () => {
  return (
    <FormControl sx={{ m: 1, minWidth: '300px' }}>
      <InputLabel>フロー</InputLabel>
      <Select>
        <MenuItem value="ES">ES</MenuItem>
        <MenuItem value="Web">Web</MenuItem>
        <MenuItem value="1次面接">1次面接</MenuItem>
        <MenuItem value="2次面接">2次面接</MenuItem>
        <MenuItem value="3次面接以降">3次面接</MenuItem>
        <MenuItem value="最終面接">最終面接</MenuItem>
      </Select>
    </FormControl>
  );
};

type FlowEditProps = {
  flowProcesses: SelectionFlow[];
  setFlowProcesses: Dispatch<SetStateAction<SelectionFlow[]>>;
  jobId: string;
};

const FlowEditor = ({ flowProcesses, setFlowProcesses, jobId }: FlowEditProps) => {
  const [accessToken] = useAtom(accessTokenAtom);
  const [open, setOpen] = useState(false);
  const [inputList, setInputList] = useState<ReactNode[]>([]);

  useEffect(() => {
    const sortedFlowProcesses = flowProcesses.sort((a, b) => a.step - b.step);
    setFlowProcesses(sortedFlowProcesses);
  }, [flowProcesses, setFlowProcesses]);

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const onAddBtnClick = async () => {
    setInputList([...inputList, <FlowInput key={inputList.length + 1} />]);
    const newFlowProcess: SelectionFlowBase = {
      process: '',
      step: flowProcesses.length + inputList.length + 1,
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
              {inputList}
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
