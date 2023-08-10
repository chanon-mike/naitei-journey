import { Box, TextField, Typography } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import ja from 'date-fns/locale/ja';
import { type FC } from 'react';
import PeriodSelector from '../popup/PeriodSelector';

type InternshipDetailProps = {
  internshipDate: string;
  setInternshipDate: (value: string) => void;
  internshipPeriod: string;
  handlePeriodChange: (period: string) => void;
  internshipStartDate: Date | null;
  setInternshipStartDate: (date: Date | null) => void;
  internshipEndDate: Date | null;
  setInternshipEndDate: (date: Date | null) => void;
};

const InternshipDetail: FC<InternshipDetailProps> = ({
  internshipDate,
  setInternshipDate,
  internshipPeriod,
  handlePeriodChange,
  internshipStartDate,
  setInternshipStartDate,
  internshipEndDate,
  setInternshipEndDate,
}) => {
  return (
    <Box display="flex" flexDirection="column">
      <Box display="flex" justifyContent="flex-start" marginBottom={'20px'}>
        <TextField
          id="outlined-basic"
          variant="outlined"
          label="日数"
          sx={{ width: '20%', marginRight: '20px' }}
          size="medium"
          autoComplete="off"
          type="number"
          inputProps={{ min: 0, max: 31, style: { fontSize: '16px' } }}
          value={internshipDate}
          onChange={(e) => setInternshipDate(e.target.value)}
        />
        <PeriodSelector period_val={internshipPeriod} onPeriodChange={handlePeriodChange} />
      </Box>
      <Box display="flex" justifyContent="flex-start" sx={{ mb: 2 }}>
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ja}>
          <DatePicker
            label="開始日"
            slotProps={{ textField: { size: 'small' } }}
            value={internshipStartDate}
            onChange={(date: Date | null) => setInternshipStartDate(date || new Date())}
          />
          <Typography variant="h5" fontWeight={'bold'} marginLeft={4} marginRight={4}>
            ~
          </Typography>
          <DatePicker
            label="終了日"
            slotProps={{ textField: { size: 'small' } }}
            value={internshipEndDate}
            onChange={(date: Date | null) => setInternshipEndDate(date || new Date())}
          />
        </LocalizationProvider>
      </Box>
    </Box>
  );
};

export default InternshipDetail;
