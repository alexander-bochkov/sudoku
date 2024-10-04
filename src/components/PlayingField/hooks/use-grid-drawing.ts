import { useCallback, useEffect, useState } from 'react';
import { PLAYING_FIELD, GRID, SUBGRID } from '../constants';
import type { RefObject } from 'react';
import type { Dimensions, LineCoords, LineDirection } from '../types';

export const useGridDrawing = (canvasRef: RefObject<HTMLCanvasElement>, dimensions: Dimensions) => {
  const [context, setContext] = useState<CanvasRenderingContext2D>();

  const clearField = useCallback(() => {
    if (!context) return;

    context.clearRect(0, 0, dimensions.field, dimensions.field);
  }, [context, dimensions.field]);

  const drawLine = useCallback(
    ({
      color,
      coords,
      direction,
      thickness,
    }: {
      color: string;
      coords: LineCoords;
      direction: LineDirection;
      thickness: number;
    }) => {
      if (!context) return;

      const [x, y] = coords;
      const w = direction === 'vertical' ? thickness : dimensions.field;
      const h = direction === 'vertical' ? dimensions.field : thickness;

      context.beginPath();
      context.fillStyle = color;
      context.rect(x, y, w, h);
      context.fill();
    },
    [context, dimensions.field],
  );

  const calculateSubgridLineCoords = useCallback(
    (direction: LineDirection, subgridLineIdx: number, groupIdx: number): LineCoords => {
      const groupsOffset = groupIdx * dimensions.group;

      const cellIdx = subgridLineIdx + 1;
      const cellsOffset = cellIdx * dimensions.cell;

      const gridLinesOffset = groupIdx * GRID.THICKNESS;
      const subgridLinesOffset = subgridLineIdx * SUBGRID.THICKNESS;

      const offset = groupsOffset + cellsOffset + gridLinesOffset + subgridLinesOffset;

      const x = direction === 'vertical' ? offset : 0;
      const y = direction === 'vertical' ? 0 : offset;

      return [x, y];
    },
    [dimensions.cell, dimensions.group],
  );

  const drawSubgrid = useCallback(
    (direction: LineDirection, subgridLineIdx = 0, groupIdx = 0) => {
      if (groupIdx === PLAYING_FIELD.GROUPS_ON_AXIS) return;

      drawLine({
        color: SUBGRID.COLOR,
        coords: calculateSubgridLineCoords(direction, subgridLineIdx, groupIdx),
        direction,
        thickness: SUBGRID.THICKNESS,
      });

      const nextSubgridLineIdx = ++subgridLineIdx;
      const shouldIncrementGroupIdx = nextSubgridLineIdx === SUBGRID.LINES;

      drawSubgrid(
        direction,
        shouldIncrementGroupIdx ? 0 : nextSubgridLineIdx,
        shouldIncrementGroupIdx ? ++groupIdx : groupIdx,
      );
    },
    [calculateSubgridLineCoords, drawLine],
  );

  const calculateGridLineCoords = useCallback(
    (direction: LineDirection, gridLineIdx: number): LineCoords => {
      const groupIdx = gridLineIdx + 1;
      const groupsOffset = groupIdx * dimensions.group;

      const gridLinesOffset = gridLineIdx * GRID.THICKNESS;

      const offset = groupsOffset + gridLinesOffset;

      const x = direction === 'vertical' ? offset : 0;
      const y = direction === 'vertical' ? 0 : offset;

      return [x, y];
    },
    [dimensions.group],
  );

  const drawGrid = useCallback(
    (direction: LineDirection, gridLineIdx = 0) => {
      if (gridLineIdx === GRID.LINES) return;

      drawLine({
        color: GRID.COLOR,
        coords: calculateGridLineCoords(direction, gridLineIdx),
        direction,
        thickness: GRID.THICKNESS,
      });

      drawGrid(direction, ++gridLineIdx);
    },
    [calculateGridLineCoords, drawLine],
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');

    if (context) {
      setContext(context);
    }
  }, [canvasRef]);

  useEffect(() => {
    clearField();

    drawSubgrid('horizontal');
    drawSubgrid('vertical');

    drawGrid('horizontal');
    drawGrid('vertical');
  }, [clearField, drawGrid, drawSubgrid]);
};
