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
import type { CardDetailType, ColumnType } from '@/types/board';

const CardForm = () => {
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
    handleSaveCard();
  };

  const handleSaveCard = () => {
    const detail: CardDetailType = {
      id: 'cardTest',
      categoryId: '1',
      cardPosition: 1,
      companyName: 'Test00',
      companyIndustry: 'IT',
      occupation: 'SE',
      ranking: 'S',
      isInternship: true,
      internshipDuration: 3,
      internshipPeriod: '日',
      internshipStartDate: '2023-09-05',
      internshipEndDate: '2023-09-08',
      url: 'https://test.com',
      description: 'lorem ipsum',
      applicationStatus: {
        id: 'testStatus',
        job_id: 'cardTest',
        process: 'ES',
        date: '2023-08-01',
      },
      selectionFlows: [
        {
          id: 'testFlow',
          job_id: 'cardTest',
          step: 1,
          process: 'ES',
        },
      ],
    };
    handleClose();
  };

  return (
    <div>
      <Box display="flex" justifyContent="center" alignItems="flex-start">
        <div onClick={handleClickOpen}>
          <AddButton />
        </div>
      </Box>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle fontWeight={'bold'}>選考カード作成</DialogTitle>
        <form onSubmit={handleFormSubmit}>
          <DialogContent>
            <Box display="flex" justifyContent="space-between" sx={{ marginBottom: '20px' }}>
              <TextField
                id="outlined-basic"
                variant="outlined"
                label="企業名"
                sx={{ width: '70%' }}
                inputProps={{ style: { textAlign: 'left', fontSize: '16px' } }}
                size="medium"
                value={companyName}
                autoComplete="off"
                onChange={(e) => setCompanyName(e.target.value)}
              />
              <SelectRank onRankChange={handleRankChange} />
            </Box>
            <Box display="flex" justifyContent="flex-start" marginBottom={'20px'}>
              <TextField
                id="outlined-basic"
                variant="outlined"
                label="業種"
                style={{ width: '45%', marginRight: '10%' }}
                inputProps={{ style: { fontSize: '16px' } }}
                size="medium"
                value={industry}
                autoComplete="off"
                onChange={(e) => setIndustry(e.target.value)}
              />
              <TextField
                id="outlined-basic"
                variant="outlined"
                label="職種"
                style={{ width: '45%' }}
                inputProps={{ style: { fontSize: '16px' } }}
                size="medium"
                value={role}
                autoComplete="off"
                onChange={(e) => setRole(e.target.value)}
              />
            </Box>

            <Box display="flex" justifyContent="flex-start" marginBottom={'20px'}>
              <TextField
                id="outlined-basic"
                variant="outlined"
                label="日"
                style={{ width: '10%', marginRight: '20px' }}
                inputProps={{ style: { fontSize: '16px' } }}
                size="medium"
                value={date}
                autoComplete="off"
                // Only numeric number
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
                style={{ width: '100%' }}
                inputProps={{ style: { fontSize: '16px' } }}
                size="small"
                value={URL}
                autoComplete="off"
                onChange={(e) => setURL(e.target.value)}
              />
            </Box>
            <Box marginBottom={'20px'}>
              <TextField
                id="outlined-multiline-static"
                label="メモ"
                style={{ width: '100%' }}
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
            <Button onClick={handleClose}>キャンセル</Button>
            <Button type="submit">保存</Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};
export default CardForm;
