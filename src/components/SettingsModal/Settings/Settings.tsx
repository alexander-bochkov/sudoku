import { useMemo } from 'react';

import { useLanguageSetting } from './hooks';
import { Setting } from './Setting';

import styles from './Settings.module.scss';

export const Settings = () => {
  const languageSetting = useLanguageSetting();

  const settings = useMemo(() => [languageSetting], [languageSetting]);

  return (
    <div className={styles.settings}>
      {settings.map((setting, idx) => (
        <Setting key={idx} {...setting} />
      ))}
    </div>
  );
};
