import { Button, useTheme } from '@mui/material';
import React from 'react';

interface ProcessButtonProps {
  selectedProcess: string | null;
  process: string;
  handleProcessChange: (flow: string) => void;
}

const ProcessButton: React.FC<ProcessButtonProps> = ({
  selectedProcess,
  process,
  handleProcessChange,
}) => {
  const theme = useTheme();

  return (
    <Button
      variant={selectedProcess === process ? 'contained' : 'outlined'}
      style={{
        width: '30%',
        backgroundColor: selectedProcess === process ? theme.palette.primary.main : 'transparent',
        color:
          selectedProcess === process
            ? theme.palette.primary.contrastText
            : theme.palette.primary.dark,
      }}
      onClick={() => handleProcessChange(process)}
    >
      {process}
    </Button>
  );
};

export default ProcessButton;
