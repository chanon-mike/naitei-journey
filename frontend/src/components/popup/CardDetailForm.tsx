'use client';

import { accessTokenAtom } from '@/atoms/authAtom';
import { jobApi } from '@/libs/job';
import type { FullJob, FullJobUpdate, SelectionFlow } from '@/types/board';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material';
import { useAtom } from 'jotai';
import moment from 'moment';
import type { FormEvent } from 'react';
import { useState, type FC } from 'react';
import CompanyDetailForm from '../common/CompanyDetailForm';
import ConfirmDialog from '../common/ConfirmDialog';
import InternshipDetail from '../common/InternDetail';
import UrlMemoForm from '../common/UrlMemoForm';
import CardDetailLogic from './CardDetailLogic';
import FlowEditor from './FlowEditor';
import { getInternshipDateAndPeriod } from './SplitDateAndPeriod';
import StatusEditor from './StatusEditor';

type CardDetailProps = {
  cardDetail: FullJob;
};

const CardDetailForm: FC<CardDetailProps> = ({ cardDetail }) => {
  const [accessToken] = useAtom(accessTokenAtom);
  const { open, setOpen, confirmOpen, setConfirmOpen, handleClose, deleteCard } = CardDetailLogic(
    cardDetail,
    accessToken
  );
  
  function initBase(value: string): string {
    return value ?? '';
  }

  function initDateValue(dateString: string): Date | null {
    return dateString ? new Date(dateString) : null;
  }

  function initStatus(value: string): string | null {
    return value ? value : null;
  }

  function initFlow(value: SelectionFlow[] | null | undefined): SelectionFlow[] {
    return value || [];
  }

  const { date_val, period_val } = getInternshipDateAndPeriod(cardDetail.internship_duration);
  /*FullJob information*/
  const [jobId] = useState(() => initBase(cardDetail.id));
  const [categoryId] = useState(() => initBase(cardDetail.category_id));
  const [companyName, setCompanyName] = useState(() => initBase(cardDetail.company_name));
  const [companyIndustry, setCompanyIndustry] = useState(() =>
    initBase(cardDetail.company_industry)
  );
  const [occupation, setOccupation] = useState(() => initBase(cardDetail.occupation));
  const [ranking, setRanking] = useState(() => initBase(cardDetail.ranking));
  const [categoryType] = useState(cardDetail.is_internship);
  const internshipDateString = date_val !== null ? date_val.toString() : '';
  const [internshipDate, setInternshipDate] = useState(internshipDateString);
  const internshipPeriodString = period_val !== null ? period_val : '';
  const [internshipPeriod, setInternshipPeriod] = useState(internshipPeriodString);
  const [internshipStartDate, setInternshipStartDate] = useState(() =>
    initDateValue(cardDetail.internship_start_date)
  );
  const [internshipEndDate, setInternshipEndDate] = useState(() =>
    initDateValue(cardDetail.internship_end_date)
  );
  const [url, setUrl] = useState(() => initBase(cardDetail.url));
  const [description, setDescription] = useState(() => initBase(cardDetail.description));

  // Application status information
  const [applicationStatus, setApplicationStatus] = useState(() =>
    initStatus(cardDetail.application_status.status)
  );
  const [applicationProcess, setApplicationProcess] = useState(() =>
    initStatus(cardDetail.application_status.process)
  );
  const [applicationDate, setApplicationDate] = useState(() =>
    initDateValue(cardDetail.application_status.date)
  );
  // Selection flow information
  const [flowProcesses, setFlowProcesses] = useState(() => initFlow(cardDetail.selection_flows));
  
  console.log('flowProcesses', flowProcesses[0]);

  const transformedSelectionFlows = flowProcesses.map((flow, index) => {
    return {
      ...flow,
      id: cardDetail.selection_flows[index].id,
      job_id: jobId,
    };
  });

  const handleEditCard = async () => {
    const cardDetail: FullJobUpdate = {
      job: {
        category_id: categoryId,
        card_position: 1,
        company_name: companyName,
        company_industry: companyIndustry,
        occupation,
        ranking,
        is_internship: categoryType,
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
      selection_flows: transformedSelectionFlows,
    };
    await jobApi.editJob(accessToken, cardDetail, jobId);
    handleClose();
  };

  const handleRankingChange = (newRanking: string) => setRanking(newRanking);
  const handlePeriodChange = (newPeriod: string) => setInternshipPeriod(newPeriod);

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleEditCard();
  };

  const dateToString = (dateObject: Date | null) => {
    // get the year, month, date, hours, and minutes seprately and append to the string.
    if (!dateObject) return '';
    return moment(dateObject).format('YYYY-MM-DD');
  };

  return (
    <div>
      <Box display="flex" justifyContent="center" onClick={() => setOpen(true)}>
        <Typography color="white" sx={{ p: 1 }}>
          詳細
        </Typography>
      </Box>

      <Dialog open={open} onClose={handleClose} fullWidth={true}>
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
              <FlowEditor flowProcesses={flowProcesses} setFlowProcesses={setFlowProcesses} />
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

export default CardDetailForm;
