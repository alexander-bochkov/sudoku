import { CLUES_MAP, SWAPS, TEMPLATE } from './constants';
import { covertMatrixToBoard } from './utils/covert-matrix-to-board';
import { createClues } from './utils/create-clues';
import { shuffle } from './utils/shuffle';

import type { BoardGeneratorWorkerRequest, BoardGeneratorWorkerResponse } from './types';

self.addEventListener('message', ({ data: { difficulty } }: MessageEvent<BoardGeneratorWorkerRequest>) => {
  const matrix = shuffle(TEMPLATE, SWAPS);
  const clues = createClues(matrix, CLUES_MAP[difficulty]);
  const board = covertMatrixToBoard(clues);

  const message: BoardGeneratorWorkerResponse = { board, matrix };
  self.postMessage(message);
});
