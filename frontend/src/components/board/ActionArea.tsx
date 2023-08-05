import type { CardDetailType } from '@/types/board';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { CardActionArea } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import type { FC } from 'react';

type ActionAreaCardProps = Pick<CardDetailType, 'id' | 'companyName' | 'ranking'>;

const ActionAreaCard: FC<ActionAreaCardProps> = ({ id, companyName, ranking }) => {
  const { attributes, listeners, setNodeRef, transform } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
  };

  return (
    <div ref={setNodeRef} {...attributes} {...listeners} style={style}>
      <div id={id}>
        <Box display="flex" alignItems="flex-start" justifyContent="center" margin={'20px'}>
          <Card sx={{ maxWidth: 250, maxHeight: 150, minWidth: 200 }}>
            <CardActionArea>
              <CardContent>
                <Box display="flex" justifyContent="space-between" marginBottom={'20px'}>
                  <Typography gutterBottom variant="h6" component="div" fontWeight={'bold'}>
                    {companyName}
                  </Typography>
                  <Typography variant="h5" color="primary.main" fontWeight={'bold'}>
                    {ranking}
                  </Typography>
                </Box>
                <Typography variant="body1" color="text.primary">
                  test
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Box>
      </div>
    </div>
  );
};

export default ActionAreaCard;
