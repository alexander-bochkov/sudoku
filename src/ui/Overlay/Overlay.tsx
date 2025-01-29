import type { PropsWithChildren } from 'react';

import styles from './Overlay.module.scss';

export const Overlay = ({ children }: PropsWithChildren) => <div className={styles.overlay}>{children}</div>;
