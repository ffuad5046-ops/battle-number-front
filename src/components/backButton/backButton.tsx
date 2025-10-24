import React from "react";
import {useNavigate} from "react-router-dom";

import styles from "./backButton.module.scss";

const BackButton = () => {
    const navigate = useNavigate();

    return (
        <div className={styles.header} onClick={() => navigate(-1)}>
            <button className={styles.backButton}>
                ←
            </button>
        </div>
    )
}

export default BackButton