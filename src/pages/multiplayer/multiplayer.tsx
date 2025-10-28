import {useNavigate} from "react-router-dom"
import styles from './multiplayer.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {selectUser} from "../../redux/selector/userSelector";
import useRedirect from "../../hooks/useRedirect";
import BackButton from "../../components/backButton/backButton";

const Multiplayer = () => {
    useRedirect()

    const dispatch = useDispatch<any>();
    const navigate = useNavigate()

    const user = useSelector(selectUser);

    const playWithFriend = () => {
        navigate('/play-with-friend')
    }

    return <>
        <div className={styles.multiplayer}>


            <div className={styles.header}>
                <button className={styles.avatarButton} onClick={() => navigate('/setting')}>
                    {user?.name[0].toUpperCase() || 'U'}
                </button>
            </div>

            <div className={styles.container}>
                <BackButton />

                <h1 className={styles.title}>Добро пожаловать в мультиплеер 👋</h1>

                <div className={styles.buttons}>
                    <button className={`${styles.button} ${styles.play}`} onClick={playWithFriend}>
                        🎮 Играть
                    </button>

                    <button className={`${styles.button} ${styles.play}`} onClick={() => navigate('/stats')}>
                        📊 ТОП игроков
                    </button>
                </div>
            </div>
        </div>
    </>

}

export default Multiplayer