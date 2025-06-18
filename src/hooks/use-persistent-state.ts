import { useCallback, useMemo, useSyncExternalStore } from 'react';

import type { STORAGE_KEYS } from 'constants/storage';
import type { Nullable, Optional } from 'types/utility-types';

type StorageKey = (typeof STORAGE_KEYS)[keyof typeof STORAGE_KEYS];

type Options = {
  returnUndefined?: boolean;
};

type Return<T, V> = [V, (value: Nullable<T>) => void];

const DEFAULT_OPTIONS: Options = {
  returnUndefined: false,
};

export function usePersistentState<T>(
  key: StorageKey,
  options?: Options & { returnUndefined?: false },
): Return<T, Nullable<T>>;
export function usePersistentState<T>(
  key: StorageKey,
  options: Options & { returnUndefined: true },
): Return<T, Optional<T>>;

export function usePersistentState<T>(
  key: StorageKey,
  options: Options = DEFAULT_OPTIONS,
): Return<T, Nullable<T> | Optional<T>> {
  const { returnUndefined } = options;

  const subscribe = useCallback(
    (onChange: () => void) => {
      const handleStorageChange = (event: StorageEvent) => {
        event.key === key && onChange();
      };

      window.addEventListener('storage', handleStorageChange);

      return () => {
        window.removeEventListener('storage', handleStorageChange);
      };
    },
    [key],
  );

  const getSnapshot = () => localStorage.getItem(key);

  const rawValue = useSyncExternalStore(subscribe, getSnapshot);

  const value = useMemo(() => {
    if (rawValue === null) return returnUndefined ? undefined : null;

    try {
      return JSON.parse(rawValue) as T;
    } catch (_) {
      return rawValue as T;
    }
  }, [rawValue, returnUndefined]);

  const dispatchStorageEvent = useCallback(() => {
    window.dispatchEvent(new StorageEvent('storage', { key }));
  }, [key]);

  const setValue = useCallback(
    (value: Nullable<T>) => {
      const storageValue = localStorage.getItem(key);

      if (value === null) {
        if (storageValue !== null) {
          localStorage.removeItem(key);
          dispatchStorageEvent();
        }

        return;
      }

      const nextValue = typeof value === 'string' ? value : JSON.stringify(value);

      if (nextValue === storageValue) return;

      localStorage.setItem(key, nextValue);
      dispatchStorageEvent();
    },
    [dispatchStorageEvent, key],
  );

  return [value, setValue];
}
