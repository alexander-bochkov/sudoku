import {
  CELL_RESIZE_STEP,
  CELLS_ON_AXIS_IN_GROUP,
  FIELD_MAX_DIMENSION,
  FIELD_MIN_DIMENSION,
  GRID_LINE_THICKNESS,
  GROUPS_ON_AXIS_IN_FIELD,
  MIN_SCREEN_EDGES_DISTANCE,
  SUBGRID_LINE_THICKNESS,
} from 'constants/playing-field';
import { getGridLinesQuantity, getSubgridLinesQuantity } from 'utils/index';
import type { Dimensions } from 'types/playing-field';

const calculateFieldDimension = (screenArea: number, attempt = 1): Dimensions['field'] => {
  if (screenArea <= FIELD_MIN_DIMENSION) return FIELD_MIN_DIMENSION;
  if (screenArea >= FIELD_MAX_DIMENSION) return FIELD_MAX_DIMENSION;

  const totalCellsOnAxis = CELLS_ON_AXIS_IN_GROUP * GROUPS_ON_AXIS_IN_FIELD;
  const fieldResizeStep = totalCellsOnAxis * CELL_RESIZE_STEP;
  const fieldDimension = FIELD_MAX_DIMENSION - fieldResizeStep * attempt;

  return screenArea < fieldDimension ? calculateFieldDimension(screenArea, ++attempt) : fieldDimension;
};

const calculateGroupDimension = (field: number): Dimensions['group'] =>
  (field - getGridLinesQuantity() * GRID_LINE_THICKNESS) / GROUPS_ON_AXIS_IN_FIELD;

const calculateCellDimension = (group: number): Dimensions['cell'] =>
  (group - getSubgridLinesQuantity() * SUBGRID_LINE_THICKNESS) / CELLS_ON_AXIS_IN_GROUP;

export const calculatePlayingFieldDimensions = (screenWidth: number, screenHeight: number): Dimensions => {
  const availableScreenArea = Math.min(screenWidth, screenHeight) - MIN_SCREEN_EDGES_DISTANCE;

  const field = calculateFieldDimension(availableScreenArea);
  const group = calculateGroupDimension(field);
  const cell = calculateCellDimension(group);

  return { field, group, cell };
};
