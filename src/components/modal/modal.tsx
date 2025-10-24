import React from "react";
import styles from "./modal.module.scss";

interface ModalProps {
    isOpen: boolean;
    title?: string;
    children?: React.ReactNode;
    onClose?: () => void;
    size?: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, title, children, onClose, size = 'medium' }) => {
    if (!isOpen) return null;

    return (
        <div className={`${styles['modal-overlay']} ${size === 'big' ? styles['modal-overlay-big'] : styles['modal-overlay-medium']}`} onClick={onClose}>
            <div
                className={styles['modal-content']}
                onClick={(e) => e.stopPropagation()} // чтобы клик внутри не закрывал
            >
                {title && <h2 className={styles['modal-title']}>{title}</h2>}
                <div className={styles['modal-body']}>{children}</div>

                {onClose && (
                    <button className={styles['modal-btn']} onClick={onClose}>
                        Закрыть
                    </button>
                )}
            </div>
        </div>
    );
};

export default Modal;