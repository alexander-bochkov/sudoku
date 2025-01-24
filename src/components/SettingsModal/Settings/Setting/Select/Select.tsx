import { Icon } from 'ui';
import type { Setting } from '../../types';
import styles from './Select.module.scss';

type SelectProps<T> = Omit<Setting<T>, 'label'>;

export const Select = <T,>({ options, value, onChange }: SelectProps<T>) => {
  const handlePrevious = () => {
    const valueIdx = options.findIndex((option) => option.value === value);

    if (valueIdx === -1) return;

    const previousValueIdx = valueIdx - 1;

    if (previousValueIdx < 0) {
      onChange(options[options.length - 1].value);
    } else {
      onChange(options[previousValueIdx].value);
    }
  };

  const handleNext = () => {
    const valueIdx = options.findIndex((option) => option.value === value);

    if (valueIdx === -1) return;

    const nextValueIdx = (valueIdx + 1) % options.length;
    onChange(options[nextValueIdx].value);
  };

  const label = options.find((option) => option.value === value)?.label;

  return (
    <div className={styles.select}>
      <button className={styles.select__control} onClick={handlePrevious}>
        <Icon name="arrowLeft" size={20} />
      </button>
      <p className={styles.select__label}>{label}</p>
      <button className={styles.select__control} onClick={handleNext}>
        <Icon name="arrowRight" size={20} />
      </button>
    </div>
  );
};
