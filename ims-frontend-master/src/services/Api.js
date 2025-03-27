import axios from "axios";
import { getToken, getRefreshToken, setTokens, logout } from "./AuthService";

const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

API.interceptors.request.use(
    (config) => {
        const token = getToken();
        if (token) {
            config.headers["Authorization"] = token;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

API.interceptors.response.use(
     async (response) => {
        const newToken = response.headers["new-access-token"];
        if (newToken) {
            setTokens(newToken, getRefreshToken());
        }
        return response;
    },
    async (error) => {
        logout();
        // const originalRequest = error.config;

        // if (error.response?.status === 401 && !originalRequest._retry) {
        //     originalRequest._retry = true;

        //     try {
        //         const refreshTk = getRefreshToken();
        //         const res = await axios.post("http://localhost:8080/api/auth/refresh-token", { refreshTk });

        //         const { accessToken, refreshToken } = res.data;
        //         setTokens(accessToken, refreshToken);

        //         originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;
        //         return API(originalRequest); 
        //     } catch (refreshError) {
        //         console.error("Refresh token failed:", refreshError);
        //         logout();
        //         return Promise.reject(refreshError);
        //     }
        // }
        // return Promise.reject(error);
    }
);

export default API;
