import { useCanvas } from './hooks/use-canvas';
import { useActionDrawing } from './hooks/use-action-drawing';
import type { FC } from 'react';
import type { Board, Dimensions } from 'types/board';
import type { Nullable } from 'types/utility-types';

type ActionCanvasProps = {
  className?: string;
  dimensions: Dimensions;
  prefilledBoard: Nullable<Board>;
};

export const ActionCanvas: FC<ActionCanvasProps> = ({ className, dimensions, prefilledBoard }) => {
  const { canvasRef, clear, context } = useCanvas();

  useActionDrawing({ clear, context, dimensions, prefilledBoard });

  return <canvas className={className} height={dimensions.board} ref={canvasRef} width={dimensions.board}></canvas>;
};
