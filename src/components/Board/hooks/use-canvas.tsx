import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useParamsContext } from 'contexts';
import { useDevicePixelRatio } from './use-device-pixel-ratio';
import type { Nullable } from 'types/utility-types';
import styles from '../Board.module.scss';

export const useCanvas = () => {
  const [context, setContext] = useState<Nullable<CanvasRenderingContext2D>>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const ratio = useDevicePixelRatio();
  const { dimensions } = useParamsContext();

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
  }, [canvasRef, ratio]);

  const clear = useCallback(() => {
    if (!context) return;

    const {
      canvas: { height, width },
    } = context;

    context.clearRect(0, 0, width, height);
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
  }, [context, ratio]);

  return useMemo(
    () => ({
      canvas,
      clear,
      context,
    }),
    [canvas, clear, context],
  );
};
