import type { FC } from 'react';
import styles from './Modal.module.scss';

interface ModalProps {
  bottomButton: string;
  size: number;
  title: string;
  topButton?: string;
  onBottomButtonClick: () => void;
  onTopButtonClick?: () => void;
}

export const Modal: FC<ModalProps> = ({
  bottomButton,
  size,
  title,
  topButton,
  onBottomButtonClick,
  onTopButtonClick,
}) => (
  <div className={styles.backdrop}>
    <div className={styles.modal} style={{ height: size, width: size }}>
      <p className={styles.modal__title}>{title}</p>
      <div className={styles.modal__buttonsLayout}>
        {topButton && (
          <button className={styles.modal__button} onClick={onTopButtonClick}>
            {topButton}
          </button>
        )}
        {bottomButton && (
          <button className={styles.modal__button} onClick={onBottomButtonClick}>
            {bottomButton}
          </button>
        )}
      </div>
    </div>
  </div>
);
