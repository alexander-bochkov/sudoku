import { CELLS_IN_ZONE, START_NUMBER, ZONES } from './constants';
import type { BoardMatrix } from '../../types';

const getCellIdxInZone = (cellIdx: number, zoneIdx: number) => cellIdx - CELLS_IN_ZONE * zoneIdx;

const getZoneIdx = (cellIdx: number) => Math.floor(cellIdx / CELLS_IN_ZONE);

export const generateTemplateMatrix = () => {
  const emptyMartix = Array.from({ length: 9 }, () => new Array<null>(9).fill(null));

  const templateMatrix = emptyMartix.map((row, rowIdx) =>
    row.map((_, cellIdx) => {
      const zoneOffset = rowIdx % ZONES;
      const zoneCurrentIdx = getZoneIdx(cellIdx);
      const zoneTargetIdx = (zoneCurrentIdx + zoneOffset) % ZONES;

      const cellOffset = getZoneIdx(rowIdx);
      const cellCurrentIdxInZone = getCellIdxInZone(cellIdx, zoneCurrentIdx);
      const cellTargetIdxInZone = (cellCurrentIdxInZone + cellOffset) % CELLS_IN_ZONE;

      return START_NUMBER + cellTargetIdxInZone + zoneTargetIdx * CELLS_IN_ZONE;
    }),
  ) as BoardMatrix;

  return templateMatrix;
};
