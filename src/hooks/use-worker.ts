import { useEffect, useRef, useState } from 'react';

import type { Nullable } from 'types/utility-types';

type WorkerConstructor = new () => Worker;

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-parameters
export const useWorker = <Request, Response>(WorkerModule: WorkerConstructor) => {
  const workerRef = useRef<Worker>(null);
  const [response, setResponse] = useState<Nullable<Response>>(null);

  useEffect(() => {
    workerRef.current = new WorkerModule();

    return () => {
      workerRef.current?.terminate();
      workerRef.current = null;
    };
  }, [WorkerModule]);

  useEffect(() => {
    const handleMessage = ({ data }: MessageEvent<Response>) => {
      setResponse(data);
    };

    workerRef.current?.addEventListener('message', handleMessage);

    return () => {
      workerRef.current?.removeEventListener('message', handleMessage);
    };
  }, []);

  const postMessage = (data: Request) => {
    workerRef.current?.postMessage(data);
  };

  return { postMessage, response };
};
