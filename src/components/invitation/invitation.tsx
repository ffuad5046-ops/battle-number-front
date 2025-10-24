import React from "react";
import {useDispatch, useSelector} from "react-redux";

import {acceptInvitation, declineInvitation} from "../../redux/request/invitationApi";

import styles from './invitation.module.scss'
import {selectInvitation, selectInvitationAcceptStatus} from "../../redux/selector/invitationSelector";
import {selectUser} from "../../redux/selector/userSelector";
import {Spinner} from "../spinner/spinner";

const Invitation = () => {
    const dispatch = useDispatch<any>();
    const notification = useSelector(selectInvitation);
    const notificationAcceptStatus = useSelector(selectInvitationAcceptStatus);
    const user = useSelector(selectUser)

    const handleAcceptInvitation = () => {
        dispatch(acceptInvitation({id: notification.id, userId: user.id}))
    }

    const handleDeclineInvitation = () => {
        dispatch(declineInvitation({id: notification.id, userId: user.id}))
    }

    if (!notification) return <></>

    return <div className={styles.invitation}>
        <h3>Пользователь {notification.fromUser.name} бросает Вам вызов</h3>

        <div className={styles.buttons}>
            <button onClick={handleAcceptInvitation} className={styles.accept}>{notificationAcceptStatus === '' ? <Spinner size={40} /> : 'Принять'}</button>
            <button onClick={handleDeclineInvitation} className={styles.decline}>Отклонить</button>
        </div>
    </div>

}

export default Invitation