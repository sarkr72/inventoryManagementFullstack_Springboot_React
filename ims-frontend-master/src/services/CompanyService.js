import API from "./Api";

const REST_API_BASE_URL = '/companies';

export const listCompanies = () => API.get(REST_API_BASE_URL);

export const listSuppliersById = (id) => API.get(REST_API_BASE_URL + "/companySuppliers/" + id);

export const createCompany = (company) => API.post(REST_API_BASE_URL, company);

export const getCompany = (CompanyId) => API.get(REST_API_BASE_URL + '/' + CompanyId);

export const updateCompanyWithId = (CompanyId, company) => API.put(REST_API_BASE_URL + '/' + CompanyId, company);

export const deleteCompany =(CompanyId) => API.delete(REST_API_BASE_URL + '/' + CompanyId);


