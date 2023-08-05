import { Button, useTheme } from '@mui/material';
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
}) => {
  const theme = useTheme();

  return (
    <Button
      variant={selectedStatus === status ? 'contained' : 'outlined'}
      style={{
        width: '30%',
        backgroundColor: selectedStatus === status ? theme.palette.secondary.main : 'transparent',
        color: selectedStatus === status ? theme.palette.secondary.contrastText : theme.palette.primary.dark,
      }}
      onClick={() => handleStatusChange(status)}
    >
      {status}
    </Button>
  );
};

export default StateButton;
