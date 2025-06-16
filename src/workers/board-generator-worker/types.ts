import type { Board, Difficulty, Matrix } from 'types/sudoku';

export type BoardGeneratorWorkerRequest = {
  difficulty: Difficulty;
};

export type BoardGeneratorWorkerResponse = {
  board: Board;
  matrix: Matrix;
};
