import clsx from 'clsx';

import { SPACE } from 'constants/characters';

import type { Cell as ICell, Coordinates, SelectedCell } from 'types/sudoku';
import type { Nullable } from 'types/utility-types';

import styles from './Board.module.scss';

type CellProps = {
  cell: ICell;
  coords: Coordinates;
  selectedCell: Nullable<SelectedCell>;
  onSelect: (selectedCell: Nullable<SelectedCell>) => void;
};

const getNotePosition = (
  noteIdx: number,
  coords: Coordinates,
): 'bottomLeft' | 'bottomRight' | 'topLeft' | 'topRight' => {
  const isFirstNote = noteIdx === 0;
  const isSecondNote = noteIdx === 1;
  const isThirdNote = noteIdx === 2;

  const isTopLeftCell = coords.rowIdx === 0 && coords.colIdx === 0;
  const isTopRightCell = coords.rowIdx === 0 && coords.colIdx === 8;
  const isBottomLeftCell = coords.rowIdx === 8 && coords.colIdx === 0;

  if (isFirstNote && !isTopLeftCell) return 'topLeft';
  if (isSecondNote && !isTopRightCell) return 'topRight';
  if (isThirdNote && !isBottomLeftCell) return 'bottomLeft';

  return 'bottomRight';
};

export const Cell = ({ cell, coords, selectedCell, onSelect }: CellProps) => {
  const isInteractive = cell.type === 'empty' || cell.type === 'error' || cell.type === 'solution';
  const isSelected = coords.rowIdx === selectedCell?.rowIdx && coords.colIdx === selectedCell.colIdx;

  return (
    <td className={styles.board__cell}>
      {isInteractive &&
        cell.notes.map(
          (note, noteIdx) =>
            note && (
              <div
                className={clsx(styles.board__note, styles[`board__note_position_${getNotePosition(noteIdx, coords)}`])}
                key={noteIdx}
              >
                {note}
              </div>
            ),
        )}

      <input
        className={clsx(styles.board__button, {
          [styles.board__button_selected]: isSelected,
          [styles[`board__button_type_${cell.type}`]]: cell.type,
        })}
        disabled={!isInteractive}
        type="button"
        // Space is used to fix cell height in Safari
        value={cell.value ?? SPACE}
        onClick={() => {
          isInteractive && onSelect(isSelected ? null : { ...cell, ...coords });
        }}
      />
    </td>
  );
};
