import {useEffect, useRef, useState} from "react";

import styles from './gameBoard.module.scss'
import {socket} from "../../socket/socket";
import Modal from "../../components/modal/modal";
import Alert from "../../components/alert/alert";
import {useDispatch, useSelector} from "react-redux";
import {selectGetGame} from "../../redux/selector/gameSelector";
import {updateGame} from "../../redux/slice/gameSlice";
import {selectUser} from "../../redux/selector/userSelector";
import useRedirect from "../../hooks/useRedirect";
import TurnTimer from "../statsPage/components/turnTimer/turnTimer";
import {NumberSelector} from "../statsPage/components/numberSelector/numberSelector";
import {Spinner} from "../../components/spinner/spinner";
import {ReadyModal} from "../statsPage/components/readyModal/readyModal";
import {useGenerateExtraFields, useGenerateMainFields} from "../../hooks/hooksForGame";
import {CELL_SIZE} from "../../constant/game";
import {useCanvasPan} from "../../hooks/useCanvasPan";
import GameOver from "./gameOver/gameOver";

const GameBoard = () => {
    useRedirect()
    const dispatch = useDispatch<any>();

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const canvasWaitingRef = useRef<HTMLCanvasElement>(null);

    const {handleClick} = useGenerateMainFields(canvasRef)
    const {handleClickMark} = useGenerateExtraFields(canvasWaitingRef)

    const [modalOpen, setModalOpen] = useState(false);
    const [modalText, setModalText] = useState("");
    const [modalOpenNumbers, setModalOpenNumbers] = useState(false);
    const [searchNumber, setSearchNumber] = useState<any>()

    const [alertVisible, setAlertVisible] = useState(false);
    const [alertType, setAlertType] = useState<any>('error');
    const [alertMessage, setAlertMessage] = useState('');
    const { offset, handleMouseDown, handleMouseMove, handleMouseUp } = useCanvasPan();

    const game = useSelector(selectGetGame)
    const user = useSelector(selectUser)

    const gameRef = useRef(game);

    const onTimeOut = () => {
        if (game?.game?.currentTurnPlayerId !== user.id) {
            socket.emit("turn:timeout", { gameId: game.game.id });
            setModalOpenNumbers(false)
        }
    }

    useEffect(() => {
        gameRef.current = game;
    }, [game]);

    useEffect(() => {
        socket.on('cell:updated', data => {
            const updatedField = gameRef.current.extraField.map((c: any) =>
                c.id === data.cellId ? { ...c, isMarked: data.isMarked } : c
            );

            dispatch(updateGame({ ...gameRef.current, extraField: updatedField, leftForLose: data.leftForLose, leftForWin: data.leftForWin}));
        })

        socket.on('game:surrender', data => {
            if (data.winnerId === user.id) {
                if (user.isGuest) {
                    setModalText("🎉 Вы победили! Зарегистрируйтесь или войдите в аккаунт, чтобы получать XP и повышать уровень");
                } else {
                    setModalText("🎉 Вы победили!");
                }
            } else {
                setModalText("😢 Вы проиграли!");
            }
            setModalOpen(true);
            dispatch(updateGame({
                ...gameRef.current,
                game: {
                    ...gameRef.current.game,
                    status: 'finished',
                },
            }));
        })

        socket.on('game:finished', data => {
            if (data.winnerId === user.id) {
                setModalText("🎉 Вы победили!");
            } else {
                setModalText("😢 Вы проиграли!");
            }
            setModalOpen(true);
            dispatch(updateGame({
                ...gameRef.current,
                game: {
                    ...gameRef.current.game,
                    status: 'finished',
                },
            }));
        })

        socket.on("cell:found:update", ({ cellId, isGuessed, newSearchNumber, nextPlayerId, turnDeadline, unguessedNumbers }) => {
            const updatedMainField = gameRef.current.mainField.map((c: any) =>
                c.id === cellId ? { ...c, isGuessed } : c
            );

            dispatch(updateGame({
                ...gameRef.current,
                mainField: updatedMainField,
                game: {
                    ...gameRef.current.game,
                    searchNumber: newSearchNumber,
                    turnDeadline: turnDeadline,
                    currentTurnPlayerId: nextPlayerId,
                    unguessedNumbers
                },
            }));
        });

        socket.on("game:searchNumberUpdated", (data) => {
            dispatch(updateGame({
                ...gameRef.current,
                game: {
                    ...gameRef.current.game,
                    searchNumber: data.searchNumber,
                    turnDeadline: data.turnDeadline,
                },
            }));
        });

        socket.on("cell:updated:error", (data) => {
            setAlertVisible(true)
            setAlertType('error')
            setAlertMessage(data.reason)
        });

        socket.on("game:draw", (data) => {
            setModalText(data.message);
            setModalOpen(true);
            dispatch(updateGame({
                ...gameRef.current,
                game: {
                    ...gameRef.current.game,
                    status: 'finished',
                },
            }));
        });

        socket.on("game:repeat-game", (data) => {
            dispatch(updateGame(data))
            setModalOpen(false)
        });

        return () => {
            socket.off("cell:updated");
            socket.off("game:surrender");
            socket.off("game:finished");
            socket.off("cell:found:update");
            socket.off("game:searchNumberUpdated");
            socket.off("cell:updated:error");
            socket.off("game:draw");
        };
    }, []);

    return <>
        <div className={styles.game}>
            <div className={styles.gameWrapper}>
                <div className={styles.infoPanel}>
                    <h2>Партия #{game?.game?.id}</h2>

                    <div className={styles.infoBlock}>
                        <p>
                            <span>Ход игрока:</span>{" "}
                            {game?.game?.player1.id === user?.id
                                ? game?.game?.player1.name
                                : game?.game?.player2.name}
                        </p>

                        {game?.game?.isShowLoseLeft && <p>
                            <span>Клеток до поражения:</span> {game?.leftForLose}
                        </p>}

                        {game?.game?.isShowLoseLeft && <p>
                            <span>Клеток до выигрыша:</span> {game?.leftForWin}
                        </p>}
                    </div>

                    <button
                        className={styles.surrender}
                        onClick={() => {
                            socket.emit("game:surrender", {
                                gameId: game.game.id,
                                userId: user.id,
                            });
                        }}
                    >
                        Сдаться
                    </button>
                </div>

                {game?.game?.currentTurnPlayerId === user?.id ? (
                    <div className={styles.infoPanel}>
                        <h2>Вы ищете число:</h2>

                        {game?.game?.searchNumber ? (
                            <div className={styles.searchNumber}>
                                {game?.game?.searchNumber}
                            </div>
                        ) : (
                            <div><Spinner size={70} text={''}/></div>
                        )}
                    </div>
                ) : (
                    <div className={styles.infoPanel}>
                        <h2>Введите число:</h2>

                        {game?.game?.searchNumber ? (
                            <div className={styles.searchNumber}>
                                {game?.game?.searchNumber}
                            </div>
                        ) : (
                            <>
                                {game?.game?.turnDeadline && <TurnTimer turnDeadline={game?.game?.turnDeadline} onTimeOut={onTimeOut}/>}

                                <div className={styles.numberInputBlock}>
                                    <input
                                        type="number"
                                        value={searchNumber ?? ""}
                                        onChange={(e: any) => setSearchNumber(e.target.value)}
                                        onKeyPress={(e: any) => {
                                            if (e.key === 'Enter') {
                                                socket.emit("game:setSearchNumber", {
                                                    gameId: game.game.id,
                                                    userId: user.id,
                                                    number: searchNumber,
                                                });
                                                setSearchNumber(null)
                                            }
                                        }}
                                        className={styles.input}
                                        placeholder="000"
                                    />

                                    <div className={styles.buttons}>
                                        <button
                                            className={styles.okButton}
                                            onClick={() => {
                                                socket.emit("game:setSearchNumber", {
                                                    gameId: game.game.id,
                                                    userId: user.id,
                                                    number: searchNumber,
                                                });
                                                setSearchNumber(null);
                                            }}
                                        >
                                            OK
                                        </button>

                                        <button
                                            className={styles.moreButton}
                                            onClick={() => setModalOpenNumbers(true)}
                                        >
                                            ...
                                        </button>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                )}
            </div>

            <div className={styles.boardWrapper}>
                {game?.game?.currentTurnPlayerId === user?.id ? (
                    <canvas
                        ref={canvasRef}
                        width={CELL_SIZE * game?.game?.mainFieldWidth || 0}
                        height={CELL_SIZE * game?.game?.mainFieldHeight || 0}
                        onClick={handleClick}
                        className={styles.canvas}
                        // onMouseDown={handleMouseDown}
                        // onMouseMove={handleMouseMove}
                        // onMouseUp={handleMouseUp}
                        // onMouseLeave={handleMouseUp}
                        // style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
                    />
                ) : (
                    <canvas
                        ref={canvasWaitingRef}
                        width={CELL_SIZE * game?.game?.extraFieldWidth || 0}
                        height={CELL_SIZE * game?.game?.extraFieldHeight || 0}
                        onClick={handleClickMark}
                        className={styles.canvas}
                    />
                )}
            </div>
        </div>

        <GameOver
            modalOpen={modalOpen}
            setModalOpen={setModalOpen}
            modalText={modalText}
            gameRef={gameRef}
        />

        <Modal
            isOpen={modalOpenNumbers}
            title="Оставшиеся числа"
            onClose={() => {
                setModalOpenNumbers(false)
            }}
        >
            <NumberSelector unguessedNumbers={game?.game?.unguessedNumbers} onSelect={(i) => {
                socket.emit("game:setSearchNumber", {
                    gameId: game.game.id,
                    userId: user.id,
                    number: i,
                });
                setModalOpenNumbers(false);
            }}/>
        </Modal>

        {game?.game?.status === 'accept' && <ReadyModal gameRef={gameRef} />}

        <Alert
            type={alertType}
            message={alertMessage}
            visible={alertVisible}
            onClose={() => setAlertVisible(false)}
            autoHide={3000}
        />
    </>
}

export default GameBoard