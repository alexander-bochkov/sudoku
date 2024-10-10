import { useCallback, useEffect, useState } from 'react';
import { cellIndexToCellCoordinate, coordinateToCellIndex } from '../utils';
import { CELL_HOVER_COLOR } from '../constants';
import type { Board, Cell, Dimensions } from 'types/board';
import type { Nullable } from 'types/utility-types';
import type { Coordinates } from '../types';

export const useHoverDrawing = ({
  clear,
  context,
  dimensions,
  prefilledBoard,
}: {
  clear: () => void;
  context: Nullable<CanvasRenderingContext2D>;
  dimensions: Dimensions;
  prefilledBoard: Nullable<Board>;
}) => {
  const [hoveredCell, setHoveredCell] = useState<Nullable<Cell>>(null);

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

  const removeHover = useCallback(() => {
    clear();
    setHoveredCell(null);
  }, [clear]);

  const isHoveredCell = useCallback(
    (columnIndex: number, rowIndex: number) =>
      hoveredCell && hoveredCell.columnIndex === columnIndex && hoveredCell.rowIndex === rowIndex,
    [hoveredCell],
  );

  useEffect(() => {
    const handleMouseMove = ({ offsetX, offsetY }: MouseEvent) => {
      const columnIndex = coordinateToCellIndex(offsetX, dimensions);
      const rowIndex = coordinateToCellIndex(offsetY, dimensions);

      if (isHoveredCell(columnIndex, rowIndex)) return;

      const withPrefilledNumber = Boolean(prefilledBoard?.[rowIndex][columnIndex]);

      if (withPrefilledNumber) {
        removeHover();
        return;
      }

      const x = cellIndexToCellCoordinate(columnIndex, dimensions);
      const y = cellIndexToCellCoordinate(rowIndex, dimensions);

      clear();
      drawHover([x, y]);

      setHoveredCell({ columnIndex, rowIndex });
    };

    const handleMouseLeave = () => {
      removeHover();
    };

    context?.canvas.addEventListener('mousemove', handleMouseMove);
    context?.canvas.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      context?.canvas.removeEventListener('mousemove', handleMouseMove);
      context?.canvas.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [hoveredCell, clear, context?.canvas, dimensions, drawHover, prefilledBoard, removeHover, isHoveredCell]);
};
