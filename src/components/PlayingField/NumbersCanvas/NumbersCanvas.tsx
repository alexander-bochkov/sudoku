import { useRef } from 'react';
import { useNumbersDrawing } from '../hooks';
import type { FC } from 'react';
import type { Dimensions, Sudoku } from 'types/playing-field';

type NumbersCanvasProps = {
  className?: string;
  dimensions: Dimensions;
  sudoku: Sudoku;
};

export const NumbersCanvas: FC<NumbersCanvasProps> = ({ className, dimensions, sudoku }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useNumbersDrawing(canvasRef, dimensions, sudoku);

  return <canvas className={className} height={dimensions.field} ref={canvasRef} width={dimensions.field}></canvas>;
};
