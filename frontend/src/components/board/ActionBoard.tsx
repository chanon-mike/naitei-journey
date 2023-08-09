'use client';

import { accessTokenAtom } from '@/atoms/authAtom';
import { columnsAtom } from '@/atoms/boardAtom';
import { jobApi } from '@/libs/job';
import type { Category, FullJob, FullJobUpdate } from '@/types/board';
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
import { useAtom } from 'jotai';
import { useEffect } from 'react';
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

  useEffect(() => {
    setColumns(data);
    setAccessToken(accessToken);
  }, [accessToken, data, setAccessToken, setColumns]);

  const handleEmptyString = (): Category | null => {
    //console.log('empty');
    return null;
  };

  // Function to handle when 'unique' is a valid string
  const handleValidString = (unique: string, columns: Category[]): Category | null => {
    if (columns.some((c) => c.id === unique)) {
      return columns.find((c) => c.id === unique) ?? null;
    }
    const id = String(unique);
    const itemWithColumnId = columns.flatMap((c) => {
      const columnId = c.id;
      return c.jobs.map((i) => ({ itemId: i.id, columnId }));
    });
    const columnId = itemWithColumnId.find((i) => i.itemId === id)?.columnId;
    return columns.find((c) => c.id === columnId) ?? null;
  };

  const findColumn = (unique: string | null, columns: Category[]): Category | null => {
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

    //console.log('activeId:', activeId);
    //console.log('OverId:', overId);

    if (!activeColumn || !overColumn || activeColumn === overColumn) {
      return null;
    }

    setColumns((prevState) => {
      const activeItems = activeColumn.jobs;
      const overItems = overColumn.jobs;
      const foundItem = activeItems.find((i) => i.id === activeId);
      const updatedOverItems = foundItem ? [...overItems, foundItem] : [...overItems];

      // console.log('activeItems:', activeItems);
      // console.log('overitems: ', overItems);
      // console.log('overColumn: ', overColumn);

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
            jobs: activeItems.filter((i) => i.id !== activeId),
          };
        } else if (c.id === overColumn.id) {
          return {
            ...c,
            jobs: [
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
    column: Category,
    activeIndex: number | undefined,
    overIndex: number | undefined,
    cards = column.jobs
  ): Category => {
    if (activeIndex === undefined || overIndex === undefined || cards.length === 0) {
      return column; // Or some other appropriate default handling
    }

    const newCards = arrayMove(cards, activeIndex, overIndex);
    return { ...column, jobs: newCards };
  };

  const updateCategoryDropColumn = async (
    column: Category,
    overIndex: number,
    activeCard: FullJob | undefined | null
  ) => {
    if (!activeCard) return;

    if (activeCard.category_id !== column.id) {
      const editedJob: FullJobUpdate = {
        job: {
          category_id: column.id,
          card_position: overIndex,
          company_name: activeCard.company_name,
          company_industry: activeCard.company_industry,
          occupation: activeCard.occupation,
          ranking: activeCard.ranking,
          is_internship: activeCard.is_internship,
          internship_duration: activeCard.internship_duration,
          internship_start_date: activeCard.internship_start_date,
          internship_end_date: activeCard.internship_end_date,
          url: activeCard.url,
          description: activeCard.description,
        },
        application_status: {
          status: activeCard.application_status.status,
          process: activeCard.application_status.process,
          date: activeCard.application_status.date,
        },
        selection_flows: activeCard.selection_flows.map((flow) => {
          return {
            id: flow.id,
            job_id: flow.job_id,
            step: flow.step,
            process: flow.process,
          };
        }),
      };
      console.log(await jobApi.editJob(accessToken, editedJob, activeCard.id));
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    const activeColumn = findColumn(String(active.id), columns);
    const overColumn = over && findColumn(String(over.id), columns);

    if (!activeColumn) return;

    const activeIndex = activeColumn.jobs.findIndex((i) => i.id === String(active.id));
    const overIndex = overColumn ? overColumn.jobs.findIndex((i) => i.id === String(over.id)) : -1;

    const activeCard = overColumn && overColumn.jobs.find((i) => i.id === String(active.id));

    setColumns((prevState) => {
      return prevState.map((column) => {
        if (activeColumn.id === column.id) {
          if (overColumn && activeColumn.id === overColumn.id) {
            // console.log('activeCard', activeCard);
            // Update category in database when drop in another column
            updateCategoryDropColumn(column, overIndex, activeCard);
            return updateColumnCards(column, activeIndex, overIndex);
          }
          return updateColumnCards(column, activeIndex, overIndex, overColumn?.jobs);
        }
        return column;
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
          <Typography variant="h3" textAlign="center" color="text" fontWeight="bold" sx={{ mb: 3 }}>
            {type}
          </Typography>
        </Box>
        <Box display="flex" justifyContent="center" flexDirection="row">
          {columns.map((column) => (
            <Box key={column.id} minWidth="300px">
              <Board
                id={column.id}
                user_id={userId}
                type={type}
                name={column.name}
                jobs={column.jobs}
              />
            </Box>
          ))}
        </Box>
      </Container>
    </DndContext>
  );
};

export default ActionBoard;
