import axios from "axios";
import { getToken } from "./AuthService";

axios.interceptors.request.use(function (config) {

    config.headers['Authorization'] = getToken();

    return config;
}, function (error){
    return Promise.reject(error);
});

const REST_API_BASE_URL = "http://localhost:8080/api/productLocations";

export const listProductLocations = () => axios.get(REST_API_BASE_URL);

export const listProductLocationsByLocation = (row, col, wh, company) => axios.get(REST_API_BASE_URL +"/plByLocation", {params: {row, col, wh, company}});

export const listProductLocationsByProduct = (product, company) => axios.get(REST_API_BASE_URL +"/plByProduct",  {params: {product, company}});

export const listProductLocationsByCompany = (company) => axios.get(REST_API_BASE_URL + "/company/" + company);

export const createProductLocation = (pl) =>
  axios.post(REST_API_BASE_URL, pl);

export const getProductLocation = (id) =>
  axios.get(REST_API_BASE_URL + "/" + id);

export const updateProductLocation = (id, pl) =>
  axios.put(REST_API_BASE_URL + "/" + id, pl);

export const deleteProductLocation = (id) =>
  axios.delete(REST_API_BASE_URL + "/" + id);
