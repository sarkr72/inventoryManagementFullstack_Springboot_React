import API from "./Api";

const REST_API_BASE_URL = "/purchaseOrder";

export const purchaseOrderList = () => API.get(REST_API_BASE_URL);

export const purchaseOrderListByCompany = (name) => API.get(REST_API_BASE_URL + "/posByCompany/" + name);

export const createPurchaseOrder = (purchaseOrder) => API.post(REST_API_BASE_URL, purchaseOrder);

export const getPurchaseOrder = (purchaseOrderID) => API.get(REST_API_BASE_URL + "/" + purchaseOrderID);

export const updatePurchaseOrder = (purchaseOrderID, purchaseOrder) => API.put(REST_API_BASE_URL + '/' + purchaseOrderID, purchaseOrder);

export const deletePurchaseOrder = (purchaseOrderID) => API.delete(REST_API_BASE_URL + "/" + purchaseOrderID);
