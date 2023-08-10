import { accessTokenAtom } from '@/atoms/authAtom';
import { columnsAtom } from '@/atoms/boardAtom';
import { jobApi } from '@/libs/job';
import type { FullJobCreate } from '@/types/board';
import type { FlowForm } from '@/types/form';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { useAtom } from 'jotai';
import moment from 'moment';
import type { FormEvent } from 'react';
import { useState } from 'react';
import AddButton from '../board/AddButton';
import CompanyDetailForm from '../common/CompanyDetailForm';
import InternshipDetail from '../common/InternDetail';
import UrlMemoForm from '../common/UrlMemoForm';
import FlowSetting from './FlowSetting';
import StatusSetting from './StatusSetting';

type CardFormProps = {
  categoryId: string;
  categoryType: string;
};

// TODO: Reduce state variables and refactor code
const CardForm = ({ categoryId, categoryType }: CardFormProps) => {
  const [accessToken] = useAtom(accessTokenAtom);
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
            <CompanyDetailForm
              companyName={companyName}
              setCompanyName={setCompanyName}
              ranking={ranking}
              handleRankingChange={handleRankingChange}
              companyIndustry={companyIndustry}
              setCompanyIndustry={setCompanyIndustry}
              occupation={occupation}
              setOccupation={setOccupation}
            />
            <InternshipDetail
              internshipDate={internshipDate}
              setInternshipDate={setInternshipDate}
              internshipPeriod={internshipPeriod}
              handlePeriodChange={handlePeriodChange}
              internshipStartDate={internshipStartDate}
              setInternshipStartDate={setInternshipStartDate}
              internshipEndDate={internshipEndDate}
              setInternshipEndDate={setInternshipEndDate}
            />
            <UrlMemoForm
              url={url}
              setUrl={setUrl}
              description={description}
              setDescription={setDescription}
            />
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
