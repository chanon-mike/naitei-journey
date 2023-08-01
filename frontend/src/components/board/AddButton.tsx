import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Box from '@mui/material/Box';

const AddButton = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      height="100vh"
      alignItems="flex-start"
    >
      <Stack direction="row" spacing={1}>
        <IconButton color="primary" aria-label="add to button" size="large">
          <AddCircleOutlineIcon fontSize="inherit" />
        </IconButton>
      </Stack>
    </Box>
  );
}

export default AddButton