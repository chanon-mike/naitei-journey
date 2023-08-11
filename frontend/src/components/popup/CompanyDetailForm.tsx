import { Box, TextField } from '@mui/material';
import type { FC } from 'react';
import RankingSelector from './RankingSelector';

type CompanyDetailFormProps = {
  companyName: string;
  setCompanyName: (value: string) => void;
  ranking: string;
  handleRankingChange: (ranking: string) => void;
  companyIndustry: string;
  setCompanyIndustry: (value: string) => void;
  occupation: string;
  setOccupation: (value: string) => void;
};

const CompanyDetailForm: FC<CompanyDetailFormProps> = ({
  companyName,
  setCompanyName,
  ranking,
  handleRankingChange,
  companyIndustry,
  setCompanyIndustry,
  occupation,
  setOccupation,
}) => {
  return (
    <Box display="flex" flexDirection="column">
      <Box display="flex" justifyContent="space-between" marginBottom={'20px'}>
        <TextField
          required
          id="outlined-basic"
          variant="outlined"
          label="企業名"
          sx={{ width: '70%', mr: 5 }}
          inputProps={{ style: { textAlign: 'left', fontSize: '16px' } }}
          value={companyName}
          size="medium"
          autoComplete="off"
          onChange={(e) => setCompanyName(e.target.value)}
        />
        <RankingSelector rank={ranking} onRankChange={handleRankingChange} />
      </Box>
      <Box display="flex" alignItems="center" justifyContent="space-between" marginBottom={'20px'}>
        <TextField
          required
          id="outlined-basic"
          variant="outlined"
          label="業種"
          sx={{ width: '45%' }}
          inputProps={{ style: { fontSize: '16px' } }}
          size="medium"
          autoComplete="off"
          value={companyIndustry}
          onChange={(e) => setCompanyIndustry(e.target.value)}
        />
        <TextField
          required
          id="outlined-basic"
          variant="outlined"
          label="職種"
          sx={{ width: '45%' }}
          inputProps={{ style: { fontSize: '16px' } }}
          size="medium"
          autoComplete="off"
          value={occupation}
          onChange={(e) => setOccupation(e.target.value)}
        />
      </Box>
    </Box>
  );
};

export default CompanyDetailForm;
