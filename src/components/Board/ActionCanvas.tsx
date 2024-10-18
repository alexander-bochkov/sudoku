import { useCanvas } from './hooks/use-canvas';
import { useActionDrawing } from './hooks/use-action-drawing';
import type { FC } from 'react';
import type { Board, Cell, Dimensions } from 'types/board';
import type { Nullable } from 'types/utility-types';

type ActionCanvasProps = {
  dimensions: Dimensions;
  prefilledBoard: Nullable<Board>;
  selectedCell: Nullable<Cell>;
  setSelectedCell: (cell: Nullable<Cell>) => void;
};

export const ActionCanvas: FC<ActionCanvasProps> = ({ dimensions, prefilledBoard, selectedCell, setSelectedCell }) => {
  const { canvas, clear, context } = useCanvas();

  useActionDrawing({ clear, context, dimensions, prefilledBoard, selectedCell, setSelectedCell });

  return canvas;
};
