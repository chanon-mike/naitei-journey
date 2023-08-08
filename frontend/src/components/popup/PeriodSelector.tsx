import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import type { SelectChangeEvent } from '@mui/material/Select';
import Select from '@mui/material/Select';
import * as React from 'react';

interface PeriodSelectorProps {
  onPeriodChange: (period: string) => void;
}

const PeriodSelector: React.FC<PeriodSelectorProps> = ({ onPeriodChange }) => {
  const [period, setperiod] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    const value = event.target.value as string;
    setperiod(value);
    onPeriodChange(value);
  };

  return (
    <div>
      <FormControl sx={{ marginRight: '20px', minWidth: '80px' }}>
        <InputLabel id="demo-simple-select-helper-label">期間</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={period}
          size="medium"
          label="Period"
          onChange={handleChange}
        >
          <MenuItem value="日">日</MenuItem>
          <MenuItem value="週間">週間</MenuItem>
          <MenuItem value="ヶ月">ヶ月</MenuItem>
          <MenuItem value="年">年</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export default PeriodSelector;
