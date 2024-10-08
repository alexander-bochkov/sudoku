import { useCallback, useEffect, useState } from 'react';
import { GRID, NUMBER_OFFSET_Y, PLAYING_FIELD, SUBGRID } from '../constants';
import itim from 'assets/fonts/Itim.ttf';
import type { RefObject } from 'react';
import type { Dimensions, Sudoku } from 'types/playing-field';
import type { Coords } from '../types';

export const useNumbersDrawing = (canvasRef: RefObject<HTMLCanvasElement>, dimensions: Dimensions, sudoku: Sudoku) => {
  const [context, setContext] = useState<CanvasRenderingContext2D>();
  const [fontLoaded, setFontLoaded] = useState(false);

  const loadFont = async () => {
    const font = new FontFace('Itim', `url(${itim})`);
    await font.load();

    setFontLoaded(true);
  };

  const clearField = useCallback(() => {
    if (!context) return;

    context.clearRect(0, 0, dimensions.field, dimensions.field);
  }, [context, dimensions.field]);

  const drawNumber = useCallback(
    (coords: Coords, number: number = 0) => {
      if (!context) return;

      const [x, y] = coords;

      context.fillStyle = PLAYING_FIELD.NUMBERS_COLOR;
      context.font = `${dimensions.cell}px Itim, sans-serif`;
      context.textAlign = 'center';
      context.textBaseline = 'middle';

      context.fillText(number ? String(number) : '', x, y);
    },
    [context, dimensions.cell],
  );

  const calculateCoordY = useCallback(
    (rowIdx: number): number => {
      const cellsInOneGroup = PLAYING_FIELD.CELLS_ON_AXIS / PLAYING_FIELD.GROUPS_ON_AXIS;

      const groupIdx = parseInt(String(rowIdx / cellsInOneGroup));
      const cellIdx = rowIdx - cellsInOneGroup * groupIdx;

      const defaultOffset = dimensions.cell / 2;

      const groupsOffset = dimensions.group * groupIdx;
      const cellsOffset = dimensions.cell * cellIdx;

      const gridLinesOffset = GRID.THICKNESS * groupIdx;
      const subgridLinesIdx = SUBGRID.THICKNESS * cellIdx;

      return defaultOffset + groupsOffset + cellsOffset + gridLinesOffset + subgridLinesIdx + NUMBER_OFFSET_Y;
    },
    [dimensions.cell, dimensions.group],
  );

  const calculateCoordX = useCallback(
    (columnIdx: number): number => {
      const cellsInOneGroup = PLAYING_FIELD.CELLS_ON_AXIS / PLAYING_FIELD.GROUPS_ON_AXIS;

      const groupIdx = parseInt(String(columnIdx / cellsInOneGroup));
      const cellIdx = columnIdx - cellsInOneGroup * groupIdx;

      const defaultOffset = dimensions.cell / 2;

      const groupsOffset = dimensions.group * groupIdx;
      const cellsOffset = dimensions.cell * cellIdx;

      const gridLinesOffset = GRID.THICKNESS * groupIdx;
      const subgridLinesIdx = SUBGRID.THICKNESS * cellIdx;

      return defaultOffset + groupsOffset + cellsOffset + gridLinesOffset + subgridLinesIdx;
    },
    [dimensions.cell, dimensions.group],
  );

  const drawRows = useCallback(
    (row: Array<number | undefined>, rowIdx: number) => {
      row.forEach((number, columnIdx) => {
        const x = calculateCoordX(columnIdx);
        const y = calculateCoordY(rowIdx);

        drawNumber([x, y], number);
      });
    },
    [calculateCoordX, calculateCoordY, drawNumber],
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');

    if (context) {
      setContext(context);
    }

    loadFont();
  }, [canvasRef]);

  useEffect(() => {
    if (!fontLoaded) return;

    clearField();

    sudoku.forEach(drawRows);
  }, [clearField, drawRows, fontLoaded, sudoku]);
};
