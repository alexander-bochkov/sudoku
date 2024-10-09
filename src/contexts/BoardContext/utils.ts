import { getGridLinesQuantity, getSubgridLinesQuantity } from 'utils/board';
import { CELLS_IN_ZONE_ON_AXIS, GRID_LINE_THICKNESS, SUBGRID_LINE_THICKNESS, ZONES_ON_AXIS } from 'constants/board';
import { BOARD_MAX_DIMENSION, BOARD_MIN_DIMENSION, CELL_RESIZE_STEP, MIN_SCREEN_EDGES_DISTANCE } from './constants';
import type { Dimensions } from 'types/board';

const calculateBoardDimension = (screenArea: number, attempt = 1): Dimensions['board'] => {
  if (screenArea <= BOARD_MIN_DIMENSION) return BOARD_MIN_DIMENSION;
  if (screenArea >= BOARD_MAX_DIMENSION) return BOARD_MAX_DIMENSION;

  const cellsOnAxis = CELLS_IN_ZONE_ON_AXIS * ZONES_ON_AXIS;
  const boardResizeStep = cellsOnAxis * CELL_RESIZE_STEP;
  const boardDimension = BOARD_MAX_DIMENSION - boardResizeStep * attempt;

  return screenArea < boardDimension ? calculateBoardDimension(screenArea, ++attempt) : boardDimension;
};

const calculateZoneDimension = (board: number): Dimensions['zone'] =>
  (board - getGridLinesQuantity() * GRID_LINE_THICKNESS) / ZONES_ON_AXIS;

const calculateCellDimension = (group: number): Dimensions['cell'] =>
  (group - getSubgridLinesQuantity() * SUBGRID_LINE_THICKNESS) / CELLS_IN_ZONE_ON_AXIS;

export const getDimensions = (screenWidth: number, screenHeight: number): Dimensions => {
  const availableScreenArea = Math.min(screenWidth, screenHeight) - MIN_SCREEN_EDGES_DISTANCE;

  const board = calculateBoardDimension(availableScreenArea);
  const zone = calculateZoneDimension(board);
  const cell = calculateCellDimension(zone);

  return { board, zone, cell };
};
