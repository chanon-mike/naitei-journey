import type { CardDetailType } from '@/types/board';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { CardActionArea } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import type { FC } from 'react';
import DetailButton from '../popup/DetailButton';

type ActionAreaCardProps = {
  id: string;
  cardDetail: CardDetailType;
};

const ActionAreaCard: FC<ActionAreaCardProps> = ({ id, cardDetail }) => {
  const { attributes, listeners, setNodeRef, transform } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
  };

  return (
    <div id={id} ref={setNodeRef} {...attributes} style={style}>
      <Box display="flex" alignItems="flex-start" justifyContent="center" margin={'20px'}>
        <Card sx={{ maxWidth: 250, maxHeight: 150, minWidth: 200 }}>
          <CardActionArea>
            <CardContent {...listeners}>
              <Box display="flex" justifyContent="space-between">
                <Typography gutterBottom variant="h6" component="div" fontWeight={'bold'}>
                  {cardDetail.company_name}
                </Typography>
                <Typography variant="h5" color="primary.main" fontWeight={'bold'}>
                  {cardDetail.ranking}
                </Typography>
              </Box>
              <Typography variant="body1" color="text.primary">
                test
              </Typography>
            </CardContent>
            <Box display="flex" justifyContent="center" sx={{ backgroundColor: 'primary.dark' }}>
              <DetailButton key={id} cardDetail={cardDetail} />
            </Box>
          </CardActionArea>
        </Card>
      </Box>
    </div>
  );
};

export default ActionAreaCard;
