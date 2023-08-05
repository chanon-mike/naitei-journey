import { useDroppable } from '@dnd-kit/core';
import { SortableContext, rectSortingStrategy } from '@dnd-kit/sortable';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import type { FC } from 'react';
import CardDetail from '../popup/CardDetail';
import type { CardType } from './ActionArea';
import ActionAreaCard from './ActionArea';

export type ColumnType = {
  id: string;
  title: string;
  cards: CardType[];
};

const Board: FC<ColumnType> = ({ id, title, cards }: ColumnType) => {
  const { setNodeRef } = useDroppable({ id });

  return (
    <SortableContext id={id} items={cards} strategy={rectSortingStrategy}>
      <div ref={setNodeRef}>
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
          }}
        >
          <Paper style={{ margin: '20px', minHeight: '100vh', width: '300px' }}>
            <Box display="flex" justifyContent="center" alignItems="center" style={{ margin: '20px' }} sx={{
              textAlign: 'center',
              border: 1,
              borderColor: 'primary.dark',
            }}>
              <Typography
                id="outlined-basic"
                variant="h6"
                component="div"
                fontWeight={'bold'}
                sx={{ p: 1 }}
              >{title}</Typography>
            </Box>
            {cards.map((card) => (
              <ActionAreaCard
                key={card.id}
                id={card.id}
                title={card.title}
                rank={card.rank}
                state={card.state}
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
