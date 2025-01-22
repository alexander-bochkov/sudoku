import { Button } from '../Button';
import type { FC } from 'react';
import type { NumberRange } from 'types/board';
import styles from './Numpad.module.scss';

const NUMERIC_BUTTONS: NumberRange[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];

interface NumpadProps {
  onErase: () => void;
  onNumberSelect: (selectedNumber: NumberRange) => void;
}

export const Numpad: FC<NumpadProps> = ({ onErase, onNumberSelect }) => (
  <div className={styles.numpad}>
    {NUMERIC_BUTTONS.map((number) => (
      <Button
        key={number}
        number={number}
        onClick={() => {
          onNumberSelect(number);
        }}
      />
    ))}
    <Button icon="eraser" onClick={onErase} />
  </div>
);
