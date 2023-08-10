import type { FullJob } from '@/types/board';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Box, Card, CardActionArea, CardContent, Typography } from '@mui/material';
import moment from 'moment';
import { useState, type FC } from 'react';
import CardDetailForm from '../popup/CardDetailForm';

type ActionAreaCardProps = {
  id: string;
  cardDetail: FullJob;
  boardColor: string;
};

const ActionAreaCard: FC<ActionAreaCardProps> = ({ id, cardDetail, boardColor }) => {
  const { attributes, listeners, setNodeRef, transform } = useSortable({ id });
  const [openDetail, setOpenDetail] = useState(false);

  const cardApplicationStatus = cardDetail.application_status.status;
  const cardApplicationDate = cardDetail.application_status.date;
  const style = {
    transform: CSS.Transform.toString(transform),
  };

  const isLessThanFiveDays = (targetDate: Date): boolean => {
    const today = new Date();

    if (targetDate.getTime() < today.getTime()) return false;

    const dateDifference = Math.abs(today.getTime() - targetDate.getTime());
    const differenceInDays = dateDifference / (1000 * 60 * 60 * 24);

    return differenceInDays < 5;
  };

  return (
    <Box
      id={id}
      ref={setNodeRef}
      {...attributes}
      style={style}
      display="flex"
      alignItems="flex-start"
      justifyContent="center"
      margin={'20px'}
    >
      <Card sx={{ maxWidth: 250, maxHeight: 150, minWidth: 200, borderRadius: 2 }}>
        <CardActionArea>
          <CardContent {...listeners} onClick={() => setOpenDetail(true)}>
            <Box display="flex" justifyContent="space-between">
              <Typography variant="h6">{cardDetail.company_name}</Typography>
              <Typography variant="h6" color={boardColor} fontWeight={'bold'}>
                {cardDetail.ranking}
              </Typography>
            </Box>

            <Typography variant="body2">
              {cardDetail.company_industry}・{cardDetail.occupation}
            </Typography>

            <Typography
              variant="body2"
              fontSize="14px"
              color={isLessThanFiveDays(new Date(cardApplicationDate)) ? 'error.main' : 'inherit'}
            >
              {cardApplicationStatus}{' '}
              {cardApplicationDate && moment(cardApplicationDate).format('M月D日')}
            </Typography>
          </CardContent>
          <CardDetailForm
            key={id}
            cardDetail={cardDetail}
            open={openDetail}
            setOpen={setOpenDetail}
          />
        </CardActionArea>
      </Card>
    </Box>
  );
};

export default ActionAreaCard;
