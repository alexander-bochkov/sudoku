import { Button } from '../Button';

import type { Digit } from 'types/sudoku';
import type { Nullable } from 'types/utility-types';

import styles from './Numpad.module.scss';

const NUMERIC_BUTTONS: Digit[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];

type NumpadProps = {
  onClick: (value: Nullable<Digit>) => void;
};

export const Numpad = ({ onClick }: NumpadProps) => (
  <div className={styles.numpad}>
    {NUMERIC_BUTTONS.map((number) => (
      <Button
        key={number}
        number={number}
        onClick={() => {
          onClick(number);
        }}
      />
    ))}
    <Button
      icon="eraser"
      onClick={() => {
        onClick(null);
      }}
    />
  </div>
);
