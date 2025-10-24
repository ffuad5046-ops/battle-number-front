import React from "react";
import styles from "./spinner.module.scss";

interface SpinnerProps {
    size?: number;
    text?: string;
}

export const Spinner: React.FC<SpinnerProps> = ({ size = 60, text }) => {
    return (
        <div className={styles.wrapper}>
            <div
                className={styles.spinner}
                style={{ width: size, height: size }}
            ></div>
            {text && <p className={styles.text}>{text}</p>}
        </div>
    );
};
