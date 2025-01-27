import { useMemo } from 'react';
import { generateTemplateMatrix } from './utils';

export const useBoard = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const templateMatrix = useMemo(() => generateTemplateMatrix(), []);

  return {};
};
