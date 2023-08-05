import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { DatePicker } from '@mui/x-date-pickers-pro/';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import ja from 'date-fns/locale/ja';
import * as React from 'react';
import AddButton from '../board/AddButton';
import FlowSetting from './FlowSetting';
import SelectPeriod from './PeriodSelector';
import SelectRank from './RankSelector';
import StateSetting from './StateSetting';

const CardDetail = () => {
  const [open, setOpen] = React.useState(false);
  const [companyName, setCompanyName] = React.useState('');
  const [rank, setRank] = React.useState('');
  const [industry, setIndustry] = React.useState('');
  const [role, setRole] = React.useState('');
  const [date, setDate] = React.useState('');
  const [period, setPeriod] = React.useState('');
  const [start, setStart] = React.useState('');
  const [end, setEnd] = React.useState('');
  const [URL, setURL] = React.useState('');
  const [memo, setMemo] = React.useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleRankChange = (newRank: string) => {
    setRank(newRank);
  };

  const handlePeriodChange = (newPeriod: string) => {
    setPeriod(newPeriod);
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //handleSubscribe();
  };

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
      <Box display="flex" justifyContent="center" alignItems="flex-start">
        <Button onClick={handleClickOpen}>
          <AddButton />
        </Button>
      </Box>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle fontWeight={'bold'}>カード作成</DialogTitle>
        <form onSubmit={handleFormSubmit}>
          <DialogContent>
            <Box
              display="flex"
              justifyContent="space-between"
              marginBottom={'20px'}
              marginTop={'20px'}
            >
              <TextField
                id="outlined-basic"
                variant="outlined"
                label="企業名"
                style={{ width: '40%' }}
                inputProps={{ style: { textAlign: 'center', fontSize: '20px' } }}
                size="medium"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
              />
              <SelectRank onRankChange={handleRankChange} />
            </Box>
            <Box display="flex" justifyContent="flex-start" marginBottom={'20px'}>
              <TextField
                id="outlined-basic"
                variant="outlined"
                label="業種"
                style={{ width: '30%', marginRight: '20px' }}
                inputProps={{ style: { textAlign: 'center', fontSize: '20px' } }}
                size="small"
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
              />
              <TextField
                id="outlined-basic"
                variant="outlined"
                label="職種"
                style={{ width: '30%' }}
                inputProps={{ style: { textAlign: 'center', fontSize: '20px' } }}
                size="small"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              />
            </Box>

            <Box display="flex" justifyContent="flex-start" marginBottom={'20px'}>
              <TextField
                id="outlined-basic"
                variant="outlined"
                label="日"
                style={{ width: '20%', marginRight: '20px' }}
                inputProps={{ style: { textAlign: 'center', fontSize: '20px' } }}
                size="small"
                value={date}
                onChange={(e) => {
                  const newValue = e.target.value;
                  if (newValue === '' || /^[0-9]+$/.test(newValue)) {
                    setDate(newValue);
                  }
                }}
              />
              <SelectPeriod onPeriodChange={handlePeriodChange} />
            </Box>
            <Box display="flex" justifyContent="flex-start" marginBottom={'20px'}>
              <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ja}>
                <DatePicker label="開始日" slotProps={{ textField: { size: 'small' } }} />
                <Typography variant="h5" fontWeight={'bold'} marginLeft={2} marginRight={2}>
                  ~
                </Typography>
                <DatePicker label="終了日" slotProps={{ textField: { size: 'small' } }} />
              </LocalizationProvider>
            </Box>
            <Box display="flex" justifyContent="flex-start" marginBottom={'20px'}>
              <TextField
                id="outlined-basic"
                variant="outlined"
                label="URL"
                style={{ width: '60%' }}
                inputProps={{ style: { textAlign: 'center', fontSize: '20px' } }}
                size="small"
                value={URL}
                onChange={(e) => setURL(e.target.value)}
              />
            </Box>
            <Box marginBottom={'20px'}>
              <TextField
                id="outlined-multiline-static"
                label="メモ"
                style={{ width: '80%' }}
                multiline
                rows={4}
                value={memo}
                onChange={(e) => setMemo(e.target.value)}
              />
            </Box>
            <Box display="flex" justifyContent="space-between">
              <StateSetting />
              <FlowSetting />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Subscribe</Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};
export default CardDetail;
