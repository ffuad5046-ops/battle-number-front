import React, { useEffect, useState } from "react";

type TurnTimerProps = {
    turnDeadline?: string | null; // время конца хода, например "2025-10-19T13:12:35.000Z"
    onTimeOut?: () => void; // вызывается, когда время вышло
};

const TurnTimer: React.FC<TurnTimerProps> = ({ turnDeadline, onTimeOut }) => {
    const [timeLeft, setTimeLeft] = useState<number>(0);

    useEffect(() => {
        if (!turnDeadline) return;

        const deadline = new Date(turnDeadline).getTime();

        const update = () => {
            const now = Date.now();
            const diff = Math.max(0, Math.floor((deadline - now) / 1000)); // в секундах
            setTimeLeft(diff);

            if (diff <= 0 && onTimeOut) {
                onTimeOut();
            }
        };

        update();
        const interval = setInterval(update, 1000);

        return () => clearInterval(interval);
    }, [turnDeadline]);

    return (
        <div
            style={{
                background: timeLeft > 5 ? "#1f1f1f" : "#3a0000",
                color: timeLeft > 5 ? "#00ffae" : "#ff5555",
                padding: "6px 12px",
                borderRadius: "8px",
                fontSize: "16px",
                fontWeight: "600",
                width: "fit-content",
                transition: "all 0.3s ease",
            }}
        >
            ⏳ Осталось: {timeLeft} с
        </div>
    );
};

export default TurnTimer;
