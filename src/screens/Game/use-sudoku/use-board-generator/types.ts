import type { Board, Difficulty, Matrix } from 'types/sudoku';

export type BoardGeneratorInputMessage = {
  difficulty: Difficulty;
};

export type BoardGeneratorOutputMessage = {
  board: Board;
  matrix: Matrix;
};

export type BoardGenerationHandler = (event: MessageEvent<BoardGeneratorOutputMessage>) => void;
