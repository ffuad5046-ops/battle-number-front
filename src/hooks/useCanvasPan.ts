import { useRef, useState } from "react";

export const useCanvasPan = () => {
    const [offset, setOffset] = useState({ x: 0, y: 0 });
    const isDragging = useRef(false);
    const startPos = useRef({ x: 0, y: 0 });

    const handleMouseDown = (e: any) => {
        isDragging.current = true;
        startPos.current = {
            x: e.clientX - offset.x,
            y: e.clientY - offset.y,
        };
    };

    const handleMouseMove = (e: any) => {
        if (!isDragging.current) return;

        const newX = e.clientX - startPos.current.x;
        const newY = e.clientY - startPos.current.y;

        setOffset({ x: newX, y: newY });
    };

    const handleMouseUp = () => {
        isDragging.current = false;
    };

    return {
        offset,
        handleMouseDown,
        handleMouseMove,
        handleMouseUp,
    };
};
