import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';

type AddButtonProps = {
  boardColor: string;
};

const AddButton = ({ boardColor }: AddButtonProps) => {
  return (
    <Box display="flex" justifyContent="center" alignItems="flex-start">
      <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
        <IconButton aria-label="add to button" size="large" sx={{ color: boardColor }}>
          <AddCircleOutlineIcon fontSize="inherit" />
        </IconButton>
      </Stack>
    </Box>
  );
};

export default AddButton;
