import { useEffect } from 'react';
import { createTemplateBoard, validateBoard } from '../utils';

export const useSudoku = () => {
  useEffect(() => {
    const template = createTemplateBoard();
    console.log('template: ', template);

    const isTemplateValid = validateBoard(template);
    console.log('isTemplateValid: ', isTemplateValid);
  }, []);
};
