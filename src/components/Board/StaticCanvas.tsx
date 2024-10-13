import { useEffect } from 'react';
import { useBoardDrawing } from './hooks/use-board-drawing';
import { useCanvas } from './hooks/use-canvas';
import { useGridDrawing } from './hooks/use-grid-drawing';
import type { FC } from 'react';
import type { Board, Dimensions } from 'types/board';
import type { Nullable } from 'types/utility-types';

type StaticCanvasProps = {
  className?: string;
  dimensions: Dimensions;
  prefilledBoard: Nullable<Board>;
};

export const StaticCanvas: FC<StaticCanvasProps> = ({ className, dimensions, prefilledBoard }) => {
  const { canvasRef, clear, context } = useCanvas();

  const drawGrid = useGridDrawing(context, dimensions);
  const drawPrefilledBoard = useBoardDrawing({ boardVariant: 'prefilled', context, dimensions });

  useEffect(() => {
    clear();
    drawGrid();
    drawPrefilledBoard(prefilledBoard);
  }, [clear, dimensions, drawGrid, drawPrefilledBoard, prefilledBoard]);

  return <canvas className={className} height={dimensions.board} ref={canvasRef} width={dimensions.board}></canvas>;
};
