import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { Nullable } from 'types/utility-types';

export const useCanvas = () => {
  const [context, setContext] = useState<Nullable<CanvasRenderingContext2D>>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (canvas) {
      const context = canvas.getContext('2d');
      setContext(context);
    }
  }, [canvasRef]);

  const clear = useCallback(() => {
    if (!context) return;

    const {
      canvas: { height, width },
    } = context;

    context.clearRect(0, 0, width, height);
  }, [context]);

  return useMemo(
    () => ({
      canvasRef,
      clear,
      context,
    }),
    [clear, context],
  );
};
