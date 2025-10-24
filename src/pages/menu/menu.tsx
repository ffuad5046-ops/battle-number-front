import styles from './menu.module.scss'
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {loginUserAsGuest} from "../../redux/request/userApi";

const Menu = ({ setIsLogin } : any) => {
    const navigate = useNavigate()
    const dispatch = useDispatch<any>();

    const enterAsAGuest = () => {
        dispatch(loginUserAsGuest())
    }

    return <div className={styles.menu}>
            <h1 className={styles.logo}>🔹 BATTLE NUMBERS</h1>

            <div className={styles.panel}>
                <h2 className={styles.title}>Главное меню</h2>

                <div className={styles.buttons}>
                    <button className={`${styles.button} ${styles.primary}`} onClick={enterAsAGuest}>
                        🚀 Войти как гость
                    </button>

                    <button className={styles.button} onClick={() => navigate('auth')}>
                        🔐 Войти
                    </button>

                    <button
                        className={`${styles.button} ${styles.secondary}`}
                        onClick={() => {
                            setIsLogin(false);
                            navigate('auth');
                        }}
                    >
                        ✨ Зарегистрироваться
                    </button>
                </div>

            <p className={styles.footer}>© 2025 Battle Numbers</p>
        </div>
    </div>


}

export default Menu