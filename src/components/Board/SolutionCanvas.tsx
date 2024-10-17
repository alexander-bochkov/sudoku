import { useEffect } from 'react';
import { useBoardDrawing } from './hooks/use-board-drawing';
import { useCanvas } from './hooks/use-canvas';

import type { FC } from 'react';
import type { Board, Cell, Dimensions } from 'types/board';
import type { Nullable } from 'types/utility-types';

type SolutionCanvasProps = {
  className?: string;
  dimensions: Dimensions;
  errors: Nullable<Array<Cell>>;
  solutionBoard: Nullable<Board>;
};

export const SolutionCanvas: FC<SolutionCanvasProps> = ({ className, dimensions, errors, solutionBoard }) => {
  const { canvasRef, clear, context } = useCanvas();

  const drawSolutionBoard = useBoardDrawing({ context, dimensions, drawBoardVariant: 'solution', errors });

  useEffect(() => {
    clear();
    drawSolutionBoard(solutionBoard);
  }, [clear, drawSolutionBoard, solutionBoard]);

  return (
    <canvas
      className={className}
      height={dimensions.board * Math.ceil(window.devicePixelRatio)}
      ref={canvasRef}
      width={dimensions.board * Math.ceil(window.devicePixelRatio)}
    ></canvas>
  );
};
