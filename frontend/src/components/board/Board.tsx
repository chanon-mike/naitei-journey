import type { ColumnType } from '@/types/board';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, rectSortingStrategy } from '@dnd-kit/sortable';
import { Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import type { FC } from 'react';
import CardDetail from '../popup/CardDetail';
import ActionAreaCard from './ActionArea';
import { useState } from 'react';

const Board: FC<ColumnType> = ({ id, name, cards }: ColumnType) => {
  const { setNodeRef } = useDroppable({ id });

  const [isCardDetailOpen, setIsCardDetailOpen] = useState(false);

  return (
    <SortableContext id={id} items={cards} strategy={rectSortingStrategy}>
      <div ref={setNodeRef}>
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'flex-start',
          }}
        >
          <Paper style={{ margin: '20px', marginLeft: '100px', minHeight: '100vh', minWidth: '250px' }}>
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
            {cards.map((card) => (
              <ActionAreaCard
                key={card.id}
                id={card.id}
                columnId={id}
              />
            ))}
            <CardDetail />
          </Paper>
        </Box>
      </div>
    </SortableContext>
  );
};

export default Board;
