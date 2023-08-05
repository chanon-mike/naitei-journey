import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import type { SelectChangeEvent } from '@mui/material/Select';
import Select from '@mui/material/Select';
import * as React from 'react';

interface SelectPeriodProps {
  onPeriodChange: (period: string) => void;
}

const SelectPeriod: React.FC<SelectPeriodProps> = ({ onPeriodChange }) => {
  const [period, setperiod] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    const value = event.target.value as string;
    setperiod(value);
    onPeriodChange(value);
  };

  return (
    <div>
      <FormControl sx={{ marginRight: '20px', minWidth: 120, maxHeight: 50 }}>
        <InputLabel id="demo-simple-select-helper-label">期間</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={period}
          label="Period"
          onChange={handleChange}
        >
          <MenuItem value="day">日</MenuItem>
          <MenuItem value="week">週間</MenuItem>
          <MenuItem value="month">ヶ月</MenuItem>
          <MenuItem value="year">年</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export default SelectPeriod;
