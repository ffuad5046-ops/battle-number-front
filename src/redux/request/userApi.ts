import {createAsyncThunk} from "@reduxjs/toolkit";
import api from "../axios";

export const loginUserAsGuest = createAsyncThunk(
    "user/loginUserAsGuest",
    async (
        _,
        { rejectWithValue }
    ) => {
        try {
            const response = await api.get(`/users`);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.error || "Ошибка входа");
        }
    }
);

export const patchUserAsGuest = createAsyncThunk(
    "user/patchUserAsGuest",
    async (
        { login, id }: { login: string; id: number },
        { rejectWithValue }
    ) => {
        try {
            const response = await api.patch(`/users/${id}`, {login});
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.error || "Ошибка");
        }
    }
);

export const getUserAuth = createAsyncThunk(
    "user/getUserAuth",
    async (
        _,
        { rejectWithValue }
    ) => {
        try {
            const response = await api.get(`/users/get-user-auth`);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.error || "Ошибка входа");
        }
    }
);

export const loginUser = createAsyncThunk(
    "user/loginUser",
    async (
        { email, password }: any,
        { rejectWithValue }
    ) => {
        try {
            const response = await api.post(`/users/login`, {email, password});
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.error || "Ошибка входа");
        }
    }
);

export const registerUser = createAsyncThunk(
    "user/registerUser",
    async (
        { name, email, password }: any,
        { rejectWithValue }
    ) => {
        try {
            const response = await api.post(`/users/register`, {name, email, password});
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.error || "Ошибка входа");
        }
    }
);

export const verifyEmail = createAsyncThunk(
    "user/verifyEmail",
    async (
        { email, code }: any,
        { rejectWithValue }
    ) => {
        try {
            const response = await api.post(`/users/verify-email`, {email, code});
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.error || "Ошибка входа");
        }
    }
);

export const resendCode = createAsyncThunk(
    "user/resendCode",
    async (
        { email }: any,
        { rejectWithValue }
    ) => {
        try {
            const response = await api.post(`/users/resend-code`, {email});
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.error || "Ошибка входа");
        }
    }
);

export const logoutUser = createAsyncThunk(
    "user/logoutUser",
    async (
        _,
        { rejectWithValue }
    ) => {
        try {
            const response = await api.get(`/users/logout`);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.error || "Ошибка входа");
        }
    }
);

export const resetPassword = createAsyncThunk(
    "user/resetPassword",
    async (
        {password, email}: any,
        { rejectWithValue }
    ) => {
        try {
            const response = await api.patch(`/users/reset/password`, {password, email});
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.error || "Ошибка входа");
        }
    }
);

export const resetPasswordEmailCode = createAsyncThunk(
    "user/resetPasswordEmailCode",
    async (
        {email}: any,
        { rejectWithValue }
    ) => {
        try {
            const response = await api.post(`/users/reset-password-email-code`, {email});
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.error || "Ошибка входа");
        }
    }
);

export const resetPasswordEmailResendCode = createAsyncThunk(
    "user/resetPasswordEmailResendCode",
    async (
        {email}: any,
        { rejectWithValue }
    ) => {
        try {
            const response = await api.post(`/users/reset-password-email-resend-code`, {email});
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.error || "Ошибка входа");
        }
    }
);

export const resetPasswordEmailCodeApprove = createAsyncThunk(
    "user/resetPasswordEmailCodeApprove",
    async (
        {code, email}: any,
        { rejectWithValue }
    ) => {
        try {
            const response = await api.post(`/users/reset-password-email-code-approve`, {code, email});
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.error || "Ошибка входа");
        }
    }
);