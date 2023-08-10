'use client';

import type { Category } from '@/types/board';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, rectSortingStrategy } from '@dnd-kit/sortable';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { type FC } from 'react';
import CardForm from '../popup/CardForm';
import ActionAreaCard from './ActionAreaCard';

interface BoardProps extends Category {
  maxIndex: number;
  boardColor: string;
}

const Board: FC<BoardProps> = ({ id, type, name, jobs, maxIndex, boardColor }) => {
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
          <Paper sx={{ minWidth: '250px', borderRadius: '15px' }} elevation={1}>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              sx={{
                textAlign: 'center',
                bgcolor: boardColor,
                color: 'white',
                borderTopRightRadius: '15px',
                borderTopLeftRadius: '15px',
              }}
            >
              <Typography id="outlined-basic" variant="h6" component="div" sx={{ p: 1 }}>
                {name}
              </Typography>
            </Box>
            {jobs.map((card) => (
              <ActionAreaCard
                key={card.id}
                id={card.id}
                cardDetail={card}
                boardColor={boardColor}
              />
            ))}
            <CardForm
              categoryId={id}
              categoryType={type}
              maxIndex={maxIndex}
              boardColor={boardColor}
            />
          </Paper>
        </Box>
      </div>
    </SortableContext>
  );
};

export default Board;
