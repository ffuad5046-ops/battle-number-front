import axios from "axios";
import {BASE_URL} from "../constant/url";

const api = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("accessToken");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

api.interceptors.response.use(
    res => res,
    async error => {
        const original = error.config;
        if (error.response?.status === 403 && !original._retry) {
            original._retry = true;
            const refreshRes = await api.post("/users/refresh");
            const newAccess = refreshRes.data.accessToken;
            localStorage.setItem("accessToken", newAccess);
            api.defaults.headers.common["Authorization"] = `Bearer ${newAccess}`;
            original.headers["Authorization"] = `Bearer ${newAccess}`;
            return api(original);
        }
        throw error;
    }
);

export default api;
