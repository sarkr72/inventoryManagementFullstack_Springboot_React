import API from "./Api";

const REST_API_BASE_URL = "/warehouse";

export const listWarehouses = () => API.get(REST_API_BASE_URL);

export const createWarehouse = (warehouse) =>
  API.post(REST_API_BASE_URL, warehouse);

export const getWarehouse = (warehouseId) =>
  API.get(REST_API_BASE_URL + "/" + warehouseId);

export const updateWarehouse = (warehouseId, warehouse) =>
  API.put(REST_API_BASE_URL + "/" + warehouseId, warehouse);

export const deleteWarehouse = (warehouseId) =>
  API.delete(REST_API_BASE_URL + "/" + warehouseId);

export const listWarehousesByCompanyId  = (id) => API.get(REST_API_BASE_URL + "/companyWarehouse/"+ id);
