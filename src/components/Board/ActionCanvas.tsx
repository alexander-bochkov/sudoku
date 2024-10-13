import { useCanvas } from './hooks/use-canvas';
import { useActionDrawing } from './hooks/use-action-drawing';
import type { FC } from 'react';
import type { Board, Cell, Dimensions } from 'types/board';
import type { Nullable } from 'types/utility-types';

type ActionCanvasProps = {
  className?: string;
  dimensions: Dimensions;
  prefilledBoard: Nullable<Board>;
  selectedCell: Nullable<Cell>;
  setSelectedCell: (cell: Nullable<Cell>) => void;
};

export const ActionCanvas: FC<ActionCanvasProps> = ({
  className,
  dimensions,
  prefilledBoard,
  selectedCell,
  setSelectedCell,
}) => {
  const { canvasRef, clear, context } = useCanvas();

  useActionDrawing({ clear, context, dimensions, prefilledBoard, selectedCell, setSelectedCell });

  return <canvas className={className} height={dimensions.board} ref={canvasRef} width={dimensions.board}></canvas>;
};
