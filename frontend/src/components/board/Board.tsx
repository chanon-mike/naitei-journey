import { useDroppable } from '@dnd-kit/core';
import { SortableContext, rectSortingStrategy } from '@dnd-kit/sortable';
import { TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import type { FC } from 'react';
import type { CardType } from './ActionArea';
import ActionAreaCard from './ActionArea';
import AddButton from './AddButton';

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
          <Paper style={{ margin: '20px', minHeight: '100vh' }}>
            <Box display="flex" justifyContent="center" style={{ margin: '20px' }}>
              <TextField
                id="outlined-basic"
                variant="outlined"
                style={{ width: '60%' }}
                inputProps={{ style: { textAlign: 'center', fontSize: '20px' } }}
                size="small"
                value={title}
              />
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
            <AddButton />
          </Paper>
        </Box>
      </div>
    </SortableContext>
  );
};

export default Board;
