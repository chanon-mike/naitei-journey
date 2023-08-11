import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import type { SelectChangeEvent } from '@mui/material/Select';
import Select from '@mui/material/Select';
import * as React from 'react';

interface RankingSelectorProps {
  rank: string | null;
  onRankChange: (rank: string) => void;
}

const RankingSelector: React.FC<RankingSelectorProps> = ({ rank, onRankChange }) => {
  const rank_val = rank !== null ? rank : '';
  const [ranking, setranking] = React.useState(rank_val);

  const handleChange = (event: SelectChangeEvent) => {
    const value = event.target.value as string;
    setranking(value);
    onRankChange(value);
  };

  return (
    <>
      <FormControl sx={{ minWidth: 120, m: 0 }}>
        <InputLabel id="demo-simple-select-helper-label">志望度</InputLabel>
        <Select
          required
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          size="medium"
          label="ranking"
          value={ranking}
          onChange={handleChange}
        >
          <MenuItem value="S">S</MenuItem>
          <MenuItem value="A">A</MenuItem>
          <MenuItem value="B">B</MenuItem>
          <MenuItem value="C">C</MenuItem>
          <MenuItem value="D">D</MenuItem>
        </Select>
      </FormControl>
    </>
  );
};

export default RankingSelector;
