import { useEffect, useMemo, useState } from 'react';

import { FinishModal, PauseModal } from 'components';
import { Board, Button, Numpad } from 'ui';

import { DEFAULT_STATUS } from './constants';
import { useBoard } from './useBoard';
import { useSelectedCell } from './useSelectedCell';

import type { Status } from './types';
import type { Cell, NumberRange } from 'types/board';
import type { Nullable } from 'types/utility-types';

import styles from './Game.module.scss';

export const Game = () => {
  const [status, setStatus] = useState<Status>(DEFAULT_STATUS);
  const [selectedCell, setSelectedCell] = useSelectedCell();

  const { board, createBoard, matrix, setBoard, setCell } = useBoard();

  useEffect(() => {
    createBoard();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const shouldCheckSolution = useMemo(() => {
    if (!board || status === 'finished') return false;
    return board.every((row) => row.every((cell) => cell && cell.type !== 'error'));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [board]);

  useEffect(() => {
    if (!shouldCheckSolution || !board || !matrix) return;

    const checkedBoard = board.map((row, rowIdx) =>
      row.map((cell, cellIdx) => {
        if (!cell || cell.type === 'correct' || cell.type === 'prefilled') return cell;
        return { ...cell, type: (cell.value === matrix[rowIdx][cellIdx] ? 'correct' : 'error') as Cell['type'] };
      }),
    );

    setBoard(checkedBoard);

    const isSolved = checkedBoard.every((row) =>
      row.every((cell) => cell && (cell.type === 'correct' || cell.type === 'prefilled')),
    );

    if (isSolved) {
      setStatus('finished');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldCheckSolution]);

  const handleNumpadClick = (value: Nullable<NumberRange>) => {
    if (selectedCell) {
      setCell(selectedCell, value ? { type: 'solution', value } : value);
      setSelectedCell(null);
    }
  };

  const handlePause = (pause: boolean) => {
    setStatus(pause ? 'paused' : 'playing');
  };

  const handleRestart = () => {
    createBoard();
    setStatus('playing');
  };

  return (
    board && (
      <>
        <div className={styles.contentLayout}>
          <div className={styles.pauseLayout}>
            <Button
              icon="pause"
              onClick={() => {
                handlePause(true);
              }}
            />
          </div>
          <Board board={board} selectedCell={selectedCell} onSelect={setSelectedCell} />
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
