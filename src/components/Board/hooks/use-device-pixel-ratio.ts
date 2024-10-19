import { useCallback, useEffect, useMemo, useState } from 'react';

export const useDevicePixelRatio = () => {
  const [ratio, setRatio] = useState<Window['devicePixelRatio']>(window.devicePixelRatio);

  const observeRatioChange = useCallback(
    (callback: () => void) => {
      const mediaQueryList = window.matchMedia(`(resolution: ${ratio}x)`);
      mediaQueryList.addEventListener('change', callback);

      return () => mediaQueryList.removeEventListener('change', callback);
    },
    [ratio],
  );

  useEffect(() => {
    const handleRatioChange = () => {
      const nextRatio = window.devicePixelRatio;
      setRatio((prevRatio) => (prevRatio !== nextRatio ? nextRatio : prevRatio));
    };

    const clear = observeRatioChange(handleRatioChange);
    return clear;
  }, [observeRatioChange]);

  return useMemo(() => ratio, [ratio]);
};
