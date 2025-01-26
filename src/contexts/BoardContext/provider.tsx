import { useCallback, useEffect, useMemo, useState } from 'react';
import { forEachCell } from 'utils/board';
import { useParamsContext } from '../ParamsContext';
import { BoardContext } from './context';
import {
  createEmptyBoard,
  createTemplateBoard,
  excludeCellAndCreateNewArray,
  findGaps,
  getCellValue,
  removeNumbers,
  setCellValue,
  shuffleBoard,
} from './utils';
import { NUMBER_TO_REMOVE } from './constants';
import type { FC, PropsWithChildren } from 'react';
import type { Board_OLD, Cell_OLD } from 'types/board';
import type { Nullable } from 'types/utility-types';
import type { BoardContextType } from './context';
import type { Status } from './types';

export const BoardContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const { dimensions } = useParamsContext();
  const [fullBoard, setFullBoard] = useState<Nullable<Board_OLD>>(null);
  const [prefilledBoard, setPrefilledBoard] = useState<Nullable<Board_OLD>>(null);
  const [solutionBoard, setSolutionBoard] = useState<Nullable<Board_OLD>>(null);

  const [selectedCell, setSelectedCell] = useState<Nullable<Cell_OLD>>(null);

  const [errors, setErrors] = useState<Nullable<Cell_OLD[]>>(null);
  const [gaps, setGaps] = useState<Nullable<Cell_OLD[]>>(null);

  const [status, setStatus] = useState<Status>('loading');

  const loadBoards = useCallback(() => {
    const templateBoard = createTemplateBoard();
    const nextFullBoard = shuffleBoard(templateBoard);
    const nextPrefilledBoard = removeNumbers(nextFullBoard, NUMBER_TO_REMOVE);
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
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
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
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      setCellValue(nextSolutionBoard, selectedCell!, number);
      setSolutionBoard(nextSolutionBoard);

      if (isCellWithError()) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const nextErrors = excludeCellAndCreateNewArray(errors!, selectedCell!);
        const hasErrors = Boolean(nextErrors.length);
        setErrors(hasErrors ? nextErrors : null);
      }

      if (isCellWithGap()) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
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

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const nextSolutionBoard = [...solutionBoard!];
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    setCellValue(nextSolutionBoard, selectedCell!, null);
    setSolutionBoard(nextSolutionBoard);

    if (isCellWithError()) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const nextErrors = excludeCellAndCreateNewArray(errors!, selectedCell!);
      const hasErrors = Boolean(nextErrors.length);
      setErrors(hasErrors ? nextErrors : null);
    }

    const nextGaps = gaps ? [...gaps] : [];
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    nextGaps.push(selectedCell!);
    setGaps(nextGaps);

    setSelectedCell(null);
  }, [errors, gaps, isCellWithError, selectedCell, shouldEraseCell, solutionBoard]);

  useEffect(() => {
    if (status === 'progress' && !gaps && !errors && fullBoard && prefilledBoard && solutionBoard) {
      const nextErrors: Cell_OLD[] = [];

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
    [errors, onErase, onErrorsCheck, onNumberSelect, onRestart, prefilledBoard, selectedCell, solutionBoard, status],
  );

  return <BoardContext.Provider value={value}>{children}</BoardContext.Provider>;
};
