import { useCallback, useMemo, useState } from 'react';
import type { CellCoords } from 'types/board';
import type { Nullable } from 'types/utility-types';

export const useSelectedCell = () => {
  const [selectedCell, setSelectedCell] = useState<Nullable<CellCoords>>(null);

  const changeSelectedCell = useCallback((selectedCell: Nullable<CellCoords>) => {
    setSelectedCell((prevSelectedCell) => {
      if (
        prevSelectedCell &&
        prevSelectedCell.rowIdx === selectedCell?.rowIdx &&
        prevSelectedCell.cellIdx === selectedCell.cellIdx
      ) {
        return null;
      }

      return selectedCell;
    });
  }, []);

  return useMemo(() => ({ changeSelectedCell, selectedCell }), [changeSelectedCell, selectedCell]);
};
