import { CELLS_IN_ZONE_ON_AXIS, ZONES_ON_AXIS } from 'constants/board';
import type { CSSProperties } from 'react';
import type { Board, Cell, Dimensions } from 'types/board';
import type { Nullable } from 'types/utility-types';

export const forEachCell = (board: Board, callback: (cell: Cell, value: Nullable<number>) => void): void => {
  board.forEach((row, rowIndex) => {
    row.forEach((value, columnIndex) => {
      callback({ columnIndex, rowIndex }, value);
    });
  });
};

export const getGridLinesQuantity = (): number => ZONES_ON_AXIS - 1;
export const getSubgridLinesQuantity = (): number => CELLS_IN_ZONE_ON_AXIS - 1;

export const getIndexInZone = (elementIndex: number, elementsInZone: number, zoneIndex: number): number =>
  elementIndex - elementsInZone * zoneIndex;

export const getZoneIndex = (elementIndex: number, elementsInZone: number): number =>
  parseInt(String(elementIndex / elementsInZone));

export const getStyleFromDimensions = ({ board, cell }: Dimensions): CSSProperties => ({
  borderRadius: cell / 2,
  height: board,
  width: board,
});
