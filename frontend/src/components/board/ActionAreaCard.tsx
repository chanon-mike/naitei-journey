import type { FullJob } from '@/types/board';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Box, Card, CardActionArea, CardContent, Typography } from '@mui/material';
import moment from 'moment';
import { useEffect, useState, type FC } from 'react';
import CardDetailForm from '../popup/cardDetail/CardDetailForm';

type ActionAreaCardProps = {
  id: string;
  cardDetail: FullJob;
  boardColor: string;
};

const ActionAreaCard: FC<ActionAreaCardProps> = ({ id, cardDetail, boardColor }) => {
  const { attributes, listeners, setNodeRef, transform } = useSortable({ id });
  const [openDetail, setOpenDetail] = useState(false);
  const [countDown, setcountDown] = useState('');

  const cardApplicationStatus = cardDetail.application_status.status;
  const cardApplicationDate = cardDetail.application_status.date;
  const style = {
    transform: CSS.Transform.toString(transform),
  };

  // function getRankingColor(ranking: string) {
  //   switch (ranking) {
  //     case 'S':
  //       return 'gold';
  //     case 'A':
  //       return 'Red';
  //     case 'B':
  //       return 'bronze';
  //     case 'C':
  //       return 'green';
  //     default:
  //       return 'gray';
  //   }
  // }

  function isWithin7Days(dateString: string): string {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // 時間、分、秒、ミリ秒を0に設定して、日付のみを比較

    const targetDate = new Date(dateString);
    targetDate.setHours(0, 0, 0, 0);

    const differenceInTime = targetDate.getTime() - today.getTime();
    const differenceInDays = differenceInTime / (1000 * 3600 * 24);

    if (differenceInDays >= 0 && differenceInDays <= 7) {
      return 'error.main';
    } else if (differenceInDays >= 0 && differenceInDays <= 10) {
      return 'error.light';
    }
    return 'text.secondary';
  }

  function getCountDown(dateString: string): string {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const targetDate = new Date(dateString);
    targetDate.setHours(0, 0, 0, 0);

    const differenceInTime = targetDate.getTime() - today.getTime();
    const differenceInDays = differenceInTime / (1000 * 3600 * 24);

    if (differenceInDays >= 0 && differenceInDays <= 7) {
      return `残り${differenceInDays}日!`;
    }
    return '';
  }

  useEffect(() => {
    setcountDown(getCountDown(cardApplicationDate));
  }, [cardApplicationDate]);

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
      <Card sx={{ maxWidth: 250, height: 100, minWidth: 200, borderRadius: 2 }}>
        <CardActionArea style={{ height: '100%' }}>
          <CardContent {...listeners} onClick={() => setOpenDetail(true)}>
            <Box display="flex" justifyContent="space-between" marginBottom={0}>
              <Typography variant="h6">{cardDetail.company_name}</Typography>
              <Typography variant="h6" color={boardColor} fontWeight={'bold'}>
                {cardDetail.ranking}
              </Typography>
            </Box>

            <Typography variant="body2" color="text.secondary">
              {cardDetail.company_industry}・{cardDetail.occupation}
            </Typography>

            <Box display="flex" justifyContent="space-between">
              <Typography
                variant="body2"
                color={isWithin7Days(cardApplicationDate)}
                fontSize="12px"
              >
                {cardApplicationStatus}{' '}
                {cardApplicationDate && moment(cardApplicationDate).format('M月D日')}
              </Typography>
              <Typography variant="body2" color="error.main" fontSize="12px">
                {countDown}
              </Typography>
            </Box>
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
