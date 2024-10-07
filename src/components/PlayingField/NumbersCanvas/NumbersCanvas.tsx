import { useRef } from 'react';
import { useNumbersDrawing } from '../hooks';
import type { FC } from 'react';
import type { Dimensions } from 'types/playing-field';

type NumbersCanvasProps = {
  className?: string;
  dimensions: Dimensions;
};

export const NumbersCanvas: FC<NumbersCanvasProps> = ({ className, dimensions }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useNumbersDrawing(canvasRef, dimensions);

  return <canvas className={className} height={dimensions.field} ref={canvasRef} width={dimensions.field}></canvas>;
};
