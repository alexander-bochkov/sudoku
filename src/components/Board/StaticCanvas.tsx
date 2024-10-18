import { useEffect } from 'react';
import { useBoardDrawing } from './hooks/use-board-drawing';
import { useCanvas } from './hooks/use-canvas';
import { useGridDrawing } from './hooks/use-grid-drawing';
import type { FC } from 'react';
import type { Board, Dimensions } from 'types/board';
import type { Nullable } from 'types/utility-types';

type StaticCanvasProps = {
  dimensions: Dimensions;
  prefilledBoard: Nullable<Board>;
};

export const StaticCanvas: FC<StaticCanvasProps> = ({ dimensions, prefilledBoard }) => {
  const { canvas, clear, context } = useCanvas();

  const drawGrid = useGridDrawing(context, dimensions);
  const drawPrefilledBoard = useBoardDrawing({ context, dimensions, drawBoardVariant: 'prefilled' });

  useEffect(() => {
    clear();
    drawGrid();
    drawPrefilledBoard(prefilledBoard);
  }, [clear, dimensions, drawGrid, drawPrefilledBoard, prefilledBoard]);

  return canvas;
};
