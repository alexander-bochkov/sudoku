import { useBoardContext } from 'contexts';
import { ActionCanvas } from './ActionCanvas';
import { SolutionCanvas } from './SolutionCanvas';
import { StaticCanvas } from './StaticCanvas';
import { getStyleFromDimensions } from 'utils/board';
import styles from './Board.module.scss';

export const Board = () => {
  const { dimensions, selectedCell, setSelectedCell, errors, prefilledBoard, solutionBoard } = useBoardContext();

  if (!dimensions) return;

  return (
    <div className={styles.board} style={getStyleFromDimensions(dimensions)}>
      <StaticCanvas dimensions={dimensions} prefilledBoard={prefilledBoard} />
      <SolutionCanvas dimensions={dimensions} errors={errors} solutionBoard={solutionBoard} />
      <ActionCanvas
        dimensions={dimensions}
        prefilledBoard={prefilledBoard}
        selectedCell={selectedCell}
        setSelectedCell={setSelectedCell}
      />
    </div>
  );
};
