import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import type { SelectChangeEvent } from '@mui/material/Select';
import Select from '@mui/material/Select';
import * as React from 'react';

interface SelectRankProps {
  onRankChange: (rank: string) => void;
}

const SelectRank: React.FC<SelectRankProps> = ({ onRankChange }) => {
  const [rank, setRank] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    const value = event.target.value as string;
    setRank(value);
    onRankChange(value);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-helper-label">志望度</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={rank}
          label="Age"
          onChange={handleChange}
        >
          <MenuItem value="S">S</MenuItem>
          <MenuItem value="A">A</MenuItem>
          <MenuItem value="B">B</MenuItem>
          <MenuItem value="C">C</MenuItem>
          <MenuItem value="D">D</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export default SelectRank;
