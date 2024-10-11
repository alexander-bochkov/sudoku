import { useEffect } from 'react';
import { useBoardDrawing } from './hooks/use-board-drawing';
import { useCanvas } from './hooks/use-canvas';

import type { FC } from 'react';
import type { Board, Dimensions } from 'types/board';
import type { Nullable } from 'types/utility-types';

type SolutionCanvasProps = {
  className?: string;
  dimensions: Dimensions;
  errorsBoard: Nullable<Board>;
  solutionBoard: Nullable<Board>;
};

export const SolutionCanvas: FC<SolutionCanvasProps> = ({ className, dimensions, errorsBoard, solutionBoard }) => {
  const { canvasRef, clear, context } = useCanvas();

  const drawErrorsBoard = useBoardDrawing(context, dimensions, 'errors');
  const drawSolutionBoard = useBoardDrawing(context, dimensions, 'solution');

  useEffect(() => {
    clear();
    drawErrorsBoard(errorsBoard);
    drawSolutionBoard(solutionBoard);
  }, [clear, drawErrorsBoard, drawSolutionBoard, errorsBoard, solutionBoard]);

  return <canvas className={className} height={dimensions.board} ref={canvasRef} width={dimensions.board}></canvas>;
};
