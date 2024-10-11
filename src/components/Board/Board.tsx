import { useBoardContext } from 'contexts';
import { ActionCanvas } from './ActionCanvas';
import { StaticCanvas } from './StaticCanvas';
import { getBoardStyle } from './utils';
import styles from './Board.module.scss';

export const Board = () => {
  const { board, dimensions } = useBoardContext();

  if (!board || !dimensions) return;

  return (
    <div className={styles.board} style={getBoardStyle(dimensions.board, dimensions.cell)}>
      <StaticCanvas className={styles.canvas} dimensions={dimensions} prefilledBoard={board.prefilled} />
      <ActionCanvas className={styles.canvas} dimensions={dimensions} prefilledBoard={board.prefilled} />
    </div>
  );
};
