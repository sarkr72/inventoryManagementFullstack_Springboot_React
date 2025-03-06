import API from "./Api";

const REST_API_BASE_URL = `/products`;

export const productsList = () => API.get(REST_API_BASE_URL);

export const productsListByCompany = (id) => API.get(REST_API_BASE_URL + "/company/" + id);

export const createProduct = (product) => API.post(REST_API_BASE_URL, product);

export const getProduct = (productID) => API.get(REST_API_BASE_URL + '/' + productID);

export const updateProduct = (productID, product) => API.put(REST_API_BASE_URL + '/' + productID, product);

export const updateProductByName = (name, product) => API.put(REST_API_BASE_URL + '/name/' + name, product);

export const deleteProduct = (productID) => API.delete(REST_API_BASE_URL + '/' + productID);

