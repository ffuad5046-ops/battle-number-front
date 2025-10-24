import {useEffect, useState} from "react"
import {useNavigate} from "react-router-dom"
import styles from './home.module.scss'
import Modal from "../../components/modal/modal";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../../redux/slice/userSlice";
import {selectStatusLogout, selectUser} from "../../redux/selector/userSelector";
import {Tooltip} from "../../components/tooltip/tooltip";
import useRedirect from "../../hooks/useRedirect";
import {socket} from "../../socket/socket";
import {updateGame} from "../../redux/slice/gameSlice";
import {setNotification} from "../../redux/slice/invitationSlice";
import {logoutUser} from "../../redux/request/userApi";

const Home = () => {
    useRedirect()

    const dispatch = useDispatch<any>();
    const navigate = useNavigate()

    const user = useSelector(selectUser);

    const [modalOpen, setModalOpen] = useState(false)

    const exit = () => {
        dispatch(logoutUser())
    }

    const playWithFriend = () => {
        navigate('/play-with-friend')
    }

    useEffect(() => {
        if (user?.isGuest && localStorage.getItem('isGuestInfo') !== 'ok') {
            setModalOpen(true)
        }
    }, [user])

    return <>
        <div className={styles.home}>
            <div className={styles.header}>
                <button className={styles.avatarButton} onClick={() => navigate('/setting')}>
                    {user?.name[0].toUpperCase() || 'U'}
                </button>
            </div>

            <div className={styles.container}>
                <h1 className={styles.title}>Добро пожаловать, {user?.name} 👋</h1>
                <p className={styles.subtitle}>Готов сыграть?</p>

                <div className={styles.buttons}>
                    <button className={`${styles.button} ${styles.play}`} onClick={playWithFriend}>
                        🎮 Играть с другом
                    </button>

                    <Tooltip
                        message="Зарегистрируйтесь, чтобы сыграть в мультиплеере"
                        disabled={!user.isGuest}
                    >
                        <button className={`${styles.button} ${styles.play}`} disabled={user.isGuest}>
                            🌐 Мультиплеер
                        </button>
                    </Tooltip>

                    <Tooltip
                        message="Зарегистрируйтесь, чтобы посмотреть статистику"
                        disabled={!user.isGuest}
                    >
                        <button className={`${styles.button} ${styles.play}`} onClick={() => navigate('/stats')}
                                disabled={user.isGuest}
                        >
                            📊 Статистика
                        </button>
                    </Tooltip>

                    <button className={`${styles.button} ${styles.exit}`} onClick={exit}>
                        🚪 Выйти
                    </button>
                </div>
            </div>
        </div>

        <Modal
            isOpen={modalOpen}
            title="Вы гость"
            onClose={() => {
                setModalOpen(false);
                localStorage.setItem('isGuestInfo', 'ok')
            }}
        >
            <p>У вас ограниченные права. Для доступа ко всем функциям, пожалуйста, войдите или зарегистрируйтесь.</p>
        </Modal>
    </>

}

export default Home