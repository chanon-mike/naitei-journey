import { TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { ReactNode } from 'react';

type WrapperProps = {
  children: ReactNode;
};

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
        <Box display="flex" justifyContent="center" style={{ margin: '20px' }}>
          <TextField
            id="outlined-basic"
            variant="outlined"
            style={{ width: '60%' }}
            inputProps={{ style: { textAlign: 'center', fontSize: '20px' } }}
            size="small"
          />
        </Box>
        {children}
      </Paper>
    </Box>
  );
};

export default Board;
