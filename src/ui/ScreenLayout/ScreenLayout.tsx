import type { ReactNode } from 'react';

import styles from './ScreenLayout.module.scss';

interface ScreenLayoutProps {
  content: ReactNode;
  header?: ReactNode;
}

export const ScreenLayout = ({ content, header }: ScreenLayoutProps) => (
  <div className={styles.screenLayout}>
    {header && <div>{header}</div>}
    <div className={styles.screenLayout__content}>{content}</div>
  </div>
);
