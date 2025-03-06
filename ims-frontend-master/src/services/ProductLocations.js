import API from "./Api";

const REST_API_BASE_URL = "/productLocations";

export const listProductLocations = () => API.get(REST_API_BASE_URL);

export const listProductLocationsByLocation = (row, col, wh, company) => API.get(REST_API_BASE_URL +"/plByLocation", {params: {row, col, wh, company}});

export const listProductLocationsByProduct = (product, company) => API.get(REST_API_BASE_URL +"/plByProduct",  {params: {product, company}});

export const listProductLocationsByCompany = (company) => API.get(REST_API_BASE_URL + "/company/" + company);

export const createProductLocation = (pl) =>
  API.post(REST_API_BASE_URL, pl);

export const getProductLocation = (id) =>
  API.get(REST_API_BASE_URL + "/" + id);

export const updateProductLocation = (id, pl) =>
  API.put(REST_API_BASE_URL + "/" + id, pl);

export const deleteProductLocation = (id) =>
  API.delete(REST_API_BASE_URL + "/" + id);
