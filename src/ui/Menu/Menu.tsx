import clsx from 'clsx';
import { memo } from 'react';
import styles from './Menu.module.scss';

const MAIN_ITEM_INDEX = 0;

interface MenuItem {
  callback: () => void;
  label: string;
}

interface MenuProps {
  items: MenuItem[];
}

export const Menu = memo(function Menu({ items }: MenuProps) {
  return (
    <div className={styles.menu}>
      {items.map(({ callback, label }, index) => (
        <button
          className={clsx(styles.menu__item, { [styles.menu__item_main]: index === MAIN_ITEM_INDEX })}
          key={label}
          onClick={callback}
        >
          {label}
        </button>
      ))}
    </div>
  );
});
