import { Icon } from '../Icon';
import { Overlay } from '../Overlay';

import styles from './Loader.module.scss';

export const Loader = () => (
  <Overlay className={styles.loaderLayout}>
    <Icon className={styles.loader} name="spinner" size={72} />
  </Overlay>
);
