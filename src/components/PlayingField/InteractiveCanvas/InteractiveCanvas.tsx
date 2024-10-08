import { useRef } from 'react';
import { useInteractionDrawing } from '../hooks';
import type { FC } from 'react';
import type { Dimensions } from 'types/playing-field';

type InteractiveCanvasProps = {
  className?: string;
  dimensions: Dimensions;
};

export const InteractiveCanvas: FC<InteractiveCanvasProps> = ({ className, dimensions }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useInteractionDrawing(canvasRef, dimensions);

  return <canvas className={className} height={dimensions.field} ref={canvasRef} width={dimensions.field}></canvas>;
};
