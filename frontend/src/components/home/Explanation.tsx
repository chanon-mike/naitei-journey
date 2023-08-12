'use client';

import { Box, Typography, keyframes } from '@mui/material';
import { useEffect, useState } from 'react';
import MovieExplanation from './MovieExplanation';

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const Explanation = () => {
  const [showDescription, setShowDescription] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > 300 && !showDescription) {
        setShowDescription(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [showDescription]);

  const animationStyles = showDescription
    ? {
        opacity: 1,
        animation: `${fadeIn} 1.5s forwards`,
      }
    : {
        opacity: 0,
      };

  return (
    <Box sx={animationStyles} marginTop={10} id="explanation">
      <Box display="flex" justifyContent="center" marginBottom={8}>
        <Typography variant="h2" color="primary.light">
          内定Journey
        </Typography>
        <Typography variant="h2">とは</Typography>
      </Box>

      <Box display="flex" justifyContent="center" marginBottom={5}>
        <Typography variant="h5">就活状況を</Typography>
        <Typography variant="h5" color="success.main">
          一括管理
        </Typography>
        <Typography variant="h5">できるツールです</Typography>
      </Box>

      <Box display="flex" justifyContent="center" marginBottom={7}>
        <Typography variant="h5">あなたを内定獲得まで</Typography>
        <Typography variant="h5" color="success.main">
          サポート
        </Typography>
        <Typography variant="h5">します</Typography>
      </Box>

      <Box
        display="flex"
        justifyContent="center"
        flexDirection="column"
        alignItems="center"
        marginBottom={7}
      >
        <Typography variant="h4" sx={{ mb: 2 }}>
          始め方は簡単です！
        </Typography>
        <Typography variant="h5">まずは、アカウントを作り、ボードにアクセスしましょう</Typography>
      </Box>

      <Box display="flex" justifyContent="center" marginBottom={10}>
        <Typography variant="h2">あなたの</Typography>
        <Typography variant="h2" color="primary.main" fontWeight="bold">
          内定までの道
        </Typography>
        <Typography variant="h2">が始まります</Typography>
      </Box>

      <MovieExplanation />
    </Box>
  );
};

export default Explanation;
