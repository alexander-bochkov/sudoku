import {
  CELL_DIVIDERS_SIZE,
  CELLS_QUANTITY_IN_GROUP_ROW,
  FIELD_RESIZE_STEP,
  GAPS_MIN_SIZE,
  GROUP_DIVIDERS_SIZE,
  GROUPS_QUANTITY_IN_FIELD_ROW,
  MAX_FIELD_SIZE,
  MIN_FIELD_SIZE,
} from '../constants';
import type { Dimensions } from '../types';

const calculateFieldSize = (screenSize: number, depth = 1): number => {
  if (screenSize >= MAX_FIELD_SIZE) return MAX_FIELD_SIZE;
  if (screenSize <= MIN_FIELD_SIZE) return MIN_FIELD_SIZE;

  const fieldSize = MAX_FIELD_SIZE - FIELD_RESIZE_STEP * depth;
  return screenSize < fieldSize ? calculateFieldSize(screenSize, ++depth) : fieldSize;
};

const calculateGroupSize = (fieldSize: number): number =>
  (fieldSize - GROUP_DIVIDERS_SIZE) / GROUPS_QUANTITY_IN_FIELD_ROW;

const calculateCellSize = (groupSize: number): number => (groupSize - CELL_DIVIDERS_SIZE) / CELLS_QUANTITY_IN_GROUP_ROW;

export const getPlayingFieldDimensions = (screenHeight: number, screenWidth: number): Dimensions => {
  const availableScreenSize = Math.min(screenHeight, screenWidth) - GAPS_MIN_SIZE;

  const fieldSize = calculateFieldSize(availableScreenSize);
  const groupSize = calculateGroupSize(fieldSize);
  const cellSize = calculateCellSize(groupSize);

  return {
    cell: cellSize,
    field: fieldSize,
    group: groupSize,
  };
};
