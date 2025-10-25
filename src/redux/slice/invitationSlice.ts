import {createSlice} from "@reduxjs/toolkit";
import {acceptInvitation, declineInvitation, getInvitation, sendInvitation} from "../request/invitationApi";

const initialState: any = {
    invitation: null,
    invitationLoading: false,
    invitationError: null,

    invitationSend: null,
    invitationSendStatus: false,
    invitationSendError: null,

    invitationAccept: null,
    invitationAcceptStatus: false,
    invitationAcceptError: null,

    invitationDecline: null,
    invitationDeclineStatus: false,
    invitationDeclineError: null,
};

const invitationSlice = createSlice({
    name: "invitation",
    initialState,
    reducers: {
        setNotification: (state, action) => {
            state.invitation = action.payload
            state.invitationLoading = false
            state.invitationError = null
        },
        clearNotification: (state) => {
            state.invitationSend = null
            state.invitationSendStatus = false
            state.invitationSendError = null
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getInvitation.pending, (state) => {
                state.invitationLoading = true;
                state.invitationError = null;
            })
            .addCase(getInvitation.fulfilled, (state, action: any) => {
                state.invitationLoading = false;
                state.invitation = action.payload;
            })
            .addCase(getInvitation.rejected, (state, action) => {
                state.invitationLoading = false;
                state.invitationError = action.payload as string;
            })

            .addCase(sendInvitation.pending, (state) => {
                state.invitationSendStatus = 'pending';
                state.invitationSendError = null;
            })
            .addCase(sendInvitation.fulfilled, (state, action: any) => {
                state.invitationSendStatus = 'success';
                state.invitationSend = action.payload;
            })
            .addCase(sendInvitation.rejected, (state, action) => {
                state.invitationSendStatus = 'failed';
                state.invitationSendError = action.payload as string;
            })

            .addCase(acceptInvitation.pending, (state) => {
                state.invitationAcceptStatus = 'pending';
                state.invitationAcceptError = null;
            })
            .addCase(acceptInvitation.fulfilled, (state, action: any) => {
                state.invitationAcceptStatus = 'success';
                state.invitationAccept = action.payload;
            })
            .addCase(acceptInvitation.rejected, (state, action) => {
                state.invitationAcceptStatus = 'failed';
                state.invitationAcceptError = action.payload as string;
            })

            .addCase(declineInvitation.pending, (state) => {
                state.invitationDeclineStatus = 'pending';
                state.invitationDeclineError = null;
            })
            .addCase(declineInvitation.fulfilled, (state, action: any) => {
                state.invitationDeclineStatus = 'success';
                state.invitationDecline = action.payload;
            })
            .addCase(declineInvitation.rejected, (state, action) => {
                state.invitationDeclineStatus = 'failed';
                state.invitationDeclineError = action.payload as string;
            })
    },
});

export const { setNotification, clearNotification } = invitationSlice.actions;
export default invitationSlice.reducer;