import { Icon } from '../Icon';
import type { ComponentPropsWithoutRef, FC } from 'react';
import styles from './Button.module.scss';

interface ButtonPropsIcon {
  icon: ComponentPropsWithoutRef<typeof Icon>['name'];
  number?: never;
  onClick: () => void;
}

interface ButtonPropsNumber {
  icon?: never;
  number: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
  onClick: () => void;
}

type ButtonProps = ButtonPropsIcon | ButtonPropsNumber;

export const Button: FC<ButtonProps> = ({ icon, number, onClick }) => (
  <button className={styles.button} onClick={onClick}>
    {number ?? <Icon name={icon} size={38} />}
  </button>
);
