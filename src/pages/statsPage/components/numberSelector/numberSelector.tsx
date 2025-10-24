import React, { useState } from "react";
import styles from "./numberSelector.module.scss";

interface NumberSelectorProps {
    unguessedNumbers: { number: number }[];
    onSelect: (number: number) => void;
}

export const NumberSelector: React.FC<NumberSelectorProps> = ({ unguessedNumbers, onSelect }) => {
    const [page, setPage] = useState(1);
    const perPage = 50;

    const totalPages = Math.ceil(unguessedNumbers.length / perPage);
    const start = (page - 1) * perPage;
    const end = start + perPage;
    const currentNumbers = unguessedNumbers.slice(start, end);

    return (
        <div className={styles.container}>
            <div className={styles.numbersGrid}>
                {currentNumbers.map((i) => (
                    <button
                        key={i.number}
                        className={styles.numberButton}
                        onClick={() => onSelect(i.number)}
                    >
                        {i.number}
                    </button>
                ))}
            </div>

            {totalPages > 1 && (
                <div className={styles.pagination}>
                    <button
                        className={styles.pageButton}
                        disabled={page === 1}
                        onClick={() => setPage((p) => p - 1)}
                    >
                        ←
                    </button>

                    <span className={styles.pageInfo}>
            {page} / {totalPages}
          </span>

                    <button
                        className={styles.pageButton}
                        disabled={page === totalPages}
                        onClick={() => setPage((p) => p + 1)}
                    >
                        →
                    </button>
                </div>
            )}
        </div>
    );
};
