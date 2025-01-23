import type { FC, PropsWithChildren } from 'react';
import styles from './Overlay.module.scss';

export const Overlay: FC<PropsWithChildren> = ({ children }) => <div className={styles.overlay}>{children}</div>;
