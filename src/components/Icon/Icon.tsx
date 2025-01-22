import { ICONS_MAP } from './constants';
import type { FC } from 'react';
import styles from './Icon.module.scss';

interface IconProps {
  name: keyof typeof ICONS_MAP;
  size: 20 | 38 | 72;
}

export const Icon: FC<IconProps> = ({ name, size }) => {
  const Icon = ICONS_MAP[name];
  return <Icon className={styles.icon} height={size} width={size} />;
};
