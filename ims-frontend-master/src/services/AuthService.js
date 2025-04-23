import axios from "axios";

const REST_API_BASE_URL = import.meta.env.VITE_API_URL + '/auth';

export const registerAPICall = (registerObj) => axios.post(REST_API_BASE_URL + '/register', registerObj);

export const loginAPICall = async (email, password) => {
    const response = await axios.post(REST_API_BASE_URL + '/login', {email, password});
   
    if (response.data.accessToken && response.data.refreshToken) {
        setTokens(response.data.accessToken, response.data.refreshToken);
        saveLoggedInUser(email, response.data.role);
    }
    return response.data;
};

export const setTokens = (accessToken, refreshToken) => {
     localStorage.setItem("token", `Bearer ${accessToken}`);
    localStorage.setItem("refreshToken", refreshToken);
};

export const getToken =() => localStorage.getItem("token");
export const getRefreshToken = () => localStorage.getItem("refreshToken");

export const saveLoggedInUser = (email, role) => {
    sessionStorage.setItem("authenticatedUser", email);
    sessionStorage.setItem("role", role);
};

export const isUserLoggedIn = () => !!sessionStorage.getItem("authenticatedUser");

export const getLoggedInUser = () => sessionStorage.getItem("authenticatedUser");

export const logout =() =>{
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = "/login"; 
}
