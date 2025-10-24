import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {
    getUserAuth,
    getUserById,
    loginUser,
    loginUserAsGuest, logoutUser,
    patchUserAsGuest,
    registerUser, resendCode, verifyEmail
} from "../request/userApi";

type User = {
    id: number;
    name: string;
    email: string;
    isGuest: boolean;
};

const initialState: any = {
    user: null,
    status: '',
    error: null,

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
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUserById.pending, (state: any) => {
                state.status = 'pending';
                state.error = null;
            })
            .addCase(getUserById.fulfilled, (state: any, action: PayloadAction<any>) => {
                state.status = 'success';
                state.user = action.payload;
            })
            .addCase(getUserById.rejected, (state: any, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
            })

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
                state.user = action.payload;
                localStorage.setItem('id', action.payload.id)
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
            .addCase(resendCode.fulfilled, (state: any, action: any) => {
                state.statusResendCode = 'success';
            })
            .addCase(resendCode.rejected, (state: any, action) => {
                state.statusResendCode = 'failed';
                state.errorResendCode = action.payload as string;
            });
    },
});

export const { logout, login } = userSlice.actions;
export default userSlice.reducer;