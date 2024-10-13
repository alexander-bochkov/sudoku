import { useEffect } from 'react';
import { useBoardDrawing } from './hooks/use-board-drawing';
import { useCanvas } from './hooks/use-canvas';

import type { FC } from 'react';
import type { Board, Cell, Dimensions } from 'types/board';
import type { Nullable } from 'types/utility-types';

type SolutionCanvasProps = {
  className?: string;
  dimensions: Dimensions;
  errors: Array<Cell>;
  solutionBoard: Nullable<Board>;
};

export const SolutionCanvas: FC<SolutionCanvasProps> = ({ className, dimensions, errors, solutionBoard }) => {
  const { canvasRef, clear, context } = useCanvas();

  const drawSolutionBoard = useBoardDrawing({ boardVariant: 'solution', context, dimensions, errors });

  useEffect(() => {
    clear();
    drawSolutionBoard(solutionBoard);
  }, [clear, drawSolutionBoard, solutionBoard]);

  return <canvas className={className} height={dimensions.board} ref={canvasRef} width={dimensions.board}></canvas>;
};
