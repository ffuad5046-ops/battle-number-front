import {RootState} from "../store";

export const selectGetGame = (state: RootState) => state.game.game;
export const selectGetGameStatus = (state: RootState) => state.game.gameStatus;

export const selectGetUserStats = (state: RootState) => state.game.userStats;
export const selectGetUserStatsSummary = (state: RootState) => state.game.userStatsSummary;
export const selectGetUserStatsStatus = (state: RootState) => state.game.userStatsStatus;
export const selectAllTraps = (state: RootState) => state.game.allTraps;
