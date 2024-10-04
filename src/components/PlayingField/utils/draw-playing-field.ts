import {
  CELL_DIVIDER_COLOR,
  GROUP_DIVIDER_COLOR,
  ONE_CELL_DIVIDER_SIZE,
  ONE_GROUP_DIVIDER_SIZE,
  CELLS_QUANTITY_IN_GROUP_ROW,
  GROUP_DIVIDERS_QUANTITY,
  GROUPS_QUANTITY_IN_FIELD_ROW,
  CELL_DIVIDERS_QUANTITY,
} from '../constants';
import type { Dimensions } from '../types';

export const drawPlayingField = (canvas: HTMLCanvasElement | null, dimensions: Dimensions): void => {
  const context = canvas?.getContext('2d');

  if (!canvas || !context) return;

  context.clearRect(0, 0, dimensions.field, dimensions.field);

  const test = ({ cell, group, offset }: { cell: boolean; group: boolean; offset: number }) => {
    const drawTestCellDividers = () => {
      for (let v = 0; v < GROUPS_QUANTITY_IN_FIELD_ROW; v++) {
        for (let i = 0; i < CELLS_QUANTITY_IN_GROUP_ROW; i++) {
          if (i === CELL_DIVIDERS_QUANTITY) continue;

          const cellsFromLeft = dimensions.cell * (i + 1) + v * CELLS_QUANTITY_IN_GROUP_ROW * dimensions.cell;
          const cellDividersFromLeft = ONE_CELL_DIVIDER_SIZE * i + CELL_DIVIDERS_QUANTITY * v;
          const groupDividersFromLeft = ONE_GROUP_DIVIDER_SIZE * v;
          const x = cellsFromLeft + cellDividersFromLeft + groupDividersFromLeft + offset;

          context.beginPath();
          context.fillStyle = 'green';
          context.rect(x, 0, ONE_CELL_DIVIDER_SIZE, dimensions.field);
          context.fill();
        }
      }

      for (let v = 0; v < GROUPS_QUANTITY_IN_FIELD_ROW; v++) {
        for (let i = 0; i < CELLS_QUANTITY_IN_GROUP_ROW; i++) {
          if (i === CELL_DIVIDERS_QUANTITY) continue;

          const cellsFromTop = dimensions.cell * (i + 1) + v * CELLS_QUANTITY_IN_GROUP_ROW * dimensions.cell;
          const cellDividersFromTop = ONE_CELL_DIVIDER_SIZE * i + CELL_DIVIDERS_QUANTITY * v;
          const groupDividersFromTop = ONE_GROUP_DIVIDER_SIZE * v;
          const y = cellsFromTop + cellDividersFromTop + groupDividersFromTop + offset;

          context.beginPath();
          context.fillStyle = 'green';
          context.rect(0, y, dimensions.field, ONE_CELL_DIVIDER_SIZE);
          context.fill();
        }
      }
    };

    const drawTestGroupDividers = () => {
      for (let i = 0; i < GROUP_DIVIDERS_QUANTITY; i++) {
        const groupsFromLeft = dimensions.group * (i + 1);
        const groupDividersFromLeft = ONE_GROUP_DIVIDER_SIZE * i;

        context.beginPath();
        context.fillStyle = 'black';
        context.rect(groupsFromLeft + groupDividersFromLeft + offset, 0, ONE_GROUP_DIVIDER_SIZE, dimensions.field);
        context.fill();
      }

      for (let i = 0; i < GROUP_DIVIDERS_QUANTITY; i++) {
        const groupsFromTop = dimensions.group * (i + 1);
        const groupDividersFromTop = ONE_GROUP_DIVIDER_SIZE * i;

        context.beginPath();
        context.fillStyle = 'black';
        context.rect(0, groupsFromTop + groupDividersFromTop + offset, dimensions.field, ONE_GROUP_DIVIDER_SIZE);
        context.fill();
      }
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    cell && drawTestCellDividers();
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    group && drawTestGroupDividers();
  };

  const drawDivider = ({
    color,
    coords,
    direction,
    size,
  }: {
    color: string;
    coords: [number, number];
    direction: 'horizontal' | 'vertical';
    size: number;
  }): void => {
    const [x, y] = coords;
    const w = direction === 'vertical' ? size : dimensions.field;
    const h = direction === 'vertical' ? dimensions.field : size;

    context.beginPath();
    context.fillStyle = color;
    context.rect(x, y, w, h);
    context.fill();
  };

  const calculateGroupDividerCoords = (direction: 'horizontal' | 'vertical', dividerIdx: number): [number, number] => {
    const groupIdx = dividerIdx + 1;
    const groupsSize = dimensions.group * groupIdx;

    const dividersSize = ONE_GROUP_DIVIDER_SIZE * dividerIdx;

    const x = direction === 'vertical' ? groupsSize + dividersSize : 0;
    const y = direction === 'vertical' ? 0 : groupsSize + dividersSize;

    return [x, y];
  };

  const calculateCellDividerCoords = (
    direction: 'horizontal' | 'vertical',
    dividerIdx: number,
    groupIdx: number,
  ): [number, number] => {
    const cellIdx = dividerIdx + 1;
    const cellsSize = dimensions.cell * cellIdx;

    const dividerSize = ONE_CELL_DIVIDER_SIZE * dividerIdx;

    const groupsSize = dimensions.group * groupIdx;
    const groupDividersSize = ONE_GROUP_DIVIDER_SIZE * groupIdx;

    const x = direction === 'vertical' ? cellsSize + dividerSize + groupsSize + groupDividersSize : 0;
    const y = direction === 'vertical' ? 0 : cellsSize + dividerSize + groupsSize + groupDividersSize;

    return [x, y];
  };

  const drawGroupDividers = () => {
    for (let i = 0; i < GROUP_DIVIDERS_QUANTITY; i++) {
      const coords = calculateGroupDividerCoords('vertical', i);

      drawDivider({
        color: GROUP_DIVIDER_COLOR,
        coords,
        direction: 'vertical',
        size: ONE_GROUP_DIVIDER_SIZE,
      });
    }

    for (let i = 0; i < GROUP_DIVIDERS_QUANTITY; i++) {
      const coords = calculateGroupDividerCoords('horizontal', i);

      drawDivider({
        color: GROUP_DIVIDER_COLOR,
        coords,
        direction: 'horizontal',
        size: ONE_GROUP_DIVIDER_SIZE,
      });
    }
  };

  const drawCellDividers = () => {
    for (let groupIdx = 0; groupIdx < GROUPS_QUANTITY_IN_FIELD_ROW; groupIdx++) {
      for (let dividerIdx = 0; dividerIdx < CELL_DIVIDERS_QUANTITY; dividerIdx++) {
        const coords = calculateCellDividerCoords('vertical', dividerIdx, groupIdx);

        drawDivider({
          color: CELL_DIVIDER_COLOR,
          coords,
          direction: 'vertical',
          size: ONE_CELL_DIVIDER_SIZE,
        });
      }
    }

    for (let groupIdx = 0; groupIdx < GROUPS_QUANTITY_IN_FIELD_ROW; groupIdx++) {
      for (let dividerIdx = 0; dividerIdx < CELL_DIVIDERS_QUANTITY; dividerIdx++) {
        const coords = calculateCellDividerCoords('horizontal', dividerIdx, groupIdx);

        drawDivider({
          color: CELL_DIVIDER_COLOR,
          coords,
          direction: 'horizontal',
          size: ONE_CELL_DIVIDER_SIZE,
        });
      }
    }
  };

  test({ cell: false, group: false, offset: 0 });

  drawCellDividers();
  drawGroupDividers();

  // console.log(canvas, dimensions, context);
};
