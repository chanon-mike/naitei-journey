import * as React from 'react';
import { ReactNode } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

type WrapperProps = {
  children: ReactNode;
}

const Board = ({ children }: WrapperProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        '& > :not(style)': {
          m: 1,
          width: 300,
          height: 600,
        },
      }}
    >
      <Paper style={{ margin: '20px' }}>
        {children}
      </Paper>
    </Box>
  );
};


export default Board