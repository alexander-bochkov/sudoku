import { Icon } from '../Icon';
import type { FC } from 'react';
import styles from './Button.module.scss';

interface ButtonPropsNumber {
  number: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
  withEraser?: never;
  withPause?: never;
  onClick: () => void;
}

interface ButtonPropsEraser {
  number?: never;
  withEraser: boolean;
  withPause?: never;
  onClick: () => void;
}

interface ButtonPropsPause {
  number?: never;
  withEraser?: never;
  withPause: boolean;
  onClick: () => void;
}

type ButtonProps = ButtonPropsNumber | ButtonPropsEraser | ButtonPropsPause;

export const Button: FC<ButtonProps> = ({ number, withEraser, withPause, onClick }) => {
  const getContent = () => {
    if (number) return number;
    if (withEraser) return <Icon name="eraser" size={38} />;
    if (withPause) return <Icon name="pause" size={38} />;
  };

  const content = getContent();

  return (
    <button className={styles.button} onClick={onClick}>
      {content}
    </button>
  );
};
