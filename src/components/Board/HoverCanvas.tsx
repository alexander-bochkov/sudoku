import { useCanvas } from './hooks/use-canvas';
import { useHoverDrawing } from './hooks/use-hover-drawing';
import type { FC } from 'react';
import type { Board, Dimensions } from 'types/board';
import type { Nullable } from 'types/utility-types';

type HoverCanvasProps = {
  className?: string;
  dimensions: Dimensions;
  prefilledBoard: Nullable<Board>;
};

export const HoverCanvas: FC<HoverCanvasProps> = ({ className, dimensions, prefilledBoard }) => {
  const { canvasRef, clear, context } = useCanvas();

  useHoverDrawing({ clear, context, dimensions, prefilledBoard });

  return <canvas className={className} height={dimensions.board} ref={canvasRef} width={dimensions.board}></canvas>;
};
