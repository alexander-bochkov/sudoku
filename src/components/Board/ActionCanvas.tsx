import { useCanvas } from './hooks/use-canvas';
import { useActionDrawing } from './hooks/use-action-drawing';
import type { FC } from 'react';
import type { Board_OLD, Cell_OLD, Dimensions } from 'types/board';
import type { Nullable } from 'types/utility-types';

interface ActionCanvasProps {
  dimensions: Dimensions;
  prefilledBoard: Nullable<Board_OLD>;
  selectedCell: Nullable<Cell_OLD>;
  setSelectedCell: (cell: Nullable<Cell_OLD>) => void;
}

export const ActionCanvas: FC<ActionCanvasProps> = ({ dimensions, prefilledBoard, selectedCell, setSelectedCell }) => {
  const { canvas, clear, context } = useCanvas();

  useActionDrawing({ clear, context, dimensions, prefilledBoard, selectedCell, setSelectedCell });

  return canvas;
};
