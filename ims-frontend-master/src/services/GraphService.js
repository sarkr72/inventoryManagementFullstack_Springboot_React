import axios from "axios";
import { getToken } from "./AuthService";

const REST_API_BASE_URL = 'http://localhost:8080/api/graph';

axios.interceptors.request.use(function (config) {

    config.headers['Authorization'] = getToken();

    return config;
}, function (error){
    return Promise.reject(error);
});

export const listGraphs = () => axios.get(REST_API_BASE_URL);

export const listGraphsByCompany = (company) => axios.get(REST_API_BASE_URL + "/" + company);

export const createGraph = (graph) => axios.post(REST_API_BASE_URL, graph);

export const updateGraph = (id, graph) => axios.put(REST_API_BASE_URL + '/' + id, graph);

