import { useEffect, useState } from 'react';

import type { BoardGenerationHandler, BoardGeneratorInputMessage } from './types';
import type { Nullable } from 'types/utility-types';

export const useBoardGenerator = (handler: BoardGenerationHandler) => {
  // TODO: replace useState with useRef
  const [worker, setWorker] = useState<Nullable<Worker>>(null);

  useEffect(() => {
    const worker = new Worker(new URL('./worker.ts', import.meta.url), { type: 'module' });
    setWorker(worker);

    return () => {
      worker.terminate();
    };
  }, []);

  useEffect(() => {
    if (!worker) return;

    worker.addEventListener('message', handler);

    return () => {
      worker.removeEventListener('message', handler);
    };
  }, [handler, worker]);

  const generate = (difficulty: BoardGeneratorInputMessage) => {
    worker && worker.postMessage(difficulty);
  };

  return generate;
};
