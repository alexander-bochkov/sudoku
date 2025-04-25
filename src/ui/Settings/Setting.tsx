import { Select } from './Select';

import type { Setting as ISetting } from 'types/settings';

import styles from './Setting.module.scss';

type SettingProps<T> = {
  label: ISetting<T>['label'];
  options: ISetting<T>['options'];
  value: ISetting<T>['value'];
  onChange: ISetting<T>['onChange'];
};

export const Setting = <T,>({ label, ...rest }: SettingProps<T>) => (
  <div className={styles.setting}>
    <span className={styles.setting__label}>{label}</span>
    <Select {...rest} />
  </div>
);
