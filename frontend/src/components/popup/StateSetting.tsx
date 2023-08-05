import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { DatePicker } from '@mui/x-date-pickers-pro/';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import ja from 'date-fns/locale/ja';
import * as React from 'react';
import FlowButton from './FlowButton';
import StateButton from './StateButton';

const StateSetting = () => {
  const [open, setOpen] = React.useState(false);
  const [month, setMonth] = React.useState('');
  const [date, setDate] = React.useState('');
  const [selectedFlow, setSelectedFlow] = React.useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = React.useState<string | null>(null);

  const flows0 = [
    { id: 'es', name: 'ES' },
    { id: 'web', name: 'Webテスト' },
    { id: 'first', name: '1次面接' },
  ];

  const flows1 = [
    { id: 'second', name: '2次面接' },
    { id: 'third', name: '3次面接' },
    { id: 'final', name: '最終面接' },
  ];

  const flows2 = [{ id: 'other', name: 'その他' }];

  const state = [
    { id: 'incomplete', name: '未完了' },
    { id: 'adjustment', name: '調整中' },
    { id: 'waitng', name: '結果待ち' },
  ];

  const handleStatusChange = (status: string) => {
    setSelectedStatus(status);
  };

  const handleFlowChange = (flow: string) => {
    setSelectedFlow(flow);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div>
      <Button variant="outlined" style={{ width: '100%' }} onClick={handleClickOpen}>
        志望状況
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle fontWeight={'bold'}>選考状況選択</DialogTitle>
        <form onSubmit={handleFormSubmit}>
          <DialogContent>
            <Box>
              <Typography variant="h6">フロー</Typography>
              <Box
                display="flex"
                justifyContent="space-between"
                marginBottom={'20px'}
                marginTop={'20px'}
              >
                {flows0.map((flow) => (
                  <FlowButton
                    key={flow.id}
                    selectedFlow={selectedFlow}
                    flow={flow.name}
                    handleFlowChange={handleFlowChange}
                  />
                ))}
              </Box>
              <Box
                display="flex"
                justifyContent="space-between"
                marginBottom={'20px'}
                marginTop={'20px'}
              >
                {flows1.map((flow) => (
                  <FlowButton
                    key={flow.id}
                    selectedFlow={selectedFlow}
                    flow={flow.name}
                    handleFlowChange={handleFlowChange}
                  />
                ))}
              </Box>
              <Box
                display="flex"
                justifyContent="space-between"
                marginBottom={'20px'}
                marginTop={'20px'}
              >
                {flows2.map((flow) => (
                  <FlowButton
                    key={flow.id}
                    selectedFlow={selectedFlow}
                    flow={flow.name}
                    handleFlowChange={handleFlowChange}
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
                {state.map((status) => (
                  <StateButton
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
                日程
              </Typography>
              <Box display="flex" justifyContent="flex-start" marginTop={'20px'}>
                <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ja}>
                  <DatePicker label="日程" />
                </LocalizationProvider>
              </Box>
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
export default StateSetting;
