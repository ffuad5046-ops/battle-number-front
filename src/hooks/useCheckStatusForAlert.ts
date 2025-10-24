import {useEffect, useState} from "react";
import {useSelector} from "react-redux";

const useCheckStatusForAlert = (selectStatus: any, selectError: any) => {
    const [alertVisible, setAlertVisible] = useState(false);
    const [alertType, setAlertType] = useState<any>('success');
    const [alertMessage, setAlertMessage] = useState('');

    const status = useSelector(selectStatus)
    const error = useSelector(selectError)

    useEffect(() => {
        if (status === 'success') {
            setAlertVisible(true)
            setAlertType('success')
            setAlertMessage('Успех!')
        } else if (status === 'failed') {
            setAlertVisible(true)
            setAlertType('error')
            setAlertMessage(error as string)
        }
    }, [status, error]);

    const closeModal = () => setAlertVisible(false)

    return { alertVisible, alertType, alertMessage, closeModal}
}

export default useCheckStatusForAlert