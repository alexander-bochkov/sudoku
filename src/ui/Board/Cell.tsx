import clsx from 'clsx';

import { SPACE } from 'constants/characters';

import type { Cell as ICell, Coords } from 'types/board';
import type { Nullable } from 'types/utility-types';

import styles from './Board.module.scss';

type CellProps = {
  cell: Nullable<ICell>;
  cellIdx: number;
  rowIdx: number;
  selectedCell: Nullable<Coords>;
  onSelect: (selectedCell: Coords) => void;
};

export const Cell = ({ cell, cellIdx, rowIdx, selectedCell, onSelect }: CellProps) => {
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
        // Space is used to fix cell height in Safari
        value={cell?.value ?? SPACE}
        onClick={() => {
          onSelect({ rowIdx, cellIdx });
        }}
      />
    </td>
  );
};
