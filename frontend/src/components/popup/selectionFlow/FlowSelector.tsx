import type { FlowForm } from '@/types/form';
import { FormControl, InputLabel, MenuItem } from '@mui/material';
import type { SelectChangeEvent } from '@mui/material/Select';
import Select from '@mui/material/Select';

import type { Dispatch, SetStateAction } from 'react';

type FlowSelectorProps = {
  flowProcess: FlowForm;
  flowStep: number;
  setFlowProcesses: Dispatch<SetStateAction<FlowForm[]>>;
};

const FlowSelector = ({ flowProcess, flowStep, setFlowProcesses }: FlowSelectorProps) => {
  const handleChange = (event: SelectChangeEvent) => {
    setFlowProcesses((prev) => {
      const existingProcessIndex = prev.findIndex((fp) => fp.step === flowStep);

      // If the process already exists, update it
      if (existingProcessIndex !== -1) {
        const updatedProcesses = [...prev];
        updatedProcesses[existingProcessIndex] = {
          step: flowStep,
          process: event.target.value as string,
        };
        return updatedProcesses;
      }

      // Otherwise, add the new process
      return [...prev, { step: flowStep, process: event.target.value as string }];
    });
  };

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: '300px' }}>
        <InputLabel>フロー</InputLabel>
        <Select value={flowProcess.process} onChange={handleChange}>
          <MenuItem value="ES">ES</MenuItem>
          <MenuItem value="Web">Web</MenuItem>
          <MenuItem value="1次面接">1次面接</MenuItem>
          <MenuItem value="2次面接">2次面接</MenuItem>
          <MenuItem value="3次面接以降">3次面接</MenuItem>
          <MenuItem value="最終面接">最終面接</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export default FlowSelector;
