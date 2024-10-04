import { useCallback, useEffect, useMemo, useState } from 'react';
import { CELL_RESIZE_STEP, GRID, MIN_SCREEN_EDGES_DISTANCE, PLAYING_FIELD, SUBGRID } from '../constants';
import type { Dimensions } from '../types';

export const usePlayingFieldDimensions = (): Dimensions => {
  const [cell, setCell] = useState(0);
  const [field, setField] = useState(0);
  const [group, setGroup] = useState(0);

  const updateDimensions = useCallback((dimensions: Dimensions) => {
    setCell(dimensions.cell);
    setField(dimensions.field);
    setGroup(dimensions.group);
  }, []);

  const calculateFieldDimension = useCallback((screenArea: number, attempt = 1): Dimensions['field'] => {
    if (screenArea >= PLAYING_FIELD.MAX_DIMENSION) return PLAYING_FIELD.MAX_DIMENSION;
    if (screenArea <= PLAYING_FIELD.MIN_DIMENSION) return PLAYING_FIELD.MIN_DIMENSION;

    const fieldResizeStep = PLAYING_FIELD.CELLS_ON_AXIS * CELL_RESIZE_STEP;
    const field = PLAYING_FIELD.MAX_DIMENSION - fieldResizeStep * attempt;

    return screenArea < field ? calculateFieldDimension(screenArea, ++attempt) : field;
  }, []);

  const calculateGroupDimension = useCallback(
    (field: number): Dimensions['group'] => (field - GRID.LINES * GRID.THICKNESS) / PLAYING_FIELD.GROUPS_ON_AXIS,
    [],
  );

  const calculateCellDimension = useCallback(
    (group: number): Dimensions['cell'] =>
      (group - SUBGRID.LINES * SUBGRID.THICKNESS) / (PLAYING_FIELD.CELLS_ON_AXIS / PLAYING_FIELD.GROUPS_ON_AXIS),
    [],
  );

  const calculateDimensions = useCallback(
    (screenWidth: number, screenHeight: number): Dimensions => {
      const availableScreenArea = Math.min(screenWidth, screenHeight) - MIN_SCREEN_EDGES_DISTANCE;

      const field = calculateFieldDimension(availableScreenArea);
      const group = calculateGroupDimension(field);
      const cell = calculateCellDimension(group);

      return {
        cell,
        field,
        group,
      };
    },
    [calculateCellDimension, calculateFieldDimension, calculateGroupDimension],
  );

  const handleResize = useCallback(
    ({ target }: Event) => {
      const { innerWidth, innerHeight } = target as Window;
      const dimensions = calculateDimensions(innerWidth, innerHeight);

      if (dimensions.field !== field) {
        updateDimensions(dimensions);
      }
    },
    [field, calculateDimensions, updateDimensions],
  );

  useEffect(() => {
    const dimensions = calculateDimensions(window.innerWidth, window.innerHeight);
    updateDimensions(dimensions);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [handleResize]);

  const dimensions = useMemo<Dimensions>(
    () => ({
      cell,
      field,
      group,
    }),
    [cell, field, group],
  );

  return dimensions;
};
