import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import type { SelectChangeEvent } from '@mui/material/Select';
import Select from '@mui/material/Select';
import * as React from 'react';

const SelectFlow = () => {
  const [age, setAge] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: '300px' }}>
        <InputLabel id="demo-simple-select-helper-label">フロー</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={age}
          label="Age"
          onChange={handleChange}
        >
          <MenuItem value="ES">ES</MenuItem>
          <MenuItem value="Web">Web</MenuItem>
          <MenuItem value="1次面接">1次面接</MenuItem>
          <MenuItem value="2次面接">2次面接</MenuItem>
          <MenuItem value="3次面接以降">3次面接</MenuItem>
          <MenuItem value="最終面接">最終面接</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export default SelectFlow;
