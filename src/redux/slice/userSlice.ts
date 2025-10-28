import {createSlice} from "@reduxjs/toolkit";
import {
    getUserAuth,
    loginUser,
    loginUserAsGuest,
    logoutUser,
    patchUserAsGuest,
    registerUser,
    resendCode,
    resetPassword,
    resetPasswordEmailCode,
    resetPasswordEmailCodeApprove,
    resetPasswordEmailResendCode,
    verifyEmail
} from "../request/userApi";

const initialState: any = {
    user: null,

    statusAuthUser: '',
    errorAuthUser: null,

    statusPatch: '',
    errorPatch: null,

    loadingLogin: '',
    errorLogin: null,

    statusLogout: '',
    errorLogout: null,

    statusResendCode: '',
    errorResendCode: null,

    statusRegister: '',
    errorRegister: null,

    statusResetPassword: '',
    errorResetPassword: null,

    statusResetPasswordEmailCode: '',
    errorResetPasswordEmailCode: null,

    statusResetPasswordEmailCodeApprove: '',
    errorResetPasswordEmailCodeApprove: null,

    statusResetPasswordEmailResendCode: '',
    errorResetPasswordEmailResendCode: null,

    statusVerifyEmail: '',
    errorVerifyEmail: null,

    userLoginReal: '',
    loadingLoginReal: '',
    errorLoginReal: null,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        logout: (state: any) => {
            state.user = null;
        },
        login: (state: any) => {
            state.user = state.userLoginReal.user;
            state.isAuth = true;
            localStorage.setItem('accessToken', state.userLoginReal.accessToken)
        },
        updateUser: (state, action) => {
            state.user = {
                ...state.user,
                ...action.payload
            };
        },
        resetAll: (state: any) => {
            state.loadingLogin = ''
            state.errorLogin = null
            state.loadingLoginReal = ''
            state.userLoginReal = ''
            state.errorLoginReal = null
            state.statusResendCode = ''
            state.errorResendCode = null
            state.statusRegister = ''
            state.errorRegister = null

            state.statusResetPassword = ''
            state.errorResetPassword = null

            state.statusResetPasswordEmailCode = ''
            state.errorResetPasswordEmailCode = null

            state.statusResetPasswordEmailCodeApprove = ''
            state.errorResetPasswordEmailCodeApprove = null

            state.statusResetPasswordEmailResendCode = ''
            state.errorResetPasswordEmailResendCode = null

            state.statusVerifyEmail = ''
            state.errorVerifyEmail = null

        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(patchUserAsGuest.pending, (state: any) => {
                state.statusPatch = 'pending';
                state.errorPatch = null;
            })
            .addCase(patchUserAsGuest.fulfilled, (state: any, action: any) => {
                state.statusPatch = 'success';
                state.user = action.payload;
            })
            .addCase(patchUserAsGuest.rejected, (state: any, action) => {
                state.statusPatch = 'failed';
                state.errorPatch = action.payload as string;
            })

            .addCase(loginUserAsGuest.pending, (state: any) => {
                state.loadingLogin = true;
                state.errorLogin = null;
            })
            .addCase(loginUserAsGuest.fulfilled, (state: any, action: any) => {
                state.loadingLogin = false;
                state.user = action.payload.user;
                localStorage.setItem('accessToken', action.payload.accessToken)
            })
            .addCase(loginUserAsGuest.rejected, (state: any, action) => {
                state.loadingLogin = false;
                state.errorLogin = action.payload as string;
            })

            .addCase(loginUser.pending, (state: any) => {
                state.loadingLoginReal = 'pending';
                state.errorLoginReal = null;
            })
            .addCase(loginUser.fulfilled, (state: any, action: any) => {
                state.loadingLoginReal = 'success';
                state.userLoginReal = action.payload;
            })
            .addCase(loginUser.rejected, (state: any, action) => {
                state.loadingLoginReal = 'failed';
                state.errorLoginReal = action.payload as string;
            })

            .addCase(registerUser.pending, (state: any) => {
                state.statusRegister = 'pending';
                state.errorRegister = null;
            })
            .addCase(registerUser.fulfilled, (state: any) => {
                state.statusRegister = 'success';
            })
            .addCase(registerUser.rejected, (state: any, action) => {
                state.statusRegister = 'failed';
                state.errorRegister = action.payload as string;
            })

            .addCase(logoutUser.pending, (state: any) => {
                state.statusLogout = 'pending';
                state.errorLogout = null;
            })
            .addCase(logoutUser.fulfilled, (state: any) => {
                state.statusLogout = 'success';

                state.user = null;
                state.isAuth = false;
                localStorage.removeItem('accessToken')
                localStorage.removeItem('isGuestInfo')
                localStorage.removeItem('id')
            })
            .addCase(logoutUser.rejected, (state: any, action) => {
                state.statusLogout = 'failed';
                state.errorLogout = action.payload as string;
            })

            .addCase(getUserAuth.pending, (state: any) => {
                state.statusAuthUser = 'pending';
                state.errorAuthUser = null;
            })
            .addCase(getUserAuth.fulfilled, (state: any, action: any) => {
                state.statusAuthUser = 'success';
                state.user = action.payload;
                state.isAuth = true;
            })
            .addCase(getUserAuth.rejected, (state: any, action) => {
                state.statusAuthUser = 'failed';
                state.errorAuthUser = action.payload as string;
            })

            .addCase(verifyEmail.pending, (state: any) => {
                state.statusVerifyEmail = 'pending';
                state.errorVerifyEmail = null;
            })
            .addCase(verifyEmail.fulfilled, (state: any, action: any) => {
                state.statusVerifyEmail = 'success';
                state.userLoginReal = action.payload;
            })
            .addCase(verifyEmail.rejected, (state: any, action) => {
                state.statusVerifyEmail = 'failed';
                state.errorVerifyEmail = action.payload;
            })

            .addCase(resendCode.pending, (state: any) => {
                state.statusResendCode = 'pending';
                state.errorResendCode = null;
            })
            .addCase(resendCode.fulfilled, (state: any, ) => {
                state.statusResendCode = 'success';
            })
            .addCase(resendCode.rejected, (state: any, action) => {
                state.statusResendCode = 'failed';
                state.errorResendCode = action.payload as string;
            })

            .addCase(resetPassword.pending, (state: any) => {
                state.statusResetPassword = 'pending';
                state.errorResetPassword = null;
            })
            .addCase(resetPassword.fulfilled, (state: any, ) => {
                state.statusResetPassword = 'success';
            })
            .addCase(resetPassword.rejected, (state: any, action) => {
                state.statusResetPassword = 'failed';
                state.errorResetPassword = action.payload as string;
            })

            .addCase(resetPasswordEmailCode.pending, (state: any) => {
                state.statusResetPasswordEmailCode = 'pending';
                state.errorResetPasswordEmailCode = null;
            })
            .addCase(resetPasswordEmailCode.fulfilled, (state: any, ) => {
                state.statusResetPasswordEmailCode = 'success';
            })
            .addCase(resetPasswordEmailCode.rejected, (state: any, action) => {
                state.statusResetPasswordEmailCode = 'failed';
                state.errorResetPasswordEmailCode = action.payload as string;
            })

            .addCase(resetPasswordEmailResendCode.pending, (state: any) => {
                state.statusResetPasswordEmailResendCode = 'pending';
                state.errorResetPasswordEmailResendCode = null;
            })
            .addCase(resetPasswordEmailResendCode.fulfilled, (state: any, ) => {
                state.statusResetPasswordEmailResendCode = 'success';
            })
            .addCase(resetPasswordEmailResendCode.rejected, (state: any, action) => {
                state.statusResetPasswordEmailResendCode = 'failed';
                state.errorResetPasswordEmailResendCode = action.payload as string;
            })

            .addCase(resetPasswordEmailCodeApprove.pending, (state: any) => {
                state.statusResetPasswordEmailCodeApprove = 'pending';
                state.errorResetPasswordEmailCodeApprove = null;
            })
            .addCase(resetPasswordEmailCodeApprove.fulfilled, (state: any, ) => {
                state.statusResetPasswordEmailCodeApprove = 'success';
            })
            .addCase(resetPasswordEmailCodeApprove.rejected, (state: any, action) => {
                state.statusResetPasswordEmailCodeApprove = 'failed';
                state.errorResetPasswordEmailCodeApprove = action.payload as string;
            });
    },
});

export const { logout, login, updateUser, resetAll } = userSlice.actions;
export default userSlice.reducer;