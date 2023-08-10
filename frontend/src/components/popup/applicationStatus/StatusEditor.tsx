import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material';

import { DatePicker } from '@mui/x-date-pickers-pro/';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import ja from 'date-fns/locale/ja';
import type { Dispatch, SetStateAction } from 'react';
import { useState } from 'react';
import ProcessButton from './ProcessButton';
import StatusButton from './StatusButton';

const statuses1 = [
  { id: 'es', name: 'ES' },
  { id: 'web', name: 'Webテスト' },
  { id: 'first', name: '1次面接' },
];

const statuses2 = [
  { id: 'second', name: '2次面接' },
  { id: 'third', name: '3次面接' },
  { id: 'final', name: '最終面接' },
];

const statuses3 = [{ id: 'other', name: 'その他' }];

const processes = [
  { id: 'incomplete', name: '未完了' },
  { id: 'adjustment', name: '調整中' },
  { id: 'waitng', name: '結果待ち' },
];

type StatusEditorProps = {
  selectedStatus: string | null;
  setSelectedStatus: Dispatch<SetStateAction<string | null>>;
  selectedProcess: string | null;
  setSelectedProcess: Dispatch<SetStateAction<string | null>>;
  applicationDate: Date | null;
  setApplicationDate: Dispatch<SetStateAction<Date | null>>;
};

const StatusEditor = ({
  selectedStatus,
  setSelectedStatus,
  selectedProcess,
  setSelectedProcess,
  applicationDate,
  setApplicationDate,
}: StatusEditorProps) => {
  const [open, setOpen] = useState(false);

  const handleStatusChange = (status: string) => setSelectedStatus(status);
  const handleProcessChange = (process: string) => setSelectedProcess(process);

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => {
    setSelectedStatus(null);
    setSelectedProcess(null);
    setApplicationDate(null);
    setOpen(false);
  };

  const handleSave = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" style={{ width: '100%' }} onClick={handleClickOpen}>
        選考状況
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle fontWeight={'bold'}>選考状況選択</DialogTitle>
        <DialogContent>
          <Box>
            <Typography variant="h6">ステータス</Typography>
            <Box
              display="flex"
              justifyContent="space-between"
              marginBottom={'20px'}
              marginTop={'20px'}
            >
              {statuses1.map((status) => (
                <StatusButton
                  key={status.id}
                  selectedStatus={selectedStatus}
                  status={status.name}
                  handleStatusChange={handleStatusChange}
                />
              ))}
            </Box>
            <Box
              display="flex"
              justifyContent="space-between"
              marginBottom={'20px'}
              marginTop={'20px'}
            >
              {statuses2.map((status) => (
                <StatusButton
                  key={status.id}
                  selectedStatus={selectedStatus}
                  status={status.name}
                  handleStatusChange={handleStatusChange}
                />
              ))}
            </Box>
            <Box
              display="flex"
              justifyContent="space-between"
              marginBottom={'20px'}
              marginTop={'20px'}
            >
              {statuses3.map((status) => (
                <StatusButton
                  key={status.id}
                  selectedStatus={selectedStatus}
                  status={status.name}
                  handleStatusChange={handleStatusChange}
                />
              ))}
            </Box>
          </Box>

          <hr />

          <Box>
            <Typography variant="h6" marginTop={'20px'}>
              選考状況
            </Typography>
            <Box
              display="flex"
              justifyContent="space-between"
              marginBottom={'20px'}
              marginTop={'20px'}
            >
              {processes.map((process) => (
                <ProcessButton
                  key={process.id}
                  selectedProcess={selectedProcess}
                  process={process.name}
                  handleProcessChange={handleProcessChange}
                />
              ))}
            </Box>
          </Box>

          <hr />

          <Box>
            <Typography variant="h6" marginTop={'20px'}>
              日程
            </Typography>
            <Box display="flex" justifyContent="flex-start" marginTop={'20px'}>
              <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ja}>
                <DatePicker
                  label="日程"
                  value={applicationDate}
                  onChange={(date: Date | null) => setApplicationDate(date || new Date())}
                />
              </LocalizationProvider>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSave}>閉じる</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default StatusEditor;
