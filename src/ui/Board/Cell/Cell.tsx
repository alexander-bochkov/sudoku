import clsx from 'clsx';
import { memo } from 'react';
import type { CSSProperties } from 'react';
import type { Cell as CellType, Coords, Dimensions } from 'types/board';
import type { Nullable } from 'types/utility-types';
import styles from '../Board.module.scss';

const getButtonStyle = (dimensions: Dimensions): CSSProperties => ({
  fontSize: dimensions.cell,
  height: dimensions.cell,
  lineHeight: `${dimensions.cell}px`,
  width: dimensions.cell,
});

interface CellProps {
  cell: Nullable<CellType>;
  cellIdx: number;
  dimensions: Dimensions;
  rowIdx: number;
  selectedCell: Nullable<Coords>;
  onSelect: (selectedCell: Coords) => void;
}

const Cell = ({ cell, cellIdx, dimensions, rowIdx, selectedCell, onSelect }: CellProps) => {
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
        style={getButtonStyle(dimensions)}
        type="button"
        value={cell?.value}
        onClick={() => {
          onSelect({ cellIdx, rowIdx });
        }}
      />
    </td>
  );
};

export default memo(Cell);
