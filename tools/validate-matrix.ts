const CELLS_IN_ZONE = 3;
const NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export const validateMatrix = (matrix: number[][]) => {
  const printError = (type: 'column' | 'row' | 'zone', fragment: number[], fragmentIdx: number, message: string) => {
    console.error(`${type.toUpperCase()} ${fragmentIdx}-idx: ${message}. Fragment:`, fragment);
  };

  const hasCorrectLength = (fragment: number[]) => fragment.length === NUMBERS.length;
  const hasValidValues = (fragment: number[]) => NUMBERS.every((number) => fragment.includes(number));

  const getValidateFragmentFn = (type: 'column' | 'row' | 'zone') => (fragment: number[], fragmentIdx: number) => {
    if (!hasCorrectLength(fragment)) {
      printError(type, fragment, fragmentIdx, 'has incorrect length');
      return false;
    }

    if (!hasValidValues(fragment)) {
      printError(type, fragment, fragmentIdx, 'has invalid values');
      return false;
    }

    return true;
  };

  const validateRows = () => matrix.every(getValidateFragmentFn('row'));

  const validateColumns = () => {
    const columns = matrix.map((row, rowIdx) => row.map((_, cellIdx) => matrix[cellIdx][rowIdx]));
    return columns.every(getValidateFragmentFn('column'));
  };

  const validateZones = () => {
    const zones = matrix.map((row, rowIdx) =>
      row.map((_, cellIdx) => {
        const zoneIdxX = Math.floor(cellIdx / CELLS_IN_ZONE);
        const zoneIdxY = Math.floor(rowIdx / CELLS_IN_ZONE);

        const cellIdxInZoneX = cellIdx % CELLS_IN_ZONE;
        const cellIdxInZoneY = rowIdx % CELLS_IN_ZONE;

        const targetRowIdx = zoneIdxX + zoneIdxY * CELLS_IN_ZONE;
        const targetCellIdx = cellIdxInZoneX + cellIdxInZoneY * CELLS_IN_ZONE;

        return matrix[targetRowIdx][targetCellIdx];
      }),
    );

    return zones.every(getValidateFragmentFn('zone'));
  };

  return validateRows() && validateColumns() && validateZones();
};
