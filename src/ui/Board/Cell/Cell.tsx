import clsx from 'clsx';
import { memo } from 'react';

import type { Cell as CellType, CellCoords } from 'types/board';
import type { Nullable } from 'types/utility-types';

import styles from '../Board.module.scss';

interface CellProps {
  cell: Nullable<CellType>;
  cellIdx: number;
  rowIdx: number;
  selectedCell: Nullable<CellCoords>;
  onSelect: (selectedCell: CellCoords) => void;
}

const Cell = ({ cell, cellIdx, rowIdx, selectedCell, onSelect }: CellProps) => {
  const isDisabled = cell?.type === 'correct' || cell?.type === 'prefilled';
  const isSelected = rowIdx === selectedCell?.rowIdx && cellIdx === selectedCell.cellIdx;

  return (
    <td className={styles.board__cell}>
      <input
        className={clsx(styles.board__button, {
          [styles.board__button_selected]: isSelected,
          [styles[`board__button_${cell?.type}`]]: cell?.type,
        })}
        disabled={isDisabled}
        type="button"
        value={cell?.value}
        onClick={() => {
          onSelect({ rowIdx, cellIdx });
        }}
      />
    </td>
  );
};

export default memo(Cell);
