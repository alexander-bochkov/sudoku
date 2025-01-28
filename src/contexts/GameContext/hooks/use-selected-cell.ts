import { useCallback, useMemo, useState } from 'react';
import type { CellCoords } from 'types/board';
import type { Nullable } from 'types/utility-types';

export const useSelectedCell = () => {
  const [selectedCell, setSelectedCell] = useState<Nullable<CellCoords>>(null);

  const changeSelectedCell = useCallback((nextSelectedCell: Nullable<CellCoords>) => {
    setSelectedCell((prevSelectedCell) => {
      if (
        prevSelectedCell &&
        prevSelectedCell.rowIdx === nextSelectedCell?.rowIdx &&
        prevSelectedCell.cellIdx === nextSelectedCell.cellIdx
      ) {
        return null;
      }

      return nextSelectedCell;
    });
  }, []);

  return useMemo(() => ({ changeSelectedCell, selectedCell }), [changeSelectedCell, selectedCell]);
};
