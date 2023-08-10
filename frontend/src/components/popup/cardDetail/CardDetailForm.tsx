'use client';

import { accessTokenAtom } from '@/atoms/authAtom';
import { columnsAtom } from '@/atoms/boardAtom';
import ConfirmDialog from '@/components/common/ConfirmDialog';
import { jobApi } from '@/libs/job';
import type { Category, FullJob, FullJobUpdate } from '@/types/board';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { useAtom } from 'jotai';
import moment from 'moment';
import type { Dispatch, FormEvent, SetStateAction } from 'react';
import { useState, type FC } from 'react';
import CompanyDetailForm from '../CompanyDetailForm';
import InternshipDetail from '../InternshipDetail';
import UrlMemoForm from '../UrlMemoForm';
import StatusEditor from '../applicationStatus/StatusEditor';
import FlowEditor from '../selectionFlow/FlowEditor';

const getInternshipDateAndPeriod = (duration: string) => {
  const date = duration.match(/\d+/);
  const dateVal: string = date ? date[0] : '';

  let periodVal = '';
  const periods = [`日`, `週間`, `ヶ月`, `年`];
  for (const period of periods) {
    if (duration.includes(period)) {
      periodVal = period;
      break;
    }
  }

  return { dateVal, periodVal };
};

const dateToString = (dateObject: Date | null) => {
  if (!dateObject) return '';
  return moment(dateObject).format('YYYY-MM-DD');
};

const stringToDate = (dateString: string): Date | null => {
  if (!dateString) return null;
  return moment(dateString).toDate();
};

type CardDetailProps = {
  cardDetail: FullJob;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

const CardDetailForm: FC<CardDetailProps> = ({ cardDetail, open, setOpen }) => {
  const [accessToken] = useAtom(accessTokenAtom);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [columns, setColumns] = useAtom(columnsAtom);
  const { dateVal, periodVal } = getInternshipDateAndPeriod(cardDetail.internship_duration);

  // FullJob information
  const [jobId] = useState(cardDetail.id);
  const [categoryId] = useState(cardDetail.category_id);
  const [companyName, setCompanyName] = useState(cardDetail.company_name);
  const [companyIndustry, setCompanyIndustry] = useState(cardDetail.company_industry);
  const [occupation, setOccupation] = useState(cardDetail.occupation);
  const [ranking, setRanking] = useState(cardDetail.ranking);
  const [isInternship] = useState(cardDetail.is_internship);
  const [internshipDate, setInternshipDate] = useState(dateVal);
  const [internshipPeriod, setInternshipPeriod] = useState(periodVal);
  const [internshipStartDate, setInternshipStartDate] = useState<Date | null>(
    stringToDate(cardDetail.internship_start_date ?? '')
  );
  const [internshipEndDate, setInternshipEndDate] = useState<Date | null>(
    stringToDate(cardDetail.internship_end_date ?? '')
  );
  const [url, setUrl] = useState(cardDetail.url);
  const [description, setDescription] = useState(cardDetail.description);
  // Application status information
  const [applicationStatus, setApplicationStatus] = useState<string>(
    cardDetail.application_status.status
  );
  const [applicationProcess, setApplicationProcess] = useState<string>(
    cardDetail.application_status.process
  );
  const [applicationDate, setApplicationDate] = useState<Date | null>(
    stringToDate(cardDetail.application_status.date ?? '')
  );
  // Selection flow information
  const [flowProcesses, setFlowProcesses] = useState(cardDetail.selection_flows);

  const handleCancel = () => {
    setCompanyName(cardDetail.company_name);
    setCompanyIndustry(cardDetail.company_industry);
    setOccupation(cardDetail.occupation);
    setRanking(cardDetail.ranking);
    setInternshipDate(dateVal);
    setInternshipPeriod(periodVal);
    setInternshipStartDate(stringToDate(cardDetail.internship_start_date));
    setInternshipEndDate(stringToDate(cardDetail.internship_end_date));
    setUrl(cardDetail.url);
    setDescription(cardDetail.description);
    setApplicationStatus(cardDetail.application_status.status);
    setApplicationProcess(cardDetail.application_status.process);
    setApplicationDate(stringToDate(cardDetail.application_status.date));
    setFlowProcesses(cardDetail.selection_flows);
    setOpen(false);
  };

  const handleEditCard = async () => {
    const editedCard: FullJobUpdate = {
      job: {
        category_id: categoryId,
        card_position: cardDetail.card_position,
        company_name: companyName,
        company_industry: companyIndustry,
        occupation,
        ranking,
        is_internship: isInternship,
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
      selection_flows: flowProcesses.map((flow, index) => {
        return {
          ...flow,
          id: cardDetail.selection_flows[index].id,
          job_id: jobId,
        };
      }),
    };
    await jobApi.editJob(accessToken, editedCard, jobId);
    await handleSaveCard();
  };

  const deleteCard = async () => {
    await jobApi.deleteJob(accessToken, cardDetail.id);
    await handleSaveCard();
  };

  const handleSaveCard = async () => {
    const newColumns: Category[] = await jobApi.getCategoryJobs(
      accessToken,
      columns[0].user_id,
      columns[0].type
    );
    newColumns.forEach((category) => {
      category.jobs.sort((a, b) => a.card_position - b.card_position);
    });
    setColumns(newColumns);
    setOpen(false);
  };
  const handleRankingChange = (newRanking: string) => setRanking(newRanking);
  const handlePeriodChange = (newPeriod: string) => setInternshipPeriod(newPeriod);
  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleEditCard();
  };

  return (
    <div>
      <Dialog open={open} fullWidth={true} onClose={handleCancel}>
        <Box display="flex" justifyContent="space-between" alignItems="center" marginTop={'20px'}>
          <DialogTitle fontWeight={'bold'}>詳細</DialogTitle>

          <DeleteIcon
            onClick={() => setConfirmOpen(true)}
            sx={{ cursor: 'pointer', mr: 5, '&:hover': { color: 'secondary.main' } }}
          />
          <ConfirmDialog
            title="カードを削除しますか?"
            open={confirmOpen}
            setOpen={setConfirmOpen}
            onConfirm={deleteCard}
          />
        </Box>
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
              <StatusEditor
                selectedStatus={applicationStatus}
                setSelectedStatus={setApplicationStatus}
                selectedProcess={applicationProcess}
                setSelectedProcess={setApplicationProcess}
                applicationDate={applicationDate}
                setApplicationDate={setApplicationDate}
              />
              <FlowEditor
                flowProcesses={flowProcesses}
                setFlowProcesses={setFlowProcesses}
                jobId={cardDetail.id}
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCancel}>キャンセル</Button>
            <Button type="submit">保存</Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

export default CardDetailForm;
