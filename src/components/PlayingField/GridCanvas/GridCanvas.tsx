import { useRef } from 'react';
import type { FC } from 'react';
import type { Dimensions } from '../types';

type GridCanvasProps = {
  className?: string;
  dimensions: Dimensions;
};

export const GridCanvas: FC<GridCanvasProps> = ({ className, dimensions }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  return <canvas className={className} height={dimensions.field} ref={canvasRef} width={dimensions.field}></canvas>;
};
