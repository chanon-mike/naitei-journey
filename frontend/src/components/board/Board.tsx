import type { ColumnType } from '@/types/board';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, rectSortingStrategy } from '@dnd-kit/sortable';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import type { FC } from 'react';
import CardForm from '../popup/CardForm';
import ActionAreaCard from './ActionArea';

const Board: FC<ColumnType> = ({ id, type, name, jobs }: ColumnType) => {
  const { setNodeRef } = useDroppable({ id });

  return (
    <SortableContext id={id} items={jobs} strategy={rectSortingStrategy}>
      <div ref={setNodeRef}>
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'flex-start',
          }}
        >
          <Paper style={{ minWidth: '250px' }}>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              sx={{
                textAlign: 'center',
                border: 1,
                borderColor: 'primary.dark',
                m: 1,
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
              <ActionAreaCard key={card.id} id={card.id} cardDetail={card} />
            ))}
            <CardForm categoryId={id} categoryType={type} />
          </Paper>
        </Box>
      </div>
    </SortableContext>
  );
};

export default Board;
