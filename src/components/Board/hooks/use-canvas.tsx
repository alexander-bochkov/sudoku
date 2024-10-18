import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useBoardContext } from 'contexts';
import type { Nullable } from 'types/utility-types';
import styles from '../Board.module.scss';

export const useCanvas = () => {
  const [context, setContext] = useState<Nullable<CanvasRenderingContext2D>>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const ratio = window.devicePixelRatio;

  const { dimensions } = useBoardContext();

  const canvas = useMemo(() => {
    if (!dimensions) return;

    return (
      <canvas
        className={styles.board__canvas}
        height={dimensions.board * ratio}
        ref={canvasRef}
        width={dimensions.board * ratio}
      ></canvas>
    );
  }, [dimensions, ratio]);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const context = canvas.getContext('2d');
    setContext(context);

    if (!context) return;

    context.setTransform(ratio, 0, 0, ratio, 0, 0);
  }, [canvasRef, ratio]);

  const clear = useCallback(() => {
    if (!context) return;

    const {
      canvas: { height, width },
    } = context;

    context.clearRect(0, 0, width, height);
  }, [context]);

  return useMemo(
    () => ({
      canvas,
      clear,
      context,
    }),
    [canvas, clear, context],
  );
};
