import type { ColumnType } from '@/types/board';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, rectSortingStrategy } from '@dnd-kit/sortable';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import type { FC } from 'react';
import ActionAreaCard from './ActionArea';
import CardForm from '../popup/CardForm';

const Board: FC<ColumnType> = ({ id, name, jobs }: ColumnType) => {
  const { setNodeRef } = useDroppable({ id });

  return (
    <SortableContext id={id} items={jobs} strategy={rectSortingStrategy}>
      <div ref={setNodeRef}>
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
          }}
        >
          <Paper style={{ margin: '20px', minHeight: '100vh', width: '300px' }}>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              style={{ margin: '20px' }}
              sx={{
                textAlign: 'center',
                border: 1,
                borderColor: 'primary.dark',
              }}
            >
              <Typography
                id="outlined-basic"
                variant="h6"
                component="div"
                fontWeight={'bold'}
                sx={{ p: 1 }}
              >
                {name}
              </Typography>
            </Box>
            {jobs.map((card) => (
              <ActionAreaCard
                key={card.id}
                id={card.id}
                company_name={card.company_name}
                ranking={card.ranking}
              />
            ))}
            <CardForm />
          </Paper>
        </Box>
      </div>
    </SortableContext>
  );
};

export default Board;
