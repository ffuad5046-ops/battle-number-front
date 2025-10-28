import React, {useEffect, useState} from 'react';
import Menu from './pages/menu/menu';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from './pages/home/home';
import {socket} from './socket/socket';
import PlayWithFriend from "./pages/playWithFriend/playWithFriend";
import Invitation from "./components/invitation/invitation";
import GameBoard from "./pages/gameBoard/gameBoard";
import {AuthPage} from "./pages/auth/auth";
import Setting from "./pages/setting/setting";
import {selectUserStatus, selectUser, selectAuthUserStatus} from "./redux/selector/userSelector";
import {useDispatch, useSelector} from "react-redux";
import {getUserAuth} from "./redux/request/userApi";
import {getInvitation} from "./redux/request/invitationApi";
import {setNotification} from "./redux/slice/invitationSlice";
import {getGame} from "./redux/request/gameApi";
import {updateGame} from "./redux/slice/gameSlice";
import StatsPage from "./pages/statsPage/statsPage";
import Multiplayer from "./pages/multiplayer/multiplayer";

// повыносить инпуты
// формы добавить
// валидацию добавить

// много карт
// апгрейды

function App() {
    const [isLogin, setIsLogin] = useState(true);

    const dispatch = useDispatch<any>();
    const user = useSelector(selectUser)
    const userStatus = useSelector(selectUserStatus)
    const authUserStatus = useSelector(selectAuthUserStatus)

    useEffect(() => {
        if (user) {
            socket.emit("registerUser", user.id);
        }
    }, [user]);

  useEffect(() => {
      dispatch(getUserAuth())

      socket.on("connect", () => {
        const userId = localStorage.getItem("id");
        if (userId) {
          socket.emit("registerUser", Number(userId));
        }
      });

      socket.on('invitation:new', (data) => {
          dispatch(setNotification(data))
      })

      socket.on('game:accept', (data) => {
          dispatch(updateGame(data))
          dispatch(setNotification(null))
      })

      socket.on('game:decline', () => {
          dispatch(setNotification(null))
      })
  }, []);

  useEffect(() => {
        if (user) {
            dispatch(getInvitation({id: user.id}))
            dispatch(getGame({id: user.id}))
        }
    }, [user]);

  if (userStatus === 'pending' || authUserStatus === 'pending' || userStatus === '' || authUserStatus === '') return <div></div>

  return (
    <div className="App">
      <Router>
        <Routes>
          {!user && (
            <>
                <Route path="/" element={<Menu setIsLogin={setIsLogin} />} />
                <Route path="/auth" element={<AuthPage isLogin={isLogin} setIsLogin={setIsLogin}/>} />
            </>
          )}

          {user && (
            <>
              <Route path="/" element={<Home />} />
              <Route path="/play-with-friend" element={<PlayWithFriend />} />
              <Route path="/game-board" element={<GameBoard />} />
              <Route path="/setting" element={<Setting />} />
              <Route path="/multiplayer" element={<Multiplayer />} />
              <Route path="/stats" element={<StatsPage />} />
            </>
          )}
        </Routes>
      </Router>

        <Invitation />
    </div>
  );
}

export default App;
