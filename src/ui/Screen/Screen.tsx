import type { PropsWithChildren } from 'react';

import styles from './Screen.module.scss';

export const Screen = ({ children }: PropsWithChildren) => (
  <div className={styles.screen}>
    <div className={styles.screen__content}>{children}</div>
  </div>
);
