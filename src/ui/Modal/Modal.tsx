import { memo } from 'react';

import { Overlay } from '../Overlay';

import type { PropsWithChildren } from 'react';

import styles from './Modal.module.scss';

interface Action {
  callback: () => void;
  label: string;
}

interface ModalProps {
  primaryAction: Action;
  secondaryAction?: Action;
  title: string;
}

const Modal = ({ children, primaryAction, secondaryAction, title }: PropsWithChildren<ModalProps>) => (
  <Overlay>
    <div className={styles.modal}>
      <p className={styles.modal__title}>{title}</p>
      <div className={styles.modal__content}>{children}</div>
      <div className={styles.modal__actionsLayout}>
        {secondaryAction && (
          <button className={styles.modal__action} onClick={secondaryAction.callback}>
            {secondaryAction.label}
          </button>
        )}
        <button className={styles.modal__action} onClick={primaryAction.callback}>
          {primaryAction.label}
        </button>
      </div>
    </div>
  </Overlay>
);

export default memo(Modal);
