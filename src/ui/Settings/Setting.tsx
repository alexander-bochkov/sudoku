import { Select } from './Select';

import type { Setting as SettingType } from 'types/settings';

import styles from './Setting.module.scss';

type SettingProps<T> = {
  label: SettingType<T>['label'];
  options: SettingType<T>['options'];
  value: SettingType<T>['value'];
  onChange: SettingType<T>['onChange'];
};

export const Setting = <T,>({ label, ...rest }: SettingProps<T>) => (
  <div className={styles.setting}>
    <span className={styles.setting__label}>{label}</span>
    <Select {...rest} />
  </div>
);
