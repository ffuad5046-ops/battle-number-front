import React, { useEffect, useState } from "react";
import styles from "./alert.module.scss";

interface AlertProps {
    type: "success" | "error";
    message: string;
    visible: boolean;
    onClose?: () => void;
    autoHide?: number;
}

const Alert: React.FC<AlertProps> = ({ type, message, visible, onClose, autoHide }) => {
    const [show, setShow] = useState(visible);

    useEffect(() => {
        if (visible) setShow(true);
        else {
            const timer = setTimeout(() => setShow(false), 300);
            return () => clearTimeout(timer);
        }
    }, [visible]);

    useEffect(() => {
        if (autoHide && visible) {
            const timer = setTimeout(() => {
                onClose?.();
            }, autoHide);
            return () => clearTimeout(timer);
        }
    }, [autoHide, visible, onClose]);

    if (!show) return null;

    return (
        <div className={styles['alert-container']}>
            <div
                className={`${styles.alert} ${type === "success" ? styles.success : styles.error} ${
                    visible ? styles.show : styles.hide
                }`}
            >
                <span className={styles.message}>{message}</span>
                {onClose && (
                    <button className={styles.close} onClick={onClose}>
                        ×
                    </button>
                )}
            </div>
        </div>
    );
};

export default Alert;
