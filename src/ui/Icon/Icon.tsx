import clsx from 'clsx';

import { ICONS } from './constants';

import styles from './Icon.module.scss';

type IconProps = {
  className?: string;
  name: keyof typeof ICONS;
  size: 20 | 38 | 72;
};

export const Icon = ({ className, name, size }: IconProps) => {
  const Icon = ICONS[name];
  return <Icon className={clsx(styles.icon, className)} height={size} width={size} />;
};
