'use client';

import { columnsAtom } from '@/atoms/boardAtom';
import { useAccessToken } from '@/contexts/AccessTokenContext';
import { jobApi } from '@/services/job';
import type { FullJob } from '@/types/board';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Link,
  Typography,
} from '@mui/material';
import { useAtom } from 'jotai';
import { useState, type FC } from 'react';
import ConfirmDialog from '../common/ConfirmDialog';

type CardDetailProps = {
  cardDetail: FullJob;
};

const CardDetail: FC<CardDetailProps> = ({ cardDetail }) => {
  const { accessToken } = useAccessToken();
  const [columns, setColumns] = useAtom(columnsAtom);
  const [open, setOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleClose = () => setOpen(false);

  const deleteCard = async () => {
    await jobApi.deleteJob(accessToken, cardDetail.id);
    const newColumns = await jobApi.getCategoryJobs(
      accessToken,
      columns[0].user_id,
      columns[0].type
    );
    setColumns(newColumns);
    setOpen(false);
  };

  return (
    <div>
      <Box display="flex" justifyContent="center" onClick={() => setOpen(true)}>
        <Typography color="white" sx={{ p: 1 }}>
          詳細
        </Typography>
      </Box>

      <Dialog open={open} onClose={handleClose} fullWidth={true}>
        <Box display="flex" justifyContent="flex-end">
          <EditIcon
            sx={{
              cursor: 'pointer',
              mr: 2,
              mt: 4,
              '&:hover': { color: 'secondary.main' },
            }}
          />

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
        <Box display="flex" justifyContent="space-between" marginTop={'20px'}>
          <DialogTitle variant="h3" fontWeight={'bold'}>
            {cardDetail.company_name}
          </DialogTitle>
          <DialogTitle
            variant="h3"
            fontWeight={'bold'}
            sx={{ color: 'primary.main' }}
            marginRight={2}
          >
            {cardDetail.ranking}
          </DialogTitle>
        </Box>
        <DialogContent>
          <Box display="flex" alignItems="center">
            <Box
              display="flex"
              justifyContent="flex-start"
              marginBottom={'20px'}
              marginRight={'20px'}
            >
              <Typography variant="h4" fontWeight={'bold'}>
                業種:
              </Typography>
              <Typography variant="h4" marginLeft="10px">
                IT
              </Typography>
            </Box>
            <Box display="flex" justifyContent="flex-start" marginBottom={'20px'}>
              <Typography variant="h4" fontWeight={'bold'}>
                職種:
              </Typography>
              <Typography variant="h4" marginLeft="10px">
                {cardDetail.occupation}
              </Typography>
            </Box>
          </Box>

          <hr />
          <Box justifyContent="flex-start" marginBottom={'20px'} marginTop={'20px'}>
            <Typography variant="h4" fontWeight={'bold'} marginBottom={'10px'}>
              期間
            </Typography>
            <Typography variant="h4">{cardDetail.internship_duration}</Typography>
          </Box>
          <Typography variant="h4" fontWeight={'bold'} marginBottom={'10px'}>
            日程
          </Typography>
          <Box display="flex" justifyContent="flex-start" alignItems="center" marginBottom={'20px'}>
            <Typography variant="h4">{cardDetail.internship_start_date}</Typography>
            <Typography variant="h4" marginLeft={2} marginRight={2}>
              ~
            </Typography>
            <Typography variant="h4">{cardDetail.internship_end_date}</Typography>
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="flex-start"
            marginBottom={'20px'}
          >
            <Typography variant="h4" fontWeight={'bold'} marginBottom={'10px'}>
              URL
            </Typography>
            <Box border={1} borderRadius={2} p={1}>
              <Link href="#" variant="h4">
                {cardDetail.url}
              </Link>
            </Box>
          </Box>
          <Box display="flex" flexDirection="column">
            <Typography variant="h4" fontWeight={'bold'} marginBottom={'10px'}>
              メモ
            </Typography>
            <Box border={1} borderRadius={2} p={1}>
              <Typography variant="h4">{cardDetail.description}</Typography>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>
            <Typography variant="h4">閉じる</Typography>
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CardDetail;
