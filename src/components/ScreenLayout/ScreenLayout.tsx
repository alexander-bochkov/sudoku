import clsx from 'clsx';
import type { FC, ReactNode } from 'react';
import styles from './ScreenLayout.module.scss';

interface ScreenLayoutProps {
  content: ReactNode;
  header: ReactNode;
  isMenu?: boolean;
}

export const ScreenLayout: FC<ScreenLayoutProps> = ({ content, header, isMenu }) => (
  <div className={styles.screenLayout}>
    <div className={clsx(styles.screenLayout__header, { [styles.screenLayout__header_persistent]: isMenu })}>
      {header}
    </div>
    <div className={styles.screenLayout__content}>{content}</div>
  </div>
);
