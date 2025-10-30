import {useEffect, useState} from "react";
import styles from "./readyModal.module.scss";
import {socket} from "../../../../socket/socket";
import {useDispatch, useSelector} from "react-redux";
import {selectAllTraps, selectGetGame} from "../../../../redux/selector/gameSelector";
import {selectUser} from "../../../../redux/selector/userSelector";
import {updateGame} from "../../../../redux/slice/gameSlice";
import Modal from "../../../../components/modal/modal";

export const ReadyModal = ({ gameRef }: any) => {
    const dispatch = useDispatch<any>();

    const game = useSelector(selectGetGame)
    const allTraps = useSelector(selectAllTraps)
    const user = useSelector(selectUser)

    const [money, setMoney] = useState<number>(game?.game?.money)
    const [chosenTrap, setChosenTrap] = useState<number[]>([])

    const [isDisabled, setIsDisabled] = useState<boolean>(false)

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
        setIsDisabled(true)
        socket.emit("game:playerReady", { gameId: game?.game?.id, userId: user?.id, chosenTrap });
    };

    const handleBuy = (item: any) => {
        setMoney(prev => prev - item.cost)
        setChosenTrap(prev => [...prev, item.id]);
    }

    const handleSold = (item: any) => {
        setChosenTrap(prev => prev.filter(i => i !== item.id));
        setMoney(prev => prev + item.cost)
    }

    return (
        <Modal isOpen={game?.game?.status === 'accept'} title={'Подготовка к игре 🎮'}>
            <p>Выберите улучшения и нажмите <strong>«Готов»</strong>, чтобы начать</p>

            <div className={styles.coinsBox}>
                💰 Монеты: <span>{money}</span>
            </div>

            <h3 className={styles.sectionTitle}>✨ Улучшения</h3>
            <div className={styles.itemsGrid}>
                {allTraps?.filter((i: any) => i.type === "improve").map((item: any) => (
                    <div
                        key={item.id}
                        className={`${styles.itemCard} ${item.purchased ? styles.purchased : ""}`}
                    >
                        <span className={styles.itemName}>{item.title}</span>

                        <button
                            className={`${styles.buyBtn} ${chosenTrap.includes(item.id) ? styles.purchased : ""}`}
                            disabled={isDisabled || (money < item.cost && !chosenTrap.includes(item.id))}
                            onClick={() => {
                                if (chosenTrap.includes(item.id)) {
                                    handleSold(item)
                                } else {
                                    handleBuy(item)
                                }
                            }}
                        >
                            💰 {item.cost}
                        </button>
                    </div>
                ))}
            </div>

            <h3 className={styles.sectionTitle}>⚠️ Ловушки</h3>
            <div className={styles.itemsGrid}>
                {allTraps?.filter((i: any) => i.type === "trap").map((item: any) => (
                    <div
                        key={item.id}
                        className={`${styles.itemCard} ${item.purchased ? styles.purchased : ""}`}
                    >
                        <span className={styles.itemName}>{item.title}</span>

                        <button
                            className={`${styles.buyBtn} ${chosenTrap.includes(item.id) ? styles.purchased : ""}`}
                            disabled={isDisabled || (money < item.cost && !chosenTrap.includes(item.id))}
                            onClick={() => {
                                if (chosenTrap.includes(item.id)) {
                                    handleSold(item)
                                } else {
                                    handleBuy(item)
                                }
                            }}
                        >
                            💰 {item.cost}
                        </button>
                    </div>
                ))}
            </div>

            <div className={styles.players}>
                <div
                    className={`${styles.player} ${game?.game?.readyPlayers.includes(game?.game?.player1Id) ? styles.ready : ""}`}
                >
                    Игрок 1 {game?.game?.player1Id === user?.id && "(Вы)"}
                </div>
                <div
                    className={`${styles.player} ${game?.game?.readyPlayers.includes(game?.game?.player2Id) ? styles.ready : ""}`}
                >
                    Игрок 2 {game?.game?.player2Id === user?.id && "(Вы)"}
                </div>
            </div>

            <button
                onClick={handleReady}
                disabled={game?.game?.readyPlayers.includes(user?.id)}
                className={styles.button}
            >
                {game?.game?.readyPlayers.includes(user?.id)
                    ? "Ожидание второго игрока..."
                    : "Готов ✅"}
            </button>
        </Modal>
    );
};