import { Icon } from '../Icon';

import type { ComponentPropsWithoutRef } from 'react';
import type { NumberRange } from 'types/board';

import styles from './Button.module.scss';

type IconicButtonProps = {
  icon: ComponentPropsWithoutRef<typeof Icon>['name'];
  number?: never;
  onClick: () => void;
};

type NumericButtonProps = {
  icon?: never;
  number: NumberRange;
  onClick: () => void;
};

type ButtonProps = IconicButtonProps | NumericButtonProps;

export const Button = ({ icon, number, onClick }: ButtonProps) => (
  <button className={styles.button} onClick={onClick}>
    {number ?? <Icon name={icon} size={38} />}
  </button>
);
