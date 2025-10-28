import {createSlice} from "@reduxjs/toolkit";
import {gameRepeat, getGame, getUserStats, getUserStatsSummary} from "../request/gameApi";

const initialState: any = {
    game: null,
    gameStatus: '',
    gameError: null,

    userStats: null,
    userStatsStatus: '',
    userStatsError: null,

    userStatsSummary: [],
    userStatsSummaryStatus: '',
    userStatsSummaryError: null,
};

const gameSlice = createSlice({
    name: "game",
    initialState,
    reducers: {
        clearGame: (state) => {
            state.game = null
            state.gameStatus = ''
            state.gameError = null
        },
        updateGame: (state, action) => {
            state.game = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getGame.pending, (state) => {
                state.gameStatus = 'pending';
                state.gameError = null;
            })
            .addCase(getGame.fulfilled, (state, action: any) => {
                state.gameStatus = 'success';
                state.game = action.payload;
            })
            .addCase(getGame.rejected, (state, action) => {
                state.gameStatus = 'failed';
                state.gameError = action.payload as string;
            })

            .addCase(getUserStats.pending, (state) => {
                state.userStatsStatus = 'pending';
                state.userStatsError = null;
            })
            .addCase(getUserStats.fulfilled, (state, action: any) => {
                state.userStatsStatus = 'success';
                state.userStats = action.payload;
            })
            .addCase(getUserStats.rejected, (state, action) => {
                state.userStatsStatus = 'failed';
                state.userStatsError = action.payload as string;
            })

            .addCase(getUserStatsSummary.pending, (state) => {
                state.userStatsSummaryStatus = 'pending';
                state.userStatsSummaryError = null;
            })
            .addCase(getUserStatsSummary.fulfilled, (state, action: any) => {
                state.userStatsSummaryStatus = 'success';
                state.userStatsSummary = action.payload;
            })
            .addCase(getUserStatsSummary.rejected, (state, action) => {
                state.userStatsSummaryStatus = 'failed';
                state.userStatsSummaryError = action.payload as string;
            })

            .addCase(gameRepeat.pending, (state) => {
                state.userStatsSummaryStatus = 'pending';
                state.userStatsSummaryError = null;
            })
            .addCase(gameRepeat.fulfilled, (state, action: any) => {
                state.userStatsSummaryStatus = 'success';
                state.userStatsSummary = action.payload;
            })
            .addCase(gameRepeat.rejected, (state, action) => {
                state.userStatsSummaryStatus = 'failed';
                state.userStatsSummaryError = action.payload as string;
            });
    },
});

export const { clearGame, updateGame } = gameSlice.actions;
export default gameSlice.reducer;