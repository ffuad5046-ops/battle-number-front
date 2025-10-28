import {clearGame, updateGame} from "../../../redux/slice/gameSlice";
import {getUserAuth} from "../../../redux/request/userApi";
import Modal from "../../../components/modal/modal";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {socket} from "../../../socket/socket";
import {selectGetGame} from "../../../redux/selector/gameSelector";
import {selectUser} from "../../../redux/selector/userSelector";
import {useEffect} from "react";
import styles from './gameOver.module.scss'

const GameOver = ({ modalOpen, setModalOpen, modalText, gameRef }: any) => {
    const navigate = useNavigate()
    const dispatch = useDispatch<any>();

    const game = useSelector(selectGetGame)
    const user = useSelector(selectUser)

    const handleRepeatGame = () => {
        socket.emit('game:repeat', {gameId: game.game.id, userId: user.id})
    }

    useEffect(() => {
        socket.on("game:repeat-game-agreed", ({repeatGamePlayers}) => {
            dispatch(updateGame({
                ...gameRef.current,
                game: {
                    ...gameRef.current?.game,
                    repeatGamePlayers,
                }
            }))
        });
    }, [gameRef]);

    return <Modal
        isOpen={modalOpen}
        title="Игра окончена"
        onClose={() => {
            dispatch(clearGame())
            dispatch(getUserAuth())
            setModalOpen(false);
            navigate('/');
        }}
    >
        <p>{modalText}</p>

        <div>
            <button onClick={handleRepeatGame} className={styles.repeatButton} disabled={game?.game?.repeatGamePlayers.includes(user?.id)}>🔄 Сыграть ещё раз
            </button>

            <div>
                {game?.game?.repeatGamePlayers?.length > 0 ? (
                    <div className={styles.statusMessage}>
                        {game?.game?.repeatGamePlayers?.includes(user?.id) ? "⏳ Ожидаем решение соперника..." : "👀 Соперник хочет реванш!"}
                    </div>
                ) : <></>}
            </div>
        </div>

    </Modal>
}

export default GameOver