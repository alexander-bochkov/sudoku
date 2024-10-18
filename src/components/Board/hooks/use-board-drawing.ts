import { useCallback, useEffect, useState } from 'react';
import { forEachCell } from 'utils/board';
import itim from 'assets/fonts/Itim.ttf';
import { cellIndexToCellCoordinate, getNumberOffsetY } from '../utils';
import { NUMBER_COLOR } from '../constants';
import type { Board, Cell, Dimensions } from 'types/board';
import type { Nullable } from 'types/utility-types';
import type { Coordinates, DrawBoardVariant } from '../types';

export const useBoardDrawing = ({
  context,
  dimensions,
  drawBoardVariant,
  errors,
}: {
  context: Nullable<CanvasRenderingContext2D>;
  dimensions: Dimensions;
  drawBoardVariant: DrawBoardVariant;
  errors?: Nullable<Array<Cell>>;
}) => {
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
    (coordinates: Coordinates, number: number, isError?: boolean) => {
      if (!context || !fontLoaded) return;

      const [x, y] = coordinates;

      context.fillStyle = NUMBER_COLOR[isError ? 'error' : drawBoardVariant];
      context.font = `${dimensions.cell}px Itim, sans-serif`;
      context.textAlign = 'center';
      context.textBaseline = 'middle';
      context.fillText(String(number), x, y);
    },
    [drawBoardVariant, context, dimensions.cell, fontLoaded],
  );

  const getNumberCoordinates = useCallback(
    (columnIndex: number, rowIndex: number): Coordinates => {
      const numberOffset = dimensions.cell / 2;

      const x = cellIndexToCellCoordinate(columnIndex, dimensions) + numberOffset;
      const y = cellIndexToCellCoordinate(rowIndex, dimensions) + numberOffset + getNumberOffsetY();

      return [x, y];
    },
    [dimensions],
  );

  const draw = useCallback(
    (board: Nullable<Board>) => {
      if (!board) return;

      forEachCell(board, ({ columnIndex, rowIndex }, value) => {
        if (!value) return;

        const isError =
          drawBoardVariant === 'solution' &&
          errors?.some((error) => error.columnIndex === columnIndex && error.rowIndex === rowIndex);

        drawNumber(getNumberCoordinates(columnIndex, rowIndex), value, isError);
      });
    },
    [drawBoardVariant, drawNumber, errors, getNumberCoordinates],
  );

  return draw;
};
