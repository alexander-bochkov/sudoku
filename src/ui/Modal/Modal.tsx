import { memo } from 'react';
import { getStyleFromDimensions } from 'utils/board';
import { Overlay } from '../Overlay';
import type { PropsWithChildren } from 'react';
import type { Dimensions } from 'types/board';
import styles from './Modal.module.scss';

interface ModalAction {
  callback: () => void;
  label: string;
}

interface ModalProps {
  dimensions: Dimensions;
  primaryAction: ModalAction;
  secondaryAction?: ModalAction;
  title: string;
}

export const Modal = memo(function Modal({
  children,
  dimensions,
  primaryAction,
  secondaryAction,
  title,
}: PropsWithChildren<ModalProps>) {
  return (
    <Overlay>
      <div className={styles.modal} style={getStyleFromDimensions(dimensions)}>
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
});
