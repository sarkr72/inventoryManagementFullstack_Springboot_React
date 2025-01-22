import axios from "axios";
import { getToken } from "./AuthService";

axios.interceptors.request.use(function (config) {

    config.headers['Authorization'] = getToken();

    return config;
}, function (error){
    return Promise.reject(error);
});

const REST_API_BASE_URL = 'http://localhost:8080/api/employees';

export const getEmployeeByAuth = (username, password) => axios.get(REST_API_BASE_URL + '/' + username, password)

export const listEmployees = () => axios.get(REST_API_BASE_URL);

export const createEmployee = (employee) => axios.post(REST_API_BASE_URL, employee);

export const getRoles = ()=> axios.get(REST_API_BASE_URL + "/roles");

export const getEmployee = (employeeEmail) => axios.get(REST_API_BASE_URL + '/' + employeeEmail);

export const updateEmployee = (employeeId, employee) => axios.put(REST_API_BASE_URL + '/' + employeeId, employee);

export const deleteEmployee =(employeeId) => axios.delete(REST_API_BASE_URL + '/' + employeeId);


