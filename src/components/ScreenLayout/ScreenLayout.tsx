import type { FC, ReactNode } from 'react';
import styles from './ScreenLayout.module.scss';

type ScreenLayoutProps = {
  content: ReactNode;
  heading: ReactNode;
};

export const ScreenLayout: FC<ScreenLayoutProps> = ({ content, heading }) => {
  return (
    <div className={styles.screenLayout}>
      <div className={styles.headingWrapper}>{heading}</div>
      {content}
    </div>
  );
};
