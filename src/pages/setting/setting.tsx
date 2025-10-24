import styles from './setting.module.scss'
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {selectErrorPatch, selectStatusPatch, selectUser} from "../../redux/selector/userSelector";
import {patchUserAsGuest} from "../../redux/request/userApi";
import Alert from "../../components/alert/alert";
import useCheckStatusForAlert from "../../hooks/useCheckStatusForAlert";
import useRedirect from "../../hooks/useRedirect";
import BackButton from "../../components/backButton/backButton";

const Setting = () => {
    useRedirect()

    const dispatch = useDispatch<any>();

    const [username, setUsername] = useState('')

    const {alertType, alertVisible, alertMessage, closeModal} = useCheckStatusForAlert(
        selectStatusPatch,
        selectErrorPatch
    )

    const user = useSelector(selectUser);

    const handleSave = () => {
        dispatch(patchUserAsGuest({login: username, id: user.id}))
    }

    useEffect(() => {
        if (user) {
            setUsername(user.name)
        }
    }, [user]);

    return <>
        <div className={styles.home}>
            <div className={styles.container}>
                <BackButton />

                <div className={styles.form}>
                    <h2 className={styles.title}>Настройки</h2>

                    <label className={styles.field}>
                        <span>Логин</span>
                        <input
                            type="text"
                            placeholder={'Введите логин'}
                            value={username}
                            onChange={(e: any) => setUsername(e.target.value)}
                        />
                    </label>

                    <button className={styles.button} onClick={handleSave}>
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

export default Setting