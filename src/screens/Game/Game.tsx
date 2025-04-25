import clsx from 'clsx';
import { useEffect, useMemo, useState } from 'react';

import { FinishModal, PauseModal } from 'components';
import { useParamsContext } from 'contexts';
import { Board, Button, Numpad, Suggestions } from 'ui';

import { DEFAULT_STATUS } from './constants';
import { useBoard } from './useBoard';

import type { Status } from './types';
import type { Cell, NumberRange, SelectedCell, Suggestions as ISuggestions } from 'types/board';
import type { Nullable } from 'types/utility-types';

import styles from './Game.module.scss';

export const Game = () => {
  const { difficulty } = useParamsContext();

  const [selectedCell, setSelectedCell] = useState<Nullable<SelectedCell>>(null);
  const [selectedSuggestion, setSelectedSuggestion] = useState<Nullable<number>>(null);

  const [status, setStatus] = useState<Status>(DEFAULT_STATUS);

  const { board, createBoard, matrix, setBoard, setCell } = useBoard();

  useEffect(() => {
    createBoard(difficulty);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const shouldCheckSolution = useMemo(() => {
    if (!board || status === 'finished') return false;
    return board.every((row) => row.every((cell) => cell.value && cell.type !== 'error'));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [board]);

  useEffect(() => {
    if (!shouldCheckSolution || !board || !matrix) return;

    const checkedBoard = board.map((row, rowIdx) =>
      row.map((cell, cellIdx) => {
        if (!cell.value || cell.type === 'correct' || cell.type === 'prefilled') return cell;
        const isCorrect = cell.value === matrix[rowIdx][cellIdx];
        return {
          ...cell,
          suggestions: isCorrect ? undefined : cell.suggestions,
          type: (isCorrect ? 'correct' : 'error') as Cell['type'],
        };
      }),
    );

    setBoard(checkedBoard);

    const isSolved = checkedBoard.every((row) =>
      row.every((cell) => cell.value && (cell.type === 'correct' || cell.type === 'prefilled')),
    );

    if (isSolved) {
      setStatus('finished');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldCheckSolution]);

  useEffect(() => {
    setSelectedSuggestion(null);
  }, [selectedCell]);

  const handleNumpadClick = (value: Nullable<NumberRange>) => {
    if (!selectedCell) return;

    if (selectedSuggestion !== null) {
      const nextSuggestions = selectedCell.cell.suggestions
        ? [...selectedCell.cell.suggestions]
        : (new Array(4).fill(null) as ISuggestions);

      nextSuggestions[selectedSuggestion] = value;

      const nextCell = { ...selectedCell.cell, suggestions: nextSuggestions };

      setCell(nextCell, selectedCell.coords);
      setSelectedCell({ cell: nextCell, coords: selectedCell.coords });
      setSelectedSuggestion(null);
    } else {
      setCell({ ...selectedCell.cell, type: value ? 'solution' : undefined, value }, selectedCell.coords);
      setSelectedCell(null);
    }
  };

  const handleCellSelect = (selectedCell: Nullable<SelectedCell>) => {
    setSelectedCell((prevSelectedCell) => {
      if (
        prevSelectedCell &&
        prevSelectedCell.coords.rowIdx === selectedCell?.coords.rowIdx &&
        prevSelectedCell.coords.cellIdx === selectedCell.coords.cellIdx
      ) {
        return null;
      }

      return selectedCell;
    });
  };

  const handlePause = (pause: boolean) => {
    setStatus(pause ? 'paused' : 'playing');
  };

  const handleRestart = () => {
    createBoard(difficulty);
    setStatus('playing');
  };

  return (
    board && (
      <>
        <div className={styles.contentLayout}>
          <div
            className={clsx(styles.topLayout, {
              [styles.topLayout_twoElements]: selectedCell,
            })}
          >
            {selectedCell && (
              <Suggestions
                items={selectedCell.cell.suggestions}
                selectedSuggestion={selectedSuggestion}
                onSelect={setSelectedSuggestion}
              />
            )}
            <Button
              icon="pause"
              onClick={() => {
                handlePause(true);
              }}
            />
          </div>
          <Board board={board} selectedCell={selectedCell} onSelect={handleCellSelect} />
          <Numpad onClick={handleNumpadClick} />
        </div>
        {status === 'paused' && (
          <PauseModal
            onResume={() => {
              handlePause(false);
            }}
          />
        )}
        {status === 'finished' && <FinishModal onRestart={handleRestart} />}
      </>
    )
  );
};
