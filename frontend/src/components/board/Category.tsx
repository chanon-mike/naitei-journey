import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { ReactNode } from 'react';

type WrapperProps = {
  children: ReactNode;
};

const Category = ({ children }: WrapperProps) => {
  return (
    <Box display="flex" alignItems="flext-start" justifyContent="center" margin={'10px'}>
      <Paper style={{ margin: '10px', width: '150px' }}>{children}</Paper>
    </Box>
  );
};

export default Category;
