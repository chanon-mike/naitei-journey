import { Button, useTheme } from '@mui/material';
import React from 'react';

interface FlowButtonProps {
  selectedFlow: string | null;
  flow: string;
  handleFlowChange: (flow: string) => void;
}

const FlowButton: React.FC<FlowButtonProps> = ({ selectedFlow, flow, handleFlowChange }) => {
  const theme = useTheme();

  return (
    <Button
      variant={selectedFlow === flow ? 'contained' : 'outlined'}
      style={{
        width: '150px',
        backgroundColor: selectedFlow === flow ? theme.palette.secondary.main : 'transparent',
        marginRight: '20px',
        color: selectedFlow === flow ? theme.palette.secondary.contrastText : theme.palette.primary.dark,
      }}
      onClick={() => handleFlowChange(flow)}
    >
      {flow}
    </Button>
  );
};

export default FlowButton;
