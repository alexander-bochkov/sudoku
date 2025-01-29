import { memo, PropsWithChildren } from 'react';

import styles from '../Board.module.scss';

const Row = ({ children }: PropsWithChildren) => <tr className={styles.board__row}>{children}</tr>;

export default memo(Row);
