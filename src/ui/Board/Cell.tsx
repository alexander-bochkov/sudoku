import clsx from 'clsx';

import { SPACE } from 'constants/characters';

import type { Cell as ICell, SelectedCell } from 'types/board';
import type { Nullable } from 'types/utility-types';

import styles from './Board.module.scss';

type CellProps = {
  cell: ICell;
  cellIdx: number;
  rowIdx: number;
  selectedCell: Nullable<SelectedCell>;
  onSelect: (selectedCell: SelectedCell) => void;
};

const shouldPlaceSuggestionInThePosition = ({
  cellIdx,
  position,
  rowIdx,
  suggestionIdx,
}: {
  cellIdx: number;
  position: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';
  rowIdx: number;
  suggestionIdx: number;
}) => {
  const firstSuggestion = suggestionIdx === 0;
  const secondSuggestion = suggestionIdx === 1;
  const thirdSuggestion = suggestionIdx === 2;

  const topLeftCell = rowIdx === 0 && cellIdx === 0;
  const topRightCell = rowIdx === 0 && cellIdx === 8;
  const bottomLeftCell = rowIdx === 8 && cellIdx === 0;

  if (position === 'topLeft' && firstSuggestion && !topLeftCell) return true;
  if (position === 'topRight' && secondSuggestion && !topRightCell) return true;
  if (position === 'bottomLeft' && thirdSuggestion && !bottomLeftCell) return true;

  if (
    position === 'bottomRight' &&
    ((firstSuggestion && topLeftCell) || (secondSuggestion && topRightCell) || (thirdSuggestion && bottomLeftCell))
  ) {
    return true;
  }

  return false;
};

export const Cell = ({ cell, cellIdx, rowIdx, selectedCell, onSelect }: CellProps) => {
  const isDisabled = cell.type === 'correct' || cell.type === 'prefilled';
  const isSelected = rowIdx === selectedCell?.coords.rowIdx && cellIdx === selectedCell.coords.cellIdx;

  return (
    <td className={styles.board__cell}>
      {cell.suggestions?.map(
        (suggestion, suggestionIdx) =>
          suggestion && (
            <div
              className={clsx(styles.board__suggestion, {
                [styles.board__suggestion_topLeft]: shouldPlaceSuggestionInThePosition({
                  cellIdx,
                  position: 'topLeft',
                  rowIdx,
                  suggestionIdx,
                }),
                [styles.board__suggestion_topRight]: shouldPlaceSuggestionInThePosition({
                  cellIdx,
                  position: 'topRight',
                  rowIdx,
                  suggestionIdx,
                }),
                [styles.board__suggestion_bottomLeft]: shouldPlaceSuggestionInThePosition({
                  cellIdx,
                  position: 'bottomLeft',
                  rowIdx,
                  suggestionIdx,
                }),
                [styles.board__suggestion_bottomRight]: shouldPlaceSuggestionInThePosition({
                  cellIdx,
                  position: 'bottomRight',
                  rowIdx,
                  suggestionIdx,
                }),
              })}
              key={`${rowIdx}-${cellIdx}-${suggestionIdx}-${suggestion}`}
            >
              {suggestion}
            </div>
          ),
      )}

      <input
        className={clsx(styles.board__button, {
          [styles.board__button_selected]: isSelected,
          [styles[`board__button_${cell.type}`]]: cell.type,
        })}
        disabled={isDisabled}
        type="button"
        // Space is used to fix cell height in Safari
        value={cell.value ?? SPACE}
        onClick={() => {
          onSelect({ cell, coords: { rowIdx, cellIdx } });
        }}
      />
    </td>
  );
};
