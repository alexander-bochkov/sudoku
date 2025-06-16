import { useEffect, useRef } from 'react';

import { BoardGeneratorWorker } from 'workers/board-generator-worker';

import type { BoardGenerationHandler } from './types';
import type { Difficulty } from 'types/sudoku';
import type { BoardGeneratorInputMessage } from 'workers/board-generator-worker';

export const useBoardGenerator = (handler: BoardGenerationHandler) => {
  const workerRef = useRef<Worker>(null);

  useEffect(() => {
    workerRef.current = new BoardGeneratorWorker();

    return () => {
      workerRef.current?.terminate();
      workerRef.current = null;
    };
  }, []);

  useEffect(() => {
    workerRef.current?.addEventListener('message', handler);

    return () => {
      workerRef.current?.removeEventListener('message', handler);
    };
  }, [handler]);

  const generate = (difficulty: Difficulty) => {
    const message: BoardGeneratorInputMessage = { difficulty };
    workerRef.current?.postMessage(message);
  };

  return generate;
};
