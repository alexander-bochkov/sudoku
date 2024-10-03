import type { FC, ReactNode } from 'react';
import styles from './ScreenLayout.module.scss';

type ScreenLayoutProps = {
  content: ReactNode;
  heading: ReactNode;
  isGame?: boolean;
};

export const ScreenLayout: FC<ScreenLayoutProps> = ({ content, heading, isGame = false }) => {
  return (
    <div className={`${styles.screenLayout} ${isGame ? styles.screenLayout_game : ''}`}>
      <div className={styles.headingWrapper}>{heading}</div>
      {content}
    </div>
  );
};
