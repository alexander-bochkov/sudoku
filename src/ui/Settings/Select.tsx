import { Icon } from '../Icon';

import type { Setting } from 'types/settings';

import styles from './Settings.module.scss';

type SelectProps<T> = {
  options: Setting<T>['options'];
  value: Setting<T>['value'];
  onChange: Setting<T>['onChange'];
};

export const Select = <T,>({ options, value, onChange }: SelectProps<T>) => {
  const handlePrevious = () => {
    const valueIdx = options.findIndex((option) => option.value === value);
    const targetIdx = valueIdx === 0 ? options.length - 1 : valueIdx - 1;
    onChange(options[targetIdx].value);
  };

  const handleNext = () => {
    const valueIdx = options.findIndex((option) => option.value === value);
    const targetIdx = (valueIdx + 1) % options.length;
    onChange(options[targetIdx].value);
  };

  const label = options.find((option) => option.value === value)?.label;

  return (
    <div className={styles.settings__select}>
      <button className={styles.settings__selectControl} onClick={handlePrevious}>
        <Icon name="arrowLeft" size={20} />
      </button>
      <p className={styles.settings__selectLabel}>{label}</p>
      <button className={styles.settings__selectControl} onClick={handleNext}>
        <Icon name="arrowRight" size={20} />
      </button>
    </div>
  );
};
