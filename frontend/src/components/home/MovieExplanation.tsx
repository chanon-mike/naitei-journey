'use client';

import { Box } from '@mui/material';

const MovieExplanation = () => {
  return (
    <Box display="flex" justifyContent="center">
      <iframe
        width="100%"
        height="650"
        src="https://www.youtube.com/embed/cjXLNUXjS8U"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Embedded youtube"
      />
    </Box>
  );
};

export default MovieExplanation;
