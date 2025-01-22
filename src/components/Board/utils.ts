import { getIndexInZone, getZoneIndex } from 'utils/board';
import { isSafari } from 'utils/browser';
import { CELLS_IN_ZONE_ON_AXIS, GRID_LINE_THICKNESS, SUBGRID_LINE_THICKNESS } from 'constants/board';
import { NUMBER_OFFSET_Y } from './constants';
import type { Dimensions } from 'types/board';

export const cellIndexToCellCoordinate = (cellIndex: number, dimensions: Dimensions): number => {
  const zoneIndex = getZoneIndex(cellIndex, CELLS_IN_ZONE_ON_AXIS);
  const cellIndexInZone = getIndexInZone(cellIndex, CELLS_IN_ZONE_ON_AXIS, zoneIndex);

  const zoneOffset = dimensions.zone * zoneIndex;
  const cellOffset = dimensions.cell * cellIndexInZone;

  const gridLineOffset = GRID_LINE_THICKNESS * zoneIndex;
  const subgridLineOffset = SUBGRID_LINE_THICKNESS * cellIndexInZone;

  return zoneOffset + cellOffset + gridLineOffset + subgridLineOffset;
};

export const coordinateToCellIndex = (coordinate: number, dimensions: Dimensions, cellIndex = 0): number => {
  if (coordinate < dimensions.cell) return cellIndex;

  const cellCoordinate = cellIndexToCellCoordinate(cellIndex, dimensions);
  return coordinate > cellCoordinate ? coordinateToCellIndex(coordinate, dimensions, ++cellIndex) : --cellIndex;
};

export const getNumberOffsetY = () => (isSafari() ? -NUMBER_OFFSET_Y : NUMBER_OFFSET_Y);
