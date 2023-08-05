import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import * as React from 'react';
import FlowSetting from './FlowSetting';
import SelectPeriod from './PeriodSelector';
import SelectRank from './RankSelector';
import StateSetting from './StateSetting';
import { CardDetailType } from '@/types/board';
import type { FC } from 'react';
import { data } from '@/app/intern/data';
import Link from '@mui/material/Link';

type CompanyDetailProps = {
  id: string;
  columnId: string;
}

const DetailButton: FC<CompanyDetailProps> = ({ id, columnId }) => {
  const [open, setOpen] = React.useState(false);
  /*const [companyName, setCompanyName] = React.useState('');
  const [rank, setRank] = React.useState('');
  const [industry, setIndustry] = React.useState('');
  const [role, setRole] = React.useState('');
  const [date, setDate] = React.useState('');
  const [period, setPeriod] = React.useState('');
  const [start, setStart] = React.useState('');
  const [end, setEnd] = React.useState('');
  const [URL, setURL] = React.useState('');
  const [memo, setMemo] = React.useState('');*/

  const column = data.find(column => column.id === columnId);
  if (!column) {
    return null;
  }
  const card = column.cards.find(card => card.id === id);
  if (!card) {
    return null;
  }


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  /*
  const handleRankChange = (newRank: string) => {
    setRank(newRank);
  };

  const handlePeriodChange = (newPeriod: string) => {
    setPeriod(newPeriod);
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //handleSubscribe();
  };*/

  /*
  const handleSubscribe = () => {
    const detail = {
      category_id: 'card1',
      company_name,
      company_industry,
      position
      ranking,
      is_internship,
      internship_duration,
      period,
      internship_start_date,
      internship_end_date,
      url,
      description,
    };
    addCardDetail(detail);
    handleClose();
  };*/

  return (
    <div>
      <Box display="flex" justifyContent="center">
        <div onClick={handleClickOpen}>
          <Button size='large'>
            詳細
          </Button>
        </div>
      </Box>
      <Dialog open={open} onClose={handleClose} fullWidth={true}>
        <Box
          display="flex"
          justifyContent="space-between"
          marginTop={'20px'}
        >
          <DialogTitle variant="h3" fontWeight={'bold'}>{card.companyName}</DialogTitle>
          <DialogTitle variant="h3" fontWeight={'bold'} sx={{ color: 'primary.main' }} marginRight={2}>{card.ranking}</DialogTitle>
        </Box>
        <DialogContent>
          <Box display="flex" alignItems="center">
            <Box display="flex" justifyContent="flex-start" marginBottom={'20px'} marginRight={'20px'}>
              <Typography variant="h4" fontWeight={'bold'}>業種:</Typography>
              <Typography variant="h4" marginLeft='10px'>IT</Typography>
            </Box>
            <Box display="flex" justifyContent="flex-start" marginBottom={'20px'}>
              <Typography variant="h4" fontWeight={'bold'}>職種:</Typography>
              <Typography variant="h4" marginLeft='10px'>{card.occupation}</Typography>
            </Box>
          </Box>

          <hr />
          <Box justifyContent="flex-start" marginBottom={'20px'} marginTop={'20px'}>
            <Typography variant="h4" fontWeight={'bold'} marginBottom={'10px'}>期間</Typography>
            <Typography variant="h4">{card.internshipDuration}{card.internshipPeriod}</Typography>
          </Box>
          <Typography variant="h4" fontWeight={'bold'} marginBottom={'10px'}>日程</Typography>
          <Box display="flex" justifyContent="flex-start" alignItems='center' marginBottom={'20px'}>
            <Typography variant="h4">{card.internshipStartDate}</Typography>
            <Typography variant="h4" marginLeft={2} marginRight={2}>
              ~
            </Typography>
            <Typography variant="h4">{card.internshipEndDate}</Typography>
          </Box>
          <Box display="flex" flexDirection="column" justifyContent="flex-start" marginBottom={'20px'}>
            <Typography variant="h4" fontWeight={'bold'} marginBottom={'10px'}>URL</Typography>
            <Box border={1} borderRadius={2} p={1}>
              <Link href='#' variant="h4">{card.url}</Link>
            </Box>
          </Box>
          <Box display="flex" flexDirection="column">
            <Typography variant="h4" fontWeight={'bold'} marginBottom={'10px'}>メモ</Typography>
            <Box border={1} borderRadius={2} p={1}>
              <Typography variant="h4">{card.description}</Typography>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>
            <Typography variant="h4">閉じる</Typography>
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default DetailButton;
