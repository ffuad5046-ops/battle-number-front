import axios from "axios";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {BASE_URL} from "../../constant/url";

export const getInvitation = createAsyncThunk(
    "invitation/getInvitation",
    async (
        { id }: { id: number },
        { rejectWithValue }
    ) => {
        try {
            const response = await axios.get(`${BASE_URL}/invitation/${id}`);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Ошибка входа");
        }
    }
);

export const sendInvitation = createAsyncThunk(
    "invitation/sendInvitation",
    async (
        data: any,
        { rejectWithValue }
    ) => {
        try {
            const response = await axios.post(`${BASE_URL}/invitation/send`, {
                fromUserId: data.fromUserId,
                toLogin: data.toLogin,
                mainFieldWidth: data.mainFieldWidth,
                mainFieldHeight: data.mainFieldHeight,
                extraFieldWidth: data.extraFieldWidth,
                extraFieldHeight: data.extraFieldHeight,
                numberRange: data.numberRange,
                isShowLoseLeft: data.isShowLoseLeft
            });
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.error || "Ошибка входа");
        }
    }
);

export const acceptInvitation = createAsyncThunk(
    "invitation/acceptInvitation",
    async (
        { id, userId }: { id: number, userId: string | null },
        { rejectWithValue }
    ) => {
        try {
            const response = await axios.post(`${BASE_URL}/invitation/${id}/accept`, {userId});
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.error || "Ошибка");
        }
    }
);

export const declineInvitation = createAsyncThunk(
    "invitation/declineInvitation",
    async (
        { id, userId }: { id: number, userId: string | null },
        { rejectWithValue }
    ) => {
        try {
            const response = await axios.post(`${BASE_URL}/invitation/${id}/decline`, {userId});
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.error || "Ошибка");
        }
    }
);

