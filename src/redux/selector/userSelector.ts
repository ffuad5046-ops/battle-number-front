import { RootState } from "../store";

export const selectUser = (state: RootState) => state.user.user;
export const selectUserLogin = (state: RootState) => state.user.userLogin;
export const selectUserStatus = (state: RootState) => state.user.status;
export const selectAuthUserStatus = (state: RootState) => state.user.statusAuthUser;
export const selectResendCodeStatus = (state: RootState) => state.user.statusResendCode;
export const selectResetPasswordEmailCodeStatus = (state: RootState) => state.user.statusResetPasswordEmailCode;
export const selectResetPasswordEmailCodeApproveStatus = (state: RootState) => state.user.statusResetPasswordEmailCodeApprove;
export const selectResetPasswordEmailCodeApproveError = (state: RootState) => state.user.errorResetPasswordEmailCodeApprove;

export const selectResetPasswordStatus = (state: RootState) => state.user.statusResetPassword;
export const selectResetPasswordError = (state: RootState) => state.user.errorResetPassword;
export const selectError = (state: RootState) => state.user.error;

export const selectStatusLoginError = (state: RootState) => state.user.loadingLoginReal;
export const selectStatusVerifyEmail = (state: RootState) => state.user.statusVerifyEmail;
export const selectStatusLogout = (state: RootState) => state.user.statusLogout;
export const selectErrorVerifyEmail = (state: RootState) => state.user.errorVerifyEmail;
export const selectStatusRegister = (state: RootState) => state.user.statusRegister;
export const selectErrorRegister = (state: RootState) => state.user.errorRegister;
export const selectErrorLoginError = (state: RootState) => state.user.errorLoginReal;


export const selectStatusPatch = (state: RootState) => state.user.statusPatch;
export const selectErrorPatch = (state: RootState) => state.user.errorPatch;
