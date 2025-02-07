import { Cell } from './Cell';

import type { Board as IBoard, Cell as ICell, Coords } from 'types/board';
import type { Nullable } from 'types/utility-types';

import styles from './Board.module.scss';

const getRowKey = (row: Nullable<ICell>[], rowIdx: number) =>
  row.reduce((key, cell) => `${key}|${cell ? `${cell.value}-${cell.type}` : cell}`, `${rowIdx}`);

const getCellKey = (cell: Nullable<ICell>, rowIdx: number, cellIdx: number) =>
  `${rowIdx}-${cellIdx}|${cell ? `${cell.value}-${cell.type}` : cell}`;

type BoardProps = {
  board: IBoard;
  selectedCell: Nullable<Coords>;
  onSelect: (selectedCell: Coords) => void;
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
