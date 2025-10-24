import {useEffect, useRef} from "react";
import {useSelector} from "react-redux";
import {selectGetGame} from "../redux/selector/gameSelector";
import {selectUser} from "../redux/selector/userSelector";
import {CELL_SIZE, GRID_COLOR, NUMBER_COLOR} from "../constant/game";
import {socket} from "../socket/socket";

export const useGenerateMainFields = (canvasRef: any) => {
    const game = useSelector(selectGetGame)
    const user = useSelector(selectUser)

    const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (!game?.game?.searchNumber) return;

        const rect = canvasRef.current!.getBoundingClientRect();
        const x = Math.floor((e.clientX - rect.left) / CELL_SIZE);
        const y = Math.floor((e.clientY - rect.top) / CELL_SIZE);

        const clicked = game?.mainField.find((c: any) => c.x === x && c.y === y && c.ownerId === user.id);

        if (clicked.number === game?.game.searchNumber) {
            socket.emit("cell:found", {
                gameId: game.game.id,
                cellId: clicked.id,
                userId: user.id,
            });
        }
    };

    useEffect(() => {
        const userCells = game?.mainField?.filter((cell: any) => cell.ownerId === user.id);

        if (!canvasRef.current || !userCells?.length) return;

        const ctx = canvasRef.current.getContext("2d");
        if (!ctx) return;

        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

        userCells.forEach((cell: any) => {
            const { x, y, number, isGuessed } = cell;
            const px = x * CELL_SIZE;
            const py = y * CELL_SIZE;

            ctx.fillStyle = isGuessed ? "#ff4c4c" : "#212121";

            ctx.fillRect(px, py, CELL_SIZE, CELL_SIZE);
            ctx.strokeRect(px, py, CELL_SIZE, CELL_SIZE);

            if (number !== null && number !== undefined) {
                ctx.fillStyle = "#b0b0b0";
                ctx.font = "bold 13px Arial";
                ctx.textAlign = "center";
                ctx.textBaseline = "middle";
                ctx.fillText(String(number), px + CELL_SIZE / 2, py + CELL_SIZE / 2);
            }
        });
        }, [game]);

    return {handleClick}
}

export const useGenerateExtraFields = (canvasWaitingRef: any) => {
    const lastClickTime = useRef<number>(0);

    const game = useSelector(selectGetGame)
    const user = useSelector(selectUser)

    const handleClickMark = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (!game?.game?.searchNumber) return;

        const now = Date.now();
        if (now - lastClickTime.current < 300) return;
        lastClickTime.current = now;

        const rect = canvasWaitingRef.current!.getBoundingClientRect();
        const x = Math.floor((e.clientX - rect.left) / CELL_SIZE);
        const y = Math.floor((e.clientY - rect.top) / CELL_SIZE);

        const clicked = game?.extraField.find((c: any) => c.x === x && c.y === y && c.ownerId === user.id);
        if (clicked) {
            socket.emit("cell:mark", {
                gameId: game.game.id,
                cellId: clicked.id,
                userId: user.id,
            });
        }
    };

    useEffect(() => {
        const userCells = game?.extraField?.filter((cell: any) => cell.ownerId === user.id);

        if (!canvasWaitingRef.current || !userCells?.length) return;

        const ctx = canvasWaitingRef.current.getContext("2d");
        if (!ctx) return;

        ctx.clearRect(0, 0, canvasWaitingRef.current.width, canvasWaitingRef.current.height);

        userCells.forEach((cell: any) => {
            const { x, y, isMarked } = cell;
            const px = x * CELL_SIZE;
            const py = y * CELL_SIZE;

            ctx.fillStyle = isMarked ? "#1c9f06" : "#212121";

            ctx.fillRect(px, py, CELL_SIZE, CELL_SIZE);
            ctx.strokeStyle = GRID_COLOR;
            ctx.strokeRect(px, py, CELL_SIZE, CELL_SIZE);

            if (isMarked) {
                ctx.fillStyle = NUMBER_COLOR;
                ctx.font = "bold 14px Arial";
                ctx.textAlign = "center";
                ctx.textBaseline = "middle";
                ctx.fillText('X', px + CELL_SIZE / 2, py + CELL_SIZE / 2);
            }
        });
        }, [game]);

    return {handleClickMark}
}