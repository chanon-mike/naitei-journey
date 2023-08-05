import type { CardDetailType } from '@/types/board';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { CardActionArea } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import type { FC } from 'react';
import CardDetail from '../popup/CardDetail';
import { useContext, useState } from 'react';
import DetailButton from '../popup/DetailButton';
import { data } from '@/app/intern/data';

type ActionAreaCardProps = {
  id: string;
  columnId: string;
};

const ActionAreaCard: FC<ActionAreaCardProps> = ({ id, columnId }) => {
  const { attributes, listeners, setNodeRef, transform } = useSortable({ id });

  const column = data.find(column => column.id === columnId);
  if (!column) {
    return null;
  }
  const card = column.cards.find(card => card.id === id);
  if (!card) {
    return null;
  }

  const style = {
    transform: CSS.Transform.toString(transform),
  };

  return (
    <div ref={setNodeRef} {...attributes} style={style}>
      <div id={id}>
        <Box display="flex" alignItems="flex-start" justifyContent="center" margin={'20px'}>
          <Card sx={{ maxWidth: 250, maxHeight: 150, minWidth: 200 }}>
            <CardActionArea>
              <CardContent {...listeners}>
                <Box display="flex" justifyContent="space-between">
                  <Typography gutterBottom variant="h6" component="div" fontWeight={'bold'}>
                    {card.companyName}
                  </Typography>
                  <Typography variant="h5" color="primary.main" fontWeight={'bold'}>
                    {card.ranking}
                  </Typography>
                </Box>
                <Typography variant="body1" color="text.primary">
                  test
                </Typography>
              </CardContent>
              <Box display="flex" justifyContent="center" style={{ backgroundColor: '#000000' }}>
                <DetailButton
                  key={id}
                  id={id}
                  columnId={columnId}
                />
              </Box>
            </CardActionArea>
          </Card>
        </Box>
      </div>
    </div>
  );
};

export default ActionAreaCard;
