import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import styles from "./auth.module.scss";
import BackButton from "../../components/backButton/backButton";
import {useDispatch, useSelector} from "react-redux";
import {
    loginUser,
    registerUser,
    resendCode, resetPassword,
    resetPasswordEmailCode,
    resetPasswordEmailCodeApprove, resetPasswordEmailResendCode,
    verifyEmail
} from "../../redux/request/userApi";
import Alert from "../../components/alert/alert";
import useCheckStatusForAlert from "../../hooks/useCheckStatusForAlert";
import {
    selectErrorLoginError,
    selectErrorRegister,
    selectResendCodeStatus, selectResetPasswordEmailCodeApproveError,
    selectResetPasswordEmailCodeApproveStatus,
    selectResetPasswordEmailCodeStatus, selectResetPasswordStatus,
    selectStatusLoginError,
    selectStatusRegister,
    selectUser
} from "../../redux/selector/userSelector";
import VerifyEmail from "./verifyEmail/verifyEmail";
import {login, resetAll} from "../../redux/slice/userSlice";
import ResetPassword from "./resetPassword/resetPassword";

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

    const {alertType: alertTypeResetPasswordEmail, alertVisible: alertVisibleResetPasswordEmail, alertMessage: alertMessageResetPasswordEmail, closeModal: closeModalResetPasswordEmail} = useCheckStatusForAlert(
        selectResetPasswordEmailCodeApproveStatus,
        selectResetPasswordEmailCodeApproveError
    )

    const [isReset, setIsReset] = useState(false);
    const [email, setEmail] = useState("ffuad.orp@gmail.com");
    const [password, setPassword] = useState("111111");
    const [username, setUsername] = useState("sdsdd");
    const [isVerifyEmail, setIsVerifyEmail] = useState(false);
    const [isResetPasswordModal, setIsResetPasswordModal] = useState(false);

    const user = useSelector(selectUser)
    const statusRegister = useSelector(selectStatusRegister)
    const statusResetPasswordEmailCode = useSelector(selectResetPasswordEmailCodeStatus)
    const resetPasswordStatus = useSelector(selectResetPasswordStatus)
    const statusResetPasswordEmailApproveCode = useSelector(selectResetPasswordEmailCodeApproveStatus)
    const statusLogin = useSelector(selectStatusLoginError)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (isReset) {
            dispatch(resetPasswordEmailCode({email}))

            return
        }

        if (isLogin) {
            dispatch(loginUser({email, password}))
        } else {
            dispatch(registerUser({email, password, name: username}))
        }
    };

    const handleVerifyEmail = (code: string) => {
        if (isReset) {
            dispatch(resetPasswordEmailCodeApprove({code, email}))
        } else {
            dispatch(verifyEmail({code, email}))
        }
    }

    const handleResetPassword = (password: string) => {
        dispatch(resetPassword({password, email}))
    }

    const handleResendCode = () => {
        if (isReset) {
            dispatch(resetPasswordEmailResendCode({email}))
        } else {
            dispatch(resendCode({email}))
        }
    }

    useEffect(() => {
        if (statusRegister === 'success') {
            setIsVerifyEmail(true)
        }
    }, [statusRegister === 'success']);

    useEffect(() => {
        if (resetPasswordStatus === 'success') {
            setIsVerifyEmail(false)
            setIsResetPasswordModal(false)
            setIsReset(false)
        }
    }, [resetPasswordStatus === 'success']);

    useEffect(() => {
        if (statusResetPasswordEmailCode === 'success') {
            setIsVerifyEmail(true)
        }
    }, [statusResetPasswordEmailCode === 'success']);

    useEffect(() => {
        if (statusResetPasswordEmailApproveCode === 'success') {
            setIsResetPasswordModal(true)
        }
    }, [statusResetPasswordEmailApproveCode === 'success']);

    useEffect(() => {
        if (statusLogin === 'success') {
            dispatch(login())
            navigate('/')
        }
    }, [statusLogin]);

    useEffect(() => {
        return () => {
            setIsVerifyEmail(false)
            dispatch(resetAll())
        }
    }, [])

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
                                ? "Отправить код"
                                : isLogin
                                    ? "Войти"
                                    : "Зарегистрироваться"}
                        </button>

                        {!isReset && isLogin && (
                            <p
                                className={styles.forgot}
                                onClick={() => setIsReset(true)}
                            >
                                Забыли пароль?
                            </p>
                        )}

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

            <Alert
                type={alertTypeResetPasswordEmail}
                message={alertMessageResetPasswordEmail}
                visible={alertVisibleResetPasswordEmail}
                onClose={closeModalResetPasswordEmail}
                autoHide={3000}
            />

            <VerifyEmail
                isOpen={isVerifyEmail}
                email={email}
                onVerify={handleVerifyEmail}
                onResend={handleResendCode}
            />

            <ResetPassword
                isOpen={isResetPasswordModal}
                onResetPassword={handleResetPassword}
            />
        </>
    );
};
