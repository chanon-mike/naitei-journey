'use client';

import { useAccessToken } from '@/contexts/AccessTokenContext';
import type { FullJob } from '@/types/board';
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
import type { FormEvent } from 'react';
import { useState, type FC } from 'react';
import CompanyDetailForm from '../common/CompanyDetailForm';
import ConfirmDialog from '../common/ConfirmDialog';
import InternshipDetail from '../common/InternDetail';
import UrlMemoForm from '../common/UrlMemoForm';
import CardDetailLogic from './CardDetailLogic';
import { getInternshipDateAndPeriod } from './SplitDateAndPeriod';

type CardDetailProps = {
  cardDetail: FullJob;
};

const CardDetailForm: FC<CardDetailProps> = ({ cardDetail }) => {
  const { accessToken } = useAccessToken();
  const { open, setOpen, confirmOpen, setConfirmOpen, handleClose, deleteCard } = CardDetailLogic(
    cardDetail,
    accessToken
  );

  const { date_val, period_val } = getInternshipDateAndPeriod(cardDetail.internship_duration);

  function initBase(value: string): string {
    return value ?? '';
  }

  function initDateValue(dateString: string): Date | null {
    return dateString ? new Date(dateString) : null;
  }

  /*FullJob information*/
  const [companyName, setCompanyName] = useState(() => initBase(cardDetail.company_name));
  const [companyIndustry, setCompanyIndustry] = useState(() =>
    initBase(cardDetail.company_industry)
  );
  const [occupation, setOccupation] = useState(() => initBase(cardDetail.occupation));
  const [ranking, setRanking] = useState(() => initBase(cardDetail.ranking));
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

  /*
  // Application status information
  const [applicationStatus, setApplicationStatus] = useState<string | null>(null);
  const [applicationProcess, setApplicationProcess] = useState<string | null>(null);
  const [applicationDate, setApplicationDate] = useState<Date | null>(null);
  // Selection flow information
  const [flowProcesses, setFlowProcesses] = useState<FlowForm[]>([]);
  */

  const handleRankingChange = (newRanking: string) => setRanking(newRanking);
  const handlePeriodChange = (newPeriod: string) => setInternshipPeriod(newPeriod);

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //handleSaveCard();
  };

  return (
    <div>
      <Box display="flex" justifyContent="center" onClick={() => setOpen(true)}>
        <Typography color="white" sx={{ p: 1 }}>
          詳細
        </Typography>
      </Box>

      <Dialog open={open} onClose={handleClose} fullWidth={true}>
        <Box display="flex" justifyContent="space-between" marginTop={'20px'}>
          <DialogTitle variant="h4" fontWeight={'bold'}>
            詳細
          </DialogTitle>

          <DeleteIcon
            onClick={() => setConfirmOpen(true)}
            sx={{ cursor: 'pointer', mr: 5, mt: 4, '&:hover': { color: 'secondary.main' } }}
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

            <hr />
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
