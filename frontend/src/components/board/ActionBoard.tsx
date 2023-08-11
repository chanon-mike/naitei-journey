'use client';

import { accessTokenAtom } from '@/atoms/authAtom';
import { columnsAtom } from '@/atoms/boardAtom';
import useCardMovement from '@/libs/dragAndDrop';
import type { Category } from '@/types/board';
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  closestCorners,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { Box, CircularProgress, Container, Typography } from '@mui/material';
import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import Board from './Board';

type ActionBoardProps = {
  type: string;
  userId: string;
  data: Category[];
  accessToken: string;
};

const ActionBoard = ({ type, userId, data, accessToken }: ActionBoardProps) => {
  const [columns, setColumns] = useAtom(columnsAtom);
  const [, setAccessToken] = useAtom(accessTokenAtom);
  const [fromColumn, setFromColumn] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);
  const boardColor = ['primary.light', 'primary.main', 'secondary.light', 'error.light'];

  useEffect(() => {
    const fetchData = async () => {
      const sortedData = data.map((column) => {
        return {
          ...column,
          jobs: column.jobs.sort((a, b) => a.card_position - b.card_position),
        };
      });

      setColumns(sortedData);
      setAccessToken(accessToken);
      setLoading(false);
    };

    fetchData();
  }, [accessToken, data, setAccessToken, setColumns]);

  const { handleDragStart, handleDragEnd, handleDragOver } = useCardMovement({
    accessToken,
    columns,
    setColumns,
    fromColumn,
    setFromColumn,
  });

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
    >
      <Container>
        <Box textAlign="center">
          <Typography variant="h2" color="text" sx={{ mb: 5 }} fontWeight="bold">
            {type}
          </Typography>
        </Box>
        {loading ? (
          <Box textAlign="center" mt={20}>
            <CircularProgress />
          </Box>
        ) : (
          <Box display="flex" justifyContent="center" flexDirection="row">
            {columns.map((column, index) => (
              <Box key={column.id} minWidth="300px">
                <Board
                  id={column.id}
                  user_id={userId}
                  type={type}
                  name={column.name}
                  jobs={column.jobs}
                  maxIndex={column.jobs.length}
                  boardColor={boardColor[index]}
                />
              </Box>
            ))}
          </Box>
        )}
      </Container>
    </DndContext>
  );
};

export default ActionBoard;
