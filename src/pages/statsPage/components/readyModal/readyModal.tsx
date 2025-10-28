import { useEffect } from "react";
import styles from "./readyModal.module.scss";
import {socket} from "../../../../socket/socket";
import {useDispatch, useSelector} from "react-redux";
import {selectGetGame} from "../../../../redux/selector/gameSelector";
import {selectUser} from "../../../../redux/selector/userSelector";
import {updateGame} from "../../../../redux/slice/gameSlice";
import Modal from "../../../../components/modal/modal";

export const ReadyModal = ({ gameRef }: any) => {
    const dispatch = useDispatch<any>();

    const game = useSelector(selectGetGame)
    const user = useSelector(selectUser)

    useEffect(() => {
        if (!game || !user) return;

        socket.on("player_ready_status", ({ readyPlayers }) => {
            dispatch(updateGame({
                ...gameRef.current,
                game: {
                    ...gameRef.current.game,
                    readyPlayers,
                }
            }))
        });

        socket.on("game_started", () => {
            socket.emit("game:start", { gameId: game?.game?.id, userId: user.id });
        });

        return () => {
            socket.off("player_ready_status");
            socket.off("game_started");
        };
    }, [game, user]);

    const handleReady = () => {
        console.log(game)
        socket.emit("game:playerReady", { gameId: game?.game?.id, userId: user?.id });
    };

    return (
        <Modal isOpen={game?.game?.status === 'accept'} title={'Подготовка к игре 🎮'}>
            <p>Нажмите <strong>«Готов»</strong>, чтобы начать</p>

            <div className={styles.players}>
                <div
                    className={`${styles.player} ${game?.game?.readyPlayers.includes(game?.game?.player1Id) ? styles.ready : ""}`}>
                    Игрок 1 {game?.game?.player1Id === user?.id && "(Вы)"}
                </div>
                <div
                    className={`${styles.player} ${game?.game?.readyPlayers.includes(game?.game?.player2Id) ? styles.ready : ""}`}>
                    Игрок 2 {game?.game?.player2Id === user?.id && "(Вы)"}
                </div>
            </div>

            <button onClick={handleReady} disabled={game?.game?.readyPlayers.includes(user?.id)} className={styles.button}>
                {game?.game?.readyPlayers.includes(user?.id) ? "Ожидание второго игрока..." : "Готов ✅"}
            </button>
        </Modal>
    );
};