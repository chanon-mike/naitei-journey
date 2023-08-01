import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Box from '@mui/material/Box';

const ActionAreaCard = () => {
  return (
    <Box display="flex" alignItems="flex-start" justifyContent="center" margin={'20px'}>
      <Card sx={{ maxWidth: 250, maxHeight: 150, minWidth: 200 }}>
        <CardActionArea>
          <CardContent>
            <Box display="flex" justifyContent="space-between" marginBottom={'20px'}>
              <Typography gutterBottom variant="h6" component="div" fontWeight={'bold'}>
                谷口商事
              </Typography>
              <Typography variant="h5" color="primary.main" fontWeight={'bold'}>
                S
              </Typography>
            </Box>
            <Typography variant="body1" color="text.primary">
              ES未完了
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Box>
  );
};

export default ActionAreaCard;
