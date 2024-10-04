import type { CSSProperties } from 'react';

export const getPlayingFieldStyle = (fieldSize: number, cellSize: number): CSSProperties => ({
  borderRadius: cellSize / 2,
  height: fieldSize,
  width: fieldSize,
});
