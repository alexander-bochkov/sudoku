import { useCallback } from 'react';
import { getGridLinesQuantity, getIndexInZone, getSubgridLinesQuantity, getZoneIndex } from 'utils/board';
import { GRID_LINE_THICKNESS, SUBGRID_LINE_THICKNESS, ZONES_ON_AXIS } from 'constants/board';
import { GRID_LINE_COLOR, SUBGRID_LINE_COLOR } from '../constants';
import type { Dimensions } from 'types/board';
import type { Nullable } from 'types/utility-types';
import type { Coordinates, Direction } from '../types';

export const useGridDrawing = (context: Nullable<CanvasRenderingContext2D>, dimensions: Dimensions) => {
  const drawLine = useCallback(
    ({
      color,
      coordinates,
      direction,
      thickness,
    }: {
      color: string;
      coordinates: Coordinates;
      direction: Direction;
      thickness: number;
    }) => {
      if (!context) return;

      const [x, y] = coordinates;
      const w = direction === 'vertical' ? thickness : dimensions.board;
      const h = direction === 'vertical' ? dimensions.board : thickness;

      context.beginPath();
      context.fillStyle = color;
      context.rect(x, y, w, h);
      context.fill();
    },
    [context, dimensions.board],
  );

  const getSubgridLineCoordinates = useCallback(
    (direction: Direction, lineIndex: number): Coordinates => {
      const lines = getSubgridLinesQuantity();
      const zoneIndex = getZoneIndex(lineIndex, lines);
      const lineIndexInZone = getIndexInZone(lineIndex, lines, zoneIndex);
      const cellIndexInZone = lineIndexInZone + 1;

      const zoneOffset = dimensions.zone * zoneIndex;
      const cellOffset = dimensions.cell * cellIndexInZone;

      const gridLineOffset = GRID_LINE_THICKNESS * zoneIndex;
      const subgridLineOffset = SUBGRID_LINE_THICKNESS * lineIndexInZone;

      const offset = zoneOffset + cellOffset + gridLineOffset + subgridLineOffset;

      const x = direction === 'vertical' ? offset : 0;
      const y = direction === 'vertical' ? 0 : offset;

      return [x, y];
    },
    [dimensions.cell, dimensions.zone],
  );

  const drawSubgrid = useCallback(
    (direction: Direction, lineIndex = 0) => {
      const lines = ZONES_ON_AXIS * getSubgridLinesQuantity();
      if (lineIndex === lines) return;

      drawLine({
        color: SUBGRID_LINE_COLOR,
        coordinates: getSubgridLineCoordinates(direction, lineIndex),
        direction,
        thickness: SUBGRID_LINE_THICKNESS,
      });

      drawSubgrid(direction, ++lineIndex);
    },
    [drawLine, getSubgridLineCoordinates],
  );

  const getGridLineCoordinates = useCallback(
    (direction: Direction, lineIndex: number): Coordinates => {
      const zoneIndex = lineIndex + 1;
      const zoneOffset = dimensions.zone * zoneIndex;

      const gridLineOffset = GRID_LINE_THICKNESS * lineIndex;

      const offset = zoneOffset + gridLineOffset;

      const x = direction === 'vertical' ? offset : 0;
      const y = direction === 'vertical' ? 0 : offset;

      return [x, y];
    },
    [dimensions.zone],
  );

  const drawGrid = useCallback(
    (direction: Direction, lineIndex = 0) => {
      if (lineIndex === getGridLinesQuantity()) return;

      drawLine({
        color: GRID_LINE_COLOR,
        coordinates: getGridLineCoordinates(direction, lineIndex),
        direction,
        thickness: GRID_LINE_THICKNESS,
      });

      drawGrid(direction, ++lineIndex);
    },
    [getGridLineCoordinates, drawLine],
  );

  const draw = useCallback(() => {
    drawSubgrid('horizontal');
    drawSubgrid('vertical');

    drawGrid('horizontal');
    drawGrid('vertical');
  }, [drawGrid, drawSubgrid]);

  return draw;
};
