export const CELLS_QUANTITY_IN_GROUP_ROW = 3;
export const GROUPS_QUANTITY_IN_FIELD_ROW = 3;

export const ONE_GROUP_DIVIDER_SIZE = 2;
export const GROUP_DIVIDERS_QUANTITY = 2;

export const ONE_CELL_DIVIDER_SIZE = 1;
export const CELL_DIVIDERS_QUANTITY = 2;

export const CELL_DIVIDER_COLOR = '#C7C7C7';
export const GROUP_DIVIDER_COLOR = '#00416F';

// new constants
export const MIN_SCREEN_EDGES_DISTANCE = 30;

export const CELL_RESIZE_STEP = 2;

export const GRID = {
  COLOR: '#00416F',
  LINES: 2,
  THICKNESS: 2,
} as const;

export const SUBGRID = {
  COLOR: '#C7C7C7',
  LINES: 2,
  THICKNESS: 1,
} as const;

export const PLAYING_FIELD = {
  CELLS_ON_AXIS: 9,
  GROUPS_ON_AXIS: 3,
  MAX_DIMENSION: 370,
  MIN_DIMENSION: 280,
} as const;
