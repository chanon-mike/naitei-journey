import type { FullJob } from '@/types/board';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { CardActionArea } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useEffect, useState, type FC } from 'react';
import CardDetailForm from '../popup/CardDetailForm';

type ActionAreaCardProps = {
  id: string;
  cardDetail: FullJob;
};

const ActionAreaCard: FC<ActionAreaCardProps> = ({ id, cardDetail }) => {
  const { attributes, listeners, setNodeRef, transform } = useSortable({ id });

  const [countDown, setcountDown] = useState('');

  const style = {
    transform: CSS.Transform.toString(transform),
  };

  function getRankingColor(ranking: string) {
    switch (ranking) {
      case 'S':
        return 'gold';
      case 'A':
        return 'Red';
      case 'B':
        return 'bronze';
      case 'C':
        return 'green';
      default:
        return 'gray';
    }
  }

  function isWithin7Days(dateString: string): string {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // 時間、分、秒、ミリ秒を0に設定して、日付のみを比較

    const targetDate = new Date(dateString);
    targetDate.setHours(0, 0, 0, 0);

    const differenceInTime = targetDate.getTime() - today.getTime();
    const differenceInDays = differenceInTime / (1000 * 3600 * 24);

    if (differenceInDays >= 0 && differenceInDays <= 7) {
      return '#FF9999';
    } else if (differenceInDays >= 0 && differenceInDays <= 10) {
      return '#FFFF99';
    }
    return 'inherit';
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

  // コンポーネント内部で、以下のようにuseStateを更新します
  useEffect(() => {
    setcountDown(getCountDown(cardDetail.application_status.date));
  }, [cardDetail.application_status.date]);

  return (
    <div id={id} ref={setNodeRef} {...attributes} style={style}>
      <Box display="flex" alignItems="flex-start" justifyContent="center" margin={'20px'}>
        <Card sx={{ maxWidth: 250, maxHeight: 200, minWidth: 200 }}>
          <CardActionArea>
            <CardContent
              {...listeners}
              style={{ backgroundColor: isWithin7Days(cardDetail.application_status.date) }}
            >
              <Box display="flex" justifyContent="space-between">
                <Typography gutterBottom variant="h6" component="div" fontWeight={'bold'}>
                  {cardDetail.company_name}
                </Typography>
                <Typography
                  variant="h5"
                  style={{ color: getRankingColor(cardDetail.ranking) }}
                  color="primary.main"
                  fontWeight={'bold'}
                >
                  {cardDetail.ranking}
                </Typography>
              </Box>
              <Box display="flex">
                <Typography fontWeight={'bold'} marginRight={1}>
                  {cardDetail.application_status.status}
                </Typography>
                <Typography
                  color={
                    cardDetail.application_status.process === '未完了' ? 'primary.main' : 'inherit'
                  }
                  fontWeight={'bold'}
                >
                  {cardDetail.application_status.process}
                </Typography>
              </Box>

              <Box display="flex" justifyContent="space-between">
                <Typography
                  color={
                    isWithin7Days(cardDetail.application_status.date) === '#FF9999'
                      ? '#ffffff'
                      : 'inherit'
                  }
                  fontWeight={'bold'}
                >
                  {cardDetail.application_status.date}
                </Typography>
                <Typography color="red" fontWeight={'bold'}>
                  {countDown}
                </Typography>
              </Box>
            </CardContent>
            <Box display="flex" justifyContent="center" sx={{ backgroundColor: 'primary.dark' }}>
              <CardDetailForm key={id} cardDetail={cardDetail} />
            </Box>
          </CardActionArea>
        </Card>
      </Box>
    </div>
  );
};

export default ActionAreaCard;
