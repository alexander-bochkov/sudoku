import { useCallback, useEffect, useState } from 'react';
import itim from 'assets/fonts/Itim.ttf';
import { cellIndexToCellCoordinate } from '../utils';
import { NUMBER_COLOR, NUMBER_OFFSET_Y } from '../constants';
import type { Board, BoardVariant, Dimensions } from 'types/board';
import type { Nullable } from 'types/utility-types';
import type { Coordinates } from '../types';

export const useBoardDrawing = (
  context: Nullable<CanvasRenderingContext2D>,
  dimensions: Dimensions,
  boardVariant: Exclude<BoardVariant, 'full'>,
) => {
  const [fontLoaded, setFontLoaded] = useState(false);

  const loadFont = async () => {
    const font = new FontFace('Itim', `url(${itim})`);
    await font.load();

    setFontLoaded(true);
  };

  useEffect(() => {
    loadFont();
  }, []);

  const drawNumber = useCallback(
    (coordinates: Coordinates, number: number) => {
      if (!context || !fontLoaded) return;

      const [x, y] = coordinates;

      context.fillStyle = NUMBER_COLOR[boardVariant];
      context.font = `${dimensions.cell}px Itim, sans-serif`;
      context.textAlign = 'center';
      context.textBaseline = 'middle';
      context.fillText(String(number), x, y);
    },
    [boardVariant, context, dimensions.cell, fontLoaded],
  );

  const getNumberCoordinates = useCallback(
    (columnIndex: number, rowIndex: number): Coordinates => {
      const numberOffset = dimensions.cell / 2;

      const x = cellIndexToCellCoordinate(columnIndex, dimensions) + numberOffset;
      const y = cellIndexToCellCoordinate(rowIndex, dimensions) + numberOffset + NUMBER_OFFSET_Y;

      return [x, y];
    },
    [dimensions],
  );

  const drawBoard = useCallback(
    (row: Nullable<number>[], rowIndex: number) => {
      row.forEach((number, columnIndex) => {
        if (!number) return;

        drawNumber(getNumberCoordinates(columnIndex, rowIndex), number);
      });
    },
    [drawNumber, getNumberCoordinates],
  );

  const draw = useCallback(
    (board: Nullable<Board>) => {
      board?.forEach(drawBoard);
    },
    [drawBoard],
  );

  return draw;
};
