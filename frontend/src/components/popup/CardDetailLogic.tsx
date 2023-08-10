// useCardDetailLogic.ts
import { jobApi } from '@/libs/job';
import type { FullJob } from '@/types/board';
import { useState } from 'react';

export const CardDetailLogic = (cardDetail: FullJob, accessToken: string) => {
  const [open, setOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleClose = () => setOpen(false);

  const deleteCard = async () => {
    await jobApi.deleteJob(accessToken, cardDetail.id);
    setOpen(false);
  };

  return {
    open,
    setOpen,
    confirmOpen,
    setConfirmOpen,
    handleClose,
    deleteCard,
  };
};

export default CardDetailLogic;
