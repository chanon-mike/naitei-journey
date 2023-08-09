import { columnsAtom } from '@/atoms/boardAtom';
import { useAccessToken } from '@/contexts/AccessTokenContext';
import { jobApi } from '@/services/job';
import type { FullJobCreate } from '@/types/board';
import type { FlowForm } from '@/types/form';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers-pro/';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import ja from 'date-fns/locale/ja';
import { useAtom } from 'jotai';
import moment from 'moment';
import type { FormEvent } from 'react';
import { useState } from 'react';
import AddButton from '../board/AddButton';
import FlowSetting from './FlowSetting';
import PeriodSelector from './PeriodSelector';
import RankingSelector from './RankingSelector';
import StatusSetting from './StatusSetting';

type CardFormProps = {
  categoryId: string;
  categoryType: string;
};

// TODO: Reduce state variables and refactor code
const CardForm = ({ categoryId, categoryType }: CardFormProps) => {
  const { accessToken } = useAccessToken();
  const [open, setOpen] = useState(false);
  const [columns, setColumns] = useAtom(columnsAtom);

  // Job information
  const [companyName, setCompanyName] = useState('');
  const [companyIndustry, setCompanyIndustry] = useState('');
  const [occupation, setOccupation] = useState('');
  const [ranking, setRanking] = useState('');
  const [internshipDate, setInternshipDate] = useState('');
  const [internshipPeriod, setInternshipPeriod] = useState('');
  const [internshipStartDate, setInternshipStartDate] = useState<Date | null>(null);
  const [internshipEndDate, setInternshipEndDate] = useState<Date | null>(null);
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');
  // Application status information
  const [applicationStatus, setApplicationStatus] = useState<string | null>(null);
  const [applicationProcess, setApplicationProcess] = useState<string | null>(null);
  const [applicationDate, setApplicationDate] = useState<Date | null>(null);
  // Selection flow information
  const [flowProcesses, setFlowProcesses] = useState<FlowForm[]>([]);

  const handleSaveCard = async () => {
    const cardDetail: FullJobCreate = {
      job: {
        category_id: categoryId,
        card_position: 1,
        company_name: companyName,
        company_industry: companyIndustry,
        occupation,
        ranking,
        is_internship: categoryType === 'インターンシップ',
        internship_duration: internshipDate + internshipPeriod,
        internship_start_date: dateToString(internshipStartDate),
        internship_end_date: dateToString(internshipEndDate),
        url,
        description,
      },
      application_status: {
        status: applicationStatus ?? '',
        process: applicationProcess ?? '',
        date: dateToString(applicationDate),
      },
      selection_flows: flowProcesses,
    };
    await jobApi.createJob(accessToken, cardDetail);
    const newColumns = await jobApi.getCategoryJobs(
      accessToken,
      columns[0].user_id,
      columns[0].type
    );
    setColumns(newColumns);
    handleClose();
  };

  const handleClose = () => {
    setCompanyName('');
    setCompanyIndustry('');
    setOccupation('');
    setRanking('');
    setInternshipDate('');
    setInternshipPeriod('');
    setInternshipStartDate(null);
    setInternshipEndDate(null);
    setUrl('');
    setDescription('');
    setApplicationStatus(null);
    setApplicationProcess(null);
    setApplicationDate(null);
    setFlowProcesses([]);
    setOpen(false);
  };
  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSaveCard();
  };

  const handleRankingChange = (newRanking: string) => setRanking(newRanking);
  const handlePeriodChange = (newPeriod: string) => setInternshipPeriod(newPeriod);

  const dateToString = (dateObject: Date | null) => {
    // get the year, month, date, hours, and minutes seprately and append to the string.
    if (!dateObject) return '';
    return moment(dateObject).format('YYYY-MM-DD');
  };

  return (
    <div>
      <Box display="flex" justifyContent="center" alignItems="flex-start">
        <div onClick={() => setOpen(true)}>
          <AddButton />
        </div>
      </Box>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle fontWeight={'bold'}>選考カード作成</DialogTitle>
        <form onSubmit={handleFormSubmit}>
          <DialogContent>
            <Box display="flex" justifyContent="space-between" sx={{ marginBottom: '20px' }}>
              <TextField
                required
                id="outlined-basic"
                variant="outlined"
                label="企業名"
                sx={{ width: '70%' }}
                inputProps={{ style: { textAlign: 'left', fontSize: '16px' } }}
                size="medium"
                autoComplete="off"
                onChange={(e) => setCompanyName(e.target.value)}
              />
              <RankingSelector onRankChange={handleRankingChange} />
            </Box>
            <Box display="flex" justifyContent="flex-start" marginBottom={'20px'}>
              <TextField
                required
                id="outlined-basic"
                variant="outlined"
                label="業種"
                style={{ width: '45%', marginRight: '10%' }}
                inputProps={{ style: { fontSize: '16px' } }}
                size="medium"
                autoComplete="off"
                onChange={(e) => setCompanyIndustry(e.target.value)}
              />
              <TextField
                required
                id="outlined-basic"
                variant="outlined"
                label="職種"
                style={{ width: '45%' }}
                inputProps={{ style: { fontSize: '16px' } }}
                size="medium"
                autoComplete="off"
                onChange={(e) => setOccupation(e.target.value)}
              />
            </Box>

            <Box display="flex" justifyContent="flex-start" marginBottom={'20px'}>
              <TextField
                id="outlined-basic"
                variant="outlined"
                label="日"
                style={{ width: '20%', marginRight: '20px' }}
                size="medium"
                autoComplete="off"
                type="number"
                inputProps={{ min: 0, max: 31, style: { fontSize: '16px' } }}
                onChange={(e) => {
                  setInternshipDate(e.target.value);
                }}
              />
              <PeriodSelector onPeriodChange={handlePeriodChange} />
            </Box>
            <Box display="flex" justifyContent="flex-start" marginBottom={'20px'}>
              <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ja}>
                <DatePicker
                  label="開始日"
                  slotProps={{ textField: { size: 'small' } }}
                  onChange={(date: Date | null) => setInternshipStartDate(date || new Date())}
                />
                <Typography variant="h5" fontWeight={'bold'} marginLeft={2} marginRight={2}>
                  ~
                </Typography>
                <DatePicker
                  label="終了日"
                  slotProps={{ textField: { size: 'small' } }}
                  onChange={(date: Date | null) => setInternshipEndDate(date || new Date())}
                />
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
                autoComplete="off"
                onChange={(e) => setUrl(e.target.value)}
              />
            </Box>
            <Box marginBottom={'20px'}>
              <TextField
                id="outlined-multiline-static"
                label="メモ"
                style={{ width: '100%' }}
                multiline
                rows={4}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Box>
            <Box display="flex" justifyContent="space-between">
              <StatusSetting
                selectedStatus={applicationStatus}
                setSelectedStatus={setApplicationStatus}
                selectedProcess={applicationProcess}
                setSelectedProcess={setApplicationProcess}
                applicationDate={applicationDate}
                setApplicationDate={setApplicationDate}
              />
              <FlowSetting flowProcesses={flowProcesses} setFlowProcesses={setFlowProcesses} />
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
