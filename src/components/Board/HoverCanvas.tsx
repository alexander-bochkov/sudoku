import { useCanvas } from './hooks/use-canvas';
import { useHoverDrawing } from './hooks/use-hover-drawing';
import type { FC } from 'react';
import type { Dimensions } from 'types/board';

type HoverCanvasProps = {
  className?: string;
  dimensions: Dimensions;
};

export const HoverCanvas: FC<HoverCanvasProps> = ({ className, dimensions }) => {
  const { canvasRef, clear, context } = useCanvas();

  useHoverDrawing(context, dimensions, clear);

  return <canvas className={className} height={dimensions.board} ref={canvasRef} width={dimensions.board}></canvas>;
};
