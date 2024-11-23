import { useScreenContext } from 'contexts';
import styles from './StartButton.module.scss';

export const StartButton = () => {
  const { onScreenChange } = useScreenContext();
  return (
    <button
      className={styles.startButton}
      onClick={() => {
        onScreenChange('game');
      }}
    >
      Start game
    </button>
  );
};
