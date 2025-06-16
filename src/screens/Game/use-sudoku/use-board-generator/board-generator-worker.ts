import { CLUES_MAP, SWAPS, TEMPLATE } from './constants';
import { covertMatrixToBoard, createClues, shuffle } from './utils';

import type { BoardGeneratorInputMessage, BoardGeneratorOutputMessage } from './types';

self.addEventListener('message', ({ data: { difficulty } }: MessageEvent<BoardGeneratorInputMessage>) => {
  const matrix = shuffle(TEMPLATE, SWAPS);
  const clues = createClues(matrix, CLUES_MAP[difficulty]);
  const board = covertMatrixToBoard(clues);

  const message: BoardGeneratorOutputMessage = { board, matrix };
  self.postMessage(message);
});
