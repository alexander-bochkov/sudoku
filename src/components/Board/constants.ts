import { BoardVariant } from 'types/board';

export const GRID_LINE_COLOR = '#00416F';
export const SUBGRID_LINE_COLOR = '#C7C7C7';

export const CELL_HOVER_COLOR = 'rgb(0 149 255 / 30%)';
export const CELL_SELECT_COLOR = 'rgb(0 149 255 / 80%)';

export const NUMBER_COLOR: Record<Exclude<BoardVariant, 'full'> | 'error', string> = {
  error: '#FF0004',
  prefilled: '#00416F',
  solution: '#0095FF',
};

export const NUMBER_OFFSET_Y = 2;
