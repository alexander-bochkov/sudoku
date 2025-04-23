import type { PropsWithChildren } from 'react';

import styles from './Settings.module.scss';

export const Settings = ({ children }: PropsWithChildren) => <div className={styles.settings}>{children}</div>;
