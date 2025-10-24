import React, {useEffect, useState} from "react";
import styles from "./verifyEmail.module.scss";
import Modal from "../../../components/modal/modal";
import {login} from "../../../redux/slice/userSlice";
import {useDispatch, useSelector} from "react-redux";
import {
    selectErrorVerifyEmail,
    selectStatusVerifyEmail
} from "../../../redux/selector/userSelector";
import {useNavigate} from "react-router-dom";
import Alert from "../../../components/alert/alert";
import useCheckStatusForAlert from "../../../hooks/useCheckStatusForAlert";

const VerifyEmail: React.FC<any> = ({
       isOpen,
       email,
       onVerify,
       onResend
   }) => {
    const [code, setCode] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch<any>();
    const statusVerifyEmail = useSelector(selectStatusVerifyEmail)
    const {alertType, alertVisible, alertMessage, closeModal} = useCheckStatusForAlert(
        selectStatusVerifyEmail,
        selectErrorVerifyEmail
    )

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (code.trim().length !== 6) return;
        onVerify(code);
    };

    useEffect(() => {
        if (statusVerifyEmail === 'success') {
            dispatch(login())
            navigate('/')
        }
    }, [statusVerifyEmail]);

    if (!isOpen) return null;

    return (
        <>
            <Modal isOpen={isOpen}>
                <div className={styles.verify}>
                    <h3>Подтверждение Email</h3>
                    <p className={styles.text}>
                        Мы отправили код подтверждения на <strong>{email}</strong>
                    </p>

                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            maxLength={6}
                            placeholder="Введите код"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                        />

                        <button type="submit" disabled={code.length !== 6}>
                            Подтвердить
                        </button>
                    </form>

                    <p className={styles.resend} onClick={onResend}>
                        Не получили письмо? <span>Отправить ещё раз</span>
                    </p>
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
    );
};

export default VerifyEmail;
