import { memo } from 'react';
import { Cell } from './Cell';
import { Row } from './Row';
import type { Board as BoardType, Cell as CellType, CellCoords } from 'types/board';
import type { Nullable } from 'types/utility-types';
import styles from './Board.module.scss';

const getRowKey = (row: Nullable<CellType>[], rowIdx: number) =>
  row.reduce((key, cell) => `${key}|${cell ? `${cell.value}-${cell.type}` : cell}`, `${rowIdx}`);

const getCellKey = (cell: Nullable<CellType>, rowIdx: number, cellIdx: number) =>
  `${rowIdx}-${cellIdx}|${cell ? `${cell.value}-${cell.type}` : cell}`;

interface BoardProps {
  board: BoardType;
  selectedCell: Nullable<CellCoords>;
  onSelect: (selectedCell: CellCoords) => void;
}

const Board = ({ board, selectedCell, onSelect }: BoardProps) => (
  <table className={styles.board}>
    <tbody>
      {board.map((row, rowIdx) => (
        <Row key={getRowKey(row, rowIdx)}>
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
        </Row>
      ))}
    </tbody>
  </table>
);

export default memo(Board);
