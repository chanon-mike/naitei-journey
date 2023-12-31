import { accessTokenAtom } from '@/atoms/authAtom';
import { columnsAtom } from '@/atoms/boardAtom';
import { jobApi } from '@/libs/job';
import type { Category, FullJobCreate } from '@/types/board';
import type { FlowForm } from '@/types/form';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { useAtom } from 'jotai';
import moment from 'moment';
import type { FormEvent } from 'react';
import { useState } from 'react';
import AddButton from '../../board/AddButton';
import CompanyDetailForm from '../CompanyDetailForm';
import InternshipDetail from '../InternshipDetail';
import UrlMemoForm from '../UrlMemoForm';
import StatusSetting from '../applicationStatus/StatusSetting';
import FlowSetting from '../selectionFlow/FlowSetting';

type CardFormProps = {
  categoryId: string;
  categoryType: string;
  maxIndex: number;
  boardColor: string;
};

// TODO: Reduce state variables and refactor code
const CardForm = ({ categoryId, categoryType, maxIndex, boardColor }: CardFormProps) => {
  const [accessToken] = useAtom(accessTokenAtom);
  const [open, setOpen] = useState(false);
  const [columns, setColumns] = useAtom(columnsAtom);
  const [loading, setLoading] = useState(false);

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
  const [applicationStatus, setApplicationStatus] = useState<string>('');
  const [applicationProcess, setApplicationProcess] = useState<string>('');
  const [applicationDate, setApplicationDate] = useState<Date | null>(null);
  // Selection flow information
  const [flowProcesses, setFlowProcesses] = useState<FlowForm[]>([]);

  const handleSaveCard = async () => {
    setLoading(true);

    const cardDetail: FullJobCreate = {
      job: {
        category_id: categoryId,
        card_position: maxIndex,
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
        status: applicationStatus,
        process: applicationProcess,
        date: dateToString(applicationDate),
      },
      selection_flows: flowProcesses,
    };
    await jobApi.createJob(accessToken, cardDetail);
    const newColumns: Category[] = await jobApi.getCategoryJobs(
      accessToken,
      columns[0].user_id,
      columns[0].type
    );
    newColumns.forEach((category) => {
      category.jobs.sort((a, b) => a.card_position - b.card_position);
    });
    setColumns(newColumns);
    setLoading(false);
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
    setApplicationStatus('');
    setApplicationProcess('');
    setApplicationDate(null);
    setFlowProcesses([]);
    setOpen(false);
  };

  const handleRankingChange = (newRanking: string) => setRanking(newRanking);
  const handlePeriodChange = (newPeriod: string) => setInternshipPeriod(newPeriod);
  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSaveCard();
  };

  const dateToString = (dateObject: Date | null) => {
    if (!dateObject) return '';
    return moment(dateObject).format('YYYY-MM-DD');
  };

  return (
    <div>
      <Box display="flex" justifyContent="center" alignItems="flex-start">
        <div onClick={() => setOpen(true)}>
          <AddButton boardColor={boardColor} />
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
            {categoryType === 'インターンシップ' && (
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
            )}
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
            {loading ? (
              <Box>
                <Button disabled>キャンセル</Button>
                <Button disabled>保存中...</Button>
              </Box>
            ) : (
              <Box>
                <Button onClick={handleClose}>キャンセル</Button>
                <Button type="submit">保存</Button>
              </Box>
            )}
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

export default CardForm;
