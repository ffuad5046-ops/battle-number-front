import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import styles from "./auth.module.scss";
import BackButton from "../../components/backButton/backButton";
import {useDispatch, useSelector} from "react-redux";
import {loginUser, registerUser, resendCode, verifyEmail} from "../../redux/request/userApi";
import Alert from "../../components/alert/alert";
import useCheckStatusForAlert from "../../hooks/useCheckStatusForAlert";
import {
    selectErrorLoginError, selectErrorRegister, selectResendCodeStatus,
    selectStatusLoginError,
    selectStatusRegister,
    selectUser
} from "../../redux/selector/userSelector";
import VerifyEmail from "./verifyEmail/verifyEmail";
import {login} from "../../redux/slice/userSlice";

export const AuthPage = ({ isLogin, setIsLogin }: any) => {
    const navigate = useNavigate();
    const dispatch = useDispatch<any>();

    const {alertType, alertVisible, alertMessage, closeModal} = useCheckStatusForAlert(
        selectStatusLoginError,
        selectErrorLoginError
    )

    const {alertType: alertTypeRegister, alertVisible: alertVisibleRegister, alertMessage: alertMessageRegister, closeModal: closeModalRegister} = useCheckStatusForAlert(
        selectStatusRegister,
        selectErrorRegister
    )

    const [isReset, setIsReset] = useState(false);
    const [email, setEmail] = useState("asdddasd@as.sd");
    const [password, setPassword] = useState("111111");
    const [username, setUsername] = useState("sdsdd");

    const user = useSelector(selectUser)
    const statusRegister = useSelector(selectStatusRegister)
    const statusResendCode = useSelector(selectResendCodeStatus)
    const statusLogin = useSelector(selectStatusLoginError)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (isLogin) {
            dispatch(loginUser({email, password}))
        } else {
            dispatch(registerUser({email, password, name: username}))
        }
    };

    const handleVerifyEmail = (code: string) => {
        dispatch(verifyEmail({code, email}))
    }

    const handleResendCode = () => {
        dispatch(resendCode({email}))
    }

    useEffect(() => {
        if (statusLogin === 'success') {
            dispatch(login())
            navigate('/')
        }
    }, [statusLogin]);

    return (
        <>
            <div className={styles.auth}>
                <div className={styles.card}>
                    <BackButton/>

                    <h2>
                        {isReset
                            ? "Восстановление пароля"
                            : isLogin
                                ? "Вход"
                                : "Регистрация"}
                    </h2>

                    <form onSubmit={handleSubmit}>
                        {!isLogin && !isReset && (
                            <label>
                                Логин
                                <input
                                    type="text"
                                    placeholder="Введите логин"
                                    required
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </label>
                        )}

                        <label>
                            Email
                            <input
                                type="email"
                                placeholder="Введите email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </label>

                        {!isReset && (
                            <label>
                                Пароль
                                <input
                                    type="password"
                                    placeholder="Введите пароль"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </label>
                        )}

                        <button type="submit">
                            {isReset
                                ? "Отправить ссылку"
                                : isLogin
                                    ? "Войти"
                                    : "Зарегистрироваться"}
                        </button>

                        {!isReset && (
                            <>
                                <div className={styles.divider}>
                                    <span>или</span>
                                </div>

                                <button type="button" className={styles.google}>
                                    Войти через Google
                                </button>
                            </>
                        )}
                    </form>

                    <p className={styles.switch}>
                        {isReset ? (
                            <span onClick={() => setIsReset(false)}>Назад</span>
                        ) : isLogin ? (
                            <>
                                Нет аккаунта?{" "}
                                <span onClick={() => setIsLogin(false)}>Зарегистрируйтесь</span>
                            </>
                        ) : (
                            <>
                                Уже есть аккаунт?{" "}
                                <span onClick={() => setIsLogin(true)}>Войти</span>
                            </>
                        )}
                    </p>
                </div>
            </div>

            <Alert
                type={alertType}
                message={alertMessage}
                visible={alertVisible}
                onClose={closeModal}
                autoHide={3000}
            />

            <Alert
                type={alertTypeRegister}
                message={alertMessageRegister}
                visible={alertVisibleRegister}
                onClose={closeModalRegister}
                autoHide={3000}
            />

            <VerifyEmail
                isOpen={statusRegister === 'success' || (statusResendCode !== '' && statusResendCode !== 'pending')}
                email={email}
                onVerify={handleVerifyEmail}
                onResend={handleResendCode}
            />
        </>
    );
};
