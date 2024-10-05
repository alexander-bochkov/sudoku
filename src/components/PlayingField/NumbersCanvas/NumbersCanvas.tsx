import { useRef } from 'react';
import type { FC } from 'react';
import type { Dimensions } from '../types';

type NumbersCanvasProps = {
  className?: string;
  dimensions: Dimensions;
};

export const NumbersCanvas: FC<NumbersCanvasProps> = ({ className, dimensions }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  return <canvas className={className} height={dimensions.field} ref={canvasRef} width={dimensions.field}></canvas>;
};
