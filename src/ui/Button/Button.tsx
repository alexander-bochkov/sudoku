import { Icon } from '../Icon';
import type { ComponentPropsWithoutRef, FC } from 'react';
import type { NumberRange } from 'types/board';
import styles from './Button.module.scss';

interface IconicButtonProps {
  icon: ComponentPropsWithoutRef<typeof Icon>['name'];
  number?: never;
  onClick: () => void;
}

interface NumericButtonProps {
  icon?: never;
  number: NumberRange;
  onClick: () => void;
}

type ButtonProps = IconicButtonProps | NumericButtonProps;

export const Button: FC<ButtonProps> = ({ icon, number, onClick }) => (
  <button className={styles.button} onClick={onClick}>
    {number ?? <Icon name={icon} size={38} />}
  </button>
);
