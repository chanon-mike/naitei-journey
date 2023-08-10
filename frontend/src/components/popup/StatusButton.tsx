import { Button, useTheme } from '@mui/material';
import React from 'react';

interface StatusButtonProps {
  selectedStatus: string | null;
  status: string;
  handleStatusChange: (flow: string) => void;
}

const StatusButton: React.FC<StatusButtonProps> = ({
  selectedStatus,
  status,
  handleStatusChange,
}) => {
  const theme = useTheme();

  return (
    <Button
      variant={selectedStatus === status ? 'contained' : 'outlined'}
      style={{
        width: '150px',
        backgroundColor: selectedStatus === status ? theme.palette.primary.main : 'transparent',
        marginRight: '20px',
        color:
          selectedStatus === status
            ? theme.palette.primary.contrastText
            : theme.palette.primary.dark,
      }}
      onClick={() => handleStatusChange(status)}
    >
      {status}
    </Button>
  );
};

export default StatusButton;
