import { Button } from '@mui/material';
import React from 'react';

interface FlowButtonProps {
  selectedFlow: string | null;
  flow: string;
  handleFlowChange: (flow: string) => void;
}

const FlowButton: React.FC<FlowButtonProps> = ({ selectedFlow, flow, handleFlowChange }) => (
  <Button
    variant={selectedFlow === flow ? 'contained' : 'outlined'}
    style={{
      width: '30%',
      backgroundColor: selectedFlow === flow ? '#2196F3' : 'transparent',
    }}
    onClick={() => handleFlowChange(flow)}
  >
    {flow}
  </Button>
);

export default FlowButton;
