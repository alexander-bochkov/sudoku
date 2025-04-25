import { Cell } from './Cell';

import type { Board as IBoard, Cell as ICell, SelectedCell } from 'types/board';
import type { Nullable } from 'types/utility-types';

import styles from './Board.module.scss';

const getRowKey = (row: ICell[], rowIdx: number) =>
  row.reduce((key, cell) => `${key}|${cell.value}-${cell.type}`, `${rowIdx}`);

const getCellKey = (cell: ICell, rowIdx: number, cellIdx: number) => `${rowIdx}-${cellIdx}|${cell.value}-${cell.type}`;

type BoardProps = {
  board: IBoard;
  selectedCell: Nullable<SelectedCell>;
  onSelect: (selectedCell: SelectedCell) => void;
};

export const Board = ({ board, selectedCell, onSelect }: BoardProps) => (
  <table className={styles.board}>
    <tbody>
      {board.map((row, rowIdx) => (
        <tr className={styles.board__row} key={getRowKey(row, rowIdx)}>
          {row.map((cell, cellIdx) => (
            <Cell
              cell={cell}
              cellIdx={cellIdx}
              key={getCellKey(cell, rowIdx, cellIdx)}
              rowIdx={rowIdx}
              selectedCell={selectedCell}
              onSelect={onSelect}
            />
          ))}
        </tr>
      ))}
    </tbody>
  </table>
);
