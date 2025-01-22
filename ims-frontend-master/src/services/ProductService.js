import axios from "axios";
import { getToken } from "./AuthService";

axios.interceptors.request.use(function (config) {

    config.headers['Authorization'] = getToken();

    return config;
}, function (error){
    return Promise.reject(error);
});

const REST_API_BASE_URL = `http://localhost:8080/api/products`;

export const productsList = () => axios.get(REST_API_BASE_URL);

export const productsListByCompany = (id) => axios.get(REST_API_BASE_URL + "/company/" + id);

export const createProduct = (product) => axios.post(REST_API_BASE_URL, product);

export const getProduct = (productID) => axios.get(REST_API_BASE_URL + '/' + productID);

export const updateProduct = (productID, product) => axios.put(REST_API_BASE_URL + '/' + productID, product);

export const updateProductByName = (name, product) => axios.put(REST_API_BASE_URL + '/name/' + name, product);

export const deleteProduct = (productID) => axios.delete(REST_API_BASE_URL + '/' + productID);

