import { useState } from 'react';

import type { Coords } from 'types/board';
import type { Nullable } from 'types/utility-types';

export const useSelectedCell = () => {
  const [selectedCell, setSelectedCell] = useState<Nullable<Coords>>(null);

  const handleSelectedCellChange = (selectedCell: Nullable<Coords>) => {
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
  };

  return [selectedCell, handleSelectedCellChange] as const;
};
