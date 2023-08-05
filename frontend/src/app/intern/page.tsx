'use client';

import type { ColumnType } from '@/components/board/Board';
import Board from '@/components/board/Board';
import type { DragEndEvent, DragOverEvent } from '@dnd-kit/core';
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  closestCorners,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { data } from './data';

const Home = () => {
  const [columns, setColumns] = useState<ColumnType[]>(data);

  // Function to handle empty string
  const handleEmptyString = (): ColumnType | null => {
    return null; // or another appropriate action
  };

  // Function to handle when 'unique' is a valid string
  const handleValidString = (unique: string, columns: ColumnType[]): ColumnType | null => {
    if (columns.some((c) => c.id === unique)) {
      return columns.find((c) => c.id === unique) ?? null;
    }
    const id = String(unique);
    const itemWithColumnId = columns.flatMap((c) => {
      const columnId = c.id;
      return c.cards.map((i) => ({ itemId: i.id, columnId }));
    });
    const columnId = itemWithColumnId.find((i) => i.itemId === id)?.columnId;
    return columns.find((c) => c.id === columnId) ?? null;
  };

  const findColumn = (unique: string | null, columns: ColumnType[]): ColumnType | null => {
    if (unique === null) {
      return null;
    }
    if (unique === '') {
      return handleEmptyString();
    }

    return handleValidString(unique, columns);
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over, delta } = event;
    const activeId = String(active.id);
    const overId = over ? String(over.id) : null;
    const activeColumn = findColumn(activeId, columns);
    const overColumn = findColumn(overId, columns);

    if (!activeColumn || !overColumn || activeColumn === overColumn) {
      return null;
    }

    setColumns((prevState) => {
      const activeItems = activeColumn.cards;
      const overItems = overColumn.cards;
      const activeIndex = activeItems.findIndex((i) => i.id === activeId);
      const overIndex = overItems.findIndex((i) => i.id === overId);
      const newIndex = () => {
        const putOnBelowLastItem = overIndex === overItems.length - 1 && delta.y > 0;
        const modifier = putOnBelowLastItem ? 1 : 0;
        return overIndex >= 0 ? overIndex + modifier : overItems.length + 1;
      };
      return prevState.map((c) => {
        if (c.id === activeColumn.id) {
          return {
            ...c,
            cards: activeItems.filter((i) => i.id !== activeId),
          };
        } else if (c.id === overColumn.id) {
          return {
            ...c,
            cards: [
              ...overItems.slice(0, newIndex()),
              activeItems[activeIndex],
              ...overItems.slice(newIndex(), overItems.length),
            ],
          };
        } else {
          return c;
        }
      });
    });
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    const activeId = String(active.id);
    const overId = over ? String(over.id) : null;
    const activeColumn = findColumn(activeId, columns);
    const overColumn = findColumn(overId, columns);
    const activeIndex = activeColumn?.cards.findIndex((i) => i.id === activeId);
    const overIndex = overColumn?.cards.findIndex((i) => i.id === overId);

    setColumns((prevState) => {
      return prevState.map((column) => {
        if (activeColumn?.id === column.id && overColumn?.id === column.id) {
          return updateColumnCards(column, activeIndex, overIndex);
        } else if (column.id === activeColumn?.id) {
          return updateColumnCards(column, activeIndex, overIndex, overColumn?.cards);
        } else {
          return column;
        }
      });
    });
  };

  function updateColumnCards(
    column: ColumnType,
    activeIndex: number | undefined,
    overIndex: number | undefined,
    cards = column.cards
  ): ColumnType {
    if (activeIndex === undefined || overIndex === undefined || cards.length === 0) {
      return column; // Or some other appropriate default handling
    }

    const newCards = arrayMove(cards, activeIndex, overIndex);
    return { ...column, cards: newCards };
  }

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  return (
    <main>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragEnd={handleDragEnd}
        onDragOver={handleDragOver}
      >
        <Container>
          <Box>
            <Typography variant="h3" textAlign="center" color="text" fontWeight="bold">インターンシップ</Typography>
          </Box>
          <Box display="flex" justifyContent="center" flexDirection="row">
            {columns.map((column) => (
              <Box key={column.id} minWidth="300px">
                <Board id={column.id} title={column.title} cards={column.cards} />
              </Box>
            ))}
          </Box>
        </Container>
      </DndContext>
    </main>
  );
};

export default Home;
