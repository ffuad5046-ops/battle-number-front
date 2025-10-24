import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slice/userSlice";
import invitationSlice from "./slice/invitationSlice";
import gameSlice from "./slice/gameSlice";

export const store = configureStore({
    reducer: {
        user: userSlice,
        invitation: invitationSlice,
        game: gameSlice,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;