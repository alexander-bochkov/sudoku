import { useCallback, useEffect, useMemo, useState } from 'react';
import { forEachCell } from 'utils/board';
import { BoardContext } from './context';
import { useDimensions } from './hooks/use-dimensions';
import { useSudoku } from './hooks/use-sudoku';
import { createEmptyBoard, findGaps, excludeCellAndCreateNewArray, getCellValue, setCellValue } from './utils';
import type { FC, PropsWithChildren } from 'react';
import type { Board, Cell, Status } from 'types/board';
import type { Nullable } from 'types/utility-types';
import type { BoardContextType } from './context';
import { full, prefilled } from '../../data/board';

export const BoardContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const dimensions = useDimensions();

  useSudoku();

  const [fullBoard, setFullBoard] = useState<Nullable<Board>>(null);
  const [prefilledBoard, setPrefilledBoard] = useState<Nullable<Board>>(null);
  const [solutionBoard, setSolutionBoard] = useState<Nullable<Board>>(null);

  const [selectedCell, setSelectedCell] = useState<Nullable<Cell>>(null);

  const [errors, setErrors] = useState<Nullable<Cell[]>>(null);
  const [gaps, setGaps] = useState<Nullable<Cell[]>>(null);

  const [status, setStatus] = useState<Status>('loading');

  const loadBoards = useCallback(() => {
    const nextFullBoard = full;
    const nextPrefilledBoard = prefilled;
    const nextGaps = findGaps(nextPrefilledBoard);

    setFullBoard(nextFullBoard);
    setPrefilledBoard(nextPrefilledBoard);
    setGaps(nextGaps);
  }, []);

  useEffect(() => {
    loadBoards();
  }, [loadBoards]);

  useEffect(() => {
    if (status === 'loading' && dimensions && prefilledBoard && gaps) {
      setStatus('progress');
    }
  }, [dimensions, gaps, prefilledBoard, status]);

  const shouldUpdateNumber = useCallback(
    (number: number) =>
      Boolean(
        selectedCell && (!solutionBoard || (solutionBoard && getCellValue(solutionBoard, selectedCell) !== number)),
      ),
    [selectedCell, solutionBoard],
  );

  const isCellWithError = useCallback(() => {
    if (!selectedCell || !errors) return false;

    const errorIndex = errors.findIndex(
      ({ columnIndex, rowIndex }) => selectedCell.columnIndex === columnIndex && selectedCell.rowIndex === rowIndex,
    );
    return errorIndex !== -1;
  }, [errors, selectedCell]);

  const isCellWithGap = useCallback(() => {
    if (!selectedCell || !gaps) return false;

    const gapIndex = gaps.findIndex(
      ({ columnIndex, rowIndex }) => selectedCell.columnIndex === columnIndex && selectedCell.rowIndex === rowIndex,
    );
    return gapIndex !== -1;
  }, [gaps, selectedCell]);

  const onNumberSelect = useCallback(
    (number: number) => {
      if (!shouldUpdateNumber(number)) return;

      const nextSolutionBoard = solutionBoard ? [...solutionBoard] : createEmptyBoard();
      setCellValue(nextSolutionBoard, selectedCell!, number);
      setSolutionBoard(nextSolutionBoard);

      if (isCellWithError()) {
        const nextErrors = excludeCellAndCreateNewArray(errors!, selectedCell!);
        const hasErrors = Boolean(nextErrors.length);
        setErrors(hasErrors ? nextErrors : null);
      }

      if (isCellWithGap()) {
        const nextGaps = excludeCellAndCreateNewArray(gaps!, selectedCell!);
        const hasGaps = Boolean(nextGaps.length);
        setGaps(hasGaps ? nextGaps : null);
      }

      setSelectedCell(null);
    },
    [shouldUpdateNumber, solutionBoard, selectedCell, isCellWithError, isCellWithGap, errors, gaps],
  );

  const shouldEraseCell = useCallback(
    () => Boolean(selectedCell && solutionBoard && getCellValue(solutionBoard, selectedCell)),
    [selectedCell, solutionBoard],
  );

  const onErase = useCallback(() => {
    if (!shouldEraseCell()) return;

    const nextSolutionBoard = [...solutionBoard!];
    setCellValue(nextSolutionBoard, selectedCell!, null);
    setSolutionBoard(nextSolutionBoard);

    if (isCellWithError()) {
      const nextErrors = excludeCellAndCreateNewArray(errors!, selectedCell!);
      const hasErrors = Boolean(nextErrors.length);
      setErrors(hasErrors ? nextErrors : null);
    }

    const nextGaps = gaps ? [...gaps] : [];
    nextGaps.push(selectedCell!);
    setGaps(nextGaps);

    setSelectedCell(null);
  }, [errors, gaps, isCellWithError, selectedCell, shouldEraseCell, solutionBoard]);

  useEffect(() => {
    if (status === 'progress' && !gaps && !errors && fullBoard && prefilledBoard && solutionBoard) {
      const nextErrors: Cell[] = [];

      forEachCell(fullBoard, (cell, value) => {
        if (!value || getCellValue(prefilledBoard, cell)) return;

        const solutionBoardValue = getCellValue(solutionBoard, cell);

        if (value !== solutionBoardValue) {
          nextErrors.push(cell);
        }
      });

      if (nextErrors.length) {
        setErrors(nextErrors);
        setStatus('error');
      } else {
        setStatus('completed');
      }
    }
  }, [errors, fullBoard, gaps, prefilledBoard, solutionBoard, status]);

  const onErrorsCheck = useCallback(() => {
    setStatus('progress');
  }, []);

  const onRestart = useCallback(() => {
    setStatus('loading');
    setSolutionBoard(null);
    loadBoards();
  }, [loadBoards]);

  const value = useMemo(
    (): BoardContextType => ({
      dimensions,
      prefilledBoard,
      solutionBoard,
      selectedCell,
      setSelectedCell,
      status,
      errors,
      onNumberSelect,
      onErase,
      onErrorsCheck,
      onRestart,
    }),
    [
      dimensions,
      errors,
      onErase,
      onErrorsCheck,
      onNumberSelect,
      onRestart,
      prefilledBoard,
      selectedCell,
      solutionBoard,
      status,
    ],
  );

  return <BoardContext.Provider value={value}>{children}</BoardContext.Provider>;
};
