import { Box, TextField } from '@mui/material';
import { type FC } from 'react';

type UrlMemoFormProps = {
  url: string;
  setUrl: (value: string) => void;
  description: string;
  setDescription: (value: string) => void;
};

const UrlMemoForm: FC<UrlMemoFormProps> = ({ url, setUrl, description, setDescription }) => {
  return (
    <Box display="flex" flexDirection="column">
      <Box display="flex" justifyContent="flex-start" marginBottom={'20px'}>
        <TextField
          id="outlined-basic"
          variant="outlined"
          label="URL"
          sx={{ width: '100%' }}
          inputProps={{ style: { fontSize: '16px' } }}
          size="small"
          autoComplete="off"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
      </Box>
      <Box marginBottom={'20px'}>
        <TextField
          id="outlined-multiline-static"
          label="メモ"
          sx={{ width: '100%' }}
          multiline
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Box>
    </Box>
  );
};

export default UrlMemoForm;
