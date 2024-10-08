import { useCallback, useEffect, useState } from 'react';
import { PLAYING_FIELD, GRID, SUBGRID } from '../constants';
import type { RefObject } from 'react';
import type { Dimensions } from 'types/playing-field';
import { Coords } from '../types';

export const useInteractionDrawing = (canvasRef: RefObject<HTMLCanvasElement>, dimensions: Dimensions) => {
  const [context, setContext] = useState<CanvasRenderingContext2D>();
  const [cellCoords, setCellCoords] = useState<Coords | null>(null);

  const clearField = useCallback(() => {
    if (!context) return;

    context.clearRect(0, 0, dimensions.field, dimensions.field);
  }, [context, dimensions.field]);

  const drawCell = useCallback(
    (color: string, coords: Coords) => {
      if (!context) return;

      const [x, y] = coords;
      const w = dimensions.cell;
      const h = dimensions.cell;

      context.beginPath();
      context.fillStyle = color;
      context.rect(x, y, w, h);
      context.fill();
    },
    [context, dimensions.cell],
  );

  const calculateDrawCoords = useCallback(
    (cell: Coords): Coords => {
      const [x, y] = cell;

      const cellsInOneGroup = PLAYING_FIELD.CELLS_ON_AXIS / PLAYING_FIELD.GROUPS_ON_AXIS;

      const groupIdxX = parseInt(String(x / cellsInOneGroup));
      const cellIdxX = x - cellsInOneGroup * groupIdxX;

      const groupsDimensionX = dimensions.group * groupIdxX;
      const cellsDimensionX = dimensions.cell * cellIdxX;

      const gridLinesDimensionX = GRID.THICKNESS * groupIdxX;
      const subgridDimensionX = SUBGRID.THICKNESS * cellIdxX;

      const totalX = groupsDimensionX + cellsDimensionX + gridLinesDimensionX + subgridDimensionX;

      const groupIdxY = parseInt(String(y / cellsInOneGroup));
      const cellIdxY = y - cellsInOneGroup * groupIdxY;

      const groupsDimensionY = dimensions.group * groupIdxY;
      const cellsDimensionY = dimensions.cell * cellIdxY;

      const gridLinesDimensionY = GRID.THICKNESS * groupIdxY;
      const subgridDimensionY = SUBGRID.THICKNESS * cellIdxY;

      const totalY = groupsDimensionY + cellsDimensionY + gridLinesDimensionY + subgridDimensionY;

      return [totalX, totalY];
    },
    [dimensions.cell, dimensions.group],
  );

  useEffect(() => {
    clearField();

    if (cellCoords) {
      const coord = calculateDrawCoords(cellCoords);
      drawCell(PLAYING_FIELD.HOVER_CELL_COLOR, coord);
    }
  }, [calculateDrawCoords, cellCoords, clearField, drawCell]);

  const getIdxX = useCallback(
    (x: number, columnIdx = 0): number => {
      if (x === -1) return columnIdx;

      const cellsInOneGroup = PLAYING_FIELD.CELLS_ON_AXIS / PLAYING_FIELD.GROUPS_ON_AXIS;

      const groupIdx = parseInt(String(columnIdx / cellsInOneGroup));
      const cellIdx = columnIdx - cellsInOneGroup * groupIdx;

      const groupsDimension = dimensions.group * groupIdx;
      const cellsDimension = dimensions.cell * cellIdx;

      const gridLinesDimension = GRID.THICKNESS * groupIdx;
      const subgridDimension = SUBGRID.THICKNESS * cellIdx;

      const total = groupsDimension + cellsDimension + gridLinesDimension + subgridDimension;

      return x > total ? getIdxX(x, ++columnIdx) : --columnIdx;
    },
    [dimensions.cell, dimensions.group],
  );

  const getIdxY = useCallback(
    (y: number, rowIdx = 1): number => {
      const cellsInOneGroup = PLAYING_FIELD.CELLS_ON_AXIS / PLAYING_FIELD.GROUPS_ON_AXIS;

      const groupIdx = parseInt(String(rowIdx / cellsInOneGroup));
      const cellIdx = rowIdx - cellsInOneGroup * groupIdx;

      const groupsDimension = dimensions.group * groupIdx;
      const cellsDimension = dimensions.cell * cellIdx;

      const gridLinesDimension = GRID.THICKNESS * groupIdx;
      const subgridDimension = SUBGRID.THICKNESS * cellIdx;

      const total = groupsDimension + cellsDimension + gridLinesDimension + subgridDimension;

      return y > total ? getIdxY(y, ++rowIdx) : --rowIdx;
    },
    [dimensions.cell, dimensions.group],
  );

  const coordsToCellIdx = useCallback(
    (coords: Coords): Coords => {
      const [x, y] = coords;
      const idxX = getIdxX(x);
      const idxY = getIdxY(y);

      return [idxX, idxY];
    },
    [getIdxX, getIdxY],
  );

  useEffect(() => {
    const handleMouseMove = ({ offsetX, offsetY }: MouseEvent) => {
      const coords = coordsToCellIdx([offsetX, offsetY]);

      if (cellCoords && cellCoords[0] === coords[0] && cellCoords[1] === coords[1]) return;

      setCellCoords(coords);
    };

    const handleMouseLeave = () => {
      setCellCoords(null);
    };

    const canvas = canvasRef.current;

    canvas?.addEventListener('mousemove', handleMouseMove);
    canvas?.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      canvas?.removeEventListener('mousemove', handleMouseMove);
      canvas?.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [canvasRef, cellCoords, coordsToCellIdx]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');

    if (context) {
      setContext(context);
    }
  }, [canvasRef]);
};
