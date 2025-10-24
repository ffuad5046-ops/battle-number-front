import React, { useState } from "react";
import styles from "./tooltip.module.scss";

interface TooltipProps {
    message: string;
    children: React.ReactNode;
    disabled?: boolean;
}

export const Tooltip = ({ message, children, disabled }: TooltipProps) => {
    const [visible, setVisible] = useState(false);

    return (
        <div
            className={styles.wrapper}
            onMouseEnter={() => !disabled && setVisible(true)}
            onMouseLeave={() => setVisible(false)}
        >
            {children}
            {visible && <div className={styles.tooltip}>{message}</div>}
        </div>
    );
};