'use client';

import { data } from '@/app/intern/data';
import type { ColumnType } from '@/types/board';
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
import { Box, Container, Typography } from '@mui/material';
import { useState } from 'react';
import Board from './Board';

type ActionBoardProps = {
  type: string;
  userId: string;
};

const ActionBoard = ({ type, userId }: ActionBoardProps) => {
  const [columns, setColumns] = useState<ColumnType[]>(data);

  // Function to handle empty string
  const handleEmptyString = (): ColumnType | null => {
    console.log('empty');
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

    console.log('activeId:', activeId);
    console.log('Over:', overId);
    console.log('activeItems:');
    console.log('overitems: ');

    if (!activeColumn || !overColumn || activeColumn === overColumn) {
      return null;
    }

    setColumns((prevState) => {
      const activeItems = activeColumn.cards;
      const overItems = overColumn.cards;

      const foundItem = activeItems.find((i) => i.id === activeId);
      const updatedOverItems = foundItem ? [...overItems, foundItem] : [...overItems];

      console.log('activeItems:', activeItems);
      console.log('overitems: ', overItems);

      const activeIndex = activeItems.findIndex((i) => i.id === activeId);
      const overIndex = overItems.findIndex((i) => i.id === overId);
      const newIndex = () => {
        const putOnBelowLastItem = overIndex === overItems.length - 1 && delta.y > 0;
        const modifier = putOnBelowLastItem ? 1 : 0;
        return overIndex >= 0 ? overIndex + modifier : overItems.length + 1;
      };
      return prevState.map((c) => {
        if (c.id === activeColumn.id) {
          console.log('activeId: ', activeId);
          console.log('overItemCheck: ', overItems);
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
              ...overItems.slice(newIndex(), updatedOverItems.length),
            ],
          };
        } else {
          return c;
        }
      });
    });
  };

  const updateColumnCards = (
    column: ColumnType,
    activeIndex: number | undefined,
    overIndex: number | undefined,
    cards = column.cards
  ): ColumnType => {
    if (activeIndex === undefined || overIndex === undefined || cards.length === 0) {
      return column; // Or some other appropriate default handling
    }

    const newCards = arrayMove(cards, activeIndex, overIndex);
    return { ...column, cards: newCards };
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    const activeId = String(active.id);
    const overId = over ? String(over.id) : null;
    const activeColumn = findColumn(activeId, columns);
    const overColumn = findColumn(overId, columns);
    const activeIndex = activeColumn?.cards.findIndex((i) => i.id === activeId);
    const overIndex = overColumn?.cards.findIndex((i) => i.id === overId);

    console.log('End:', overColumn);

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

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
    >
      <Container>
        <Box>
          <Typography variant="h3" textAlign="center" color="text" fontWeight="bold">
            インターンシップ
          </Typography>
        </Box>
        <Box display="flex" justifyContent="center" flexDirection="row">
          {columns.map((column) => (
            <Box key={column.id} minWidth="300px">
              <Board
                id={column.id}
                userId={userId}
                type={type}
                name={column.name}
                cards={column.cards}
              />
            </Box>
          ))}
        </Box>
      </Container>
    </DndContext>
  );
};

export default ActionBoard;
