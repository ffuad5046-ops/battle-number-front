import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import styles from "./statsPage.module.scss";
import {useDispatch, useSelector} from "react-redux";
import {selectUser} from "../../redux/selector/userSelector";
import {getUserStats, getUserStatsSummary} from "../../redux/request/gameApi";
import {selectGetUserStats, selectGetUserStatsSummary} from "../../redux/selector/gameSelector";
import useRedirect from "../../hooks/useRedirect";
import Modal from "../../components/modal/modal";
import BackButton from "../../components/backButton/backButton";
import {login} from "../../redux/slice/userSlice";

interface StatsPageProps {
    stats: {
        totalGames: number;
        wins: number;
        losses: number;
        draws?: number;
    };
}

const StatsPage: React.FC<StatsPageProps> = () => {
    useRedirect()

    const navigate = useNavigate();
    const dispatch = useDispatch<any>();

    const user = useSelector(selectUser)
    const stats = useSelector(selectGetUserStats)
    const statsSummary = useSelector(selectGetUserStatsSummary)

    const [modalOpen, setModalOpen] = useState(false);
    const [page, setPage] = useState(1);
    const [filter, setFilter] = useState<'all' | 'wins' | 'losses' | 'draws' | null>(null);
    const [totalPages, setTotalPages] = useState(1);
    const size = 10;

    useEffect(() => {
        if (!user) return;

        dispatch(getUserStats({id: user.id}))
    }, [user]);

    useEffect(() => {
        if (!filter) return

        dispatch(getUserStatsSummary({id: user.id, filter, page, size}))
    }, [user, filter, page]);

    useEffect(() => {
        if (statsSummary) {
            console.log(statsSummary)
            setTotalPages(statsSummary.totalPages);
        }
    }, [statsSummary])

    const winRate = stats?.totalGames ? ((stats?.wins / stats?.totalGames) * 100).toFixed(1) : "0";

    return (
        <>
            <div className={styles.statsPage}>
                <div className={styles.header}>
                    <button className={styles.avatarButton} onClick={() => navigate("/setting")}>
                        {user?.name[0]?.toUpperCase() || "U"}
                    </button>
                </div>

                <div className={styles.container}>
                    <BackButton />

                    <h1 className={styles.title}>Статистика</h1>
                    <p className={styles.subtitle}>Ваш игровой путь ⚡</p>

                    <div className={styles.cards}>
                        <div className={`${styles.card} ${styles.total}`}
                             onClick={() => { setFilter('all'); setPage(1); setModalOpen(true)}}>
                            <h2>Всего игр</h2>
                            <p>{stats?.totalGames}</p>
                        </div>

                        <div className={`${styles.card} ${styles.wins}`}
                             onClick={() => { setFilter('wins'); setPage(1); setModalOpen(true)}}>
                            <h2>Победы</h2>
                            <p>{stats?.wins}</p>
                        </div>

                        <div className={`${styles.card} ${styles.losses}`}
                             onClick={() => { setFilter('losses'); setPage(1); setModalOpen(true)}}>
                            <h2>Поражения</h2>
                            <p>{stats?.losses}</p>
                        </div>

                        <div className={`${styles.card} ${styles.draws}`}
                             onClick={() => { setFilter('draws'); setPage(1); setModalOpen(true)}}>
                            <h2>Ничьи</h2>
                            <p>{stats?.draws}</p>
                        </div>

                        <div className={`${styles.card} ${styles.winrate}`}>
                            <h2>Winrate</h2>
                            <p>{winRate}%</p>
                        </div>
                    </div>

                    <div className={styles.summary}>
                        {+winRate >= 70 && <p>🔥 Вы прирождённый стратег!</p>}
                        {+winRate >= 40 && +winRate < 70 && <p>⚔️ Неплохо! Но потенциал огромный!</p>}
                        {+winRate < 40 && <p>💡 Главное — не сдаваться. Каждый ход делает вас сильнее!</p>}
                    </div>
                </div>
            </div>

            <Modal
                isOpen={modalOpen}
                title="Подробная статистика"
                onClose={() => setModalOpen(false)}
                size={'big'}
            >
                <div className={styles.tableWrapper}>
                    <table className={styles.statsTable}>
                        <thead>
                        <tr>
                            <th>Дата</th>
                            <th>Соперник</th>
                            <th>Результат</th>
                        </tr>
                        </thead>
                        <tbody>
                        {statsSummary?.games?.length === 0 ? (
                            <tr>
                                <td colSpan={3} className={styles.empty}>
                                    Нет игр для отображения
                                </td>
                            </tr>
                        ) : (
                            statsSummary?.games?.map((g: any) => {
                                const opponent =
                                    g.player1Id === user?.id ? g.player2.name : g.player1.name;

                                const result = g.isDraw
                                    ? '🤝 Ничья'
                                    : g.winnerId === user?.id
                                        ? '🏆 Победа'
                                        : '💀 Поражение';

                                return (
                                    <tr key={g.id}>
                                        <td>{new Date(g.createdAt).toLocaleDateString()}</td>
                                        <td>{opponent}</td>
                                        <td
                                            className={
                                                g.isDraw
                                                    ? styles.draw
                                                    : g.winnerId === user?.id
                                                        ? styles.win
                                                        : styles.loss
                                            }
                                        >
                                            {result}
                                        </td>
                                    </tr>
                                );
                            })
                        )}
                        </tbody>
                    </table>

                    <div className={styles.pagination}>
                        <button onClick={() => setPage((p) => Math.max(p - 1, 1))} disabled={page === 1}>
                            ⬅
                        </button>
                        <span>Страница {page} из {totalPages}</span>
                        <button onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                                disabled={page === totalPages}>
                            ➡
                        </button>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default StatsPage;
