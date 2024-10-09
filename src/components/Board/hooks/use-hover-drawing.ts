import { useCallback, useEffect } from 'react';
import { cellIndexToCellCoordinate, coordinateToCellIndex } from '../utils';
import { CELL_HOVER_COLOR } from '../constants';
import type { Dimensions } from 'types/board';
import type { Nullable } from 'types/utility-types';
import type { Coordinates } from '../types';

export const useHoverDrawing = (
  context: Nullable<CanvasRenderingContext2D>,
  dimensions: Dimensions,
  clear: () => void,
) => {
  const drawHover = useCallback(
    (coordinates: Coordinates) => {
      if (!context) return;

      const [x, y] = coordinates;
      const w = dimensions.cell;
      const h = dimensions.cell;

      context.beginPath();
      context.fillStyle = CELL_HOVER_COLOR;
      context.rect(x, y, w, h);
      context.fill();
    },
    [context, dimensions.cell],
  );

  useEffect(() => {
    const handleMouseMove = ({ offsetX, offsetY }: MouseEvent) => {
      clear();

      const columnIndex = coordinateToCellIndex(offsetX, dimensions);
      const rowIndex = coordinateToCellIndex(offsetY, dimensions);

      const x = cellIndexToCellCoordinate(columnIndex, dimensions);
      const y = cellIndexToCellCoordinate(rowIndex, dimensions);

      drawHover([x, y]);
    };

    const handleMouseLeave = () => {
      clear();
    };

    context?.canvas.addEventListener('mousemove', handleMouseMove);
    context?.canvas.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      context?.canvas.removeEventListener('mousemove', handleMouseMove);
      context?.canvas.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [clear, context?.canvas, dimensions, drawHover]);
};
