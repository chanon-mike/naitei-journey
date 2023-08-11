import type { SelectionFlow } from '@/types/board';
import { FormControl, InputLabel, MenuItem } from '@mui/material';
import type { SelectChangeEvent } from '@mui/material/Select';
import Select from '@mui/material/Select';

import type { Dispatch, SetStateAction } from 'react';

type FlowEditSelectorProps = {
  flowProcess: SelectionFlow;
  flowStep: number;
  setFlowProcesses: Dispatch<SetStateAction<SelectionFlow[]>>;
};

const FlowEditSelector = ({ flowProcess, flowStep, setFlowProcesses }: FlowEditSelectorProps) => {
  const handleChange = (event: SelectChangeEvent) => {
    setFlowProcesses((prev) => {
      const existingProcessIndex = prev.findIndex((fp) => fp.step === flowStep);

      // If the process already exists, update it
      if (existingProcessIndex !== -1) {
        const updatedProcesses = [...prev];
        updatedProcesses[existingProcessIndex] = {
          id: flowProcess.id,
          job_id: flowProcess.job_id,
          step: flowStep,
          process: event.target.value as string,
        };
        return updatedProcesses;
      }

      // Otherwise, add the new process
      return [
        ...prev,
        {
          id: flowProcess.id,
          job_id: flowProcess.job_id,
          step: flowStep,
          process: event.target.value as string,
        },
      ];
    });
  };

  return (
    <FormControl sx={{ m: 1, minWidth: '300px' }}>
      <InputLabel>フロー</InputLabel>
      <Select value={flowProcess.process} onChange={handleChange}>
        <MenuItem value="ES">ES</MenuItem>
        <MenuItem value="Web">Web</MenuItem>
        <MenuItem value="1次面接">1次面接</MenuItem>
        <MenuItem value="2次面接">2次面接</MenuItem>
        <MenuItem value="3次面接">3次面接</MenuItem>
        <MenuItem value="最終面接">最終面接</MenuItem>
      </Select>
    </FormControl>
  );
};

export default FlowEditSelector;
