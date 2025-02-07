import { Select } from './Select';

import type { Setting } from 'types/settings';

import styles from './Settings.module.scss';

type Item<T> = {
  label: Setting<T>['label'];
  options: Setting<T>['options'];
  value: Setting<T>['value'];
  onChange: Setting<T>['onChange'];
};

type SettingsProps<T> = {
  items: Item<T>[];
};

export const Settings = <T,>({ items }: SettingsProps<T>) => (
  <div className={styles.settings}>
    {items.map(({ label, ...rest }, idx) => (
      <div className={styles.settings__settingLayout} key={idx}>
        <span className={styles.settings__label}>{label}</span>
        <Select {...rest} />
      </div>
    ))}
  </div>
);
