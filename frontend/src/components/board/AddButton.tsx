import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';

const AddButton = () => {
  return (
    <Box display="flex" justifyContent="center" alignItems="flex-start">
      <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
        <IconButton color="primary" aria-label="add to button" size="large">
          <AddCircleOutlineIcon fontSize="inherit" />
        </IconButton>
      </Stack>
    </Box>
  );
};

export default AddButton;
