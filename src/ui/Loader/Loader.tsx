import { Icon } from '../Icon';
import { Overlay } from '../Overlay';

import styles from './Loader.module.scss';

export const Loader = () => (
  <Overlay className={styles.loaderLayout}>
    <div className={styles.loader}>
      <Icon name="spinner" size={72} />
    </div>
  </Overlay>
);
