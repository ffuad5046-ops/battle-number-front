import axios from "axios";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {BASE_URL} from "../../constant/url";

export const getGame = createAsyncThunk(
    "invitation/getGame",
    async (
        { id }: { id: number },
        { rejectWithValue }
    ) => {
        try {
            const response = await axios.get(`${BASE_URL}/game/${id}`);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.error || "Ошибка входа");
        }
    }
);
export const getUserStats = createAsyncThunk(
    "invitation/getUserStats",
    async (
        { id }: { id: number },
        { rejectWithValue }
    ) => {
        try {
            const response = await axios.get(`${BASE_URL}/game/${id}/stats`);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.error || "Ошибка входа");
        }
    }
);
export const getUserStatsSummary = createAsyncThunk(
    "invitation/getUserStatsSummary",
    async (
        { id, filter, page, size }: { id: number, filter: string, page: number, size: number },
        { rejectWithValue }
    ) => {
        try {
            const response = await axios.get(`${BASE_URL}/game/${id}/stats/summary?type=${filter}&page=${page}&size=${size}`);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.error || "Ошибка входа");
        }
    }
);