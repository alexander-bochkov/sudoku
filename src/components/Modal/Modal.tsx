import type { FC } from 'react';
import styles from './Modal.module.scss';

type ModalProps = {
  bottomButton: string;
  size: number;
  title: string;
  topButton?: string;
  onBottomButtonClick: () => void;
  onTopButtonClick?: () => void;
};

export const Modal: FC<ModalProps> = ({
  bottomButton,
  size,
  title,
  topButton,
  onBottomButtonClick,
  onTopButtonClick,
}) => {
  return (
    <div className={styles.backdrop}>
      <div className={styles.modal} style={{ height: size, width: size }}>
        <p className={styles.title}>{title}</p>
        <div className={styles.buttonsLayout}>
          {topButton && (
            <p className={styles.button} onClick={onTopButtonClick}>
              {topButton}
            </p>
          )}
          {bottomButton && (
            <p className={styles.button} onClick={onBottomButtonClick}>
              {bottomButton}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
