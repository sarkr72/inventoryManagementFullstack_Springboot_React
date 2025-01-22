import axios from "axios";

const REST_API_BASE_URL = 'http://localhost:8080/api/auth';

export const registerAPICall = (registerObj) => axios.post(REST_API_BASE_URL + '/register', registerObj);
export const loginAPICall = (email, password) => axios.post(REST_API_BASE_URL + '/login', {email, password});
export const storeToken = (token) => localStorage.setItem("token", token);
export const getToken =() => localStorage.getItem("token");
export const saveLoggedInUser =(email) => sessionStorage.setItem("authenticatedUser", email);
export const isUserLoggedIn =() => { 
    const username = sessionStorage.getItem("authenticatedUser");

    if(username == null){
        return false;
    }else{
        return true;
    }
}
export const getLoggedInUser =() => {
    const username = sessionStorage.getItem("authenticatedUser");
    return username;
}

export const logout =() =>{
    localStorage.clear();
    sessionStorage.clear();
}
