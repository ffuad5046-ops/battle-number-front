import {useSelector} from "react-redux";
import {selectGetGame, selectGetGameStatus} from "../redux/selector/gameSelector";
import {useEffect} from "react";
import {useLocation, useNavigate} from "react-router-dom";

const useRedirect = () => {
    const navigate = useNavigate()
    const location = useLocation()

    const game = useSelector(selectGetGame)
    const gameStatus = useSelector(selectGetGameStatus)

    useEffect(() => {
        if (gameStatus !== 'pending') {
            if (game && location.pathname !== '/game-board') {
                navigate('/game-board')
            }

            if (!game && location.pathname === '/game-board') {
                navigate('/')
            }
        }
    }, [game, gameStatus, location.pathname])
}

export default useRedirect