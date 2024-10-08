export const MIN_SCREEN_EDGES_DISTANCE = 30;

export const CELL_RESIZE_STEP = 2;

export const PLAYING_FIELD = {
  CELLS_ON_AXIS: 9,
  GROUPS_ON_AXIS: 3,
  MAX_DIMENSION: 370,
  MIN_DIMENSION: 280,
  NUMBERS_COLOR: '#00416F',
  HOVER_CELL_COLOR: 'rgb(0 149 255 / 30%)',
} as const;

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

export const NUMBER_OFFSET_Y = 2;
