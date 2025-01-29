import { Select } from './Select';

import type { Setting as SettingProps } from '../types';

import styles from './Setting.module.scss';

export const Setting = <T,>({ label, ...rest }: SettingProps<T>) => (
  <div className={styles.setting}>
    <span className={styles.setting__label}>{label}</span>
    <Select {...rest} />
  </div>
);
