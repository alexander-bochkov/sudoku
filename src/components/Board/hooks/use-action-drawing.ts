import { useCallback, useEffect, useState } from 'react';
import { cellIndexToCellCoordinate, coordinateToCellIndex } from '../utils';
import { CELL_HOVER_COLOR, CELL_SELECT_COLOR } from '../constants';
import type { Board, Cell, Dimensions } from 'types/board';
import type { Nullable } from 'types/utility-types';
import type { Coordinates } from '../types';

export const useActionDrawing = ({
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
  const [selectedCell, setSelectedCell] = useState<Nullable<Cell>>(null);

  const drawCell = useCallback(
    (coordinates: Coordinates, color: string) => {
      if (!context) return;

      const [x, y] = coordinates;
      const w = dimensions.cell;
      const h = dimensions.cell;

      context.beginPath();
      context.fillStyle = color;
      context.rect(x, y, w, h);
      context.fill();
    },
    [context, dimensions.cell],
  );

  const getCellCoordinates = useCallback(
    ({ columnIndex, rowIndex }: Cell): Coordinates => {
      const x = cellIndexToCellCoordinate(columnIndex, dimensions);
      const y = cellIndexToCellCoordinate(rowIndex, dimensions);
      return [x, y];
    },
    [dimensions],
  );

  const redraw = useCallback(() => {
    clear();

    if (hoveredCell) {
      drawCell(getCellCoordinates(hoveredCell), CELL_HOVER_COLOR);
    }

    if (selectedCell) {
      drawCell(getCellCoordinates(selectedCell), CELL_SELECT_COLOR);
    }
  }, [clear, drawCell, getCellCoordinates, hoveredCell, selectedCell]);

  useEffect(() => {
    redraw();
  }, [redraw]);

  const isCellWithPrefilledNumber = useCallback(
    ({ columnIndex, rowIndex }: Cell) => Boolean(prefilledBoard?.[rowIndex][columnIndex]),
    [prefilledBoard],
  );

  const isHoveredCell = useCallback(
    ({ columnIndex, rowIndex }: Cell) =>
      Boolean(hoveredCell && hoveredCell.columnIndex === columnIndex && hoveredCell.rowIndex === rowIndex),
    [hoveredCell],
  );

  const isSelectedCell = useCallback(
    ({ columnIndex, rowIndex }: Cell) =>
      Boolean(selectedCell && selectedCell.columnIndex === columnIndex && selectedCell.rowIndex === rowIndex),
    [selectedCell],
  );

  const getCell = useCallback(
    (coordinateX: number, coordinateY: number): Cell => {
      const columnIndex = coordinateToCellIndex(coordinateX, dimensions);
      const rowIndex = coordinateToCellIndex(coordinateY, dimensions);

      return { columnIndex, rowIndex };
    },
    [dimensions],
  );

  const handleCellHover = useCallback(
    ({ offsetX, offsetY }: MouseEvent) => {
      const cell = getCell(offsetX, offsetY);

      if (isHoveredCell(cell)) return;

      if (isCellWithPrefilledNumber(cell) || isSelectedCell(cell)) {
        setHoveredCell(null);
        return;
      }

      setHoveredCell(cell);
    },
    [getCell, isCellWithPrefilledNumber, isHoveredCell, isSelectedCell],
  );

  const handleCellSelect = useCallback(
    ({ offsetX, offsetY }: MouseEvent) => {
      const cell = getCell(offsetX, offsetY);

      if (isSelectedCell(cell)) {
        setSelectedCell(null);
        setHoveredCell(cell);
        return;
      }

      if (isCellWithPrefilledNumber(cell)) {
        setSelectedCell(null);
        return;
      }

      if (isHoveredCell(cell)) {
        setHoveredCell(null);
      }

      setSelectedCell(cell);
    },
    [getCell, isCellWithPrefilledNumber, isHoveredCell, isSelectedCell],
  );

  useEffect(() => {
    const handleMouseLeave = () => {
      setHoveredCell(null);
    };

    context?.canvas.addEventListener('click', handleCellSelect);
    context?.canvas.addEventListener('mouseleave', handleMouseLeave);
    context?.canvas.addEventListener('mousemove', handleCellHover);

    return () => {
      context?.canvas.removeEventListener('click', handleCellSelect);
      context?.canvas.removeEventListener('mouseleave', handleMouseLeave);
      context?.canvas.removeEventListener('mousemove', handleCellHover);
    };
  }, [context?.canvas, handleCellSelect, handleCellHover]);
};
