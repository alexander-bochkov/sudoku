import { useMemo, useState } from 'react';
import type { Status } from '../types';

export const useStatus = () => {
  const [status, setStatus] = useState<Status>('idle');
  return useMemo(() => ({ changeStatus: setStatus, status }), [status]);
};
