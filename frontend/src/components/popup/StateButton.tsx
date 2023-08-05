import { Button } from '@mui/material';
import React from 'react';

interface StateButtonProps {
  selectedStatus: string | null;
  status: string;
  handleStatusChange: (flow: string) => void;
}

const StateButton: React.FC<StateButtonProps> = ({
  selectedStatus,
  status,
  handleStatusChange,
}) => (
  <Button
    variant={selectedStatus === status ? 'contained' : 'outlined'}
    style={{
      width: '30%',
      backgroundColor: selectedStatus === status ? '#2196F3' : 'transparent',
    }}
    onClick={() => handleStatusChange(status)}
  >
    {status}
  </Button>
);

export default StateButton;
