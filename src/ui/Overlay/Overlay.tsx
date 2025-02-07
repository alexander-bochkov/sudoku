import clsx from 'clsx';

import type { PropsWithChildren } from 'react';

import styles from './Overlay.module.scss';

type OverlayProps = {
  className?: string;
};

export const Overlay = ({ children, className }: PropsWithChildren<OverlayProps>) => (
  <div className={clsx(styles.overlay, className)}>{children}</div>
);
