import { RootState } from "../store";

export const selectInvitation = (state: RootState) => state.invitation.invitation;
export const selectIsInvitationLoading = (state: RootState) => state.invitation.invitationLoading;
export const selectInvitationError = (state: RootState) => state.invitation.invitationError;


export const selectInvitationSend = (state: RootState) => state.invitation.invitationSend;
export const selectInvitationSendStatus = (state: RootState) => state.invitation.invitationSendStatus;
export const selectInvitationSendError = (state: RootState) => state.invitation.invitationSendError;

export const selectInvitationAcceptStatus = (state: RootState) => state.invitation.invitationAcceptStatus;
export const selectInvitationAcceptError = (state: RootState) => state.invitation.invitationAcceptError;
export const selectInvitationDeclineStatus = (state: RootState) => state.invitation.invitationDeclineStatus;
export const selectInvitationDeclineError = (state: RootState) => state.invitation.invitationDeclineError;

