import { ICONS } from './constants';
import styles from './Icon.module.scss';

interface IconProps {
  name: keyof typeof ICONS;
  size: 20 | 38 | 72;
}

export const Icon = ({ name, size }: IconProps) => {
  const Icon = ICONS[name];
  return <Icon className={styles.icon} height={size} width={size} />;
};
