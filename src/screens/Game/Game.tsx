import clsx from 'clsx';
import { useEffect, useState } from 'react';

import { FinishModal, PauseModal } from 'components';
import { STORAGE_KEYS } from 'constants/storage';
import { DEFAULT_DIFFICULTY } from 'constants/sudoku';
import { usePersistentState } from 'hooks/use-persistent-state';
import { Board, Button, Loader, Notes, Numpad } from 'ui';

import { useSudoku } from './use-sudoku';

import type { Difficulty, Digit, InteractiveCell, SelectedCell } from 'types/sudoku';
import type { Nullable } from 'types/utility-types';

import styles from './Game.module.scss';

export const Game = () => {
  const [difficulty = DEFAULT_DIFFICULTY] = usePersistentState<Difficulty>(STORAGE_KEYS.DIFFICULTY, {
    returnUndefined: true,
  });
  const { board, generateBoard, setCell, status } = useSudoku();

  const [isPaused, setIsPaused] = useState(false);
  const [selectedCell, setSelectedCell] = useState<Nullable<SelectedCell>>(null);
  const [selectedNoteIdx, setSelectedNoteIdx] = useState<Nullable<number>>(null);

  const handleRestart = () => {
    generateBoard(difficulty);
  };

  useEffect(() => {
    handleRestart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleNumpadClick = (value: Nullable<Digit>) => {
    if (!selectedCell) return;

    const { rowIdx, colIdx, ...cell } = selectedCell;
    const coords = { rowIdx, colIdx };

    if (selectedNoteIdx !== null) {
      const nextNotes = [...cell.notes];
      nextNotes[selectedNoteIdx] = value;
      const nextCell: InteractiveCell = { ...cell, notes: nextNotes };

      setCell(nextCell, coords);
      setSelectedCell({ ...nextCell, ...coords });
      setSelectedNoteIdx(null);
    } else {
      const nextCell: InteractiveCell = value
        ? { ...cell, type: 'solution', value }
        : { ...cell, type: 'empty', value };

      setCell(nextCell, coords);
      setSelectedCell(null);
    }
  };

  if (!board || status === 'GENERATING') return <Loader />;

  return (
    <>
      <div className={styles.contentLayout}>
        <div
          className={clsx(styles.topLayout, {
            [styles.topLayout_twoElements]: selectedCell,
          })}
        >
          {selectedCell && (
            <Notes notes={selectedCell.notes} selectedNoteIdx={selectedNoteIdx} onSelect={setSelectedNoteIdx} />
          )}
          <Button
            icon="pause"
            onClick={() => {
              setIsPaused(true);
            }}
          />
        </div>
        <Board board={board} selectedCell={selectedCell} onSelect={setSelectedCell} />
        <Numpad onClick={handleNumpadClick} />
      </div>
      {isPaused && (
        <PauseModal
          onResume={() => {
            setIsPaused(false);
          }}
        />
      )}
      {status === 'SOLVED' && <FinishModal onRestart={handleRestart} />}
    </>
  );
};
