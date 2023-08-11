import type { Category, FullJob, JobPositionUpdate } from '@/types/board';
import type { DragEndEvent, DragOverEvent, DragStartEvent } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import type { Dispatch, SetStateAction } from 'react';
import { jobApi } from './job';

type useCardMovementProps = {
  accessToken: string;
  columns: Category[];
  setColumns: Dispatch<SetStateAction<Category[]>>;
  fromColumn: Category | null;
  setFromColumn: Dispatch<SetStateAction<Category | null>>;
};

const useCardMovement = ({
  accessToken,
  columns,
  setColumns,
  fromColumn,
  setFromColumn,
}: useCardMovementProps) => {
  // Find column by unique id
  const handleEmptyString = (): Category | null => null;
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
    if (unique === null) return null;

    if (unique === '') return handleEmptyString();

    return handleValidString(unique, columns);
  };

  // Update column cards when drop ended
  const updateColumnCards = (
    column: Category,
    activeIndex: number | undefined,
    overIndex: number | undefined,
    cards = column.jobs
  ): Category => {
    if (activeIndex === undefined || overIndex === undefined || cards.length === 0) {
      console.error('updateColumnCards: invalid index');
      return column;
    }

    const newCards = arrayMove(cards, activeIndex, overIndex);
    return { ...column, jobs: newCards };
  };

  // Update category in database when drop ended
  const updateCategoryDropColumn = async (
    column: Category,
    activeCard: FullJob | undefined | null
  ): Promise<void> => {
    if (!activeCard) return;

    await jobApi.editJobCategory(accessToken, activeCard.id, column.id);
  };

  // Update all card positions in the column for the  database when drop ended
  const updateCardPositions = async (updatedJobs: JobPositionUpdate[]): Promise<void> => {
    if (updatedJobs.length === 0) return;

    await jobApi.editCardPositions(accessToken, updatedJobs);
  };

  // Start Dragging card
  const handleDragStart = (event: DragStartEvent) => {
    setFromColumn(findColumn(String(event.active.id), columns));
  };

  // When dragging card
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
      const activeItems = activeColumn.jobs;
      const overItems = overColumn.jobs;
      const foundItem = activeItems.find((i) => i.id === activeId);
      const updatedOverItems = foundItem ? [...overItems, foundItem] : [...overItems];

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

  // After dropping card
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    const activeColumn = findColumn(String(active.id), columns);
    const overColumn = over && findColumn(String(over.id), columns);

    if (!activeColumn || !overColumn || !fromColumn) return;

    const activeIndex = activeColumn.jobs.findIndex((i) => i.id === String(active.id));
    const overIndex = overColumn.jobs.findIndex((i) => i.id === String(over.id));
    const activeCard = overColumn.jobs.find((i) => i.id === String(active.id));
    const updatedJobs: JobPositionUpdate[] = [];

    setColumns((prevState) => {
      return prevState.map((column) => {
        // If this is the column we're dragging from and not the same column we're dragging to...
        if (fromColumn.id === column.id && fromColumn.id !== activeColumn.id) {
          const updatedFromColumn = {
            ...column,
            jobs: column.jobs.filter((job) => job.id !== active.id),
          };
          updatedFromColumn.jobs = updatedFromColumn.jobs.map((job, index) => {
            updatedJobs.push({ id: job.id, card_position: index });
            return { ...job, card_position: index };
          });
          return updatedFromColumn;
        }
        // If this is the column we're dragging to...
        else if (activeColumn.id === column.id) {
          const updatedColumn = updateColumnCards(column, activeIndex, overIndex);
          updatedColumn.jobs = updatedColumn.jobs.map((job, index) => {
            updatedJobs.push({ id: job.id, card_position: index });
            return { ...job, card_position: index };
          });
          return updatedColumn;
        }
        return column;
      });
    });

    setFromColumn(null);
    // Update category in database when drop ended
    updateCategoryDropColumn(overColumn, activeCard);
    // Update card_position for backend
    updateCardPositions(updatedJobs);
  };

  return { handleDragStart, handleDragEnd, handleDragOver };
};

export default useCardMovement;
