import React, {useEffect, useState} from "react";
import styles from './playWithFriend.module.scss'
import Alert from "../../components/alert/alert";
import {useDispatch, useSelector} from "react-redux";
import {sendInvitation} from "../../redux/request/invitationApi";
import {selectUser} from "../../redux/selector/userSelector";
import {Tooltip} from "../../components/tooltip/tooltip";
import useCheckStatusForAlert from "../../hooks/useCheckStatusForAlert";
import {selectInvitationSendError, selectInvitationSendStatus} from "../../redux/selector/invitationSelector";
import useRedirect from "../../hooks/useRedirect";
import {clearNotification} from "../../redux/slice/invitationSlice";
import BackButton from "../../components/backButton/backButton";

const PlayWithFriend = () => {
    useRedirect()

    const dispatch = useDispatch<any>();

    const user = useSelector(selectUser);

    const [toLogin, setToLogin ] = useState<any>()
    const [mainFieldWidth, setMainFieldWidth, ] = useState(45)
    const [mainFieldHeight, setMainFieldHeight ] = useState(35)
    const [extraFieldWidth, setExtraFieldWidth ] = useState(20)
    const [extraFieldHeight, setExtraFieldHeight ] = useState(20)
    const [numberRange, setNumberRange ] = useState(100)
    const [isShowLoseLeft, setIsShowLoseLeft ] = useState(true)

    const [isAdditionSetting, setIsAdditionSetting] = useState(false)

    const {alertType, alertVisible, alertMessage, closeModal} = useCheckStatusForAlert(
        selectInvitationSendStatus,
        selectInvitationSendError
    )

    const handleCreateInvitation = () => {
        dispatch(sendInvitation({
            fromUserId: user?.id,
            toLogin: toLogin?.trim(),
            mainFieldWidth,
            mainFieldHeight,
            extraFieldWidth,
            extraFieldHeight,
            numberRange,
            isShowLoseLeft
        }))
    }

    useEffect(() => {
        return () => {
            dispatch(clearNotification())
        }
    }, []);

    return <>
        <div className={styles.settings}>
            <div className={styles.card}>
                <BackButton />

                <h1 className={styles.title}>⚙️ Настройки игры</h1>
                <p className={styles.subtitle}>Измени параметры перед началом матча</p>

                <div className={styles.form}>
                    <label className={styles.field}>
                        <span>Логин игрока</span>
                        <input
                            type="text"
                            value={toLogin}
                            placeholder={'Введите логин игрока'}
                            onChange={(e: any) => setToLogin(e.target.value)}
                        />
                    </label>

                    {!isAdditionSetting && <p className={styles.toggleButton} onClick={() => setIsAdditionSetting(true)}>⚙️ Дополнительные настройки игры</p>}

                    {isAdditionSetting && (
                        <>
                            <h2 className={styles.sectionTitle}>Основное поле</h2>

                            <div className={styles.grid}>
                                <label className={styles.field}>
                                    <span>Ширина</span>
                                    <Tooltip
                                        message="Зарегистрируйтесь, чтобы сыграть в мультиплеере"
                                        disabled={!user.isGuest}
                                    >
                                        <input
                                            type="number"
                                            value={mainFieldWidth}
                                            onChange={(e) => setMainFieldWidth(Number(e.target.value))}
                                            disabled={user.isGuest}
                                        />
                                    </Tooltip>
                                </label>
                                <label className={styles.field}>
                                    <span>Высота</span>
                                    <Tooltip
                                        message="Зарегистрируйтесь, чтобы сыграть в мультиплеере"
                                        disabled={!user.isGuest}
                                    >
                                        <input
                                            type="number"
                                            value={mainFieldHeight}
                                            onChange={(e) => setMainFieldHeight(Number(e.target.value))}
                                            disabled={user.isGuest}
                                        />
                                    </Tooltip>
                                </label>
                            </div>

                            <h2 className={styles.sectionTitle}>Дополнительное поле</h2>

                            <div className={styles.grid}>
                                <label className={styles.field}>
                                    <span>Ширина</span>
                                    <Tooltip
                                        message="Зарегистрируйтесь, чтобы сыграть в мультиплеере"
                                        disabled={!user.isGuest}
                                    >
                                        <input
                                            type="number"
                                            value={extraFieldWidth}
                                            onChange={(e) => setExtraFieldWidth(Number(e.target.value))}
                                            disabled={user.isGuest}
                                        />
                                    </Tooltip>
                                </label>
                                <label className={styles.field}>
                                    <span>Высота</span>
                                    <Tooltip
                                        message="Зарегистрируйтесь, чтобы сыграть в мультиплеере"
                                        disabled={!user.isGuest}
                                    >
                                        <input
                                            type="number"
                                            value={extraFieldHeight}
                                            onChange={(e) => setExtraFieldHeight(Number(e.target.value))}
                                            disabled={user.isGuest}
                                        />
                                    </Tooltip>
                                </label>
                            </div>

                            <label className={styles.field}>
                                <span>Диапазон чисел</span>
                                <Tooltip
                                    message="Зарегистрируйтесь, чтобы сыграть в мультиплеере"
                                    disabled={!user.isGuest}
                                >
                                    <input
                                        type="number"
                                        value={numberRange}
                                        onChange={(e) => setNumberRange(Number(e.target.value))}
                                        disabled={user.isGuest}
                                    />
                                </Tooltip>
                            </label>

                            <label>
                                <Tooltip
                                    message="Зарегистрируйтесь, чтобы сыграть в мультиплеере"
                                    disabled={!user.isGuest}
                                >
                                    <input
                                        type="checkbox"
                                        onChange={(e: any) => setIsShowLoseLeft(e.target.checked)}
                                        checked={isShowLoseLeft}
                                        disabled={user.isGuest}
                                    />
                                    <span>Показывать кол-во оставшихся ячеек</span>
                                </Tooltip>
                            </label>

                            <p className={styles.toggleButton} onClick={() => setIsAdditionSetting(false)}>⬆️ Скрыть настройки игры</p>
                        </>
                    )}

                    <button className={styles.button} onClick={handleCreateInvitation}>
                        💾 Сохранить
                    </button>
                </div>
            </div>
        </div>

        <Alert
            type={alertType}
            message={alertMessage}
            visible={alertVisible}
            onClose={closeModal}
            autoHide={3000}
        />
    </>
}

export default PlayWithFriend