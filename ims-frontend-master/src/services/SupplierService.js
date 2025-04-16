import API from "./Api";

const REST_API_BASE_URL = "/supplier";

export const listSupplier = () => API.get(REST_API_BASE_URL);

export const createSupplier = (supplier) => API.post(REST_API_BASE_URL, supplier);

export const getSupplier = (supplierId) => API.get(REST_API_BASE_URL + "/" + supplierId);

export const updateSupplierById = (supplierId, supplier) => API.put(REST_API_BASE_URL + "/" + supplierId, supplier);

export const getSupplierByName = (name) => API.get(REST_API_BASE_URL + "/name/" + name);

export const deleteSupplier = (supplierId) => API.delete(REST_API_BASE_URL + "/" + supplierId);
