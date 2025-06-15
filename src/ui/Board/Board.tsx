import { Cell } from './Cell';

import type { Board as IBoard, SelectedCell } from 'types/sudoku';
import type { Nullable } from 'types/utility-types';

import styles from './Board.module.scss';

type BoardProps = {
  board: IBoard;
  selectedCell: Nullable<SelectedCell>;
  onSelect: (selectedCell: Nullable<SelectedCell>) => void;
};

export const Board = ({ board, selectedCell, onSelect }: BoardProps) => (
  <table className={styles.board}>
    <tbody>
      {board.map((row, rowIdx) => (
        <tr className={styles.board__row} key={rowIdx}>
          {row.map((cell, colIdx) => (
            <Cell
              cell={cell}
              coords={{ rowIdx, colIdx }}
              key={colIdx}
              selectedCell={selectedCell}
              onSelect={onSelect}
            />
          ))}
        </tr>
      ))}
    </tbody>
  </table>
);
