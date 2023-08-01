import * as React from 'react';
import { ReactNode } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

type WrapperProps = {
  children: ReactNode;
}

const Category = ({ children }: WrapperProps) => {
  return (
    <Box
      display="flex"
      alignItems="flext-start"
      justifyContent="center"
      margin={'10px'}
    >
      <Paper style={{ margin: '10px', width: '150px' }}>
        {children}
      </Paper>
    </Box>
  );
};


export default Category