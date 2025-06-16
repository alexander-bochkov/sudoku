import { useEffect, useRef } from 'react';

import type { BoardGenerationHandler, BoardGeneratorInputMessage } from './types';
import type { Difficulty } from 'types/sudoku';

export const useBoardGenerator = (handler: BoardGenerationHandler) => {
  const workerRef = useRef<Worker>(null);

  useEffect(() => {
    workerRef.current = new Worker(new URL('./board-generator-worker.ts', import.meta.url), { type: 'module' });

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
