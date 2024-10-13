import { useBoardContext } from 'contexts';
import { ActionCanvas } from './ActionCanvas';
import { SolutionCanvas } from './SolutionCanvas';
import { StaticCanvas } from './StaticCanvas';
import { getBoardStyle } from './utils';
import styles from './Board.module.scss';

export const Board = () => {
  const { dimensions, selectedCell, setSelectedCell, errors, prefilledBoard, solutionBoard } = useBoardContext();

  if (!dimensions) return;

  return (
    <div className={styles.board} style={getBoardStyle(dimensions.board, dimensions.cell)}>
      <StaticCanvas className={styles.canvas} dimensions={dimensions} prefilledBoard={prefilledBoard} />
      <SolutionCanvas className={styles.canvas} dimensions={dimensions} errors={errors} solutionBoard={solutionBoard} />
      <ActionCanvas
        className={styles.canvas}
        dimensions={dimensions}
        prefilledBoard={prefilledBoard}
        selectedCell={selectedCell}
        setSelectedCell={setSelectedCell}
      />
    </div>
  );
};
