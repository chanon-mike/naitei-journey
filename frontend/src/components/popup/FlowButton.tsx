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
      width: '150px',
      backgroundColor: selectedFlow === flow ? '#2196F3' : 'transparent',
      marginRight: '20px',
    }}
    onClick={() => handleFlowChange(flow)}
  >
    {flow}
  </Button>
);

export default FlowButton;
