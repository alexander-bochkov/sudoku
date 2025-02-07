import clsx from 'clsx';

import styles from './Menu.module.scss';

const MAIN_ITEM_IDX = 0;

type Item = {
  callback: () => void;
  label: string;
};

type MenuProps = {
  items: Item[];
};

export const Menu = ({ items }: MenuProps) => (
  <div className={styles.menu}>
    {items.map(({ callback, label }, idx) => (
      <button
        className={clsx(styles.menu__item, { [styles.menu__item_main]: idx === MAIN_ITEM_IDX })}
        key={label}
        onClick={callback}
      >
        {label}
      </button>
    ))}
  </div>
);
