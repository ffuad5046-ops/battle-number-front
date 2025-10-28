import Modal from "../../../components/modal/modal";
import styles from "./resetPassword.module.scss";
import React, {useState} from "react";
import Alert from "../../../components/alert/alert";
import useCheckStatusForAlert from "../../../hooks/useCheckStatusForAlert";
import {
    selectResetPasswordError,
    selectResetPasswordStatus,
} from "../../../redux/selector/userSelector";

const ResetPassword = ({
   isOpen,
   onResetPassword}: any) => {
    const [password, setPassword] = useState('')

    const {alertType, alertVisible, alertMessage, closeModal} = useCheckStatusForAlert(
        selectResetPasswordStatus,
        selectResetPasswordError
    )

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onResetPassword(password);
    };

    return (
        <>
            <Modal isOpen={isOpen}>
                <div className={styles.verify}>
                    <h3>Смена пароля</h3>

                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            placeholder="Введите пароль"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <button type="submit">
                            Подтвердить
                        </button>
                    </form>
                </div>
            </Modal>

            <Alert
                type={alertType}
                message={alertMessage}
                visible={alertVisible}
                onClose={closeModal}
                autoHide={3000}
            />
        </>
    )
}

export default ResetPassword