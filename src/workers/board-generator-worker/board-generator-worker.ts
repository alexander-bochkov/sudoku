import { CLUES_MAP, SWAPS, TEMPLATE } from './constants';
import { covertMatrixToBoard } from './utils/covert-matrix-to-board';
import { createClues } from './utils/create-clues';
import { shuffle } from './utils/shuffle';

import type { BoardGeneratorInputMessage, BoardGeneratorOutputMessage } from './types';

self.addEventListener('message', ({ data: { difficulty } }: MessageEvent<BoardGeneratorInputMessage>) => {
  const matrix = shuffle(TEMPLATE, SWAPS);
  const clues = createClues(matrix, CLUES_MAP[difficulty]);
  const board = covertMatrixToBoard(clues);

  const message: BoardGeneratorOutputMessage = { board, matrix };
  self.postMessage(message);
});
